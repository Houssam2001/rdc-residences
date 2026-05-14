const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'public', 'frames');
const outputDir = path.join(__dirname, 'public', 'frames-upscaled');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function upscaleFrames() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  
  console.log(`Found ${files.length} frames. Starting 2x upscale using sharp...`);
  
  const promises = files.map(async (file) => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    try {
      const metadata = await sharp(inputPath).metadata();
      
      await sharp(inputPath)
        .resize({
          width: metadata.width * 2,
          kernel: sharp.kernel.lanczos3 // High-quality upscaling kernel
        })
        .jpeg({ quality: 85, mozjpeg: true }) // Optimize file size
        .toFile(outputPath);
        
      console.log(`Upscaled ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  });
  
  await Promise.all(promises);
  console.log('Upscaling complete!');
}

upscaleFrames();
