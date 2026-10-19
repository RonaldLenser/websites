import { copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const index = join(dist, "index.html");
const four04 = join(dist, "404.html");

if (existsSync(index)) {
  copyFileSync(index, four04);
  console.log("Wrote dist/404.html (SPA fallback for GitHub Pages).");
} else {
  console.warn("copy-404: dist/index.html not found, skip");
  process.exitCode = 1;
}
