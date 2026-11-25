// Draws one small picture per sign of a crop problem in public/images/consulting.
// Run from the project root: npm run draw
import { mkdirSync, writeFileSync } from "node:fs";
import { at, frill, leaf, line, oval, path } from "./draw-helpers.mjs";
import { bigLeaf, flower, fruit, greens, stages, svg } from "./draw-plants.mjs";

const OUT = "public/images/consulting";
mkdirSync(OUT, { recursive: true });

const BG = "#e9f2ec";
const SOIL = "#7a5836";
const save = (name, content, bg = BG) =>
  writeFileSync(`${OUT}/sign-${name}.svg`, svg(160, 120, `<rect width="160" height="120" fill="${bg}"/>${content}`));

// ---------- Leaves ----------
const blade = (fill, vein = "#ffffff66", extra = "") => at(18, 72, -10, 1, leaf(0, 0, 126, 46, 0, fill, vein, 3) + extra);
const dots = (list, draw) => list.map(([x, y, r]) => draw(x, y, r)).join("");
const places = [[34, -10, 6], [52, 12, 7], [66, -16, 5], [82, 6, 7], [100, -6, 5], [46, -22, 4], [88, 22, 4]];
save("leaves-yellowing", blade("#e8cd52", "#6fae4acc"));
save("leaves-spots", blade(greens[1], "#ffffff55", dots(places, (x, y, r) => oval(x, y, r + 2, r + 1, "#8a6a2c") + oval(x, y, r * 0.5, r * 0.4, "#4f3713"))));
save("leaves-curling", path("M16 86C30 34 96 12 134 36C154 50 144 82 122 80C108 78 108 60 122 58C104 46 62 54 40 92C32 98 18 96 16 86Z", greens[1]) + path("M16 86C30 34 96 12 134 36C112 26 60 40 30 88Z", "#2f6a2a") + line("M122 58C132 58 134 68 126 72", "#2f6a2a", 4) + line("M40 78C56 56 84 46 108 50", "#ffffff66", 2.5));
save("leaves-holes", blade(greens[1], "#ffffff55", dots(places, (x, y, r) => path(frill(x, y, r + 3, r + 2, 7, 0.2), "#f3dca2"))), "#f3dca2");
save("leaves-white-powder", blade(greens[1], "#ffffff55", dots(places, (x, y, r) => path(frill(x, y, r + 6, r + 3, 8, 0.25), "#ffffff", 'fill-opacity="0.86"'))));
save("leaves-dry-edges", blade("#9a7236", "#00000000") + at(26, 70, -10, 1, leaf(0, 0, 108, 35, 0, greens[1], "#ffffff66", 3)));

// ---------- Flowers ----------
const twig = line("M-6 84C40 74 90 66 148 30", "#5b9a3c", 7) + leaf(30, 78, 34, 11, 40, greens[1]) + leaf(108, 54, 32, 10, 52, greens[2]);
save("flowers-dropping-off", twig + flower(70, 62, 1.15) + at(48, 98, 30, 1, flower(0, 0, 0.95)) + at(112, 94, -24, 1, flower(0, 0, 0.95)) + line("M44 70V80M112 66V76", "#7b9488", 3, 'stroke-dasharray="4 5"'));
save("flowers-very-few-flowers", twig + flower(74, 58, 1.1) + [[44, 66], [100, 46], [124, 34]].map(([x, y]) => line(`M${x} ${y + 8}V${y - 4}`, "#5b9a3c", 4) + oval(x, y - 7, 4, 4, "#8bbf5b")).join(""));
save("flowers-damaged", twig + at(80, 54, 0, 1, flower(0, 0, 2.1)) + oval(98, 42, 10, 8, "#7d5a22") + oval(62, 70, 9, 7, "#7d5a22") + oval(94, 76, 7, 6, BG));

// ---------- Fruit ----------
const tomato = (extra) => fruit(80, 66, 42, true) + extra;
save("fruit-spots", tomato(dots([[62, 62, 6], [82, 80, 7], [100, 60, 6], [74, 96, 5], [96, 92, 5]], (x, y, r) => oval(x, y, r, r * 0.85, "#5b2a12") + oval(x, y, r * 0.45, r * 0.4, "#c9a15c"))));
save("fruit-rotting", tomato(path("M42 80C56 70 72 88 88 80S112 74 118 82C112 100 98 106 80 106S48 98 42 80Z", "#4a2c16") + oval(70, 92, 12, 5, "#6d4525") + oval(98, 90, 8, 4, "#6d4525")));
save("fruit-cracks", tomato(line("M78 42C72 58 84 66 76 84", "#5b1d10", 5) + line("M92 46C100 58 92 68 102 80M60 52C54 62 62 70 56 80", "#5b1d10", 4)));
save("fruit-holes", tomato(oval(90, 72, 12, 11, "#3b1a0e") + oval(62, 84, 8, 7, "#3b1a0e") + line("M92 74C104 70 108 80 120 76", "#b9cf7a", 8) + oval(122, 75, 5, 5, "#5b4a22")));
save("fruit-small-or-misshapen", at(48, 78, 0, 0.5, fruit(0, 0, 42, true)) + line("M108 46C130 42 144 56 142 76C140 98 124 106 108 106C90 106 76 98 76 76C76 54 92 42 108 46Z", "#7b9488", 3, 'stroke-dasharray="6 6"') + path("M100 58C116 52 120 68 132 74C138 90 118 102 106 96C92 100 84 84 92 76C88 66 92 60 100 58Z", "#dd4630") + oval(101, 59, 8, 4, "#3f8438"));

