/* Local preview server. No dependencies.
   Mirrors how Cloudflare Pages serves this repo: static files from the repo
   root, with extensionless URLs resolving to `<name>.html` (so `/about`
   works, not just `/about.html`) and the `_redirects` rules applied. */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.PORT) || 8765;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
};

// `_redirects`: "<from> <to> <status>", one per line.
const redirects = new Map(
  (await readFile(path.join(ROOT, "_redirects"), "utf8").catch(() => ""))
    .split("\n")
    .map((l) => l.trim().split(/\s+/))
    .filter(([from, to]) => from?.startsWith("/") && to)
    .map(([from, to, code]) => [from, { to, code: Number(code) || 301 }])
);

const isFile = (p) => stat(p).then((s) => s.isFile()).catch(() => false);

async function resolve(urlPath) {
  const clean = path.posix.normalize(decodeURIComponent(urlPath.split("?")[0]));
  if (clean.includes("..")) return null;
  const abs = path.join(ROOT, clean);
  for (const candidate of [
    clean.endsWith("/") ? path.join(abs, "index.html") : abs,
    `${abs}.html`,
    path.join(abs, "index.html"),
  ]) {
    if (await isFile(candidate)) return candidate;
  }
  return null;
}

createServer(async (req, res) => {
  const urlPath = req.url.split("?")[0];
  const redirect = redirects.get(urlPath);
  if (redirect) {
    res.writeHead(redirect.code, { Location: redirect.to });
    return res.end();
  }
  const file = await resolve(urlPath);
  if (!file) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end(`404 — no page or asset at ${urlPath}\n`);
  }
  res.writeHead(200, {
    "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  createReadStream(file).pipe(res);
}).listen(PORT, "127.0.0.1", () => {
  console.log(`uxed.me preview → http://127.0.0.1:${PORT}`);
});
