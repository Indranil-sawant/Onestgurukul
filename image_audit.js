const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// File extensions
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg', '.gif', '.ico']);
const CODE_EXTS = new Set(['.html', '.css', '.js', '.json', '.xml', '.txt']);

// Directories to skip
const SKIP_DIRS = new Set(['node_modules', '.git', '.gemini', '.history']);

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (SKIP_DIRS.has(file)) return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

async function runAudit() {
  console.log('--- SCANNING LIVE REPOSITORY FOR IMAGES AND REFERENCES ---');
  const allFiles = walkDir('.');
  const imageFiles = [];
  const codeFiles = [];

  allFiles.forEach(f => {
    const ext = path.extname(f).toLowerCase();
    const norm = f.replace(/\\/g, '/');
    if (IMAGE_EXTS.has(ext)) {
      imageFiles.push(norm);
    } else if (CODE_EXTS.has(ext)) {
      codeFiles.push(norm);
    }
  });

  console.log(`Found ${imageFiles.length} image files on disk.`);
  console.log(`Found ${codeFiles.length} live code/markup files.`);

  // Read all live code files to collect references
  const references = new Map(); // normalized relative path -> Set of files where referenced
  const externalImages = new Set();

  const imgRefRegex = /(?:src|href|content|url)\s*=\s*["']([^"']+\.(?:jpg|jpeg|png|webp|avif|svg|gif|ico)(?:\?[^"']*)?)["']/gi;
  const cssUrlRegex = /url\(\s*["']?([^"')]+\.(?:jpg|jpeg|png|webp|avif|svg|gif|ico)(?:\?[^"']*)?)\s*["']?\)/gi;
  const jsRefRegex = /["']([^"']+\.(?:jpg|jpeg|png|webp|avif|svg|gif|ico))["']/gi;

  codeFiles.forEach(cf => {
    // Only inspect active site files (skip audit json or node files if any)
    if (cf.includes('image_inventory_audit') || cf.includes('image_audit')) return;

    const content = fs.readFileSync(cf, 'utf8');
    const matches = new Set();
    
    let m;
    while ((m = imgRefRegex.exec(content)) !== null) matches.add(m[1]);
    while ((m = cssUrlRegex.exec(content)) !== null) matches.add(m[1]);
    while ((m = jsRefRegex.exec(content)) !== null) matches.add(m[1]);

    matches.forEach(ref => {
      const cleanRef = ref.split('?')[0].trim();
      if (cleanRef.startsWith('http://') || cleanRef.startsWith('https://')) {
        externalImages.add(cleanRef);
        if (cleanRef.includes('onestgurukul.in/')) {
          const localPart = cleanRef.split('onestgurukul.in/')[1];
          if (!references.has(localPart)) references.set(localPart, new Set());
          references.get(localPart).add(cf);
        }
      } else {
        let normPath = cleanRef.startsWith('/') ? cleanRef.slice(1) : cleanRef;
        normPath = normPath.startsWith('./') ? normPath.slice(2) : normPath;
        if (!references.has(normPath)) references.set(normPath, new Set());
        references.get(normPath).add(cf);
      }
    });
  });

  console.log(`Collected ${references.size} distinct image reference strings.`);
  console.log(`Found ${externalImages.size} external image references.`);

  // Audit each image on disk
  const inventory = [];
  let totalBytes = 0;

  for (const imgPath of imageFiles) {
    const cleanPath = imgPath.startsWith('./') ? imgPath.slice(2) : imgPath;
    const stat = fs.statSync(cleanPath);
    totalBytes += stat.size;

    let meta = { width: null, height: null, format: null };
    const ext = path.extname(cleanPath).toLowerCase();
    
    if (ext !== '.svg' && ext !== '.ico') {
      try {
        meta = await sharp(cleanPath).metadata();
      } catch (e) {
        meta.error = e.message;
      }
    } else if (ext === '.svg') {
      meta.format = 'svg';
    } else if (ext === '.ico') {
      meta.format = 'ico';
    }

    let matchedRefs = new Set();
    for (const [refKey, files] of references.entries()) {
      if (refKey === cleanPath || cleanPath.endsWith(refKey) || refKey.endsWith(cleanPath)) {
        files.forEach(f => matchedRefs.add(f));
      }
    }

    inventory.push({
      path: cleanPath,
      size: stat.size,
      format: meta.format || ext.replace('.', ''),
      width: meta.width || null,
      height: meta.height || null,
      usedIn: Array.from(matchedRefs),
      isUsed: matchedRefs.size > 0
    });
  }

  inventory.sort((a, b) => b.size - a.size);

  const usedImages = inventory.filter(i => i.isUsed);
  const unusedImages = inventory.filter(i => !i.isUsed);
  const usedBytes = usedImages.reduce((sum, i) => sum + i.size, 0);
  const unusedBytes = unusedImages.reduce((sum, i) => sum + i.size, 0);

  console.log('\n=== ACCURATE LIVE SITE INVENTORY SUMMARY ===');
  console.log(`Total images on disk: ${inventory.length} (${(totalBytes / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`Actively Used in Website: ${usedImages.length} images (${(usedBytes / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`Unreferenced Assets on Disk: ${unusedImages.length} images (${(unusedBytes / (1024 * 1024)).toFixed(2)} MB)`);

  console.log('\n--- TOP 25 LARGEST ACTIVELY USED IMAGES IN PRODUCTION ---');
  usedImages.slice(0, 25).forEach((item, idx) => {
    console.log(`${idx + 1}. [${(item.size / 1024).toFixed(1)} KB] ${item.width}x${item.height} (${item.format}) - ${item.path}`);
    console.log(`   Referenced by: ${item.usedIn.join(', ')}`);
  });

  // Save audit data
  fs.writeFileSync('image_inventory_audit.json', JSON.stringify({
    totalImages: inventory.length,
    totalBytes,
    usedImages: usedImages.length,
    usedBytes,
    unusedImages: unusedImages.length,
    unusedBytes,
    externalImages: Array.from(externalImages),
    inventory
  }, null, 2));

  console.log('\nSaved audit report to image_inventory_audit.json');
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
});
