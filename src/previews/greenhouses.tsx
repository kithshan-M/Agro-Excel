import { siteConfig } from "@/config/site";
import { getService } from "@/data/services";
import { previewImage, previewSize } from "@/lib/preview-image";

const service = getService("greenhouses");

export const alt = `${service.title} from ${siteConfig.name}`;
export const size = previewSize;
export const contentType = "image/png";

export default function Image() {
  return previewImage({
    title: service.title,
    text: service.summary,
    picture: "greenhouses/hero-still",
    at: { width: 756, height: 440, left: 490, top: 190 },
    background: "#0d3d28",
    light: true,
    textWidth: 440,
  });
}
