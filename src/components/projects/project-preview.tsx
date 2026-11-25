import type { ProjectKind } from "@/data/projects";
import { projectsOf } from "@/lib/projects";
import { PreviewRow } from "./preview-row";

/** Up to three projects. Hidden while there are none of these kinds. */
export function ProjectPreview({
  title = "Our projects",
  kinds,
  href = "/projects",
  className = "",
}: {
  title?: string;
  kinds?: ProjectKind[];
  href?: string;
  className?: string;
}) {
  const found = projectsOf(kinds).slice(0, 3);
  if (found.length === 0) return null;

  return <PreviewRow title={title} found={found} href={href} className={className} />;
}
