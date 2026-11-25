"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { ChipRow, TypeTabs } from "@/components/sections/type-tabs";
import { Container } from "@/components/ui/container";
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

  function choose(item: string) {
    const next = item === watering ? "" : item;
    setWatering(next);
    if (next) setActive(irrigationTypes.findIndex((type) => suits(type).includes(next)));
    // Keeps a crop the visitor typed in the form.
    if (crops.includes(next) && (crop === "" || crop === watering)) setCrop(next);
    else if (crop === watering) setCrop("");
  }

  return (
    <section id="irrigation-types" className="scroll-mt-13 bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Which type suits you?"
          text="Choose what you water and we show the type that often suits it. Your water and soil matter too, so we check before we suggest one."
        />
        <div className="mt-7 mb-8 grid grid-cols-1 gap-4">
          <ChipRow title="Crops" items={crops} chosen={[watering]} onChoose={choose} />
          <ChipRow title="Places" items={places} chosen={[watering]} onChoose={choose} />
        </div>
        <TypeTabs
          id="irrigation"
          label="Types of irrigation"
          tone="water"
          active={active}
          onChange={setActive}
          items={irrigationTypes.map((type) => ({
            key: type.key,
            name: type.name,
            image: `/images/irrigation/${type.key}-still.svg`,
            badge: watering && suits(type).includes(watering) ? "Often suits" : undefined,
            best: true,
          }))}
        >
          {irrigationTypes.map((type) => (
            <div key={type.key}>
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
        </TypeTabs>
      </Container>
    </section>
  );
}
