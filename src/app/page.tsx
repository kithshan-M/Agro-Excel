import { HomeHero } from "@/components/home/hero";
import { Journey } from "@/components/home/journey";
import { SeedPreview } from "@/components/home/seed-preview";
import { ContactCta } from "@/components/sections/contact-cta";
import { ServicePanels } from "@/components/sections/service-panels";
import { ListBar } from "@/components/seeds/list-bar";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServicePanels id="services" />
      <Journey />
      <SeedPreview />
      <ContactCta />
      <ListBar />
    </>
  );
}
