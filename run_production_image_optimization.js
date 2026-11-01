const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const BACKUP_DIR = '_backup_raw_images';

function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

async function optimizeImages() {
  console.log('=== STARTING ROBUST PRODUCTION IMAGE OPTIMISATION WORKFLOW ===\n');

  if (!fs.existsSync('image_inventory_audit.json')) {
    console.error('image_inventory_audit.json not found!');
    return;
  }

  const auditData = JSON.parse(fs.readFileSync('image_inventory_audit.json', 'utf8'));
  const usedImages = auditData.inventory.filter(i => i.isUsed);

  console.log(`Processing ${usedImages.length} actively used images...`);
  console.log(`Backup directory: ${BACKUP_DIR}/\n`);

  const results = [];
  let totalOrigBytes = 0;
  let totalOptBytes = 0;
  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (let idx = 0; idx < usedImages.length; idx++) {
    const item = usedImages[idx];
    const srcPath = item.path;
    const ext = path.extname(srcPath).toLowerCase();

    // Check backup first to get the true original size
    const backupPath = path.join(BACKUP_DIR, srcPath);
    let origSize = item.size;

    if (fs.existsSync(backupPath)) {
      origSize = fs.statSync(backupPath).size;
    } else {
      ensureDir(backupPath);
      fs.copyFileSync(srcPath, backupPath);
      origSize = fs.statSync(backupPath).size;
    }

    totalOrigBytes += origSize;

    let action = 'optimized';
    let newSize = origSize;
    let newWidth = item.width;
    let newHeight = item.height;
    let notes = '';

    // Handle SVG
    if (ext === '.svg') {
      try {
        const svgContent = fs.readFileSync(backupPath, 'utf8');
        const minified = svgContent
          .replace(/<!--[\s\S]*?-->/g, '')
          .replace(/>\s+</g, '><')
          .trim();
        const minBuffer = Buffer.from(minified, 'utf8');
        if (minBuffer.length < origSize) {
          fs.writeFileSync(srcPath, minBuffer);
          newSize = minBuffer.length;
          notes = 'Minified SVG comments & whitespace';
          processedCount++;
        } else {
          action = 'skipped';
          notes = 'Already optimal SVG';
          skippedCount++;
        }
      } catch (err) {
        action = 'error';
        notes = err.message;
        errorCount++;
      }
    } 
    // Handle Raster (JPEG, PNG, WebP)
    else {
      try {
        // Read file into memory buffer to avoid Windows file-locking
        const inputBuffer = fs.readFileSync(backupPath);
        const meta = await sharp(inputBuffer).metadata();

        const isPanoOrHero = (meta.width && meta.width > 2500 && meta.height && meta.width / meta.height > 2) ||
                             srcPath.includes('hero') || srcPath.includes('pano');
        const maxDim = isPanoOrHero ? 1920 : 1600;

        let pipeline = sharp(inputBuffer).rotate();

        if ((meta.width && meta.width > maxDim) || (meta.height && meta.height > maxDim)) {
          pipeline = pipeline.resize({
            width: maxDim,
            height: maxDim,
            fit: 'inside',
            withoutEnlargement: true
          });
        }

        let optBuffer = null;
        let webpBuffer = null;

        // JPEG Handling
        if (ext === '.jpg' || ext === '.jpeg') {
          // MozJPEG
          optBuffer = await pipeline
            .clone()
            .jpeg({ quality: 82, mozjpeg: true, progressive: true })
            .toBuffer();

          // WebP Companion
          webpBuffer = await pipeline
            .clone()
            .webp({ quality: 82, effort: 6 })
            .toBuffer();
        } 
        // PNG Handling
        else if (ext === '.png') {
          // Check if photographic or has alpha
          if (meta.hasAlpha) {
            optBuffer = await pipeline
              .clone()
              .png({ compressionLevel: 9, effort: 9 })
              .toBuffer();
          } else {
            // Photographic PNG without alpha: convert palette or high-compression
            optBuffer = await pipeline
              .clone()
              .png({ compressionLevel: 9, palette: true, quality: 85 })
              .toBuffer();
          }

          webpBuffer = await pipeline
            .clone()
            .webp({ quality: 82, effort: 6, alphaQuality: 90 })
            .toBuffer();
        } 
        // WebP Handling
        else if (ext === '.webp') {
          if (origSize > 80 * 1024 || (meta.width && meta.width > 1600)) {
            optBuffer = await pipeline
              .clone()
              .webp({ quality: 82, effort: 6 })
              .toBuffer();
          }
        }

        // Check if optimized buffer is smaller than original
        if (optBuffer && optBuffer.length < origSize) {
          fs.writeFileSync(srcPath, optBuffer);
          newSize = optBuffer.length;
          const newMeta = await sharp(optBuffer).metadata();
          newWidth = newMeta.width;
          newHeight = newMeta.height;
          notes = `Optimized ${ext.toUpperCase()} (-${((1 - newSize/origSize)*100).toFixed(1)}%)`;
          processedCount++;
        } else {
          // If JPEG recompression didn't shrink it, keep original backup version
          fs.writeFileSync(srcPath, inputBuffer);
          newSize = origSize;
          action = 'skipped';
          notes = 'Original is already smaller than recompressed buffer';
          skippedCount++;
        }

        // Always write WebP companion if smaller than original
        if (webpBuffer && ext !== '.webp') {
          const webpPath = srcPath.replace(/\.(?:jpg|jpeg|png)$/i, '.webp');
          if (webpBuffer.length < origSize) {
            fs.writeFileSync(webpPath, webpBuffer);
          }
        }
      } catch (err) {
        action = 'error';
        notes = err.message;
        newSize = origSize;
        errorCount++;
      }
    }

    totalOptBytes += newSize;
    const savingsBytes = origSize - newSize;
    const savingsPct = origSize > 0 ? ((savingsBytes / origSize) * 100).toFixed(1) : '0';

    results.push({
      path: srcPath,
      format: ext.replace('.', ''),
      origSize,
      newSize,
      savingsBytes,
      savingsPct: parseFloat(savingsPct),
      origDims: `${item.width || '?'}x${item.height || '?'}`,
      newDims: `${newWidth || '?'}x${newHeight || '?'}`,
      action,
      notes,
      usedIn: item.usedIn
    });

    if ((idx + 1) % 20 === 0 || idx === usedImages.length - 1) {
      console.log(`Progress: ${idx + 1}/${usedImages.length} images evaluated.`);
    }
  }

  const totalSavedBytes = totalOrigBytes - totalOptBytes;
  const totalSavedMB = totalSavedBytes / (1024 * 1024);
  const totalOrigMB = totalOrigBytes / (1024 * 1024);
  const totalOptMB = totalOptBytes / (1024 * 1024);
  const totalSavedPct = ((totalSavedBytes / totalOrigBytes) * 100).toFixed(2);

  console.log('\n=============================================');
  console.log('=== OPTIMISATION COMPLETE: MEASURED RESULTS ===');
  console.log('=============================================');
  console.log(`Total active images evaluated: ${usedImages.length}`);
  console.log(`Images compressed & optimized:  ${processedCount}`);
  console.log(`Images skipped (already optimal): ${skippedCount}`);
  console.log(`Errors encountered:             ${errorCount}`);
  console.log(`Original total payload:         ${totalOrigMB.toFixed(2)} MB (${totalOrigBytes.toLocaleString()} bytes)`);
  console.log(`Optimized total payload:        ${totalOptMB.toFixed(2)} MB (${totalOptBytes.toLocaleString()} bytes)`);
  console.log(`Total payload reduction:        ${totalSavedMB.toFixed(2)} MB saved`);
  console.log(`Overall reduction percentage:   ${totalSavedPct}% reduction`);
  console.log('=============================================\n');

  fs.writeFileSync('optimization_results.json', JSON.stringify({
    totalImages: usedImages.length,
    processedCount,
    skippedCount,
    errorCount,
    totalOrigBytes,
    totalOptBytes,
    totalSavedBytes,
    totalSavedMB,
    totalSavedPct,
    results
  }, null, 2));

  console.log('Saved detailed results to optimization_results.json');
}

optimizeImages().catch(err => {
  console.error('Optimization failed:', err);
});
