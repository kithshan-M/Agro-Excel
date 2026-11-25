// Draws the crop consulting illustrations in public/images/consulting.
// Run from the project root: npm run draw
import { mkdirSync, writeFileSync } from "node:fs";
import { at, body, calyx, frill, leaf, line, n, oval, path, shine } from "./draw-helpers.mjs";

const OUT = "public/images/consulting";
const SKY = "#dcebf0";
const svg = (w, h, content) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${content}</svg>`;

// ---------- Tomato plant pieces. The plant stands at 0,0 and grows upwards. ----------
const greens = ["#3d8035", "#4f9a3f", "#5fae4a"];

/** Leaf made of several leaflets, like a tomato leaf. */
function bigLeaf(x, y, length, angle, color) {
  const pairs = [0.34, 0.62]
    .map((t, i) => leaf(length * t, 0, length * (0.36 - i * 0.04), length * 0.13, -58, color) + leaf(length * t, 0, length * (0.36 - i * 0.04), length * 0.13, 58, color))
    .join("");
  return at(x, y, angle, 1, line(`M0 0H${n(length * 0.7)}`, "#3d8035", 4) + pairs + leaf(length * 0.66, 0, length * 0.42, length * 0.17, 0, color));
}
function leaves(height, count, size) {
  let out = "";
  for (let i = 0; i < count; i++) {
    const t = (i + 0.7) / count;
    const y = -height * (0.14 + t * 0.82);
    const s = size * (1.05 - t * 0.38);
    out += bigLeaf(0, y, s, -14 - t * 26, greens[i % 3]) + bigLeaf(0, y + 8, s, -166 + t * 26, greens[(i + 1) % 3]);
  }
  return out + bigLeaf(0, -height, size * 0.5, -90, greens[2]);
}
const stemLine = (height, width) => line(`M0 6C4 ${n(-height * 0.4)} -4 ${n(-height * 0.7)} 0 ${-height}`, "#5b9a3c", width);
function roots(size) {
  return line(
    `M0 0C2 ${size * 0.4} -3 ${size * 0.7} 2 ${size}M0 ${size * 0.15}C${-size * 0.25} ${size * 0.3} ${-size * 0.4} ${size * 0.35} ${-size * 0.6} ${size * 0.62}M0 ${size * 0.15}C${size * 0.25} ${size * 0.3} ${size * 0.4} ${size * 0.35} ${size * 0.6} ${size * 0.58}M0 ${size * 0.4}C${-size * 0.12} ${size * 0.6} ${-size * 0.2} ${size * 0.65} ${-size * 0.32} ${size * 0.92}M0 ${size * 0.4}C${size * 0.12} ${size * 0.6} ${size * 0.22} ${size * 0.65} ${size * 0.34} ${size * 0.88}`,
    "#f0dcb4", Math.max(3, size * 0.045),
  );
}
const flower = (x, y, s) =>
  at(x, y, 0, s, Array.from({ length: 5 }, (_, i) => leaf(0, 0, 20, 6.5, i * 72 - 90, "#f6c93a", "#d99f1577", 1.2)).join("") + oval(0, 0, 5.5, 5.5, "#d98d15"));
const fruit = (x, y, r, ripe) =>
  at(x, y, 0, r / 60, line("M0 -46C-2 -66 -8 -74 -16 -82", "#4d8f3c", 7) +
    body("M0 -44C36 -56 62 -34 60 2C58 38 32 56 0 56C-32 56 -58 38 -60 2C-62 -34 -36 -56 0 -44Z", ...(ripe ? ["#dd4630", "#b52f1f"] : ["#9cc75a", "#78a33f"]), shine(-28, -14, 10, 18, 28)) + calyx(0, -40, 34, "#3f8438", 5, 12));
const stake = (height) => line(`M14 20V${-height}`, "#a87c36", 7) + line(`M-8 ${-height * 0.45}Q4 ${-height * 0.45 + 12} 18 ${-height * 0.45}M-8 ${-height * 0.74}Q4 ${-height * 0.74 + 12} 18 ${-height * 0.74}`, "#c79a4f", 4);

const stages = [
  () => [-34, 0, 34].map((x, i) => oval(x, 44 + (i % 2) * 8, 10, 6.5, "#f4e3bd", `transform="rotate(${i * 34 - 30} ${x} ${44 + (i % 2) * 8})"`)).join("") +
    line("M84 8V-92", "#a87c36", 7) + `<rect x="40" y="-136" width="92" height="58" rx="5" fill="#fffaf0" stroke="#a87c36" stroke-width="4"/>` + line("M56 -116H114M56 -98H98", "#7b9488", 5),
  () => roots(46) + stemLine(44, 7) + leaf(0, -42, 46, 17, -28, greens[2]) + leaf(0, -42, 46, 17, -152, greens[1]),
  () => roots(92) + stemLine(132, 9) + leaves(132, 3, 92),
  () => roots(122) + stake(236) + stemLine(212, 10) + leaves(212, 4, 104) + fruit(-34, -62, 19, false) + fruit(42, -96, 17, false) + flower(36, -164, 0.9) + flower(-34, -142, 0.95) + flower(12, -204, 0.8),
  () => roots(134) + stake(258) + stemLine(234, 11) + leaves(234, 4, 108) + fruit(-38, -62, 25, true) + fruit(44, -86, 24, true) + fruit(-32, -136, 21, true) + fruit(36, -162, 20, true) + fruit(6, -206, 16, false),
];
const crate = (x, y, s) =>
  at(x, y, 0, s, fruit(-44, -52, 25, true) + fruit(4, -60, 27, true) + fruit(50, -52, 25, true) + path("M-86 -40H86L78 20H-78Z", "#b98a45") + line("M-82 -20H82M-80 0H80", "#8f6628", 5) + line("M-58 -40V20M58 -40V20", "#a0762f", 8));

function ground(w, h, y) {
  const stones = Array.from({ length: Math.round(w / 62) }, (_, i) => {
    const x = 30 + i * 62 + ((i * 37) % 23);
    const sy = y + 40 + ((i * 53) % Math.max(20, h - y - 60));
    return oval(x, sy, 9 + (i % 3) * 4, 5 + (i % 2) * 2, i % 2 ? "#6f4f30" : "#8b6740");
  }).join("");
  return `<rect y="${y + 9}" width="${w}" height="${h - y - 9}" fill="#7a5836"/>` + stones + path(`M0 ${y + 12}V${y}Q${w * 0.25} ${y - 9} ${w * 0.5} ${y}T${w} ${y}V${y + 12}Q${w * 0.75} ${y + 20} ${w * 0.5} ${y + 13}T0 ${y + 12}Z`, "#5f9447");
}
const hills = (w, y) =>
  path(`M0 ${y + 16}V${y - 70}Q${w * 0.18} ${y - 150} ${w * 0.36} ${y - 84}T${w * 0.7} ${y - 100}T${w} ${y - 76}V${y + 16}Z`, "#c3dcd6") +
  path(`M0 ${y + 16}V${y - 30}Q${w * 0.22} ${y - 84} ${w * 0.46} ${y - 40}T${w} ${y - 34}V${y + 16}Z`, "#abd0bf");

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
