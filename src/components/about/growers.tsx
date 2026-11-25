"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { growers } from "@/data/about";

const total = growers.length;

/** Tabs: choose the kind of grower to see where to go next. */
export function Growers() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const grower = growers[active];

  function onKeyDown(event: React.KeyboardEvent) {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: total - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = (moves[event.key] + total) % total;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="growers" className="scroll-mt-4 py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Which grower are you?"
          text="Choose one and we will point you to the right place."
        />
        <Reveal className="reveal-up mt-8 overflow-hidden rounded-lg border border-line bg-white lg:grid lg:grid-cols-[1.45fr_1fr]">
          <div className="relative aspect-[720/520] overflow-hidden bg-[#cfe6ea] lg:aspect-auto lg:min-h-[30rem]">
            {growers.map((item, index) => (
              <Image
                key={item.key}
                src={`/images/about/${item.key}.svg`}
                alt=""
                width={720}
                height={520}
                unoptimized
                loading={index === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 size-full object-cover object-bottom transition-opacity duration-300 motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <div className="p-5 sm:p-8">
            <div
              role="tablist"
              aria-label="Kind of grower"
              onKeyDown={onKeyDown}
              className="grid grid-cols-2 gap-2.5"
            >
              {growers.map((item, index) => (
                <button
                  key={item.key}
                  ref={(element) => {
                    tabs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`grower-tab-${index}`}
                  aria-selected={active === index}
                  aria-controls="grower-panel"
                  tabIndex={active === index ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={`min-h-14 cursor-pointer rounded-md border px-3 text-left leading-tight font-semibold transition-colors sm:px-4 ${active === index ? "border-leaf bg-leaf text-white" : "border-field bg-white hover:border-leaf"}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div
              role="tabpanel"
              id="grower-panel"
              aria-labelledby={`grower-tab-${active}`}
              className="mt-7"
            >
              <h3 className="text-2xl font-bold">{grower.name}</h3>
              <p className="mt-1.5 text-lg text-muted lg:min-h-14">{grower.text}</p>
              <p className="mt-5 font-semibold">Good places to start</p>
              <ul className="mt-2 border-t border-line">
                {grower.links.map((link) => (
                  <li key={link.label} className="border-b border-line">
                    <Link
                      href={link.href}
                      className="group flex min-h-14 items-center justify-between gap-4 py-2 font-semibold text-leaf hover:text-leaf-dark"
                    >
                      <span className="underline-offset-4 group-hover:underline">
                        {link.label}
                      </span>
                      <svg
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="size-5 shrink-0 fill-none stroke-current stroke-2 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                      >
                        <path d="M3 10h13m-5-5 5 5-5 5" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
