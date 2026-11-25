// Draws the crop consulting illustrations in public/images/consulting.
// Run from the project root: npm run draw
import { mkdirSync, writeFileSync } from "node:fs";
import { at, frill, leaf, line, oval, path } from "./draw-helpers.mjs";
import { SKY, crate, flower, fruit, greens, ground, hills, leaves, roots, stages, stemLine, svg } from "./draw-plants.mjs";

const OUT = "public/images/consulting";
mkdirSync(OUT, { recursive: true });

// ---------- One picture per stage ----------
stages.forEach((stage, i) => {
  const y = 320;
  writeFileSync(`${OUT}/stage-${i + 1}.svg`, svg(560, 480, `<rect width="560" height="480" fill="${SKY}"/>${hills(560, y)}${oval(470, 112, 32, 32, "#f6c94f")}${ground(560, 480, y)}${at(280, y + 4, 0, 1.05, stage())}${i === 4 ? crate(120, y + 2, 0.72) : ""}`));
});

// ---------- Hero: the whole season in one row ----------
function hero(animate) {
  const w = 1500, h = 440, y = 318;
  const plants = stages.map((stage, i) => {
    const motion = animate ? `class="grow" style="animation-delay:${0.2 + i * 0.28}s"` : "";
    return `<g transform="translate(${170 + i * 290} ${y + 4})"><g ${motion}><g transform="scale(0.98)">${stage()}</g></g></g>`;
  }).join("");
  // Plants rise out of the soil line, so the origin of each group is its base.
  const style = animate ? "<style>.grow{animation:grow 1s cubic-bezier(.2,.8,.2,1) both}@keyframes grow{from{opacity:0;transform:scale(.7,.02)}}</style>" : "";
  return svg(w, h, style + hills(w, y) + oval(1185, 62, 36, 36, "#f6c94f") + ground(w, h, y) + plants + crate(1496 - 70, y + 4, 0.6));
}
writeFileSync(`${OUT}/hero.svg`, hero(true));
writeFileSync(`${OUT}/hero-still.svg`, hero(false));

// ---------- Plant for describing a problem, with one spotlight per part ----------
{
  const w = 720, h = 680, x = 360, y = 468;
  const groups = {
    roots: roots(168),
    stem: stemLine(356, 13),
    leaves: leaves(356, 4, 158),
    flowers: flower(40, -250, 1.5) + flower(-44, -232, 1.5) + flower(20, -340, 1.4) + flower(62, -300, 1.2),
    fruit: fruit(-62, -84, 34, true) + fruit(66, -122, 32, true) + fruit(-48, -158, 27, false) + fruit(54, -190, 25, false),
  };
  const place = (content, extra = "") => `<g transform="translate(${x} ${y})" ${extra}>${content}</g>`;
  const order = ["roots", "stem", "leaves", "flowers", "fruit"];
  const backdrop = `<rect width="${w}" height="${h}" fill="${SKY}"/>${hills(w, y)}${ground(w, h, y - 4)}`;
  // Pointers run from the buttons placed by problem-picker.tsx.
  const parts = {
    leaves: { at: [214, 300], label: [96, 156] },
    flowers: { at: [424, 168], label: [590, 96] },
    fruit: { at: [424, 346], label: [626, 300] },
    stem: { at: [358, 408], label: [92, 400] },
    roots: { at: [452, 560], label: [610, 600] },
    whole: { at: [300, 462], label: [118, 596] },
  };
  const pointer = ({ at: [ax, ay], label: [lx, ly] }, color, width) =>
    line(`M${ax} ${ay}L${lx} ${ly}`, color, width) + oval(ax, ay, 6, 6, "#f6b92b", `stroke="${color}" stroke-width="2"`);
  writeFileSync(`${OUT}/plant.svg`, svg(w, h, backdrop + place(order.map((key) => groups[key]).join("")) + Object.values(parts).map((part) => pointer(part, "#13251d", 2)).join("")));
  for (const [key, part] of Object.entries(parts)) {
    const shown = key === "whole" ? order : [key];
    const lit = shown.map((name) => groups[name]).join("");
    writeFileSync(`${OUT}/plant-${key}.svg`, svg(w, h, `<rect width="${w}" height="${h}" fill="#13251d" fill-opacity="0.55"/>` + place(lit, 'stroke="#f6b92b" stroke-width="3" stroke-linejoin="round" paint-order="stroke"') + pointer(part, "#ffffff", 2.5)));
  }
}

// ---------- Which photos to send ----------
function phone(content) {
  return `<rect width="360" height="300" fill="#e3ede6"/><rect x="62" y="22" width="236" height="256" rx="22" fill="#13251d"/><clipPath id="screen"><rect x="74" y="36" width="212" height="206" rx="6"/></clipPath><g clip-path="url(#screen)"><rect x="74" y="36" width="212" height="206" fill="${SKY}"/>${content}</g>${oval(180, 260, 10, 10, "#fff")}` +
    line("M92 72V54H110M250 54H268V72M268 206V224H250M110 224H92V206", "#fff", 4);
}
const spots = [[-40, -14], [-8, 16], [26, -20], [54, 6], [10, -30], [-24, 30]].map(([sx, sy], i) => oval(sx, sy, 8 + (i % 2) * 3, 7, "#8a6a2c") + oval(sx, sy, 4, 3.5, "#5f4518")).join("");
const bugs = [[-30, -10], [0, 14], [34, -14], [58, 8], [-6, -24]].map(([bx, by]) => oval(bx, by, 5, 3.6, "#3b2a1a") + line(`M${bx - 5} ${by + 4}l-3 4M${bx + 5} ${by + 4}l3 4`, "#3b2a1a", 1.5)).join("");
const photos = {
  whole: at(180, 200, 0, 0.6, stages[3]()) + `<rect x="74" y="200" width="212" height="60" fill="#7a5836"/>`,
  close: at(170, 140, -18, 1, leaf(-130, 0, 270, 104, 0, "#5fae4a", "#ffffff66", 4) + spots),
  under: at(170, 140, 14, 1, leaf(-130, 0, 270, 104, 0, "#a9cf8d", "#6f9b55aa", 5) + bugs),
  field: hills(360, 126) + `<rect x="74" y="124" width="212" height="130" fill="#8b6740"/>` +
    [[140, 9, 26, 10], [160, 8, 34, 14], [186, 7, 46, 19], [220, 6, 62, 26]].map(([fy, count, gap, r], row) =>
      Array.from({ length: count }, (_, i) => {
        const weak = row > 0 && (i === 2 || (i === 3 && row > 1));
        const cx = 180 + (i - (count - 1) / 2) * gap;
        return oval(cx, fy + r * 0.5, r * 1.05, r * 0.2, "#6b4c2b") + path(frill(cx, fy, weak ? r * 0.75 : r, weak ? r * 0.5 : r * 0.72, 9, 0.22), weak ? "#c2a640" : greens[(i + row) % 3]);
      }).join("")).join(""),
};
for (const [name, content] of Object.entries(photos)) {
  writeFileSync(`${OUT}/photo-${name}.svg`, svg(360, 300, phone(content)));
}
console.log(`Crop consulting pictures drawn in ${OUT}`);
