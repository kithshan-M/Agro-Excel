"use client";

import { useT } from "@/i18n/context";
import { Link } from "@/components/ui/link";
import { SectionHeading } from "@/components/sections/section-heading";
import { SeedCard } from "@/components/seeds/seed-card";
import { Container } from "@/components/ui/container";
import { homeSeeds } from "@/data/home";
import { seeds } from "@/data/seeds";
import { ThisMonth } from "./this-month";

const allSeeds =
  "inline-flex min-h-12 shrink-0 items-center rounded-md border border-leaf px-6 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-white";

const shown = homeSeeds.flatMap((slug) => seeds.find((seed) => seed.slug === slug) ?? []);

export function SeedPreview() {
  const t = useT();
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            title={t("Plan this season")}
            text={t("Start a seed list here, then see the rest and send us one message. Ask us which seeds suit your area now.")}
          />
          <Link href="/seeds#catalogue" className={`${allSeeds} max-md:hidden`}>
            {t("See all {count} seeds", { count: seeds.length })}
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[20rem_1fr]">
          <ThisMonth />
          {/* Phones swipe sideways through them. */}
          <ul className="max-sm:-mx-4 max-sm:flex max-sm:snap-x max-sm:gap-3 max-sm:overflow-x-auto max-sm:scroll-px-4 max-sm:px-4 max-sm:pt-0.5 max-sm:pb-1 max-sm:[scrollbar-width:none] max-sm:*:w-40 max-sm:*:shrink-0 max-sm:*:snap-start sm:grid sm:grid-cols-3 sm:gap-4">
            {shown.map((seed, index) => (
              <SeedCard key={seed.slug} seed={seed} index={index % 3} inRow />
            ))}
          </ul>
        </div>
        <Link href="/seeds#catalogue" className={`${allSeeds} mt-6 md:hidden`}>
          {t("See all {count} seeds", { count: seeds.length })}
        </Link>
      </Container>
    </section>
  );
}
