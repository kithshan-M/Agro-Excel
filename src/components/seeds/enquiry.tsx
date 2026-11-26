"use client";

import { useLang, useT } from "@/i18n/context";
import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { MessagePanel, useMessage } from "@/components/sections/message-panel";
import { SectionHeading } from "@/components/sections/section-heading";
import { Choices, fieldClass } from "@/components/ui/choices";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { growingPlaces, seedImage, seedKinds, seeds } from "@/data/seeds";
import { setSeedFilter } from "@/lib/seed-filter";
import { setList, setPacks, useSeedList, type List } from "@/lib/seed-list";
import { PackStepper, packs } from "./pack-stepper";

export function Enquiry() {
  const t = useT();
  const lang = useLang();
  const list = useSeedList();
  const [location, setLocation] = useState("");
  const [plot, setPlot] = useState("");
  const [place, setPlace] = useState("");
  const [undo, setUndo] = useState<{ text: string; list: List } | null>(null);
  const id = useId();

  useEffect(() => {
    if (!undo) return;
    const timer = setTimeout(() => setUndo(null), 10000);
    return () => clearTimeout(timer);
  }, [undo]);

  function remove(slug: string, name: string) {
    setUndo({ text: t("{name} removed", { name: t(name) }), list });
    setPacks(slug, 0);
  }

  const chosen = seeds.filter((seed) => list[seed.slug]);
  const message = useMessage(
    [
      t("Hello {name}, please send me prices and stock for these seeds:", { name: siteConfig.name }),
      ...chosen.map(
        (seed) =>
          `- ${t(seed.name)}${seed.localName && lang === "en" ? ` (${seed.localName})` : ""}: ${t(packs(list[seed.slug]), { count: list[seed.slug] })}`,
      ),
      ...(location.trim() ? [`${t("Location")}: ${location.trim()}`] : []),
      ...(plot.trim() ? [`${t("Plot size")}: ${plot.trim()}`] : []),
      ...(place ? [`${t("Growing in")}: ${t(place)}`] : []),
    ].join("\n"),
  );

  return (
    <section id="list" className="scroll-mt-4 bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title={t("Your seed list")}
          text={t("Check your list, then send it to us for varieties, prices and stock.")}
        />
        <div role="status" className="min-h-10 pt-4">
          {undo && (
            <p className="enter inline-flex flex-wrap items-center gap-x-4 rounded-md bg-ink px-4 text-white">
              {t(undo.text)}
              <button
                type="button"
                onClick={() => {
                  setList(undo.list);
                  setUndo(null);
                }}
                className="min-h-11 cursor-pointer font-semibold text-sun underline underline-offset-4 hover:text-white"
              >
                {t("Undo")}
              </button>
            </p>
          )}
        </div>
        {chosen.length === 0 ? (
          <div className="mt-4 rounded-lg border border-line bg-white p-6 sm:p-10">
            <p className="font-display text-2xl font-semibold">{t("Your list is empty")}</p>
            <p className="mt-1 mb-6 text-lg text-muted">{t("Choose a kind to start with.")}</p>
            <ul className="grid grid-cols-2 gap-3 max-[30rem]:[&:lang(ta)]:grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
              {seedKinds.map((kind) => {
                const example = seeds.find((seed) => seed.kind === kind.name);
                return (
                  <li key={kind.name}>
                    <a
                      href="#catalogue"
                      onClick={(event) => {
                        // The filter changes the address, so scroll by hand.
                        event.preventDefault();
                        setSeedFilter({ kind: kind.name, place: "" });
                        document.getElementById("seed-results")?.scrollIntoView();
                      }}
                      className={`group block h-full overflow-hidden rounded-lg ${kind.tile}`}
                    >
                      {example && (
                        <Image
                          src={seedImage(example)}
                          alt=""
                          width={200}
                          height={150}
                          unoptimized={!example.photo}
                          className="aspect-[4/3] w-full object-cover transition-transform duration-500 max-[30rem]:[&:lang(ta)]:aspect-[3/1] group-hover:scale-105 motion-reduce:transition-none"
                        />
                      )}
                      <span className={`relative flex min-h-11 items-center px-3.5 font-semibold text-white ${kind.band}`}>
                        {t(kind.name)}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <form
            onSubmit={message.send}
            className="mt-4 grid overflow-clip rounded-lg border border-line bg-white lg:grid-cols-[1.5fr_1fr]"
          >
            <div className="grid content-start gap-7 p-5 sm:p-9">
              <ul className="border-t border-line">
                {chosen.map((seed) => {
                  const count = list[seed.slug];
                  return (
                    <li
                      key={seed.slug}
                      className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line py-3"
                    >
                      <Image
                        src={seedImage(seed)}
                        alt=""
                        width={64}
                        height={52}
                        unoptimized={!seed.photo}
                        className="w-16 rounded-md bg-film"
                      />
                      <div className="min-w-28 flex-1">
                        <p className="font-semibold">{t(seed.name)}</p>
                        {lang === "en" && <p className="text-muted">{seed.localName}</p>}
                      </div>
                      <PackStepper
                        slug={seed.slug}
                        name={seed.name}
                        count={count}
                        onRemove={() => remove(seed.slug, seed.name)}
                        className="w-44 border border-field text-ink"
                      />
                      <button
                        type="button"
                        aria-label={t("Remove {name}", { name: t(seed.name) })}
                        onClick={() => remove(seed.slug, seed.name)}
                        className="min-h-11 cursor-pointer px-1 font-semibold text-muted underline underline-offset-4 hover:text-ink"
                      >
                        {t("Remove")}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="-mt-3 flex flex-wrap items-center justify-between gap-x-4 text-muted">
                <p>{t("Your list is saved on this device.")}</p>
                <button
                  type="button"
                  onClick={() => {
                    setUndo({ text: t("List cleared"), list });
                    setList({});
                  }}
                  className="min-h-11 cursor-pointer px-1 font-semibold underline underline-offset-4 hover:text-ink"
                >
                  {t("Clear list")}
                </button>
              </div>
              <div className="grid gap-7 sm:grid-cols-2 sm:gap-5">
                <div>
                  <label htmlFor={`${id}-location`} className="font-semibold">
                    {t("Where is your land?")}
                  </label>
                  <input
                    id={`${id}-location`}
                    autoComplete="address-level2"
                    placeholder={t("Village, town or district")}
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor={`${id}-plot`} className="font-semibold">
                    {t("How big is your plot?")}
                  </label>
                  <input
                    id={`${id}-plot`}
                    autoComplete="off"
                    placeholder={t("20 perches, 60 x 30 feet")}
                    value={plot}
                    onChange={(event) => setPlot(event.target.value)}
                    className={fieldClass}
                  />
                </div>
              </div>
              <Choices
                legend={t("Where will you grow them?")}
                name={`${id}-place`}
                options={growingPlaces}
                value={place}
                onChange={setPlace}
              />
            </div>
            <MessagePanel
              {...message}
              hint={{
                whatsapp: "You can change the message in WhatsApp before you send it.",
                copy: "Copy this message, then send it to us.",
              }}
            />
          </form>
        )}
      </Container>
    </section>
  );
}
