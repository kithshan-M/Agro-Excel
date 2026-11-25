"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectPhoto } from "@/data/projects";
import { projectPhoto } from "@/lib/project-photo";

/** The slider lies over the pictures, so it also works with the arrow keys. */
export function Compare({ before, after }: { before: ProjectPhoto; after: ProjectPhoto }) {
  const [at, setAt] = useState(50);
  const sizes = "(min-width: 1024px) 1000px, 100vw";
  const label = "pointer-events-none absolute top-3 rounded bg-ink/85 px-2.5 py-1 text-sm font-semibold text-white";

  return (
    <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-lg bg-white has-focus-visible:shadow-[0_0_0_4px_var(--color-ink)] sm:aspect-[16/9]">
      <Image {...projectPhoto(after)} alt={`After: ${after.alt}`} fill sizes={sizes} className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - at}% 0 0)` }}>
        <Image {...projectPhoto(before)} alt={`Before: ${before.alt}`} fill sizes={sizes} className="bg-white object-cover" />
      </div>
      <p aria-hidden="true" className={`${label} left-3`}>Before</p>
      <p aria-hidden="true" className={`${label} right-3`}>After</p>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow-[0_0_10px_rgb(19_37_29/0.4)]" style={{ left: `${at}%` }}>
        <span className="absolute top-1/2 left-1/2 flex size-12 -translate-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_2px_12px_rgb(19_37_29/0.35)]">
          <svg viewBox="0 0 24 24" className="size-6 fill-none stroke-current stroke-[2.5] [stroke-linecap:round] [stroke-linejoin:round]">
            <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={at}
        aria-label="Compare before and after"
        aria-valuetext={`${at}% before, ${100 - at}% after`}
        onChange={(event) => setAt(Number(event.target.value))}
        className="absolute inset-0 m-0 size-full cursor-ew-resize touch-pan-y opacity-0"
      />
    </div>
  );
}
