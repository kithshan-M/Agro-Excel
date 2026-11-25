// Draws the vegetable illustrations in public/images/seeds.
// Run from the project root: npm run draw
import { mkdirSync, writeFileSync } from "node:fs";
import { at, body, calyx, frill, leaf, line, n, oval, path, shadow, shine } from "./draw-helpers.mjs";

const OUT = "public/images/seeds";
// ---------- Vegetables, each on a 320 x 260 canvas ----------
const tomatoOne =
  body("M0 -62C50 -82 88 -48 86 0C84 48 46 72 0 72C-46 72 -84 48 -86 0C-88 -48 -50 -82 0 -62Z", "#dd4630", "#b52f1f", shine(-40, -22, 15, 27, 28)) +
  calyx(0, -58, 46, "#3f8438", 5, 12) + line("M0 -58C2 -72 8 -80 14 -86", "#356f30", 8);
const brinjalOne =
  body("M-6 -78C34 -84 54 -40 60 6C68 64 36 98 0 96C-44 94 -62 54 -50 4C-40 -40 -34 -72 -6 -78Z", "#643078", "#451c55", shine(-26, 10, 9, 40, 10, 0.3)) +
  path("M-34 -66C-22 -92 26 -92 34 -62C40 -44 30 -40 22 -52C18 -34 4 -34 0 -50C-6 -34 -22 -36 -22 -52C-32 -42 -40 -48 -34 -66Z", "#4d8f3c") +
  line("M0 -80C0 -96 8 -106 16 -110", "#3f7a33", 11);
const chilliOne = (base, dark) =>
  body("M-12 -78C10 -84 20 -64 20 -38C20 14 14 62 -22 104C-26 60 -24 10 -28 -34C-30 -58 -28 -74 -12 -78Z", base, dark, shine(-12, -20, 4, 34, 2, 0.4), [-6, -2]) +
  path("M-29 -62C-24 -84 14 -88 20 -58C10 -66 -18 -70 -29 -62Z", "#356f30") + line("M-4 -78C-2 -94 6 -104 14 -108", "#356f30", 7);
const capsicumOne =
  body("M0 -80C34 -86 44 -62 40 -24C36 28 20 74 4 106C-16 74 -36 28 -40 -20C-42 -60 -32 -82 0 -80Z", "#bdd351", "#97b237", line("M-6 -70C-16 -20 -12 40 0 86", "#97b237", 3) + shine(-22, -26, 6, 34, 4, 0.45), [-9, -3]) +
  path("M-30 -66C-22 -92 24 -92 32 -64C20 -74 -16 -76 -30 -66Z", "#4d8f3c") + line("M0 -82C2 -98 10 -106 18 -108", "#3f7a33", 9);
const bellOne =
  body("M0 -60C28 -86 88 -74 92 -18C96 38 74 88 44 84C30 94 14 86 0 92C-14 86 -30 94 -44 84C-74 88 -96 38 -92 -18C-88 -74 -28 -86 0 -60Z", "#f0b323", "#cf8d12", line("M-8 -54C-34 -20 -34 40 -22 80M12 -54C40 -20 38 40 26 80", "#d3941a", 5) + shine(-58, -10, 10, 34, 8)) +
  path("M-26 -58C-20 -70 22 -72 28 -58C18 -46 -16 -46 -26 -58Z", "#3f8438") + line("M0 -60C-2 -80 4 -92 12 -98", "#3f8438", 13);
const okraOne =
  body("M0 -86C22 -86 26 -58 24 -26C22 26 14 70 2 112C-12 70 -22 26 -24 -26C-25 -58 -22 -86 0 -86Z", "#7fb843", "#5b932f", line("M-9 -72C-14 -10 -8 50 0 98M9 -72C14 -10 10 50 4 92", "#5b932f", 2.5) + shine(-15, -20, 3, 36, 0, 0.45), [-5, -2]) +
  path("M-21 -72C-22 -92 22 -94 22 -72C12 -80 -12 -80 -21 -72Z", "#4d8f3c") + line("M0 -88V-106", "#4d8f3c", 9);
