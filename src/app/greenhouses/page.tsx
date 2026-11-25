import type { Metadata } from "next";
import { BuildSteps } from "@/components/greenhouses/build-steps";
import { GreenhouseHero } from "@/components/greenhouses/hero";
import { PageNav } from "@/components/greenhouses/page-nav";
import { PartList } from "@/components/greenhouses/part-list";
import { PhotoGrid } from "@/components/greenhouses/photo-grid";
import { QuestionList } from "@/components/greenhouses/question-list";
import { TypeList } from "@/components/greenhouses/type-list";
import { WhatToSend } from "@/components/greenhouses/what-to-send";
import { getService } from "@/data/services";

const service = getService("greenhouses");

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
};

export default function GreenhousesPage() {
  return (
    <>
      <GreenhouseHero service={service} />
      <PageNav />
      <TypeList />
      <PartList />
      <BuildSteps steps={service.points} />
      <PhotoGrid />
      <QuestionList />
      <WhatToSend topic={service.title.toLowerCase()} />
    </>
  );
}
