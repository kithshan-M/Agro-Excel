import { siteConfig } from "@/config/site";
import { previewImage, previewSize } from "@/lib/preview-image";

export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = previewSize;
export const contentType = "image/png";

export default function Image() {
  return previewImage({
    title: siteConfig.tagline,
    picture: "home/farm-still",
    at: { width: 1200, height: 495, left: 0, top: 145 },
    background: "linear-gradient(#cfe6ea, #f4f3dd 62%, #fdf0c8)",
    textWidth: 960,
    titleSize: 56,
  });
}
