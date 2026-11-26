"use client";

import { useT } from "@/i18n/context";
import { Link } from "@/components/ui/link";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { principles } from "@/data/about";

/** Magnifier, price tag, speech and phone, in the order of principles. */
const icons = [
  "M14 24a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm7-3 8 8M10 14h8m-4-4v8",
  "M4 5v11l13 13 12-12L16 4H5L4 5Zm7 7h.1M15 19l5-5m-1.500 8.500 5-5",
  "M4 6h24v17H15l-7 6v-6H4V6Zm6 6h12m-12 5h8",
  "M10 3h12v26H10V3Zm0 5h12M10 24h12M15 26.500h2",
];

/** How we work, taken from the About page. */
export function Promises() {
  const t = useT();
  return (
    <section className="border-t border-line py-16 md:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading title={t("How we work")} />
          <Link
            href="/about"
            className="inline-flex min-h-11 items-center font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
          >
            {t("More about us")}
          </Link>
        </div>
        <ul className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((item, index) => (
            <Reveal as="li" key={item.title} index={index} className="reveal-up flex gap-4 lg:block">
              <svg
                viewBox="0 0 32 32"
                aria-hidden="true"
                className="size-11 shrink-0 fill-none stroke-leaf stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
              >
                <path d={icons[index % icons.length]} />
              </svg>
              <div className="min-w-0 lg:mt-4">
                <h3 className="text-xl font-semibold">{t(item.title)}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{t(item.text)}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
