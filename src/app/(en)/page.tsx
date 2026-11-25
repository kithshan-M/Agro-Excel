import { siteConfig } from "@/config/site";
import { pageMeta } from "@/i18n/meta";
import { HomeView } from "@/views/home";

export const metadata = pageMeta("en", "/", {
  description: siteConfig.description,
});

export default HomeView;
