import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const appsWebDir = path.join(rootDir, 'apps', 'web');
const sourceStandaloneDir = path.join(appsWebDir, '.next', 'standalone');
const targetNextDir = path.join(rootDir, '.next');
const targetStandaloneDir = path.join(targetNextDir, 'standalone');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

try {
  // 1. Create root .next directory
  if (!fs.existsSync(targetNextDir)) {
    fs.mkdirSync(targetNextDir, { recursive: true });
  }

  // 2. Move standalone to .next/standalone
  console.log('Moving standalone to root .next/standalone...');
  if (fs.existsSync(targetStandaloneDir)) {
    fs.rmSync(targetStandaloneDir, { recursive: true, force: true });
  }
  fs.renameSync(sourceStandaloneDir, targetStandaloneDir);

  // 3. Copy public and static to correct nested locations inside standalone
  console.log('Copying public and static directories...');
  copyRecursiveSync(path.join(appsWebDir, 'public'), path.join(targetStandaloneDir, 'apps', 'web', 'public'));
  copyRecursiveSync(path.join(appsWebDir, '.next', 'static'), path.join(targetStandaloneDir, 'apps', 'web', '.next', 'static'));

  // 4. Create wrapper server.js exactly where Hostinger expects it
  console.log('Creating wrapper server.js at .next/standalone/server.js...');
  fs.writeFileSync(path.join(targetStandaloneDir, 'server.js'), 'require("./apps/web/server.js");\n');

  // 5. Force CommonJS resolution for the standalone folder
  console.log('Creating standalone package.json...');
  fs.writeFileSync(path.join(targetStandaloneDir, 'package.json'), JSON.stringify({ type: "commonjs" }));

  // 6. Copy static files to root to satisfy Hostinger LiteSpeed static routing
  console.log('Copying static files to root for LiteSpeed...');
  copyRecursiveSync(path.join(appsWebDir, 'public'), path.join(rootDir, 'public'));
  copyRecursiveSync(path.join(appsWebDir, '.next', 'static'), path.join(targetNextDir, 'static'));

  console.log('Postbuild finished successfully!');
} catch (err) {
  console.error('Error during postbuild:', err);
  process.exit(1);
}