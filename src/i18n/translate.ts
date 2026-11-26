/** English text is the key. Anything without a translation stays in English. */
export type Lang = "en" | "si" | "ta";
export type Dict = Readonly<Record<string, string>>;
export type Vars = Record<string, string | number>;

/** Every language, English first. Each other one lives under its own address, such as /si. */
export const langs: readonly Lang[] = ["en", "si", "ta"];

/** Each language's name, written in that language. */
export const langNames: Record<Lang, string> = { en: "English", si: "සිංහල", ta: "தமிழ்" };

/** vars fill places such as {count} in the text. */
export function translate(dict: Dict, text: string, vars?: Vars): string {
  const found = dict[text] ?? text;
  return vars
    ? found.replace(/\{(\w+)\}/g, (place, name: string) => String(vars[name] ?? place))
    : found;
}

/** Address of a page in a language: "/seeds" is "/si/seeds" in Sinhala and "/ta/seeds" in Tamil. */
export function localHref(lang: Lang, href: string): string {
  if (lang === "en" || !href.startsWith("/")) return href;
  return href === "/" ? `/${lang}` : `/${lang}${href}`;
}

/** The page without its language, so "/si/seeds" and "/ta/seeds" are "/seeds". */
export const plainPath = (path: string) => path.replace(/^\/(si|ta)(?=\/|$)/, "") || "/";
