// Water tank shared by the irrigation and home page drawings.
import { at, line, oval } from "./draw-helpers.mjs";

/** Tank on a stand. The ground is at y, and it stands about 360 tall at size 1. */
export function tank(x, y, size) {
  const legs = line("M-46 0L-38 -190M46 0L38 -190M-14 -6V-190M18 -6V-190", "#7a5836", 9) + line("M-44 -60H44M-41 -124H41", "#8a6a42", 7) + line("M-44 -60L41 -124M44 -60L-41 -124", "#8a6a42", 4);
  const shell =
    '<rect x="-60" y="-204" width="120" height="16" rx="4" fill="#8a6a42"/>' +
    '<path d="M-54 -204V-316Q-54 -346 -16 -352H16Q54 -346 54 -316V-204Z" fill="#1f6fa3"/>' +
    '<path d="M18 -204V-352Q54 -346 54 -316V-204Z" fill="#174f75"/>' +
    '<rect x="-18" y="-364" width="36" height="14" rx="4" fill="#174f75"/>' +
    line("M-54 -232H54M-54 -262H54M-54 -292H54", "#16557f", 4) +
    '<path d="M-42 -214V-312Q-42 -328 -26 -334" fill="none" stroke="#8fc1dd" stroke-width="6" stroke-linecap="round" stroke-opacity="0.6"/>';
  return at(x, y, 0, size, oval(0, 2, 64, 9, "#13251d", 'fill-opacity="0.16"') + legs + shell);
}
