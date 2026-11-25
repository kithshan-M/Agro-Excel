import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageIntro } from "@/components/sections/page-intro";
import { SeedList } from "@/components/sections/seed-list";
import { ServicePoints } from "@/components/sections/service-points";
import { getService } from "@/data/services";

const service = getService("seeds");

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
};

export default function SeedsPage() {
  return (
    <>
      <PageIntro title={service.title} text={service.summary} />
      <SeedList />
      <ServicePoints points={service.points} />
      <ContactCta topic={service.title.toLowerCase()} />
    </>
  );
}
