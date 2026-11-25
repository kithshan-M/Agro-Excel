export type SeedGroup = {
  name: string;
  crops: string[];
};

// Sample data: replace with the seeds you actually sell.
export const seedGroups: SeedGroup[] = [
  { name: "Fruiting vegetables", crops: ["Tomato", "Bell pepper", "Chilli", "Brinjal"] },
  { name: "Gourds and cucumbers", crops: ["Cucumber", "Bitter gourd", "Pumpkin"] },
  { name: "Leafy vegetables", crops: ["Lettuce", "Cabbage", "Spinach"] },
  { name: "Roots and beans", crops: ["Carrot", "Radish", "Bean"] },
];
