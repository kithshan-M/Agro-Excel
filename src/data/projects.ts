// Your completed projects. The page, its menu link and the previews on other
// pages appear once this list has a project.

export const projectKinds = ["Greenhouse", "Irrigation", "Irrigation repair"] as const;
export type ProjectKind = (typeof projectKinds)[number];

/** The 25 districts, as they appear on the map of the projects page. */
export const districts = [
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Colombo",
  "Galle",
  "Gampaha",
  "Hambantota",
  "Jaffna",
  "Kalutara",
  "Kandy",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matale",
  "Matara",
  "Monaragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya",
] as const;
export type District = (typeof districts)[number];

/** Photo in public/images/projects, such as "kandy-tunnel/front.jpg". */
export type ProjectPhoto = {
  file: string;
  /** What the photo shows, for people who cannot see it. */
  alt: string;
  caption?: string;
};

export type Project = {
  /** Web address: /projects/<slug>. Small letters, numbers and dashes. */
  slug: string;
  title: string;
  /** One or more kinds. */
  kinds: ProjectKind[];
  district: District;
  /** Town or village, if the customer agrees. */
  town?: string;
  year?: string;
  size?: string;
  crop?: string;
  /** One or two sentences. */
  summary: string;
  /** What you did, one line per step. */
  work?: string[];
  /** The first photo is the main one. */
  photos: ProjectPhoto[];
  /** Two photos from the same spot, for a before and after slider. */
  compare?: { before: ProjectPhoto; after: ProjectPhoto };
  /** The customer's own words. */
  words?: { text: string; name: string };
};

// Ask the customer before you show their land, name or words.
// Newest first. Remove the // to use this example.
export const projects: Project[] = [
  // {
  //   slug: "tunnel-nuwara-eliya",
  //   title: "Tunnel greenhouse for bell pepper",
  //   kinds: ["Greenhouse", "Irrigation"],
  //   district: "Nuwara Eliya",
  //   town: "",
  //   year: "2026",
  //   size: "30 x 100 ft",
  //   crop: "Bell pepper",
  //   summary: "What the customer needed, and what you built.",
  //   work: ["Levelled the plot", "Put up the frame and covering", "Fitted drip lines"],
  //   photos: [
  //     { file: "tunnel-nuwara-eliya/front.jpg", alt: "Front of the tunnel greenhouse" },
  //     { file: "tunnel-nuwara-eliya/inside.jpg", alt: "Rows of young plants", caption: "Two weeks after planting" },
  //   ],
  //   compare: {
  //     before: { file: "tunnel-nuwara-eliya/before.jpg", alt: "The empty plot" },
  //     after: { file: "tunnel-nuwara-eliya/after.jpg", alt: "The finished greenhouse" },
  //   },
  //   words: { text: "What the customer said.", name: "Customer name" },
  // },
];
