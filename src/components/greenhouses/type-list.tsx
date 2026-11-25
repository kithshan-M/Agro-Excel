"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { ChipRow, TypeTabs } from "@/components/sections/type-tabs";
import { Container } from "@/components/ui/container";
import { greenhouseGoals, greenhouseTypes } from "@/data/greenhouses";
import { useQuote } from "./quote-context";
import { TypeTable } from "./type-table";

type GreenhouseType = (typeof greenhouseTypes)[number];
/** "a", "a or b", "a, b or c" */
const either = (names: string[]) =>
  names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} or ${names.at(-1)}`;
const crops = [...new Set(greenhouseTypes.flatMap((type) => type.crops))];
/** Choosing one of these takes back the other. */
const sizes = ["Small plot", "Large area"];

/** Choose a crop and what matters, and see how many wishes each type meets. */
export function TypeList() {
  const { setType, crop, setCrop } = useQuote();
  const [growing, setGrowing] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [active, setActive] = useState(0);

  const wishes = (grow: string, list: string[]) => [
    ...(grow ? [{ label: grow, met: (type: GreenhouseType) => type.crops.includes(grow) }] : []),
    ...list.map((goal) => ({ label: goal, met: (type: GreenhouseType) => type.goals.includes(goal) })),
  ];
  const all = wishes(growing, goals);
  const score = (type: GreenhouseType, list = all) => list.filter((wish) => wish.met(type)).length;
  const best = Math.max(...greenhouseTypes.map((type) => score(type)));
  const winners = all.length > 0 && best > 0 ? greenhouseTypes.filter((type) => score(type) === best) : [];

  /** Shows the best type, unless the open one is just as good. */
  function update(grow: string, list: string[]) {
    setGrowing(grow);
    setGoals(list);
    const next = wishes(grow, list);
    const scores = greenhouseTypes.map((type) => score(type, next));
    const top = Math.max(...scores);
    if (next.length > 0 && scores[active] < top) setActive(scores.indexOf(top));
  }

  function chooseCrop(item: string) {
    const next = item === growing ? "" : item;
    update(next, goals);
    // Keeps a crop the visitor typed in the form.
    if (crop === "" || crop === growing) setCrop(next);
  }

  function chooseGoal(item: string) {
    update(
      growing,
      goals.includes(item)
        ? goals.filter((goal) => goal !== item)
        : [...goals.filter((goal) => !(sizes.includes(item) && sizes.includes(goal))), item],
    );
  }

  return (
    <section id="types" className="scroll-mt-13 py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Which greenhouse suits you?"
          text="Choose a crop and everything that matters to you. We show how many of your wishes each type meets."
        />
        <div className="mt-7 grid grid-cols-1 gap-4">
          <ChipRow title="I want to grow" items={crops} chosen={[growing]} onChoose={chooseCrop} />
          <ChipRow title="What matters" items={greenhouseGoals} chosen={goals} onChoose={chooseGoal} />
        </div>
        <div className="mt-3 mb-4 flex min-h-11 flex-wrap items-center gap-x-4">
          <p role="status" className="font-medium">
            {all.length > 0 &&
              (winners.length === 0
                ? "None of these types meets that. Ask us and we will suggest one."
                : `Best match: ${either(winners.map((type) => type.name.toLowerCase()))}, ${best === all.length ? `meets ${all.length === 1 ? "your wish" : `all ${all.length} wishes`}` : `meets ${best} of ${all.length} wishes`}.`)}
          </p>
          {all.length > 0 && (
            <button
              type="button"
              onClick={() => {
                update("", []);
                if (crop === growing) setCrop("");
              }}
              className="min-h-11 cursor-pointer font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
            >
              Clear
            </button>
          )}
        </div>
        <TypeTabs
          id="greenhouse"
          label="Greenhouse types"
          tone="leaf"
          active={active}
          onChange={setActive}
          items={greenhouseTypes.map((type) => ({
            key: type.name.toLowerCase().replaceAll(" ", "-"),
            name: type.name,
            short: type.name.replace(" greenhouse", ""),
            best: winners.includes(type),
            image: type.image,
            badge:
              all.length === 0
                ? undefined
                : winners.includes(type)
                  ? "Best match"
                  : `${score(type)} of ${all.length}`,
          }))}
        >
          {greenhouseTypes.map((type) => (
            <div key={type.name}>
              <Image
                src={type.image}
                alt=""
                width={800}
                height={460}
                unoptimized
                className="aspect-[16/9] w-full object-cover lg:aspect-[2/1]"
              />
              <div className="grid gap-x-10 gap-y-6 p-5 sm:p-8 xl:grid-cols-[1fr_1.1fr]">
                <div>
                  <h3 className="text-2xl font-semibold sm:text-3xl">{type.name}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-muted">{type.text}</p>
                  <p className="mt-4">
                    <span className="font-semibold">Often used for:</span>{" "}
                    {type.crops.join(", ").toLowerCase()}
                  </p>
                  {all.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {all.map((wish) => {
                        const met = wish.met(type);
                        return (
                          <li
                            key={wish.label}
                            className={`flex items-center gap-2 rounded px-2.5 py-1 font-medium ${met ? "bg-film text-leaf-dark" : "bg-[#f8e3dd] text-[#7d2314]"}`}
                          >
                            <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 shrink-0 fill-none stroke-current stroke-[2.5]">
                              <path d={met ? "m3 10.5 4.5 4.5L17 5" : "m5 5 10 10M15 5 5 15"} />
                            </svg>
                            <span className="sr-only">{met ? "Meets: " : "Does not meet: "}</span>
                            {wish.label}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <dl className="self-start border-b border-line">
                  {[
                    ["Keeps rain off", type.rain],
                    ["Keeps insects out", type.insects],
                    ["Air movement", type.air],
                  ].map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[9.5rem_1fr] gap-3 border-t border-line py-3">
                      <dt className="text-muted">{label}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href="#quotation"
                  onClick={() => setType(type.name)}
                  aria-label={`Choose this type: ${type.name}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-leaf px-6 font-semibold text-white transition-colors hover:bg-leaf-dark sm:justify-self-start"
                >
                  Choose this type
                </a>
              </div>
            </div>
          ))}
        </TypeTabs>
        <TypeTable />
      </Container>
    </section>
  );
}
