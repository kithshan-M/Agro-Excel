// Tomato plants, soil and hills shared by the drawing scripts.
// A plant stands at 0,0 and grows upwards.
import { at, body, calyx, leaf, line, n, oval, path, shine } from "./draw-helpers.mjs";

export const SKY = "#dcebf0";
export const svg = (w, h, content) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${content}</svg>`;

export const greens = ["#3d8035", "#4f9a3f", "#5fae4a"];

/** Leaf made of several leaflets, like a tomato leaf. */
export function bigLeaf(x, y, length, angle, color) {
  const pairs = [0.34, 0.62]
    .map((t, i) => leaf(length * t, 0, length * (0.36 - i * 0.04), length * 0.13, -58, color) + leaf(length * t, 0, length * (0.36 - i * 0.04), length * 0.13, 58, color))
    .join("");
  return at(x, y, angle, 1, line(`M0 0H${n(length * 0.7)}`, "#3d8035", 4) + pairs + leaf(length * 0.66, 0, length * 0.42, length * 0.17, 0, color));
}
export function leaves(height, count, size) {
  let out = "";
  for (let i = 0; i < count; i++) {
    const t = (i + 0.7) / count;
    const y = -height * (0.14 + t * 0.82);
    const s = size * (1.05 - t * 0.38);
    out += bigLeaf(0, y, s, -14 - t * 26, greens[i % 3]) + bigLeaf(0, y + 8, s, -166 + t * 26, greens[(i + 1) % 3]);
  }
  return out + bigLeaf(0, -height, size * 0.5, -90, greens[2]);
}
export const stemLine = (height, width) => line(`M0 6C4 ${n(-height * 0.4)} -4 ${n(-height * 0.7)} 0 ${-height}`, "#5b9a3c", width);
export function roots(size) {
  return line(
    `M0 0C2 ${size * 0.4} -3 ${size * 0.7} 2 ${size}M0 ${size * 0.15}C${-size * 0.25} ${size * 0.3} ${-size * 0.4} ${size * 0.35} ${-size * 0.6} ${size * 0.62}M0 ${size * 0.15}C${size * 0.25} ${size * 0.3} ${size * 0.4} ${size * 0.35} ${size * 0.6} ${size * 0.58}M0 ${size * 0.4}C${-size * 0.12} ${size * 0.6} ${-size * 0.2} ${size * 0.65} ${-size * 0.32} ${size * 0.92}M0 ${size * 0.4}C${size * 0.12} ${size * 0.6} ${size * 0.22} ${size * 0.65} ${size * 0.34} ${size * 0.88}`,
    "#f0dcb4", Math.max(3, size * 0.045),
  );
}
export const flower = (x, y, s) =>
  at(x, y, 0, s, Array.from({ length: 5 }, (_, i) => leaf(0, 0, 20, 6.5, i * 72 - 90, "#f6c93a", "#d99f1577", 1.2)).join("") + oval(0, 0, 5.5, 5.5, "#d98d15"));
export const fruit = (x, y, r, ripe) =>
  at(x, y, 0, r / 60, line("M0 -46C-2 -66 -8 -74 -16 -82", "#4d8f3c", 7) +
    body("M0 -44C36 -56 62 -34 60 2C58 38 32 56 0 56C-32 56 -58 38 -60 2C-62 -34 -36 -56 0 -44Z", ...(ripe ? ["#dd4630", "#b52f1f"] : ["#9cc75a", "#78a33f"]), shine(-28, -14, 10, 18, 28)) + calyx(0, -40, 34, "#3f8438", 5, 12));
export const stake = (height) => line(`M14 20V${-height}`, "#a87c36", 7) + line(`M-8 ${-height * 0.45}Q4 ${-height * 0.45 + 12} 18 ${-height * 0.45}M-8 ${-height * 0.74}Q4 ${-height * 0.74 + 12} 18 ${-height * 0.74}`, "#c79a4f", 4);

export const stages = [
  () => [-34, 0, 34].map((x, i) => oval(x, 44 + (i % 2) * 8, 10, 6.5, "#f4e3bd", `transform="rotate(${i * 34 - 30} ${x} ${44 + (i % 2) * 8})"`)).join("") +
    line("M84 8V-92", "#a87c36", 7) + `<rect x="40" y="-136" width="92" height="58" rx="5" fill="#fffaf0" stroke="#a87c36" stroke-width="4"/>` + line("M56 -116H114M56 -98H98", "#7b9488", 5),
  () => roots(46) + stemLine(44, 7) + leaf(0, -42, 46, 17, -28, greens[2]) + leaf(0, -42, 46, 17, -152, greens[1]),
  () => roots(92) + stemLine(132, 9) + leaves(132, 3, 92),
  () => roots(122) + stake(236) + stemLine(212, 10) + leaves(212, 4, 104) + fruit(-34, -62, 19, false) + fruit(42, -96, 17, false) + flower(36, -164, 0.9) + flower(-34, -142, 0.95) + flower(12, -204, 0.8),
  () => roots(134) + stake(258) + stemLine(234, 11) + leaves(234, 4, 108) + fruit(-38, -62, 25, true) + fruit(44, -86, 24, true) + fruit(-32, -136, 21, true) + fruit(36, -162, 20, true) + fruit(6, -206, 16, false),
];
export const crate = (x, y, s) =>
  at(x, y, 0, s, fruit(-44, -52, 25, true) + fruit(4, -60, 27, true) + fruit(50, -52, 25, true) + path("M-86 -40H86L78 20H-78Z", "#b98a45") + line("M-82 -20H82M-80 0H80", "#8f6628", 5) + line("M-58 -40V20M58 -40V20", "#a0762f", 8));

export function ground(w, h, y) {
  const stones = Array.from({ length: Math.round(w / 62) }, (_, i) => {
    const x = 30 + i * 62 + ((i * 37) % 23);
    const sy = y + 40 + ((i * 53) % Math.max(20, h - y - 60));
    return oval(x, sy, 9 + (i % 3) * 4, 5 + (i % 2) * 2, i % 2 ? "#6f4f30" : "#8b6740");
  }).join("");
  return `<rect y="${y + 9}" width="${w}" height="${h - y - 9}" fill="#7a5836"/>` + stones + path(`M0 ${y + 12}V${y}Q${w * 0.25} ${y - 9} ${w * 0.5} ${y}T${w} ${y}V${y + 12}Q${w * 0.75} ${y + 20} ${w * 0.5} ${y + 13}T0 ${y + 12}Z`, "#5f9447");
}
export const hills = (w, y) =>
  path(`M0 ${y + 16}V${y - 70}Q${w * 0.18} ${y - 150} ${w * 0.36} ${y - 84}T${w * 0.7} ${y - 100}T${w} ${y - 76}V${y + 16}Z`, "#c3dcd6") +
  path(`M0 ${y + 16}V${y - 30}Q${w * 0.22} ${y - 84} ${w * 0.46} ${y - 40}T${w} ${y - 34}V${y + 16}Z`, "#abd0bf");
