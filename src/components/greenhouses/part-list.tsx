"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { SignSummary } from "@/components/sections/sign-summary";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { greenhouseParts } from "@/data/greenhouses";
import { step } from "@/lib/motion";
import { useQuote } from "./quote-context";

const total = greenhouseParts.length;
const summary = greenhouseParts.map(({ name }) => ({ key: name, name }));

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
  const t = useT();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const { wishes, toggleWish } = useQuote();
  const part = greenhouseParts[active];
  const wished = (index: number) => (wishes[greenhouseParts[index].name]?.length ?? 0) > 0;

  return (
    <section id="parts" className="scroll-mt-13 bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title={t("What goes into it")}
          text={t("Choose a number to see what it is, and tick what you would like. We agree on each part with you before building.")}
        />
        <div className="mt-10 grid items-start lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <Reveal className="relative min-w-0 lg:sticky lg:top-20">
            <Image
              src="/images/greenhouses/cutaway.svg"
              alt={t("Greenhouse with the front opened up and six numbered parts.")}
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
                    aria-label={t("Part {number}, {name}", { number: index + 1, name: t(item.name) })}
                    aria-pressed={active === index}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    className={`relative flex size-8 cursor-pointer items-center justify-center rounded-full text-sm font-bold transition duration-200 before:absolute before:-inset-2 active:scale-95 motion-reduce:transition-none sm:size-10 sm:text-lg ${active === index ? "scale-120 bg-sun text-ink ring-4 ring-white" : hovered === index ? "scale-110 bg-leaf text-white" : "bg-ink text-white"}`}
                  >
                    {index + 1}
                    {wished(index) && (
                      <span
                        aria-hidden="true"
                        className="absolute -top-1 -right-1 size-3.5 rounded-full border-2 border-white bg-leaf"
                      />
                    )}
                  </button>
                </div>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute rounded-md bg-ink px-3 py-1 font-semibold whitespace-nowrap text-white transition-opacity duration-200 motion-reduce:transition-none max-sm:hidden ${labelPlace(item.badge)} ${active === index ? "opacity-100" : "opacity-0"}`}
                >
                  {t(item.name)}
                </span>
              </div>
            ))}
          </Reveal>

          <div className="min-w-0 rounded-b-lg border border-t-0 border-line bg-white p-5 lg:hidden">
            <div aria-live="polite" className="min-h-21 sm:min-h-14">
              <h3 className="text-xl font-semibold">
                {active + 1}. {t(part.name)}
              </h3>
              <p className="mt-1 leading-relaxed text-muted">{t(part.text)}</p>
            </div>
            <Options part={part} />
            <div className="mt-3 flex items-center justify-between">
              <StepButton
                label={t("Previous")}
                onClick={() => setActive((active + total - 1) % total)}
              />
              <span className="text-muted">
                {t("{count} of {total}", { count: active + 1, total })}
              </span>
              <StepButton
                label={t("Next")}
                onClick={() => setActive((active + 1) % total)}
              />
            </div>
            <SignSummary
              parts={summary}
              signs={wishes}
              toggleSign={toggleWish}
              href="#quotation"
              noun="wish"
            />
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
                        {t(item.name)}
                      </span>
                      <span className="mt-0.5 block leading-relaxed text-muted">
                        {t(item.text)}
                      </span>
                    </span>
                  </span>
                </button>
                {active === index && item.options && (
                  <div className="enter bg-white pr-4 pb-5 pl-16">
                    <Options part={item} />
                  </div>
                )}
              </li>
            ))}
            <li className="mt-6 rounded-lg bg-white p-5 [&>div]:mt-0 [&>div]:border-t-0 [&>div]:pt-0">
              <SignSummary
                parts={summary}
                signs={wishes}
                toggleSign={toggleWish}
                href="#quotation"
                noun="wish"
              />
            </li>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** Wishes for one part. They go into the quotation message. */
function Options({ part }: { part: (typeof greenhouseParts)[number] }) {
  const t = useT();
  const { wishes, toggleWish } = useQuote();
  if (!part.options) return null;

  return (
    <div role="group" aria-label={t("{part}: what would you like?", { part: t(part.name) })} className="flex flex-wrap gap-2.5 max-lg:mt-3">
      {part.options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={wishes[part.name]?.includes(option) ?? false}
          onClick={() => toggleWish(part.name, option)}
          className="min-h-11 cursor-pointer rounded-md border border-field bg-white px-4 font-medium transition-colors hover:border-leaf aria-pressed:border-leaf aria-pressed:bg-leaf aria-pressed:text-white"
        >
          {t(option)}
        </button>
      ))}
    </div>
  );
}

function StepButton({ label, onClick }: { label: string; onClick: () => void }) {
  const t = useT();
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-11 cursor-pointer rounded-md border border-field px-4 font-semibold text-leaf transition-colors hover:border-leaf"
    >
      {t(label)}
    </button>
  );
}
