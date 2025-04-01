const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../public/images');
const svgFiles = fs.readdirSync(sourceDir).filter(file => file.endsWith('.svg'));

async function generatePNGs() {
    for (const svgFile of svgFiles) {
        const baseName = path.basename(svgFile, '.svg');
        const svgPath = path.join(sourceDir, svgFile);
        const normalPngPath = path.join(sourceDir, `${baseName}.png`);
        const smallPngPath = path.join(sourceDir, `${baseName}-small.png`);

        // Generate normal size PNG (200x200)
        await sharp(svgPath)
            .resize(200, 200)
            .png()
            .toFile(normalPngPath);

        // Generate small size PNG (100x100)
        await sharp(svgPath)
            .resize(100, 100)
            .png()
            .toFile(smallPngPath);

        console.log(`Generated PNGs for ${baseName}`);
    }
}

generatePNGs().catch(console.error); 