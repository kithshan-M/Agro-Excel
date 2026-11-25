import type { Service } from "./services";

/** The services in menu order, with a picture for the phone menu. */
export const serviceNav: { slug: Service["slug"]; label: string; image: string }[] = [
  { slug: "greenhouses", label: "Greenhouses", image: "/images/greenhouses/tunnel.svg" },
  { slug: "irrigation", label: "Irrigation", image: "/images/irrigation/drip-still.svg" },
  { slug: "seeds", label: "Seeds", image: "/images/seeds/tomato.svg" },
  { slug: "consulting", label: "Crop consulting", image: "/images/consulting/stage-4.svg" },
];

/** Shortcuts in the footer, for things people often come to do. */
export const quickLinks = [
  { href: "/greenhouses#quotation", label: "Get a greenhouse quotation" },
  { href: "/irrigation#irrigation-parts", label: "Report an irrigation fault" },
  { href: "/seeds#catalogue", label: "Make a seed list" },
  { href: "/seeds#seasons", label: "Check when to plant" },
  { href: "/consulting#problem", label: "Describe a crop problem" },
];
