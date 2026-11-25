"use client";

import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { irrigationPaths } from "@/data/irrigation";
import { useIrrigation } from "./irrigation-context";

const looks = [
  { panel: "bg-water text-white", tick: "stroke-sun", text: "text-white/85", button: "bg-sun text-ink hover:bg-white" },
  { panel: "bg-sun text-ink", tick: "stroke-water", text: "", button: "bg-ink text-white hover:bg-leaf-dark" },
];

export function Paths() {
  const { setNeed } = useIrrigation();

  return (
    <section id="irrigation-services" className="scroll-mt-13 py-16 md:py-24">
      <Container>
        <SectionHeading title="New systems, and the one you have" />
        <ul className="mt-8 grid gap-5 lg:grid-cols-2">
          {irrigationPaths.map((path, index) => {
            const look = looks[index];
            return (
              <Reveal as="li" key={path.need} index={index} className="reveal-up">
                <div className={`flex h-full flex-col rounded-lg p-6 sm:p-9 ${look.panel}`}>
                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {path.title}
                  </h3>
                  <p className={`mt-2 text-lg ${look.text}`}>{path.text}</p>
                  <ul className="mt-6 mb-8 space-y-3.5">
                    {path.points.map((point) => (
                      <li key={point} className="flex gap-3.5">
                        <svg
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          className={`mt-1 size-4 shrink-0 fill-none stroke-[3] ${look.tick}`}
                        >
                          <path d="m3 10.5 4.5 4.5L17 5" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#irrigation-ask"
                    onClick={() => setNeed(path.need)}
                    className={`mt-auto inline-flex min-h-12 items-center self-start rounded-md px-6 font-semibold transition-colors ${look.button}`}
                  >
                    {path.action}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
