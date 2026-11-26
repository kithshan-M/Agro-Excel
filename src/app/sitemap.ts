import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { langs, localHref, type Lang } from "@/i18n/translate";
import { projects, shownLinks } from "@/lib/projects";

const url = (lang: Lang, path: string) => new URL(localHref(lang, path), siteConfig.url).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...shownLinks.map((link) => link.href),
    ...projects.map((project) => `/projects/${project.slug}`),
  ];
  return paths.flatMap((path) =>
    langs.map((lang) => ({
      url: url(lang, path),
      alternates: { languages: Object.fromEntries(langs.map((each) => [each, url(each, path)])) },
    })),
  );
}
