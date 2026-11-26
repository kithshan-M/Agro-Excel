import { Noto_Sans_Sinhala } from "next/font/google";

/** Only on Sinhala pages. Latin letters there still use the site's own fonts. */
const sinhala = Noto_Sans_Sinhala({
  variable: "--font-sinhala",
  subsets: ["sinhala"],
  // This is one of three root layouts, and Next preloads a root layout's font on every
  // route. Without this, English and Tamil visitors would download it too.
  preload: false,
  // Its letters are taller than the phone's own Sinhala font, so swapping it in late made
  // the page jump. "optional" keeps the phone's font on a slow first visit (often the same
  // Noto font on Android) and uses this one from the cache on the next page.
  display: "optional",
});

export const sinhalaFont = sinhala.variable;
