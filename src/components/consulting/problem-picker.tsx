"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { useId, useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { SignSummary } from "@/components/sections/sign-summary";
import { Choices } from "@/components/ui/choices";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { plantParts, problemSpread } from "@/data/consulting";
import { step } from "@/lib/motion";
import { useConsult } from "./consult-context";

/** Choose a part of the plant, then the signs. They go into the form below. */
export function ProblemPicker() {
  const t = useT();
  const { crop, signs, toggleSign, spread, setSpread } = useConsult();
  const [active, setActive] = useState(0);
  const id = useId();
  const part = plantParts[active];
  const count = (name: string) => signs[name]?.length ?? 0;

  return (
    <section id="problem" className="scroll-mt-13 py-16 md:py-24">
      <Container>
        <SectionHeading
          title={crop ? t("Describe a problem with your {crop}", { crop: t(crop).toLowerCase() }) : t("Describe a problem")}
          text={t("Choose the part of the plant that looks wrong, then the pictures closest to what you see. The plants shown are examples.")}
        />
        <div className="mt-9 grid items-stretch overflow-hidden rounded-lg border border-line bg-white lg:grid-cols-[1fr_1.12fr]">
          <div className="flex flex-col lg:border-r lg:border-line">
            <Reveal className="relative overflow-hidden bg-[#dcebf0]">
              <Image
                src="/images/consulting/plant.svg"
                alt={t("Tomato plant with leaves, flowers, fruit, stem and roots.")}
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
                      {t(item.name)}
                      {count(item.name) > 0 && (
                        <span
                          className={`flex size-5 items-center justify-center rounded-full text-xs ${active === index ? "bg-ink text-white" : "bg-sun text-ink"}`}
                        >
                          {count(item.name)}
                          <span className="sr-only"> {t("ticked")}</span>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </Reveal>
            <p className="flex flex-1 items-center border-t border-line px-5 py-4 text-muted sm:px-8">
              {t("This page does not name a disease. We look at your photos and details first.")}
            </p>
          </div>

          <div className="flex flex-col border-t border-line p-5 sm:p-8 lg:border-t-0">
            <fieldset aria-live="polite">
              <legend className="font-display text-2xl font-bold">
                {t("{part}: what do you see?", { part: t(part.name) })}
              </legend>
              <div className="mt-4 grid grid-cols-2 gap-2.5 min-[360px]:grid-cols-3 lg:min-h-74 lg:content-start">
                {part.signs.map((sign) => (
                  <label
                    key={`${part.key}-${sign.name}`}
                    className="group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border border-field bg-white transition-colors hover:border-leaf has-checked:border-leaf has-checked:ring-2 has-checked:ring-leaf has-focus-visible:ring-3 has-focus-visible:ring-ink has-focus-visible:ring-offset-2"
                  >
                    <input
                      type="checkbox"
                      checked={signs[part.name]?.includes(sign.name) ?? false}
                      onChange={() => toggleSign(part.name, sign.name)}
                      className="peer sr-only"
                    />
                    {sign.picture && (
                      <Image
                        src={`/images/consulting/sign-${sign.picture}.svg`}
                        alt=""
                        width={160}
                        height={120}
                        unoptimized
                        className="aspect-[4/3] w-full object-cover"
                      />
                    )}
                    <span className="absolute top-2 right-2 hidden size-7 items-center justify-center rounded-full bg-leaf text-white peer-checked:flex">
                      <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 fill-none stroke-current stroke-[3]">
                        <path d="m3 10.5 4.5 4.5L17 5" />
                      </svg>
                    </span>
                    <span className="flex min-h-11 flex-1 items-center px-2 py-1.5 text-sm leading-tight font-medium sm:px-2.5 sm:text-[0.9375rem] peer-checked:bg-leaf peer-checked:text-white">
                      {t(sign.name)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="mt-6 border-t border-line pt-5 lg:pb-7">
              <Choices
                legend={t("How many plants look like this?")}
                name={`${id}-spread`}
                options={problemSpread}
                value={spread}
                onChange={setSpread}
              />
            </div>
            <SignSummary
              parts={plantParts}
              signs={signs}
              toggleSign={toggleSign}
              href="#ask"
              noun="sign"
              note={spread}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
