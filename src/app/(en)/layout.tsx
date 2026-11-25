import type { Metadata } from "next";
import { Site } from "@/components/layout/site";
import { siteConfig } from "@/config/site";
import { LangProvider } from "@/i18n/context";
import { latinFonts } from "@/lib/fonts";
import "../globals.css";

const noDict = {};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${latinFonts} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LangProvider lang="en" dict={noDict}>
          <Site>{children}</Site>
        </LangProvider>
      </body>
    </html>
  );
}
