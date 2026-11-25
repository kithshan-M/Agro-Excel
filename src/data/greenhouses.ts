// Content for the greenhouse page. Draft copy: remove anything you do not offer.

export const benefits = [
  {
    title: "Shelter from heavy rain",
    text: "A cover keeps rain off leaves and fruit, which helps reduce damage and some diseases.",
  },
  {
    title: "Fewer insects",
    text: "Insect net on the sides and vents helps keep pests away from the crop.",
  },
  {
    title: "More control",
    text: "You decide how much water, feed and shade the crop gets.",
  },
];

export const greenhouseGoals = [
  "Keep rain off",
  "Keep insects out",
  "Most air movement",
  "Small plot",
  "Large area",
];

export const greenhouseTypes: {
  name: string;
  text: string;
  crops: string[];
  /** Which of greenhouseGoals this type suits. */
  goals: string[];
  /** Swap for a photo, e.g. "/images/greenhouses/my-tunnel.jpg". */
  image: string;
  rain: string;
  insects: string;
  air: string;
}[] = [
  {
    name: "Tunnel greenhouse",
    text: "A single row of curved hoops under a clear cover. A simple shape that fits small plots.",
    crops: ["Tomato", "Cucumber", "Bell pepper"],
    goals: ["Keep rain off", "Keep insects out", "Small plot"],
    image: "/images/greenhouses/tunnel.svg",
    rain: "Yes",
    insects: "With netted sides",
    air: "Through netted sides and vents",
  },
  {
    name: "Multi-span greenhouse",
    text: "Several bays joined side by side, giving one large growing area under a shared roof.",
    crops: ["Tomato", "Cucumber", "Bell pepper"],
    goals: ["Keep rain off", "Keep insects out", "Large area"],
    image: "/images/greenhouses/multi-span.svg",
    rain: "Yes",
    insects: "With netted openings",
    air: "Through roof or side vents",
  },
  {
    name: "Net house",
    text: "A frame covered in net instead of clear film. It gives shade and lets air move through.",
    crops: ["Leafy vegetables", "Seedlings"],
    goals: ["Keep insects out", "Most air movement"],
    image: "/images/greenhouses/net-house.svg",
    rain: "No",
    insects: "Yes, with fine net",
    air: "High",
  },
  {
    name: "Rain shelter",
    text: "A covered roof with open sides. It keeps rain off the crop while staying airy.",
    crops: ["Chilli", "Tomato", "Seedlings"],
    goals: ["Keep rain off", "Most air movement"],
    image: "/images/greenhouses/rain-shelter.svg",
    rain: "Yes",
    insects: "No, the sides are open",
    air: "High",
  },
];

// Keep this order: it matches the pointer lines in cutaway.svg.
// badge is where the number sits on the picture: [left %, top %].
// options are wishes a customer can tick for the quotation.
export const greenhouseParts: {
  name: string;
  text: string;
  badge: [number, number];
  options?: string[];
}[] = [
  {
    name: "Frame",
    text: "The posts, hoops and joints that carry the structure.",
    badge: [8.9, 18.1],
  },
  {
    name: "Cover",
    text: "Clear film or net, chosen to suit the crop and the weather.",
    badge: [84.4, 23.6],
    options: ["Clear film", "Net"],
  },
  {
    name: "Insect net and doors",
    text: "Netted sides and a closed entrance to help keep pests out.",
    badge: [92.2, 77.8],
  },
  {
    name: "Ventilation",
    text: "Roof or side openings that let hot air escape.",
    badge: [52.2, 9.7],
    options: ["Roof openings", "Side openings"],
  },
  {
    name: "Watering",
    text: "Drip lines or misting, matched to your water source.",
    badge: [44.4, 93.1],
    options: ["Drip lines", "Misting"],
  },
  {
    name: "Growing area",
    text: "Soil beds, grow bags or benches, set out with walking space.",
    badge: [8.9, 83.3],
    options: ["Soil beds", "Grow bags", "Benches"],
  },
];

/** The size planner, in feet: [length, width] to try, and the example layout. */
export const planner = {
  sizes: [
    [30, 20],
    [60, 30],
    [100, 50],
  ],
  layout: { bed: 3, path: 1.5, end: 2 },
};

export const siteChecks = [
  "Measure the length and width of the land",
  "Note where the water comes from",
  "Look for trees or buildings that shade it",
  "See where rain water collects",
  "Check how a vehicle can reach it",
  "Take a photo from each corner",
];

/**
 * Add photos to public/images/greenhouses, then list them here.
 * The photo section stays hidden while this list is empty.
 */
export const greenhousePhotos: { file: string; alt: string }[] = [
  // { file: "tunnel-1.jpg", alt: "Tunnel greenhouse with tomato plants" },
];

export const greenhouseQuestions = [
  {
    question: "What size greenhouse do I need?",
    answer:
      "It depends on your land, your crop and how much you want to harvest. Send us the size of your plot and we can suggest a layout.",
  },
  {
    question: "How much does it cost?",
    answer:
      "The price depends on the size, type, materials and location. Message us with those details to ask for a quotation.",
  },
  {
    question: "How long does construction take?",
    answer:
      "That depends on the size and the condition of the site. We will talk through the timing with you before work begins.",
  },
  {
    question: "Can you help me choose what to grow?",
    answer:
      "Yes. We also sell vegetable seeds and advise on crops, so you can ask us about both.",
  },
];

export const waterSources = [
  "Well",
  "Piped water",
  "River or stream",
  "Tank or pond",
  "Not sure yet",
];
