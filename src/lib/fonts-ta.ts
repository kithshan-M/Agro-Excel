import { Noto_Sans_Tamil } from "next/font/google";

/** Only on Tamil pages. Latin letters there still use the site's own fonts. */
const tamil = Noto_Sans_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
});

export const tamilFont = tamil.variable;
