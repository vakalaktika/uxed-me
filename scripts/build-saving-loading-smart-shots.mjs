import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { page, articleHeader, heroFigure, figure, gallery, articleNav } from "./layout.mjs";
import { img } from "./img.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const P = "saving-loading-smart-shots";
const i = (name, alt) => figure(img(P, name), alt);

const hero = img(P, "1459363529675-62PL1ILL62TZUVWAIFRA-image-asset.jpeg");

const conceptGallery = gallery(
  [
    ["1459367711752-F18Q0BQEL2EYMMWW0EOA-image-asset.jpeg", "Smart shot sample video sketch"],
    ["1459368031445-RYY5A1C8N2GCE0IVNRJU-image-asset.jpeg", "Smart shot list sketch"],
    ["1459367622279-EU3AITCC48OACNX10RBY-image-asset.gif", "Smart shot sample video concept"],
    ["1459367916088-X8JWL4VHRE95BRDUT3RH-image-asset.jpeg", "Smart shot list concept"],
  ].map(([f, alt]) => ({ img: img(P, f), alt }))
);

const finalGallery = gallery(
  [
    ["1459372001794-8YEI6Z4GLSA9QT5I28F4-load-cable-fly-to.gif", "Copter autonomously flying to the cable start point"],
    ["1459372021698-QC650CCNYB5VY3BHTYHX-image-asset.jpeg", "Loaded cable preview on the map"],
    ["1459371953806-0LJN9WT00LSSTY6SXMML-image-asset.gif", "Loading a saved smart shot"],
    ["1459370617797-L1JCX3ZSLIMOT63DXT95-load-cable-ready.jpg", "Cable ready to fly"],
    ["1459369079752-BNE7TTJKSG57E38USWTN-image-asset.gif", "Final implementation"],
  ].map(([f, alt]) => ({ img: img(P, f), alt }))
);

const body = `
${articleHeader({
  eyebrow: "3DR Solo app · Feature design",
  title: "Saving/loading smart shots",
  lede: "Don’t restart, just reload.",
  meta: [["My role", "Lead designer — flows, wireframes, concepts, prototypes and interaction specifications, working closely with developers and flight engineers on implementation"]],
})}
${heroFigure(hero, "Saving and loading smart shots in the 3DR Solo app")}

<div class="atm-container">
  <div class="prose">
    <h2>About saving/loading smart shots</h2>
    <p>Saving/loading smart shots gives users the ability to quickly reload a complex flying path with a few taps — giving them the confidence to get the exact picture or sequence every time.</p>

    <h2>The challenge</h2>
    <p>Being able to create complex flying paths in the sky raised a lot of “what ifs”: what if I forget to save my path, what if I run out of battery, what if I lose connection mid-flight, what if I want to fly this path again another day, what if I want to use a different copter? It all pointed to saving and reloading a path in the sky quickly and intuitively.</p>

    <h2>Saving the path</h2>
    <p>We live in a time where most of our data is saved (and sometimes restored) automatically, and this was no different. User research kept surfacing the same questions: can you save any path, should you, what if I forget? That led us to auto-save any path as soon as the user sets two keyframes, and continuously after — because uncontrollable factors could otherwise cost the user all the work of framing the perfect shot.</p>
    ${i("1459366209904-VMPDUMJ5N4M9NHF9037B-image-asset.jpeg", "Auto-saving a flight path")}
    <p>This auto-saving mechanic also let users get their work back and be flying their path again within seconds.</p>

    <h2>Loading a smart shot</h2>
    <p>Loading smart shots needed to be quick, intuitive, and easy to browse. Research showed the target user would likely have several similar paths in the same area — wanting a similar camera sequence with different points of interest. With that in mind, we presented users a few concepts.</p>
    ${conceptGallery}
    <p>Even though a vivid video preview seemed delightful, research showed it was much easier for users to pick from a simple list than a panel of moving images.</p>

    <h2>Final implementation</h2>
    <p>The final implementation lets the user quickly preview the path on the map and directs them to fly to the position and altitude of the first point. If already nearby, they’re offered the option to load the cable, and the copter autonomously flies to the exact start point.</p>
    ${finalGallery}
    <p>Sometimes the best approach is simplicity — and following a mental model the user is already familiar with.</p>
  </div>
</div>
${articleNav()}
`;

writeFileSync(
  path.join(ROOT, "saving-loading-smart-shots.html"),
  page({
    title: "Saving/Loading Smart Shots — 3DR Solo App Feature — Ed Guillen",
    description:
      "Saving/Loading smart shots gives users the ability to quickly reload a complex flying path with the ease of a few taps.",
    activeNav: "work",
    path: "/saving-loading-smart-shots",
    bodyHtml: body,
  })
);
console.log("Wrote saving-loading-smart-shots.html");
