import { readFileSync, writeFileSync } from 'fs';
import { PNG } from 'pngjs';

const input = readFileSync('./src/assets/logo.png');
const png = PNG.sync.read(input);

for (let y = 0; y < png.height; y++) {
  for (let x = 0; x < png.width; x++) {
    const idx = (png.width * y + x) * 4;
    const r = png.data[idx];
    const g = png.data[idx + 1];
    const b = png.data[idx + 2];
    // If pixel is near-white, make transparent
    if (r > 230 && g > 230 && b > 230) {
      png.data[idx + 3] = 0; // alpha = 0 (transparent)
    }
  }
}

const output = PNG.sync.write(png);
writeFileSync('./src/assets/logo-transparent.png', output);
console.log('Done! logo-transparent.png saved.');
