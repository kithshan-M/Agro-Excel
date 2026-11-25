"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { SignSummary } from "@/components/sections/sign-summary";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { systemParts } from "@/data/irrigation";
import { step } from "@/lib/motion";
import { useIrrigation } from "./irrigation-context";

const total = systemParts.length;

/** Choose a part to learn what it does, and tick faults. They go into the form. */
export function SystemPicker() {
  const { signs, toggleSign } = useIrrigation();
  const [active, setActive] = useState(0);
  const part = systemParts[active];
  const count = (name: string) => signs[name]?.length ?? 0;

  return (
    <section id="irrigation-parts" className="scroll-mt-13 py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Follow the water"
          text="Choose a number to see what each part does. If something is wrong, tick it and we add it to your message."
        />
        <div className="mt-10 grid items-stretch lg:grid-cols-[1.25fr_1fr]">
          <Reveal className="relative self-start overflow-hidden rounded-t-lg border border-line bg-film lg:rounded-l-lg lg:rounded-tr-none">
            <picture>
              <source
                media="(prefers-reduced-motion: reduce)"
                srcSet="/images/irrigation/system-still.svg"
              />
              <Image
                src="/images/irrigation/system.svg"
                alt="Irrigation system: water source, pump, tank, filter, valves and timer, pipes, drippers and sprinklers."
                width={900}
                height={720}
                unoptimized
                loading="eager"
                className="block w-full"
              />
            </picture>
            {systemParts.map((item, index) => (
              <Image
                key={item.key}
                src={`/images/irrigation/system-${item.key}.svg`}
                alt=""
                width={900}
                height={720}
                unoptimized
                className={`pointer-events-none absolute inset-x-0 top-0 w-full transition-opacity duration-300 motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            {systemParts.map((item, index) => (
              <div
                key={item.key}
                className="absolute -translate-1/2"
                style={{ left: `${item.badge[0]}%`, top: `${item.badge[1]}%` }}
              >
                <div className="reveal-pop" style={step(index + 2)}>
                  <button
                    type="button"
                    aria-label={`Part ${index + 1}, ${item.name}`}
                    aria-pressed={active === index}
                    onClick={() => setActive(index)}
                    className={`relative flex size-8 cursor-pointer items-center justify-center rounded-full text-sm font-bold transition duration-200 active:scale-95 before:absolute before:-inset-1.5 motion-reduce:transition-none sm:size-10 sm:text-lg ${active === index ? "scale-115 bg-sun text-ink ring-3 ring-white" : "bg-ink text-white hover:bg-leaf"}`}
                  >
                    {index + 1}
                    {count(item.name) > 0 && (
                      <span
                        aria-hidden="true"
                        className="absolute -top-1 -right-1 size-3.5 rounded-full border-2 border-white bg-[#c63a27]"
                      />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </Reveal>

          <div className="flex flex-col rounded-b-lg border border-t-0 border-line bg-white p-5 sm:p-8 lg:rounded-r-lg lg:rounded-bl-none lg:border-t lg:border-l-0">
            <div aria-live="polite">
              <h3 className="text-2xl font-bold">
                {active + 1}. {part.name}
              </h3>
              <p className="mt-1.5 text-lg leading-relaxed text-muted lg:min-h-16">
                {part.text}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between border-b border-line pb-5">
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
            <fieldset className="mt-5 lg:mb-7">
              <legend className="font-semibold">Is something wrong with it?</legend>
              <div className="mt-3 flex flex-wrap gap-2.5 lg:min-h-26 lg:content-start">
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
              parts={systemParts}
              signs={signs}
              toggleSign={toggleSign}
              href="#irrigation-ask"
              noun="fault"
            />
          </div>
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
