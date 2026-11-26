import { Noto_Sans_Tamil } from "next/font/google";

/** Only on Tamil pages. Latin letters there still use the site's own fonts. */
const tamil = Noto_Sans_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
  // This is one of three root layouts, and Next preloads a root layout's font on every
  // route. Without this, English and Sinhala visitors would download it too.
  preload: false,
});

export const tamilFont = tamil.variable;
