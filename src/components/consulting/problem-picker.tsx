"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { SignSummary } from "@/components/sections/sign-summary";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { plantParts } from "@/data/consulting";
import { step } from "@/lib/motion";
import { useConsult } from "./consult-context";

/** Choose a part of the plant, then the signs. They go into the form below. */
export function ProblemPicker() {
  const { signs, toggleSign } = useConsult();
  const [active, setActive] = useState(0);
  const part = plantParts[active];
  const count = (name: string) => signs[name]?.length ?? 0;

  return (
    <section id="problem" className="scroll-mt-13 bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Describe a problem"
          text="Choose the part of the plant that looks wrong, then tick what you see. We add it to your message."
        />
        <div className="mt-10 grid items-stretch lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="relative overflow-hidden rounded-t-lg border border-line bg-[#dcebf0] lg:rounded-l-lg lg:rounded-tr-none">
            <Image
              src="/images/consulting/plant.svg"
              alt="Tomato plant with leaves, flowers, fruit, stem and roots."
              width={720}
              height={680}
              unoptimized
              className="block w-full"
            />
            {plantParts.map((item, index) => (
              <Image
                key={item.key}
                src={`/images/consulting/plant-${item.key}.svg`}
                alt=""
                width={720}
                height={680}
                unoptimized
                className={`pointer-events-none absolute inset-x-0 top-0 w-full transition-opacity duration-300 motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            {plantParts.map((item, index) => (
              <div
                key={item.key}
                className={`absolute -translate-y-1/2 ${item.label[0] < 50 ? "left-[3%]" : "right-[3%]"}`}
                style={{ top: `${item.label[1]}%` }}
              >
                <div className="reveal-pop" style={step(index + 2)}>
                  <button
                    type="button"
                    aria-pressed={active === index}
                    onClick={() => setActive(index)}
                    className={`relative flex min-h-11 cursor-pointer items-center gap-2 rounded-md px-3 text-sm font-semibold whitespace-nowrap transition duration-200 active:scale-95 motion-reduce:transition-none sm:px-4 sm:text-base ${active === index ? "bg-sun text-ink ring-3 ring-white" : "bg-ink text-white hover:bg-leaf"}`}
                  >
                    {item.name}
                    {count(item.name) > 0 && (
                      <span
                        className={`flex size-5 items-center justify-center rounded-full text-xs ${active === index ? "bg-ink text-white" : "bg-sun text-ink"}`}
                      >
                        {count(item.name)}
                        <span className="sr-only"> ticked</span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </Reveal>

          <div className="flex flex-col rounded-b-lg border border-t-0 border-line bg-white p-5 sm:p-9 lg:rounded-r-lg lg:rounded-bl-none lg:border-t lg:border-l-0">
            <fieldset aria-live="polite">
              <legend className="font-display text-2xl font-bold">
                {part.name}: what do you see?
              </legend>
              <div className="mt-5 flex flex-wrap gap-2.5 lg:min-h-40 lg:content-start">
                {part.signs.map((sign) => (
                  <label
                    key={`${part.key}-${sign}`}
                    className="relative flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md border border-field bg-white px-4 transition-colors hover:border-leaf has-checked:border-leaf has-checked:bg-leaf has-checked:text-white has-focus-visible:ring-3 has-focus-visible:ring-ink has-focus-visible:ring-offset-2"
                  >
                    <input
                      type="checkbox"
                      checked={signs[part.name]?.includes(sign) ?? false}
                      onChange={() => toggleSign(part.name, sign)}
                      className="peer sr-only"
                    />
                    <svg
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="size-4 fill-none stroke-current stroke-[2.5] opacity-30 peer-checked:opacity-100"
                    >
                      <path d="m3 10.5 4.5 4.5L17 5" />
                    </svg>
                    {sign}
                  </label>
                ))}
              </div>
            </fieldset>

            <SignSummary
              parts={plantParts}
              signs={signs}
              toggleSign={toggleSign}
              href="#ask"
              noun="sign"
            />
          </div>
        </div>
        <p className="mt-4 text-muted">
          This page does not name a disease. We look at your photos and details first.
        </p>
      </Container>
    </section>
  );
}
