// Draws the projects page illustration in public/images/projects.
// Run from the project root: npm run draw
import { mkdirSync, writeFileSync } from "node:fs";
import { at, line, n, oval, path } from "./draw-helpers.mjs";
import { crate, fruit, leaves, stemLine, svg } from "./draw-plants.mjs";
import { adviser, grower, newPicture, palm, woman } from "./draw-scene.mjs";

const OUT = "public/images/projects";
mkdirSync(OUT, { recursive: true });

const W = 1500, H = 390, Y = 300;
const STEEL = "#f3e2cf";

/** Outline of one end of the house. Its base is centred on 0,0. */
const arch = (s = 1) => `M${n(-96 * s)} 0V${n(-92 * s)}A${n(96 * s)} ${n(96 * s)} 0 0 1 ${n(96 * s)} ${n(-92 * s)}V0`;
/** Hoops going back from the front. */
const depth = [0, 1, 2, 3, 4].map((i) => ({ x: i * 27, y: -i * 8, s: 1 - i * 0.045 }));
const hoop = ({ x, y, s }, width, opacity = 1) =>
  at(x, y, 0, 1, line(arch(s), STEEL, width, `stroke-opacity="${opacity}"`));
const rail = (dx, dy) => {
  const last = depth[4];
  return line(`M${dx} ${dy}L${n(last.x + dx * last.s)} ${n(last.y + dy * last.s)}`, STEEL, 3);
};
const rails = rail(0, -188) + rail(-96, -92) + rail(96, -92) + rail(96, 0) + rail(82, -142) + rail(-82, -142);
const frame = [...depth].reverse().map((d, i) => hoop(d, i === 4 ? 6 : 3.5, i === 4 ? 1 : 0.75)).join("") + rails;

const last = depth[4];
const roof = `M-96 0V-92A96 96 0 0 1 0 -188L${last.x} ${n(last.y - 188 * last.s)}A${n(96 * last.s)} ${n(96 * last.s)} 0 0 1 ${n(last.x + 96 * last.s)} ${n(last.y - 92 * last.s)}V${n(last.y)}L96 0Z`;
const cover = path(roof, "#fdeed8", 'fill-opacity="0.34"') + path(`${arch()}Z`, "#fff6e6", 'fill-opacity="0.3"') +
  line("M-70 -118A80 80 0 0 1 -18 -166", "#ffffff", 7, 'stroke-opacity="0.6"');
const door = `<rect x="-26" y="-104" width="52" height="104" fill="#4a1f10" fill-opacity="0.32" stroke="${STEEL}" stroke-width="4"/>` + line("M-26 -52H26", STEEL, 3);

const bed = path("M-96 0H96L206 -30H24Z", "#4a2312", 'fill-opacity="0.75"');
const peg = (x, y) => line(`M${x} ${y + 6}V${y - 30}`, "#f6b92b", 6);
const string = line("M-96 -20L96 -20L204 -52L12 -52Z", "#fff6e6", 2.5, 'stroke-dasharray="9 7"');

const plant = stemLine(300, 13) + leaves(300, 4, 150) + fruit(-58, -84, 34, true) + fruit(62, -122, 32, true) + fruit(-44, -164, 28, true);
const crop = [[160, -27, 0.27], [126, -18, 0.3], [56, -4, 0.36], [-4, -4, 0.36], [-64, -4, 0.36]]
  .map(([x, y, size]) => at(x, y, 0, size, plant)).join("");

/** From an empty plot to a planted house. */
const house = (content) => at(0, 0, 0, 0.88, content);
const steps = [
  house(bed + peg(204, -32) + peg(12, -32) + string + peg(-96, 0) + peg(96, 0)) + at(-138, 12, 0, 0.72, adviser("tablet")),
  house(bed + frame) + at(-132, 12, 0, 0.72, woman("rest")),
  house(bed + frame + cover + door),
  house(bed + cover + crop + frame) + at(-132, 12, 0, 0.72, grower("basket")) + crate(112, 22, 0.5),
];

function hero(animate) {
  newPicture();
  const groups = steps.map((step, i) => {
    const motion = animate ? ` class="rise" style="animation-delay:${0.25 + i * 0.35}s"` : "";
    return `<g transform="translate(${210 + i * 350} ${Y + 8})"><g${motion}>${step}</g></g>`;
  }).join("");
  const style = animate
    ? "<style>.rise{animation:rise .9s cubic-bezier(.2,.8,.2,1) both}@keyframes rise{from{opacity:0;transform:translateY(46px)}}</style>"
    : "";
  const rows = Array.from({ length: 4 }, (_, i) => line(`M0 ${Y + 34 + i * 24}Q${W / 2} ${Y + 18 + i * 25} ${W} ${Y + 34 + i * 24}`, "#4a2312", 5 + i * 1.5, 'stroke-opacity="0.45"')).join("");
  return svg(W, H, style + oval(1010, 176, 60, 60, "#f6b92b") +
    path(`M0 ${Y}V202Q190 120 400 196T820 176T1180 190T${W} 160V${Y}Z`, "#96492a") +
    path(`M0 ${Y}V246Q260 196 560 240T1080 232T${W} 240V${Y}Z`, "#a7562f") +
    at(60, Y, 0, 0.85, palm(0, 0, 1, 18)) + at(1462, Y, 0, 0.95, palm(0, 0, 1, -22)) +
    `<rect y="${Y - 2}" width="${W}" height="${H - Y + 2}" fill="#653018"/>` + rows + groups);
}
writeFileSync(`${OUT}/hero.svg`, hero(true));
writeFileSync(`${OUT}/hero-still.svg`, hero(false));
