import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { page, articleHeader, heroFigure, figure, gallery, articleNav } from "./layout.mjs";
import { img } from "./img.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const P = "site-scan";
const i = (name, alt) => figure(img(P, name), alt);

const hero = img(P, "1460403994579-VJU5465JSSOO3I19SEK1-image-asset.jpeg");

const firstIterationGallery = gallery(
  [
    ["1460396650705-AGAQDF508LMGEXRQX28U-image-asset.png", "User can tap anywhere on the map to select a destination"],
    ["1460396813280-GQRFWBNRD0R9LCYKL9J4-image-asset.png", "User is directed to long-press the destination to travel"],
    ["1460396846791-BU27TEFF9YH74F3BVI1S-image-asset.png", "User has selected a destination and a path is drawn"],
    ["1460396694772-7EOS08O5LUCBWPX5PWZ4-image-asset.png", "Vehicle begins travel; the user can pause to select a new destination"],
    ["1460399252854-X5M1V1JPI1GEZ3SDLNCB-image-asset.png", "Map overview with picture-in-picture first-person view"],
    ["1460399203590-Q4MJ293HSYIA0CQP661B-image-asset.png", "User can toggle to first-person view while keeping visibility of the map"],
  ].map(([f, alt]) => ({ img: img(P, f), alt }))
);

const body = `
${articleHeader({
  eyebrow: "SiteScan app · Feature design",
  title: "Site Scan — Inspect tool",
  lede: "Keeping inspectors safe on the ground.",
  meta: [["My role", "Flows, wireframes, concepts, prototypes and interaction specifications, working closely with developers and flight engineers on implementation"]],
})}
${heroFigure(hero, "Site Scan inspect tool interface")}

<div class="atm-container">
  <div class="prose">
    <p class="t-body-lg" style="color:var(--ink-secondary)">The Site Scan tools enable the user to safely perform previously difficult tasks that required advanced knowledge of flying a UAV.</p>

    <h2>About the inspect tool</h2>
    <p>The Inspect tool lets users easily and safely maneuver the copter for close-up inspections of hard-to-access areas, like the top of a cell tower or the side of a high-rise. It does this through paradigms users already know: zoom in/out, drag the map to select a destination, pan to look around, tap to center a point of interest.</p>

    <h2>Why an inspection tool</h2>
    ${i("1460411481163-PB2L5SNXYQVMWMUZNR8F-image-asset.jpeg", "Cell tower inspection scenario")}
    <p>Climbing to inspect large or tall structures is challenging and dangerous — an inspector might climb up to 200ft to assess a faulty cell tower, then have to move around the structure if the damage is on the far side, then climb a second time to fix it. That takes time and puts the inspector’s life at risk with every climb.</p>
    <p>Enter the Inspect tool: the inspector flies a drone to and around the cell tower, getting as close as safely possible with a few taps and swipes, taking pictures from as many points of view as needed. Quick, safe, reliable.</p>

    <h2>The challenge</h2>
    <p>We needed a tool that was easy to learn and free of frustrating pain points — this would be used many times a day — and, most importantly, gave users the feedback they needed to safely maneuver the copter in space.</p>

    <h2>Selecting altitude and destination</h2>
    <h3>First iteration</h3>
    <p>In the first iteration, tapping the screen selected a destination and previewed the copter’s path; long-pressing the destination started the flight, and the user could pause at any point to pick a new destination. Users could also adjust altitude to fine-tune visibility of the object being inspected, then return to full first-person view to take pictures.</p>
    ${firstIterationGallery}
    <p>During user testing we quickly learned this wasn’t very intuitive — users had trouble selecting a destination because their finger obstructed it. Of 40 users interviewed, 80% reported this issue, 15% were indifferent, and 5% liked the select-destination paradigm.</p>

    <h3>Final implementation</h3>
    <p>Taking note from user testing, the new approach eliminated the pain points users encountered:</p>
    <ul>
      <li>A more intuitive altitude bar with a better readout of the copter’s behavior</li>
      <li>A more familiar destination selector that gives visibility of the desired point of interest</li>
      <li>Added fine-tuning controls for better first-person-view inspection adjustments</li>
    </ul>

    <h3>Adjusting altitude</h3>
    <p>The altitude bar was redesigned for more control and a better feedback loop of the copter’s behavior. The biggest change was a current-altitude indicator that visually showed whether the copter was ascending or descending.</p>
    ${i("1460415607263-SWBK2SYUXKNORKR7XOGM-image-asset.jpeg", "Old altitude bar")}
    ${i("1460415627095-QGPXL4XRNDC2UPLW6TOU-image-asset.jpeg", "New altitude bar")}

    <h3>Destination selector</h3>
    <p>The new destination selector has users drag the map instead of tapping a point, to select the point-of-interest area they want the copter to fly toward — which also let them choose a new destination mid-flight, for example to route around an unexpected obstacle like a crane.</p>
    ${i("1460418301594-BSSR2PMI7MAHMWB65LM8-image-asset.png", "User is instructed to drag the map to select a destination")}
    ${i("1460418275396-VA3CZIHNESEPAFMQLSOO-image-asset.png", "Dragging the map shows a reticle and a connecting line indicating the intended travel path")}
    ${i("1460417714508-GCWOG4NBGMWYZ6T1HKC0-image-asset.png", "Pressing Travel starts the copter’s trajectory; the destination can be changed by dragging and pressing Travel again")}

    <h3>Fine-tuning controls and FPV</h3>
    <p>Judging distance between two objects from far away is difficult even for skilled pilots, let alone a novice — and inspecting a structure can be hard from the ground. Fine-tuning controls help users get as close as they need to the structure safely, moving the copter forward, back, and to the sides in 1ft increments — the increment that felt safest to most users after extensive testing. Long-pressing a direction moves the copter incrementally at a slow, safe speed.</p>
    ${i("1460419163226-LEJT88IB78316YXKM0SK-image-asset.png", "Fine-tuning inspection controls, resting state")}
    ${i("1460419181051-KZFWVSY480OYRNKZI7YY-image-asset.png", "Fine-tuning inspection controls, active state")}
    <p>Quickly switching between the map and FPV views matters a lot, especially when inspecting multiple structures or objects in a single flight.</p>
    ${i("1460419841818-M1WYBO4KSPU6NFU2JSJD-image-asset.png", "Full FPV view: maximum visibility from the copter’s perspective")}
    ${i("1460420846340-ZELIK51HVUQBZSRVQ2NG-image-asset.png", "Split-screen view: navigation control and copter perspective, the default view")}
    ${i("1460420831171-D5QQIKIRM4R441K5JXGI-image-asset.png", "Map view: maximum navigation control from a top-down view")}
    <p>This round of changes greatly improved the feature: 95% of users reported feeling happier and safer flying, and new users felt more confident on their first flight.</p>
  </div>
</div>
${articleNav()}
`;

writeFileSync(
  path.join(ROOT, "site-scan.html"),
  page({
    title: "Inspect Tool — 3DR SiteScan App Feature — Ed Guillen",
    description:
      "The Site Scan tools enable the user to safely perform previously difficult tasks that required advanced knowledge of flying a UAV.",
    activeNav: "work",
    path: "/site-scan",
    bodyHtml: body,
  })
);
console.log("Wrote site-scan.html");
