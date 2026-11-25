import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/** The size WhatsApp, Facebook and others expect for a link picture. */
export const previewSize = { width: 1200, height: 630 };

const root = process.cwd();
const iconSvg = readFileSync(join(root, "src", "app", "icon.svg"), "utf8");
const bricolage = readFileSync(join(root, "src", "assets", "fonts", "bricolage-700.ttf"));
const figtree = readFileSync(join(root, "src", "assets", "fonts", "figtree-500.ttf"));
const toDataUrl = (svg: string | Buffer) =>
  `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

type Preview = {
  title: string;
  text?: string;
  /** Picture in public/images, without ".svg". */
  picture: string;
  /** Place of the picture in pixels. */
  at: { width: number; height: number; left: number; top: number };
  background: string;
  /** White text, for dark backgrounds. */
  light?: boolean;
  /** Width left for the text. */
  textWidth?: number;
  titleSize?: number;
};

/** Picture shown when a page is shared. Each page's opengraph-image.tsx uses it. */
export function previewImage({
  title,
  text,
  picture,
  at,
  background,
  light = false,
  textWidth = 480,
  titleSize = 70,
}: Preview) {
  // On a dark background the mark gets a pale square, as in the footer.
  const mark = light
    ? iconSvg.replace('fill="#17613f"', 'fill="#fff" fill-opacity=".15"')
    : iconSvg;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          background,
          color: light ? "#fff" : "#13251d",
          fontFamily: "Figtree",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={toDataUrl(
            readFileSync(join(root, "public", "images", `${picture}.svg`)),
          )}
          width={at.width}
          height={at.height}
          style={{ position: "absolute", left: at.left, top: at.top }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: textWidth + 64,
            paddingLeft: 64,
            paddingTop: 56,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={toDataUrl(mark)} width={68} height={68} />
            <div
              style={{
                marginLeft: 18,
                fontFamily: "Bricolage",
                fontSize: 40,
                letterSpacing: "-0.02em",
              }}
            >
              {siteConfig.name}
            </div>
          </div>
          <div
            style={{
              marginTop: 40,
              fontFamily: "Bricolage",
              fontSize: titleSize,
              lineHeight: 1.08,
              textWrap: "balance",
              letterSpacing: "-0.025em",
            }}
          >
            {title}
          </div>
          {text ? (
            <div style={{ marginTop: 24, fontSize: 32, lineHeight: 1.35, textWrap: "balance" }}>
              {text}
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      ...previewSize,
      fonts: [
        { name: "Bricolage", data: bricolage, weight: 700 },
        { name: "Figtree", data: figtree, weight: 500 },
      ],
    },
  );
}
