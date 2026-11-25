"use client";

import { useId, useState } from "react";
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
  systemParts,
} from "@/data/irrigation";
import { seeds } from "@/data/seeds";
import { useIrrigation } from "./irrigation-context";

const typeOptions = [...irrigationTypes.map((item) => item.name), "Not sure yet"];

/** Builds a WhatsApp message from the answers. Nothing is stored or sent by this site. */
export function IrrigationForm() {
  const { need, setNeed, type, setType, signs } = useIrrigation();
  const [crop, setCrop] = useState("");
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
      ? `${length} x ${width} ${unit}`
      : length
        ? `${length} ${unit} long`
        : width
          ? `${width} ${unit} wide`
          : "";
  const faults = systemParts.filter((part) => signs[part.name]?.length);
  const details = [
    ["Type", type],
    ["Crop", crop.trim()],
    ["Area", area],
    ["Location", location.trim()],
    ["Water", water],
    ["Power", power],
  ].filter(([, value]) => value);
  const message = useMessage(
    [
      `Hello ${siteConfig.name}, ${
        building
          ? "I would like a quotation for a new irrigation system."
          : maintaining
            ? "I have an irrigation system that needs repair or service."
            : "I would like to ask about irrigation."
      }`,
      ...details.map(([label, value]) => `${label}: ${value}`),
      ...(maintaining && faults.length
        ? [
            "What is wrong:",
            ...faults.map(
              (part) =>
                `- ${part.name}: ${signs[part.name].map((sign) => sign.toLowerCase()).join(", ")}`,
            ),
          ]
        : []),
      ...(notes.trim() ? [`Notes: ${notes.trim()}`] : []),
    ].join("\n"),
  );

  return (
    <section id="irrigation-ask" className="scroll-mt-13 bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Tell us about your water"
          text="Fill in what you know and skip the rest. We turn your answers into a message for you to send."
        />
        <Reveal className="reveal-up mt-10">
          <form
            onSubmit={message.send}
            className="grid overflow-hidden rounded-lg border border-line bg-white lg:grid-cols-[1.5fr_1fr]"
          >
            <div className="grid content-start gap-7 p-5 sm:p-9">
              <Choices
                legend="What do you need?"
                name={`${id}-need`}
                options={Object.values(irrigationNeeds)}
                value={need}
                onChange={setNeed}
              />
              {maintaining && (
                <p className="rounded-md bg-film p-4 sm:p-5">
                  {faults.length > 0
                    ? `You ticked faults on: ${faults.map((part) => part.name.toLowerCase()).join(", ")}. `
                    : "You can tick what is wrong on the picture. "}
                  <a
                    href="#irrigation-parts"
                    className="font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
                  >
                    {faults.length > 0 ? "Change faults" : "Choose faults"}
                  </a>
                </p>
              )}
              <Choices
                legend={maintaining ? "What type is it?" : "Which type would you like?"}
                name={`${id}-type`}
                options={typeOptions}
                value={type}
                onChange={setType}
              />
              <div className="grid gap-7 sm:grid-cols-2 sm:gap-5">
                <div>
                  <label htmlFor={`${id}-crop`} className="font-semibold">
                    Crop
                  </label>
                  <input
                    id={`${id}-crop`}
                    list={`${id}-crops`}
                    autoComplete="off"
                    placeholder="Tomato, brinjal"
                    value={crop}
                    onChange={(event) => setCrop(event.target.value)}
                    className={fieldClass}
                  />
                  <datalist id={`${id}-crops`}>
                    {seeds.map((seed) => (
                      <option key={seed.slug} value={seed.name}>
                        {seed.localName}
                      </option>
                    ))}
                  </datalist>
                </div>
                <div>
                  <label htmlFor={`${id}-location`} className="font-semibold">
                    Where is your land?
                  </label>
                  <input
                    id={`${id}-location`}
                    autoComplete="address-level2"
                    placeholder="Village, town or district"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className={fieldClass}
                  />
                </div>
              </div>
              <fieldset>
                <legend className="font-semibold">Area to water</legend>
                <div className="grid grid-cols-3 gap-3">
                  <label className="mt-2 text-muted">
                    Length
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
                    Width
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
                    Unit
                    <select
                      value={unit}
                      onChange={(event) => setUnit(event.target.value)}
                      className={fieldClass}
                    >
                      <option>feet</option>
                      <option>metres</option>
                    </select>
                  </label>
                </div>
              </fieldset>
              <Choices
                legend="Water source"
                name={`${id}-water`}
                options={waterSources}
                value={water}
                onChange={setWater}
              />
              <Choices
                legend="Power for the pump"
                name={`${id}-power`}
                options={powerSources}
                value={power}
                onChange={setPower}
              />
              <div>
                <label htmlFor={`${id}-notes`} className="font-semibold">
                  Anything else we should know?
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
