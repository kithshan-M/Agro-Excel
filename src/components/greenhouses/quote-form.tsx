"use client";

import { useId, useState } from "react";
import { MessagePanel, useMessage } from "@/components/sections/message-panel";
import { SectionHeading } from "@/components/sections/section-heading";
import { Choices, fieldClass } from "@/components/ui/choices";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { greenhouseTypes, waterSources } from "@/data/greenhouses";
import { useQuote } from "./quote-context";

const NOT_SURE = "Not sure yet";
const crops = [
  ...new Set(greenhouseTypes.flatMap((type) => type.crops)),
];

/** Builds a WhatsApp message from the answers. Nothing is stored or sent by this site. */
export function QuoteForm() {
  const { type, setType } = useQuote();
  const [crop, setCrop] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [unit, setUnit] = useState("feet");
  const [location, setLocation] = useState("");
  const [water, setWater] = useState("");
  const id = useId();

  const plot =
    length && width
      ? `${length} x ${width} ${unit}`
      : length
        ? `${length} ${unit} long`
        : width
          ? `${width} ${unit} wide`
          : "";
  const details = [
    ["Type", type],
    ["Crop", crop.trim()],
    ["Plot size", plot],
    ["Location", location.trim()],
    ["Water", water],
  ].filter(([, value]) => value);
  const message = useMessage([
    `Hello ${siteConfig.name}, I would like a quotation for a greenhouse.`,
    ...details.map(([label, value]) => `${label}: ${value}`),
  ].join("\n"));

  return (
    <section id="quotation" className="scroll-mt-13 bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Ask for a quotation"
          text="Fill in what you know and skip the rest. We turn your answers into a message for you to send."
        />
        <Reveal className="reveal-up mt-10">
          <form
            onSubmit={message.send}
            className="grid overflow-hidden rounded-lg border border-line bg-white lg:grid-cols-[1.5fr_1fr]"
          >
            <div className="grid gap-7 p-5 sm:p-9">
              <Choices
                legend="Greenhouse type"
                name={`${id}-type`}
                options={[...greenhouseTypes.map((item) => item.name), NOT_SURE]}
                value={type}
                onChange={setType}
              />
              <div>
                <label htmlFor={`${id}-crop`} className="font-semibold">
                  What do you want to grow?
                </label>
                <input
                  id={`${id}-crop`}
                  list={`${id}-crops`}
                  autoComplete="off"
                  value={crop}
                  onChange={(event) => setCrop(event.target.value)}
                  className={fieldClass}
                />
                <datalist id={`${id}-crops`}>
                  {crops.map((item) => (
                    <option key={item} value={item} />
                  ))}
                </datalist>
              </div>
              <fieldset>
                <legend className="font-semibold">Plot size</legend>
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
              <Choices
                legend="Water source"
                name={`${id}-water`}
                options={waterSources}
                value={water}
                onChange={setWater}
              />
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
