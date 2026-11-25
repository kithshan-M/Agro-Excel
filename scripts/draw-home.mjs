// Draws the farm scene on the home page: greenhouse, growers and a seed stall.
// Run from the project root: npm run draw
import { mkdirSync, writeFileSync } from "node:fs";
import { at, frill, leaf, line, n, oval, path } from "./draw-helpers.mjs";
import { crate, greens, stages } from "./draw-plants.mjs";
import { embed, newPicture, palm, person } from "./draw-scene.mjs";

const OUT = "public/images/home";
const W = 1600;
const H = 660;

const sky = `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d3e9ec"/><stop offset="0.55" stop-color="#f4f3dd"/><stop offset="0.7" stop-color="#fdf0c8"/></linearGradient><linearGradient id="field" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9cc47d"/><stop offset="1" stop-color="#6da653"/></linearGradient></defs>`;
const mountains =
  path("M0 400L120 318L214 352L356 226L470 330L570 290L690 366L860 250L930 300L1010 262L1130 350L1250 292L1390 356L1600 270V430H0Z", "#cfdfd3") +
  path("M0 420Q160 320 330 372T640 372T960 352T1290 372T1600 336V450H0Z", "#b3d1bb") +
  path("M0 436Q200 380 420 412T860 408T1240 414T1600 394V470H0Z", "#97c19f");
const ground = `<rect y="428" width="${W}" height="${H - 428}" fill="url(#field)"/>`;

// Vegetable rows fan out from a point on the horizon
const rows = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((i) => {
  const x = 800 + i * 34, bx = 800 + i * 150;
  return path(`M${x - 5} 462L${x + 5} 462L${bx + 46} ${H}L${bx - 46} ${H}Z`, "#86643e");
}).join("");
let bushes = "";
for (let d = 0; d < 7; d++) {
  const t = (d / 6.2) ** 1.5;
  const y = 470 + t * 176;
  for (let i = -5; i <= 5; i++) {
    if (d > 2 && Math.abs(i) > 4) continue;
    const x = 800 + i * (34 + (116 * (y - 462)) / (H - 462));
    const r = 7 + t * 25;
    bushes += oval(x, y + r * 0.55, r * 1.1, r * 0.22, "#5f4529") + path(frill(n(x), n(y), r, r * 0.68, 9, 0.22), greens[(i + 5 + d) % 3]) + (Math.abs(i) % 2 ? oval(x - r * 0.25, y - r * 0.1, r * 0.17, r * 0.17, "#dd4630") + oval(x + r * 0.3, y + r * 0.12, r * 0.15, r * 0.15, "#dd4630") : "");
  }
}

// Seed stall with an awning, packets and crates
function packet(x, y, color, veg) {
  return `<g transform="translate(${x} ${y})"><rect width="52" height="72" rx="3" fill="${color}"/><path d="M0 11H52" stroke="#fff" stroke-opacity="0.45" stroke-width="2"/>${oval(26, 42, 20, 22, "#fffaf0")}${embed(`seeds/${veg}`, 7, 27, 38, 31)}</g>`;
}
const stall = (() => {
  let awning = "";
  for (let i = 0; i < 8; i++) awning += path(`M${i * 45} 0H${(i + 1) * 45}L${(i + 1) * 45 + 0} 58Q${i * 45 + 22.5} 82 ${i * 45} 58Z`, i % 2 ? "#fffaf0" : "#f6b92b");
  const heap = (x, veg, w) => embed(`seeds/${veg}`, x, 208, w, w * 0.8125);
  return `<g transform="translate(1180 246)">` + oval(180, 306, 210, 14, "#13251d", 'fill-opacity="0.16"') +
    line("M18 40V300M342 40V300", "#8a6a42", 13) + `<rect x="20" y="66" width="320" height="104" fill="#13251d" fill-opacity="0.08"/>` + line("M22 168H338", "#8a6a42", 7) +
    packet(36, 94, "#5d2c70", "brinjal") + packet(98, 94, "#c63a27", "tomato") + packet(160, 94, "#2f7a45", "bitter-gourd") + packet(222, 94, "#9c4d0e", "carrot") + packet(284, 94, "#4b7720", "long-bean") +
    heap(26, "pumpkin", 104) + heap(128, "capsicum", 92) + heap(224, "cabbage", 100) +
    path("M6 262H354L346 304H14Z", "#b98a45") + line("M10 282H350", "#8f6628", 5) + line("M110 264V302M248 264V302", "#a0762f", 8) +
    `<g>${awning}</g><rect x="-4" y="-10" width="368" height="16" rx="6" fill="#8a6a42"/></g>`;
})();

