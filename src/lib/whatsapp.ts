import { siteConfig } from "@/config/site";

/**
 * Link that opens a WhatsApp chat with the message already typed.
 * Returns null until a WhatsApp number is set in src/config/site.ts.
 */
export function whatsappLink(topic?: string): string | null {
  const number = siteConfig.contact.whatsapp.replace(/\D/g, "");
  if (!number) return null;

  const message = topic
    ? `Hello ${siteConfig.name}, I would like to ask about ${topic}.`
    : `Hello ${siteConfig.name}, I have a question.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
