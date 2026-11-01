const fs = require('fs');
const path = require('path');

const codeFiles = [
  'index.html',
  'about.html',
  'admissions.html',
  'campus-facilities.html',
  'contact.html',
  'preprimary.html',
  'students-life.html',
  'admin.html',
  '404.html',
  'db.js',
  'onest-global.js',
  'assets/css/theme-base.css',
  'assets/css/onest-home.css'
];

console.log('--- CHECKING ALL LIVE IMAGE REFERENCES FOR BROKEN PATHS ---');
let totalChecked = 0;
let broken = [];

const imgRefRegex = /(?:src|href|content|url)\s*=\s*["']([^"']+\.(?:jpg|jpeg|png|webp|avif|svg|gif|ico)(?:\?[^"']*)?)["']/gi;
const cssUrlRegex = /url\(\s*["']?([^"')]+\.(?:jpg|jpeg|png|webp|avif|svg|gif|ico)(?:\?[^"']*)?)\s*["']?\)/gi;
const jsRefRegex = /["']([^"']+\.(?:jpg|jpeg|png|webp|avif|svg|gif|ico))["']/gi;

codeFiles.forEach(cf => {
  if (!fs.existsSync(cf)) return;
  const content = fs.readFileSync(cf, 'utf8');
  const refs = new Set();
  let m;
  while ((m = imgRefRegex.exec(content)) !== null) refs.add(m[1]);
  while ((m = cssUrlRegex.exec(content)) !== null) refs.add(m[1]);
  while ((m = jsRefRegex.exec(content)) !== null) refs.add(m[1]);

  refs.forEach(ref => {
    let clean = ref.split('?')[0].trim();
    if (clean.startsWith('http://') || clean.startsWith('https://')) {
      if (clean.includes('onestgurukul.in/')) {
        clean = clean.split('onestgurukul.in/')[1];
      } else {
        return; // External
      }
    }
    if (clean.startsWith('#') || clean.startsWith('data:')) return;
    if (clean.startsWith('/')) clean = clean.slice(1);
    if (clean.startsWith('./')) clean = clean.slice(2);

    totalChecked++;
    if (!fs.existsSync(clean)) {
      broken.push({ file: cf, ref: clean });
    }
  });
});

console.log(`Total local references checked: ${totalChecked}`);
if (broken.length === 0) {
  console.log('SUCCESS: All referenced images exist on disk! 0 broken references.');
} else {
  console.log(`WARNING: Found ${broken.length} broken references:`);
  broken.forEach(b => console.log(`  in ${b.file}: missing "${b.ref}"`));
}

