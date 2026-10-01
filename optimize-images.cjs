const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const imagesDir = path.join(__dirname, "public", "images");

async function optimizeImages() {
  const files = fs
    .readdirSync(imagesDir)
    .filter((file) => /\.(jpg|jpeg)$/i.test(file));

  if (files.length === 0) {
    console.log("No JPG/JPEG images found.");
    return;
  }

  console.log(`Found ${files.length} JPG/JPEG images.\n`);

  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const outputName = `${path.parse(file).name}.webp`;
    const outputPath = path.join(imagesDir, outputName);

    try {
      await sharp(inputPath)
        .webp({
          quality: 82,
          effort: 5,
        })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath).size;

      const originalKB = (originalSize / 1024).toFixed(1);
      const optimizedKB = (optimizedSize / 1024).toFixed(1);
      const savedPercent = (
        ((originalSize - optimizedSize) / originalSize) *
        100
      ).toFixed(1);

      console.log(
        `${file} → ${outputName} | ${originalKB} KB → ${optimizedKB} KB | Saved ${savedPercent}%`
      );
    } catch (error) {
      console.error(`Failed: ${file}`);
      console.error(error.message);
    }
  }

  console.log("\nImage optimization completed.");
}

optimizeImages();