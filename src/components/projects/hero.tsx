import { projects } from "@/lib/projects";
import { HeroPanel } from "./hero-panel";

export function ProjectsHero() {
  const counts: Record<string, number> = {};
  for (const { district } of projects) counts[district] = (counts[district] ?? 0) + 1;

  return <HeroPanel counts={counts} />;
}
