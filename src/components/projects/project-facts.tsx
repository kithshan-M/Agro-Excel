import type { Project } from "@/data/projects";
import type { T } from "@/i18n/context";

const icons = {
  Place: "M10 18s6-5.6 6-10a6 6 0 0 0-12 0c0 4.4 6 10 6 10Zm0-7.6a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z",
  Size: "M3 8V3h5M17 12v5h-5M3 3l5.5 5.5M17 17l-5.5-5.5",
  Crop: "M10 18V9m0 3C5.500 12 3.500 9.500 3.500 6 8 6 10 8.500 10 12Zm0-2c0-4 2.300-6.500 6.500-6.500C16.500 7.500 14.500 10 10 10Z",
  Finished: "M3 5.500h14V17H3V5.500Zm0 4h14M7 3v4m6-4v4",
};

export type FactName = keyof typeof icons;

export const projectFacts = (project: Project, t: T) =>
  (
    [
      ["Place", project.town ? `${t(project.town)}, ${t(project.district)}` : t(project.district)],
      ["Size", project.size],
      ["Crop", project.crop],
      ["Finished", project.year],
    ] as [FactName, string | undefined][]
  ).filter((fact): fact is [FactName, string] => Boolean(fact[1]));

export function FactIcon({ name }: { name: FactName }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="size-5 shrink-0 fill-none stroke-leaf stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]"
    >
      <path d={icons[name]} />
    </svg>
  );
}
