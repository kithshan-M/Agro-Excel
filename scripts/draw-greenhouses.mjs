// Draws the greenhouse illustrations in public/images/greenhouses.
// Run from the project root: npm run draw
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = "public/images/greenhouses";

// ---------- 3D helpers (x = across, y = up, z = away from the viewer) ----------
const sub = (a, b) => a.map((v, i) => v - b[i]);
const dot = (a, b) => a.reduce((sum, v, i) => sum + v * b[i], 0);
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const unit = (a) => a.map((v) => v / Math.hypot(...a));

function makeCamera({ eye, target, bounds, size, pad }) {
  const forward = unit(sub(target, eye));
  const right = unit(cross([0, 1, 0], forward));
  const up = cross(forward, right);
  const raw = (p) => {
    const d = sub(p, eye);
    const depth = dot(d, forward);
    return [dot(d, right) / depth, -dot(d, up) / depth, depth];
  };
  const pts = bounds.map(raw);
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const [w, h] = size;
  const scale = Math.min(
    (w - pad[1] - pad[3]) / (Math.max(...xs) - Math.min(...xs)),
    (h - pad[0] - pad[2]) / (Math.max(...ys) - Math.min(...ys)),
  );
  const ox = pad[3] + (w - pad[1] - pad[3]) / 2 - (scale * (Math.max(...xs) + Math.min(...xs))) / 2;
  const oy = h - pad[2] - scale * Math.max(...ys);
  const project = (p) => {
    const q = raw(p);
    return [ox + q[0] * scale, oy + q[1] * scale];
  };
  const sizeAt = (p) => scale / raw(p)[2];
  return { project, sizeAt };
}

function random(seed) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

// ---------- Themes ----------
const themes = {
  day: {
    ground: "#93b59d", bed: "#7d6a55", bedTop: "#95806a",
    film: "#ffffff", filmBase: 0.2, filmShade: 0.42, wall: 0.24,
    frame: "#24513d", frameSoft: "#4f7a66", net: "#24513d",
    plants: ["#2f7a45", "#459a58", "#6db66c"], fruit: "#e2542f",
  },
  dusk: {
    ground: "#0a3121", bed: "#3b3a22", bedTop: "#5c5730",
    film: "#ffe7a6", filmBase: 0.07, filmShade: 0.22, wall: 0.14,
    frame: "#fff6dc", frameSoft: "#e9dcae", net: "#fff6dc",
    plants: ["#3f9350", "#62b35f", "#a5d277"], fruit: "#f2693c",
  },
};

