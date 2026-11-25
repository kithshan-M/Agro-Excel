import { siteConfig } from "@/config/site";
import { getService } from "@/data/services";
import { previewImage, previewSize } from "@/lib/preview-image";

const service = getService("consulting");

export const alt = `${service.title} from ${siteConfig.name}`;
export const size = previewSize;
export const contentType = "image/png";

export default function Image() {
  return previewImage({
    title: service.title,
    text: service.summary,
    picture: "consulting/hero-still",
    at: { width: 1200, height: 352, left: 0, top: 278 },
    background: "#dcebf0",
    textWidth: 620,
  });
}
