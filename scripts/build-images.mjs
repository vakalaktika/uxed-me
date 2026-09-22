// One-time (re-runnable) image pipeline: reads uxed-crawl/images/<slug>/*,
// ignores the (often wrong) file extension and detects the real format,
// re-encodes everything to WebP capped at a sensible max width, and writes
// assets/img/<slug>/<name>.webp plus a JSON manifest of {width,height} so
// page templates can set explicit <img width height> and avoid layout shift.
//
// Not part of the Cloudflare Pages build — run locally with
// `node scripts/build-images.mjs` whenever uxed-crawl/images changes.
import { readdirSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "../../uxed-crawl/images");
const OUT = path.join(__dirname, "../assets/img");
const MAX_WIDTH = 1600;
const QUALITY = 82;

function slugForFile(originalName) {
  // Squarespace names are `<uuid>-<name>.ext` or `<timestamp>-<ID>-<name>.ext`.
  // Keep a short piece of that unique id as a prefix (readable names alone
  // collide — e.g. two different uploads both called "image-asset.jpg").
  const stem = originalName.replace(/\.[^.]+$/, "");
  const match =
    stem.match(/^([0-9a-f]{8})[0-9a-f-]*-(.+)$/i) ||
    stem.match(/^\d{10,}-([A-Z0-9]{6,})-(.+)$/);
  const [, idPart, namePart] = match ?? [, "", stem];
  const cleanedName = (namePart || stem)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const cleanedId = idPart.toLowerCase().slice(0, 8);
  return cleanedId ? `${cleanedId}-${cleanedName}` : cleanedName;
}

const manifest = {};

for (const pageDir of readdirSync(SRC)) {
  const srcDir = path.join(SRC, pageDir);
  if (!statSync(srcDir).isDirectory()) continue;
  const outDir = path.join(OUT, pageDir);
  mkdirSync(outDir, { recursive: true });
  manifest[pageDir] = {};

  for (const file of readdirSync(srcDir)) {
    const srcPath = path.join(srcDir, file);
    const base = slugForFile(file);
    const outName = `${base}.webp`;
    const outPath = path.join(outDir, outName);

    const img = sharp(srcPath, { animated: file.toLowerCase().endsWith(".gif") });
    const meta = await img.metadata();
    const width = Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH);

    await img
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);

    const outMeta = await sharp(outPath).metadata();
    manifest[pageDir][file] = {
      src: `/assets/img/${pageDir}/${outName}`,
      width: outMeta.width,
      height: outMeta.height,
    };
    console.log(`${pageDir}/${file} -> ${outName} (${outMeta.width}x${outMeta.height})`);
  }
}

writeFileSync(
  path.join(__dirname, "image-manifest.json"),
  JSON.stringify(manifest, null, 2)
);
console.log(`\nWrote scripts/image-manifest.json (${Object.keys(manifest).length} pages)`);
