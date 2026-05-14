const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

const inputDir = path.join(__dirname, 'public', 'bw-aparments');
const outputDir = path.join(__dirname, 'public', 'bw-apartments-transparent');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImages() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    try {
      const image = await Jimp.read(inputPath);
      
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const red = this.bitmap.data[idx + 0];
        const green = this.bitmap.data[idx + 1];
        const blue = this.bitmap.data[idx + 2];
        
        if (red > 220 && green > 220 && blue > 220) {
          this.bitmap.data[idx + 3] = 0; // Alpha
        }
      });
      
      await image.write(outputPath);
      console.log(`Processed ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

processImages();
