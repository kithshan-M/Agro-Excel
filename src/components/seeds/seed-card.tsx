"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { seedImage, seedKinds, type Seed } from "@/data/seeds";
import { setPacks, useSeedList } from "@/lib/seed-list";

/** Looks like a seed packet: crimped top, picture window, then the details. */
export function SeedCard({ seed, index }: { seed: Seed; index: number }) {
  const added = Boolean(useSeedList()[seed.slug]);
  const kind = seedKinds.find((item) => item.name === seed.kind) ?? seedKinds[0];

  return (
    <Reveal as="li" index={index} className="reveal-up group">
      <div
        className={`flex h-full flex-col overflow-hidden rounded-lg border bg-white transition duration-200 motion-reduce:transition-none ${added ? "border-leaf ring-2 ring-leaf" : "border-line"}`}
      >
        <div
          className={`flex min-h-10 items-center px-3 py-1.5 text-sm font-semibold text-white sm:px-4 ${kind.band} bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.16)_0_2px,transparent_2px_9px)] bg-[length:100%_7px] bg-no-repeat`}
        >
          {seed.kind}
        </div>
        <div className={`overflow-hidden ${kind.tile}`}>
          <Image
            src={seedImage(seed)}
            alt=""
            width={320}
            height={260}
            unoptimized={!seed.photo}
            className="aspect-[320/260] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-1 motion-reduce:transform-none motion-reduce:transition-none"
          />
        </div>
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <h3 className="text-lg leading-snug font-semibold sm:text-xl">{seed.name}</h3>
          <p className="min-h-6 text-muted">{seed.localName}</p>
          <p className="mt-2 mb-4 text-sm text-muted sm:text-base">
            {seed.area}
            {seed.greenhouse && ", greenhouse"}
          </p>
          <button
            type="button"
            aria-pressed={added}
            aria-label={`${added ? "Remove" : "Add"} ${seed.name} ${added ? "from" : "to"} your list`}
            onClick={() => setPacks(seed.slug, added ? 0 : 1)}
            className={`mt-auto flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-leaf px-2 font-semibold transition-colors active:scale-[0.98] ${added ? "bg-leaf text-white hover:bg-leaf-dark" : "text-leaf hover:bg-leaf hover:text-white"}`}
          >
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="size-4 shrink-0 fill-none stroke-current stroke-[2.5]"
            >
              <path d={added ? "m3 10.5 4.5 4.5L17 5" : "M10 3v14M3 10h14"} />
            </svg>
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </Reveal>
  );
}
