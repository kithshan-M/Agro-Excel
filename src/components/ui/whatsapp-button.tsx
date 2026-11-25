import { whatsappLink } from "@/lib/whatsapp";
import { ButtonLink } from "./button-link";

/** Opens WhatsApp, or goes to the contact page while no number is set. */
export function WhatsAppButton({ topic }: { topic?: string }) {
  const link = whatsappLink(topic);
  return (
    <ButtonLink href={link ?? "/contact"}>
      {link ? "Chat on WhatsApp" : "Contact us"}
    </ButtonLink>
  );
}
