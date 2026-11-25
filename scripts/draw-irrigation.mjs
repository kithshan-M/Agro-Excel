// Draws the irrigation pictures in public/images/irrigation.
// Run from the project root: npm run draw
import { mkdirSync, writeFileSync } from "node:fs";
import { at, frill, line, n, oval, path } from "./draw-helpers.mjs";
import { greens, stages } from "./draw-plants.mjs";
import { adviser, grower, palm, person } from "./draw-scene.mjs";
import { tank } from "./draw-water.mjs";

const OUT = "public/images/irrigation";
mkdirSync(OUT, { recursive: true });
const WATER = "#3aa3d4";
const PIPE = "#1e4f63";
const save = (name, w, h, content) =>
  writeFileSync(`${OUT}/${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${content}</svg>`);

/** Moving water. The still pictures leave it out and show the water at rest. */
const style =
  "<style>.flow{animation:flow 1.1s linear infinite}.spray{animation:flow .7s linear infinite}.drop{animation:drop 1.5s ease-in infinite}.mist{animation:mist 2.6s ease-in-out infinite alternate}.rise{animation:rise .9s cubic-bezier(.2,.8,.2,1) both}@keyframes flow{to{stroke-dashoffset:-36}}@keyframes drop{0%{transform:translateY(0);opacity:0}15%{opacity:1}100%{transform:translateY(20px);opacity:0}}@keyframes mist{from{opacity:.35}to{opacity:.8}}@keyframes rise{from{opacity:0;transform:translateY(46px)}}</style>";
const pipe = (d, width = 14) =>
  line(d, PIPE, width) + line(d, "#2f7389", width * 0.55, 'transform="translate(-1 -1)"') + line(d, "#bfe6f5", width * 0.26, 'stroke-dasharray="10 26" class="flow"');
const spray = (d, width = 3) => line(d, WATER, width, 'stroke-dasharray="7 11" class="spray"');
const drops = (points, r = 5) =>
  points.map(([x, y], i) => `<path class="drop" style="animation-delay:${(i % 5) * 0.28}s" d="M${x} ${y - r * 1.6}C${x + r} ${y - r * 0.3} ${x + r} ${y + r} ${x} ${y + r}C${x - r} ${y + r} ${x - r} ${y - r * 0.3} ${x} ${y - r * 1.6}Z" fill="${WATER}"/>`).join("");
const plant = (stage) => stages[stage]().replace(/^<path[^>]*\/>/, "");
const bush = (x, y, r, c) => oval(x, y + r * 0.56, r * 1.1, r * 0.2, "#13251d", 'fill-opacity="0.18"') + path(frill(x, y, r, r * 0.7, 9, 0.22), c);

function well(x, y, s) {
  return at(x, y, 0, s, oval(0, 4, 78, 13, "#13251d", 'fill-opacity="0.16"') + path("M-64 -62V-6Q0 22 64 -6V-62Z", "#b98263") + line("M-62 -42Q0 -18 62 -42M-63 -22Q0 4 63 -22", "#8f5f44", 4) + line("M-34 -54V-34M0 -48V-26M34 -54V-34M-48 -32V-12M-16 -26V-4M18 -26V-4M50 -34V-12", "#8f5f44", 3) + oval(0, -62, 64, 19, "#cf9a7b") + oval(0, -62, 50, 13, "#1b3f4d") + oval(0, -59, 42, 9, WATER) + line("M-52 -66V-130M52 -66V-130", "#7a5836", 9) + path("M-80 -126L0 -168L80 -126Z", "#b5533c"));
}
function pump(x, y, s) {
  return at(x, y, 0, s, '<rect x="-56" y="-10" width="112" height="16" rx="3" fill="#a9aca4"/>' + '<rect x="-46" y="-58" width="70" height="46" rx="12" fill="#1f6fa3"/>' + line("M-30 -56V-14M-14 -56V-14M2 -56V-14", "#16557f", 4) + oval(34, -36, 24, 24, "#174f75") + oval(34, -36, 11, 11, "#8fc1dd") + '<rect x="-34" y="-72" width="40" height="16" rx="4" fill="#f6b92b"/>');
}
function filter(x, y, s) {
  return at(x, y, 0, s, '<rect x="-20" y="-92" width="40" height="80" rx="16" fill="#2c3338"/><rect x="-25" y="-100" width="50" height="17" rx="5" fill="#e2702f"/><rect x="-25" y="-22" width="50" height="14" rx="5" fill="#e2702f"/>' + line("M-9 -76V-30M0 -76V-30M9 -76V-30", "#596268", 3));
}
function valve(x, y, s) {
  return at(x, y, 0, s, '<rect x="-24" y="-82" width="48" height="56" rx="6" fill="#f2f0e4" stroke="#8a9a92" stroke-width="3"/><rect x="-15" y="-73" width="30" height="18" rx="2" fill="#bfe6f5"/>' + oval(-8, -42, 5, 5, "#17613f") + oval(8, -42, 5, 5, "#e2702f") + line("M0 -26V-4", "#8a9a92", 4) + oval(0, 0, 17, 13, "#c63a27"));
}
const sprinkler = (x, y, s) => at(x, y, 0, s, line("M0 0V-66", PIPE, 9) + '<rect x="-11" y="-80" width="22" height="17" rx="4" fill="#e2702f"/>' + oval(0, -84, 6, 5, "#2c3338"));

