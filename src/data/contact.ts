import { consultingQuestions } from "./consulting";
import { greenhouseQuestions } from "./greenhouses";
import { irrigationQuestions } from "./irrigation";

/** What a visitor may want to ask about. form is the detailed form on that page. */
export const contactTopics = [
  {
    key: "greenhouse",
    name: "A greenhouse",
    about: "a greenhouse",
    image: "/images/greenhouses/tunnel.svg",
    form: { href: "/greenhouses#quotation", label: "Greenhouse quotation form" },
  },
  {
    key: "irrigation",
    name: "Irrigation",
    about: "irrigation",
    image: "/images/irrigation/drip-still.svg",
    form: { href: "/irrigation#irrigation-ask", label: "Irrigation form" },
  },
  {
    key: "seeds",
    name: "Seeds",
    about: "vegetable seeds",
    image: "/images/seeds/hero-still.svg",
    form: { href: "/seeds#catalogue", label: "Seed list" },
  },
  {
    key: "crop",
    name: "A crop",
    about: "a crop",
    image: "/images/consulting/stage-4.svg",
    form: { href: "/consulting#ask", label: "Crop advice form" },
  },
  {
    key: "other",
    name: "Something else",
    about: "your services",
    image: "/images/contact/hero-still.svg",
    form: null,
  },
];

export const replyBy = ["WhatsApp", "Phone call", "Email"];

/** Details that help us answer the first message. */
const pick = (list: { question: string; answer: string }[], question: string) =>
  list.filter((item) => item.question === question);

/** Answers come from the service pages, so they only need changing there. */
export const contactQuestions = [
  ...pick(greenhouseQuestions, "What size greenhouse do I need?"),
  ...pick(irrigationQuestions, "Can you maintain a system that someone else built?"),
  ...pick(consultingQuestions, "Can you tell what is wrong from a photo?"),
  ...pick(consultingQuestions, "How much does advice cost?"),
];
