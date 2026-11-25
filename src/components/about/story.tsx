"use client";

import { useT } from "@/i18n/context";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { facts, story } from "@/data/about";

/** Hidden until story or facts are filled in src/data/about.ts. */
export function Story() {
  const t = useT();
  if (story.length === 0 && facts.length === 0) return null;

  return (
    <section className="border-t border-line py-16 md:py-24">
      <Container className="grid gap-8 lg:grid-cols-[1fr_1.7fr] lg:gap-12">
        <SectionHeading title={t("Our story")} />
        <Reveal className="reveal-up">
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed">
            {story.map((paragraph) => (
              <p key={paragraph}>{t(paragraph)}</p>
            ))}
          </div>
          {facts.length > 0 && (
            <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-6">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col-reverse">
                  <dt className="text-muted">{t(fact.label)}</dt>
                  <dd className="font-display text-3xl font-bold text-leaf">
                    {t(fact.value)}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
