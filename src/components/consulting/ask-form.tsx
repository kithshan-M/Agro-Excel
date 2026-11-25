"use client";

import { useId, useState } from "react";
import { FormPart } from "@/components/sections/form-part";
import { MessagePanel, useMessage } from "@/components/sections/message-panel";
import { SectionHeading } from "@/components/sections/section-heading";
import { Choices, fieldClass } from "@/components/ui/choices";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import {
  cropStages,
  helpTypes,
  photoGuide,
  plantParts,
  problemAge,
  problemSpread,
} from "@/data/consulting";
import { growingPlaces, seeds } from "@/data/seeds";
import { useConsult } from "./consult-context";

/** Builds a WhatsApp message from the answers. Nothing is stored or sent by this site. */
export function AskForm() {
  const {
    help,
    setHelp,
    crop,
    setCrop,
    stage,
    setStage,
    topics,
    signs,
    spread,
    setSpread,
    photos,
  } = useConsult();
  const [location, setLocation] = useState("");
  const [place, setPlace] = useState("");
  const [age, setAge] = useState("");
  const [notes, setNotes] = useState("");
  const id = useId();

  const isProblem = help === helpTypes[2];
  const details = [
    ["Help with", help],
    ["Crop", crop.trim()],
    ["Stage", stage],
    ["Growing in", place],
    ["Location", location.trim()],
    ["Started", isProblem ? age : ""],
    ["How many plants", isProblem ? spread : ""],
  ].filter(([, value]) => value);
  const seen = plantParts
    .filter((part) => signs[part.name]?.length)
    .map(
      (part) =>
        `- ${part.name}: ${signs[part.name].map((sign) => sign.toLowerCase()).join(", ")}`,
    );
  const asked = cropStages
    .filter((item) => topics[item.name]?.length)
    .map(
      (item) => `- ${item.name}: ${topics[item.name].map((topic) => topic.toLowerCase()).join(", ")}`,
    );
  const taken = photoGuide.filter((photo) => photos.includes(photo.title));
  const message = useMessage(
    [
      `Hello ${siteConfig.name}, I would like advice about my crop.`,
      ...details.map(([label, value]) => `${label}: ${value}`),
      ...(asked.length ? ["I want to ask about:", ...asked] : []),
      ...(isProblem && seen.length ? ["What I see:", ...seen] : []),
      ...(taken.length
        ? [`Photos I will send: ${taken.map((photo) => photo.title.toLowerCase()).join(", ")}`]
        : []),
      ...(notes.trim() ? [`Notes: ${notes.trim()}`] : []),
    ].join("\n"),
  );

  return (
    <section id="ask" className="scroll-mt-13 bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Ask for advice"
          text="Fill in what you know and skip the rest. We turn your answers into a message for you to send."
        />
        <Reveal className="reveal-up mt-10">
          <form
            onSubmit={message.send}
            className="grid overflow-clip rounded-lg border border-line bg-white lg:grid-cols-[1.5fr_1fr]"
          >
            <div className="grid content-start gap-7 p-5 sm:p-9">
              <FormPart number={1} title="Your question" />
              <Choices
                legend="What do you need help with?"
                name={`${id}-help`}
                options={helpTypes}
                value={help}
                onChange={setHelp}
              />
              {isProblem && (
                <div className="grid gap-5 rounded-md bg-film p-4 sm:p-5">
                  <p>
                    {seen.length > 0
                      ? `You ticked signs on: ${plantParts
                          .filter((part) => signs[part.name]?.length)
                          .map((part) => part.name.toLowerCase())
                          .join(", ")}. `
                      : "You can tick what you see on the plant. "}
                    <a
                      href="#problem"
                      className="font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
                    >
                      {seen.length > 0 ? "Change signs" : "Choose signs"}
                    </a>
                  </p>
                  <Choices
                    legend="When did it start?"
                    name={`${id}-age`}
                    options={problemAge}
                    value={age}
                    onChange={setAge}
                  />
                  <Choices
                    legend="How many plants look like this?"
                    name={`${id}-spread`}
                    options={problemSpread}
                    value={spread}
                    onChange={setSpread}
                  />
                </div>
              )}
              <p className="rounded-md bg-film p-4 sm:p-5">
                {asked.length > 0
                  ? "Your ticked questions are in the message. "
                  : "You can tick questions for each stage of the crop. "}
                <a
                  href="#stages"
                  className="font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
                >
                  {asked.length > 0 ? "Change questions" : "Choose questions"}
                </a>
              </p>
              <FormPart number={2} title="Your crop" />
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
              <Choices
                legend="What stage is it at?"
                name={`${id}-stage`}
                options={cropStages.map((item) => item.name)}
                value={stage}
                onChange={setStage}
              />
              <Choices
                legend="Where do you grow it?"
                name={`${id}-place`}
                options={growingPlaces}
                value={place}
                onChange={setPlace}
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
                whatsapp: "Add your photos in WhatsApp before you send it.",
                copy: "Copy this message, then send it to us with your photos.",
              }}
            />
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
