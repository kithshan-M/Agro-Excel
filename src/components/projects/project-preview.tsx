import Link from "next/link";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { ProjectKind } from "@/data/projects";
import { projectsOf } from "@/lib/projects";
import { ProjectCard } from "./project-card";

/** Up to three projects. Hidden while there are none of these kinds. */
export function ProjectPreview({
  title = "Our projects",
  kinds,
  href = "/projects",
  className = "",
}: {
  title?: string;
  kinds?: ProjectKind[];
  href?: string;
  className?: string;
}) {
  const found = projectsOf(kinds);
  if (found.length === 0) return null;

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading title={title} text="Work we have finished for other growers." />
          <Link
            href={href}
            className="inline-flex min-h-12 shrink-0 items-center rounded-md border border-leaf px-6 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-white"
          >
            See all projects
          </Link>
        </div>
        {/* Phones swipe sideways through them. */}
        <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {found.slice(0, 3).map((project, index) => {
            const wide = found.length === 1;
            return (
              <Reveal as="li" key={project.slug} index={index} className={`reveal-up shrink-0 snap-center ${wide ? "w-full sm:col-span-full" : "w-[86%] sm:w-auto"}`}>
                <ProjectCard project={project} wide={wide} />
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
