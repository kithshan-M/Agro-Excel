import type { Service } from "./services";

/** Labels on the farm scene. at is [left %, top %] on public/images/home/farm.svg. */
export const scenePins: { slug: Service["slug"]; label: string; at: [number, number] }[] = [
  { slug: "greenhouses", label: "Greenhouses", at: [27, 55] },
  { slug: "consulting", label: "Crop consulting", at: [50.4, 61] },
  { slug: "seeds", label: "Vegetable seeds", at: [85, 36] },
];

/** How the services fit together, in the order a grower needs them. */
export const journey = [
  {
    title: "Plan",
    text: "Talk through your land, your season and your crop.",
    image: "/images/consulting/stage-1.svg",
    href: "/consulting#stages",
    link: "Crop consulting",
  },
  {
    title: "Build",
    text: "Put up a greenhouse that suits the plot.",
    image: "/images/greenhouses/tunnel.svg",
    href: "/greenhouses#types",
    link: "Greenhouse types",
  },
  {
    title: "Plant",
    text: "Choose vegetable seeds and send us one list.",
    image: "/images/consulting/stage-2.svg",
    href: "/seeds#catalogue",
    link: "Browse seeds",
  },
  {
    title: "Grow and harvest",
    text: "Get help while the crop grows, up to picking.",
    image: "/images/consulting/stage-5.svg",
    href: "/consulting#problem",
    link: "Describe a problem",
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
