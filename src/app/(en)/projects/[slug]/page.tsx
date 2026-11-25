import type { Metadata } from "next";
import { ProjectView, projectMeta, projectParams } from "@/views/project";

// Every project is built ahead of time, so there is nothing to wait for.
export const instant = false;

export const generateStaticParams = () => projectParams();

export function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  return projectMeta("en", params);
}

export default function Page({ params }: PageProps<"/projects/[slug]">) {
  return <ProjectView params={params} />;
}
