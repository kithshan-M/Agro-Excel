"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { greenhouseParts } from "@/data/greenhouses";
import { step } from "@/lib/motion";
import { SectionHeading } from "./section-heading";

/** Pointing at a number on the picture highlights its row, and the other way round. */
export function PartList() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="parts" className="scroll-mt-13 bg-film py-20 md:py-28">
      <Container>
        <SectionHeading
          title="What goes into it"
          text="We agree on each part with you before building."
        />
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <Reveal className="relative lg:sticky lg:top-20">
            <Image
              src="/images/greenhouses/cutaway.svg"
              alt="Greenhouse with the front opened up and six numbered parts, described in the list that follows."
              width={900}
              height={720}
              unoptimized
              className="w-full rounded-lg border border-line"
            />
            {greenhouseParts.map((part, index) => (
              <div
                key={part.name}
                className="absolute -translate-1/2"
                style={{ left: `${part.badge[0]}%`, top: `${part.badge[1]}%` }}
              >
                <div className="reveal-pop" style={step(index + 2)}>
                  <button
                    type="button"
                    aria-label={`Highlight part ${index + 1}, ${part.name}`}
                    aria-pressed={active === index}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(index)}
                    onBlur={() => setActive(null)}
                    className={`flex size-7 cursor-pointer items-center justify-center rounded-full text-sm font-bold transition duration-200 before:absolute before:-inset-2 motion-reduce:transition-none sm:size-10 sm:text-lg ${active === index ? "scale-125 bg-sun text-ink" : "bg-ink text-white"}`}
                  >
                    {index + 1}
                  </button>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal as="ol" className="border-t border-line">
            {greenhouseParts.map((part, index) => (
              <li
                key={part.name}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
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
                    <h3 className="text-lg font-semibold">{part.name}</h3>
                    <p className="mt-0.5 leading-relaxed text-muted">{part.text}</p>
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
