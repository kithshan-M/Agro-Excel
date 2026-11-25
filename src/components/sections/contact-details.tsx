import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

/** Lists the contact fields filled in src/config/site.ts. Renders nothing if all are empty. */
export function ContactDetails() {
  const { phone, whatsapp, email, address, openingHours } = siteConfig.contact;

  const rows = [
    { label: "Phone", value: phone, href: `tel:${phone.replaceAll(" ", "")}` },
    {
      label: "WhatsApp",
      value: whatsapp,
      href: whatsappLink() ?? undefined,
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
          <dt className="text-sm opacity-75">{row.label}</dt>
          <dd className="font-medium break-words">
            {row.href ? (
              <a href={row.href} className="underline underline-offset-4">
                {row.value}
              </a>
            ) : (
              row.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
