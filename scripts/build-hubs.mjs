import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { page, caseCard } from "./layout.mjs";
import { img } from "./img.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

/* -------- /solo-app-case-studies : 3DR Solo hub -------- */
const soloCards = [
  {
    href: "/multipoint",
    img: img("solo-app-case-studies", "1459294290246-OQTZHRZ7S32OF9AH3U6T-image-asset.jpeg"),
    alt: "Multipoint cablecam feature",
    title: "Multipoint cablecam",
    body: "Set unlimited keyframes in the air to create cinematic shots without piloting the copter.",
  },
  {
    href: "/saving-loading-smart-shots",
    img: img("solo-app-case-studies", "1459295790196-SBKHJXQD09HEEETDWFN3-image-asset.jpeg"),
    alt: "Saving and loading smart shots feature",
    title: "Saving and loading smart shots",
    body: "Reload a complex flying path with the ease of a few taps.",
  },
];

writeFileSync(
  path.join(ROOT, "solo-app-case-studies.html"),
  page({
    title: "Solo App Case Studies — Ed Guillen",
    description:
      "3DR Solo is a simple, streamlined mobile interface for aerial photography. With computer-assisted “Smart Shots,” it lets you focus on capturing, not flying.",
    activeNav: "work",
    path: "/solo-app-case-studies",
    bodyHtml: `
<section class="atm-container article-header">
  <p class="atm-eyebrow">3DR Solo app</p>
  <h1>Solo App case studies</h1>
  <p class="t-body-lg lede" style="color:var(--ink-secondary)">Solo is a simple, streamlined mobile interface for aerial photography. With computer-assisted “Smart Shots,” it lets you concentrate on capturing, not flying.</p>
</section>
<section class="atm-container" style="padding-bottom:var(--space-11)">
  <div class="hub-grid">
    ${soloCards.map(caseCard).join("\n    ")}
  </div>
</section>`,
  })
);
console.log("Wrote solo-app-case-studies.html");

/* -------- /solo-app-case-studies-1 : SiteScan hub -------- */
const siteScanCard = caseCard({
  href: "/site-scan",
  img: img("solo-app-case-studies-1", "1460421548420-UVG5JD2Q3M47QZPZJL44-front-page-inspect.jpg"),
  alt: "SiteScan Inspect tool",
  title: "Inspect tool",
  body: "Safely maneuver a drone for close-up inspections of hard-to-access structures.",
});

writeFileSync(
  path.join(ROOT, "solo-app-case-studies-1.html"),
  page({
    title: "Site Scan App Case Studies — Ed Guillen",
    description:
      "Site Scan is an aerial analytics platform used to survey, scan, and inspect work sites.",
    activeNav: "work",
    path: "/solo-app-case-studies-1",
    bodyHtml: `
<section class="atm-container article-header">
  <p class="atm-eyebrow">SiteScan app</p>
  <h1>Site Scan App case studies</h1>
  <p class="t-body-lg lede" style="color:var(--ink-secondary)">Site Scan is an aerial analytics platform used to survey, scan, and inspect work sites.</p>
</section>
<section class="atm-container" style="padding-bottom:var(--space-11)">
  <div class="hub-grid" style="max-width:400px">
    ${siteScanCard}
  </div>
</section>`,
  })
);
console.log("Wrote solo-app-case-studies-1.html");
