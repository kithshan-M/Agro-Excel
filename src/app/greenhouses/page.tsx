import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageIntro } from "@/components/sections/page-intro";
import { ServicePoints } from "@/components/sections/service-points";
import { getService } from "@/data/services";

const service = getService("greenhouses");

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
};

export default function GreenhousesPage() {
  return (
    <>
      <PageIntro title={service.title} text={service.summary} />
      <ServicePoints points={service.points} />
      <ContactCta topic={service.title.toLowerCase()} />
    </>
  );
}
