"use client";

import { useT, useWhatsapp } from "@/i18n/context";
import { siteConfig } from "@/config/site";

/** Lists the contact fields filled in src/config/site.ts. Renders nothing if all are empty. */
export function ContactDetails() {
  const t = useT();
  const whatsapp_ = useWhatsapp()();
  const { phone, whatsapp, email, address, openingHours } = siteConfig.contact;

  const rows = [
    { label: "Phone", value: phone, href: `tel:${phone.replaceAll(" ", "")}` },
    {
      label: "WhatsApp",
      value: whatsapp,
      href: whatsapp_ ?? undefined,
    },
    { label: "Email", value: email, href: `mailto:${email}` },
    { label: "Address", value: address },
    { label: "Hours", value: openingHours },
  ].filter((row) => row.value);

  if (rows.length === 0) return null;

  return (
    <dl className="space-y-3">
      {rows.map((row) => (
        <div key={row.label}>
          <dt className="text-sm opacity-75">{t(row.label)}</dt>
          <dd className="font-medium break-words">
            {row.href ? (
              <a href={row.href} className="underline underline-offset-4">
                {t(row.value)}
              </a>
            ) : (
              t(row.value)
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
