import type { Metadata } from "next";
import { IrrigationForm } from "@/components/irrigation/ask-form";
import { CareSchedule } from "@/components/irrigation/care-schedule";
import { IrrigationHero } from "@/components/irrigation/hero";
import { IrrigationProvider } from "@/components/irrigation/irrigation-context";
import { Paths } from "@/components/irrigation/paths";
import { SystemPicker } from "@/components/irrigation/system-picker";
import { IrrigationTypes } from "@/components/irrigation/types";
import { ActionBar } from "@/components/sections/action-bar";
import { BuildSteps } from "@/components/sections/build-steps";
import { NextSteps } from "@/components/sections/next-steps";
import { PageNav } from "@/components/sections/page-nav";
import { QuestionList } from "@/components/sections/question-list";
import { irrigationQuestions } from "@/data/irrigation";
import { getService } from "@/data/services";

const service = getService("irrigation");

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
};

const links = [
  { id: "irrigation-services", label: "Services" },
  { id: "irrigation-types", label: "Types" },
  { id: "irrigation-parts", label: "Parts" },
  { id: "irrigation-care", label: "Care" },
];

export default function IrrigationPage() {
  return (
    <IrrigationProvider>
      <IrrigationHero service={service} />
      <PageNav
        links={links}
        action={{ id: "irrigation-ask", label: "Get a quotation" }}
      />
      <Paths />
      <IrrigationTypes />
      <SystemPicker />
      <CareSchedule />
      <BuildSteps id="irrigation-process" steps={service.points} />
      <IrrigationForm />
      <QuestionList
        id="irrigation-questions"
        questions={irrigationQuestions}
        topic={service.title.toLowerCase()}
      />
      <div className="border-t border-line">
        <NextSteps
          title="More from us"
          slugs={["greenhouses", "seeds", "consulting"]}
        />
      </div>
      <ActionBar
        from="irrigation-services"
        to="irrigation-ask"
        label="Get a quotation"
      />
    </IrrigationProvider>
  );
}
