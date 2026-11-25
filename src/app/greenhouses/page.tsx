import type { Metadata } from "next";
import { BuildSteps } from "@/components/greenhouses/build-steps";
import { PartList } from "@/components/greenhouses/part-list";
import { PhotoGrid } from "@/components/greenhouses/photo-grid";
import { QuestionList } from "@/components/greenhouses/question-list";
import { TypeList } from "@/components/greenhouses/type-list";
import { WhatToSend } from "@/components/greenhouses/what-to-send";
import { PageIntro } from "@/components/sections/page-intro";
import { ServicePoints } from "@/components/sections/service-points";
import { benefits } from "@/data/greenhouses";
import { getService } from "@/data/services";

const service = getService("greenhouses");

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
};

export default function GreenhousesPage() {
  return (
    <>
      <PageIntro title={service.title} text={service.summary} />
      <ServicePoints title="Why grow under cover" points={benefits} />
      <TypeList />
      <PartList />
      <BuildSteps steps={service.points} />
      <PhotoGrid />
      <QuestionList />
      <WhatToSend topic={service.title.toLowerCase()} />
    </>
  );
}
