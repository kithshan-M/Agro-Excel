"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { whatsappMessageLink } from "@/lib/whatsapp";

/** Browsers only offer the clipboard on https and localhost, so fall back to the old way. */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;top:0;opacity:0";
    document.body.append(area);
    const focused = document.activeElement as HTMLElement | null;
    area.select();
    const copied = document.execCommand("copy");
    area.remove();
    focused?.focus({ preventScroll: true });
    return copied;
  }
}

/** Sends or copies a ready-made message. Nothing is stored or sent by this site. */
export function useMessage(message: string) {
  const [status, setStatus] = useState("");
  const link = whatsappMessageLink(message);

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
    else copy();
  }

  return { message, link, copy, send, status };
}

/** Message preview with its buttons. Place it inside a form that uses send. */
export function MessagePanel({
  message,
  link,
  copy,
  status,
  hint,
}: Omit<ReturnType<typeof useMessage>, "send"> & {
  hint: { whatsapp: string; copy: string };
}) {
  return (
    <div className="flex flex-col bg-leaf-dark p-5 text-white sm:p-9">
      <h3 className="text-xl font-semibold">Your message</h3>
      <p className="mt-4 rounded-lg rounded-tl-none bg-white p-4 leading-relaxed break-words whitespace-pre-line text-ink">
        {message}
      </p>
      <p className="mt-4 text-white/85">{link ? hint.whatsapp : hint.copy}</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <button
          type="submit"
          className="min-h-12 cursor-pointer rounded-md bg-sun px-6 font-semibold text-ink transition-colors hover:bg-white"
        >
          {link ? "Continue in WhatsApp" : "Copy message"}
        </button>
        {link ? (
          <button
            type="button"
            onClick={copy}
            className="min-h-12 cursor-pointer rounded-md border border-current px-6 font-semibold transition-colors hover:bg-white/10"
          >
            Copy message
          </button>
        ) : (
          <ButtonLink href="/contact" variant="outline">
            Contact details
          </ButtonLink>
        )}
      </div>
      <p role="status" className="mt-4 min-h-6 font-medium">
        {status}
      </p>
    </div>
  );
}
