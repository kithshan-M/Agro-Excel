import type { Metadata } from "next";
import { Site } from "@/components/layout/site";
import { siteConfig } from "@/config/site";
import { SinhalaProvider } from "@/i18n/sinhala-provider";
import { latinFonts } from "@/lib/fonts";
import { sinhalaFont } from "@/lib/fonts-si";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="si"
      data-scroll-behavior="smooth"
      className={`${latinFonts} ${sinhalaFont} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SinhalaProvider>
          <Site>{children}</Site>
        </SinhalaProvider>
      </body>
    </html>
  );
}
