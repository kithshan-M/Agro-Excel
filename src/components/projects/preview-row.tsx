"use client";

import { useT } from "@/i18n/context";
import { Link } from "@/components/ui/link";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./project-card";

export function PreviewRow({
  title,
  found,
  href,
  className,
}: {
  title: string;
  found: Project[];
  href: string;
  className: string;
}) {
  const t = useT();
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading title={t(title)} text={t("Work we have finished for other growers.")} />
          <Link
            href={href}
            className="inline-flex min-h-12 shrink-0 items-center rounded-md border border-leaf px-6 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-white"
          >
            {t("See all projects")}
          </Link>
        </div>
        {/* Phones swipe sideways through them, where a slide-up would make the row scroll up and down. */}
        <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {found.map((project, index) => {
            const wide = found.length === 1;
            return (
              <Reveal as="li" key={project.slug} index={index} className={`reveal-up shrink-0 snap-center max-sm:transform-none! max-sm:opacity-100! ${wide ? "w-full sm:col-span-full" : "w-[86%] sm:w-auto"}`}>
                <ProjectCard project={project} wide={wide} />
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