// ---------- The system, with one spotlight per part ----------
{
  const w = 900, h = 720, G = 470;
  const rowsY = [540, 604, 668];
  const pipeRuns = [
    [`M112 ${G - 50}V${G - 18}H196`, 14],
    [`M290 ${G - 22}H330V120H372`, 14],
    [`M446 ${G - 168}H478V${G - 18}H528`, 14],
    [`M528 ${G - 4}H660V668H520M660 540H520M660 604H520`, 14],
    ...rowsY.flatMap((y) => [[`M660 ${y}H872`, 9], [`M520 ${y}H60`, 9]]),
  ];
  const groups = {
    source: well(112, G + 8, 0.98),
    pump: pump(252, G + 12, 1),
    tank: tank(402, G + 8, 1.02),
    filter: filter(528, G + 4, 1),
    control: valve(612, G + 4, 1),
    pipes: pipeRuns.map(([d, width]) => pipe(d, width)).join(""),
    emitters: rowsY.map((y, r) => [90, 172, 254, 336, 418, 700, 780, 856].map((x) => oval(x, y, 7, 6, "#e2702f")).join("") + drops([[90, y + 12], [254, y + 12], [418, y + 12], [780, y + 12]].slice(r % 2), 5)).join("") + sprinkler(590, 640, 0.9) + spray("M590 560Q546 520 500 590M590 560Q634 520 684 590M590 560Q566 540 540 606M590 560Q614 540 644 606", 3),
  };
  const beds = rowsY.map((y) => `<rect x="46" y="${y - 6}" width="470" height="30" rx="13" fill="#7a5836"/><rect x="672" y="${y - 6}" width="212" height="30" rx="13" fill="#7a5836"/>`).join("");
  const crops = rowsY.map((y, r) => [130, 212, 294, 376, 460, 738, 820].map((x, i) => bush(x, y - 16, 19, greens[(i + r) % 3])).join("")).join("");
  const backdrop = `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe6ee"/><stop offset="1" stop-color="#f6f3de"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#sky)"/>` + oval(770, 110, 46, 46, "#f6c94f") +
    path("M0 420L120 330L210 372L360 240L490 370L620 300L740 390L900 290V500H0Z", "#cddfda") + path("M0 446Q220 372 440 420T900 400V510H0Z", "#a9cbb2") + `<rect y="${G - 6}" width="${w}" height="${h - G + 6}" fill="#93be74"/>`;
  const order = ["source", "pump", "tank", "filter", "control", "pipes", "emitters"];
  const draw = (names) => names.map((name) => groups[name]).join("");
  const all = beds + crops + draw(["pipes", "source", "tank", "pump", "filter", "control", "emitters"]);
  save("system", w, h, style + backdrop + all);
  save("system-still", w, h, backdrop + all);
  for (const name of order) {
    save(`system-${name}`, w, h, `<rect width="${w}" height="${h}" fill="#0d2b3a" fill-opacity="0.55"/><g stroke="#f6b92b" stroke-width="3" paint-order="stroke">${name === "pipes" ? pipeRuns.map(([d, width]) => line(d, "#f6b92b", width + 8)).join("") : ""}${draw([name])}</g>`);
  }
}

