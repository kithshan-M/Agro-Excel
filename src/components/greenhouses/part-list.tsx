"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { greenhouseParts } from "@/data/greenhouses";
import { step } from "@/lib/motion";

const total = greenhouseParts.length;

/** Keeps the name clear of the drawing: below the low numbers, beside the others. */
function labelPlace([left, top]: number[]) {
  const right = left > 60;
  if (top > 70 && top < 90) return right ? "top-full right-0 mt-3" : "top-full left-0 mt-3";
  return `top-1/2 -translate-y-1/2 ${right ? "right-full mr-4" : "left-full ml-4"}`;
}

/**
 * Selecting a number on the picture or a row in the list selects both, spotlights
 * that part in the picture and stays selected. Hovering only hints at the match. Phones show one part at a time.
 */
export function PartList() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
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
            {/* One spotlight picture per part, drawn by scripts/draw-greenhouses.mjs. */}
            {greenhouseParts.map((item, index) => (
              <Image
                key={item.name}
                src={`/images/greenhouses/cutaway-part-${index + 1}.svg`}
                alt=""
                width={900}
                height={720}
                unoptimized
                className={`pointer-events-none absolute inset-0 size-full rounded-t-lg border border-transparent transition-opacity duration-300 motion-reduce:transition-none lg:rounded-lg ${active === index ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            {greenhouseParts.map((item, index) => (
              <div
                key={item.name}
                className={`absolute -translate-1/2 ${active === index ? "z-1" : ""}`}
                style={{ left: `${item.badge[0]}%`, top: `${item.badge[1]}%` }}
              >
                <div className="reveal-pop" style={step(index + 2)}>
                  <button
                    type="button"
                    aria-label={`Part ${index + 1}, ${item.name}`}
                    aria-pressed={active === index}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    className={`flex size-8 cursor-pointer items-center justify-center rounded-full text-sm font-bold transition duration-200 before:absolute before:-inset-2 active:scale-95 motion-reduce:transition-none sm:size-10 sm:text-lg ${active === index ? "scale-120 bg-sun text-ink ring-4 ring-white" : hovered === index ? "scale-110 bg-leaf text-white" : "bg-ink text-white"}`}
                  >
                    {index + 1}
                  </button>
                </div>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute rounded-md bg-ink px-3 py-1 font-semibold whitespace-nowrap text-white transition-opacity duration-200 motion-reduce:transition-none max-sm:hidden ${labelPlace(item.badge)} ${active === index ? "opacity-100" : "opacity-0"}`}
                >
                  {item.name}
                </span>
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
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className="border-b border-line"
              >
                <button
                  type="button"
                  aria-pressed={active === index}
                  onClick={() => setActive(index)}
                  className={`relative block w-full cursor-pointer text-left transition-colors duration-200 before:absolute before:inset-y-0 before:left-0 before:w-1 before:origin-center before:bg-sun before:transition-transform before:duration-200 focus-visible:z-1 motion-reduce:transition-none motion-reduce:before:transition-none ${active === index ? "bg-white before:scale-y-100" : "before:scale-y-0"} ${active !== index && hovered === index ? "bg-white/55" : ""}`}
                >
                  <span className="reveal-up flex gap-4 px-4 py-5" style={step(index)}>
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-200 ${active === index ? "bg-sun text-ink" : hovered === index ? "bg-leaf text-white" : "bg-ink text-white"}`}
                    >
                      {index + 1}
                    </span>
                    <span>
                      <span className="block font-display text-lg font-semibold">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block leading-relaxed text-muted">
                        {item.text}
                      </span>
                    </span>
                  </span>
                </button>
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
