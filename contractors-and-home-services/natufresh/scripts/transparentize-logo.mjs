/**
 * Converts flat black (and its anti-alias) in natufresh-logo.png to alpha.
 * Run: node scripts/transparentize-logo.mjs
 */
import sharp from "sharp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { existsSync, renameSync, unlinkSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const input = join(root, "public/images/natufresh-logo.png");
const tmp = input + ".tmp.png";

function isBlackMatte(r, g, b) {
  // True black
  if (r <= 12 && g <= 12 && b <= 12) return true;
  // Dark neutral used for black→white AA (R≈G≈B)
  const maxc = Math.max(r, g, b);
  const minc = Math.min(r, g, b);
  if (maxc > 60) return false;
  if (maxc - minc > 20) return false; // has chroma = part of the mark, keep
  if (maxc < 50 && r + g + b < 95) return true; // very dark grey mat
  return false;
}

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

if (info.channels !== 4) {
  console.error("Expected RGBA");
  process.exit(1);
}

const { width, height } = info;
const outBuf = Buffer.from(data);
for (let i = 0; i < outBuf.length; i += 4) {
  const r = outBuf[i];
  const g = outBuf[i + 1];
  const b = outBuf[i + 2];
  if (isBlackMatte(r, g, b)) {
    outBuf[i + 3] = 0;
  }
}

await sharp(outBuf, {
  raw: { width, height, channels: 4 },
})
  .png({ compressionLevel: 9, effort: 10 })
  .toFile(tmp);

if (!existsSync(tmp)) {
  process.exit(1);
}
try {
  unlinkSync(input);
} catch {
  /* */
}
renameSync(tmp, input);
console.log("Updated:", input);
