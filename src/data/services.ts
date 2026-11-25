export type Service = {
  slug: "greenhouses" | "seeds" | "consulting";
  title: string;
  summary: string;
  /** Short list shown on the page for this service. */
  points: { title: string; text: string }[];
};

// Draft copy: review every line so it matches what the business really offers.
export const services: Service[] = [
  {
    slug: "greenhouses",
    title: "Greenhouse construction",
    summary: "Greenhouses planned and built around your land and your crop.",
    points: [
      {
        title: "Tell us your plan",
        text: "Message us with your location, plot size and the crop you want to grow.",
      },
      {
        title: "Site check",
        text: "We look at the land, water, sun and access.",
      },
      {
        title: "Design and quotation",
        text: "We suggest a type, size and layout, and give you a price.",
      },
      {
        title: "Construction",
        text: "We put up the structure and covering, ready for planting.",
      },
      {
        title: "Handover",
        text: "We walk you through using and maintaining the greenhouse.",
      },
    ],
  },
  {
    slug: "seeds",
    title: "Vegetable seeds",
    summary: "Seeds for Sri Lankan vegetables, for open fields, greenhouses and home gardens.",
    points: [
      {
        title: "Add seeds to your list",
        text: "Pick the vegetables you want to grow.",
      },
      {
        title: "Send it to us",
        text: "Your list becomes one WhatsApp message.",
      },
      {
        title: "Get a reply",
        text: "We answer with varieties, prices and stock.",
      },
    ],
  },
  {
    slug: "consulting",
    title: "Crop consulting",
    summary: "Practical advice from planting through to harvest.",
    points: [
      {
        title: "Crop planning",
        text: "What to plant, when to plant it and how much.",
      },
      {
        title: "Growing advice",
        text: "Guidance on watering, feeding and crop care.",
      },
      {
        title: "Problem solving",
        text: "Help identifying pests, diseases and poor growth.",
      },
    ],
  },
];

export function getService(slug: Service["slug"]): Service {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}
