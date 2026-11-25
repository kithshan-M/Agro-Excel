// Draws the About page pictures in public/images/about.
// Run from the project root: npm run draw
import { mkdirSync, writeFileSync } from "node:fs";
import { at, frill, leaf, line, n, oval, path } from "./draw-helpers.mjs";
import { crate, greens, stages } from "./draw-plants.mjs";
import { embed, newPicture, palm, person } from "./draw-scene.mjs";

const OUT = "public/images/about";
mkdirSync(OUT, { recursive: true });
const save = (name, w, h, content) =>
  writeFileSync(`${OUT}/${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${content}</svg>`);

/** Plant without the roots, for standing on the ground. */
const plant = (stage) => stages[stage]().replace(/^<path[^>]*\/>/, "");
const bush = (x, y, r, color) =>
  oval(x, y + r * 0.56, r * 1.1, r * 0.2, "#13251d", 'fill-opacity="0.18"') + path(frill(x, y, r, r * 0.7, 9, 0.22), color);
const arms = {
  rest: (skin) => line("M30 -140Q50 -118 44 -90", skin, 12) + line("M-26 -140Q-42 -116 -36 -90", skin, 12),
  wave: (skin) => line("M30 -140Q58 -146 66 -182", skin, 12) + line("M-26 -140Q-42 -116 -36 -90", skin, 12),
  point: (skin) => line("M-26 -140Q-58 -130 -84 -126", skin, 12) + line("M28 -140Q46 -116 38 -92", skin, 12),
  tablet: (skin) =>
    line("M-26 -140Q-46 -122 -36 -108", skin, 12) +
    '<rect x="-62" y="-136" width="34" height="46" rx="4" fill="#13251d" transform="rotate(-8 -45 -113)"/><rect x="-58" y="-131" width="26" height="36" rx="2" fill="#dcebf0" transform="rotate(-8 -45 -113)"/>' +
    leaf(-52, -106, 18, 7, -40, "#4f9a3f") + line("M28 -140Q44 -116 22 -104", skin, 12),
  basket: (skin) =>
    line("M30 -140Q48 -116 24 -96", skin, 12) + line("M-26 -140Q-46 -116 -20 -96", skin, 12) +
    path("M-36 -112H40L32 -76H-28Z", "#b98a45") + line("M-34 -100H38M-31 -88H35", "#8f6628", 3.5) +
    [[-20, -116, "#dd4630"], [2, -120, "#e2702f"], [22, -116, "#6ab34c"]].map(([x, y, c]) => oval(x, y, 13, 12, c)).join("") + line("M-36 -112H40", "#8f6628", 4),
};
const grower = (arm) => person({ shirt: "#f2f0e4", cloth: "#b5533c", hat: "#d9b465", skin: "#8a5a3c", arm: arms[arm]("#8a5a3c") });
const adviser = (arm) => person({ shirt: "#f6b92b", cloth: "#2c3f52", hat: "#f1dfae", skin: "#9a6a48", arm: arms[arm]("#9a6a48") });
const woman = (arm) => person({ shirt: "#a8476b", cloth: "#3d5a80", hat: "#e2c27a", skin: "#7d4f34", arm: arms[arm]("#7d4f34") });

// ---------- Hero, on the green page colour ----------
function hero(animate) {
  const move = (i, content) => (animate ? `<g class="rise" style="animation-delay:${0.1 + i * 0.16}s">${content}</g>` : content);
  const style = animate ? "<style>.rise{animation:rise .9s cubic-bezier(.2,.8,.2,1) both}@keyframes rise{from{opacity:0;transform:translateY(50px)}}</style>" : "";
  const fade = '<defs><linearGradient id="edge"><stop offset="0" stop-color="#000"/><stop offset=".2" stop-color="#fff"/><stop offset=".86" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="soft"><rect width="960" height="660" fill="url(#edge)"/></mask></defs>';
  const land = oval(660, 190, 92, 92, "#f6b92b") +
    path("M0 390L150 270L250 320L420 170L540 300L660 240L800 330L960 250V520H0Z", "#2a7b52") +
    path("M0 430Q200 320 420 400T960 360V540H0Z", "#3b8f5f") + palm(150, 500, 1.5, 34) + palm(850, 494, 1.25, -34) +
    path("M0 486Q240 452 480 478T960 470V660H0Z", "#63a45a");
  const rows = [-3, -2, -1, 0, 1, 2, 3].map((i) => path(`M${480 + i * 70 - 8} 486L${480 + i * 70 + 8} 486L${480 + i * 190 + 40} 660L${480 + i * 190 - 40} 660Z`, "#86643e")).join("");
  const bushes = [[500, 12], [530, 18], [572, 26]].map(([y, r], d) => [-3, -2, -1, 1, 2, 3].map((i) => bush(n(480 + i * (70 + ((y - 486) / 174) * 120)), y, r, greens[(i + 3 + d) % 3])).join("")).join("");
  return style + fade + `<g mask="url(#soft)">${land}${rows}${bushes}</g>` + move(0, at(474, 626, 0, 1.32, plant(4))) + move(1, at(310, 624, 0, 1.82, grower("basket"))) + move(2, at(650, 628, 0, 1.86, adviser("tablet"))) + move(3, crate(836, 634, 0.95));
}
newPicture();
save("hero", 960, 660, hero(true));
save("hero-still", 960, 660, hero(false));

