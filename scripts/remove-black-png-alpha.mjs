/**
 * Makes near-black pixels transparent in PNGs (sponsor logos on black rectangles).
 * Usage: node scripts/remove-black-png-alpha.mjs <file> [...]
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/** Pixels with R,G,B all at or below this become transparent (removes black + dark compression halos). */
const THRESHOLD = 52;

async function processFile(filePath) {
  const abs = path.resolve(filePath);
  if (!fs.existsSync(abs)) {
    console.error("Missing:", abs);
    process.exit(1);
  }
  const input = sharp(abs);
  const { data, info } = await input.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (info.channels !== 4) {
    console.error("Expected RGBA:", abs);
    process.exit(1);
  }
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= THRESHOLD && g <= THRESHOLD && b <= THRESHOLD) {
      data[i + 3] = 0;
    }
  }
  const out = await sharp(Buffer.from(data), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
  const tmp = `${abs}.tmp.${process.pid}.png`;
  fs.writeFileSync(tmp, out);
  fs.renameSync(tmp, abs);
  console.log("OK", path.relative(process.cwd(), abs));
}

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("Usage: node scripts/remove-black-png-alpha.mjs <png> [...]");
  process.exit(1);
}
await Promise.all(files.map(processFile));
