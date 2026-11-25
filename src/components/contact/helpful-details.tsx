"use client";

import { useT } from "@/i18n/context";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { helpfulDetails } from "@/data/contact";
import { step } from "@/lib/motion";

export function HelpfulDetails() {
  const t = useT();
  return (
    <section className="bg-film py-16 md:py-20">
      <Container>
        <SectionHeading
          title={t("What helps us reply")}
          text={t("Leave out anything you do not know. We will ask.")}
        />
        <Reveal as="ul" className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {helpfulDetails.map((item, index) => (
            <li
              key={item.title}
              style={step(index)}
              className="reveal-up border-t-2 border-leaf pt-4"
            >
              <h3 className="text-xl font-semibold">{t(item.title)}</h3>
              <p className="mt-1 leading-relaxed text-muted">{t(item.text)}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
