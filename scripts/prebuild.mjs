import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

function chmodRecursiveSync(targetPath) {
  try {
    const exists = fs.existsSync(targetPath);
    if (!exists) return;
    
    const stats = fs.statSync(targetPath);
    // Ignore node_modules to speed this up
    if (path.basename(targetPath) === 'node_modules') return;

    fs.chmodSync(targetPath, 0o755);

    if (stats.isDirectory()) {
      fs.readdirSync(targetPath).forEach(function(childItemName) {
        chmodRecursiveSync(path.join(targetPath, childItemName));
      });
    }
  } catch (e) {
    // Silently ignore permission errors during chmod
  }
}

console.log('Fixing file permissions globally...');
chmodRecursiveSync(rootDir);
console.log('Permissions fixed.');
