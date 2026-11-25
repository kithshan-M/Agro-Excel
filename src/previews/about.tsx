import { aboutIntro } from "@/data/about";
import { siteConfig } from "@/config/site";
import { previewImage, previewSize } from "@/lib/preview-image";

export const alt = `About ${siteConfig.name}`;
export const size = previewSize;
export const contentType = "image/png";

export default function Image() {
  return previewImage({
    title: "About us",
    text: aboutIntro.text,
    picture: "about/hero-still",
    at: { width: 730, height: 502, left: 490, top: 128 },
    background: "#17613f",
    light: true,
  });
}
