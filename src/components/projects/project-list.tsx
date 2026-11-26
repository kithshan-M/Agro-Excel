"use client";

import { useHref, useT, useWhatsapp } from "@/i18n/context";
import { Container } from "@/components/ui/container";
import { districts, projectKinds, type Project } from "@/data/projects";
import { step } from "@/lib/motion";
import { noFilter, setProjectFilter, useProjectFilter, type ProjectFilter } from "@/lib/project-filter";
import { kindColours } from "./kind-tags";
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
  const t = useT();
  const to = useHref();
  const whatsappLink = useWhatsapp();
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

  const names = { kind: t(kind), district: t(district) };
  const title = t(
    kind
      ? district
        ? "{kind} projects in {district}"
        : "{kind} projects"
      : district
        ? "Projects in {district}"
        : "All projects",
    names,
  );
  const topic = kind
    ? district
      ? "{kind} in {district}"
      : "{kind}"
    : district
      ? "a project in {district}"
      : "a project";
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
              <div role="group" aria-label={t("Kind of work")} className="flex gap-2.5">
                <button type="button" aria-pressed={kind === ""} onClick={() => choose({ kind: "" })} className={`${control} ${kind === "" ? on : off}`}>
                  {t("All")}
                </button>
                {kinds.map((name) => (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={kind === name}
                    onClick={() => choose({ kind: kind === name ? "" : name })}
                    className={`${control} inline-flex items-center gap-2 ${kind === name ? on : off}`}
                  >
                    {/* Same colour as the tag on the cards. */}
                    <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-full ${kindColours[name].dot} ${kind === name ? "ring-2 ring-white" : ""}`} />
                    {t(name)}{" "}
                    <span className="opacity-75">
                      ({inDistrict.filter((project) => project.kinds.includes(name)).length})
                    </span>
                  </button>
                ))}
              </div>
            )}
            <select
              aria-label={t("District")}
              value={district}
              onChange={(event) => choose({ district: event.target.value as ProjectFilter["district"] })}
              className={`${control} order-first w-40 lg:order-last lg:ml-auto lg:w-52 ${district ? "border-leaf bg-film text-leaf-dark" : off}`}
            >
              <option value="">{t("All districts")}</option>
              <optgroup label={t("Where we have worked")}>
                {worked.map((name) => (
                  <option key={name} value={name}>
                    {t(name)} ({count(name)})
                  </option>
                ))}
              </optgroup>
              <optgroup label={t("Other districts")}>
                {others.map((name) => (
                  <option key={name}>{t(name)}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </Container>
      </div>

      <Container className="pt-8 pb-16 md:pt-10 md:pb-24">
        <div className="flex min-h-11 flex-wrap items-center gap-x-5 gap-y-1">
          <h2 id="project-list-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t(title)}
          </h2>
          <p role="status" className="text-muted">
            {filtered
              ? t("{count} of {total}", { count: shown.length, total: projects.length })
              : t(projects.length === 1 ? "{count} project" : "{count} projects", { count: projects.length })}
          </p>
          {filtered && (
            <button
              type="button"
              onClick={() => choose(noFilter)}
              className="min-h-11 cursor-pointer font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
            >
              {t("Clear filters")}
            </button>
          )}
        </div>
        {shown.length > 0 ? (
          <ul key={title} className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {shown.map((project, index) => {
              // The newest project, or an only result, gets the whole row.
              const wide = shown.length === 1 || (!filtered && index === 0);
              return (
                <li key={project.slug} style={step(index % 3)} className={`enter ${wide ? "sm:col-span-full" : ""}`}>
                  <ProjectCard project={project} wide={wide} rowOnPhones />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="enter mt-5 rounded-lg border border-line bg-white p-8 sm:p-12">
            <p className="font-display text-2xl font-semibold">{t("No projects to show here yet")}</p>
            <p className="mt-2 max-w-xl text-lg leading-relaxed text-muted">
              {t("Tell us what you have in mind and we will talk it through, or look at our other projects.")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappLink(topic, { kind: names.kind.toLowerCase(), district: names.district }) ?? to("/contact")}
                className="inline-flex min-h-12 items-center rounded-md bg-leaf px-6 font-semibold text-white transition-colors hover:bg-leaf-dark"
              >
                {district ? t("Ask us about {district}", names) : t("Ask us")}
              </a>
              <button
                type="button"
                onClick={() => choose(noFilter)}
                className="min-h-12 cursor-pointer rounded-md border border-leaf px-6 font-semibold text-leaf transition-colors hover:bg-film"
              >
                {t("See all projects")}
              </button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
