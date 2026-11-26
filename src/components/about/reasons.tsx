"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { Link } from "@/components/ui/link";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { reasons } from "@/data/about";

export function Reasons() {
  const t = useT();
  return (
    <section className="bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title={t("Why one team helps")}
          text={t("The greenhouse, the water, the seed and the advice work best when they match.")}
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <Reveal as="li" key={reason.title} index={index} className="reveal-up">
              {/* Phones: a short row with the picture on the left. */}
              <Link href={reason.href} className="group flex items-start gap-4 sm:block">
                <div className="relative h-48 overflow-hidden rounded-lg bg-sun max-sm:h-24 max-sm:w-28 max-sm:shrink-0">
                  <Image
                    src={reason.image}
                    alt=""
                    width={720}
                    height={520}
                    unoptimized
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold max-sm:text-lg max-sm:leading-snug sm:mt-5">{t(reason.title)}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted max-sm:mt-1">{t(reason.text)}</p>
                  <p className="mt-2 font-semibold text-leaf underline-offset-4 group-hover:underline">
                    {t(reason.link)}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
