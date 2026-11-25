"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cropStages } from "@/data/consulting";
import { useConsult } from "./consult-context";

const total = cropStages.length;

/** Tabs: arrow keys move between stages, as screen reader users expect. */
export function Stages() {
  const { askAbout } = useConsult();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = cropStages[active];

  function select(index: number, focus = false) {
    const next = (index + total) % total;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: total - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key], true);
  }

  return (
    <section id="stages" className="scroll-mt-13 py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Advice at every stage"
          text="Choose where your crop is now to see what you can ask us."
        />
        <Reveal className="reveal-up mt-8">
          <div
            role="tablist"
            aria-label="Crop stage"
            onKeyDown={onKeyDown}
            className="-mx-2 flex sm:mx-0"
          >
            {cropStages.map((item, index) => {
              const done = index <= active;
              return (
                <button
                  key={item.name}
                  ref={(element) => {
                    tabs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`stage-tab-${index}`}
                  aria-selected={active === index}
                  aria-controls="stage-panel"
                  tabIndex={active === index ? 0 : -1}
                  onClick={() => select(index)}
                  className="group relative flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-2 rounded-md py-2 text-sm font-semibold sm:px-2 sm:text-base"
                >
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className={`absolute top-[1.8rem] right-1/2 left-[-50%] h-0.5 transition-colors duration-300 motion-reduce:transition-none ${done ? "bg-leaf" : "bg-line"}`}
                    />
                  )}
                  <span
                    className={`relative z-1 flex size-11 items-center justify-center rounded-full border-2 font-display text-lg transition duration-200 motion-reduce:transition-none ${active === index ? "scale-110 border-leaf bg-sun text-ink" : done ? "border-leaf bg-leaf text-white" : "border-field bg-white text-ink group-hover:border-leaf"}`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`text-center leading-tight ${active === index ? "text-leaf" : "text-muted group-hover:text-ink"}`}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id="stage-panel"
            aria-labelledby={`stage-tab-${active}`}
            className="mt-6 grid overflow-hidden rounded-lg border border-line bg-white md:grid-cols-2"
          >
            <div className="relative aspect-[560/400] bg-[#dcebf0] md:aspect-auto md:min-h-96">
              {cropStages.map((item, index) => (
                <Image
                  key={item.name}
                  src={`/images/consulting/stage-${index + 1}.svg`}
                  alt=""
                  width={560}
                  height={480}
                  unoptimized
                  className={`absolute inset-0 size-full object-cover transition-opacity duration-300 motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
            <div className="flex flex-col p-5 sm:p-9">
              <h3 className="text-2xl font-bold sm:text-3xl">{stage.title}</h3>
              <p className="mt-2 text-lg text-muted">{stage.text}</p>
              <p className="mt-6 font-semibold">You can ask us about</p>
              <ul className="mt-3 space-y-3 md:min-h-32">
                {stage.topics.map((topic) => (
                  <li key={topic} className="flex gap-3">
                    <svg
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 fill-none stroke-leaf stroke-[2.5]"
                    >
                      <path d="m3 10.5 4.5 4.5L17 5" />
                    </svg>
                    {topic}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-auto">
                <a
                  href="#ask"
                  onClick={() => askAbout(stage.name, active === 0)}
                  className="inline-flex min-h-12 items-center rounded-md bg-leaf px-6 font-semibold text-white transition-colors hover:bg-leaf-dark"
                >
                  Ask about this
                </a>
                <button
                  type="button"
                  onClick={() => select(active + 1)}
                  className="min-h-12 cursor-pointer rounded-md border border-field px-5 font-semibold text-leaf transition-colors hover:border-leaf"
                >
                  {active === total - 1 ? "Back to the start" : "Next stage"}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
