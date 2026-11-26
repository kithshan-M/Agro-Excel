import type { Metadata } from "next";
import { ProjectView, projectMeta, projectParams } from "@/views/project";

// Every project is built ahead of time, so there is nothing to wait for.
export const instant = false;

export const generateStaticParams = () => projectParams();

export function generateMetadata({ params }: PageProps<"/ta/projects/[slug]">): Promise<Metadata> {
  return projectMeta("ta", params);
}

export default function Page({ params }: PageProps<"/ta/projects/[slug]">) {
  return <ProjectView params={params} />;
}
