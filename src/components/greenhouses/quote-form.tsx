"use client";

import { useId, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { greenhouseTypes, waterSources } from "@/data/greenhouses";
import { whatsappMessageLink } from "@/lib/whatsapp";
import { useQuote } from "./quote-context";
import { SectionHeading } from "./section-heading";

const NOT_SURE = "Not sure yet";
const crops = [
  ...new Set(greenhouseTypes.flatMap((type) => type.crops)),
];

const field =
  "mt-2 block min-h-12 w-full rounded-md border border-field bg-white px-3.5 text-ink";

/** Builds a WhatsApp message from the answers. Nothing is stored or sent by this site. */
export function QuoteForm() {
  const { type, setType } = useQuote();
  const [crop, setCrop] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [unit, setUnit] = useState("feet");
  const [location, setLocation] = useState("");
  const [water, setWater] = useState("");
  const [status, setStatus] = useState("");
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
  const message = [
    `Hello ${siteConfig.name}, I would like a quotation for a greenhouse.`,
    ...details.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");
  const link = whatsappMessageLink(message);

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setStatus("Message copied. Paste it into a chat or email to us.");
    } catch {
      setStatus("Copying did not work. Select the message text and copy it.");
    }
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (link) window.open(link, "_blank", "noopener");
    else copy();
  }

  return (
    <section id="quotation" className="scroll-mt-13 bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Ask for a quotation"
          text="Fill in what you know and skip the rest. We turn your answers into a message for you to send."
        />
        <Reveal className="reveal-up mt-10">
          <form
            onSubmit={submit}
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
                  className={field}
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
                      className={field}
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
                      className={field}
                    />
                  </label>
                  <label className="mt-2 text-muted">
                    Unit
                    <select
                      value={unit}
                      onChange={(event) => setUnit(event.target.value)}
                      className={field}
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
                  className={`${field} placeholder:text-muted`}
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
            <div className="flex flex-col bg-leaf-dark p-5 text-white sm:p-9">
              <h3 className="text-xl font-semibold">Your message</h3>
              <p className="mt-4 rounded-lg rounded-tl-none bg-white p-4 leading-relaxed break-words whitespace-pre-line text-ink">
                {message}
              </p>
              <p className="mt-4 text-white/85">
                {link
                  ? "You can change the message and add photos of your site in WhatsApp before you send it."
                  : "Copy this message, then send it to us with a few photos of your site."}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="min-h-12 cursor-pointer rounded-md bg-sun px-6 font-semibold text-ink transition-colors hover:bg-white"
                >
                  {link ? "Continue in WhatsApp" : "Copy message"}
                </button>
                {link ? (
                  <button
                    type="button"
                    onClick={copy}
                    className="min-h-12 cursor-pointer rounded-md border border-current px-6 font-semibold transition-colors hover:bg-white/10"
                  >
                    Copy message
                  </button>
                ) : (
                  <ButtonLink href="/contact" variant="outline">
                    Contact details
                  </ButtonLink>
                )}
              </div>
              <p role="status" className="mt-4 min-h-6 font-medium">
                {status}
              </p>
            </div>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}

function Choices({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="font-semibold">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2.5">
        {options.map((option) => (
          <label
            key={option}
            className="flex min-h-11 cursor-pointer items-center rounded-md border border-field bg-white px-4 transition-colors hover:border-leaf has-checked:border-leaf has-checked:bg-leaf has-checked:text-white has-focus-visible:ring-3 has-focus-visible:ring-ink has-focus-visible:ring-offset-2"
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
