import { Bricolage_Grotesque, Figtree } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const latinFonts = `${bricolage.variable} ${figtree.variable}`;
