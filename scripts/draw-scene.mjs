// People, palms and nested pictures shared by the scene drawings.
import { readFileSync } from "node:fs";
import { at, line, n, oval, path } from "./draw-helpers.mjs";

/** Places a finished drawing inside this one, with its ids made unique. */
let embeds = 0;
export function embed(file, x, y, width, height) {
  const key = `e${embeds++}-`;
  const text = readFileSync(`public/images/${file}.svg`, "utf8");
  const box = text.match(/viewBox="([^"]+)"/)[1];
  const inner = text
    .replace(/^<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/id="/g, `id="${key}`)
    .replace(/url\(#/g, `url(#${key}`);
  return `<svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="${box}">${inner}</svg>`;
}

export function palm(x, y, s, lean) {
  const fronds = [-172, -146, -116, -82, -50, -20, 8, 172].map((a, i) => {
    const r = (a * Math.PI) / 180;
    return path(`M0 0Q${n(Math.cos(r) * 42)} ${n(Math.sin(r) * 42 - 18)} ${n(Math.cos(r) * 86)} ${n(Math.sin(r) * 62 + 24)}Q${n(Math.cos(r) * 46)} ${n(Math.sin(r) * 40 + 3)} 0 0Z`, i % 2 ? "#3f8a58" : "#347a4c");
  }).join("");
  return at(x, y, 0, s, line(`M0 0C${lean * 0.2} -60 ${lean * 0.5} -110 ${lean} -165`, "#8a6a42", 9) + at(lean, -165, 0, 1, fronds + oval(-7, 8, 6, 7, "#6f4f24") + oval(8, 9, 6, 7, "#7d5b2c")));
}

/** Simple standing figure with a sun hat. Feet at 0,0, about 190 tall. */
export function person({ shirt, cloth, hat, skin, arm }) {
  return oval(0, 2, 46, 7, "#13251d", 'fill-opacity="0.16"') +
    line("M-12 -4V-60M14 -4V-60", skin, 13) + oval(-15, -2, 13, 6, "#4a3525") + oval(17, -2, 13, 6, "#4a3525") +
    path("M-30 -92H32L36 -26Q2 -16 -34 -26Z", cloth) + path("M-26 -152Q1 -166 28 -152L34 -84Q2 -76 -32 -84Z", shirt) +
    path("M-26 -152Q1 -166 28 -152L32 -108Q8 -128 -28 -118Z", "#ffffff", 'fill-opacity="0.07"') +
    arm + `<rect x="-7" y="-172" width="16" height="20" rx="6" fill="${skin}"/>` + oval(1, -184, 20, 22, skin) +
    path("M-20 -192C-18 -220 20 -220 22 -192Z", hat) + oval(1, -193, 40, 8, hat) + line("M-19 -197Q1 -190 21 -197", "#13251d", 4, 'stroke-opacity="0.35"');
}

/** Call before each new picture so its ids start again. */
export function newPicture() {
  embeds = 0;
}