// ---------- Stem ----------
const stem = (extra, color = "#5b9a3c") => `<rect x="62" y="-4" width="36" height="128" fill="${color}"/><rect x="84" y="-4" width="14" height="128" fill="#3f7d2c" fill-opacity="0.55"/>` + leaf(98, 30, 50, 15, -24, greens[1]) + leaf(62, 52, 50, 15, -156, greens[2]) + extra;
save("stem-soft-or-rotting", stem(path("M60 70Q74 82 70 124H90Q86 82 100 70Z", "#5f4325") + path("M62 66Q80 78 98 66V74Q80 86 62 74Z", "#8a6a2c")));
save("stem-cracks", stem(line("M78 6C72 34 84 52 76 88", "#2c4a1a", 6) + line("M88 60C84 80 92 92 86 116", "#2c4a1a", 4)));
save("stem-dark-marks", stem(dots([[72, 26, 8], [88, 54, 10], [72, 82, 9], [86, 104, 7]], (x, y, r) => oval(x, y, r * 0.7, r * 1.3, "#33261a"))));
const bug = (x, y) => line(`M${x - 8} ${y - 5}l-6 -4M${x - 8} ${y}h-7M${x - 8} ${y + 5}l-6 4M${x + 8} ${y - 5}l6 -4M${x + 8} ${y}h7M${x + 8} ${y + 5}l6 4`, "#2a1d12", 2) + oval(x, y, 9, 7, "#3b2a1a");
save("stem-insects-on-it", stem(bug(76, 26) + bug(88, 62) + bug(74, 94)));

// ---------- Roots ----------
const earth = `<rect y="26" width="160" height="94" fill="${SOIL}"/><rect y="20" width="160" height="9" fill="#5f9447"/>` + line("M80 28V-4", "#5b9a3c", 12);
const rootLines = "M80 28C82 60 76 84 82 114M80 36C60 48 46 56 32 84M80 36C100 48 114 56 130 82M80 54C68 72 58 80 52 106M80 54C92 72 102 78 110 106";
save("roots-swollen-or-knotted", earth + line(rootLines, "#f0dcb4", 6) + [[58, 52], [44, 66], [104, 54], [118, 68], [78, 76], [62, 84], [100, 86]].map(([x, y], i) => oval(x, y, 10 + (i % 2) * 2, 8, "#e3c48e") + oval(x - 3, y - 2, 4, 3, "#f6e8c8")).join(""));
save("roots-rotting", earth + line("M80 28C82 52 78 66 80 82M80 36C66 46 56 52 48 66M80 36C94 46 104 52 112 64", "#4a2f18", 8) + line("M80 30C81 44 79 52 80 58", "#b08a56", 4));
save("roots-few-or-weak", earth + line("M80 28C81 44 78 56 82 74M80 38C70 46 64 52 58 62", "#f0dcb4", 3.5));

// ---------- Whole plant ----------
const plot = `<rect y="96" width="160" height="24" fill="${SOIL}"/><rect y="93" width="160" height="6" fill="#5f9447"/>`;
const whole = (x, size, recolour = (s) => s) => at(x, 97, 0, size, recolour(stages[2]().replace(/^<path[^>]*\/>/, "")));
const droop = line("M0 6C4 -44 -8 -84 6 -112C14 -130 34 -128 38 -112", "#7f9a44", 9) + [[-44, 32], [-82, 38]].map(([y, a], i) => bigLeaf(1, y, 84 - i * 10, a, "#8ea24c") + bigLeaf(-1, y, 84 - i * 10, 180 - a, "#7c9440")).join("") + bigLeaf(38, -112, 46, 78, "#8ea24c");
save("whole-wilting", plot + at(80, 97, 0, 0.68, droop));
save("whole-slow-growth", plot + `<g opacity="0.28">${whole(108, 0.56)}</g>` + whole(46, 0.26));
const dead = (s) => s.replace(/#(3d8035|4f9a3f|5fae4a|5b9a3c)/g, (c) => ({ "#3d8035": "#7a5a2e", "#4f9a3f": "#94703a", "#5fae4a": "#a98448", "#5b9a3c": "#8a6a3a" })[c]);
save("whole-dying-suddenly", plot + whole(80, 0.54, dead) + [[52, 99], [108, 100]].map(([x, y]) => leaf(x, y, 22, 7, 8, "#94703a")).join(""));
console.log(`Sign pictures drawn in ${OUT}`);
