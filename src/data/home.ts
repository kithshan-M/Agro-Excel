import type { Service } from "./services";

/** Labels on the farm scene. at is [left %, top %] on public/images/home/farm.svg. */
export const scenePins: { slug: Service["slug"]; label: string; at: [number, number] }[] = [
  { slug: "greenhouses", label: "Greenhouses", at: [27, 55] },
  { slug: "consulting", label: "Crop consulting", at: [50.4, 61] },
  { slug: "irrigation", label: "Irrigation", at: [65.3, 35] },
  { slug: "seeds", label: "Vegetable seeds", at: [85, 36] },
];

/** Shortcuts under the farm scene. icon is one of those in components/home/tasks.tsx. */
export const tasks: {
  label: string;
  href: string;
  service: Service["slug"];
  icon: "house" | "size" | "drop" | "fault" | "packet" | "calendar" | "sign" | "plant";
}[] = [
  { label: "Find a greenhouse type", href: "/greenhouses#types", service: "greenhouses", icon: "house" },
  { label: "Plan a greenhouse size", href: "/greenhouses#size", service: "greenhouses", icon: "size" },
  { label: "Choose irrigation", href: "/irrigation#irrigation-types", service: "irrigation", icon: "drop" },
  { label: "Find an irrigation fault", href: "/irrigation#irrigation-parts", service: "irrigation", icon: "fault" },
  { label: "Make a seed list", href: "/seeds#catalogue", service: "seeds", icon: "packet" },
  { label: "Check when to plant", href: "/seeds#seasons", service: "seeds", icon: "calendar" },
  { label: "Describe a crop problem", href: "/consulting#problem", service: "consulting", icon: "sign" },
  { label: "Ask about your crop", href: "/consulting#start", service: "consulting", icon: "plant" },
];

/** Extra link in the season panel. */
export const seasonLinks: Record<string, { href: string; label: string }[]> = {
  Maha: [{ href: "/greenhouses#types", label: "Shelter from rain" }],
  Yala: [{ href: "/irrigation#irrigation-care", label: "Check your irrigation" }],
};

/** How the services fit together, in the order a grower needs them. */
export const journey = [
  {
    title: "Plan",
    text: "Talk through your land, your season and your crop.",
    image: "/images/consulting/stage-1.svg",
    links: [
      { href: "/consulting#stages", label: "Ask at this stage" },
      { href: "/seeds#seasons", label: "When to plant" },
    ],
  },
  {
    title: "Build",
    text: "Put up a greenhouse that suits the plot.",
    image: "/images/greenhouses/tunnel.svg",
    links: [
      { href: "/greenhouses#types", label: "Find your type" },
      { href: "/greenhouses#size", label: "Plan a size" },
    ],
  },
  {
    title: "Water",
    text: "Set up irrigation, or repair what you have.",
    image: "/images/irrigation/drip-still.svg",
    links: [
      { href: "/irrigation#irrigation-types", label: "Choose a type" },
      { href: "/irrigation#irrigation-parts", label: "Find a fault" },
    ],
  },
  {
    title: "Plant",
    text: "Choose vegetable seeds and send us one list.",
    image: "/images/consulting/stage-2.svg",
    links: [
      { href: "/seeds#catalogue", label: "Browse seeds" },
      { href: "/seeds#list", label: "Your seed list" },
    ],
  },
  {
    title: "Grow and harvest",
    text: "Get help while the crop grows, up to picking.",
    image: "/images/consulting/stage-5.svg",
    links: [
      { href: "/consulting#problem", label: "Match the signs" },
      { href: "/consulting#ask", label: "Ask for advice" },
    ],
  },
];

/** Seeds shown on the home page. Slugs come from seeds.ts. */
export const homeSeeds = [
  "tomato",
  "brinjal",
  "green-chilli",
  "bitter-gourd",
  "carrot",
  "kangkung",
];
