import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const RESOURCES_DIR = path.join(process.cwd(), '../rdc_ressorces');
const OUT_DIR = path.join(process.cwd(), 'public/apartments');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// The main directories containing the apartments
const mainDirs = ['RDC 3D', 'RDC 3D 2', '3D-ETAGE ', '3D-ETAGE  2', '3D-ETAGE  3'];

let processedCount = 0;

for (const mainDir of mainDirs) {
  const dirPath = path.join(RESOURCES_DIR, mainDir);
  if (!fs.existsSync(dirPath)) continue;

  const apartmentDirs = fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const aptDir of apartmentDirs) {
    const aptPath = path.join(dirPath, aptDir);
    const files = fs.readdirSync(aptPath);
    
    // Find the first .tif or .jpeg file
    const imageFile = files.find(f => f.toLowerCase().endsWith('.tif') || f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.jpg'));
    
    if (imageFile) {
      const inputPath = path.join(aptPath, imageFile);
      // Clean up the name for a URL friendly slug-like structure if needed, or just remove weird chars
      const safeName = aptDir.replace(/[^a-zA-Z0-9-_\s]/g, '').trim();
      const outputPath = path.join(OUT_DIR, `${safeName}.png`);
      
      console.log(`Processing: ${aptDir} -> ${safeName}.png`);
      try {
        execFileSync('sips', ['-Z', '1024', '-s', 'format', 'png', inputPath, '--out', outputPath]);
        processedCount++;
      } catch (err) {
        console.error(`Failed to process ${inputPath}:`, err.message);
      }
    }
  }
}

console.log(`Successfully processed ${processedCount} apartments.`);
