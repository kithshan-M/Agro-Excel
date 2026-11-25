import type { Metadata } from "next";
import { ContactDetails } from "@/components/sections/contact-details";
import { PageIntro } from "@/components/sections/page-intro";
import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} about greenhouses, seeds or crop advice.`,
};

const hasDetails = Object.values(siteConfig.contact).some(Boolean);

export default function ContactPage() {
  return (
    <>
      <PageIntro
        title="Contact us"
        text="Ask about a greenhouse, order seeds or get advice on a crop."
      />
      <section className="py-16 text-lg">
        <Container>
          {hasDetails ? (
            <div className="flex flex-col items-start gap-8">
              {siteConfig.contact.whatsapp && <WhatsAppButton />}
              <ContactDetails />
            </div>
          ) : (
            <p>Our contact details will be added here soon.</p>
          )}
        </Container>
      </section>
    </>
  );
}
