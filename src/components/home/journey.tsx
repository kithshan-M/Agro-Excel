"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { Link } from "@/components/ui/link";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { journey } from "@/data/home";
import { step } from "@/lib/motion";

export function Journey() {
  const t = useT();
  return (
    <section className="bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title={t("From empty land to harvest")}
          text={t("Start at whichever step you are at now.")}
        />
        <Reveal as="ol" className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-5 lg:[&:lang(ta)]:grid-cols-3">
          {journey.map((item, index) => (
            <li key={item.title} className="relative min-w-0 md:last:col-span-2 lg:last:col-span-1">
              {index > 0 && (
                <span
                  aria-hidden="true"
                  style={step(index * 2)}
                  className="reveal-line absolute top-[4.5rem] -left-5 hidden h-0.5 w-5 origin-left bg-leaf [--line-from:0,1] lg:block lg:[&:lang(ta)]:hidden"
                />
              )}
              <div
                className="reveal-up group flex h-full overflow-hidden rounded-lg border border-line bg-white lg:flex-col"
                style={step(index * 2)}
              >
                <div className="relative w-28 shrink-0 overflow-hidden max-[25rem]:[&:lang(ta)]:w-20 sm:w-44 md:w-32 lg:h-36 lg:w-full">
                  <Image
                    src={item.image}
                    alt=""
                    width={560}
                    height={480}
                    unoptimized
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-3 left-3 flex size-9 items-center justify-center rounded-full bg-sun font-display font-bold text-ink"
                  >
                    {index + 1}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-4 pb-2 lg:p-5 lg:pb-3">
                  <h3 className="text-xl font-semibold">{t(item.title)}</h3>
                  <p className="mt-1 mb-2 leading-relaxed text-muted">{t(item.text)}</p>
                  <ul className="mt-auto">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex min-h-11 items-center gap-2 font-semibold text-leaf underline-offset-4 hover:underline"
                        >
                          <svg
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                            className="size-3.5 shrink-0 fill-none stroke-current stroke-[2.5]"
                          >
                            <path d="M3 10h13m-5-5 5 5-5 5" />
                          </svg>
                          {t(link.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
