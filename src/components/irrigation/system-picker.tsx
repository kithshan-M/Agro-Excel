"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { SignSummary } from "@/components/sections/sign-summary";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { symptoms, systemParts } from "@/data/irrigation";
import { step } from "@/lib/motion";
import { useIrrigation } from "./irrigation-context";

const total = systemParts.length;
const indexOf = (key: string) => systemParts.findIndex((part) => part.key === key);

/**
 * Choose what is wrong to see where to look, or choose a part to learn what it
 * does. Symptoms and ticked faults go into the form.
 */
export function SystemPicker() {
  const t = useT();
  const { signs, toggleSign, symptom, setSymptom } = useIrrigation();
  const [active, setActive] = useState(0);
  const part = systemParts[active];
  const chosen = symptoms.find((item) => item.name === symptom);
  const places = chosen?.places ?? [];
  const order = (index: number) => places.findIndex((place) => indexOf(place.part) === index);
  const here = places[order(active)];
  const count = (name: string) => signs[name]?.length ?? 0;

  function choose(name: string) {
    const next = symptoms.find((item) => item.name === name);
    if (!next || name === symptom) {
      setSymptom("");
      return;
    }
    setSymptom(name);
    setActive(indexOf(next.places[0].part));
  }

  return (
    <section id="irrigation-parts" className="scroll-mt-13 py-16 md:py-24">
      <Container>
        <SectionHeading
          title={t("Find the fault")}
          text={t("Choose what you notice and follow the places to check, or choose any part of the picture to see what it does.")}
        />
        <div role="group" aria-label={t("What do you notice?")} className="mt-7">
          <p aria-hidden="true" className="font-semibold">
            {t("What do you notice?")}
          </p>
          <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
            {symptoms.map(({ name }) => (
              <button
                key={name}
                type="button"
                aria-pressed={symptom === name}
                onClick={() => choose(name)}
                className="min-h-11 cursor-pointer rounded-md border border-field bg-white px-3 py-2 text-left leading-tight font-medium transition-colors last:col-span-2 sm:px-4 hover:border-leaf aria-pressed:border-leaf aria-pressed:bg-leaf aria-pressed:text-white"
              >
                {t(name)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 grid overflow-hidden rounded-lg border border-line bg-white lg:grid-cols-[1.25fr_1fr]">
          {chosen && (
            <div key={chosen.name} className="enter bg-[#d5e9f0] p-5 sm:p-8 lg:col-span-2">
              {chosen.caution && (
                <p className="mb-5 flex gap-2.5 border-b border-water/25 pb-4 font-medium">
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 fill-none stroke-[#a3331f] stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
                  >
                    <path d="M10 3 18 17H2L10 3Zm0 5v4.500m0 2v.2" />
                  </svg>
                  {t(chosen.caution)}
                </p>
              )}
              <div className="grid gap-x-10 gap-y-5 lg:grid-cols-[1.25fr_1fr]">
                <div>
                  <p className="text-xl font-semibold">{t("Where to look, in order")}</p>
                  <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2">
                    {places.map((place, index) => {
                      const at = indexOf(place.part);
                      return (
                        <li key={place.part} className="flex items-center gap-1.5">
                          {index > 0 && (
                            <svg
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                              className="size-4 shrink-0 fill-none stroke-water stroke-[2.5]"
                            >
                              <path d="m7 4 6 6-6 6" />
                            </svg>
                          )}
                          <button
                            type="button"
                            aria-pressed={active === at}
                            onClick={() => setActive(at)}
                            className="min-h-11 cursor-pointer rounded-md bg-white px-3.5 font-medium transition-colors hover:bg-sun aria-pressed:bg-sun aria-pressed:font-semibold"
                          >
                            {t(systemParts[at].name)}
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </div>
                <div aria-live="polite" className="lg:pl-8">
                  <p className="text-muted">
                    {here ? t("Check {count} of {total}", { count: order(active) + 1, total: places.length }) : t("Choose a place to see what to check.")}
                  </p>
                  {here && <p className="mt-1 text-lg font-semibold">{t(here.check)}</p>}
                  {here && order(active) + 1 < places.length && (
                    <button
                      type="button"
                      onClick={() => setActive(indexOf(places[order(active) + 1].part))}
                      className="mt-1 min-h-11 cursor-pointer font-semibold text-water underline underline-offset-4 hover:text-ink"
                    >
                      {t("That is fine, check the next place")}
                    </button>
                  )}
                  {here && order(active) + 1 === places.length && (
                    <a
                      href="#irrigation-ask"
                      className="mt-1 inline-flex min-h-11 items-center font-semibold text-water underline underline-offset-4 hover:text-ink"
                    >
                      {t("Still not right? Tell us")}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col lg:border-r lg:border-line">
            <Reveal className="relative overflow-hidden bg-film">
              <picture>
                <source
                  media="(prefers-reduced-motion: reduce)"
                  srcSet="/images/irrigation/system-still.svg"
                />
                <Image
                  src="/images/irrigation/system.svg"
                  alt={t("Irrigation system: water source, pump, tank, filter, valves and timer, pipes, drippers and sprinklers.")}
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
                      aria-label={t("Part {number}, {name}", { number: index + 1, name: t(item.name) })}
                      aria-pressed={active === index}
                      onClick={() => setActive(index)}
                      className={`relative flex size-8 cursor-pointer items-center justify-center rounded-full text-sm font-bold transition duration-200 active:scale-95 before:absolute before:-inset-1.5 motion-reduce:transition-none sm:size-10 sm:text-lg ${active === index ? "scale-115 bg-sun text-ink ring-3 ring-white" : order(index) >= 0 ? "bg-white text-ink ring-3 ring-sun" : "bg-ink text-white hover:bg-leaf"}`}
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
            {/* The same parts by name, easier to tap than the numbers on a phone. */}
            <ol className="grid flex-1 grid-cols-2 content-start gap-px border-t border-line bg-line sm:grid-cols-3 lg:content-stretch">
              {systemParts.map((item, index) => (
                <li key={item.key} className="bg-white last:col-span-2 sm:last:col-span-3 lg:last:col-span-3">
                  <button
                    type="button"
                    aria-pressed={active === index}
                    onClick={() => setActive(index)}
                    className={`flex h-full min-h-12 w-full cursor-pointer items-center gap-2.5 px-3 text-left text-[0.9375rem] leading-tight transition-colors -outline-offset-2 sm:px-4 ${active === index ? "bg-film font-semibold text-leaf-dark" : "hover:bg-paper"}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${active === index ? "bg-sun text-ink" : order(index) >= 0 ? "bg-white text-ink ring-2 ring-sun" : "bg-ink text-white"}`}
                    >
                      {index + 1}
                    </span>
                    {t(item.name)}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col border-t border-line p-5 sm:p-8 lg:border-t-0">
            <div aria-live="polite">
              <h3 className="text-2xl font-bold">
                {active + 1}. {t(part.name)}
              </h3>
              <p className="mt-1.5 text-lg leading-relaxed text-muted">{t(part.text)}</p>
            </div>
            <div className="mt-4 flex items-center justify-between border-b border-line pb-5">
              <StepButton
                label={t("Previous")}
                onClick={() => setActive((active + total - 1) % total)}
              />
              <span className="text-muted">
                {t("{count} of {total}", { count: active + 1, total })}
              </span>
              <StepButton label={t("Next")} onClick={() => setActive((active + 1) % total)} />
            </div>
            <fieldset className="mt-5 mb-7">
              <legend className="font-semibold">{t("Is something wrong with it?")}</legend>
              <div className="mt-3 flex flex-wrap gap-2.5">
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
                    {t(sign)}
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
              note={symptom}
            />
          </div>
        </div>
      </Container>
    </section>
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
