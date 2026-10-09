const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const globeBytes = fs.readFileSync(path.join(root, "3d", "earth.glb"));
const script = html.match(/<script>\s*([\s\S]*?)\s*<\/script>/)?.[1] || "";
const styles = html.match(/<style>\s*([\s\S]*?)\s*<\/style>/)?.[1] || "";

test("site is a self-contained static HTML document", () => {
  assert.match(html, /<!doctype html>/i);
  assert.match(html, /<html lang="fr">/);
  assert.ok(script.length > 0, "inline JavaScript exists");
  assert.ok(styles.length > 0, "inline CSS exists");
  const externalScripts = [...html.matchAll(/<script[^>]+\bsrc="([^"]+)"/gi)].map((match) => match[1]);
  assert.deepEqual(externalScripts, ["https://unpkg.com/@google/model-viewer@4.1.0/dist/model-viewer.min.js"]);
  assert.doesNotMatch(html, /<link[^>]+\brel=["']stylesheet["']/i);
  assert.doesNotThrow(() => new vm.Script(script), "inline JavaScript parses");
});

test("navigation anchors resolve to document sections or landmarks", () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  const anchors = [...html.matchAll(/\bhref="#([^"]+)"/g)].map((match) => match[1]);
  assert.ok(anchors.length > 0);
  anchors.forEach((anchor) => assert.ok(ids.has(anchor), `#${anchor} has a target`));
});

test("all project filters are data-backed and omit empty categories", () => {
  const expectedCategories = ["software", "embedded", "collaborations", "experience"];
  const configuredCategories = [...script.matchAll(/category:\s*"([^"]+)"/g)].map((match) => match[1]);
  const populatedCategories = new Set(configuredCategories);
  expectedCategories.forEach((category) => assert.ok(populatedCategories.has(category), `${category} has a real entry`));
  expectedCategories.forEach((category) => {
    assert.match(script, new RegExp(`${category}:\\s*"`), `${category} has a filter label`);
  });
  assert.match(script, /new Set\(projects\.map\(\(project\) => project\.category\)\)/);
  assert.match(script, /\["all", categoryLabels\.all\]/);
  assert.match(script, /if \(selectedProject && projectList\.querySelector/);
});

test("known project, collaboration, and experience details are present", () => {
  [
    "Java Practice Projects",
    "PowerApps Canvas App",
    "Typewriter",
    "ELEGOO UNO R4 WiFi Experiments",
    "StudentCorner",
    "NASA Space Apps",
    "Autism Support Worker",
    "Study Buddy",
    "PLANNED ITEMS ARE NOT IMPLEMENTED",
    "I recently purchased an ELEGOO UNO R4 WiFi kit and am learning Arduino",
  ].forEach((text) => assert.ok(html.includes(text), `${text} is represented`));
  assert.doesNotMatch(html, /GPA|expected graduation|testimonial/i);
  assert.doesNotMatch(html, /Rewriting the Code project|official Rewriting the Code/i);
});

test("Typewriter is listed under software with localized details and supplied links", () => {
  assert.match(script, /id: "typewriter",[\s\S]*?category: "software"[\s\S]*?statuses: \["Learning", "In progress"\]/);
  assert.match(script, /A cozy interactive writing app with 2D and 3D typewriter modes, typing sounds, ambient music, magical visual effects, and saved notes backed by PostgreSQL/);
  assert.match(script, /Une application d’écriture interactive et chaleureuse proposant des modes machine à écrire 2D et 3D/);
  assert.match(script, /self-directed learning project is deployed and still being improved/);
  assert.match(script, /Ce projet d’apprentissage autodirigé est déployé et continue d’évoluer/);
  ["Three.js", "Flask", "PostgreSQL"].forEach((technology) => {
    assert.match(script, new RegExp(`"${technology}"`), `${technology} is listed`);
  });
  assert.match(script, /https:\/\/typewriter-mu-drab\.vercel\.app\//);
  assert.match(script, /https:\/\/github\.com\/AurelieeF\/Typewriter/);
  assert.match(script, /projectText\(project, "links"\) \?\? project\.links/);
  assert.match(script, /anchor\.target = "_blank"/);
  assert.match(script, /anchor\.rel = "noopener noreferrer"/);
});

test("optional project fields start hidden and are populated only when supplied", () => {
  [
    "screenshot",
    "contribution",
    "planned",
    "technologies",
    "location",
    "demo",
    "links",
  ].forEach((field) => {
    assert.match(html, new RegExp(`data-field="${field}"[^>]*hidden`), `${field} is optional`);
  });
  assert.match(script, /if \(projectLinks\?\.length\)/);
  assert.match(script, /if \(project\.screenshot\)/);
  assert.match(script, /if \(project\.location\)/);
});

test("responsive layouts, visible focus, and reduced motion are defined", () => {
  assert.match(styles, /@media\s*\(max-width:\s*900px\)/);
  assert.match(styles, /@media\s*\(max-width:\s*600px\)/);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(styles, /:focus-visible/);
  assert.match(script, /setAttribute\("aria-pressed"/);
  assert.match(styles, /@media \(max-width: 760px\)[\s\S]*?\.project-card \{ grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(styles, /html \{ overflow-x: clip; \}/);
});

test("garden decoration stays lightweight, bounded, and non-interactive", () => {
  assert.match(html, /id="garden-flower"/);
  assert.match(html, /class="night-sky" aria-hidden="true"/);
  assert.match(html, /class="cursor-sparkles" aria-hidden="true"/);
  assert.match(html, /preserveAspectRatio="xMidYMid meet"/);
  assert.match(html, /viewBox="0 0 1000 460"/);
  assert.match(styles, /pointer-events:\s*none/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(script, /for \(let index = 0; index < 42; index \+= 1\)/);
  assert.match(script, /index < 12/);
  assert.match(script, /!finePointer\.matches/);
  assert.match(script, /document\.hidden/);
  assert.match(script, /toggle\("is-paused", document\.hidden\)/);
  assert.match(script, /focusedProject \|\| hoveredProject \|\| selectedProject/);
  assert.match(styles, /body \{ cursor: auto; \}/);
});

test("French is the default and the language toggle covers the complete portfolio", () => {
  assert.match(html, /id="language-toggle"[^>]*aria-label="Passer à l’anglais"[^>]*>EN</);
  assert.match(html, /let currentLanguage = "fr"/);
  assert.match(html, /document\.documentElement\.lang = currentLanguage/);
  assert.match(html, /setLanguage\(currentLanguage === "fr" \? "en" : "fr"\)/);
  assert.match(html, /projectLabels:\s*\{/);
  assert.match(script, /filterList\.replaceChildren\(\)/);
  assert.match(script, /projectList\.replaceChildren\(\.\.\.projects\.map\(createProjectCard\)\)/);
  [
    "GÉNIE LOGICIEL · ÉTS",
    "Projets et expériences.",
    "Baccalauréat en génie logiciel",
    "Intervenante en soutien aux personnes autistes",
    "Passer à l’anglais",
    "Switch to French",
  ].forEach((text) => assert.ok(html.includes(text), `${text} is available`));
});

test("the interactive globe loads the named GLB and preserves its named pins", () => {
  assert.equal(globeBytes.toString("ascii", 0, 4), "glTF");
  const jsonLength = globeBytes.readUInt32LE(12);
  const gltf = JSON.parse(globeBytes.toString("utf8", 20, 20 + jsonLength));
  const nodeNames = new Set(gltf.nodes.map((node) => node.name));
  assert.equal(gltf.scene, 2, "the selected scene contains the globe, sun, and pins");
  [
    "Rotating Earth.001",
    "Inner Sun.001",
    "Montréal · Canada",
    "Space Apps Universal Event · USA (symbolic)",
    "StudentCorner · Pakistan",
  ].forEach((name) => assert.ok(nodeNames.has(name), `${name} exists in the asset`));
  assert.ok(gltf.materials.some((material) => material.name === "Solar Plasma.001" && material.emissiveFactor?.[0] === 1));
  assert.match(html, /src="3d\/earth\.glb"/);
  assert.match(html, /@google\/model-viewer@4\.1\.0/);
  assert.match(html, /camera-controls/);
  assert.match(html, /aria-describedby="globe-text-alternative"/);
  assert.match(html, /data-position="0\.658m 2\.368m 2\.232m"/);
  assert.match(html, /data-position="-0\.448m 2\.089m 2\.541m"/);
  assert.match(html, /data-position="1\.030m 1\.660m -2\.684m"/);
  assert.match(script, /toggleAttribute\("auto-rotate", !globeMotionPreference\.matches\)/);
  assert.match(script, /viewer\.addEventListener\("error"/);
  assert.match(script, /otherPin\.setAttribute\("aria-pressed"/);
});

test("contact links are explicit and use descriptive labels", () => {
  assert.match(html, /href="https:\/\/github\.com\/AurelieeF\/"[^>]*data-i18n="githubLink"/);
  assert.match(html, /href="https:\/\/www\.linkedin\.com\/in\/aurelie-f-605966369\/"[^>]*data-i18n="linkedinLink"/);
  assert.match(html, /href="mailto:aurelie\.fidelia\.1@ens\.etsmtl\.ca"[^>]*data-i18n="emailLink"/);
  assert.match(script, /githubLink: "GitHub profile \(opens in a new tab\)"/);
  assert.match(script, /linkedinLink: "LinkedIn profile \(opens in a new tab\)"/);
  assert.match(script, /emailLink: "Email Aurélie Fidelia"/);
});
