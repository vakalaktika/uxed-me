import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { page } from "./layout.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const body = `
<section class="atm-container article-header" style="padding-bottom:var(--space-11)">
  <p class="atm-eyebrow">Confidential</p>
  <h1>This project is under NDA</h1>
  <p class="t-body-lg lede" style="color:var(--ink-secondary)">This case study is gated by Cloudflare Access. If you have a one-time code, use the link your reviewer shared with you to sign in.</p>
  <a class="atm-btn atm-btn--secondary" href="/" style="margin-top:var(--space-4)">← Back to work</a>
</section>
`;

mkdirSync(path.join(ROOT, "protected"), { recursive: true });
writeFileSync(
  path.join(ROOT, "protected", "project-three.html"),
  page({
    title: "Confidential project — Ed Guillen",
    description: "NDA-gated case study.",
    activeNav: "",
    path: "/protected/project-three",
    bodyHtml: body,
  })
);
console.log("Wrote protected/project-three.html");
