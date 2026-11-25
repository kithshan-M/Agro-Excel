"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { greenhouseGoals, greenhouseTypes } from "@/data/greenhouses";
import { useQuote } from "./quote-context";
import { TypeTable } from "./type-table";

export function TypeList() {
  const { setType } = useQuote();
  const [goal, setGoal] = useState("");

  const matches = (type: (typeof greenhouseTypes)[number]) =>
    !goal || type.goals.includes(goal);
  // Matching types come first. Phones hide the rest until "Show all".
  const sorted = [
    ...greenhouseTypes.filter(matches),
    ...greenhouseTypes.filter((type) => !matches(type)),
  ];
  const count = greenhouseTypes.filter(matches).length;

  return (
    <section id="types" className="scroll-mt-13 py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Greenhouse types"
          text="What matters most to you? Pick one to see which types suit."
        />
        <div
          role="group"
          aria-label="What matters most"
          className="mt-6 flex flex-wrap gap-2.5"
        >
          {greenhouseGoals.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={goal === item}
              onClick={() => setGoal(goal === item ? "" : item)}
              className="min-h-11 cursor-pointer rounded-md border border-field bg-white px-4 font-medium transition-colors hover:border-leaf aria-pressed:border-leaf aria-pressed:bg-leaf aria-pressed:text-white"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-2 flex min-h-11 flex-wrap items-center gap-x-4">
          <p role="status" className="text-muted">
            {goal &&
              `${count} of ${greenhouseTypes.length} types suit: ${goal.toLowerCase()}.`}
          </p>
          {goal && (
            <button
              type="button"
              onClick={() => setGoal("")}
              className="min-h-11 cursor-pointer font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
            >
              Show all
            </button>
          )}
        </div>
        <ul className="mt-3 grid gap-6 md:grid-cols-2 md:gap-7">
          {sorted.map((type, index) => {
            const match = matches(type);
            return (
              <Reveal
                as="li"
                key={type.name}
                index={index % 2}
                className={`reveal-up group ${match ? "" : "max-md:hidden"}`}
              >
                <div
                  className={`flex h-full flex-col overflow-hidden rounded-lg border bg-white transition duration-300 motion-reduce:transition-none ${goal && match ? "border-leaf ring-1 ring-leaf" : "border-line"} ${match ? "" : "opacity-45"}`}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={type.image}
                      alt=""
                      width={800}
                      height={460}
                      unoptimized
                      className="aspect-[800/460] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                    />
                    {goal && match && (
                      <span className="absolute top-4 left-4 rounded-md bg-leaf px-3 py-1 font-semibold text-white">
                        Good match
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-7">
                    <h3 className="text-2xl font-semibold">{type.name}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{type.text}</p>
                    <dl className="mt-4 mb-5 divide-y divide-line border-y border-line">
                      <Fact label="Suits" value={list(type.crops)} always />
                      <Fact label="Keeps rain off" value={type.rain} />
                      <Fact label="Keeps insects out" value={type.insects} />
                      <Fact label="Air movement" value={type.air} />
                    </dl>
                    <a
                      href="#quotation"
                      onClick={() => setType(type.name)}
                      aria-label={`Choose this type: ${type.name}`}
                      className="mt-auto inline-flex min-h-12 items-center justify-center rounded-md border border-leaf px-5 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-white sm:self-start"
                    >
                      Choose this type
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
        <TypeTable />
      </Container>
    </section>
  );
}

/** "Tomato, cucumber, bell pepper": only the first word keeps its capital. */
function list(items: string[]) {
  const text = items.join(", ").toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** The comparison facts show on phones only. Larger screens have the table. */
function Fact({
  label,
  value,
  always = false,
}: {
  label: string;
  value: string;
  always?: boolean;
}) {
  return (
    <div className={`grid grid-cols-[9.5rem_1fr] gap-3 py-2.5 ${always ? "" : "md:hidden"}`}>
      <dt className="font-semibold">{label}</dt>
      <dd className="text-muted">{value}</dd>
    </div>
  );
}
