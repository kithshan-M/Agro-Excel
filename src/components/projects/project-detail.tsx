"use client";

import { Compare } from "@/components/projects/compare";
import { Gallery } from "@/components/projects/gallery";
import { KindTags } from "@/components/projects/kind-tags";
import { ProjectCard } from "@/components/projects/project-card";
import { FactIcon, projectFacts } from "@/components/projects/project-facts";
import { ShareButton } from "@/components/projects/share-button";
import { ContactCta } from "@/components/sections/contact-cta";
import { SectionHeading } from "@/components/sections/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Reveal } from "@/components/ui/reveal";
import type { Project } from "@/data/projects";
import { useHref, useT, useWhatsapp } from "@/i18n/context";
import { step } from "@/lib/motion";

const topic = 'a project like "{title}"';

export function ProjectDetail({
  project,
  previous,
  next,
  others,
}: {
  project: Project;
  previous?: Project;
  next?: Project;
  others: Project[];
}) {
  const t = useT();
  const to = useHref();
  const vars = { title: t(project.title) };
  const link = useWhatsapp()(topic, vars);

  return (
    <>
      <article>
        <Container className="pt-3 pb-12 md:pb-16">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-leaf underline-offset-4 hover:underline"
            >
              <Arrow back />
              {t("All projects")}
            </Link>
            <ShareButton title={t(project.title)} />
          </div>
          <div className="mt-4 mb-6 md:mb-8">
            <div className="enter">
              <KindTags kinds={project.kinds} />
            </div>
            <h1
              className="enter mt-3 max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl"
              style={step(1)}
            >
              {t(project.title)}
            </h1>
          </div>
          <div className="enter" style={step(2)}>
            <Gallery photos={project.photos} />
          </div>

          <div className="mt-8 grid gap-x-14 gap-y-10 md:mt-12 lg:grid-cols-[1fr_22rem] lg:grid-rows-[auto_1fr]">
            <p className="text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">{t(project.summary)}</p>
            <aside aria-label={t("About this project")} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="rounded-lg border border-line bg-white p-6 lg:sticky lg:top-24">
                <dl>
                  {projectFacts(project, t).map(([name, value]) => (
                    <div key={name} className="flex gap-3 border-b border-line py-3 first:pt-0 max-md:last:border-0 max-md:last:pb-0">
                      <span className="pt-0.5">
                        <FactIcon name={name} />
                      </span>
                      <div>
                        <dt className="text-sm text-muted">{t(name)}</dt>
                        <dd className="font-semibold">{t(value)}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                {/* Phones have this button in a bar at the bottom. */}
                <div className="hidden md:block">
                  <p className="mt-5 mb-4">{t("Thinking of something similar? Tell us about your land.")}</p>
                  <ButtonLink href={link ?? "/contact#message"} variant="dark">
                    {t("Ask about a project like this")}
                  </ButtonLink>
                </div>
              </div>
            </aside>
            {(project.work?.length || project.words) && (
              <div className="grid content-start gap-10">
                {project.work && project.work.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("What we did")}</h2>
                    <ol className="mt-6">
                      {project.work.map((item, index) => (
                        <Reveal as="li" key={item} index={index} className="group reveal-up relative flex gap-4 pb-6 last:pb-0">
                          {/* Line to the next step. */}
                          <span aria-hidden="true" className="absolute top-9 bottom-0 left-[1.0625rem] w-0.5 bg-line group-last:hidden" />
                          <span
                            aria-hidden="true"
                            className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-sun font-display font-bold"
                          >
                            {index + 1}
                          </span>
                          <span className="pt-1 text-lg">{t(item)}</span>
                        </Reveal>
                      ))}
                    </ol>
                  </section>
                )}
                {project.words && (
                  <Reveal className="reveal-up">
                    <figure className="rounded-lg bg-leaf-dark p-7 text-white sm:p-10">
                      <blockquote className="font-display text-2xl leading-snug font-semibold sm:text-3xl">
                        “{t(project.words.text)}”
                      </blockquote>
                      <figcaption className="mt-5 text-white/80">{t(project.words.name)}</figcaption>
                    </figure>
                  </Reveal>
                )}
              </div>
            )}
          </div>
        </Container>

        {project.compare && (
          <section className="bg-film py-16 md:py-20">
            <Container>
              <SectionHeading title="Before and after" text="Drag across the picture to compare." />
              <Compare {...project.compare} />
            </Container>
          </section>
        )}

        {(previous || next) && (
          <nav aria-label={t("Other projects")} className="border-y border-line">
            <Container className="flex justify-between gap-8">
              {previous && <Step project={previous} label="Previous" back />}
              {next && (
                <div className="ml-auto text-right">
                  <Step project={next} label="Next" />
                </div>
              )}
            </Container>
          </nav>
        )}

        {/* Phone only. It stops above the sections that follow. */}
        <div className="sticky bottom-0 z-[6] border-t border-line bg-paper px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
          <a
            href={link ?? to("/contact#message")}
            className="flex min-h-12 items-center justify-center rounded-md bg-sun font-semibold text-ink"
          >
            {t("Ask about a project like this")}
          </a>
        </div>
      </article>

      {others.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <SectionHeading title="More projects" />
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((other, index) => (
                <Reveal as="li" key={other.slug} index={index} className="reveal-up">
                  <ProjectCard project={other} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      )}
      <ContactCta topic={topic} vars={vars} />
    </>
  );
}

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={`size-4 shrink-0 fill-none stroke-current stroke-[2.5] ${back ? "rotate-180" : ""}`}>
      <path d="M3 10h13m-5-5 5 5-5 5" />
    </svg>
  );
}

function Step({ project, label, back = false }: { project: Project; label: string; back?: boolean }) {
  const t = useT();
  return (
    <Link href={`/projects/${project.slug}`} className="group block py-6">
      <span className={`flex items-center gap-2 text-muted ${back ? "" : "justify-end"}`}>
        {back && <Arrow back />}
        {t(label)}
        {!back && <Arrow />}
      </span>
      <span className="mt-1 block text-lg font-semibold transition-colors group-hover:text-leaf">
        {t(project.title)}
      </span>
    </Link>
  );
}
