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

export type GreenhouseKind =
  | "tunnel"
  | "multi-span"
  | "net-house"
  | "rain-shelter";

export const greenhouseTypes: {
  kind: GreenhouseKind;
  name: string;
  text: string;
  suits: string;
}[] = [
  {
    kind: "tunnel",
    name: "Tunnel greenhouse",
    text: "A single row of curved hoops under a clear cover. A simple shape that fits small plots.",
    suits: "Tomato, cucumber, bell pepper",
  },
  {
    kind: "multi-span",
    name: "Multi-span greenhouse",
    text: "Several bays joined side by side, giving one large growing area under a shared roof.",
    suits: "Larger commercial crops",
  },
  {
    kind: "net-house",
    name: "Net house",
    text: "A frame covered in net instead of clear film. It gives shade and lets air move through.",
    suits: "Leafy vegetables, nurseries",
  },
  {
    kind: "rain-shelter",
    name: "Rain shelter",
    text: "A covered roof with open sides. It keeps rain off the crop while staying airy.",
    suits: "Chilli, tomato, seedlings",
  },
];

export const greenhouseParts = [
  { name: "Frame", text: "The posts, hoops and joints that carry the structure." },
  { name: "Cover", text: "Clear film or net, chosen to suit the crop and the weather." },
  { name: "Insect net and doors", text: "Netted sides and a closed entrance to help keep pests out." },
  { name: "Ventilation", text: "Roof or side openings that let hot air escape." },
  { name: "Watering", text: "Drip lines or misting, matched to your water source." },
  { name: "Growing area", text: "Soil beds, grow bags or benches, set out with walking space." },
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

export const whatToSend = [
  "Where your land is",
  "The length and width of the plot",
  "The crop you want to grow",
  "Where your water comes from",
  "A few photos of the site",
];
