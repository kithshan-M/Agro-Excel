import Link from "next/link";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { ProjectKind } from "@/data/projects";
import { projects, projectsOf } from "@/lib/projects";
import { ProjectCard } from "./project-card";

/** Up to three projects. Hidden while there are none of these kinds. */
export function ProjectPreview({
  title = "Our projects",
  kinds,
  className = "",
}: {
  title?: string;
  kinds?: ProjectKind[];
  className?: string;
}) {
  const shown = projectsOf(kinds).slice(0, 3);
  if (shown.length === 0) return null;

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading title={title} text="Work we have finished for other growers." />
          <Link
            href="/projects"
            className="inline-flex min-h-12 shrink-0 items-center rounded-md border border-leaf px-6 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-white"
          >
            {projects.length === 1 ? "See projects" : `See all ${projects.length} projects`}
          </Link>
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project, index) => (
            <Reveal as="li" key={project.slug} index={index} className="reveal-up">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