// ---------- Irrigation types ----------
const W = 720, H = 460;
const sky = `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe6ee"/><stop offset="1" stop-color="#f6f3de"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#sky)"/>` + path("M0 250Q170 160 340 216T720 196V320H0Z", "#c3dcd0") + path("M0 280Q200 226 400 258T720 248V330H0Z", "#a9cbb2");
const soil = (y) => `<rect y="${y}" width="${W}" height="${H - y}" fill="#7a5836"/>` + path(`M0 ${y + 10}V${y}Q180 ${y - 7} 360 ${y}T720 ${y}V${y + 10}Z`, "#5f9447");
const both = (name, content) => {
  save(name, W, H, style + content);
  save(`${name}-still`, W, H, content);
};
both("drip", sky + soil(284) +
  [120, 360, 600].map((x) => oval(x, 352, 96, 62, "#3f6e86", 'fill-opacity="0.5"') + oval(x, 344, 62, 40, "#3aa3d4", 'fill-opacity="0.45"')).join("") +
  [120, 360, 600].map((x) => at(x, 292, 0, 1.12, stages[2]())).join("") +
  pipe("M-10 282H730", 11) + [120, 360, 600].map((x) => oval(x + 14, 284, 8, 7, "#e2702f")).join("") + drops([[134, 300], [374, 300], [614, 300], [128, 318], [368, 318], [608, 318]], 6));
both("sprinkler", sky + `<rect y="286" width="${W}" height="${H - 286}" fill="#93be74"/>` +
  [330, 382, 440].map((y, r) => `<rect x="-10" y="${y}" width="740" height="22" rx="10" fill="#7a5836"/>` + Array.from({ length: 11 - r }, (_, i) => bush(34 + i * (66 + r * 8), y - 4, 22 + r * 5, greens[(i + r) % 3])).join("")).join("") +
  [180, 540].map((x) => sprinkler(x, 400, 1.5) + spray(`M${x} 274Q${x - 70} 150 ${x - 176} 330M${x} 274Q${x - 50} 176 ${x - 116} 346M${x} 274Q${x - 26} 214 ${x - 56} 352M${x} 274Q${x + 70} 150 ${x + 176} 330M${x} 274Q${x + 50} 176 ${x + 116} 346M${x} 274Q${x + 26} 214 ${x + 56} 352`, 3.5)).join(""));
both("micro", sky + soil(356) + at(0, 40, 0, 1,
  [70, 190, 310, 430, 550, 670].map((x, i) => bush(x, 296, 34, greens[i % 3]) + oval(x - 8, 290, 6, 6, "#dd4630") + oval(x + 12, 302, 6, 6, "#dd4630")).join("") +
  pipe("M-10 330H730", 10) + [130, 370, 610].map((x) => line(`M${x} 328V262`, PIPE, 6) + oval(x, 258, 11, 7, "#e2702f") + spray(`M${x} 254Q${x - 40} 220 ${x - 88} 290M${x} 254Q${x - 24} 232 ${x - 48} 298M${x} 254Q${x + 40} 220 ${x + 88} 290M${x} 254Q${x + 24} 232 ${x + 48} 298`, 3)).join("")));
