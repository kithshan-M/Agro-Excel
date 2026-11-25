import Link from "next/link";
import { SectionHeading } from "@/components/sections/section-heading";
import { SeedCard } from "@/components/seeds/seed-card";
import { Container } from "@/components/ui/container";
import { homeSeeds } from "@/data/home";
import { seeds } from "@/data/seeds";
import { SeasonNow } from "./season-now";

const shown = homeSeeds.flatMap((slug) => seeds.find((seed) => seed.slug === slug) ?? []);

export function SeedPreview() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionHeading
              title="Start your seed list"
              text="Add a few here, then see the rest and send us one message."
            />
            <SeasonNow />
          </div>
          <Link
            href="/seeds#catalogue"
            className="inline-flex min-h-12 shrink-0 items-center rounded-md border border-leaf px-6 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-white"
          >
            See all {seeds.length} seeds
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {shown.map((seed, index) => (
            <SeedCard key={seed.slug} seed={seed} index={index % 3} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
