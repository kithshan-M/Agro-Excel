import { aboutIntro } from "@/data/about";
import { pageMeta } from "@/i18n/meta";
import { AboutView } from "@/views/about";

export const metadata = pageMeta("ta", "/about", {
  title: "About",
  description: aboutIntro.text,
});

export default AboutView;
