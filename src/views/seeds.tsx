import { Suspense } from "react";
import { NextSteps } from "@/components/sections/next-steps";
import { Catalogue, FilteredCatalogue } from "@/components/seeds/catalogue";
import { Enquiry } from "@/components/seeds/enquiry";
import { SeedsHero } from "@/components/seeds/hero";
import { ListBar } from "@/components/seeds/list-bar";
import { SeasonCalendar } from "@/components/seeds/season-calendar";
import { getService } from "@/data/services";

const service = getService("seeds");

export function SeedsView() {
  return (
    <>
      <SeedsHero service={service} />
      <Suspense fallback={<Catalogue />}>
        <FilteredCatalogue />
      </Suspense>
      <Enquiry />
      <SeasonCalendar />
      <div className="border-t border-line">
        <NextSteps
          title="More help with your crop"
          slugs={["greenhouses", "irrigation", "consulting"]}
        />
      </div>
      <ListBar />
    </>
  );
}
