"use client";

import { useT } from "@/i18n/context";
import { useId, useState } from "react";
import { FormPart } from "@/components/sections/form-part";
import { MessagePanel, useMessage } from "@/components/sections/message-panel";
import { SectionHeading } from "@/components/sections/section-heading";
import { Choices, fieldClass } from "@/components/ui/choices";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { greenhouseParts, greenhouseTypes, waterSources } from "@/data/greenhouses";
import { useQuote, type Size } from "./quote-context";

const NOT_SURE = "Not sure yet";
const crops = [
  ...new Set(greenhouseTypes.flatMap((type) => type.crops)),
];

/** Builds a WhatsApp message from the answers. Nothing is stored or sent by this site. */
export function QuoteForm() {
  const t = useT();
  const low = (text: string) => t(text).toLowerCase();
  const { type, setType, crop, setCrop, size, setSize, wishes } = useQuote();
  const { length, width, unit } = size;
  const [location, setLocation] = useState("");
  const [water, setWater] = useState("");
  const [notes, setNotes] = useState("");
  const id = useId();

  const plot =
    length && width
      ? `${length} x ${width} ${t(unit)}`
      : length
        ? t("{length} {unit} long", { length, unit: t(unit) })
        : width
          ? t("{width} {unit} wide", { width, unit: t(unit) })
          : "";
  const details = [
    ["Type", type],
    ["Crop", crop.trim()],
    ["Size", plot],
    ["Location", location.trim()],
    ["Water source", water],
  ].filter(([, value]) => value);
  const wished = greenhouseParts.filter((part) => wishes[part.name]?.length);
  const message = useMessage([
    t("Hello {name}, I would like a quotation for a greenhouse.", { name: siteConfig.name }),
    ...details.map(([label, value]) => `${t(label)}: ${t(value)}`),
    ...(wished.length
      ? [
          t("What I would like:"),
          ...wished.map((part) => `- ${t(part.name)}: ${wishes[part.name].map(low).join(", ")}`),
        ]
      : []),
    ...(notes.trim() ? [`${t("Notes")}: ${notes.trim()}`] : []),
  ].join("\n"));

  return (
    <section id="quotation" className="scroll-mt-13 bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title={t("Ask for a quotation")}
          text={t("Fill in what you know and skip the rest. We turn your answers into a message for you to send.")}
        />
        <Reveal className="reveal-up mt-10">
          <form
            onSubmit={message.send}
            className="grid overflow-clip rounded-lg border border-line bg-white lg:grid-cols-[1.5fr_1fr]"
          >
            <div className="grid content-start gap-7 p-5 sm:p-9">
              <FormPart number={1} title={t("The greenhouse")} />
              <Choices
                legend={t("Greenhouse type")}
                name={`${id}-type`}
                options={[...greenhouseTypes.map((item) => item.name), NOT_SURE]}
                value={type}
                onChange={setType}
              />
              <div>
                <label htmlFor={`${id}-crop`} className="font-semibold">
                  {t("What do you want to grow?")}
                </label>
                <input
                  id={`${id}-crop`}
                  list={`${id}-crops`}
                  autoComplete="off"
                  value={t(crop)}
                  onChange={(event) => {
                    const { value } = event.target;
                    setCrop(crops.find((item) => t(item) === value) ?? value);
                  }}
                  className={fieldClass}
                />
                <datalist id={`${id}-crops`}>
                  {crops.map((item) => (
                    <option key={item} value={t(item)} />
                  ))}
                </datalist>
              </div>
              <fieldset>
                <legend className="font-semibold">{t("Size")}</legend>
                <p className="text-muted">
                  {t("Of the greenhouse, or of the land you have.")}{" "}
                  <a
                    href="#size"
                    className="font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
                  >
                    {t("Plan a size")}
                  </a>
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <label className="mt-2 text-muted">
                    {t("Length")}
                    <input
                      type="number"
                      min="0"
                      step="any"
                      inputMode="decimal"
                      value={length}
                      onChange={(event) => setSize({ ...size, length: event.target.value })}
                      className={fieldClass}
                    />
                  </label>
                  <label className="mt-2 text-muted">
                    {t("Width")}
                    <input
                      type="number"
                      min="0"
                      step="any"
                      inputMode="decimal"
                      value={width}
                      onChange={(event) => setSize({ ...size, width: event.target.value })}
                      className={fieldClass}
                    />
                  </label>
                  <label className="mt-2 text-muted">
                    {t("Unit")}
                    <select
                      value={unit}
                      onChange={(event) =>
                        setSize({ ...size, unit: event.target.value as Size["unit"] })
                      }
                      className={fieldClass}
                    >
                      <option>{t("feet")}</option>
                      <option>{t("metres")}</option>
                    </select>
                  </label>
                </div>
              </fieldset>
              <p className="rounded-md bg-film p-4 sm:p-5">
                {wished.length > 0
                  ? t("Your wishes: {wishes}.", {
                      wishes: wished
                        .map((part) => `${low(part.name)} (${wishes[part.name].map(low).join(", ")})`)
                        .join(", "),
                    })
                  : t("You can also choose the cover, watering and more on the picture.")}{" "}
                <a
                  href="#parts"
                  className="font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
                >
                  {wished.length > 0 ? t("Change wishes") : t("Choose parts")}
                </a>
              </p>
              <FormPart number={2} title={t("Your land")} />
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
              <Choices
                legend={t("Water source")}
                name={`${id}-water`}
                options={waterSources}
                value={water}
                onChange={setWater}
              />
              <div>
                <label htmlFor={`${id}-notes`} className="font-semibold">
                  {t("Anything else we should know?")}
                </label>
                <textarea
                  id={`${id}-notes`}
                  rows={3}
                  maxLength={600}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className={`${fieldClass} py-2.5`}
                />
              </div>
            </div>
            <MessagePanel
              {...message}
              hint={{
                whatsapp:
                  "You can change the message and add photos of your site in WhatsApp before you send it.",
                copy: "Copy this message, then send it to us with a few photos of your site.",
              }}
            />
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
