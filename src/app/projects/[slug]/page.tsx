import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Compare } from "@/components/projects/compare";
import { Gallery } from "@/components/projects/gallery";
import { KindTags } from "@/components/projects/kind-tags";
import { ProjectCard } from "@/components/projects/project-card";
import { SampleNote } from "@/components/projects/sample-note";
import { ContactCta } from "@/components/sections/contact-cta";
import { SectionHeading } from "@/components/sections/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import type { Project } from "@/data/projects";
import { checkProjects } from "@/lib/check-projects";
import { step } from "@/lib/motion";
import { projectPhoto, projectPlace } from "@/lib/project-photo";
import { projects } from "@/lib/projects";
import { whatsappLink } from "@/lib/whatsapp";

// Every project is built ahead of time, so there is nothing to wait for.
export const instant = false;

export function generateStaticParams() {
  checkProjects(projects);
  // Next needs at least one address, so an empty list gives one that is not found.
  return projects.length > 0 ? projects.map(({ slug }) => ({ slug })) : [{ slug: "none" }];
}

const find = async (params: Promise<{ slug: string }>) => {
  const { slug } = await params;
  return projects.find((project) => project.slug === slug);
};

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = await find(params);
  if (!project) return {};

  const photo = projectPhoto(project.photos[0]);
  return {
    title: project.title,
    description: project.summary,
    // A drawing cannot be a link picture. Photos are sent at a small size.
    ...(!photo.unoptimized && {
      openGraph: {
        type: "website",
        siteName: siteConfig.name,
        locale: "en_LK",
        url: "./",
        images: [
          { url: `/_next/image?url=${encodeURIComponent(photo.src)}&w=1200&q=75`, alt: photo.alt },
        ],
      },
    }),
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = await find(params);
  if (!project) notFound();

  const others = [
    ...projects.filter((other) => sharesKind(other, project)),
    ...projects.filter((other) => !sharesKind(other, project)),
  ]
    .filter((other) => other !== project)
    .slice(0, 3);
  const facts = [
    ["Place", projectPlace(project)],
    ["Size", project.size],
    ["Crop", project.crop],
    ["Finished", project.year],
  ].filter(([, value]) => value);
  const topic = `a project like "${project.title}"`;

  return (
    <>
      <SampleNote />
      <Container className="pt-4 pb-16 md:pb-24">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-leaf underline-offset-4 hover:underline"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 fill-none stroke-current stroke-[2.5]">
            <path d="M17 10H4m5-5-5 5 5 5" />
          </svg>
          All projects
        </Link>
        <div className="mt-4 grid items-center gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
          <div>
            <div className="enter">
              <KindTags kinds={project.kinds} />
            </div>
            <h1
              className="enter mt-4 text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl"
              style={step(1)}
            >
              {project.title}
            </h1>
            <p className="enter mt-5 text-lg leading-relaxed text-muted" style={step(2)}>
              {project.summary}
            </p>
            <dl className="enter mt-7 grid grid-cols-2 border-t border-line" style={step(3)}>
              {facts.map(([name, value]) => (
                <div key={name} className="border-b border-line py-3 pr-4">
                  <dt className="text-muted">{name}</dt>
                  <dd className="font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="enter mt-7" style={step(4)}>
              <ButtonLink href={whatsappLink(topic) ?? "/contact#message"} variant="dark">
                Ask about a project like this
              </ButtonLink>
            </div>
          </div>
          <div className="enter relative order-first aspect-[4/3] overflow-hidden rounded-lg bg-film lg:order-none" style={step(1)}>
            <Image
              {...projectPhoto(project.photos[0])}
              alt={project.photos[0].alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>

      {project.photos.length > 1 && <Gallery photos={project.photos} />}

      {project.compare && (
        <section className="bg-film py-16 md:py-24">
          <Container>
            <SectionHeading title="Before and after" text="Drag across the picture to compare." />
            <Compare {...project.compare} />
          </Container>
        </section>
      )}

      {(project.work?.length || project.words) && (
        <section className="py-16 md:py-24">
          <Container className="grid gap-12 lg:grid-cols-2">
            {project.work && project.work.length > 0 && (
              <div>
                <SectionHeading title="What we did" />
                <ol className="mt-8">
                  {project.work.map((item, index) => (
                    <Reveal
                      as="li"
                      key={item}
                      index={index}
                      className="reveal-up flex items-center gap-4 border-t border-line py-4 last:border-b"
                    >
                      <span
                        aria-hidden="true"
                        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sun font-display font-bold"
                      >
                        {index + 1}
                      </span>
                      <span className="text-lg">{item}</span>
                    </Reveal>
                  ))}
                </ol>
              </div>
            )}
            {project.words && (
              <Reveal className="reveal-up self-center">
                <figure className="rounded-lg bg-leaf-dark p-7 text-white sm:p-10">
                  <blockquote className="font-display text-2xl leading-snug font-semibold sm:text-3xl">
                    “{project.words.text}”
                  </blockquote>
                  <figcaption className="mt-5 text-white/80">{project.words.name}</figcaption>
                </figure>
              </Reveal>
            )}
          </Container>
        </section>
      )}

      {others.length > 0 && (
        <section className="border-t border-line py-16 md:py-24">
          <Container>
            <SectionHeading title="More projects" />
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((other, index) => (
                <Reveal as="li" key={other.slug} index={index} className="reveal-up">
                  <ProjectCard project={other} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      )}
      <ContactCta topic={topic} />
    </>
  );
}

function sharesKind(a: Project, b: Project) {
  return a.kinds.some((kind) => b.kinds.includes(kind));
}