// ---------- Scene ----------
function draw(options) {
  const {
    file, size, theme: themeName, pad, eye, target,
    bays = 1, width = 8, length = 24, hoopGap = 3, gutter = 2.6, rise = 2.6,
    profile = "arch", sides = "film", rowsPerBay = 3, plantGap = 1.6,
    cutaway = false, sky = true, callouts,
  } = options;
  const t = themes[themeName];
  const total = bays * width;
  const [W, H] = size;

  const profilePoints = {
    arch: Array.from({ length: 15 }, (_, i) => {
      const a = (Math.PI * i) / 14;
      return [(width * (1 - Math.cos(a))) / 2, gutter + rise * Math.sin(a)];
    }),
    pitch: [[-0.7, gutter - 0.2], [width / 2, gutter + rise], [width + 0.7, gutter - 0.2]],
    flat: [[0, gutter], [width, gutter]],
  }[profile];

  const bounds = [];
  for (const z of [0, length]) {
    for (let b = 0; b < bays; b++) {
      for (const [x, y] of profilePoints) bounds.push([b * width + x, y, z]);
    }
    bounds.push([0, 0, z], [total, 0, z]);
  }
  const { project, sizeAt } = makeCamera({ eye, target, bounds, size, pad });

  const n = (v) => Math.round(v * 10) / 10;
  const path = (pts, close = false) =>
    "M" + pts.map((p) => project(p).map(n).join(" ")).join("L") + (close ? "Z" : "");
  const out = [];
  const add = (d, attrs) => out.push(`<path d="${d}" ${attrs}/>`);
  const line = (pts, stroke, w, extra = "") =>
    add(path(pts), `fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round" ${extra}`);
  const poly = (pts, fill, opacity = 1, extra = "") =>
    add(path(pts, true), `fill="${fill}" fill-opacity="${n(opacity * 100) / 100}" ${extra}`);

  // Ground apron and soft shadow
  poly([[-0.7, 0, -0.7], [total + 0.7, 0, -0.7], [total + 0.7, 0, length + 0.7], [-0.7, 0, length + 0.7]], t.ground, sky ? 1 : 0.75);

  // Light inside the greenhouse
  if (themeName === "dusk") {
    const [cx, cy] = project([total * 0.5, 2, length * 0.3]);
    out.push(`<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(W * 0.5)}" ry="${n(H * 0.34)}" fill="url(#glow)"/>`);
  }

  // Far end wall
  const gable = (b, z) => [
    [b * width, 0, z],
    ...profilePoints.map(([x, y]) => [b * width + x, y, z]),
    [(b + 1) * width, 0, z],
  ];
  const netted = sides === "net";
  const open = sides === "open";
  if (!open) {
    for (let b = 0; b < bays; b++) {
      poly(gable(b, length), netted ? "url(#mesh)" : t.film, netted ? 1 : t.wall);
      line(gable(b, length), t.frameSoft, 1.2, 'stroke-opacity="0.7"');
    }
  }

  // Beds, with watering lines on the cutaway
  const rows = [];
  for (let b = 0; b < bays; b++) {
    for (let r = 0; r < rowsPerBay; r++) {
      rows.push(b * width + (width * (r + 0.5)) / rowsPerBay);
    }
  }
  const bedHalf = Math.min(0.75, width / rowsPerBay / 3.4);
  for (const x of rows) {
    const z0 = 1.2, z1 = length - 1;
    poly([[x - bedHalf, 0.35, z0], [x + bedHalf, 0.35, z0], [x + bedHalf, 0.35, z1], [x - bedHalf, 0.35, z1]], t.bedTop);
    poly([[x - bedHalf, 0, z0], [x + bedHalf, 0, z0], [x + bedHalf, 0.35, z0], [x - bedHalf, 0.35, z0]], t.bed);
    const side = eye[0] > x ? bedHalf : -bedHalf;
    poly([[x + side, 0, z0], [x + side, 0.35, z0], [x + side, 0.35, z1], [x + side, 0, z1]], t.bed, 0.85);
    if (cutaway) {
      line([[x + side * 0.75, 0.42, z0 - 0.4], [x + side * 0.75, 0.42, z1]], "#1b1f1d", 2.2);
    }
  }

  // Plants, back to front, merged into one path per colour and depth slice
  const rand = random(options.seed ?? 7);
  const circle = ([x, y], r) =>
    `M${n(x - r)} ${n(y)}a${n(r)} ${n(r)} 0 1 0 ${n(2 * r)} 0a${n(r)} ${n(r)} 0 1 0 ${n(-2 * r)} 0`;
  const leaf = ([x, y], size, angle) => {
    const dx = Math.cos(angle) * size;
    const dy = Math.sin(angle) * size;
    const bend = 0.34;
    const c1 = [dx / 2 - dy * bend, dy / 2 + dx * bend];
    const c2 = [-dx / 2 + dy * bend, -dy / 2 - dx * bend];
    return `M${n(x)} ${n(y)}q${n(c1[0])} ${n(c1[1])} ${n(dx)} ${n(dy)}q${n(c2[0])} ${n(c2[1])} ${n(-dx)} ${n(-dy)}`;
  };
  const slices = [];
  for (let z = length - 1.6; z > 1.4; z -= plantGap) slices.push(z);
  const rowOrder = [...rows].sort((a, b) => Math.abs(b - eye[0]) - Math.abs(a - eye[0]));
  const plantHeight = options.plantHeight ?? 1.7;
  for (const z of slices) {
    const layers = ["", "", "", ""];
    for (const x of rowOrder) {
      const h = plantHeight * (0.9 + rand() * 0.2);
      const unitSize = sizeAt([x, 1, z]);
      const at = (dx, y) => project([x + dx, 0.35 + y, z]);
      for (let level = 0; level < 5; level++) {
        const y = h * (0.12 + level * 0.2);
        const size = unitSize * plantHeight * (0.5 - level * 0.045);
        const layer = level < 2 ? 0 : level < 4 ? 1 : 2;
        for (const base of [-0.35, Math.PI + 0.35]) {
          layers[layer] += leaf(at(0, y), size, base - (base < 1 ? 0.35 : -0.35) * rand());
        }
        layers[Math.min(2, layer + (rand() > 0.5 ? 1 : 0))] += leaf(at(0, y), size * 0.8, -Math.PI / 2 + (rand() - 0.5) * 1.5);
      }
      if (options.fruit && rand() > 0.3) {
        for (let k = 0; k < 2; k++) {
          layers[3] += circle(at(rand() * 0.5 - 0.25, h * (0.2 + rand() * 0.45)), unitSize * 0.1);
        }
      }
    }
    layers.forEach((d, i) => d && add(d, `fill="${i === 3 ? t.fruit : t.plants[i]}"`));
  }

  // Roof panels. Panels facing the light are brighter.
  const roofFar = length;
  const roofNear = cutaway ? hoopGap * 2 : 0;
  const lightDir = unit([-0.5, 0.85, -0.2]);
  for (let b = 0; b < bays; b++) {
    for (let i = 0; i < profilePoints.length - 1; i++) {
      const [x0, y0] = profilePoints[i];
      const [x1, y1] = profilePoints[i + 1];
      const normal = unit([-(y1 - y0), x1 - x0, 0]);
      const shade = Math.max(0, dot(normal, lightDir));
      const bx = b * width;
      poly(
        [[bx + x0, y0, roofNear], [bx + x1, y1, roofNear], [bx + x1, y1, roofFar], [bx + x0, y0, roofFar]],
        netted ? "url(#mesh)" : t.film,
        netted ? 1 : t.filmBase + t.filmShade * shade,
      );
    }
  }

  // Frame: hoops, purlins, posts
  const hoops = [];
  for (let z = length; z > 0.01; z -= hoopGap) hoops.push(z);
  for (const z of hoops) {
    const w = n(Math.max(0.8, sizeAt([total, 2, z]) * 0.085));
    for (let b = 0; b < bays; b++) {
      line(profilePoints.map(([x, y]) => [b * width + x, y, z]), t.frameSoft, w, 'stroke-opacity="0.75"');
      for (const x of b === bays - 1 ? [0, width] : [0]) {
        line([[b * width + x, 0, z], [b * width + x, gutter, z]], t.frameSoft, w, 'stroke-opacity="0.75"');
      }
    }
  }
  for (let b = 0; b < bays; b++) {
    const mid = Math.floor(profilePoints.length / 2);
    const purlins = profile === "arch" ? [0, 4, 7, 10, 14] : profile === "pitch" ? [0, mid, 2] : [0, 1];
    for (const i of purlins) {
      const [x, y] = profilePoints[i];
      line([[b * width + x, y, 0], [b * width + x, y, length]], t.frame, i === 0 || i === profilePoints.length - 1 ? 2 : 1.3);
    }
  }

  // Side wall nearest the viewer: film above, insect net below
  const wallX = eye[0] > total / 2 ? total : 0;
  const wallNear = cutaway ? hoopGap : 0;
  if (!open) {
    const split = netted ? gutter : gutter * 0.55;
    poly([[wallX, 0, wallNear], [wallX, split, wallNear], [wallX, split, length], [wallX, 0, length]], "url(#mesh)", 1);
    if (!netted) {
      poly([[wallX, split, wallNear], [wallX, gutter, wallNear], [wallX, gutter, length], [wallX, split, length]], t.film, t.wall + 0.12);
      line([[wallX, split, wallNear], [wallX, split, length]], t.frame, 1.2);
    }
    line([[wallX, 0.05, 0], [wallX, 0.05, length]], t.frame, 2);
  }

  // Near end wall
  for (let b = 0; b < bays; b++) {
    const bx = b * width;
    if (!open && !cutaway) {
      poly(gable(b, 0), netted ? "url(#mesh)" : t.film, netted ? 1 : t.wall);
      if (!netted) {
        line([[bx, gutter, 0], [bx + width, gutter, 0]], t.frame, 1.6);
      }
      for (const f of [0.36, 0.64]) {
        const top = profile === "arch" ? gutter + rise * Math.sin(Math.acos(1 - 2 * f)) : gutter;
        line([[bx + width * f, 0, 0], [bx + width * f, top, 0]], t.frame, 1.6);
      }
      const doorTop = Math.min(2.1, gutter - 0.3);
      line([[bx + width * 0.36, doorTop, 0], [bx + width * 0.64, doorTop, 0]], t.frame, 1.6);
      line([[bx + width * 0.5, 0, 0], [bx + width * 0.5, doorTop, 0]], t.frame, 1.4);
    }
    const ends = profile === "pitch" ? profilePoints : gable(b, 0).map(([x, y]) => [x - bx, y]);
    line(ends.map(([x, y]) => [bx + x, y, 0]), t.frame, 4);
    if (profile === "pitch") {
      for (const x of [0, width]) line([[bx + x, 0, 0], [bx + x, gutter, 0]], t.frame, 4);
      line([[bx, gutter, 0], [bx + width, gutter, 0]], t.frame, 2.4);
    }
  }

  // Cutaway extras: open ridge vent and overhead mist line
  if (cutaway) {
    const ridge = width / 2;
    const top = gutter + rise;
    const z0 = roofNear + 1, z1 = length - 2;
    const opening = [[ridge, top, z0], [ridge + 1.9, top - 0.3, z0], [ridge + 1.9, top - 0.3, z1], [ridge, top, z1]];
    poly(opening, "#24513d", 0.28);
    const flap = [[ridge, top, z0], [ridge + 1.8, top + 0.75, z0], [ridge + 1.8, top + 0.75, z1], [ridge, top, z1]];
    poly(flap, "#ffffff", 0.9, `stroke="${t.frame}" stroke-width="2.5" stroke-linejoin="round"`);
    for (let z = z0; z <= z1; z += 2.75) {
      line([[ridge + 1.9, top - 0.3, z], [ridge + 1.8, top + 0.75, z]], t.frame, 1.8);
    }
  }

  // Numbered callouts
  (callouts ?? []).forEach(({ at, badge }, i) => {
    const [x, y] = project(at).map(n);
    const [bx, by] = badge;
    out.push(
      `<path d="M${x} ${y}L${bx} ${by}" stroke="#13251d" stroke-width="2"/>`,
      `<circle cx="${x}" cy="${y}" r="5" fill="#f6b92b" stroke="#13251d" stroke-width="2"/>`,
      `<circle cx="${bx}" cy="${by}" r="21" fill="#13251d"/>`,
      `<text x="${bx}" y="${by + 8}" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="700" font-size="23" fill="#fff">${i + 1}</text>`,
    );
  });

  const horizon = project([total / 2, 0, 4000])[1];
  const defs = `<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe4ea"/><stop offset="1" stop-color="#f3f8f4"/></linearGradient>
<linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfdfd2"/><stop offset="1" stop-color="#a9c5b0"/></linearGradient>
<radialGradient id="glow"><stop offset="0" stop-color="#ffd566" stop-opacity="0.6"/><stop offset="0.5" stop-color="#f6b92b" stop-opacity="0.18"/><stop offset="1" stop-color="#f6b92b" stop-opacity="0"/></radialGradient>
<pattern id="mesh" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="${t.film}" fill-opacity="${themeName === "dusk" ? 0.06 : 0.22}"/><path d="M0 0H5M0 0V5" stroke="${t.net}" stroke-width="0.7" stroke-opacity="${themeName === "dusk" ? 0.3 : 0.38}"/></pattern>
</defs>`;
  const backdrop = sky
    ? `<rect width="${W}" height="${H}" fill="url(#sky)"/><path d="M0 ${n(horizon)}h${W}V${H}H0Z" fill="url(#ground)"/><path d="M0 ${n(horizon + 1)}V${n(horizon - 16)}Q${W * 0.2} ${n(horizon - 52)} ${W * 0.42} ${n(horizon - 18)}T${W * 0.8} ${n(horizon - 26)}T${W} ${n(horizon - 14)}V${n(horizon + 1)}Z" fill="#b5cfc3"/>`
    : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${defs}${backdrop}${out.join("")}</svg>`;
  writeFileSync(`${OUT}/${file}`, svg);
  console.log(file, `${Math.round(svg.length / 1024)} KB`);
  return project;
}

mkdirSync(OUT, { recursive: true });

draw({
  file: "hero.svg", size: [1100, 640], theme: "dusk", sky: false, pad: [60, 20, 70, 20],
  eye: [33, 3.6, -17], target: [12, 3.2, 10], bays: 2, width: 9, length: 40, hoopGap: 4,
  gutter: 3.6, rise: 3, rowsPerBay: 3, plantGap: 1.7, plantHeight: 2.3, fruit: true,
});

const card = { size: [800, 460], theme: "day", pad: [70, 45, 45, 45] };
draw({
  ...card, file: "tunnel.svg", eye: [20, 5, -15], target: [5, 2, 8],
  width: 8, length: 24, hoopGap: 2, gutter: 1.3, rise: 2.9, rowsPerBay: 3, fruit: true,
});
draw({
  ...card, file: "multi-span.svg", eye: [38, 8, -22], target: [12, 2, 10],
  bays: 3, width: 8, length: 26, hoopGap: 3.25, gutter: 3.6, rise: 2.1, rowsPerBay: 3, plantGap: 2, plantHeight: 2, fruit: true,
});
draw({
  ...card, file: "net-house.svg", eye: [32, 7, -20], target: [8, 1.5, 9],
  bays: 2, width: 8, length: 24, hoopGap: 4, gutter: 3.6, rise: 0, profile: "flat", sides: "net", rowsPerBay: 3, plantHeight: 1.1,
});
draw({
  ...card, file: "rain-shelter.svg", eye: [22, 4.6, -16], target: [5, 2, 8],
  width: 9, length: 24, hoopGap: 4, gutter: 2.9, rise: 2, profile: "pitch", sides: "open", rowsPerBay: 4, plantHeight: 1.5, fruit: true,
});

draw({
  file: "cutaway.svg", size: [900, 720], theme: "day", pad: [150, 90, 100, 60],
  eye: [19, 6, -13], target: [5, 2, 6], width: 9, length: 22, hoopGap: 2.75,
  gutter: 2.8, rise: 2.8, rowsPerBay: 3, plantGap: 1.7, plantHeight: 1.6, fruit: true, cutaway: true,
  callouts: [
    { at: [1.0, 4.5, 0], badge: [80, 130] },
    { at: [7.9, 4.55, 15], badge: [760, 170] },
    { at: [9, 1, 7], badge: [830, 560] },
    { at: [6.2, 6.3, 7], badge: [470, 70] },
    { at: [4.5 + 0.56, 0.42, 0.9], badge: [400, 670] },
    { at: [1.5, 0.35, 1.2], badge: [80, 600] },
  ],
});