const tall = (x, y, s) => at(x, y, 0, s, stages[4]().replace(/<path d="M0 0C2[^>]*\/>/, ""));
const grower = at(690, 586, 0, 0.98, person({ shirt: "#f2f0e4", cloth: "#b5533c", hat: "#d9b465", skin: "#8a5a3c", arm: line("M30 -140Q52 -118 58 -92", "#8a5a3c", 12) + line("M-26 -140Q-40 -116 -34 -90", "#8a5a3c", 12) }));
const adviser = at(936, 590, 0, 1, person({ shirt: "#17613f", cloth: "#2c3f52", hat: "#f1dfae", skin: "#9a6a48", arm: line("M-26 -140Q-46 -122 -36 -108", "#9a6a48", 12) + `<rect x="-62" y="-136" width="34" height="46" rx="4" fill="#13251d" transform="rotate(-8 -45 -113)"/><rect x="-58" y="-131" width="26" height="36" rx="2" fill="#dcebf0" transform="rotate(-8 -45 -113)"/>` + leaf(-52, -106, 18, 7, -40, "#4f9a3f") + line("M28 -140Q44 -116 22 -104", "#9a6a48", 12) }));

function scene(animate) {
  const rise = (i, content) => (animate ? `<g class="rise" style="animation-delay:${0.1 + i * 0.16}s">${content}</g>` : content);
  const style = animate
    ? "<style>.rise{animation:rise .9s cubic-bezier(.2,.8,.2,1) both}.sun{animation:sun 1.6s ease-out both}@keyframes rise{from{opacity:0;transform:translateY(46px)}}@keyframes sun{from{transform:translateY(120px)}}</style>"
    : "";
  const sun = `<g${animate ? ' class="sun"' : ""}>${oval(1010, 250, 58, 58, "#f6c94f")}</g>`;
  const content = sky + style + sun + mountains + palm(96, 452, 1.15, 30) + palm(1130, 452, 0.9, -24) + palm(1556, 462, 1.3, -40) + ground +
    rows + rise(0, bushes) + rise(1, embed("greenhouses/plain", 24, 250, 620, 310)) +
    rise(2, stall) + rise(3, grower) + rise(4, adviser) + rise(3, tall(806, 598, 0.62)) + rise(5, crate(1140, 600, 0.72));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${content}</svg>`;
}

mkdirSync(OUT, { recursive: true });
writeFileSync(`${OUT}/farm.svg`, scene(true));
newPicture();
writeFileSync(`${OUT}/farm-still.svg`, scene(false));

// Small pictures for the service panels
const save = (name, w, h, content) =>
  writeFileSync(`${OUT}/${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${content}</svg>`);
const big = (x, y, rotate, color, veg) => `<g transform="translate(${x} ${y}) rotate(${rotate}) scale(3.1) translate(-26 -36)">${packet(0, 0, color, veg)}</g>`;
newPicture();
save("packets", 340, 360, big(112, 190, -14, "#5d2c70", "brinjal") + big(216, 186, 11, "#c63a27", "tomato"));
save("plant", 340, 360, path("M0 360Q40 306 170 300Q280 296 340 306V360Z", "#7fb08f") + path("M44 360Q90 322 176 318Q270 314 340 330V360Z", "#7a5836") + at(176, 322, 0, 1.06, stages[3]().replace(/^<path[^>]*\/>/, "")));
console.log(`Farm scene drawn in ${OUT}`);
