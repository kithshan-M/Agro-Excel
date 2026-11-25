"use client";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { useT } from "@/i18n/context";

export function NotFoundMessage() {
  const t = useT();
  return (
    <section className="py-24">
      <Container>
        <h1 className="text-4xl font-bold tracking-tight">{t("Page not found")}</h1>
        <p className="mt-4 mb-8 text-lg text-muted">
          {t("This page may have moved, or the address may be mistyped.")}
        </p>
        <ButtonLink href="/">{t("Go to the home page")}</ButtonLink>
      </Container>
    </section>
  );
}
