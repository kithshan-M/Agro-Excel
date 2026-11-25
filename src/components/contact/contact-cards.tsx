"use client";

import { useT, useWhatsapp } from "@/i18n/context";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";

const icons = {
  whatsapp: "M3.5 16.5 4.6 13A6.8 6.8 0 1 1 7 15.4l-3.5 1.1ZM7.4 8.3h5.2M7.4 11h3.4",
  phone: "M5.2 3h2.4l1.3 3.4-1.7 1.3a8.6 8.6 0 0 0 4.1 4.1l1.3-1.7 3.4 1.3v2.4c0 .9-.7 1.6-1.6 1.6A11.8 11.8 0 0 1 3.6 4.6C3.6 3.7 4.3 3 5.2 3Z",
  email: "M3 5h14v10H3V5Zm0 .6 7 5.2 7-5.2",
  address: "M10 17.5s5.5-4.9 5.5-9.2a5.5 5.5 0 0 0-11 0c0 4.3 5.5 9.2 5.5 9.2Zm0-7a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z",
  hours: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0-11v4l2.8 1.8",
};

/** Shows only the details filled in src/config/site.ts. */
export function ContactCards() {
  const t = useT();
  const whatsappLink = useWhatsapp();
  const { phone, whatsapp, email, address, openingHours } = siteConfig.contact;
  const cards = [
    { key: "whatsapp", title: "WhatsApp", value: whatsapp, href: whatsappLink(), action: "Start a chat" },
    { key: "phone", title: "Phone", value: phone, href: `tel:${phone.replaceAll(" ", "")}`, action: "Call now" },
    { key: "email", title: "Email", value: email, href: `mailto:${email}`, action: "Write an email" },
    {
      key: "address",
      title: "Address",
      value: address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
      action: "Open the map",
    },
    { key: "hours", title: "Opening hours", value: openingHours, href: null, action: "" },
  ].filter((card) => card.value) as {
    key: keyof typeof icons;
    title: string;
    value: string;
    href: string | null;
    action: string;
  }[];

  return (
    <section id="contact-details" className="scroll-mt-4 py-16 md:py-24">
      <Container>
        <SectionHeading title={t("Reach us directly")} />
        {cards.length > 0 ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => {
              const body = (
                <>
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="size-8 shrink-0 fill-none stroke-leaf stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]"
                  >
                    <path d={icons[card.key]} />
                  </svg>
                  <span className="min-w-0">
                    <span className="block text-muted">{t(card.title)}</span>
                    <span className="mt-0.5 block text-lg font-semibold break-words whitespace-pre-line">
                      {t(card.value)}
                    </span>
                    {card.href && (
                      <span className="mt-2 block font-semibold text-leaf underline-offset-4 group-hover:underline">
                        {t(card.action)}
                      </span>
                    )}
                  </span>
                </>
              );
              const look = "flex h-full gap-4 rounded-lg border border-line bg-white p-6";
              return (
                <Reveal as="li" key={card.key} index={index} className="reveal-up">
                  {card.href ? (
                    <a
                      href={card.href}
                      {...(card.href.startsWith("https://")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={`group transition-colors hover:border-leaf ${look}`}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={look}>{body}</div>
                  )}
                </Reveal>
              );
            })}
          </ul>
        ) : (
          <div className="mt-6 max-w-2xl rounded-lg border border-line bg-white p-6 sm:p-8">
            <p className="text-lg">
              {t("Our phone number and email will be added here soon.")}
            </p>
            {process.env.NODE_ENV === "development" && (
              <p className="mt-4 rounded-md bg-sun/30 p-4">
                <strong>{t("Only you see this note.")}</strong> {t("Add your details in src/config/site.ts. It does not show on the published site.")}
              </p>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
