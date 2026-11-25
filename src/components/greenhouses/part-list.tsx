"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { greenhouseParts } from "@/data/greenhouses";
import { step } from "@/lib/motion";
import { SectionHeading } from "./section-heading";

const total = greenhouseParts.length;

/** Numbers on the picture and the text stay in step. Phones show one part at a time. */
export function PartList() {
  const [active, setActive] = useState(0);
  const part = greenhouseParts[active];

  return (
    <section id="parts" className="scroll-mt-13 bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title="What goes into it"
          text="Choose a number to see what it is. We agree on each part with you before building."
        />
        <div className="mt-10 grid items-start lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <Reveal className="relative lg:sticky lg:top-20">
            <Image
              src="/images/greenhouses/cutaway.svg"
              alt="Greenhouse with the front opened up and six numbered parts."
              width={900}
              height={720}
              unoptimized
              className="w-full rounded-t-lg border border-line lg:rounded-lg"
            />
            {greenhouseParts.map((item, index) => (
              <div
                key={item.name}
                className="absolute -translate-1/2"
                style={{ left: `${item.badge[0]}%`, top: `${item.badge[1]}%` }}
              >
                <div className="reveal-pop" style={step(index + 2)}>
                  <button
                    type="button"
                    aria-label={`Part ${index + 1}, ${item.name}`}
                    aria-pressed={active === index}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className={`flex size-8 cursor-pointer items-center justify-center rounded-full text-sm font-bold transition duration-200 before:absolute before:-inset-2 motion-reduce:transition-none sm:size-10 sm:text-lg ${active === index ? "scale-120 bg-sun text-ink" : "bg-ink text-white"}`}
                  >
                    {index + 1}
                  </button>
                </div>
              </div>
            ))}
          </Reveal>

          <div className="rounded-b-lg border border-t-0 border-line bg-white p-5 lg:hidden">
            <div aria-live="polite" className="min-h-[6.5rem] sm:min-h-20">
              <h3 className="text-xl font-semibold">
                {active + 1}. {part.name}
              </h3>
              <p className="mt-1 leading-relaxed text-muted">{part.text}</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <StepButton
                label="Previous"
                onClick={() => setActive((active + total - 1) % total)}
              />
              <span className="text-muted">
                {active + 1} of {total}
              </span>
              <StepButton
                label="Next"
                onClick={() => setActive((active + 1) % total)}
              />
            </div>
          </div>

          <Reveal as="ol" className="hidden border-t border-line lg:block">
            {greenhouseParts.map((item, index) => (
              <li
                key={item.name}
                onMouseEnter={() => setActive(index)}
                className={`border-b border-line transition-colors duration-200 ${active === index ? "bg-white" : ""}`}
              >
                <div className="reveal-up flex gap-4 px-3 py-5" style={step(index)}>
                  <span
                    aria-hidden="true"
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-200 ${active === index ? "bg-sun text-ink" : "bg-ink text-white"}`}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="mt-0.5 leading-relaxed text-muted">{item.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function StepButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-11 cursor-pointer rounded-md border border-field px-4 font-semibold text-leaf transition-colors hover:border-leaf"
    >
      {label}
    </button>
  );
}
