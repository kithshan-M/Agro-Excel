"use client";

import { useSyncExternalStore } from "react";
import { seasons } from "@/data/seeds";

const never = () => () => {};

/** Names the season in the visitor's month. Empty until the page is in the browser. */
export function SeasonNow() {
  const month = useSyncExternalStore(
    never,
    () => new Date().getMonth() + 1,
    () => 0,
  );
  const season = seasons.find((item) => item.months.includes(month));
  return (
    <p className="mt-4 min-h-7 font-semibold">
      {season && (
        <>
          <span
            aria-hidden="true"
            className={`mr-2.5 inline-block size-3 rounded-full ${season === seasons[0] ? "bg-leaf" : "bg-sun"}`}
          />
          {season.name} season now: {season.span}
        </>
      )}
    </p>
  );
}
