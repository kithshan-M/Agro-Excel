"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/config/site";
import { copyText } from "@/lib/copy";
import { whatsappMessageLink } from "@/lib/whatsapp";

function mailLink(message: string): string | null {
  const { email } = siteConfig.contact;
  if (!email) return null;
  const subject = encodeURIComponent(`Message for ${siteConfig.name}`);
  return `mailto:${email}?subject=${subject}&body=${encodeURIComponent(message.replaceAll("\n", "\r\n"))}`;
}

/**
 * Sends a ready-made message by WhatsApp, or by email when only an email is set,
 * or copies it. Nothing is stored or sent by this site.
 */
export function useMessage(message: string) {
  const [status, setStatus] = useState("");
  const link = whatsappMessageLink(message);
  const mail = mailLink(message);

  async function copy() {
    const copied = await copyText(message);
    setStatus(
      copied
        ? "Message copied. Paste it into a chat or email to us."
        : "Copying did not work. Select the message text and copy it.",
    );
  }

  function send(event: React.FormEvent) {
    event.preventDefault();
    if (link) window.open(link, "_blank", "noopener");
    else if (mail) window.location.assign(mail);
    else copy();
  }

  return { message, link, mail, copy, send, status };
}

const second =
  "inline-flex min-h-12 cursor-pointer items-center rounded-md border border-current px-6 font-semibold transition-colors hover:bg-white/10";

/** Message preview with its buttons. Place it inside a form that uses send. */
export function MessagePanel({
  message,
  link,
  mail,
  copy,
  status,
  hint,
  detailsHref = "/contact",
}: Omit<ReturnType<typeof useMessage>, "send"> & {
  hint: { whatsapp: string; copy: string };
  /** Where "Contact details" leads while there is no WhatsApp number or email. */
  detailsHref?: string;
}) {
  return (
    <div className="bg-leaf-dark p-5 text-white sm:p-9">
      {/* Stays in view beside a long form that does not clip it. */}
      <div className="flex flex-col lg:sticky lg:top-24">
        <h3 className="text-xl font-semibold">Your message</h3>
        <p className="mt-4 rounded-lg rounded-tl-none bg-white p-4 leading-relaxed break-words whitespace-pre-line text-ink">
          {message}
        </p>
        <p className="mt-4 text-white/85">
          {link
            ? hint.whatsapp
            : mail
              ? "You can change the message and attach photos in your email before you send it."
              : hint.copy}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="submit"
            className="min-h-12 cursor-pointer rounded-md bg-sun px-6 font-semibold text-ink transition-colors hover:bg-white"
          >
            {link ? "Continue in WhatsApp" : mail ? "Continue in email" : "Copy message"}
          </button>
          {link && mail && (
            <a href={mail} className={second}>
              Email instead
            </a>
          )}
          {link || mail ? (
            <button type="button" onClick={copy} className={second}>
              Copy message
            </button>
          ) : (
            <ButtonLink href={detailsHref} variant="outline">
              Contact details
            </ButtonLink>
          )}
        </div>
        <p role="status" className="mt-4 min-h-6 font-medium">
          {status}
        </p>
      </div>
    </div>
  );
}
