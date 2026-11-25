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
export const plantParts = [
  {
    key: "leaves",
    name: "Leaves",
    label: [13.3, 22.9],
    signs: ["Yellowing", "Spots", "Curling", "Holes", "White powder", "Dry edges"],
  },
  {
    key: "flowers",
    name: "Flowers",
    label: [81.9, 14.1],
    signs: ["Dropping off", "Very few flowers", "Damaged"],
  },
  {
    key: "fruit",
    name: "Fruit",
    label: [86.9, 44.1],
    signs: ["Spots", "Rotting", "Cracks", "Holes", "Small or misshapen"],
  },
  {
    key: "stem",
    name: "Stem",
    label: [12.8, 58.8],
    signs: ["Soft or rotting", "Cracks", "Dark marks", "Insects on it"],
  },
  {
    key: "roots",
    name: "Roots",
    label: [84.7, 88.2],
    signs: ["Swollen or knotted", "Rotting", "Few or weak"],
  },
  {
    key: "whole",
    name: "Whole plant",
    label: [16.4, 87.6],
    signs: ["Wilting", "Slow growth", "Dying suddenly"],
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
