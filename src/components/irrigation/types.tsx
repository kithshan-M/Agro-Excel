"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { irrigationNeeds, irrigationTypes } from "@/data/irrigation";
import { useIrrigation } from "./irrigation-context";

const crops = [...new Set(irrigationTypes.flatMap((type) => type.crops))];
const places = [...new Set(irrigationTypes.flatMap((type) => type.places))];
const suits = (type: (typeof irrigationTypes)[number]) => [...type.crops, ...type.places];

const icons = {
  water: "M10 2.500c3 4 5 6.200 5 9a5 5 0 0 1-10 0c0-2.800 2-5 5-9Z",
  leaves: "M4 16C4 8 8 4 16.500 3.500 17 12 12 16.500 5.500 15M4 17.500 11 10",
  watch: "M10 3 18 17H2L10 3Zm0 5v4.500m0 2v.2",
};

/** Pick what you water to see which type suits it, or look through the types. */
export function IrrigationTypes() {
  const { need, setNeed, setType, crop, setCrop } = useIrrigation();
  const [watering, setWatering] = useState("");
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function choose(item: string) {
    const next = item === watering ? "" : item;
    setWatering(next);
    if (next) setActive(irrigationTypes.findIndex((type) => suits(type).includes(next)));
    // Keeps a crop the visitor typed in the form.
    if (crops.includes(next) && (crop === "" || crop === watering)) setCrop(next);
    else if (crop === watering) setCrop("");
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const last = irrigationTypes.length - 1;
    const move: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowDown: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      ArrowUp: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    const next = move[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  const chips = (title: string, items: string[]) => (
    <div role="group" aria-label={title} className="sm:flex sm:items-baseline">
      <span aria-hidden="true" className="block shrink-0 text-muted sm:w-18">
        {title}
      </span>
      <div className="-mx-4 flex gap-2.5 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={watering === item}
            onClick={() => choose(item)}
            className="min-h-11 shrink-0 cursor-pointer rounded-md border border-field bg-white px-4 font-medium whitespace-nowrap transition-colors hover:border-leaf aria-pressed:border-leaf aria-pressed:bg-leaf aria-pressed:text-white"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="irrigation-types" className="scroll-mt-13 bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Which type suits you?"
          text="Choose what you water and we show the type that often suits it. Your water and soil matter too, so we check before we suggest one."
        />
        <div className="mt-7 grid grid-cols-1 gap-4">
          {chips("Crops", crops)}
          {chips("Places", places)}
        </div>

        <Reveal className="reveal-up mt-8 overflow-hidden rounded-lg border border-line bg-white lg:grid lg:grid-cols-[17.5rem_1fr]">
          <div
            role="tablist"
            aria-label="Types of irrigation"
            onKeyDown={onKeyDown}
            className="grid grid-cols-4 border-b border-line sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-4 lg:border-r lg:border-b-0"
          >
            {irrigationTypes.map((type, index) => {
              const chosen = active === index;
              const match = watering !== "" && suits(type).includes(watering);
              return (
                <button
                  key={type.key}
                  ref={(element) => {
                    tabs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`irrigation-tab-${type.key}`}
                  aria-selected={chosen}
                  aria-controls={`irrigation-panel-${type.key}`}
                  tabIndex={chosen ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={`flex cursor-pointer flex-col items-start gap-2 border-line p-2 text-left transition-colors -outline-offset-2 not-first:border-l sm:flex-row sm:items-center sm:gap-4 sm:border-l-0! sm:p-4 sm:even:border-l! sm:nth-[n+3]:border-t lg:p-5 lg:even:border-l-0! lg:not-first:border-t ${chosen ? "bg-water text-white" : "hover:bg-paper"}`}
                >
                  <Image
                    src={`/images/irrigation/${type.key}-still.svg`}
                    alt=""
                    width={88}
                    height={64}
                    unoptimized
                    className="h-12 w-full shrink-0 rounded object-cover sm:h-16 sm:w-22"
                  />
                  <span className="min-w-0">
                    <span className="block font-display text-sm leading-tight font-semibold sm:text-lg">
                      {type.name}
                    </span>
                    {match && (
                      <span className="mt-1.5 inline-block rounded bg-sun px-1.5 py-0.5 text-xs leading-tight font-semibold text-ink sm:px-2 sm:text-sm">
                        Often suits
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          {irrigationTypes.map((type, index) => (
            <div
              key={type.key}
              role="tabpanel"
              id={`irrigation-panel-${type.key}`}
              aria-labelledby={`irrigation-tab-${type.key}`}
              tabIndex={0}
              hidden={active !== index}
              className="-outline-offset-2"
            >
              {/* The water moves inside the picture: see scripts/draw-irrigation.mjs. */}
              <picture>
                <source
                  media="(prefers-reduced-motion: reduce)"
                  srcSet={`/images/irrigation/${type.key}-still.svg`}
                />
                <Image
                  src={`/images/irrigation/${type.key}.svg`}
                  alt=""
                  width={720}
                  height={460}
                  unoptimized
                  className="block aspect-[16/9] w-full object-cover lg:aspect-[2/1]"
                />
              </picture>
              <div className="grid gap-x-10 gap-y-6 p-5 sm:p-8 xl:grid-cols-[1fr_1.1fr]">
                <div>
                  <h3 className="text-2xl font-semibold sm:text-3xl">{type.name}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-muted">{type.text}</p>
                  <p className="mt-4">
                    <span className="font-semibold">Often suits:</span>{" "}
                    {suits(type).join(", ").toLowerCase()}
                  </p>
                </div>
                <dl>
                  {(
                    [
                      ["water", "Where the water goes", type.water],
                      ["leaves", "Leaves", type.leaves],
                      ["watch", "Watch for", type.watch],
                    ] as const
                  ).map(([icon, title, text]) => (
                    <div key={icon} className="flex gap-3.5 border-t border-line py-3.5 last:pb-0 xl:first:border-t-0 xl:first:pt-1.5">
                      <svg
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="mt-0.5 size-6 shrink-0 fill-none stroke-water stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]"
                      >
                        <path d={icons[icon]} />
                      </svg>
                      <div>
                        <dt className="text-sm text-muted">{title}</dt>
                        <dd className="font-medium">{text}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                <a
                  href="#irrigation-ask"
                  aria-label={`Ask about this type: ${type.name}`}
                  onClick={() => {
                    setType(type.name);
                    if (!need) setNeed(irrigationNeeds.build);
                  }}
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-leaf px-6 font-semibold text-white transition-colors hover:bg-leaf-dark sm:justify-self-start"
                >
                  Ask about this type
                </a>
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
