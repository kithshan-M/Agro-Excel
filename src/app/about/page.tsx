import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageIntro } from "@/components/sections/page-intro";
import { ServiceList } from "@/components/sections/service-list";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.description,
};

// TODO: add the business story, team and photos.
export default function AboutPage() {
  return (
    <>
      <PageIntro title={`About ${siteConfig.name}`} text={siteConfig.description} />
      <ServiceList />
      <ContactCta />
    </>
  );
}
