import { HomeHero } from "@/components/home/hero";
import { Journey } from "@/components/home/journey";
import { SeedPreview } from "@/components/home/seed-preview";
import { ProjectPreview } from "@/components/projects/project-preview";
import { BusinessDetails } from "@/components/sections/business-details";
import { ContactCta } from "@/components/sections/contact-cta";
import { ServicePanels } from "@/components/sections/service-panels";
import { ListBar } from "@/components/seeds/list-bar";

export default function HomePage() {
  return (
    <>
      <BusinessDetails />
      <HomeHero />
      <ServicePanels id="services" />
      <Journey />
      <ProjectPreview className="border-b border-line" />
      <SeedPreview />
      <ContactCta />
      <ListBar />
    </>
  );
}
