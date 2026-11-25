import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { si } from "./si";
import { localHref, translate, type Lang } from "./translate";

/** Title, description and language links of one page. Server only. */
export function pageMeta(
  lang: Lang,
  path: string,
  { title, description, images }: { title?: string; description: string; images?: { url: string; alt: string }[] },
): Metadata {
  const t = (text: string) => (lang === "si" ? translate(si, text) : text);
  return {
    title: title ? t(title) : { absolute: `${siteConfig.name} | ${t(siteConfig.tagline)}` },
    description: t(description),
    alternates: {
      canonical: localHref(lang, path),
      languages: { en: path, si: localHref("si", path), "x-default": path },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: lang === "si" ? "si_LK" : "en_LK",
      url: localHref(lang, path),
      ...(images && { images }),
    },
  };
}
