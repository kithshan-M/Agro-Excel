import { Noto_Sans_Sinhala } from "next/font/google";

/** Only on Sinhala pages. Latin letters there still use the site's own fonts. */
const sinhala = Noto_Sans_Sinhala({
  variable: "--font-sinhala",
  subsets: ["sinhala"],
});

export const sinhalaFont = sinhala.variable;
