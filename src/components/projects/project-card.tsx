"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { Link } from "@/components/ui/link";
import type { Project } from "@/data/projects";
import { projectPhoto } from "@/lib/project-photo";
import { KindTags } from "./kind-tags";
import { FactIcon, projectFacts } from "./project-facts";

const badge = "rounded bg-ink/85 px-2.5 py-1 text-sm font-semibold text-white";

/**
 * wide puts the photo beside the text on large screens. rowOnPhones turns the card into a
 * short row on phones, picture on the left, so a list of them is quick to scroll through.
 */
export function ProjectCard({
  project,
  wide = false,
  rowOnPhones = false,
}: {
  project: Project;
  wide?: boolean;
  rowOnPhones?: boolean;
}) {
  const t = useT();
  const row = rowOnPhones && !wide;
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition-[border-color,box-shadow] duration-300 focus-within:border-leaf hover:border-leaf hover:shadow-[0_8px_28px_rgb(19_37_29/0.12)] ${wide ? "lg:grid lg:grid-cols-[1.55fr_1fr]" : ""} ${row ? "max-sm:flex-row" : ""}`}
    >
      <div
        className={`relative overflow-hidden bg-film ${wide ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:min-h-104" : "aspect-[4/3]"} ${row ? "max-sm:aspect-auto max-sm:min-h-36 max-sm:w-[36%] max-sm:shrink-0" : ""}`}
      >
        <Image
          {...projectPhoto(project.photos[0])}
          alt=""
          fill
          loading={wide ? "eager" : "lazy"}
          sizes={wide ? "(min-width: 1024px) 680px, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
        <div className={`absolute top-3 left-3 ${row ? "max-sm:hidden" : ""}`}>
          <KindTags kinds={project.kinds} />
        </div>
        {(project.photos.length > 1 || project.compare) && (
          <ul className={`absolute right-3 bottom-3 flex gap-2 ${row ? "max-sm:hidden" : ""}`}>
            {project.compare && <li className={badge}>{t("Before and after")}</li>}
            {project.photos.length > 1 && <li className={badge}>{t("{count} photos", { count: project.photos.length })}</li>}
          </ul>
        )}
      </div>
      <div className={`flex min-w-0 flex-1 flex-col p-5 ${wide ? "sm:p-8 lg:justify-center" : ""} ${row ? "max-sm:p-4" : ""}`}>
        {/* On phone rows the picture is too small to carry the tags. */}
        {row && (
          <div className="mb-2 sm:hidden">
            <KindTags kinds={project.kinds} small />
          </div>
        )}
        <h3
          className={`font-bold tracking-tight ${wide ? "text-2xl sm:text-3xl" : "text-xl"} ${row ? "max-sm:text-lg max-sm:leading-snug" : ""}`}
        >
          {/* The link covers the whole card. */}
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-leaf"
          >
            {t(project.title)}
          </Link>
        </h3>
        <p
          className={
            wide
              ? "mt-3 text-lg leading-relaxed text-muted"
              : `mt-2 line-clamp-2 leading-relaxed text-muted ${row ? "max-sm:hidden" : ""}`
          }
        >
          {t(project.summary)}
        </p>
        <ul
          className={`flex flex-wrap gap-x-5 gap-y-2 ${wide ? "mt-5" : "mt-3 mb-5"} ${row ? "max-sm:mt-2 max-sm:mb-3 max-sm:gap-x-3 max-sm:gap-y-1 max-sm:text-sm" : ""}`}
        >
          {projectFacts(project, t).map(([name, value]) => (
            <li key={name} className="flex min-w-0 items-center gap-2">
              <FactIcon name={name} />
              <span className="min-w-0">
                <span className="sr-only">{t(name)}: </span>
                {t(value)}
              </span>
            </li>
          ))}
        </ul>
        <p
          aria-hidden="true"
          className={`flex items-center gap-2 border-t border-line pt-4 font-semibold text-leaf ${wide ? "mt-7" : "mt-auto"} ${row ? "max-sm:border-t-0 max-sm:pt-0" : ""}`}
        >
          {t("View project")}
          <svg
            viewBox="0 0 20 20"
            className="size-4 fill-none stroke-current stroke-[2.5] transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
          >
            <path d="M3 10h13m-5-5 5 5-5 5" />
          </svg>
        </p>
      </div>
    </article>
  );
}
