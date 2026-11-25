import { projectsIntro } from "@/data/projects-intro";
import { pageMeta } from "@/i18n/meta";
import { ProjectsView } from "@/views/projects";

export const metadata = pageMeta("en", "/projects", {
  title: projectsIntro.title,
  description: projectsIntro.text,
});

export default ProjectsView;
