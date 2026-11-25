"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { SectionHeading } from "@/components/sections/section-heading";
import { SendList } from "@/components/sections/send-list";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { photoGuide, waitSteps } from "@/data/consulting";
import { useConsult } from "./consult-context";

/** Photos to take, ticked off as they are done, and what to do meanwhile. */
export function PhotoGuide() {
  const t = useT();
  const { photos, togglePhoto } = useConsult();
  const list = [
    `*${t("Until you hear from us")}*`,
    waitSteps.map((item) => `- ${t(item)}`).join("\n"),
    t("From {name}", { name: siteConfig.name }),
  ].join("\n\n");

  return (
    <section id="photos" className="scroll-mt-13 bg-[#dcebf0] py-16 md:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            title={t("Photos that help us")}
            text={t("Take these four in daylight. Tick each one, and your message says which photos you are sending.")}
          />
          <p role="status" className="shrink-0 text-lg font-semibold">
            {t("{count} of {total} taken", { count: photos.length, total: photoGuide.length })}
          </p>
        </div>
        <ol className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {photoGuide.map((photo, index) => {
            const taken = photos.includes(photo.title);
            return (
              <Reveal as="li" key={photo.key} index={index} className="reveal-up">
                <button
                  type="button"
                  aria-pressed={taken}
                  onClick={() => togglePhoto(photo.title)}
                  className={`group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-lg border bg-white text-left transition-colors ${taken ? "border-leaf ring-2 ring-leaf" : "border-line hover:border-leaf"}`}
                >
                  <Image
                    src={`/images/consulting/photo-${photo.key}.svg`}
                    alt=""
                    width={360}
                    height={300}
                    unoptimized
                    className="w-full"
                  />
                  <span className="flex flex-1 flex-col p-3.5 sm:p-5">
                    <span className="font-display text-lg leading-tight font-semibold sm:text-xl">
                      {t(photo.title)}
                    </span>
                    <span className="mt-1.5 mb-4 leading-snug text-muted">{t(photo.text)}</span>
                    <span
                      className={`mt-auto flex min-h-11 items-center justify-center gap-2 rounded-md font-semibold transition-colors ${taken ? "bg-leaf text-white" : "border border-leaf text-leaf group-hover:bg-leaf group-hover:text-white"}`}
                    >
                      {taken && (
                        <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 fill-none stroke-current stroke-[3]">
                          <path d="m3 10.5 4.5 4.5L17 5" />
                        </svg>
                      )}
                      {taken ? t("Taken") : t("I took this")}
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ol>
        <Reveal className="reveal-up mt-8 grid gap-x-12 gap-y-6 rounded-lg bg-white p-6 sm:p-9 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("Until you hear from us")}</h3>
            <p className="mt-2 mb-6 text-lg leading-relaxed text-muted">
              {t("Small steps that keep the problem clear and help stop it moving.")}
            </p>
            <SendList text={t(list)} tone="leaf" />
          </div>
          <ol>
            {waitSteps.map((item, index) => (
              <li key={item} className="flex gap-4 border-t border-line py-3.5 first:border-t-0 first:pt-0">
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sun font-display font-bold"
                >
                  {index + 1}
                </span>
                <span className="pt-0.5 text-lg leading-snug">{t(item)}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
