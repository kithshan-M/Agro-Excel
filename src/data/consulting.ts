// Content for the crop consulting page. Draft copy: remove anything you do not offer.

/** Pictures: public/images/consulting/stage-1.svg to stage-5.svg, in this order. */
export const cropStages = [
  {
    name: "Plan",
    title: "Plan the crop",
    text: "Good choices before planting save trouble later.",
    topics: [
      "Which crop suits your land and season",
      "How much to plant",
      "Seed variety and spacing",
    ],
  },
  {
    name: "Sow",
    title: "Sow and raise seedlings",
    text: "Strong seedlings give the crop a good start.",
    topics: [
      "Preparing the soil or seed trays",
      "Looking after the nursery",
      "When to move seedlings to the field",
    ],
  },
  {
    name: "Grow",
    title: "Keep it growing",
    text: "Regular care keeps the plants healthy.",
    topics: ["Watering", "Feeding", "Weeds, support and pruning"],
  },
  {
    name: "Flower and fruit",
    title: "Flower and fruit",
    text: "This is when the harvest is decided.",
    topics: [
      "Flowers that drop or do not set fruit",
      "Watching for pests and diseases",
      "Water and feed while fruit is forming",
    ],
  },
  {
    name: "Harvest",
    title: "Harvest",
    text: "Pick at the right time, then look ahead.",
    topics: [
      "When to pick",
      "Handling after picking",
      "What to plant next",
    ],
  },
];

/**
 * Plant parts and the signs a grower might see. These only describe a problem:
 * the page never names a disease or a treatment.
 * key is the spotlight picture plant-<key>.svg. label is where the button sits
 * ([left %, top %]), matching the pointer lines in scripts/draw-consulting.mjs.
 */
export const plantParts: {
  key: string;
  name: string;
  label: [number, number];
  /** picture is public/images/consulting/sign-<picture>.svg. Leave it out for words only. */
  signs: { name: string; picture?: string }[];
}[] = [
  {
    key: "leaves",
    name: "Leaves",
    label: [13.3, 22.9],
    signs: [
      { name: "Yellowing", picture: "leaves-yellowing" },
      { name: "Spots", picture: "leaves-spots" },
      { name: "Curling", picture: "leaves-curling" },
      { name: "Holes", picture: "leaves-holes" },
      { name: "White powder", picture: "leaves-white-powder" },
      { name: "Dry edges", picture: "leaves-dry-edges" },
    ],
  },
  {
    key: "flowers",
    name: "Flowers",
    label: [81.9, 14.1],
    signs: [
      { name: "Dropping off", picture: "flowers-dropping-off" },
      { name: "Very few flowers", picture: "flowers-very-few-flowers" },
      { name: "Damaged", picture: "flowers-damaged" },
    ],
  },
  {
    key: "fruit",
    name: "Fruit",
    label: [86.9, 44.1],
    signs: [
      { name: "Spots", picture: "fruit-spots" },
      { name: "Rotting", picture: "fruit-rotting" },
      { name: "Cracks", picture: "fruit-cracks" },
      { name: "Holes", picture: "fruit-holes" },
      { name: "Small or misshapen", picture: "fruit-small-or-misshapen" },
    ],
  },
  {
    key: "stem",
    name: "Stem",
    label: [12.8, 58.8],
    signs: [
      { name: "Soft or rotting", picture: "stem-soft-or-rotting" },
      { name: "Cracks", picture: "stem-cracks" },
      { name: "Dark marks", picture: "stem-dark-marks" },
      { name: "Insects on it", picture: "stem-insects-on-it" },
    ],
  },
  {
    key: "roots",
    name: "Roots",
    label: [84.7, 88.2],
    signs: [
      { name: "Swollen or knotted", picture: "roots-swollen-or-knotted" },
      { name: "Rotting", picture: "roots-rotting" },
      { name: "Few or weak", picture: "roots-few-or-weak" },
    ],
  },
  {
    key: "whole",
    name: "Whole plant",
    label: [16.4, 87.6],
    signs: [
      { name: "Wilting", picture: "whole-wilting" },
      { name: "Slow growth", picture: "whole-slow-growth" },
      { name: "Dying suddenly", picture: "whole-dying-suddenly" },
    ],
  },
];

/** Pictures: public/images/consulting/photo-<key>.svg. */
export const photoGuide = [
  { key: "whole", title: "The whole plant", text: "Stand back so it all fits in the picture." },
  { key: "close", title: "A close-up", text: "Hold the phone steady and tap to focus." },
  { key: "under", title: "Under the leaf", text: "Turn a leaf over. Insects often hide there." },
  { key: "field", title: "The field", text: "Show whether other plants look the same." },
];

export const helpTypes = [
  "Planning a crop",
  "Growing advice",
  "A problem with my crop",
];

/** One per help type, in the same order. stage opens that crop stage (0 is the first). */
export const helpCards: {
  title: string;
  text: string;
  action: string;
  href: string;
  image: string;
  stage?: number;
}[] = [
  {
    title: "Plan a crop",
    text: "Choose what, when and how much to plant.",
    action: "Plan it",
    href: "#stages",
    image: "/images/consulting/stage-1.svg",
    stage: 0,
  },
  {
    title: "Grow it well",
    text: "Watering, feeding and care at each stage.",
    action: "See the stages",
    href: "#stages",
    image: "/images/consulting/stage-3.svg",
    stage: 2,
  },
  {
    title: "Solve a problem",
    text: "Something looks wrong with the plants.",
    action: "Describe it",
    href: "#problem",
    image: "/images/consulting/sign-leaves-spots.svg",
  },
];

/** Safe steps for anyone with a problem, whatever it turns out to be. */
export const waitSteps = [
  "Take the photos today, before the plants change",
  "Note when you first saw it",
  "Note the watering, feeding and spraying you did before it",
  "Keep tools and hands clean between sick and healthy plants",
  "Ask us before you spray",
];

export const problemSpread = ["One or two plants", "A patch", "Most of the crop"];

export const problemAge = ["Today", "A few days", "A week or more", "Not sure"];

export const consultingQuestions = [
  {
    question: "Can you tell what is wrong from a photo?",
    answer:
      "Clear photos help us narrow it down. We may ask you for more pictures or details before we advise you.",
  },
  {
    question: "What should I do while I wait for a reply?",
    answer:
      "Take photos today, before the plant changes. If you can, note when you first saw the problem, and the watering, feeding or spraying you did before it.",
  },
  {
    question: "Do you help with greenhouse crops?",
    answer:
      "Yes. We also build greenhouses, so you can ask about the crop and the structure together.",
  },
  {
    question: "How much does advice cost?",
    answer:
      "It depends on the help you need. Send us your question and we will tell you before any work starts.",
  },
];
