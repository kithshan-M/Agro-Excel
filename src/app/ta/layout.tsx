import type { Metadata } from "next";
import { Site } from "@/components/layout/site";
import { siteConfig } from "@/config/site";
import { TamilProvider } from "@/i18n/tamil-provider";
import { latinFonts } from "@/lib/fonts";
import { tamilFont } from "@/lib/fonts-ta";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ta"
      data-scroll-behavior="smooth"
      className={`${latinFonts} ${tamilFont} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <TamilProvider>
          <Site>{children}</Site>
        </TamilProvider>
      </body>
    </html>
  );
}
