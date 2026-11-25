import type { Metadata } from "next";
import { BuildSteps } from "@/components/greenhouses/build-steps";
import { GreenhouseHero } from "@/components/greenhouses/hero";
import { NextSteps } from "@/components/greenhouses/next-steps";
import { PageNav } from "@/components/greenhouses/page-nav";
import { PartList } from "@/components/greenhouses/part-list";
import { PhotoGrid } from "@/components/greenhouses/photo-grid";
import { QuestionList } from "@/components/greenhouses/question-list";
import { QuoteBar } from "@/components/greenhouses/quote-bar";
import { QuoteProvider } from "@/components/greenhouses/quote-context";
import { QuoteForm } from "@/components/greenhouses/quote-form";
import { TypeList } from "@/components/greenhouses/type-list";
import { getService } from "@/data/services";

const service = getService("greenhouses");

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
};

export default function GreenhousesPage() {
  return (
    <QuoteProvider>
      <GreenhouseHero service={service} />
      <PageNav />
      <TypeList />
      <PartList />
      <BuildSteps steps={service.points} />
      <PhotoGrid />
      <QuestionList />
      <QuoteForm />
      <NextSteps />
      <QuoteBar />
    </QuoteProvider>
  );
}