both("mist", `<rect width="${W}" height="${H}" fill="#e4f1ee"/>` + `<rect y="384" width="${W}" height="76" fill="#b9c9b4"/>` +
  [-40, 0, 40].map((d) => line(`M${40 + d} 384V190Q${40 + d} 34 ${360 + d * 0.4} 34Q${680 - d} 34 ${680 - d} 190V384`, "#4f7a66", 5, 'stroke-opacity="0.35"')).join("") + line("M0 62H720M0 120H720", "#4f7a66", 4, 'stroke-opacity="0.45"') +
  pipe("M-10 122H730", 10) + [100, 273, 446, 620].map((x) => `<path class="mist" style="animation-delay:${x / 400}s" d="M${x} 146L${x - 84} 292Q${x} 320 ${x + 84} 292Z" fill="#9fd3e6" fill-opacity="0.6"/>` + line(`M${x} 126V142`, PIPE, 7) + oval(x, 146, 10, 7, "#e2702f") + [[-40, 250], [-14, 220], [22, 244], [46, 272], [0, 280], [-58, 278]].map(([dx, dy]) => oval(x + dx, dy, 3, 3, "#ffffff")).join("")).join("") +
  `<rect x="20" y="344" width="680" height="18" rx="4" fill="#a0762f"/>` + line("M60 362V440M240 362V440M480 362V440M660 362V440", "#8a6a42", 10) + Array.from({ length: 13 }, (_, i) => `<rect x="${30 + i * 52}" y="322" width="44" height="24" rx="3" fill="#2c3338"/>` + at(52 + i * 52, 326, 0, 0.62, plant(1))).join(""));

// ---------- Hero, on the blue page colour ----------
function hero(animate) {
  const w = 960, h = 660;
  const move = (i, content) => (animate ? `<g class="rise" style="animation-delay:${0.1 + i * 0.15}s">${content}</g>` : content);
  const fade = `<defs><linearGradient id="edge"><stop offset="0" stop-color="#000"/><stop offset=".2" stop-color="#fff"/><stop offset=".88" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="soft"><rect width="${w}" height="${h}" fill="url(#edge)"/></mask></defs>`;
  const land = oval(330, 170, 70, 70, "#f6c94f") + path("M0 400L150 270L250 330L430 190L560 320L690 240L820 330L960 270V520H0Z", "#1f6b8a") + path("M0 440Q220 340 460 410T960 380V540H0Z", "#2f8299") + palm(120, 500, 1.3, 30) + path("M0 486Q240 456 480 478T960 470V660H0Z", "#5f9f6c");
  const rows = [[532, 12], [582, 19], [642, 27]].map(([y, r], d) => `<rect x="60" y="${y}" width="850" height="${r}" rx="${r / 2}" fill="#6b4c2b"/>` + Array.from({ length: 13 - d * 2 }, (_, i) => bush(n(100 + i * (66 + d * 13)), y - 4, r + 4, greens[(i + d) % 3])).join("") + pipe(`M60 ${y + r * 0.7}H910`, 6)).join("");
  const man = person({ shirt: "#f6b92b", cloth: "#2c3f52", hat: "#f1dfae", skin: "#8a5a3c", arm: line("M-26 -140Q-58 -126 -78 -112", "#8a5a3c", 12) + line("M28 -140Q46 -116 38 -92", "#8a5a3c", 12) });
  return (animate ? style : "") + fade + `<g mask="url(#soft)">${land}${rows}</g>` + move(0, tank(770, 520, 1.28)) + move(1, pipe("M716 340H664V600") + valve(664, 560, 1.1)) + move(2, sprinkler(250, 566, 1.5) + spray("M250 440Q160 300 60 520M250 440Q190 340 120 540M250 440Q226 380 190 548M250 440Q340 300 440 520M250 440Q310 340 380 540M250 440Q274 380 310 548", 4)) + move(3, at(556, 628, 0, 1.62, man));
}
save("hero", 960, 660, hero(true));
save("hero-still", 960, 660, hero(false));

