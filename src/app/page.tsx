import { ContactCta } from "@/components/sections/contact-cta";
import { Hero } from "@/components/sections/hero";
import { ServiceList } from "@/components/sections/service-list";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceList />
      <ContactCta />
    </>
  );
}
