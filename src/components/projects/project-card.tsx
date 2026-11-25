import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { projectPhoto, projectPlace } from "@/lib/project-photo";
import { KindTags } from "./kind-tags";

/** wide puts the photo beside the text on large screens. */
export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const details = [project.size, project.crop, project.year].filter(Boolean);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors focus-within:border-leaf hover:border-leaf ${wide ? "lg:grid lg:grid-cols-[1.5fr_1fr]" : ""}`}
    >
      <div className={`relative overflow-hidden bg-film ${wide ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:min-h-100" : "aspect-[4/3]"}`}>
        <Image
          {...projectPhoto(project.photos[0])}
          alt=""
          fill
          loading={wide ? "eager" : "lazy"}
          sizes={wide ? "(min-width: 1024px) 660px, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
        {project.photos.length > 1 && (
          <p className="absolute right-3 bottom-3 rounded bg-ink/85 px-2.5 py-1 text-sm font-semibold text-white">
            {project.photos.length} photos
          </p>
        )}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${wide ? "sm:p-7 lg:justify-center" : ""}`}>
        <KindTags kinds={project.kinds} />
        <h3 className={`mt-3 font-bold tracking-tight ${wide ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          {/* The link covers the whole card. */}
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 group-hover:text-leaf">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1.5 font-medium">{projectPlace(project)}</p>
        {wide && <p className="mt-3 text-lg leading-relaxed text-muted">{project.summary}</p>}
        {details.length > 0 && (
          <ul className={`flex flex-wrap gap-x-4 gap-y-1 text-muted ${wide ? "mt-5" : "mt-auto pt-3"}`}>
            {details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
