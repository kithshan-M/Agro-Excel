"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { seedKinds, seeds, type SeedKind } from "@/data/seeds";
import { whatsappLink } from "@/lib/whatsapp";
import { SeedCard } from "./seed-card";

const places = ["All areas", "Up-country", "Low-country", "Greenhouse"] as const;

export function Catalogue() {
  const [search, setSearch] = useState("");
  const [kind, setKind] = useState<SeedKind | "">("");
  const [place, setPlace] = useState<(typeof places)[number]>("All areas");

  const words = search.trim().toLowerCase();
  const base = seeds.filter(
    (seed) =>
      (!words ||
        `${seed.name} ${seed.localName ?? ""}`.toLowerCase().includes(words)) &&
      (place === "All areas" ||
        (place === "Greenhouse"
          ? seed.greenhouse
          : seed.area === place || seed.area === "Most areas")),
  );
  const shown = base.filter((seed) => !kind || seed.kind === kind);
  const filtered = Boolean(words || kind || place !== "All areas");

  function clear() {
    setSearch("");
    setKind("");
    setPlace("All areas");
  }

  // One sideways-scrolling row on phones, so the seeds stay near the top.
  const chipRow =
    "mt-1 -mx-4 flex gap-2.5 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0";
  const chip =
    "min-h-11 shrink-0 cursor-pointer whitespace-nowrap rounded-md border border-field bg-white px-4 font-medium transition-colors hover:border-leaf aria-pressed:border-leaf aria-pressed:bg-leaf aria-pressed:text-white";

  return (
    <section id="catalogue" className="scroll-mt-4 py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Find your seeds"
          text="Search by English or local name, or narrow the list to your area."
        />
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[20rem_1fr] lg:gap-8">
          <div className="relative self-start">
            <label htmlFor="seed-search" className="font-semibold">
              Search
            </label>
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3.5 left-3.5 size-5 fill-none stroke-muted stroke-2"
            >
              <path d="M9 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm4.5-1.5L18 18" />
            </svg>
            <input
              id="seed-search"
              type="search"
              autoComplete="off"
              placeholder="Tomato, karavila"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="mt-2 block min-h-12 w-full rounded-md border border-field bg-white pr-3 pl-11 placeholder:text-muted"
            />
          </div>
          <div className="grid min-w-0 grid-cols-1 gap-4">
            <div role="group" aria-labelledby="seed-kind">
              <p id="seed-kind" className="font-semibold">
                Kind
              </p>
              <div className={chipRow}>
                <button
                  type="button"
                  aria-pressed={kind === ""}
                  onClick={() => setKind("")}
                  className={chip}
                >
                  All
                </button>
                {seedKinds.map(({ name }) => {
                  const count = base.filter((seed) => seed.kind === name).length;
                  return (
                    <button
                      key={name}
                      type="button"
                      aria-pressed={kind === name}
                      onClick={() => setKind(kind === name ? "" : name)}
                      className={chip}
                    >
                      {name} <span className="opacity-75">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div role="group" aria-labelledby="seed-place">
              <p id="seed-place" className="font-semibold">
                Where you grow
              </p>
              <div className={chipRow}>
                {places.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={place === item}
                    onClick={() => setPlace(item)}
                    className={chip}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex min-h-11 flex-wrap items-center gap-x-4 border-t border-line pt-3">
          <p role="status" className="text-muted">
            Showing {shown.length} of {seeds.length} seeds
          </p>
          {filtered && (
            <button
              type="button"
              onClick={clear}
              className="min-h-11 cursor-pointer font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
            >
              Clear filters
            </button>
          )}
        </div>

        {shown.length > 0 ? (
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {shown.map((seed, index) => (
              <SeedCard key={seed.slug} seed={seed} index={index % 4} />
            ))}
          </ul>
        ) : (
          <div className="mt-4 rounded-lg border border-line bg-white p-8 text-center">
            <p className="text-xl font-semibold">No seeds match</p>
            <p className="mt-2 text-muted">
              Try another name or clear the filters. You can also{" "}
              <a
                href={whatsappLink("a seed that is not on your list") ?? "/contact"}
                className="font-semibold text-leaf underline underline-offset-4"
              >
                ask us for it
              </a>
              .
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
