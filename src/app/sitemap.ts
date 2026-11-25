import type { MetadataRoute } from "next";
import { navLinks, siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...navLinks.map((link) => link.href)].map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
  }));
}
