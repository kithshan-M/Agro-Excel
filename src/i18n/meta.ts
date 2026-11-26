import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { si } from "./si";
import { ta } from "./ta";
import { langs, localHref, translate, type Dict, type Lang } from "./translate";

const dicts: Record<Lang, Dict> = { en: {}, si, ta };
const locales: Record<Lang, string> = { en: "en_LK", si: "si_LK", ta: "ta_LK" };

/** Title, description and language links of one page. Server only. */
export function pageMeta(
  lang: Lang,
  path: string,
  { title, description, images }: { title?: string; description: string; images?: { url: string; alt: string }[] },
): Metadata {
  const t = (text: string) => translate(dicts[lang], text);
  return {
    title: title ? t(title) : { absolute: `${siteConfig.name} | ${t(siteConfig.tagline)}` },
    description: t(description),
    alternates: {
      canonical: localHref(lang, path),
      languages: {
        ...Object.fromEntries(langs.map((each) => [each, localHref(each, path)])),
        "x-default": path,
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locales[lang],
      alternateLocale: langs.filter((each) => each !== lang).map((each) => locales[each]),
      url: localHref(lang, path),
      ...(images && { images }),
    },
  };
}
