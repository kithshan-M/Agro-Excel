// Sample data for the seeds page: keep only what you sell.
// Areas for okra, gourds, pumpkin, cucumber, brinjal, beans, carrot, beetroot,
// radish, cabbage and leeks follow FAO and Department of Agriculture groupings.
// Check the rest, and the local names, before publishing.

export const seedKinds = [
  { name: "Fruiting", band: "bg-[#b23320]", tile: "bg-[#fbe9e2]" },
  { name: "Gourds", band: "bg-[#2b6f40]", tile: "bg-[#e6f1df]" },
  { name: "Beans", band: "bg-[#4b7720]", tile: "bg-[#eef3d8]" },
  { name: "Roots and stems", band: "bg-[#9c4d0e]", tile: "bg-[#fbeeda]" },
  { name: "Leafy", band: "bg-[#14604a]", tile: "bg-[#e0f1ea]" },
] as const;

export type SeedKind = (typeof seedKinds)[number]["name"];
export type SeedArea = "Up-country" | "Low-country" | "Most areas";

/** Choices for "Where you grow". */
export const seedPlaces = ["Up-country", "Low-country", "Greenhouse"] as const;
export type SeedPlace = (typeof seedPlaces)[number];

const nursery = "In a nursery, then plant out";
const direct = "Sow where it will grow";

export type Seed = {
  /** Also the picture name: public/images/seeds/<slug>.svg */
  slug: string;
  name: string;
  /** Common Sri Lankan name, when it differs. */
  localName?: string;
  kind: SeedKind;
  area: SeedArea;
  /** Often grown under cover. */
  greenhouse?: boolean;
  /** How to start it. */
  start: string;
  /** Climbs or needs holding up. */
  support?: boolean;
  /** Fill these in to show them, e.g. "2 ft between plants" and "About 60 days". */
  spacing?: string;
  harvest?: string;
  /** Swap the drawing for a photo, e.g. "/images/seeds/my-tomato.jpg". */
  photo?: string;
};

export const seeds: Seed[] = [
  { slug: "tomato", name: "Tomato", localName: "Thakkali", kind: "Fruiting", area: "Most areas", greenhouse: true, start: nursery, support: true },
  { slug: "brinjal", name: "Brinjal", localName: "Wambatu", kind: "Fruiting", area: "Low-country", start: nursery },
  { slug: "green-chilli", name: "Green chilli", localName: "Amu miris", kind: "Fruiting", area: "Low-country", start: nursery },
  { slug: "capsicum", name: "Capsicum", localName: "Malu miris", kind: "Fruiting", area: "Most areas", greenhouse: true, start: nursery },
  { slug: "bell-pepper", name: "Bell pepper", kind: "Fruiting", area: "Most areas", greenhouse: true, start: nursery },
  { slug: "okra", name: "Okra", localName: "Bandakka", kind: "Fruiting", area: "Low-country", start: direct },
  { slug: "bitter-gourd", name: "Bitter gourd", localName: "Karavila", kind: "Gourds", area: "Low-country", start: direct, support: true },
  { slug: "snake-gourd", name: "Snake gourd", localName: "Pathola", kind: "Gourds", area: "Low-country", start: direct, support: true },
  { slug: "ridge-gourd", name: "Ridge gourd", localName: "Wetakolu", kind: "Gourds", area: "Low-country", start: direct, support: true },
  { slug: "pumpkin", name: "Pumpkin", localName: "Wattakka", kind: "Gourds", area: "Low-country", start: direct },
  { slug: "cucumber", name: "Cucumber", localName: "Pipinna", kind: "Gourds", area: "Low-country", greenhouse: true, start: direct, support: true },
  { slug: "green-bean", name: "Green bean", localName: "Bonchi", kind: "Beans", area: "Up-country", start: direct, support: true },
  { slug: "long-bean", name: "Long bean", localName: "Mae karal", kind: "Beans", area: "Low-country", start: direct, support: true },
  { slug: "winged-bean", name: "Winged bean", localName: "Dambala", kind: "Beans", area: "Low-country", start: direct, support: true },
  { slug: "carrot", name: "Carrot", kind: "Roots and stems", area: "Up-country", start: direct },
  { slug: "beetroot", name: "Beetroot", kind: "Roots and stems", area: "Up-country", start: direct },
  { slug: "radish", name: "Radish", localName: "Rabu", kind: "Roots and stems", area: "Up-country", start: direct },
  { slug: "knol-khol", name: "Knol khol", localName: "Nokol", kind: "Roots and stems", area: "Up-country", start: nursery },
  { slug: "leek", name: "Leeks", kind: "Roots and stems", area: "Up-country", start: nursery },
  { slug: "cabbage", name: "Cabbage", localName: "Gova", kind: "Leafy", area: "Up-country", start: nursery },
  { slug: "lettuce", name: "Lettuce", localName: "Salada", kind: "Leafy", area: "Up-country", greenhouse: true, start: nursery },
  { slug: "kangkung", name: "Water spinach", localName: "Kangkung", kind: "Leafy", area: "Low-country", start: direct },
  { slug: "thampala", name: "Amaranth", localName: "Thampala", kind: "Leafy", area: "Low-country", start: direct },
  { slug: "nivithi", name: "Ceylon spinach", localName: "Nivithi", kind: "Leafy", area: "Low-country", start: direct, support: true },
];

export function seedImage(seed: Seed) {
  return seed.photo ?? `/images/seeds/${seed.slug}.svg`;
}

/** Sri Lanka's two growing seasons, as month numbers (1 is January). */
export const seasons = [
  {
    name: "Maha",
    months: [9, 10, 11, 12, 1, 2],
    span: "September to February",
    text: "The wetter season. Plan drainage and shelter so heavy rain does not spoil the crop.",
    ready: ["Order your seeds", "Start the nursery", "Clear the drains and raise the beds"],
  },
  {
    name: "Yala",
    months: [3, 4, 5, 6, 7, 8],
    span: "March to August",
    text: "The drier season. Plan your water before you sow.",
    ready: ["Order your seeds", "Start the nursery", "Check the pump, filter and pipes"],
  },
];

export const growingPlaces = ["Open field", "Greenhouse", "Home garden"];
