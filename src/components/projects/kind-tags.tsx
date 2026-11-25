"use client";

import { useT } from "@/i18n/context";
import type { ProjectKind } from "@/data/projects";

export function KindTags({ kinds }: { kinds: ProjectKind[] }) {
  const t = useT();
  return (
    <ul className="flex flex-wrap gap-2">
      {kinds.map((kind) => (
        <li
          key={kind}
          className={`rounded px-2.5 py-1 text-sm font-semibold ${kind === "Greenhouse" ? "bg-leaf text-white" : kind === "Irrigation" ? "bg-water text-white" : "bg-sun text-ink"}`}
        >
          {t(kind)}
        </li>
      ))}
    </ul>
  );
}
