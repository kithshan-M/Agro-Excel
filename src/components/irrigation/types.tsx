"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { irrigationNeeds, irrigationTypes } from "@/data/irrigation";
import { useIrrigation } from "./irrigation-context";

export function IrrigationTypes() {
  const { need, setNeed, setType } = useIrrigation();

  return (
    <section id="irrigation-types" className="scroll-mt-13 bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Types of irrigation"
          text="The right one depends on your crop, your water and your soil."
        />
        <ul className="mt-10 grid gap-6 md:grid-cols-2 md:gap-7">
          {irrigationTypes.map((type, index) => (
            <Reveal
              as="li"
              key={type.key}
              index={index % 2}
              className="reveal-up flex flex-col overflow-hidden rounded-lg border border-line bg-white"
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
                  className="block w-full"
                />
              </picture>
              <div className="flex flex-1 flex-col p-5 sm:p-7">
                <h3 className="text-2xl font-semibold">{type.name}</h3>
                <p className="mt-2 leading-relaxed text-muted">{type.text}</p>
                <p className="mt-4 mb-5 border-t border-line pt-4">
                  <span className="font-semibold">Suits:</span> {type.suits}
                </p>
                <a
                  href="#irrigation-ask"
                  aria-label={`Choose this type: ${type.name}`}
                  onClick={() => {
                    setType(type.name);
                    if (!need) setNeed(irrigationNeeds.build);
                  }}
                  className="mt-auto inline-flex min-h-12 items-center justify-center rounded-md border border-leaf px-5 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-white sm:self-start"
                >
                  Choose this type
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
