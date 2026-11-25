"use client";

import { Container } from "@/components/ui/container";
import { districts, projectKinds, type Project } from "@/data/projects";
import { step } from "@/lib/motion";
import { noFilter, setProjectFilter, useProjectFilter, type ProjectFilter } from "@/lib/project-filter";
import { whatsappLink } from "@/lib/whatsapp";
import { ProjectCard } from "./project-card";

export const showProjectList = (behavior?: ScrollBehavior) =>
  document.getElementById("project-list")?.scrollIntoView({ behavior });

export function FilteredProjects({ projects }: { projects: Project[] }) {
  return <ProjectList projects={projects} filter={useProjectFilter()} />;
}

export function ProjectList({
  projects,
  filter = noFilter,
}: {
  projects: Project[];
  filter?: ProjectFilter;
}) {
  const { kind, district } = filter;
  const kinds = projectKinds.filter((name) =>
    projects.some((project) => project.kinds.includes(name)),
  );
  const inDistrict = projects.filter((project) => !district || project.district === district);
  const shown = inDistrict.filter((project) => !kind || project.kinds.includes(kind));
  const filtered = Boolean(kind || district);
  const count = (name: string) =>
    projects.filter((project) => project.district === name && (!kind || project.kinds.includes(kind))).length;
  const worked = districts.filter((name) => projects.some((project) => project.district === name));
  const others = districts.filter((name) => !worked.includes(name));

  function choose(change: Partial<ProjectFilter>) {
    setProjectFilter({ ...filter, ...change });
    // A shorter list could leave the visitor at the footer.
    const list = document.getElementById("project-list");
    if (list && list.getBoundingClientRect().top < 0) showProjectList("instant");
  }

  const title = `${kind || (district ? "Projects" : "All projects")}${kind ? " projects" : ""}${district ? ` in ${district}` : ""}`;
  const control =
    "min-h-11 shrink-0 cursor-pointer whitespace-nowrap rounded-md border px-4 font-medium transition-colors hover:border-leaf";
  const off = "border-field bg-white";
  const on = "border-leaf bg-leaf text-white";

  return (
    <section id="project-list" aria-labelledby="project-list-title" className="scroll-mt-16">
      <div className="sticky top-[var(--header-offset,0px)] z-[5] border-b border-line bg-paper transition-[top] duration-300 motion-reduce:transition-none">
        <Container>
          {/* One sideways-scrolling row on phones. */}
          <div className="-mx-4 flex items-center gap-2.5 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:px-1 lg:-ml-1">
            {kinds.length > 1 && (
              <div role="group" aria-label="Kind of work" className="flex gap-2.5">
                <button type="button" aria-pressed={kind === ""} onClick={() => choose({ kind: "" })} className={`${control} ${kind === "" ? on : off}`}>
                  All
                </button>
                {kinds.map((name) => (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={kind === name}
                    onClick={() => choose({ kind: kind === name ? "" : name })}
                    className={`${control} ${kind === name ? on : off}`}
                  >
                    {name}{" "}
                    <span className="opacity-75">
                      ({inDistrict.filter((project) => project.kinds.includes(name)).length})
                    </span>
                  </button>
                ))}
              </div>
            )}
            <select
              aria-label="District"
              value={district}
              onChange={(event) => choose({ district: event.target.value as ProjectFilter["district"] })}
              className={`${control} order-first w-40 lg:order-last lg:ml-auto lg:w-52 ${district ? "border-leaf bg-film text-leaf-dark" : off}`}
            >
              <option value="">All districts</option>
              <optgroup label="Where we have worked">
                {worked.map((name) => (
                  <option key={name} value={name}>
                    {name} ({count(name)})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Other districts">
                {others.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </Container>
      </div>

      <Container className="pt-8 pb-16 md:pt-10 md:pb-24">
        <div className="flex min-h-11 flex-wrap items-center gap-x-5 gap-y-1">
          <h2 id="project-list-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <p role="status" className="text-muted">
            {filtered
              ? `${shown.length} of ${projects.length}`
              : `${projects.length} ${projects.length === 1 ? "project" : "projects"}`}
          </p>
          {filtered && (
            <button
              type="button"
              onClick={() => choose(noFilter)}
              className="min-h-11 cursor-pointer font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
            >
              Clear filters
            </button>
          )}
        </div>
        {shown.length > 0 ? (
          <ul key={title} className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((project, index) => {
              // The newest project, or an only result, gets the whole row.
              const wide = shown.length === 1 || (!filtered && index === 0);
              return (
                <li key={project.slug} style={step(index % 3)} className={`enter ${wide ? "sm:col-span-full" : ""}`}>
                  <ProjectCard project={project} wide={wide} />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="enter mt-5 rounded-lg border border-line bg-white p-8 sm:p-12">
            <p className="font-display text-2xl font-semibold">No projects to show here yet</p>
            <p className="mt-2 max-w-xl text-lg leading-relaxed text-muted">
              Tell us what you have in mind{district ? ` in ${district}` : ""} and we will talk it
              through, or look at our other projects.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappLink(`${kind ? kind.toLowerCase() : "a project"}${district ? ` in ${district}` : ""}`) ?? "/contact"}
                className="inline-flex min-h-12 items-center rounded-md bg-leaf px-6 font-semibold text-white transition-colors hover:bg-leaf-dark"
              >
                Ask us{district ? ` about ${district}` : ""}
              </a>
              <button
                type="button"
                onClick={() => choose(noFilter)}
                className="min-h-12 cursor-pointer rounded-md border border-leaf px-6 font-semibold text-leaf transition-colors hover:bg-film"
              >
                See all projects
              </button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
