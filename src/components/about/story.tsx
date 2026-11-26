"use client";

import { useT } from "@/i18n/context";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { facts, story, team, workPhotos } from "@/data/about";

/** Only in `npm run dev`: shows where the story, team and work photos go until they are filled in. */
export function AboutToFill() {
  const t = useT();
  const empty = story.length === 0 && facts.length === 0 && team.length === 0 && workPhotos.length === 0;
  if (process.env.NODE_ENV !== "development" || !empty) return null;

  return (
    <section className="border-t border-line py-12">
      <Container>
        <div className="rounded-lg border-2 border-dashed border-field bg-sun/15 p-6 sm:p-8">
          <p className="font-semibold">{t("Only you see this note.")}</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">{t("Your story and team go here")}</h2>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted">
            {t("Add how Agro Excel started, simple facts such as the year you began, the people customers will talk to and photos of your work in src/data/about.ts. Each part shows once it is filled in.")}
          </p>
        </div>
      </Container>
    </section>
  );
}

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
