import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Project } from "@/data/projects";
import { projectPhoto } from "./project-photo";

/** Stops the build with a clear message when a project has a mistake. */
export function checkProjects(projects: Project[]) {
  const seen = new Set<string>();

  for (const project of projects) {
    const where = `Project "${project.title}" in src/data/projects.ts`;
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(project.slug)) {
      throw new Error(`${where}: use only small letters, numbers and dashes in slug.`);
    }
    if (seen.has(project.slug)) throw new Error(`${where}: another project has the same slug.`);
    seen.add(project.slug);
    if (project.kinds.length === 0) throw new Error(`${where}: add at least one kind.`);
    if (project.photos.length === 0) throw new Error(`${where}: add at least one photo.`);

    const { compare } = project;
    for (const photo of [...project.photos, ...(compare ? [compare.before, compare.after] : [])]) {
      const { src } = projectPhoto(photo);
      if (!existsSync(join(process.cwd(), "public", `.${src}`))) {
        throw new Error(`${where}: photo not found at public${src}.`);
      }
    }
  }
}
