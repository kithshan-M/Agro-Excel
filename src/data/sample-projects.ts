import type { Project } from "./projects";

// Made-up entries, so the projects page can be seen before there are real ones.
// Only `npm run dev` shows them, and only while src/data/projects.ts is empty.
// They never reach the live site.

const steps = ["First thing you did", "Second thing you did", "Third thing you did"];

export const sampleProjects: Project[] = [
  {
    slug: "sample-greenhouse",
    title: "Sample tunnel greenhouse",
    kinds: ["Greenhouse", "Irrigation"],
    district: "Nuwara Eliya",
    town: "Town name",
    year: "Year",
    size: "Length x width",
    crop: "Crop name",
    summary: "One or two sentences about what the customer needed and what you built for them.",
    work: steps,
    photos: [
      { file: "/images/greenhouses/tunnel.svg", alt: "Drawing of a tunnel greenhouse", caption: "A caption for this photo" },
      { file: "/images/greenhouses/multi-span.svg", alt: "Drawing of a multi-span greenhouse" },
      { file: "/images/greenhouses/net-house.svg", alt: "Drawing of a net house", caption: "Captions are optional" },
      { file: "/images/irrigation/drip-still.svg", alt: "Drawing of drip lines" },
      { file: "/images/greenhouses/rain-shelter.svg", alt: "Drawing of a rain shelter" },
    ],
    compare: {
      before: { file: "/images/greenhouses/multi-span.svg", alt: "Drawing used as the before photo" },
      after: { file: "/images/greenhouses/tunnel.svg", alt: "Drawing used as the after photo" },
    },
    words: { text: "The customer's own words go here, with their permission.", name: "Customer name" },
  },
  {
    slug: "sample-repair",
    title: "Sample irrigation repair",
    kinds: ["Irrigation repair"],
    district: "Anuradhapura",
    year: "Year",
    size: "Area covered",
    crop: "Crop name",
    summary: "One or two sentences about what was wrong and how you put it right.",
    work: steps,
    photos: [
      { file: "/images/irrigation/sprinkler-still.svg", alt: "Drawing of a sprinkler" },
      { file: "/images/irrigation/micro-still.svg", alt: "Drawing of a micro sprinkler" },
    ],
  },
  {
    slug: "sample-drip",
    title: "Sample drip system with a longer project name",
    kinds: ["Irrigation"],
    district: "Nuwara Eliya",
    town: "Town name",
    size: "Area covered",
    summary: "A project with only one photo and no steps.",
    photos: [{ file: "/images/irrigation/drip-still.svg", alt: "Drawing of drip lines" }],
  },
  {
    slug: "sample-net-house",
    title: "Sample net house",
    kinds: ["Greenhouse"],
    district: "Badulla",
    town: "Town name",
    year: "Year",
    crop: "Crop name",
    summary: "One or two sentences about the project.",
    work: steps,
    photos: [
      { file: "/images/greenhouses/net-house.svg", alt: "Drawing of a net house" },
      { file: "/images/greenhouses/multi-span.svg", alt: "Drawing of a multi-span greenhouse" },
      { file: "/images/greenhouses/tunnel.svg", alt: "Drawing of a tunnel greenhouse" },
    ],
  },
];
