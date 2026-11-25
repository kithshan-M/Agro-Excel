import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Icon for a phone's home screen and for Google. Drawn from icon.svg. */
export default function AppleIcon() {
  const icon = readFileSync(join(process.cwd(), "src", "app", "icon.svg")).toString("base64");

  return new ImageResponse(
    (
      <div style={{ display: "flex", background: "#17613f" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={`data:image/svg+xml;base64,${icon}`} width={180} height={180} />
      </div>
    ),
    size,
  );
}
