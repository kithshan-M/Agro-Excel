"use client";

import { useT, useWhatsapp } from "@/i18n/context";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { step } from "@/lib/motion";

export function ContactHero() {
  const t = useT();
  const { phone } = siteConfig.contact;
  const whatsapp = useWhatsapp()();

  return (
    <section className="overflow-hidden bg-[#fdf0c8]">
      <Container className="grid items-end gap-4 pt-12 lg:grid-cols-[1fr_1.1fr] lg:pt-6">
        <div className="self-center lg:pb-8">
          <h1 className="enter text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {t("Contact us")}
          </h1>
          <p
            className="enter mt-5 max-w-md text-xl leading-relaxed"
            style={step(1)}
          >
            {t("Ask about a greenhouse or irrigation, order seeds or get advice on a crop.")}
          </p>
          <div className="enter mt-8 flex flex-wrap gap-3" style={step(2)}>
            <ButtonLink href="#message" variant="dark">
              {t("Write a message")}
            </ButtonLink>
            {whatsapp ? (
              <ButtonLink href={whatsapp} variant="outline">
                {t("Chat on WhatsApp")}
              </ButtonLink>
            ) : (
              phone && (
                <a
                  href={`tel:${phone.replaceAll(" ", "")}`}
                  className="inline-flex min-h-12 items-center rounded-md border border-current px-6 font-semibold"
                >
                  {t("Call {phone}", { phone })}
                </a>
              )
            )}
          </div>
        </div>
        {/* hero.svg animates itself: see scripts/draw-contact.mjs. */}
        <picture className="min-w-0">
          <source
            media="(prefers-reduced-motion: reduce)"
            srcSet="/images/contact/hero-still.svg"
          />
          <Image
            src="/images/contact/hero.svg"
            alt=""
            width={960}
            height={600}
            unoptimized
            loading="eager"
            className="block w-full"
          />
        </picture>
      </Container>
    </section>
  );
}
