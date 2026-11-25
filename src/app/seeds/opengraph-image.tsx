import { siteConfig } from "@/config/site";
import { getService } from "@/data/services";
import { previewImage, previewSize } from "@/lib/preview-image";

const service = getService("seeds");

export const alt = `${service.title} from ${siteConfig.name}`;
export const size = previewSize;
export const contentType = "image/png";

export default function Image() {
  return previewImage({
    title: service.title,
    text: service.summary,
    picture: "seeds/hero-still",
    at: { width: 720, height: 496, left: 490, top: 134 },
    background: "#f6b92b",
  });
}
