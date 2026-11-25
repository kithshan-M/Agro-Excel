"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useMemo } from "react";
import { siteConfig } from "@/config/site";
import { whatsappMessageLink } from "@/lib/whatsapp";
import { localHref, plainPath, translate, type Dict, type Lang, type Vars } from "./translate";

const LangContext = createContext<{ lang: Lang; dict: Dict }>({ lang: "en", dict: {} });

export function LangProvider({
  lang,
  dict,
  children,
}: {
  lang: Lang;
  dict: Dict;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ lang, dict }), [lang, dict]);
  return <LangContext value={value}>{children}</LangContext>;
}

export const useLang = () => useContext(LangContext).lang;

/** Translates text. Other values, such as elements, come back unchanged. */
export type T = {
  (text: string, vars?: Vars): string;
  <Value>(value: Value): Value;
};

export function useT(): T {
  const { dict } = useContext(LangContext);
  return useMemo(() => {
    const t = (value: unknown, vars?: Vars) =>
      typeof value === "string" ? translate(dict, value, vars) : value;
    return t as T;
  }, [dict]);
}

/** Turns "/seeds" into the address for the language on show. */
export function useHref() {
  const lang = useLang();
  return (href: string) => localHref(lang, href);
}

/** The page without its language. */
export const usePath = () => plainPath(usePathname());

/**
 * Link that opens WhatsApp with a greeting about a topic. The topic is a key in
 * the dictionary. Null until a number is set in src/config/site.ts.
 */
export function useWhatsapp() {
  const t = useT();
  return (topic?: string, vars?: Vars) =>
    whatsappMessageLink(
      topic
        ? t("Hello {name}, I would like to ask about {topic}.", {
            name: siteConfig.name,
            topic: t(topic, vars),
          })
        : t("Hello {name}, I have a question.", { name: siteConfig.name }),
    );
}
