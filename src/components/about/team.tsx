import Image from "next/image";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { team, workPhotos } from "@/data/about";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

/** Hidden until people are listed in src/data/about.ts. */
export function Team() {
  if (team.length === 0) return null;

  return (
    <section className="border-t border-line py-16 md:py-24">
      <Container>
        <SectionHeading title="The people you will talk to" />
        <ul className="mt-9 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {team.map((person, index) => (
            <Reveal as="li" key={person.name} index={index % 4} className="reveal-up">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-film">
                {person.photo ? (
                  <Image
                    src={`/images/about/${person.photo}`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 270px, (min-width: 768px) 33vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="font-display text-4xl font-bold text-leaf"
                  >
                    {initials(person.name)}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{person.name}</h3>
              <p className="text-muted">{person.role}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Hidden until photos are listed in src/data/about.ts. */
export function WorkPhotos() {
  if (workPhotos.length === 0) return null;

  return (
    <section className="border-t border-line py-16 md:py-24">
      <Container>
        <SectionHeading title="Our work" />
        <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workPhotos.map((photo, index) => (
            <Reveal
              as="li"
              key={photo.file}
              index={index % 3}
              className="reveal-up relative aspect-[4/3]"
            >
              <Image
                src={`/images/about/${photo.file}`}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                className="rounded-lg bg-film object-cover"
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
