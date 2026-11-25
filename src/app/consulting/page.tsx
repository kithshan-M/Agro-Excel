import type { Metadata } from "next";
import { AskForm } from "@/components/consulting/ask-form";
import { ConsultProvider } from "@/components/consulting/consult-context";
import { ConsultingHero } from "@/components/consulting/hero";
import { PhotoGuide } from "@/components/consulting/photo-guide";
import { ProblemPicker } from "@/components/consulting/problem-picker";
import { Stages } from "@/components/consulting/stages";
import { ActionBar } from "@/components/sections/action-bar";
import { NextSteps } from "@/components/sections/next-steps";
import { PageNav } from "@/components/sections/page-nav";
import { QuestionList } from "@/components/sections/question-list";
import { consultingQuestions } from "@/data/consulting";
import { getService } from "@/data/services";

const service = getService("consulting");

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
};

const links = [
  { id: "stages", label: "Stages" },
  { id: "problem", label: "Problems" },
  { id: "photos", label: "Photos" },
  { id: "crop-questions", label: "Questions" },
];

export default function ConsultingPage() {
  return (
    <ConsultProvider>
      <ConsultingHero service={service} />
      <PageNav links={links} action={{ id: "ask", label: "Ask for advice" }} />
      <Stages />
      <ProblemPicker />
      <PhotoGuide />
      <AskForm />
      <QuestionList
        id="crop-questions"
        questions={consultingQuestions}
        topic={service.title.toLowerCase()}
      />
      <div className="border-t border-line">
        <NextSteps title="More from us" slugs={["greenhouses", "irrigation", "seeds"]} />
      </div>
      <ActionBar from="stages" to="ask" label="Ask for advice" />
    </ConsultProvider>
  );
}
