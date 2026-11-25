import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects, shownLinks } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    ...shownLinks.map((link) => link.href),
    ...projects.map((project) => `/projects/${project.slug}`),
  ].map((path) => ({ url: new URL(path, siteConfig.url).toString() }));
}
