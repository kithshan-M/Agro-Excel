import { siteConfig } from "@/config/site";
import { getService } from "@/data/services";
import { previewImage, previewSize } from "@/lib/preview-image";

const service = getService("irrigation");

export const alt = `${service.title} from ${siteConfig.name}`;
export const size = previewSize;
export const contentType = "image/png";

export default function Image() {
  return previewImage({
    title: service.title,
    text: service.summary,
    picture: "irrigation/hero-still",
    at: { width: 730, height: 502, left: 490, top: 128 },
    background: "#12506b",
    light: true,
  });
}
