"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { helpCards, helpTypes } from "@/data/consulting";
import { seedImage, seedKinds, seeds } from "@/data/seeds";
import { useConsult } from "./consult-context";

/** Two questions that set up the rest of the page: the crop, then the help. */
export function Start() {
  const t = useT();
  const { crop, setCrop, help, setHelp, setOpen } = useConsult();
  const [search, setSearch] = useState("");
  const words = search.trim().toLowerCase();
  const shown = seeds.filter((seed) =>
    `${seed.name} ${seed.localName ?? ""} ${t(seed.name)}`.toLowerCase().includes(words),
  );

  return (
    <section id="start" className="scroll-mt-13 py-16 md:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading title={t("What are you growing?")} text={t("Choose your crop, or type another one.")} />
          <div className="md:w-80">
            <label htmlFor="crop-search" className="sr-only">
              {t("Find your crop")}
            </label>
            <input
              id="crop-search"
              type="search"
              autoComplete="off"
              placeholder={t("Tomato, karavila")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="block min-h-12 w-full rounded-md border border-field bg-white px-4 placeholder:text-muted"
            />
          </div>
        </div>
        {shown.length > 0 ? (
          <div role="group" aria-label={t("Crop")} className="-mx-4 mt-6 grid snap-x auto-cols-[5.5rem] grid-flow-col grid-rows-2 gap-2.5 overflow-x-auto scroll-px-4 px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:grid-flow-row sm:grid-cols-[repeat(auto-fill,minmax(5.1rem,1fr))] sm:grid-rows-none sm:overflow-visible sm:px-0">
            {shown.map((seed) => {
              const chosen = crop === seed.name;
              const kind = seedKinds.find((item) => item.name === seed.kind) ?? seedKinds[0];
              return (
                <button
                  key={seed.slug}
                  type="button"
                  aria-pressed={chosen}
                  onClick={() => setCrop(chosen ? "" : seed.name)}
                  className={`relative flex cursor-pointer snap-start flex-col overflow-hidden rounded-lg border bg-white text-center transition-colors ${chosen ? "border-leaf ring-2 ring-leaf" : "border-line hover:border-leaf"}`}
                >
                  <span className={`block ${kind.tile}`}>
                    <Image
                      src={seedImage(seed)}
                      alt=""
                      width={96}
                      height={72}
                      unoptimized={!seed.photo}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </span>
                  <span
                    className={`flex min-h-11 flex-1 items-center justify-center px-0.5 text-[0.8125rem] leading-tight font-medium ${chosen ? "bg-leaf text-white" : ""}`}
                  >
                    {t(seed.name)}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-line bg-white p-5">
            {t("We do not list that crop, but you can still ask.")}
            <button
              type="button"
              onClick={() => setCrop(search.trim())}
              className="min-h-11 cursor-pointer rounded-md bg-leaf px-5 font-semibold text-white transition-colors hover:bg-leaf-dark"
            >
              {t("Use “{crop}”", { crop: search.trim() })}
            </button>
          </p>
        )}

        <div className="mt-12 flex min-h-11 flex-wrap items-center gap-x-4">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {crop ? t("What do you need for your {crop}?", { crop: t(crop).toLowerCase() }) : t("What do you need?")}
          </h3>
          {crop && (
            <button
              type="button"
              onClick={() => setCrop("")}
              className="min-h-11 cursor-pointer font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
            >
              {t("Change crop")}
            </button>
          )}
        </div>
        <ul className="mt-5 grid gap-4 md:grid-cols-3 md:gap-5">
          {helpCards.map((card, index) => {
            const chosen = help === helpTypes[index];
            return (
              <Reveal as="li" key={card.href + card.title} index={index} className="reveal-up">
                <a
                  href={card.href}
                  aria-current={chosen ? "true" : undefined}
                  onClick={() => {
                    setHelp(helpTypes[index]);
                    if (card.stage !== undefined) setOpen(card.stage);
                  }}
                  className={`group flex h-full overflow-hidden rounded-lg border bg-white transition-colors md:flex-col ${chosen ? "border-leaf ring-2 ring-leaf" : "border-line hover:border-leaf"}`}
                >
                  <span className="relative block w-28 shrink-0 overflow-hidden bg-[#dcebf0] sm:w-40 md:aspect-[2/1] md:w-full">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-4 sm:p-6">
                    <span className="font-display text-xl font-semibold group-hover:text-leaf">
                      {t(card.title)}
                    </span>
                    <span className="mt-1 text-muted">{t(card.text)}</span>
                    <span className="mt-auto flex items-center gap-2 pt-3 font-semibold text-leaf">
                      {t(card.action)}
                      <svg
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="size-4 fill-none stroke-current stroke-[2.5] transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none"
                      >
                        <path d="M10 3v13m-5-5 5 5 5-5" />
                      </svg>
                    </span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
