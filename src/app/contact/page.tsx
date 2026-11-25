import type { Metadata } from "next";
import { ContactCards } from "@/components/contact/contact-cards";
import { ContactForm } from "@/components/contact/contact-form";
import { HelpfulDetails } from "@/components/contact/helpful-details";
import { ContactHero } from "@/components/contact/hero";
import { QuestionList } from "@/components/sections/question-list";
import { siteConfig } from "@/config/site";
import { contactQuestions } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} about greenhouses, irrigation, seeds or crop advice.`,
};

const hasDetails = Object.values(siteConfig.contact).some(Boolean);

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      {/* Direct details come first once there are any. */}
      {hasDetails && <ContactCards />}
      <div className={hasDetails ? "border-t border-line" : ""}>
        <ContactForm />
      </div>
      <HelpfulDetails />
      {!hasDetails && <ContactCards />}
      <QuestionList
        id="contact-questions"
        title="Quick answers"
        questions={contactQuestions}
        contactLink={false}
      />
    </>
  );
}
