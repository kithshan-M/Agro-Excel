import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/project-detail";
import { SampleNote } from "@/components/projects/sample-note";
import type { Project } from "@/data/projects";
import type { Lang } from "@/i18n/translate";
import { pageMeta } from "@/i18n/meta";
import { checkProjects } from "@/lib/check-projects";
import { projectPhoto } from "@/lib/project-photo";
import { projects } from "@/lib/projects";

type Params = Promise<{ slug: string }>;

export function projectParams() {
  checkProjects(projects);
  // Next needs at least one address, so an empty list gives one that is not found.
  return projects.length > 0 ? projects.map(({ slug }) => ({ slug })) : [{ slug: "none" }];
}

const find = async (params: Params) => {
  const { slug } = await params;
  return projects.find((project) => project.slug === slug);
};

export async function projectMeta(lang: Lang, params: Params) {
  const project = await find(params);
  if (!project) return {};

  const photo = projectPhoto(project.photos[0]);
  return pageMeta(lang, `/projects/${project.slug}`, {
    title: project.title,
    description: project.summary,
    // A drawing cannot be a link picture. Photos are sent at a small size.
    images: photo.unoptimized
      ? undefined
      : [{ url: `/_next/image?url=${encodeURIComponent(photo.src)}&w=1200&q=75`, alt: photo.alt }],
  });
}

export async function ProjectView({ params }: { params: Params }) {
  const project = await find(params);
  if (!project) notFound();

  const others = [
    ...projects.filter((other) => sharesKind(other, project)),
    ...projects.filter((other) => !sharesKind(other, project)),
  ]
    .filter((other) => other !== project)
    .slice(0, 3);
  const place = projects.indexOf(project);

  return (
    <>
      <SampleNote />
      <ProjectDetail
        project={project}
        previous={projects[place - 1]}
        next={projects[place + 1]}
        others={others}
      />
    </>
  );
}

function sharesKind(a: Project, b: Project) {
  return a.kinds.some((kind) => b.kinds.includes(kind));
}
