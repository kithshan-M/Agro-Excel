"use client";

import { useLang, useT } from "@/i18n/context";
import { useId, useState } from "react";
import { FormPart } from "@/components/sections/form-part";
import { MessagePanel, useMessage } from "@/components/sections/message-panel";
import { SectionHeading } from "@/components/sections/section-heading";
import { Choices, fieldClass } from "@/components/ui/choices";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { waterSources } from "@/data/greenhouses";
import {
  irrigationNeeds,
  irrigationTypes,
  powerSources,
  symptoms,
  systemParts,
} from "@/data/irrigation";
import { seeds } from "@/data/seeds";
import { useIrrigation } from "./irrigation-context";

const typeOptions = [...irrigationTypes.map((item) => item.name), "Not sure yet"];

/** Builds a WhatsApp message from the answers. Nothing is stored or sent by this site. */
export function IrrigationForm() {
  const t = useT();
  const lang = useLang();
  const low = (text: string) => t(text).toLowerCase();
  const { need, setNeed, type, setType, crop, setCrop, symptom, setSymptom, signs } =
    useIrrigation();
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [unit, setUnit] = useState("feet");
  const [location, setLocation] = useState("");
  const [water, setWater] = useState("");
  const [power, setPower] = useState("");
  const [notes, setNotes] = useState("");
  const id = useId();

  const building = need === irrigationNeeds.build;
  const maintaining = need === irrigationNeeds.maintain;
  const area =
    length && width
      ? `${length} x ${width} ${t(unit)}`
      : length
        ? t("{length} {unit} long", { length, unit: t(unit) })
        : width
          ? t("{width} {unit} wide", { width, unit: t(unit) })
          : "";
  const faults = systemParts.filter((part) => signs[part.name]?.length);
  const details = [
    ["Type", type],
    ["Crop", crop.trim()],
    ["Area", area],
    ["Location", location.trim()],
    ["Water source", water],
    ["Power", power],
  ].filter(([, value]) => value);
  const message = useMessage(
    [
      t(
        building
          ? "Hello {name}, I would like a quotation for a new irrigation system."
          : maintaining
            ? "Hello {name}, I have an irrigation system that needs repair or service."
            : "Hello {name}, I would like to ask about irrigation.",
        { name: siteConfig.name },
      ),
      ...details.map(([label, value]) => `${t(label)}: ${t(value)}`),
      ...(maintaining && symptom ? [`${t("What I notice")}: ${low(symptom)}`] : []),
      ...(maintaining && faults.length
        ? [
            t("What is wrong:"),
            ...faults.map(
              (part) =>
                `- ${t(part.name)}: ${signs[part.name].map(low).join(", ")}`,
            ),
          ]
        : []),
      ...(notes.trim() ? [`${t("Notes")}: ${notes.trim()}`] : []),
    ].join("\n"),
  );

  return (
    <section id="irrigation-ask" className="scroll-mt-13 bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title={t("Tell us about your water")}
          text={t("Fill in what you know and skip the rest. We turn your answers into a message for you to send.")}
        />
        <Reveal className="reveal-up mt-10">
          <form
            onSubmit={message.send}
            className="grid overflow-clip rounded-lg border border-line bg-white lg:grid-cols-[1.5fr_1fr]"
          >
            <div className="grid content-start gap-7 p-5 sm:p-9">
              <FormPart number={1} title={maintaining ? t("Your system") : t("Your plan")} />
              <Choices
                legend={t("What do you need?")}
                name={`${id}-need`}
                options={Object.values(irrigationNeeds)}
                value={need}
                onChange={setNeed}
              />
              {maintaining && (
                <Choices
                  legend={t("What do you notice?")}
                  name={`${id}-symptom`}
                  options={symptoms.map((item) => item.name)}
                  value={symptom}
                  onChange={setSymptom}
                />
              )}
              {maintaining && (
                <p className="rounded-md bg-film p-4 sm:p-5">
                  {faults.length > 0
                    ? t("You ticked faults on: {parts}.", { parts: faults.map((part) => low(part.name)).join(", ") })
                    : t("You can also tick what is wrong on the picture.")}{" "}
                  <a
                    href="#irrigation-parts"
                    className="font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
                  >
                    {faults.length > 0 ? t("Change faults") : t("Choose faults")}
                  </a>
                </p>
              )}
              <Choices
                legend={maintaining ? t("What type is it?") : t("Which type would you like?")}
                name={`${id}-type`}
                options={typeOptions}
                value={type}
                onChange={setType}
              />
              <FormPart number={2} title={t("Your land and crop")} />
              <div className="grid gap-7 sm:grid-cols-2 sm:gap-5">
                <div>
                  <label htmlFor={`${id}-crop`} className="font-semibold">
                    {t("Crop")}
                  </label>
                  <input
                    id={`${id}-crop`}
                    list={`${id}-crops`}
                    autoComplete="off"
                    placeholder={t("Tomato, brinjal")}
                    value={t(crop)}
                    onChange={(event) => {
                      const { value } = event.target;
                      setCrop(seeds.find((seed) => t(seed.name) === value)?.name ?? value);
                    }}
                    className={fieldClass}
                  />
                  <datalist id={`${id}-crops`}>
                    {seeds.map((seed) => (
                      <option key={seed.slug} value={t(seed.name)}>
                        {lang === "en" ? seed.localName : null}
                      </option>
                    ))}
                  </datalist>
                </div>
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
              </div>
              <fieldset>
                <legend className="font-semibold">{t("Area to water")}</legend>
                <div className="grid grid-cols-3 gap-3">
                  <label className="mt-2 text-muted">
                    {t("Length")}
                    <input
                      type="number"
                      min="0"
                      step="any"
                      inputMode="decimal"
                      value={length}
                      onChange={(event) => setLength(event.target.value)}
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
                      onChange={(event) => setWidth(event.target.value)}
                      className={fieldClass}
                    />
                  </label>
                  <label className="mt-2 text-muted">
                    {t("Unit")}
                    <select
                      value={unit}
                      onChange={(event) => setUnit(event.target.value)}
                      className={fieldClass}
                    >
                      <option>{t("feet")}</option>
                      <option>{t("metres")}</option>
                    </select>
                  </label>
                </div>
              </fieldset>
              <FormPart number={3} title={t("Your water and power")} />
              <Choices
                legend={t("Water source")}
                name={`${id}-water`}
                options={waterSources}
                value={water}
                onChange={setWater}
              />
              <Choices
                legend={t("Power for the pump")}
                name={`${id}-power`}
                options={powerSources}
                value={power}
                onChange={setPower}
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
                whatsapp: maintaining
                  ? "Add photos of the pump, filter and lines in WhatsApp before you send it."
                  : "Add photos of your land and water source in WhatsApp before you send it.",
                copy: maintaining
                  ? "Copy this message, then send it to us with photos of the pump, filter and lines."
                  : "Copy this message, then send it to us with photos of your land and water source.",
              }}
            />
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
