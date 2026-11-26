"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { Link } from "@/components/ui/link";
import { useId, useRef, useState } from "react";
import { MessagePanel, useMessage } from "@/components/sections/message-panel";
import { SectionHeading } from "@/components/sections/section-heading";
import { Choices, fieldClass } from "@/components/ui/choices";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { contactTopics, replyBy } from "@/data/contact";

const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

/** Details that help a reply. Each adds a line to the question, ready to finish. */
const helpfulLines = ["Plot size", "Crop", "Water source"];

/** Builds a message from the answers. Nothing is stored or sent by this site. */
export function ContactForm() {
  const t = useT();
  const [topicKey, setTopicKey] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");
  const [number, setNumber] = useState("");
  const id = useId();
  const questionBox = useRef<HTMLTextAreaElement>(null);

  /** Adds "Plot size: " on a line of its own, then puts the cursor after it. */
  function addLine(label: string) {
    const start = `${t(label)}: `;
    const box = questionBox.current;
    let text = question;
    let at = text.indexOf(start);
    if (at === -1) {
      text = `${text.trimEnd()}${text.trim() ? "\n" : ""}${start}`;
      at = text.length - start.length;
      setQuestion(text);
    }
    const lineEnd = text.indexOf("\n", at);
    const cursor = lineEnd === -1 ? text.length : lineEnd;
    requestAnimationFrame(() => {
      box?.focus();
      box?.setSelectionRange(cursor, cursor);
    });
  }

  const topic = contactTopics.find((item) => item.key === topicKey);
  const message = useMessage(
    [
      t("Hello {name}, I would like to ask about {topic}.", {
        name: siteConfig.name,
        topic: t(topic ? topic.about : "your services"),
      }),
      ...(question.trim() ? [question.trim()] : []),
      ...[
        ["Name", name.trim()],
        ["Location", location.trim()],
        ["Please reply by", reply],
        [reply === "Email" ? "My email" : "My number", reply && reply !== "WhatsApp" ? number.trim() : ""],
      ]
        .filter(([, value]) => value)
        .map(([label, value]) => `${t(label)}: ${t(value)}`),
    ].join("\n"),
  );

  return (
    <section id="message" className="scroll-mt-4 py-16 md:py-24">
      <Container>
        <SectionHeading
          title={t("What is it about?")}
          text={t("Choose one, then write to us here or use the longer form for that service.")}
        />
        <fieldset className="mt-8">
          <legend className="sr-only">{t("Topic")}</legend>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {contactTopics.map((item) => (
              <label
                key={item.key}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors last:col-span-2 hover:border-leaf has-checked:border-leaf has-checked:ring-2 has-checked:ring-leaf has-focus-visible:ring-3 has-focus-visible:ring-ink has-focus-visible:ring-offset-2 sm:last:col-span-1"
              >
                <input
                  type="radio"
                  name={`${id}-topic`}
                  value={item.key}
                  checked={topicKey === item.key}
                  onChange={() => setTopicKey(item.key)}
                  className="peer sr-only"
                />
                <span className="relative block h-20 overflow-hidden bg-[#fdf0c8] sm:h-28">
                  <Image
                    src={item.image}
                    alt=""
                    width={360}
                    height={260}
                    unoptimized
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </span>
                <span className="flex min-h-12 items-center justify-between gap-2 px-3 py-2 font-semibold max-[22.5rem]:[&:is(:lang(si),:lang(ta))]:text-sm peer-checked:bg-leaf peer-checked:text-white sm:min-h-14 sm:px-4">
                  {t(item.name)}
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className={`size-4 shrink-0 fill-none stroke-current stroke-[3] ${topicKey === item.key ? "" : "opacity-0"}`}
                  >
                    <path d="m3 10.5 4.5 4.5L17 5" />
                  </svg>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div aria-live="polite" className="mt-5 min-h-12">
          {topic?.form && (
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg">
              {t("Have a few details ready?")}
              <Link
                href={topic.form.href}
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
              >
                {t("Use the {form}", { form: lowerFirst(t(topic.form.label)) })}
              </Link>
            </p>
          )}
        </div>

        <Reveal className="reveal-up mt-4">
          <form
            onSubmit={message.send}
            className="grid overflow-clip rounded-lg border border-line bg-white lg:grid-cols-[1.5fr_1fr]"
          >
            <div className="grid content-start gap-7 p-5 sm:p-9">
              <div>
                <label htmlFor={`${id}-question`} className="font-semibold">
                  {t("What would you like to know?")}
                </label>
                <textarea
                  ref={questionBox}
                  id={`${id}-question`}
                  aria-describedby={`${id}-question-help`}
                  rows={5}
                  maxLength={800}
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  className={`${fieldClass} py-2.5`}
                />
                {/* Ready-made lines for the details that help us reply. */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-muted">{t("Add to your message")}:</span>
                  {helpfulLines.map((label) => {
                    const added = question.includes(`${t(label)}: `);
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => addLine(label)}
                        className={`inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 font-medium transition-colors hover:border-leaf ${added ? "border-leaf bg-film text-leaf-dark" : "border-field bg-white"}`}
                      >
                        <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 shrink-0 fill-none stroke-current stroke-[2.5]">
                          <path d={added ? "m4 10.5 4 4L16 6" : "M10 4v12M4 10h12"} />
                        </svg>
                        {t(label)}
                      </button>
                    );
                  })}
                </div>
                <p id={`${id}-question-help`} className="mt-2 text-muted">
                  {t("Leave out anything you do not know. We will ask.")}
                </p>
              </div>
              <div className="grid gap-7 sm:grid-cols-2 sm:gap-5">
                <div>
                  <label htmlFor={`${id}-name`} className="font-semibold">
                    {t("Your name")}
                  </label>
                  <input
                    id={`${id}-name`}
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor={`${id}-location`} className="font-semibold">
                    {t("Where you are")}
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
                legend={t("How should we reply?")}
                name={`${id}-reply`}
                options={replyBy}
                value={reply}
                onChange={(value) => {
                  setReply(value);
                  setNumber("");
                }}
              />
              {reply && reply !== "WhatsApp" && (
                <div>
                  <label htmlFor={`${id}-number`} className="font-semibold">
                    {reply === "Email" ? t("Your email") : t("Your phone number")}
                  </label>
                  <input
                    key={reply}
                    id={`${id}-number`}
                    type={reply === "Email" ? "email" : "tel"}
                    autoComplete={reply === "Email" ? "email" : "tel"}
                    value={number}
                    onChange={(event) => setNumber(event.target.value)}
                    className={fieldClass}
                  />
                </div>
              )}
            </div>
            <MessagePanel
              {...message}
              detailsHref="#contact-details"
              hint={{
                whatsapp: "You can change the message and add photos in WhatsApp before you send it.",
                copy: "Copy this message, then send it to us with any photos.",
              }}
            />
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
