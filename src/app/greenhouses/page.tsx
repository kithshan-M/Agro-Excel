import type { Metadata } from "next";
import { GreenhouseHero } from "@/components/greenhouses/hero";
import { PartList } from "@/components/greenhouses/part-list";
import { PhotoGrid } from "@/components/greenhouses/photo-grid";
import { QuoteProvider } from "@/components/greenhouses/quote-context";
import { QuoteForm } from "@/components/greenhouses/quote-form";
import { TypeList } from "@/components/greenhouses/type-list";
import { ActionBar } from "@/components/sections/action-bar";
import { BuildSteps } from "@/components/sections/build-steps";
import { NextSteps } from "@/components/sections/next-steps";
import { PageNav } from "@/components/sections/page-nav";
import { QuestionList } from "@/components/sections/question-list";
import { greenhouseQuestions } from "@/data/greenhouses";
import { getService } from "@/data/services";

const service = getService("greenhouses");

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
};

const links = [
  { id: "types", label: "Types" },
  { id: "parts", label: "Parts" },
  { id: "process", label: "Process" },
  { id: "greenhouse-questions", label: "Questions" },
];

export default function GreenhousesPage() {
  return (
    <QuoteProvider>
      <GreenhouseHero service={service} />
      <PageNav links={links} action={{ id: "quotation", label: "Get a quotation" }} />
      <TypeList />
      <PartList />
      <BuildSteps id="process" steps={service.points} />
      <PhotoGrid />
      <QuestionList
        id="greenhouse-questions"
        questions={greenhouseQuestions}
        topic={service.title.toLowerCase()}
      />
      <QuoteForm />
      <NextSteps title="Once it is built" slugs={["irrigation", "seeds", "consulting"]} />
      <ActionBar from="types" to="quotation" label="Get a quotation" />
    </QuoteProvider>
  );
}
