import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { page, articleHeader, heroFigure, figure, gallery, articleNav } from "./layout.mjs";
import { img } from "./img.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const P = "multipoint";
const i = (name, alt) => figure(img(P, name), alt);

const hero = img(P, "1459282806021-2J8EZU4KFBU7YY8VGHQ6-image-asset.jpeg");

const firstIterationGallery = gallery(
  [
    ["1459289646610-UUD1XCA916VUNYRE5WFJ-image-asset.jpeg", "First iteration: setting waypoints on the X/Y axis"],
    ["1459290137857-ZD2PY4XROFYEO3UNOUGN-image-asset.jpeg", "First iteration, alternate waypoint state"],
    ["1459289948812-2O7GX4TP8628XA4ZBQHH-image-asset.jpeg", "First iteration, waypoint path preview"],
  ].map(([f, alt]) => ({ img: img(P, f), alt }))
);

const finalKeyframeGallery = gallery(
  [
    ["1459291722862-2MOMSTXGP9XWP2BMMEG9-multipoint-cable-cam-01.jpg", "Set first point"],
    ["1459291748525-W4HAEF6UG8B09A9I2I93-image-asset.jpeg", "Set another point"],
    ["1459291830830-AH7LFMOA9DKBUD7FGSSB-image-asset.jpeg", "Set last point"],
    ["1459291851500-W48R30YPU6A2UP23JJZ2-image-asset.jpeg", "Final path"],
  ].map(([f, alt]) => ({ img: img(P, f), alt }))
);

const body = `
${articleHeader({
  eyebrow: "3DR Solo app · Feature design",
  title: "Multipoint cablecam",
  lede: "Focus on framing, not flying.",
  meta: [["My role", "Lead designer — flows, wireframes, concepts, prototypes and interaction specifications, working closely with developers and flight engineers on implementation"]],
})}
${heroFigure(hero, "Multipoint cablecam feature in the 3DR Solo app")}

<div class="atm-container">
  <div class="prose">
    <h2>About multipoint cablecam</h2>
    <p>Multipoint cablecam for 3DR’s Solo lets users set unlimited keyframes in the air to create cinematic shots, without worrying about piloting the copter, by remembering and smoothing the path between them.</p>

    <h2>Sketches and designs</h2>
    <p>The first iteration let users tap to add waypoints, with the camera pointing at a fixed angle on each keyframe. That was limiting — users could only think in the X/Y axis, with no reference for what they were actually shooting.</p>
    ${firstIterationGallery}
    <p>Further user research showed that users think in camera framing, not points in space — their intent was to capture a specific frame from an angle, whether a photo or a video sequence. For the final implementation, users fly to the framing they want and create a keyframe there, saving the X, Y, Z position and camera angle.</p>
    ${finalKeyframeGallery}
    <p>Once keyframes were set, moving between them had to be simple and intuitive, and it was critical to communicate where the copter was relative to the next keyframe — especially when filming a choreographed sequence.</p>
    ${i("1459283400620-MS31PKWZCIBM4UUFWSU0-image-asset.jpeg", "Paper sketch")}
    ${i("1459283431467-PJQ3AYTKO63TXZV3NVCT-Screen-Shot-2016-03-29-at-1.30.08-PM.png", "Controls concept")}
    ${i("1459285094039-KFXJHX21YCKJNXGVLTQZ-multipoint-cable-cam-interaction-keys.jpg", "Interaction concept")}
    ${i("1459286289347-Y4S1ZVP1BBMW6U1AR9TP-image-asset.jpeg", "Final design")}
    ${i("1459287739516-7W6GHXI68QRC2Q8X3GHM-insta.gif", "Multipoint cablecam in action")}
  </div>
</div>
${articleNav()}
`;

writeFileSync(
  path.join(ROOT, "multipoint.html"),
  page({
    title: "Multipoint Cable-cam — 3DR Solo App Feature — Ed Guillen",
    description:
      "Multipoint cable-cam for 3DR's Solo lets users set unlimited keyframes in the air to create amazing cinematic shots without worrying about piloting the copter.",
    activeNav: "work",
    path: "/multipoint",
    bodyHtml: body,
  })
);
console.log("Wrote multipoint.html");
