"use client";

import { useT } from "@/i18n/context";
import { districts, type District } from "@/data/projects";
import { noFilter, setProjectFilter, useProjectFilter, type ProjectFilter } from "@/lib/project-filter";
import { showProjectList } from "./project-list";

/** Column, row and width of each tile. A rough picture of the island, not a true map. */
const places: Record<District, [number, number, number?]> = {
  Jaffna: [2, 1],
  Kilinochchi: [2, 2],
  Mullaitivu: [3, 2],
  Mannar: [1, 3],
  Vavuniya: [2, 3],
  Trincomalee: [3, 3],
  Puttalam: [1, 4],
  Anuradhapura: [2, 4],
  Polonnaruwa: [3, 4],
  Batticaloa: [4, 4],
  Kurunegala: [1, 5],
  Matale: [2, 5],
  Kandy: [3, 5],
  Ampara: [4, 5],
  Gampaha: [1, 6],
  Kegalle: [2, 6],
  "Nuwara Eliya": [3, 6],
  Badulla: [4, 6],
  Colombo: [1, 7],
  Ratnapura: [2, 7, 2],
  Monaragala: [4, 7],
  Kalutara: [1, 8],
  Galle: [2, 8],
  Matara: [3, 8],
  Hambantota: [4, 8],
};

type Counts = Record<string, number>;

export function FilteredDistrictMap({ counts }: { counts: Counts }) {
  return <DistrictMap counts={counts} filter={useProjectFilter()} />;
}

export function DistrictMap({
  counts,
  filter = noFilter,
}: {
  counts: Counts;
  filter?: ProjectFilter;
}) {
  const t = useT();
  const worked = Object.keys(counts).length;
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return (
    <div role="group" aria-labelledby="district-map">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="district-map" className="text-lg font-semibold">
          {t("Find work near you")}
        </h2>
        <p className="text-sm text-white/80">
          {t("Projects: {total}. Districts: {districts}.", { total, districts: worked })}
        </p>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1">
        {districts.map((name) => {
          const [column, row, width = 1] = places[name];
          const count = counts[name] ?? 0;
          const chosen = filter.district === name;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={chosen}
              aria-label={t(count === 1 ? "{name}, {count} project" : "{name}, {count} projects", { name: t(name), count })}
              // Keyboard users can reach every district in the list further down.
              tabIndex={count > 0 || chosen ? 0 : -1}
              onClick={() => {
                setProjectFilter({ ...filter, district: chosen ? "" : name });
                if (!chosen) showProjectList();
              }}
              style={{ gridColumn: `${column} / span ${width}`, gridRow: row }}
              className={`flex h-9 cursor-pointer items-center justify-center gap-1 rounded text-[0.8125rem] whitespace-nowrap transition-colors ${
                chosen
                  ? "bg-white font-bold text-ink"
                  : count > 0
                    ? "bg-sun font-bold text-ink hover:bg-white"
                    : "bg-white/10 text-white/85 hover:bg-white/20"
              }`}
            >
              {t(name)}
              {count > 1 && (
                <span
                  aria-hidden="true"
                  className="hidden min-w-4.5 rounded-full bg-ink px-1 text-xs leading-4.5 text-white lg:block"
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
