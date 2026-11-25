import Image from "next/image";
import { Container } from "@/components/ui/container";
import { greenhousePhotos } from "@/data/greenhouses";

/** Hidden until photos are listed in src/data/greenhouses.ts. */
export function PhotoGrid() {
  if (greenhousePhotos.length === 0) return null;

  return (
    <section className="pt-16 md:pt-24">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight">Our greenhouses</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {greenhousePhotos.map((photo) => (
            <li key={photo.file} className="relative aspect-[4/3] bg-film">
              <Image
                src={`/images/greenhouses/${photo.file}`}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                className="rounded-md object-cover"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
