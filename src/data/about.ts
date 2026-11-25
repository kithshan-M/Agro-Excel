// Content for the About page. Draft copy: check that every line is true for you.

export const aboutIntro = {
  title: "We help you grow vegetables, from the greenhouse to the harvest.",
  text: "Agro Excel builds greenhouses, sells vegetable seeds and advises growers on their crops.",
};

/** Pictures: public/images/about/<key>.svg. Links lead to the most useful next steps. */
export const growers = [
  {
    key: "starting",
    name: "Just starting",
    text: "You have land but have not planted yet.",
    links: [
      { label: "Talk through your plan", href: "/consulting#ask" },
      { label: "See greenhouse types", href: "/greenhouses#types" },
      { label: "Check the growing seasons", href: "/seeds#seasons" },
    ],
  },
  {
    key: "home-garden",
    name: "Home gardener",
    text: "You grow vegetables for your own kitchen.",
    links: [
      { label: "Choose your seeds", href: "/seeds#catalogue" },
      { label: "Check the growing seasons", href: "/seeds#seasons" },
      { label: "Describe a plant problem", href: "/consulting#problem" },
    ],
  },
  {
    key: "open-field",
    name: "Field farmer",
    text: "You grow vegetables on open land.",
    links: [
      { label: "Make a seed list", href: "/seeds#catalogue" },
      { label: "Describe a crop problem", href: "/consulting#problem" },
      { label: "Compare covers for your crop", href: "/greenhouses#types" },
    ],
  },
  {
    key: "greenhouse",
    name: "Greenhouse grower",
    text: "You grow under cover, or want to.",
    links: [
      { label: "Get a quotation", href: "/greenhouses#quotation" },
      { label: "Find seeds for a greenhouse", href: "/seeds#catalogue" },
      { label: "Get advice on your crop", href: "/consulting#ask" },
    ],
  },
];

/** Why it helps to have all three services in one place. */
export const reasons = [
  {
    title: "The greenhouse fits the crop",
    text: "We ask what you want to grow before we suggest a structure.",
    image: "/images/greenhouses/tunnel.svg",
    href: "/greenhouses",
    link: "Greenhouses",
  },
  {
    title: "The seed fits the place",
    text: "We ask where you grow before we suggest a variety.",
    image: "/images/seeds/hero-still.svg",
    href: "/seeds",
    link: "Vegetable seeds",
  },
  {
    title: "The advice follows the crop",
    text: "You can keep asking, from planning to picking.",
    image: "/images/consulting/stage-4.svg",
    href: "/consulting",
    link: "Crop consulting",
  },
];

export const principles = [
  { title: "We look before we advise", text: "We start with your photos, your land and your questions." },
  { title: "You know the price first", text: "We tell you the cost before any work starts." },
  { title: "Plain words", text: "We explain what to do and why, without jargon." },
  { title: "Easy to reach", text: "Send one WhatsApp message and we take it from there." },
];

// ---------- Fill these in to show them. Each stays hidden while it is empty. ----------

/** Your story, one entry per paragraph. */
export const story: string[] = [
  // "Agro Excel began in ...",
];

/** Short true facts, such as { value: "2015", label: "Started" }. */
export const facts: { value: string; label: string }[] = [];

/** Photos go in public/images/about. Leave photo out to show initials. */
export const team: { name: string; role: string; photo?: string }[] = [
  // { name: "Full name", role: "Founder", photo: "founder.jpg" },
];

/** Photos of your work, in public/images/about. */
export const workPhotos: { file: string; alt: string }[] = [
  // { file: "site-1.jpg", alt: "Team putting up a greenhouse frame" },
];
