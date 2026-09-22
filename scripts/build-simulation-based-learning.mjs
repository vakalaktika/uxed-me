import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { page, articleHeader, heroFigure, figure, gallery, articleNav } from "./layout.mjs";
import { img } from "./img.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const P = "simulation-based-learning";
const i = (name, alt) => figure(img(P, name), alt);

const hero = img(P, "1654557406716-V3QGPGZWBHAN2UGIJKTL-01---Item-Select-Page.png");

const interactionGallery = gallery(
  ["01", "02", "03", "04", "05", "06"].map((n, idx) => {
    const files = [
      "1654557586616-D95RX5YOSME8B1FTASQ2-Interaction_01.png",
      "1654557586617-8Y4SYRDIRNSV04E77XO1-Interaction_02.png",
      "1654557587148-J61YHPV30ZZH2F5HADSQ-Interaction_03.png",
      "1654557587252-GS5M8QTXHO0039O417ZS-Interaction_04.png",
      "1654557587697-VN0RPESCC7G72XWZLJEQ-Interaction_05.png",
      "1654557588005-55FDXB5Q5VEKXQSKVJ1M-Interaction_06.png",
    ];
    return { img: img(P, files[idx]), alt: `Layout ideation, interaction concept ${n}` };
  })
);

const flowGallery = gallery(
  [
    ["1654557406716-V3QGPGZWBHAN2UGIJKTL-01---Item-Select-Page.png", "Proof of concept — item select page"],
    ["1654557406781-P6ISL9DVRXI9IM7ELFZH-02---Compare-Page.png", "Proof of concept — compare page"],
    ["1654557407443-17YI3W3OJTTSRKOZQ905-03---Drawer-page.png", "Proof of concept — drawer page"],
    ["1654557407591-MJ5QC3EK5LXC3ON287LC-04---Assessment-Page.png", "Proof of concept — assessment page"],
    ["1654557408018-JYWLPLP404ES9TF0X3RZ-05---Assessment-Feedback-Page.png", "Proof of concept — assessment feedback page"],
    ["1654557408171-3D2UGHTEJE1HZFGZJJL1-06---Review-Page.png", "Proof of concept — review page"],
    ["1654557408763-5NLC274S8SJG4C4F5Z1B-07---Game-Results---100-Score.png", "Proof of concept — game results, 100% score"],
    ["1654557408904-OC3QKU2IQGX4EAAELPM8-08---Game-Results---60--90-Score.png", "Proof of concept — game results, 60–90% score"],
    ["1654557409365-0OLGWUDL69YKJJ09HLSR-09---Game-Results-_60-.png", "Proof of concept — game results, below 60% score"],
  ].map(([f, alt]) => ({ img: img(P, f), alt }))
);

const body = `
${articleHeader({
  eyebrow: "UX lead · Interaction design · IA design · Layout design · User research",
  title: "Simulation-based learning",
  lede: "Immersive and engaging learning through realistic scenario-based experiences.",
  meta: [
    ["Role", "UX Lead, Interaction Design, IA Design, Layout Design, User Research"],
    ["Cross-functional collaborators", "Content (Learning Experience), Visual Design, Implementation Specialist (Dev)"],
  ],
})}
${heroFigure(hero, "Item select screen from the finished simulation-based learning experience")}

<div class="atm-container">
  <div class="prose">
    <h2>Overview</h2>
    <p>An accessible, scalable simulation-based learning experience where learners analyze choices and make decisions based on current information, then get feedback on the impact of those choices. Learners practice new skills in realistic simulations grounded in accurate environmental science.</p>

    <h2>Solution approach</h2>
    <h3>What should we build, and how?</h3>
    <p>Before deciding how to build the simulation, I aligned with the cross-functional team to understand what we needed to build.</p>
    <p><strong>What are the learning objectives?</strong></p>
    <ul>
      <li>Analyze choices</li>
      <li>Make decisions based on current information</li>
      <li>Self-reflect on the choice made</li>
      <li>Understand the impact of the choice</li>
    </ul>
    <p><strong>How are they going to be achieved?</strong></p>
    <ul>
      <li>How would the user achieve the objectives?</li>
      <li>How do we want to tell the story?</li>
      <li>How can we make it a scalable solution?</li>
      <li>How can we minimize development time?</li>
    </ul>

    <h3>Work sessions</h3>
    <p>I led sessions to analyze the learning objectives, define scenarios, game mechanics and logic, and ideate and wireframe solutions — while keeping the solution adaptable to topics beyond environmental impact.</p>
    ${i("03400359-ad0f-4e57-9851-bba190ed1c6e-notes-1.png", "Discovery session notes")}

    <h3>Game flow, mechanics, logic</h3>
    <p>With the scenario and tasks as a blueprint, I designed the end-to-end game flow, which in turn defined the mechanics and logic.</p>
    ${i("d0c0c4b8-713b-4a8b-9232-04f8fbcb59f0-notes-2.png", "Game flow notes")}
    ${i("99a9295e-cb7c-4da3-82a1-e207a9c12b40-game-flow.png", "Flow describing each step in the learning simulation user journey")}
    ${i("da5ef213-4bed-432b-bac2-35aa9ca94fd5-game-logic.png", "Game logic diagram")}

    <h3>Layout ideation</h3>
    <p>In parallel, the team ideated on look and feel, weighing which existing components we could reuse to minimize development time and maximize scalability. We went through several iterations before starting a proof of concept.</p>
    ${interactionGallery}
    <p>At each incremental step, I met back with the larger team to review and iterate — keeping every stakeholder informed and heard, ahead of final sign-off.</p>

    <h3>Proof of concept</h3>
    <p>We worked with the platform implementation specialist to validate that the proposal could be built with low effort, and confirmed with stakeholders that the simulation could adapt to other topics.</p>
    ${flowGallery}
    <p>With a live proof of concept in hand, the next step was socializing it internally — testing the flow, mechanics, and design against the learning objectives.</p>

    <h2>Usability testing</h2>
    <p>We ran usability testing with the target audience through TryMyUI, and accessibility testing through Fable. Overall usability was strong, with comprehensive knowledge gained after completing the course.</p>
    <p>One pain point: learners felt the “money saved” element distracted from the main learning objective. We removed it from the core game mechanic but kept it on the final review page — for this topic, it mattered that the less expensive option isn’t always the more environmentally friendly one. We kept it as a mechanic in the code for future simulations that might need it.</p>

    <h2>Lessons learned</h2>
    <ul>
      <li>This was the first time we designed a learning simulation around learning objectives and scalability rather than a one-off experience for a specific topic — a shift that changed how I think about building engaging course experiences.</li>
      <li>EVERFI’s courses are built one module at a time, which leaves limited time for complex interactions like this one. I proposed starting larger tasks early and in parallel, so they get the full design cycle.</li>
    </ul>
  </div>
</div>
${articleNav()}
`;

writeFileSync(
  path.join(ROOT, "simulation-based-learning.html"),
  page({
    title: "Simulation-Based Learning Experience — Ed Guillen",
    description:
      "A realistic scenario-based game where the user analyzes choices, makes decisions from current information, and gets feedback on the impact of their choices.",
    activeNav: "work",
    path: "/simulation-based-learning",
    bodyHtml: body,
  })
);
console.log("Wrote simulation-based-learning.html");
