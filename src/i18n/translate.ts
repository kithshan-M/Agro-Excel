/** English text is the key. Anything without a translation stays in English. */
export type Lang = "en" | "si";
export type Dict = Readonly<Record<string, string>>;
export type Vars = Record<string, string | number>;

/** vars fill places such as {count} in the text. */
export function translate(dict: Dict, text: string, vars?: Vars): string {
  const found = dict[text] ?? text;
  return vars
    ? found.replace(/\{(\w+)\}/g, (place, name: string) => String(vars[name] ?? place))
    : found;
}

/** Address of a page in a language: "/seeds" is "/si/seeds" in Sinhala. */
export function localHref(lang: Lang, href: string): string {
  if (lang === "en" || !href.startsWith("/")) return href;
  return href === "/" ? "/si" : `/si${href}`;
}

/** The page without its language, so "/si/seeds" is "/seeds". */
export const plainPath = (path: string) => path.replace(/^\/si(?=\/|$)/, "") || "/";
