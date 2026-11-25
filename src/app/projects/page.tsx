import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectsHero } from "@/components/projects/hero";
import { ProjectList } from "@/components/projects/project-list";
import { SampleNote } from "@/components/projects/sample-note";
import { ContactCta } from "@/components/sections/contact-cta";
import { projectsIntro } from "@/data/projects-intro";
import { hasProjects, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: projectsIntro.title,
  description: projectsIntro.text,
};

export default function ProjectsPage() {
  if (!hasProjects) notFound();

  return (
    <>
      <SampleNote />
      <ProjectsHero />
      <ProjectList projects={projects} />
      <ContactCta topic="a project" />
    </>
  );
}
