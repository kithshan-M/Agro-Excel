import { siteConfig } from "@/config/site";
import { previewImage, previewSize } from "@/lib/preview-image";

export const alt = `Contact ${siteConfig.name}`;
export const size = previewSize;
export const contentType = "image/png";

export default function Image() {
  return previewImage({
    title: "Contact us",
    text: "Ask about a greenhouse or irrigation, order seeds or get advice on a crop.",
    picture: "contact/hero-still",
    at: { width: 730, height: 456, left: 490, top: 174 },
    background: "#fdf0c8",
  });
}
