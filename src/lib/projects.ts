import { navLinks } from "@/config/site";
import { projects as added, type Project, type ProjectKind } from "@/data/projects";
import { sampleProjects } from "@/data/sample-projects";

/** True only in `npm run dev`, while no real project has been added. */
export const showingSamples = process.env.NODE_ENV === "development" && added.length === 0;

/** Use this list, not the one in src/data. Server only, to keep pages small. */
export const projects: Project[] = showingSamples ? sampleProjects : added;

export const hasProjects = projects.length > 0;

/** Menu without the projects page while there are no projects. */
export const shownLinks = navLinks.filter(
  (link) => hasProjects || link.href !== "/projects",
);

export const projectsOf = (kinds?: ProjectKind[]) =>
  kinds
    ? projects.filter((project) => project.kinds.some((kind) => kinds.includes(kind)))
    : projects;
