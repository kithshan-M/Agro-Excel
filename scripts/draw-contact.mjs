// Draws the contact page picture in public/images/contact.
// Run from the project root: npm run draw
import { mkdirSync, writeFileSync } from "node:fs";
import { at, frill, leaf, line, n, oval, path } from "./draw-helpers.mjs";
import { greens } from "./draw-plants.mjs";
import { adviser, embed, newPicture, palm, woman } from "./draw-scene.mjs";

const OUT = "public/images/contact";
mkdirSync(OUT, { recursive: true });
const W = 960;
const H = 600;

const bush = (x, y, r, color) =>
  oval(x, y + r * 0.56, r * 1.1, r * 0.2, "#13251d", 'fill-opacity="0.16"') + path(frill(x, y, r, r * 0.7, 9, 0.22), color);

/** Speech bubble with its tail at the bottom. side is -1 for left, 1 for right. */
function bubble(x, y, w, h, side, color, content) {
  const tail = side < 0 ? `M${24} ${h - 4}L${6} ${h + 34}L${62} ${h - 4}Z` : `M${w - 24} ${h - 4}L${w - 6} ${h + 34}L${w - 62} ${h - 4}Z`;
  return `<g transform="translate(${x} ${y})"><path d="${tail}" fill="${color}"/><rect width="${w}" height="${h}" rx="22" fill="${color}"/>${content}</g>`;
}
const tick = (x, y) => line(`M${x} ${y}l7 7l13 -15`, "#17613f", 4.5);
const drop = (x, y, s) => at(x, y, 0, s, path("M0 -34C22 -8 26 4 26 14C26 32 14 42 0 42C-14 42 -26 32 -26 14C-26 4 -22 -8 0 -34Z", "#3aa3d4") + path("M-12 14C-12 24 -6 30 2 32", "none", 'stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-opacity="0.7"'));

function scene(animate) {
  const pop = (i, cx, cy, content) =>
    animate ? `<g class="pop" style="animation-delay:${0.5 + i * 0.45}s;transform-origin:${cx}px ${cy}px">${content}</g>` : content;
  const rise = (i, content) => (animate ? `<g class="rise" style="animation-delay:${0.1 + i * 0.15}s">${content}</g>` : content);
  const style = animate
    ? "<style>.rise{animation:rise .9s cubic-bezier(.2,.8,.2,1) both}.pop{animation:pop .55s cubic-bezier(.3,1.4,.5,1) both}@keyframes rise{from{opacity:0;transform:translateY(46px)}}@keyframes pop{from{opacity:0;transform:scale(.4)}}</style>"
    : "";
  const fade = `<defs><linearGradient id="edge"><stop offset="0" stop-color="#000"/><stop offset=".16" stop-color="#fff"/><stop offset=".84" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="soft"><rect width="${W}" height="${H}" fill="url(#edge)"/></mask></defs>`;
  const land =
    path("M0 430L130 330L230 384L380 260L510 390L640 320L770 400L960 310V520H0Z", "#cfe0cf") +
    path("M0 466Q220 400 460 446T960 420V540H0Z", "#abcfae") +
    palm(96, 500, 1.15, 26) + palm(868, 498, 1.05, -26) +
    path("M0 500Q240 478 480 494T960 486V600H0Z", "#86b86c") +
    [[300, 538, 22], [480, 528, 18], [430, 572, 28], [548, 570, 28], [660, 540, 22], [160, 566, 26], [800, 566, 26]].map(([x, y, r], i) => bush(x, y, r, greens[i % 3])).join("");
  const seen =
    bubble(318, 40, 236, 128, -1, "#ffffff", embed("seeds/tomato", 16, 14, 106, 86) + drop(172, 50, 0.95) + tick(184, 106));
  const reply =
    bubble(436, 208, 214, 106, 1, "#17613f", line("M28 34H150M28 58H122", "#ffffff", 9, 'stroke-opacity="0.9"') + leaf(150, 78, 40, 15, -30, "#f6b92b", "#ffffff66"));
  return style + fade + `<g mask="url(#soft)">${land}</g>` + rise(0, at(230, 582, 0, 1.66, woman("tablet"))) + rise(1, at(742, 584, 0, 1.7, adviser("wave"))) + pop(0, 330, 190, seen) + pop(1, 642, 340, reply);
}
const save = (name, content) =>
  writeFileSync(`${OUT}/${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${content}</svg>`);
newPicture();
save("hero", scene(true));
newPicture();
save("hero-still", scene(false));
console.log(`Contact picture drawn in ${OUT} (${n(W)} x ${n(H)})`);
