"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { MessagePanel, useMessage } from "@/components/sections/message-panel";
import { SectionHeading } from "@/components/sections/section-heading";
import { Choices, fieldClass } from "@/components/ui/choices";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { contactTopics, replyBy } from "@/data/contact";

/** Builds a message from the answers. Nothing is stored or sent by this site. */
export function ContactForm() {
  const [topicKey, setTopicKey] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");
  const [number, setNumber] = useState("");
  const id = useId();

  const topic = contactTopics.find((item) => item.key === topicKey);
  const message = useMessage(
    [
      `Hello ${siteConfig.name}, I would like to ask about ${topic ? topic.about : "your services"}.`,
      ...(question.trim() ? [question.trim()] : []),
      ...[
        ["Name", name.trim()],
        ["Location", location.trim()],
        ["Please reply by", reply],
        [reply === "Email" ? "My email" : "My number", reply && reply !== "WhatsApp" ? number.trim() : ""],
      ]
        .filter(([, value]) => value)
        .map(([label, value]) => `${label}: ${value}`),
    ].join("\n"),
  );

  return (
    <section id="message" className="scroll-mt-4 py-16 md:py-24">
      <Container>
        <SectionHeading
          title="What is it about?"
          text="Choose one, then write to us here or use the longer form for that service."
        />
        <fieldset className="mt-8">
          <legend className="sr-only">Topic</legend>
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
                <span className="relative block h-28 overflow-hidden bg-[#fdf0c8]">
                  <Image
                    src={item.image}
                    alt=""
                    width={360}
                    height={260}
                    unoptimized
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </span>
                <span className="flex min-h-14 items-center justify-between gap-2 px-4 py-2 font-semibold peer-checked:bg-leaf peer-checked:text-white">
                  {item.name}
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
              Have a few details ready?
              <Link
                href={topic.form.href}
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
              >
                Use the {topic.form.label.charAt(0).toLowerCase() + topic.form.label.slice(1)}
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
                  What would you like to know?
                </label>
                <textarea
                  id={`${id}-question`}
                  rows={5}
                  maxLength={800}
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  className={`${fieldClass} py-2.5`}
                />
              </div>
              <div className="grid gap-7 sm:grid-cols-2 sm:gap-5">
                <div>
                  <label htmlFor={`${id}-name`} className="font-semibold">
                    Your name
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
                    Where you are
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
                legend="How should we reply?"
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
                    {reply === "Email" ? "Your email" : "Your phone number"}
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
