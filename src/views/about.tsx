import { Growers } from "@/components/about/growers";
import { AboutHero } from "@/components/about/hero";
import { Principles } from "@/components/about/principles";
import { Reasons } from "@/components/about/reasons";
import { Story } from "@/components/about/story";
import { Team, WorkPhotos } from "@/components/about/team";
import { ContactCta } from "@/components/sections/contact-cta";

export function AboutView() {
  return (
    <>
      <AboutHero />
      <Growers />
      <Reasons />
      <Principles />
      <Story />
      <Team />
      <WorkPhotos />
      <ContactCta />
    </>
  );
}
