"use client";

import { useHref, useT, useWhatsapp } from "@/i18n/context";
import { useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { seedKinds, seedPlaces, seeds, type Seed } from "@/data/seeds";
import { noFilter, setSeedFilter, useSeedFilter, type SeedFilter } from "@/lib/seed-filter";
import { SeedCard } from "./seed-card";
import { SeedDetails } from "./seed-details";

const growsIn = (seed: Seed, place: SeedFilter["place"]) =>
  !place ||
  (place === "Greenhouse" ? seed.greenhouse : seed.area === place || seed.area === "Most areas");

// Phones swipe sideways through a kind, so every kind is a short scroll away.
const shelf =
  "max-sm:-mx-4 max-sm:flex max-sm:snap-x max-sm:gap-3 max-sm:overflow-x-auto max-sm:scroll-px-4 max-sm:px-4 max-sm:pt-0.5 max-sm:pb-1 max-sm:[scrollbar-width:none] max-sm:*:w-40 max-sm:*:shrink-0 max-sm:*:snap-start";
const grid = "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";

export function FilteredCatalogue() {
  return <Catalogue filter={useSeedFilter()} />;
}

export function Catalogue({ filter = noFilter }: { filter?: SeedFilter }) {
  const t = useT();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState("");
  const to = useHref();
  const whatsappLink = useWhatsapp();
  const { kind, place } = filter;

  const words = search.trim().toLowerCase();
  const base = seeds.filter(
    (seed) =>
      (!words || `${seed.name} ${seed.localName ?? ""} ${t(seed.name)}`.toLowerCase().includes(words)) &&
      growsIn(seed, place),
  );
  const shown = base.filter((seed) => !kind || seed.kind === kind);
  const filtered = Boolean(words || kind || place);
  // Without a search or kind, each kind gets its own heading.
  const groups =
    words || kind
      ? [{ name: "", seeds: shown }]
      : seedKinds
          .map(({ name }) => ({ name: name as string, seeds: shown.filter((seed) => seed.kind === name) }))
          .filter((group) => group.seeds.length > 0);

  function choose(change: Partial<SeedFilter>) {
    setSeedFilter({ ...filter, ...change });
    // A shorter list could leave the visitor further down the page.
    const list = document.getElementById("seed-results");
    if (list && list.getBoundingClientRect().top < 0) list.scrollIntoView({ behavior: "instant" });
  }

  function clear() {
    setSearch("");
    choose(noFilter);
  }

  const control =
    "min-h-11 shrink-0 cursor-pointer whitespace-nowrap rounded-md border px-4 font-medium transition-colors hover:border-leaf";
  const off = "border-field bg-white";
  const on = "border-leaf bg-leaf text-white";

  return (
    <section id="catalogue" className="scroll-mt-4 pt-16 md:pt-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            title={t("Find your seeds")}
            text={t("Search by English or local name, or choose a kind and area.")}
          />
          <div className="relative md:w-80">
            <label htmlFor="seed-search" className="sr-only">
              {t("Search seeds")}
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
              placeholder={t("Tomato, karavila")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="block min-h-12 w-full rounded-md border border-field bg-white pr-3 pl-11 placeholder:text-muted"
            />
          </div>
        </div>
      </Container>

      <div id="seed-results" className="mt-7 scroll-mt-16">
        <div className="sticky top-[var(--header-offset,0px)] z-[5] border-y border-line bg-paper transition-[top] duration-300 motion-reduce:transition-none">
          <Container>
            {/* One sideways-scrolling row on phones. */}
            {/* The right edge fades, so it is clear more buttons are off to the side. */}
            <div className="-mx-4 flex items-center gap-2.5 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] max-sm:pr-10 sm:max-lg:pr-12 max-lg:[mask-image:linear-gradient(to_right,#000_calc(100%-2rem),transparent)] sm:-mx-6 sm:px-6 lg:mx-0 lg:-ml-1 lg:px-1">
              <select
                aria-label={t("Where you grow")}
                value={place}
                onChange={(event) => choose({ place: event.target.value as SeedFilter["place"] })}
                className={`${control} w-36 lg:order-last lg:ml-auto lg:w-44 ${place ? "border-leaf bg-film text-leaf-dark" : off}`}
              >
                <option value="">{t("All areas")}</option>
                {seedPlaces.map((item) => (
                  <option key={item}>{t(item)}</option>
                ))}
              </select>
              <div role="group" aria-label={t("Kind")} className="flex gap-2.5">
                <button type="button" aria-pressed={kind === ""} onClick={() => choose({ kind: "" })} className={`${control} ${kind === "" ? on : off}`}>
                  {t("All")}
                </button>
                {seedKinds.map(({ name, band }) => (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={kind === name}
                    onClick={() => choose({ kind: kind === name ? "" : name })}
                    className={`${control} flex items-center gap-2 ${kind === name ? on : off}`}
                  >
                    <span aria-hidden="true" className={`size-3 rounded-full ${kind === name ? "bg-white" : band}`} />
                    {t(name)}
                    <span className="opacity-75">
                      ({base.filter((seed) => seed.kind === name).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </Container>
        </div>

        <Container className="pb-16 md:pb-24">
          <div className="flex min-h-14 flex-wrap items-center gap-x-4 pt-2">
            <p role="status" className="text-muted">
              {t("Showing {count} of {total} seeds", { count: shown.length, total: seeds.length })}
            </p>
            {filtered && (
              <button
                type="button"
                onClick={clear}
                className="min-h-11 cursor-pointer font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
              >
                {t("Clear filters")}
              </button>
            )}
          </div>

          {shown.length > 0 ? (
            groups.map((group) => (
              <div key={group.name || "results"} className={group.name ? "mt-7 first-of-type:mt-0 sm:mt-9" : "mt-2"}>
                {group.name && (
                  <div className="mb-3 flex min-h-11 flex-wrap items-center justify-between gap-x-4 sm:mb-4">
                    <h3 className="flex items-center gap-3 text-2xl font-semibold">
                      <span
                        aria-hidden="true"
                        className={`size-4 rounded-full ${seedKinds.find((item) => item.name === group.name)?.band}`}
                      />
                      {t(group.name)}
                    </h3>
                    {group.seeds.length > 2 && (
                      <button
                        type="button"
                        aria-label={t("See all {count} seeds: {kind}", { count: group.seeds.length, kind: t(group.name) })}
                        onClick={() => choose({ kind: group.name as SeedFilter["kind"] })}
                        className="min-h-11 cursor-pointer font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark sm:hidden"
                      >
                        {t("See all {count}", { count: group.seeds.length })}
                      </button>
                    )}
                  </div>
                )}
                <ul className={`${grid} ${group.name ? shelf : ""}`}>
                  {group.seeds.map((seed, index) => (
                    <SeedCard
                      key={seed.slug}
                      seed={seed}
                      index={index % 6}
                      grouped={group.name !== ""}
                      onOpen={() => setOpen(seed.slug)}
                    />
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="mt-2 rounded-lg border border-line bg-white p-8 sm:p-12">
              <p className="font-display text-2xl font-semibold">{t("No seeds match")}</p>
              <p className="mt-2 max-w-xl text-lg leading-relaxed text-muted">
                {t("Try another name or fewer filters. If you need a seed that is not here, ask us for it.")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={
                    (words
                      ? whatsappLink("{name} seeds", { name: search.trim() })
                      : whatsappLink("a seed that is not on your list")) ?? to("/contact")
                  }
                  className="inline-flex min-h-12 items-center rounded-md bg-leaf px-6 font-semibold text-white transition-colors hover:bg-leaf-dark"
                >
                  {t("Ask for a seed")}
                </a>
                <button
                  type="button"
                  onClick={clear}
                  className="min-h-12 cursor-pointer rounded-md border border-leaf px-6 font-semibold text-leaf transition-colors hover:bg-film"
                >
                  {t("Clear filters")}
                </button>
              </div>
            </div>
          )}
        </Container>
      </div>
      <SeedDetails
        seeds={shown}
        seed={seeds.find((seed) => seed.slug === open)}
        onChange={setOpen}
        onClose={() => setOpen("")}
      />
    </section>
  );
}
