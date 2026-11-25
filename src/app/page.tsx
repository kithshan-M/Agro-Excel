import { HomeHero } from "@/components/home/hero";
import { Journey } from "@/components/home/journey";
import { Promises } from "@/components/home/promises";
import { SeedPreview } from "@/components/home/seed-preview";
import { Tasks } from "@/components/home/tasks";
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
      <Tasks />
      <ServicePanels id="services" />
      <Journey />
      <SeedPreview />
      <ProjectPreview className="border-t border-line" />
      <Promises />
      <ContactCta />
      <ListBar />
    </>
  );
}
