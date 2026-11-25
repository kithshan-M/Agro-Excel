"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { seedImage, seedKinds, type Seed } from "@/data/seeds";
import { useSeedList } from "@/lib/seed-list";
import { AddOrCount } from "./pack-stepper";

/** Looks like a seed packet: crimped top, picture window, then the details. */
export function SeedCard({
  seed,
  index,
  grouped = false,
  inRow = grouped,
  onOpen,
}: {
  seed: Seed;
  index: number;
  /** Under a heading for its kind, so the name of the kind is left out. */
  grouped?: boolean;
  /** In a row that phones swipe sideways. */
  inRow?: boolean;
  /** Makes the picture and name open the details. */
  onOpen?: () => void;
}) {
  const count = useSeedList()[seed.slug] ?? 0;
  const kind = seedKinds.find((item) => item.name === seed.kind) ?? seedKinds[0];

  return (
    // In a sideways row on phones the slide-up would make the row scroll up and down.
    <Reveal
      as="li"
      index={index}
      className={`reveal-up group ${inRow ? "max-sm:transform-none! max-sm:opacity-100!" : ""}`}
    >
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-lg border bg-white transition duration-200 motion-reduce:transition-none ${count > 0 ? "border-leaf ring-2 ring-leaf" : "border-line"}`}
      >
        <div
          className={`flex items-center px-3 text-sm font-semibold text-white ${grouped ? "min-h-4" : "min-h-9 pt-1"} ${kind.band} bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.16)_0_2px,transparent_2px_9px)] bg-[length:100%_7px] bg-no-repeat`}
        >
          {!grouped && seed.kind}
        </div>
        <div className={`overflow-hidden ${kind.tile}`}>
          <Image
            src={seedImage(seed)}
            alt=""
            width={320}
            height={260}
            unoptimized={!seed.photo}
            className="aspect-[320/235] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-1 motion-reduce:transform-none motion-reduce:transition-none sm:aspect-[320/260]"
          />
        </div>
        <div className="flex flex-1 flex-col p-3">
          <h3 className="text-lg leading-snug font-semibold">
            {onOpen ? (
              // The button covers the card, under the Add button.
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={onOpen}
                className="cursor-pointer text-left transition-colors after:absolute after:inset-0 group-hover:text-leaf"
              >
                {seed.name}
              </button>
            ) : (
              seed.name
            )}
          </h3>
          {seed.localName && <p className="text-muted">{seed.localName}</p>}
          <p className="mt-1.5 mb-3.5 text-sm leading-snug text-muted">
            {seed.area}
            {seed.greenhouse && ", greenhouse"}
          </p>
          <div className="relative mt-auto">
            <AddOrCount slug={seed.slug} name={seed.name} count={count} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
