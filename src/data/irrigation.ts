// Content for the irrigation page. Draft copy: remove anything you do not offer.

export const irrigationNeeds = {
  build: "Build a new system",
  maintain: "Repair or service a system",
} as const;

/** The two halves of the service. Pictures: public/images/irrigation/<picture>.svg and -still.svg. */
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
    picture: "build",
    action: "Choose a type",
    href: "#irrigation-types",
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
    picture: "repair",
    action: "Find the fault",
    href: "#irrigation-parts",
  },
];

/**
 * Pictures: public/images/irrigation/<key>.svg and <key>-still.svg. crops and
 * places are what the type often suits, and become the buttons above the types.
 */
export const irrigationTypes: {
  key: string;
  name: string;
  text: string;
  crops: string[];
  places: string[];
  water: string;
  leaves: string;
  watch: string;
}[] = [
  {
    key: "drip",
    name: "Drip",
    text: "Water drops slowly beside each plant, so less is lost between the rows.",
    crops: ["Tomato", "Brinjal", "Chilli", "Cucumber"],
    places: [],
    water: "Beside each plant",
    leaves: "Stay dry",
    watch: "Blocked drippers, so keep the filter clean",
  },
  {
    key: "sprinkler",
    name: "Sprinkler",
    text: "Water falls over the whole bed like rain. Good for crops planted close together.",
    crops: ["Leafy vegetables", "Carrot", "Beetroot"],
    places: [],
    water: "Over the whole bed, like rain",
    leaves: "Get wet",
    watch: "Wind, which carries the water away",
  },
  {
    key: "micro",
    name: "Micro sprinkler",
    text: "Small, low sprinklers wet the soil around plants with a gentle spray.",
    crops: [],
    places: ["Vegetable beds", "Nurseries", "Young trees"],
    water: "In a circle close to the ground",
    leaves: "Lower leaves may get wet",
    watch: "Nozzles that block or get knocked over",
  },
  {
    key: "mist",
    name: "Misting",
    text: "A fine mist keeps seedlings moist and helps cool the air under cover.",
    crops: [],
    places: ["Greenhouses", "Seedling trays"],
    water: "Into the air, as very fine drops",
    leaves: "Get damp",
    watch: "Weak pressure and dirty water, which spoil the mist",
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

/**
 * What a grower notices, and where to look in order. part is a key from
 * systemParts. caution is shown when a check can be dangerous.
 */
export const symptoms: {
  name: string;
  places: { part: string; check: string }[];
  caution?: string;
}[] = [
  {
    name: "No water at all",
    places: [
      { part: "source", check: "Is there water in the well, tank or stream?" },
      { part: "pump", check: "Is the power on, and is the pump running?" },
      { part: "control", check: "Is the valve open and the timer set?" },
      { part: "filter", check: "Is it blocked?" },
    ],
    caution: "Turn the power off before you touch the pump or its wires.",
  },
  {
    name: "Weak flow everywhere",
    places: [
      { part: "filter", check: "Clean it, then run the system again." },
      { part: "source", check: "Is the water level lower than usual?" },
      { part: "pump", check: "Is it louder or weaker than before?" },
      { part: "pipes", check: "Is there a leak before the rows?" },
    ],
    caution: "Turn the power off before you touch the pump or its wires.",
  },
  {
    name: "Weak at the far end",
    places: [
      { part: "control", check: "Are too many rows open at once?" },
      { part: "pipes", check: "Is there a leak or a bend along the line?" },
      { part: "emitters", check: "Open the line end. Does dirt come out?" },
    ],
  },
  {
    name: "Some plants stay dry",
    places: [
      { part: "emitters", check: "Clean one blocked dripper and compare." },
      { part: "pipes", check: "Is the line bent or pressed flat there?" },
      { part: "filter", check: "Is it torn or full of dirt?" },
    ],
  },
  {
    name: "Wet patches on the ground",
    places: [
      { part: "pipes", check: "Look for a crack or a loose joint." },
      { part: "emitters", check: "Is a dripper broken or missing?" },
      { part: "control", check: "Does the valve close fully?" },
    ],
  },
  {
    name: "Pump is noisy or will not start",
    places: [
      { part: "pump", check: "Is the power reaching it?" },
      { part: "source", check: "Is there enough water for it to draw?" },
      { part: "filter", check: "Is it blocked, so the pump works too hard?" },
    ],
    caution: "Turn the power off before you touch the pump or its wires.",
  },
  {
    name: "Dirty water",
    places: [
      { part: "source", check: "Is it muddy after rain, or very low?" },
      { part: "tank", check: "Is there dirt at the bottom?" },
      { part: "filter", check: "Is it missing, torn or full?" },
    ],
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