const carrotOne =
  body("M0 -66C34 -68 46 -44 38 -6C30 40 14 84 2 116C-14 84 -32 40 -38 -6C-44 -44 -34 -68 0 -66Z", "#ee8a2c", "#cf6b17", line("M-30 -30H-8M10 -12H32M-28 16H-12M6 34H20M-16 58H-4", "#cf6b17", 3.5) + shine(-20, -10, 5, 34, 6, 0.35), [-8, -3]);
const carrotTop = [-128, -110, -90, -70, -52].map((a, i) => leaf(0, -62, 62 + (i % 2) * 14, 11, a, i % 2 ? "#4f9a3f" : "#3d8035")).join("");
const radishOne =
  [-122, -98, -78, -56].map((a, i) => leaf(0, -70, 82, 20, a, i % 2 ? "#4f9a3f" : "#3d8035")).join("") +
  body("M0 -74C32 -76 40 -44 34 0C28 50 12 86 -4 120C-16 86 -32 46 -36 0C-40 -44 -32 -74 0 -74Z", "#faf7f0", "#ddd5c5", line("M-26 -20H-10M8 6H24M-22 34H-12", "#e3dccd", 3), [-9, -3]);

const veg = {
  tomato: shadow(160, 224, 120) + at(212, 160, 14, 0.72, tomatoOne) + at(128, 148, -6, 0.98, tomatoOne),
  brinjal: shadow(160, 232, 110) + at(212, 138, 24, 0.82, brinjalOne) + at(124, 134, -14, 0.92, brinjalOne),
  "green-chilli": shadow(160, 236, 100) + at(98, 132, 22, 0.92, chilliOne("#5aa536", "#3f7f27")) + at(168, 128, 4, 1, chilliOne("#68b340", "#458a2a")) + at(232, 136, -18, 0.9, chilliOne("#d63b2a", "#a9281b")),
  capsicum: shadow(160, 238, 100) + at(216, 134, -20, 0.86, capsicumOne) + at(122, 132, 12, 0.98, capsicumOne),
  "bell-pepper": shadow(160, 228, 100) + at(160, 136, 0, 1.02, bellOne),
  okra: shadow(160, 240, 100) + at(96, 134, 20, 0.9, okraOne) + at(162, 130, 0, 1, okraOne) + at(226, 136, -20, 0.9, okraOne),
  "bitter-gourd": (() => {
    const shape = "M44 152C70 96 128 74 184 92C232 108 262 138 284 168C246 184 214 196 168 200C112 204 70 188 44 152Z";
    let bumps = "";
    for (let r = 0; r < 6; r++) {
      for (let k = 0; k < 13; k++) {
        const x = 52 + k * 18 + (r % 2) * 9;
        const y = 92 + r * 20 + Math.sin(k / 2.6) * -6;
        bumps += oval(x, y, 7.5, 4.6, r % 2 ? "#83c25a" : "#79b94f", `transform="rotate(${k * 2 - 8} ${x} ${n(y)})"`);
      }
    }
    const edge = [[70, 118], [92, 101], [118, 89], [146, 85], [174, 88], [202, 97], [228, 111], [250, 130], [78, 182], [104, 194], [134, 201], [166, 202], [198, 198], [228, 190], [254, 180]]
      .map(([x, y]) => oval(x, y, 7, 6, "#5fa442")).join("");
    return shadow(164, 216, 120) + edge + body(shape, "#69ad48", "#4c8c35", bumps, [-4, -8]) + line("M46 152C32 146 26 134 22 122", "#4c8c35", 8) + leaf(26, 124, 58, 22, -38, "#4f9a3f");
  })(),
  "snake-gourd": (() => {
    const d = "M66 62C150 40 92 148 160 148C232 148 186 226 264 208";
    return shadow(170, 238, 120) + line(d, "#8fb873", 40) + line(d, "#b9d79c", 33, 'transform="translate(-2 -3)"') +
      line(d, "#e4f0d6", 5, 'stroke-dasharray="34 16" transform="translate(-9 -8)"') + line(d, "#8db972", 5, 'stroke-dasharray="26 20" transform="translate(5 5)"') +
      line("M62 60C48 58 40 50 34 40", "#5a9344", 9) + leaf(38, 44, 60, 26, 8, "#4f9a3f");
  })(),
  "ridge-gourd": (() => {
    const shape = "M78 58C104 44 140 84 182 124C228 168 268 192 258 220C246 246 190 234 144 188C102 146 56 86 78 58Z";
    const ridges = ["M84 62C130 92 210 164 252 226", "M74 72C104 122 168 196 236 236", "M94 56C150 84 224 156 258 206", "M72 88C92 136 148 198 206 230"].map((d) => line(d, "#39752f", 4) + line(d, "#84bd66", 1.8, 'transform="translate(-3 -2)"')).join("");
    return shadow(176, 246, 110) + body(shape, "#5b9f49", "#417f35", ridges, [-5, -6]) + line("M80 58C70 46 66 36 66 24", "#417f35", 9) + leaf(68, 30, 62, 24, 14, "#4f9a3f");
  })(),
  pumpkin: (() => {
    const seg = (cx, rx, c) => oval(cx, 150, rx, 72, c);
    return shadow(160, 222, 124) + seg(82, 44, "#c9772a") + seg(238, 44, "#b96a22") + seg(112, 46, "#dd8c38") + seg(208, 46, "#cf7f2f") + seg(160, 46, "#e79a45") +
      line("M112 96C92 130 94 178 114 206M208 96C228 130 226 178 206 206M160 88V214", "#b96a22", 3.5, 'stroke-opacity="0.55"') + shine(138, 120, 8, 26, 8) +
      path("M144 90C146 66 152 52 172 42L184 56C174 64 174 76 178 90C168 98 152 98 144 90Z", "#4d8f3c") + leaf(176, 74, 76, 30, -8, "#4f9a3f") + line("M150 84C128 66 108 70 104 86C100 98 114 100 114 90", "#4d8f3c", 3.5);
  })(),
  cucumber: (() => {
    const shape = "M56 92C70 66 104 66 130 84L232 160C256 180 252 210 234 220C216 230 196 222 176 206L70 126C56 114 50 104 56 92Z";
    const marks = line("M76 92L210 192M96 84L230 182M70 112L190 202", "#8cc271", 3, 'stroke-dasharray="22 14"');
    const slice = (x, y, r) => oval(x, y, r, r, "#3f8a3c") + oval(x, y, r * 0.87, r * 0.87, "#dcedc0") + oval(x, y, r * 0.56, r * 0.56, "#c8e2a4") +
      Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4; return oval(x + Math.cos(a) * r * 0.38, y + Math.sin(a) * r * 0.38, r * 0.1, r * 0.06, "#f7fbe9", `transform="rotate(${i * 45} ${n(x + Math.cos(a) * r * 0.38)} ${n(y + Math.sin(a) * r * 0.38)})"`); }).join("");
    return shadow(168, 238, 116) + body(shape, "#4c9a46", "#347132", marks, [-5, -7]) + slice(250, 112, 38) + slice(206, 82, 32);
  })(),
  "green-bean": (() => {
    const pod = (d) => line(d, "#3f7f2c", 20) + line(d, "#67ad45", 15, 'transform="translate(-1.5 -2)"') + line(d, "#a3d27f", 4, 'stroke-dasharray="10 16" transform="translate(-4 -4)"');
    return shadow(160, 232, 112) + pod("M62 196C92 150 164 92 248 78") + pod("M50 118C112 118 186 152 254 212") + pod("M96 222C122 160 160 108 206 48") + pod("M70 78C130 128 204 160 268 150") +
      line("M206 48L212 34M70 78L58 66M248 78L264 70M254 212L266 222", "#3f7f2c", 6);
  })(),
  "long-bean": (() => {
    let out = shadow(160, 236, 112);
    for (let i = 0; i < 7; i++) {
      const o = i * 9;
      const d = `M${62 + o} ${36 + (i % 3) * 6}C${92 + o} 96 ${88 + o} 120 ${134 + o * 0.35} 134C${196 + o * 0.6} 152 ${250 - o} 176 ${222 + o * 0.4} ${206 + (i % 3) * 7}C${196 + o * 0.3} ${232 - i * 2} 130 ${224 - i * 3} ${96 + o * 0.6} ${206 - i * 2}`;
      out += line(d, "#3f7f2c", 10) + line(d, i % 2 ? "#78b950" : "#69ab45", 7, 'transform="translate(-1 -1)"');
    }
    return out + path("M124 116L176 124L170 152L118 144Z", "#c79a4f") + line("M122 124L174 132M120 136L172 144", "#a87c36", 2);
  })(),
  "winged-bean": (() => {
    const pod = (() => {
      const edge = (side, amp) => Array.from({ length: 21 }, (_, i) => `${n(-100 + i * 10)} ${n(side * (18 + (i % 2 ? amp : 1)) * Math.sin(((i + 1.6) / 23.2) * Math.PI) ** 0.5)}`);
      const top = edge(-1, 7), bottom = edge(1, 7).reverse();
      const wing = `M-112 0L${top.join("L")}L112 0L${bottom.join("L")}Z`;
      return path(wing, "#6cae4a", 'stroke="#6cae4a" stroke-width="9" stroke-linejoin="round"') + line("M-100 -11C-40 -17 40 -17 100 -10M-100 11C-40 17 40 17 100 10", "#4c8c35", 2.5) + path("M-112 0C-60 -11 60 -11 112 0C60 11 -60 11 -112 0Z", "#86c463") + line("M-98 0H98", "#4c8c35", 2.5) + line("M-112 0H-130", "#4c8c35", 7);
    })();
    return shadow(164, 232, 108) + at(170, 88, -14, 0.98, pod) + at(150, 140, 10, 1.04, pod) + at(176, 190, -6, 0.94, pod);
  })(),
  carrot: shadow(160, 238, 110) + at(216, 136, 24, 0.84, carrotTop + carrotOne) + at(120, 130, -10, 0.98, carrotTop + carrotOne),
  beetroot: (() => {
    const tops = [-128, -108, -90, -70, -50].map((a, i) => {
      const r = (a * Math.PI) / 180, x = 160 + Math.cos(r) * 40, y = 112 + Math.sin(r) * 40;
      return line(`M160 112L${n(x)} ${n(y)}`, "#b8325c", 8) + leaf(n(x), n(y), 62 + (i % 2) * 6, 21, a, i % 2 ? "#4f9a3f" : "#3d8035", "#b8325c", 3);
    }).join("");
    return shadow(160, 236, 92) + tops + body("M160 104C214 96 240 134 232 172C226 206 190 220 168 224C164 232 162 240 154 250C154 240 154 232 150 224C128 220 94 206 88 172C80 134 106 96 160 104Z", "#8f2247", "#661633", line("M100 150C130 162 190 162 222 148M110 186C140 196 180 196 212 184", "#731a3a", 3) + shine(118, 148, 10, 24, 20, 0.28));
  })(),
  radish: shadow(160, 244, 100) + at(212, 140, 22, 0.8, radishOne) + at(120, 138, -10, 0.9, radishOne),
  "knol-khol": (() => {
    const stems = [[-150, 74], [-124, 92], [-100, 98], [-78, 98], [-54, 92], [-30, 74]].map(([a, l], i) => {
      const r = (a * Math.PI) / 180, x0 = 160 + Math.cos(r) * 46, y0 = 162 + Math.sin(r) * 46, x = 160 + Math.cos(r) * l, y = 162 + Math.sin(r) * l;
      return line(`M${n(x0)} ${n(y0)}L${n(x)} ${n(y)}`, "#8fbf68", 8) + leaf(n(x), n(y), 58, 20, a, i % 2 ? "#4f9a3f" : "#3d8035");
    }).join("");
    return shadow(160, 232, 96) + stems + body("M160 108C216 106 238 140 230 176C224 210 194 228 160 228C126 228 96 210 90 176C82 140 104 106 160 108Z", "#b5d88d", "#8dba66", [[128, 138, -38], [160, 126, 0], [194, 138, 38], [110, 172, -80], [212, 172, 80]].map(([x, y, a]) => oval(x, y, 11, 4.5, "#93c06c", `transform="rotate(${a} ${x} ${y})"`) + oval(x, y + 1, 7, 2.4, "#d6ecb8", `transform="rotate(${a} ${x} ${y})"`)).join("") + shine(116, 160, 9, 24, 14, 0.4));
  })(),
  leek: (() => {
    const one = [-112, -100, -90, -80, -68].map((a, i) => leaf(0, -10, 112 - Math.abs(i - 2) * 8, 13, a, ["#2f6f3a", "#4f9a4a", "#3d8540", "#4f9a4a", "#2f6f3a"][i], "#ffffff33")).join("") +
      body("M-17 -22C-12 -34 12 -34 17 -22L20 74C20 90 -20 90 -20 74Z", "#eef4dd", "#cbdab0", line("M-7 -20V78M6 -20V78", "#d3e0ba", 2.5), [-5, 0]) + path("M-17 -22C-12 -42 12 -42 17 -22L16 6C6 -4 -6 -4 -16 6Z", "#a9d07c") + line("M-12 84L-18 98M-4 86L-6 102M4 86L6 102M12 84L18 98", "#cbbd95", 2.5);
    return shadow(160, 240, 92) + at(106, 136, -14, 0.98, one) + at(214, 138, 14, 0.96, one) + at(160, 136, 0, 1.06, one);
  })(),
  cabbage: shadow(160, 230, 112) +
    path("M60 150C46 96 92 62 128 70C150 40 206 46 220 76C262 78 278 130 256 164C258 206 206 232 160 228C112 234 62 206 60 150Z", "#4f9a53") +
    line("M60 150C92 158 108 176 118 206M256 164C226 166 212 180 204 206M128 70C118 92 108 110 92 124M220 76C222 100 230 114 244 128", "#8cc78a", 3) +
    body("M92 152C88 106 122 78 160 80C204 80 234 112 230 156C226 194 194 214 160 214C122 214 94 192 92 152Z", "#a9d68c", "#82b968", line("M160 214C150 170 152 120 166 84M152 170C132 160 112 150 98 132M156 140C144 122 134 108 122 96M154 168C178 156 204 146 226 130M160 136C176 120 188 108 200 98", "#d7efc4", 3.5)) +
    path("M104 190C120 150 150 132 190 140C214 146 228 160 230 172C220 202 190 216 160 214C134 214 114 206 104 190Z", "#bfe3a3", 'fill-opacity="0.85"') + line("M112 190C140 172 176 162 224 172M142 178C146 190 150 200 156 208M170 170C180 182 188 192 192 202", "#e4f5d6", 3),
  lettuce: shadow(160, 232, 112) +
    [[160, 142, 108, 84, 17, "#4f9a3f", 0], [160, 144, 92, 70, 15, "#6ab34c", 0.06], [160, 146, 74, 56, 13, "#86c85f", 0.02], [160, 148, 54, 40, 11, "#a5db7c", 0.08], [160, 150, 32, 24, 9, "#c8ee9f", 0.03]]
      .map(([x, y, rx, ry, b, c, turn]) => path(frill(x, y, rx, ry, b, 0.24, turn), c)).join("") +
    line("M160 150L84 108M160 150L236 108M160 150L160 66M160 150L78 182M160 150L242 182M160 150L160 226", "#e2f6cc", 2.5, 'stroke-opacity="0.55"'),
  kangkung: (() => {
    const arrow = (x, y, a, s, c) => at(x, y, a, s, path("M0 0C-16 -4 -24 -14 -22 -24C-8 -20 4 -14 12 -14C42 -14 74 -8 96 0C74 8 42 14 12 14C4 14 -8 20 -22 24C-24 14 -16 4 0 0Z", c) + line("M0 0H86", "#ffffff55", 2));
    const stems = [[132, 238, 84, 92], [146, 240, 118, 66], [160, 240, 160, 52], [174, 240, 204, 68], [188, 238, 240, 96]].map(([a, b, c, d]) => line(`M${a} ${b}C${a} ${(b + d) / 2} ${(a + c) / 2} ${d + 40} ${c} ${d}`, "#7db858", 8)).join("");
    return shadow(160, 244, 70) + stems + arrow(84, 92, -140, 0.86, "#3d8035") + arrow(118, 70, -112, 0.8, "#4f9a3f") + arrow(160, 100, -90, 0.92, "#5aa747") + arrow(204, 70, -68, 0.8, "#4f9a3f") + arrow(240, 96, -40, 0.86, "#3d8035") + arrow(112, 150, -164, 0.74, "#4f9a3f") + arrow(212, 150, -18, 0.74, "#4f9a3f") + arrow(138, 128, -122, 0.6, "#68b552") + arrow(184, 128, -58, 0.6, "#68b552") +
      path("M122 196C140 206 180 206 198 196L196 216C178 226 142 226 124 216Z", "#c79a4f");
  })(),
  thampala: (() => {
    const rl = (x, y, l, a, c) => leaf(x, y, l, l * 0.42, a, c, "#b63a63", 3);
    return shadow(160, 244, 70) + line("M160 240V96M160 190C136 176 120 162 106 146M160 190C184 176 200 162 214 146M160 150C144 136 132 124 122 106M160 150C176 136 188 124 198 106", "#b84a6d", 7) +
      rl(106, 148, 72, -164, "#4a9140") + rl(214, 148, 72, -16, "#4a9140") + rl(122, 108, 70, -138, "#3d8035") + rl(198, 108, 70, -42, "#3d8035") + rl(140, 186, 66, 164, "#3d8035") + rl(180, 186, 66, 16, "#3d8035") + rl(160, 112, 84, -112, "#5aa747") + rl(160, 112, 84, -68, "#5aa747") + rl(160, 116, 88, -90, "#68b552");
  })(),
  nivithi: (() => {
    const heart = (x, y, a, s, c) => at(x, y, a, s, body("M0 0C-12 -34 14 -58 46 -50C84 -42 104 -16 112 0C104 16 84 42 46 50C14 58 -12 34 0 0Z", c, "#2f6f30", line("M0 0H100M26 0L52 -32M26 0L52 32M56 0L78 -24M56 0L78 24", "#c9eab0", 2.5, 'stroke-opacity="0.7"') + shine(46, -26, 20, 7, 10, 0.22), [-3, -5]));
    return shadow(160, 242, 84) + line("M150 244C138 190 176 150 158 60C156 44 166 34 176 30", "#8a3f63", 9) + heart(150, 206, 158, 0.8, "#4f9a3f") + heart(156, 190, 14, 0.86, "#4f9a3f") + heart(164, 140, 196, 0.92, "#5aa747") + heart(166, 124, -18, 0.92, "#5aa747") + heart(160, 76, -146, 0.78, "#68b552") + heart(166, 70, -50, 0.74, "#68b552");
  })(),
};

