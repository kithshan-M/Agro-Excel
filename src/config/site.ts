/**
 * Business details used across the whole site. Edit them here only.
 * Contact fields left as "" are hidden until you fill them in.
 */
export const siteConfig = {
  name: "Agro Excel",
  tagline: "Greenhouses, vegetable seeds and crop advice",
  description:
    "Agro Excel builds greenhouses, sells vegetable seeds and advises growers on their crops.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contact: {
    phone: "",
    /** International format, digits only (country code first). */
    whatsapp: "",
    email: "",
    address: "",
    openingHours: "",
  },
};

export const navLinks = [
  { href: "/greenhouses", label: "Greenhouses" },
  { href: "/seeds", label: "Seeds" },
  { href: "/consulting", label: "Crop consulting" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
