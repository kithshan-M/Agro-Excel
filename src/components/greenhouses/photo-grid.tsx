"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { greenhousePhotos } from "@/data/greenhouses";

/** Hidden until photos are listed in src/data/greenhouses.ts. */
export function PhotoGrid() {
  const t = useT();
  if (greenhousePhotos.length === 0) return null;

  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <SectionHeading title={t("Our greenhouses")} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {greenhousePhotos.map((photo, index) => (
            <Reveal
              as="li"
              key={photo.file}
              index={index % 3}
              className="reveal-up relative aspect-[4/3]"
            >
              <Image
                src={`/images/greenhouses/${photo.file}`}
                alt={t(photo.alt)}
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