const svg = (w, h, content, style = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${style}${content}</svg>`;

mkdirSync(OUT, { recursive: true });
for (const [name, content] of Object.entries(veg)) {
  writeFileSync(`${OUT}/${name}.svg`, svg(320, 260, content));
}

// ---------- Hero: seed packets in front of hills and coconut palms ----------
function packet(name, color, label) {
  let crimp = "";
  for (let x = -104; x <= 104; x += 13) crimp += `M${x} -158V-136`;
  return `<rect x="-112" y="-162" width="224" height="322" rx="8" fill="#13251d" fill-opacity="0.18" transform="translate(7 9)"/><rect x="-112" y="-162" width="224" height="322" rx="8" fill="${color}"/>${line(crimp, "#ffffff", 3, 'stroke-opacity="0.3"')}<path d="M-112 -130H112" stroke="#fff" stroke-opacity="0.35" stroke-width="2"/><rect x="-92" y="-72" width="184" height="172" rx="86" fill="#fffaf0"/><g transform="translate(-88 -58) scale(0.55)">${veg[name]}</g><text x="0" y="-92" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" font-size="27" fill="#fff">${label}</text><path d="M-40 128H40" stroke="#fff" stroke-opacity="0.75" stroke-width="5" stroke-linecap="round"/>`;
}
function palm(x, y, s, lean) {
  const fronds = [-168, -142, -112, -78, -46, -16, 12, 168].map((a) => {
    const r = (a * Math.PI) / 180;
    return path(`M0 0Q${n(Math.cos(r) * 42)} ${n(Math.sin(r) * 42 - 18)} ${n(Math.cos(r) * 84)} ${n(Math.sin(r) * 62 + 22)}Q${n(Math.cos(r) * 46)} ${n(Math.sin(r) * 40 + 2)} 0 0Z`, "#a8690a");
  }).join("");
  return at(x, y, 0, s, line(`M0 0C${lean * 0.2} -60 ${lean * 0.5} -110 ${lean} -160`, "#a8690a", 9) + at(lean, -160, 0, 1, fronds));
}
function hero(animate) {
  const motion = (i) => (animate ? `class="rise" style="animation-delay:${0.15 + i * 0.18}s"` : "");
  const group = (i, x, y, rotate, content) => `<g transform="translate(${x} ${y}) rotate(${rotate})"><g ${motion(i)}>${content}</g></g>`;
  const hills =
    path("M0 330C120 230 210 250 300 300C400 190 520 170 640 270C740 200 840 210 900 260V620H0Z", "#eda91c") +
    path("M0 420C140 330 270 350 380 400C500 320 660 310 900 390V620H0Z", "#dd9712");
  const rows = Array.from({ length: 9 }, (_, i) => `M450 452Q${n(450 + (i - 4) * 70)} 530 ${n(450 + (i - 4) * 190)} 640`).join("");
  const field = path("M0 486C240 440 660 440 900 486V620H0Z", "#c9840c") + line(rows, "#b0710a", 5, 'stroke-opacity="0.6"');
  const seeds = [[120, 560], [168, 584], [214, 566], [690, 574], [742, 556], [782, 586], [640, 592], [262, 594]].map(([x, y], i) => oval(x, y, 11, 6.5, "#fff3d0", `transform="rotate(${i * 47} ${x} ${y})"`)).join("");
  const style = animate
    ? "<style>.rise{animation:rise .9s cubic-bezier(.2,.8,.2,1) both}@keyframes rise{from{opacity:0;transform:translateY(90px)}}</style>"
    : "";
  const fade = '<defs><linearGradient id="edge"><stop offset="0" stop-color="#000"/><stop offset=".16" stop-color="#fff"/><stop offset=".84" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="soft"><rect width="900" height="620" fill="url(#edge)"/></mask></defs>';
  const scenery = `${fade}<g mask="url(#soft)">${hills}${palm(130, 470, 1.15, 34)}${palm(196, 486, 0.82, -20)}${palm(772, 470, 1.2, -36)}${field}</g>`;
  return svg(900, 620, scenery +
    group(0, 258, 352, -13, packet("brinjal", "#5d2c70", "Brinjal")) + group(1, 642, 352, 13, packet("bitter-gourd", "#2f7a45", "Bitter gourd")) + group(2, 450, 336, 0, packet("tomato", "#c63a27", "Tomato")) + seeds, style);
}
writeFileSync(`${OUT}/hero.svg`, hero(true));
writeFileSync(`${OUT}/hero-still.svg`, hero(false));
console.log(`${Object.keys(veg).length} vegetables and the hero drawn in ${OUT}`);