// ---------- One picture per kind of grower ----------
const W = 720, H = 520, Y = 330;
const backdrop = (soil) =>
  `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe6ea"/><stop offset="1" stop-color="#fdf0c8"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#sky)"/>` +
  path("M0 280L110 200L190 240L310 140L410 236L500 190L600 250L720 180V360H0Z", "#cfdfd3") +
  path("M0 310Q170 230 340 284T720 262V370H0Z", "#a9cbb2") + path(`M0 ${Y}Q200 ${Y - 18} 380 ${Y - 4}T720 ${Y - 10}V${H}H0Z`, soil);

function house(x, y, s) {
  return at(x, y, 0, s, oval(0, 4, 150, 12, "#13251d", 'fill-opacity="0.15"') + '<rect x="-120" y="-120" width="240" height="122" fill="#f8ecd2"/><rect x="-120" y="-22" width="240" height="24" fill="#e3cfa6"/>' +
    path("M-150 -112L-92 -196H92L150 -112Z", "#b5533c") + line("M-136 -132H136M-122 -152H122M-108 -172H108", "#9a432f", 4) +
    '<rect x="-24" y="-84" width="50" height="86" fill="#7a5836"/><rect x="-98" y="-88" width="48" height="44" fill="#bcdde3" stroke="#7a5836" stroke-width="5"/><rect x="54" y="-88" width="48" height="44" fill="#bcdde3" stroke="#7a5836" stroke-width="5"/>' + line("M-74 -88V-44M78 -88V-44", "#7a5836", 4));
}
const pot = (x, y, s, content) => at(x, y, 0, s, oval(0, 2, 34, 6, "#13251d", 'fill-opacity="0.16"') + content + path("M-28 -44H28L21 0H-21Z", "#c4673f") + '<rect x="-32" y="-52" width="64" height="13" rx="3" fill="#b5533c"/>');

newPicture();
save("starting", W, H, backdrop("#9cc47d") + palm(92, 336, 1.1, 24) +
  path("M190 372L600 372L690 500L90 500Z", "#8b6740") + path("M214 392L580 392M186 420H612M158 452H644", "none", 'stroke="#795632" stroke-width="5"') +
  line("M190 372L600 372L690 500L90 500Z", "#fffaf0", 3, 'stroke-dasharray="10 8"') +
  [[190, 372], [600, 372], [690, 500], [90, 500]].map(([x, y]) => line(`M${x} ${y + 6}V${y - 34}`, "#a87c36", 8) + path(`M${x} ${y - 36}l26 9l-26 9Z`, "#f6b92b")).join("") +
  at(310, 466, 0, 1.14, adviser("point")) + at(440, 462, 0, 1.12, woman("rest")));
newPicture();
save("home-garden", W, H, backdrop("#9cc47d") + palm(640, 344, 1.35, -26) + house(250, 366, 1.12) +
  `<rect x="60" y="420" width="250" height="56" rx="4" fill="#a0762f"/><rect x="68" y="410" width="234" height="26" rx="4" fill="#7a5836"/>` + [92, 134, 176, 218, 260].map((x, i) => bush(x, 408, 25, i % 2 ? "#86c85f" : "#4f9a3f")).join("") +
  pot(392, 452, 1.15, at(0, -48, 0, 0.5, plant(3))) + pot(640, 462, 1.1, bush(0, -62, 34, "#5fae4a") + oval(-12, -66, 6, 6, "#dd4630") + oval(14, -58, 6, 6, "#dd4630")) +
  at(518, 486, 0, 1.22, woman("basket")));
newPicture();
save("open-field", W, H, backdrop("#8fbd70") + palm(70, 338, 1.2, 28) + palm(672, 336, 1, -22) +
  [-4, -3, -2, -1, 0, 1, 2, 3, 4].map((i) => path(`M${360 + i * 32 - 5} ${Y + 14}L${360 + i * 32 + 5} ${Y + 14}L${360 + i * 138 + 40} ${H}L${360 + i * 138 - 40} ${H}Z`, "#86643e")).join("") +
  [[352, 10], [376, 15], [410, 22], [458, 31]].map(([y, r], d) => [-4, -3, -2, -1, 0, 1, 2, 3, 4].filter((i) => d < 2 || Math.abs(i) < 4).map((i) => { const x = n(360 + i * (32 + ((y - 344) / 176) * 106)); return bush(x, y, r, greens[(i + 4 + d) % 3]) + oval(n(x - r * 0.3), n(y - r * 0.1), n(r * 0.17), n(r * 0.17), "#dd4630") + oval(n(x + r * 0.3), n(y + r * 0.1), n(r * 0.15), n(r * 0.15), "#dd4630"); }).join("")).join("") +
  at(430, 494, 0, 1.28, grower("wave")) + crate(234, 500, 0.8));
newPicture();
save("greenhouse", W, H, backdrop("#9cc47d") + palm(664, 338, 1.1, -24) + embed("greenhouses/plain", 4, 150, 600, 300) + at(566, 492, 0, 1.26, grower("tablet")) + crate(404, 498, 0.82));

console.log(`About page pictures drawn in ${OUT}`);
