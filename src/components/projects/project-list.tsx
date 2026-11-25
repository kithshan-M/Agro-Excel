"use client";

import { useState } from "react";
import { fieldClass } from "@/components/ui/choices";
import { Container } from "@/components/ui/container";
import { projectKinds, type Project, type ProjectKind } from "@/data/projects";
import { ProjectCard } from "./project-card";

export function ProjectList({ projects }: { projects: Project[] }) {
  const [kind, setKind] = useState<ProjectKind | "">("");
  const [district, setDistrict] = useState("");

  const kinds = projectKinds.filter((name) =>
    projects.some((project) => project.kinds.includes(name)),
  );
  const districts = [...new Set(projects.map((project) => project.district))].sort();
  const inDistrict = projects.filter((project) => !district || project.district === district);
  const shown = inDistrict.filter((project) => !kind || project.kinds.includes(kind));
  const filtered = Boolean(kind || district);

  function clear() {
    setKind("");
    setDistrict("");
  }

  const chip =
    "min-h-11 shrink-0 cursor-pointer whitespace-nowrap rounded-md border border-field bg-white px-4 font-medium transition-colors hover:border-leaf aria-pressed:border-leaf aria-pressed:bg-leaf aria-pressed:text-white";

  return (
    <section
      id="project-list"
      aria-labelledby="project-list-title"
      className="scroll-mt-4 py-12 md:py-16"
    >
      <Container>
        <h2 id="project-list-title" className="sr-only">
          Projects
        </h2>
        {(kinds.length > 1 || districts.length > 1) && (
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            {kinds.length > 1 && (
              <div role="group" aria-labelledby="project-kind" className="min-w-0">
                <p id="project-kind" className="font-semibold">
                  Kind of work
                </p>
                {/* One sideways-scrolling row on phones. */}
                <div className="-mx-4 mt-1 flex gap-2.5 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
                  <button type="button" aria-pressed={kind === ""} onClick={() => setKind("")} className={chip}>
                    All
                  </button>
                  {kinds.map((name) => (
                    <button
                      key={name}
                      type="button"
                      aria-pressed={kind === name}
                      onClick={() => setKind(kind === name ? "" : name)}
                      className={chip}
                    >
                      {name}{" "}
                      <span className="opacity-75">
                        ({inDistrict.filter((project) => project.kinds.includes(name)).length})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {districts.length > 1 && (
              <div className="shrink-0 sm:w-56">
                <label htmlFor="project-district" className="font-semibold">
                  District
                </label>
                <select
                  id="project-district"
                  value={district}
                  onChange={(event) => setDistrict(event.target.value)}
                  className={fieldClass}
                >
                  <option value="">All districts</option>
                  {districts.map((name) => (
                    <option key={name}>{name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
        <div className="mt-5 flex min-h-11 flex-wrap items-center gap-x-4 border-t border-line pt-3">
          <p role="status" className="text-muted">
            {filtered
              ? `Showing ${shown.length} of ${projects.length} projects`
              : `${projects.length} ${projects.length === 1 ? "project" : "projects"}`}
          </p>
          {filtered && (
            <button
              type="button"
              onClick={clear}
              className="min-h-11 cursor-pointer font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
            >
              Clear filters
            </button>
          )}
        </div>
        {shown.length > 0 ? (
          <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((project, index) => {
              const wide = !filtered && index === 0;
              return (
                <li key={project.slug} className={wide ? "sm:col-span-full" : ""}>
                  <ProjectCard project={project} wide={wide} />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-4 rounded-lg border border-line bg-white p-8 text-center">
            <p className="text-xl font-semibold">No projects match</p>
            <p className="mt-2 text-muted">Try another district or kind of work.</p>
          </div>
        )}
      </Container>
    </section>
  );
}