// ---------- The two halves of the service ----------
{
  const w = 720, h = 300;
  const scene = (content) => `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe6ee"/><stop offset="1" stop-color="#f6f3de"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#sky)"/>` + path("M0 190Q170 96 340 152T720 132V240H0Z", "#c3dcd0") + path("M0 214Q200 160 400 192T720 182V250H0Z", "#a9cbb2") + `<rect y="206" width="${w}" height="${h - 206}" fill="#93be74"/>` + content;
  const save2 = (name, content) => {
    for (const [suffix, css] of [["", style], ["-still", ""]]) save(name + suffix, w, h, css + scene(content));
  };
  const beds = (rows) => rows.map(([y, r], d) => `<rect x="-10" y="${y}" width="740" height="${r}" rx="${r / 2}" fill="#7a5836"/>` + Array.from({ length: 13 - d }, (_, i) => bush(n(24 + i * (58 + d * 6)), y - 3, r + 2, greens[(i + d) % 3])).join("") + pipe(`M-10 ${y + r * 0.7}H730`, 6)).join("");
  const spade = at(196, 270, 8, 1, line("M0 -10V-96", "#8a6a42", 7) + line("M-14 -98H14", "#8a6a42", 7) + path("M-16 -14H16V10Q0 30 -16 10Z", "#8a9a92"));
  const coil = (x, y, r) => [1, 0.74, 0.48].map((s) => `<ellipse cx="${x}" cy="${y}" rx="${r * s}" ry="${r * 0.36 * s}" fill="none" stroke="${PIPE}" stroke-width="8"/>`).join("");
  // New: a trench with pipe going in, a tank and a plan in hand.
  save2("build", tank(618, 228, 0.6) + pipe("M586 148H540V262", 9) + beds([[222, 10]]) +
    path("M-10 262H540L560 292H-10Z", "#6b4c2b") + pipe("M-10 276H540", 11) + [80, 200, 320, 440].map((x) => oval(x, 276, 7, 6, "#e2702f")).join("") +
    spade + coil(318, 244, 40) + at(420, 258, 0, 0.94, adviser("tablet")) + at(96, 258, 0, 0.9, grower("rest")));
  // Repair: a leaking joint, the person fixing it and the tools.
  const wrench = at(330, 158, -38, 1, line("M0 0V46", "#8a9a92", 9) + path("M-13 -8Q-13 -24 0 -24T13 -8L7 -8V-16H-7V-8Z", "#8a9a92"));
  const fixer = person({ shirt: "#1f6fa3", cloth: "#2c3f52", hat: "#f6b92b", skin: "#8a5a3c", arm: line("M-26 -140Q-52 -130 -70 -116", "#8a5a3c", 12) + line("M28 -140Q46 -116 38 -92", "#8a5a3c", 12) });
  save2("repair", beds([[222, 10]]) + oval(250, 280, 120, 15, WATER, 'fill-opacity="0.65"') + pipe("M-10 262H730", 17) +
    '<rect x="232" y="249" width="36" height="26" rx="5" fill="#e2702f"/>' +
    spray("M250 250Q228 150 168 226M250 250Q240 176 206 236M250 250Q250 160 250 160M250 250Q262 176 296 236M250 250Q274 150 330 226", 4) + drops([[180, 244], [316, 244], [214, 252], [286, 252]], 6) +
    at(408, 272, 0, 0.98, fixer) + wrench +
    at(520, 284, 0, 1, '<rect x="-46" y="-42" width="92" height="44" rx="6" fill="#c63a27"/><rect x="-46" y="-26" width="92" height="7" fill="#8f2617"/>' + line("M-22 -42V-58H22V-42", "#8f2617", 7) + '<rect x="-9" y="-30" width="18" height="14" rx="3" fill="#f6b92b"/>') + filter(630, 272, 1.1) + valve(90, 264, 1));
}

// Still scene for panels and cards
save("panel", 720, 460, sky + `<rect y="286" width="${W}" height="${H - 286}" fill="#93be74"/>` + tank(588, 300, 0.76) +
  [344, 396, 446].map((y, r) => `<rect x="-10" y="${y}" width="740" height="${18 + r * 4}" rx="10" fill="#7a5836"/>` + Array.from({ length: 11 - r }, (_, i) => bush(34 + i * (66 + r * 8), y - 4, 18 + r * 5, greens[(i + r) % 3])).join("") + pipe(`M-10 ${y + 12}H730`, 7)).join("") + pipe("M560 186H510V330") +
  sprinkler(220, 380, 1.4) + spray("M220 262Q150 140 40 330M220 262Q170 170 96 340M220 262Q196 208 156 344M220 262Q290 140 400 330M220 262Q270 170 344 340M220 262Q244 208 284 344", 3.5));
console.log(`Irrigation pictures drawn in ${OUT}`);
