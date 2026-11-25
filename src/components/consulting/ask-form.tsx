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
  const t = useT();
  const lang = useLang();
  const low = (text: string) => t(text).toLowerCase();
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
        `- ${t(part.name)}: ${signs[part.name].map(low).join(", ")}`,
    );
  const asked = cropStages
    .filter((item) => topics[item.name]?.length)
    .map(
      (item) => `- ${t(item.name)}: ${topics[item.name].map(low).join(", ")}`,
    );
  const taken = photoGuide.filter((photo) => photos.includes(photo.title));
  const message = useMessage(
    [
      t("Hello {name}, I would like advice about my crop.", { name: siteConfig.name }),
      ...details.map(([label, value]) => `${t(label)}: ${t(value)}`),
      ...(asked.length ? [t("I want to ask about:"), ...asked] : []),
      ...(isProblem && seen.length ? [t("What I see:"), ...seen] : []),
      ...(taken.length
        ? [t("Photos I will send: {photos}", { photos: taken.map((photo) => low(photo.title)).join(", ") })]
        : []),
      ...(notes.trim() ? [`${t("Notes")}: ${notes.trim()}`] : []),
    ].join("\n"),
  );

  return (
    <section id="ask" className="scroll-mt-13 bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title={t("Ask for advice")}
          text={t("Fill in what you know and skip the rest. We turn your answers into a message for you to send.")}
        />
        <Reveal className="reveal-up mt-10">
          <form
            onSubmit={message.send}
            className="grid overflow-clip rounded-lg border border-line bg-white lg:grid-cols-[1.5fr_1fr]"
          >
            <div className="grid content-start gap-7 p-5 sm:p-9">
              <FormPart number={1} title={t("Your question")} />
              <Choices
                legend={t("What do you need help with?")}
                name={`${id}-help`}
                options={helpTypes}
                value={help}
                onChange={setHelp}
              />
              {isProblem && (
                <div className="grid gap-5 rounded-md bg-film p-4 sm:p-5">
                  <p>
                    {seen.length > 0
                      ? t("You ticked signs on: {parts}.", {
                          parts: plantParts
                            .filter((part) => signs[part.name]?.length)
                            .map((part) => low(part.name))
                            .join(", "),
                        })
                      : t("You can tick what you see on the plant.")}{" "}
                    <a
                      href="#problem"
                      className="font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
                    >
                      {seen.length > 0 ? t("Change signs") : t("Choose signs")}
                    </a>
                  </p>
                  <Choices
                    legend={t("When did it start?")}
                    name={`${id}-age`}
                    options={problemAge}
                    value={age}
                    onChange={setAge}
                  />
                  <Choices
                    legend={t("How many plants look like this?")}
                    name={`${id}-spread`}
                    options={problemSpread}
                    value={spread}
                    onChange={setSpread}
                  />
                </div>
              )}
              <p className="rounded-md bg-film p-4 sm:p-5">
                {asked.length > 0
                  ? t("Your ticked questions are in the message.")
                  : t("You can tick questions for each stage of the crop.")}{" "}
                <a
                  href="#stages"
                  className="font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
                >
                  {asked.length > 0 ? t("Change questions") : t("Choose questions")}
                </a>
              </p>
              <FormPart number={2} title={t("Your crop")} />
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
              <Choices
                legend={t("What stage is it at?")}
                name={`${id}-stage`}
                options={cropStages.map((item) => item.name)}
                value={stage}
                onChange={setStage}
              />
              <Choices
                legend={t("Where do you grow it?")}
                name={`${id}-place`}
                options={growingPlaces}
                value={place}
                onChange={setPlace}
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
