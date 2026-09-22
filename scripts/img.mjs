import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(
  readFileSync(path.join(__dirname, "image-manifest.json"), "utf8")
);

// pageDir: the crawl image folder (e.g. "home", "cards-pattern")
// original: the filename as it appears in the crawl markdown's image src
export function img(pageDir, original) {
  const entry = manifest[pageDir]?.[original];
  if (!entry) throw new Error(`No manifest entry for ${pageDir}/${original}`);
  return entry;
}
