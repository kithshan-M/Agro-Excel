import type { Metadata } from "next";
import { Site } from "@/components/layout/site";
import { NotFoundMessage } from "@/components/sections/not-found-message";
import { siteConfig } from "@/config/site";
import { LangProvider } from "@/i18n/context";
import { latinFonts } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `Page not found | ${siteConfig.name}`,
};

const noDict = {};

/** For addresses that match no page in any language. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${latinFonts} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <LangProvider lang="en" dict={noDict}>
          <Site>
            <NotFoundMessage />
            <p lang="si" className="mx-auto max-w-6xl px-4 pb-6 text-lg sm:px-6">
              පිටුව හමු නොවීය.{" "}
              <a href="/si" className="font-semibold text-leaf underline underline-offset-4">
                මුල් පිටුවට යන්න
              </a>
            </p>
            <p lang="ta" className="mx-auto max-w-6xl px-4 pb-24 text-lg sm:px-6">
              பக்கம் இல்லை.{" "}
              <a href="/ta" className="font-semibold text-leaf underline underline-offset-4">
                முகப்புப் பக்கத்துக்குச் செல்லவும்
              </a>
            </p>
          </Site>
        </LangProvider>
      </body>
    </html>
  );
}
