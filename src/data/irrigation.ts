// Content for the irrigation page. Draft copy: remove anything you do not offer.

export const irrigationNeeds = {
  build: "Build a new system",
  maintain: "Repair or service a system",
} as const;

/** The two halves of the service. */
export const irrigationPaths = [
  {
    need: irrigationNeeds.build,
    title: "Build a new system",
    text: "For land that has no system yet, or needs a better one.",
    points: [
      "Working out how much water your crop needs",
      "Choosing the pump, tank, filter and pipes",
      "Laying the lines and fitting the drippers or sprinklers",
      "Testing it and showing you how to run it",
    ],
    action: "Plan a new system",
  },
  {
    need: irrigationNeeds.maintain,
    title: "Maintain a system you have",
    text: "Whoever built it, we can look after it.",
    points: [
      "Finding and fixing leaks",
      "Cleaning filters and clearing blocked drippers",
      "Checking the pump, pressure and valves",
      "Replacing worn or broken parts",
    ],
    action: "Get it serviced",
  },
];

/** Pictures: public/images/irrigation/<key>.svg and <key>-still.svg. */
export const irrigationTypes = [
  {
    key: "drip",
    name: "Drip",
    text: "Water drops slowly beside each plant, so less is lost between the rows.",
    suits: "Tomato, brinjal, chilli, cucumber",
  },
  {
    key: "sprinkler",
    name: "Sprinkler",
    text: "Water falls over the whole bed like rain. Good for crops planted close together.",
    suits: "Leafy vegetables, carrot, beetroot",
  },
  {
    key: "micro",
    name: "Micro sprinkler",
    text: "Small, low sprinklers wet the soil around plants with a gentle spray.",
    suits: "Vegetable beds, nurseries, young trees",
  },
  {
    key: "mist",
    name: "Misting",
    text: "A fine mist keeps seedlings moist and helps cool the air under cover.",
    suits: "Greenhouses, seedling trays",
  },
];

/**
 * Parts of a system, in the order the water meets them. key is the spotlight
 * picture system-<key>.svg. badge is where the number sits: [left %, top %].
 */
export const systemParts = [
  {
    key: "source",
    name: "Water source",
    badge: [12.4, 39],
    text: "A well, piped water, stream or pond. It decides how much you can water at once.",
    signs: ["Running low", "Dirty water", "Salty water"],
  },
  {
    key: "pump",
    name: "Pump",
    badge: [28, 51],
    text: "Lifts the water and gives it pressure.",
    signs: ["Will not start", "Noisy", "Weak flow", "Leaking"],
  },
  {
    key: "tank",
    name: "Tank",
    badge: [44.7, 8.5],
    text: "Stores water up high, so it can flow when you need it.",
    signs: ["Leaking", "Does not fill", "Dirty inside"],
  },
  {
    key: "filter",
    name: "Filter",
    badge: [57.4, 46],
    text: "Catches sand and dirt before they block the drippers.",
    signs: ["Blocked", "Leaking", "Missing"],
  },
  {
    key: "control",
    name: "Valves and timer",
    badge: [70.5, 47],
    text: "Open and close the water, by hand or at set times.",
    signs: ["Valve stuck", "Timer not working", "Leaking"],
  },
  {
    key: "pipes",
    name: "Pipes",
    badge: [79, 66],
    text: "Carry the water to every row.",
    signs: ["Leaking", "Burst", "Weak at the far end"],
  },
  {
    key: "emitters",
    name: "Drippers and sprinklers",
    badge: [24, 91.5],
    text: "Give the water to the plants.",
    signs: ["Blocked", "Uneven watering", "Broken", "Drips when off"],
  },
];

/** Simple care a grower can do between services. */
export const careSchedule = [
  {
    when: "Every week",
    tasks: ["Look for leaks and wet patches", "Check that every row gets water", "Listen to the pump"],
  },
  {
    when: "Every month",
    tasks: ["Clean the filter", "Open the line ends to flush out dirt", "Clear or replace blocked drippers"],
  },
  {
    when: "Before each season",
    tasks: ["Run the whole system and walk the rows", "Check the pump, valves and timer", "Replace worn pipes and fittings"],
  },
];

export const powerSources = ["Electricity", "Solar", "Fuel pump", "No power", "Not sure yet"];

export const irrigationQuestions = [
  {
    question: "Can you maintain a system that someone else built?",
    answer:
      "Yes. Tell us what you have and send a few photos of the pump, filter and lines, so we know what to expect.",
  },
  {
    question: "Which type is right for my crop?",
    answer:
      "It depends on the crop, the spacing, your water and your soil. Tell us what you grow and we can suggest one.",
  },
  {
    question: "Can you add irrigation to a greenhouse?",
    answer:
      "Yes. We also build greenhouses, so we can plan the structure and the water together or add to one you have.",
  },
  {
    question: "How much does it cost?",
    answer:
      "It depends on the area, the type and the parts. Send us the details and we will tell you the price before any work starts.",
  },
];
