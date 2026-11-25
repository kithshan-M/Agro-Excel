import type { Metadata } from "next";
import { GreenhouseHero } from "@/components/greenhouses/hero";
import { PartList } from "@/components/greenhouses/part-list";
import { PhotoGrid } from "@/components/greenhouses/photo-grid";
import { QuoteProvider } from "@/components/greenhouses/quote-context";
import { QuoteForm } from "@/components/greenhouses/quote-form";
import { SiteChecks } from "@/components/greenhouses/site-checks";
import { SizePlanner } from "@/components/greenhouses/size-planner";
import { TypeList } from "@/components/greenhouses/type-list";
import { ProjectPreview } from "@/components/projects/project-preview";
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
  { id: "size", label: "Size" },
  { id: "parts", label: "Parts" },
  { id: "process", label: "Process" },
];

export default function GreenhousesPage() {
  return (
    <QuoteProvider>
      <GreenhouseHero service={service} />
      <PageNav links={links} action={{ id: "quotation", label: "Get a quotation" }} />
      <TypeList />
      <SizePlanner />
      <PartList />
      <BuildSteps id="process" steps={service.points} className="pt-16 pb-10 md:pt-24 md:pb-14" />
      <SiteChecks />
      <PhotoGrid />
      <ProjectPreview title="Greenhouse projects" kinds={["Greenhouse"]} href="/projects?kind=greenhouse" />
      <QuoteForm />
      <QuestionList
        id="greenhouse-questions"
        questions={greenhouseQuestions}
        topic={service.title.toLowerCase()}
      />
      <div className="border-t border-line">
        <NextSteps title="Once it is built" slugs={["irrigation", "seeds", "consulting"]} />
      </div>
      <ActionBar from="types" to="quotation" label="Get a quotation" />
    </QuoteProvider>
  );
}
