const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'source');
const dist = path.join(root, 'dist');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

function copyPage(name) {
  const from = path.join(source, `${name}.html`);
  const to = path.join(dist, name === 'index' ? 'index.html' : `${name}.html`);
  fs.copyFileSync(from, to);
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
copyPage('index');
copyPage('about');
copyPage('services');
copyDir(path.join(source, 'assets'), path.join(dist, 'assets'));
console.log('Built static portal into dist/');
