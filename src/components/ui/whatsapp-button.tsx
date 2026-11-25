"use client";

import { useT, useWhatsapp } from "@/i18n/context";
import type { Vars } from "@/i18n/translate";
import { ButtonLink } from "./button-link";

/** Opens WhatsApp, or goes to the contact page while no number is set. */
export function WhatsAppButton({ topic, vars }: { topic?: string; vars?: Vars }) {
  const t = useT();
  const link = useWhatsapp()(topic, vars);
  return (
    <ButtonLink href={link ?? "/contact"}>
      {link ? t("Chat on WhatsApp") : t("Contact us")}
    </ButtonLink>
  );
}
