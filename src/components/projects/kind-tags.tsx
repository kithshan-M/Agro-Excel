"use client";

import { useT } from "@/i18n/context";
import type { ProjectKind } from "@/data/projects";

/** One colour per kind of work, shared by the tags and the filter buttons. */
export const kindColours: Record<ProjectKind, { tag: string; dot: string }> = {
  Greenhouse: { tag: "bg-leaf text-white", dot: "bg-leaf" },
  Irrigation: { tag: "bg-water text-white", dot: "bg-water" },
  "Irrigation repair": { tag: "bg-sun text-ink", dot: "bg-sun" },
};

export function KindTags({ kinds, small = false }: { kinds: ProjectKind[]; small?: boolean }) {
  const t = useT();
  return (
    <ul className={`flex flex-wrap ${small ? "gap-1.5" : "gap-2"}`}>
      {kinds.map((kind) => (
        <li
          key={kind}
          className={`rounded font-semibold ${small ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm"} ${kindColours[kind].tag}`}
        >
          {t(kind)}
        </li>
      ))}
    </ul>
  );
}
