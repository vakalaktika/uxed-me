import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { page, articleHeader, heroFigure, figure, gallery, articleNav } from "./layout.mjs";
import { img } from "./img.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const P = "atat-attack";
const i = (name, alt) => figure(img(P, name), alt);

const hero = img(P, "1459376106908-GQU1V4JVG3M31YUWINM3-image-asset.jpeg");

const processGallery = gallery(
  [
    ["1459382302550-N7S3O7DIV0XE5CTWXLX1-image-asset.gif", "Original handheld video plate"],
    ["1459380302002-99JQ0UJPP4BXJMOQ5D2L-image-asset.gif", "Cinema 4D environment rig"],
    ["1459380768424-5J9DSNSXMW8TA5ALQ5XO-image-asset.gif", "Video composited with 3D elements"],
    ["1459383168540-912FJZLFC8FI3HTMCYPQ-image-asset.gif", "Final composition"],
  ].map(([f, alt]) => ({ img: img(P, f), alt }))
);

const body = `
${articleHeader({
  eyebrow: "Concept video · Passion project",
  title: "AT-AT Attack",
  lede: "When fandom and free time collide.",
  meta: [
    ["My role", "Concept video, video tracking (After Effects), 3D environment rig (Cinema 4D), FX and final composition (After Effects, Premiere), audio editing (Audition)"],
  ],
})}
${heroFigure(hero, "AT-AT Attack concept still, an augmented-reality drone game")}

<div class="atm-container">
  <div class="prose">
    <h2>About AT-AT Attack</h2>
    <p>AT-AT Attack is a video concept that puts the user in the front seat of a drone copter taking on a barrage of AR AT-ATs and AT-STs in a real-world environment.</p>

    <h2>Initial concept</h2>
    <p>The original idea was a mix of daydreaming, hobbies, and a love of Star Wars.</p>
    ${i("1459376964111-NR7WDZKLDEJ0X5VANKXS-image-asset.jpeg", "Early AT-AT Attack concept sketch")}
    ${i("1459377208362-EMVTN75HK65XGHA0AL9Y-image-asset.jpeg", "Early AT-AT Attack concept sketch, alternate angle")}
    <p>Once the idea had been planted, I had to make it a reality. We started by shooting a path for where the “ship” would fly through. The challenge was getting correct camera tracking and blending it with the AR environment — accomplished with the Cinema 4D plug-in and a few 3D models sourced from SciFi3D.com.</p>
    ${processGallery}
  </div>
</div>
${articleNav()}
`;

writeFileSync(
  path.join(ROOT, "atat-attack.html"),
  page({
    title: "AT-AT Attack — AR Drone Game Concept — Ed Guillen",
    description:
      "AT-AT Attack is a video concept that puts the user in the front seat of a drone copter taking on a barrage of AR AT-AT’s and AT-ST’s in a real world environment.",
    activeNav: "work",
    path: "/atat-attack",
    bodyHtml: body,
  })
);
console.log("Wrote atat-attack.html");
