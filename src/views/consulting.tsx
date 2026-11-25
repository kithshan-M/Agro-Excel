import { AskForm } from "@/components/consulting/ask-form";
import { ConsultProvider } from "@/components/consulting/consult-context";
import { ConsultingHero } from "@/components/consulting/hero";
import { PhotoGuide } from "@/components/consulting/photo-guide";
import { ProblemPicker } from "@/components/consulting/problem-picker";
import { Start } from "@/components/consulting/start";
import { Stages } from "@/components/consulting/stages";
import { ActionBar } from "@/components/sections/action-bar";
import { NextSteps } from "@/components/sections/next-steps";
import { PageNav } from "@/components/sections/page-nav";
import { QuestionList } from "@/components/sections/question-list";
import { consultingQuestions } from "@/data/consulting";
import { getService } from "@/data/services";

const service = getService("consulting");

const links = [
  { id: "start", label: "Crop" },
  { id: "stages", label: "Stages" },
  { id: "problem", label: "Problems" },
  { id: "photos", label: "Photos" },
];

export function ConsultingView() {
  return (
    <ConsultProvider>
      <ConsultingHero service={service} />
      <PageNav links={links} action={{ id: "ask", label: "Ask for advice" }} />
      <Start />
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
      <ActionBar from="start" to="ask" label="Ask for advice" />
    </ConsultProvider>
  );
}
