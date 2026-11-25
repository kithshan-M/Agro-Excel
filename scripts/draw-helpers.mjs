// Shared by the drawing scripts in this folder.

export const n = (v) => Math.round(v * 10) / 10;

let uid = 0;
export const path = (d, fill, extra = "") => `<path d="${d}" fill="${fill}" ${extra}/>`;
export const line = (d, color, width, extra = "") =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
export const oval = (cx, cy, rx, ry, fill, extra = "") =>
  `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" fill="${fill}" ${extra}/>`;
export const at = (x, y, rotate, scale, content) =>
  `<g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})">${content}</g>`;
export const shadow = (cx, cy, rx) => oval(cx, cy, rx, rx * 0.12, "#13251d", 'fill-opacity="0.14"');

/** Solid shape with a darker right edge, plus details kept inside the outline. */
export function body(d, base, dark, details = "", shift = [-10, -5]) {
  const id = `c${uid++}`;
  return `<clipPath id="${id}"><path d="${d}"/></clipPath><path d="${d}" fill="${dark}"/><g clip-path="url(#${id})"><path d="${d}" fill="${base}" transform="translate(${shift[0]} ${shift[1]})"/>${details}</g>`;
}
export const shine = (cx, cy, rx, ry, rotate = 0, opacity = 0.35) =>
  oval(cx, cy, rx, ry, "#fff", `fill-opacity="${opacity}" transform="rotate(${rotate} ${cx} ${cy})"`);

export function leaf(x, y, length, width, rotate, fill, vein = "#ffffff55", veinWidth = 2) {
  const d = `M0 0C${n(length * 0.25)} ${n(-width)} ${n(length * 0.75)} ${n(-width * 0.9)} ${length} 0C${n(length * 0.75)} ${n(width * 0.9)} ${n(length * 0.25)} ${n(width)} 0 0Z`;
  const side = [0.3, 0.5, 0.7]
    .map((t) => `M${n(length * t)} 0l${n(length * 0.11)} ${n(-width * (0.62 - t * 0.4))}M${n(length * t)} 0l${n(length * 0.11)} ${n(width * (0.62 - t * 0.4))}`)
    .join("");
  return at(x, y, rotate, 1, path(d, fill) + line(`M0 0H${n(length * 0.92)}`, vein, veinWidth) + line(side, vein, veinWidth * 0.6));
}
export const calyx = (x, y, size, color = "#3d7f35", points = 5, start = 0) =>
  Array.from({ length: points }, (_, i) =>
    leaf(x, y, size, size * 0.22, start + (i * 360) / points, color, "#ffffff22", 1),
  ).join("");

/** Outline with rounded scallops, for frilly leaves. */
export function frill(cx, cy, rx, ry, bumps, depth, turn = 0) {
  const point = (i, r) => {
    const a = ((i / bumps) * 2 + turn) * Math.PI;
    return [cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r];
  };
  let d = `M${point(0, 1).map(n).join(" ")}`;
  for (let i = 0; i < bumps; i++) {
    d += `Q${point(i + 0.5, 1 + depth).map(n).join(" ")} ${point(i + 1, 1).map(n).join(" ")}`;
  }
  return d + "Z";
}
