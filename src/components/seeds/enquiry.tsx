"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { MessagePanel, useMessage } from "@/components/sections/message-panel";
import { SectionHeading } from "@/components/sections/section-heading";
import { Choices, fieldClass } from "@/components/ui/choices";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { growingPlaces, seedImage, seeds } from "@/data/seeds";
import { clearList, setPacks, useSeedList } from "@/lib/seed-list";

const packs = (count: number) => `${count} ${count === 1 ? "pack" : "packs"}`;

export function Enquiry() {
  const list = useSeedList();
  const [location, setLocation] = useState("");
  const [place, setPlace] = useState("");
  const id = useId();

  const chosen = seeds.filter((seed) => list[seed.slug]);
  const message = useMessage(
    [
      `Hello ${siteConfig.name}, please send me prices and stock for these seeds:`,
      ...chosen.map(
        (seed) =>
          `- ${seed.name}${seed.localName ? ` (${seed.localName})` : ""}: ${packs(list[seed.slug])}`,
      ),
      ...(location.trim() ? [`Location: ${location.trim()}`] : []),
      ...(place ? [`Growing in: ${place}`] : []),
    ].join("\n"),
  );

  return (
    <section id="list" className="scroll-mt-4 bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Your seed list"
          text="Check your list, then send it to us for varieties, prices and stock."
        />
        {chosen.length === 0 ? (
          <div className="mt-10 rounded-lg border border-line bg-white p-8 text-center sm:p-12">
            <p className="font-display text-xl font-semibold">Your list is empty</p>
            <p className="mt-2 mb-6 text-muted">Add the seeds you want to grow.</p>
            <a
              href="#catalogue"
              className="inline-flex min-h-12 items-center rounded-md bg-leaf px-6 font-semibold text-white transition-colors hover:bg-leaf-dark"
            >
              Browse seeds
            </a>
          </div>
        ) : (
          <form
            onSubmit={message.send}
            className="mt-10 grid overflow-clip rounded-lg border border-line bg-white lg:grid-cols-[1.5fr_1fr]"
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
                        <p className="font-semibold">{seed.name}</p>
                        <p className="text-muted">{seed.localName}</p>
                      </div>
                      <div
                        role="group"
                        aria-label={`Packs of ${seed.name}`}
                        className="flex items-center rounded-md border border-field"
                      >
                        <Step
                          label={`One pack less of ${seed.name}`}
                          d="M4 10h12"
                          onClick={() => setPacks(seed.slug, count - 1)}
                        />
                        <span aria-live="polite" className="min-w-16 text-center">
                          {packs(count)}
                        </span>
                        <Step
                          label={`One pack more of ${seed.name}`}
                          d="M10 4v12M4 10h12"
                          onClick={() => setPacks(seed.slug, count + 1)}
                        />
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${seed.name}`}
                        onClick={() => setPacks(seed.slug, 0)}
                        className="min-h-11 cursor-pointer px-1 font-semibold text-muted underline underline-offset-4 hover:text-ink"
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="-mt-3 flex flex-wrap items-center justify-between gap-x-4 text-muted">
                <p>Your list is saved on this device.</p>
                <button
                  type="button"
                  onClick={clearList}
                  className="min-h-11 cursor-pointer px-1 font-semibold underline underline-offset-4 hover:text-ink"
                >
                  Clear list
                </button>
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
              <Choices
                legend="Where will you grow them?"
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

function Step({
  label,
  d,
  onClick,
}: {
  label: string;
  d: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-11 cursor-pointer items-center justify-center rounded-md text-leaf hover:bg-film"
    >
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="size-4 fill-none stroke-current stroke-[2.5]"
      >
        <path d={d} />
      </svg>
    </button>
  );
}
