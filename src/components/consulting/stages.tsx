"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { useRef } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cropStages } from "@/data/consulting";
import { useConsult } from "./consult-context";
import { Tick } from "./tick";

const total = cropStages.length;

/** Tabs: arrow keys move between stages, as screen reader users expect. */
export function Stages() {
  const t = useT();
  const { open: active, setOpen, topics, toggleTopic, setStage } = useConsult();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = cropStages[active];
  const count = (name: string) => topics[name]?.length ?? 0;
  const all = cropStages.reduce((sum, item) => sum + count(item.name), 0);

  function select(index: number, focus = false) {
    const next = (index + total) % total;
    setOpen(next);
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
    <section id="stages" className="scroll-mt-13 bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title={t("Advice at every stage")}
          text={t("Choose where your crop is now, then tick what you want to ask. We add it to your message.")}
        />
        <Reveal className="reveal-up mt-8">
          <div
            role="tablist"
            aria-label={t("Crop stage")}
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
                  className="group relative flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-2 rounded-md py-2 text-sm font-semibold max-sm:[&:is(:lang(si),:lang(ta))]:text-xs max-[22.5rem]:[&:lang(ta)]:text-[0.6875rem] sm:px-2 sm:text-base"
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
                    {count(item.name) > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-ink text-xs text-white">
                        {count(item.name)}
                        <span className="sr-only"> {t("ticked")}</span>
                      </span>
                    )}
                  </span>
                  <span
                    className={`text-center leading-tight ${active === index ? "text-leaf" : "text-muted group-hover:text-ink"}`}
                  >
                    {t(item.name)}
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
            <div className="relative aspect-[560/330] bg-[#dcebf0] md:aspect-auto md:min-h-96">
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
              <h3 className="text-2xl font-bold sm:text-3xl">{t(stage.title)}</h3>
              <p className="mt-2 text-lg text-muted">{t(stage.text)}</p>
              <fieldset className="mt-5">
                <legend className="font-semibold">{t("What do you want to ask?")}</legend>
                <div className="mt-3 grid gap-2.5 md:min-h-41 md:content-start">
                  {stage.topics.map((topic) => (
                    <Tick
                      key={`${stage.name}-${topic}`}
                      checked={topics[stage.name]?.includes(topic) ?? false}
                      onChange={() => toggleTopic(stage.name, topic)}
                    >
                      {t(topic)}
                    </Tick>
                  ))}
                </div>
              </fieldset>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                <a
                  href="#ask"
                  // Ticking a question has already set the stage.
                  onClick={() => all === 0 && setStage(stage.name)}
                  className="inline-flex min-h-12 items-center rounded-md bg-leaf px-6 font-semibold text-white transition-colors hover:bg-leaf-dark"
                >
                  {all > 0 ? t(all === 1 ? "Continue with {count} question" : "Continue with {count} questions", { count: all }) : t("Ask about this stage")}
                </a>
                <button
                  type="button"
                  onClick={() => select(active + 1)}
                  className="min-h-12 cursor-pointer rounded-md border border-field px-5 font-semibold text-leaf transition-colors hover:border-leaf"
                >
                  {active === total - 1 ? t("Back to the start") : t("Next stage")}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
