import { projectsIntro } from "@/data/projects-intro";
import { siteConfig } from "@/config/site";
import { previewImage, previewSize } from "@/lib/preview-image";

export const alt = `${projectsIntro.title} by ${siteConfig.name}`;
export const size = previewSize;
export const contentType = "image/png";

export default function Image() {
  return previewImage({
    title: projectsIntro.title,
    text: projectsIntro.text,
    picture: "projects/hero-still",
    at: { width: 1200, height: 352, left: 0, top: 278 },
    background: "#7c3a20",
    light: true,
    textWidth: 860,
  });
}
