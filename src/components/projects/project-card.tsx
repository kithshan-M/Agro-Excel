import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { projectPhoto } from "@/lib/project-photo";
import { KindTags } from "./kind-tags";
import { FactIcon, projectFacts } from "./project-facts";

const badge = "rounded bg-ink/85 px-2.5 py-1 text-sm font-semibold text-white";

/** wide puts the photo beside the text on large screens. */
export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition-[border-color,box-shadow] duration-300 focus-within:border-leaf hover:border-leaf hover:shadow-[0_8px_28px_rgb(19_37_29/0.12)] ${wide ? "lg:grid lg:grid-cols-[1.55fr_1fr]" : ""}`}
    >
      <div
        className={`relative overflow-hidden bg-film ${wide ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:min-h-104" : "aspect-[4/3]"}`}
      >
        <Image
          {...projectPhoto(project.photos[0])}
          alt=""
          fill
          loading={wide ? "eager" : "lazy"}
          sizes={wide ? "(min-width: 1024px) 680px, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
        <div className="absolute top-3 left-3">
          <KindTags kinds={project.kinds} />
        </div>
        {(project.photos.length > 1 || project.compare) && (
          <ul className="absolute right-3 bottom-3 flex gap-2">
            {project.compare && <li className={badge}>Before and after</li>}
            {project.photos.length > 1 && <li className={badge}>{project.photos.length} photos</li>}
          </ul>
        )}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${wide ? "sm:p-8 lg:justify-center" : ""}`}>
        <h3 className={`font-bold tracking-tight ${wide ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          {/* The link covers the whole card. */}
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-leaf"
          >
            {project.title}
          </Link>
        </h3>
        {wide && <p className="mt-3 text-lg leading-relaxed text-muted">{project.summary}</p>}
        <ul className={`flex flex-wrap gap-x-5 gap-y-2 ${wide ? "mt-5" : "mt-3 mb-5"}`}>
          {projectFacts(project).map(([name, value]) => (
            <li key={name} className="flex items-center gap-2">
              <FactIcon name={name} />
              <span>
                <span className="sr-only">{name}: </span>
                {value}
              </span>
            </li>
          ))}
        </ul>
        <p
          aria-hidden="true"
          className={`flex items-center gap-2 border-t border-line pt-4 font-semibold text-leaf ${wide ? "mt-7" : "mt-auto"}`}
        >
          View project
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
