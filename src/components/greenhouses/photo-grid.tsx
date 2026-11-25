import Image from "next/image";
import { Container } from "@/components/ui/container";
import { greenhousePhotos } from "@/data/greenhouses";
import { SectionHeading } from "./section-heading";

/** Hidden until photos are listed in src/data/greenhouses.ts. */
export function PhotoGrid() {
  if (greenhousePhotos.length === 0) return null;

  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <SectionHeading title="Our greenhouses" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {greenhousePhotos.map((photo) => (
            <li key={photo.file} className="relative aspect-[4/3]">
              <Image
                src={`/images/greenhouses/${photo.file}`}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                className="rounded-lg bg-film object-cover"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
