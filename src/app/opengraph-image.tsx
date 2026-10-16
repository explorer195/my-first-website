import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = "DigitalScope Marketing: Grow brands. Generate leads. Scale globally.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Reads a brand colour from globals.css so the palette has one source of truth. */
function token(css: string, name: string) {
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,8})`));
  if (!match) throw new Error(`Missing colour token --${name}`);
  return match[1];
}

export default async function Image() {
  const root = process.cwd();
  const [css, display, medium, icon] = await Promise.all([
    readFile(join(root, "src/app/globals.css"), "utf8"),
    readFile(join(root, "src/assets/fonts/MonaSans-ExpandedExtraBold.ttf")),
    readFile(join(root, "src/assets/fonts/MonaSans-Medium.ttf")),
    readFile(join(root, "src/app/icon.png")),
  ]);

  const night = token(css, "night-950");
  const snow = token(css, "snow");
  const muted = token(css, "slate-300");
  const royal = token(css, "royal-600");
  const highlight = token(css, "royal-400");
  const gold = token(css, "gold-500");
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;

  const dot = (
    <div style={{ width: 14, height: 14, borderRadius: 14, background: gold, marginLeft: 6, marginBottom: 12 }} />
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: night,
          color: snow,
          padding: "64px 72px",
          fontFamily: "Mona Sans",
          overflow: "hidden",
        }}
      >
        {/* Globe silhouette and orbit, echoing the emblem. */}
        <div
          style={{
            position: "absolute",
            right: -170,
            top: 70,
            width: 560,
            height: 560,
            borderRadius: 560,
            border: `2px solid ${royal}`,
            background: night,
            boxShadow: `0 0 120px ${royal}55`,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -260,
            top: 300,
            width: 760,
            height: 200,
            borderRadius: "50%",
            border: `1px solid ${highlight}88`,
            transform: "rotate(-18deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 143,
            top: 505,
            width: 18,
            height: 18,
            borderRadius: 18,
            background: gold,
            boxShadow: `0 0 32px ${gold}`,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={iconSrc} width={64} height={64} alt="" />
            <div style={{ display: "flex", fontSize: 30, fontWeight: 800 }}>
              Digital<span style={{ color: highlight }}>Scope</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>
            {["Grow brands", "Generate leads", "Scale globally"].map((line) => (
              <div key={line} style={{ display: "flex", alignItems: "flex-end" }}>
                {line}
                {dot}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: muted, fontWeight: 500 }}>
            <span>SEO · AEO · GEO · AI search · AI agents · Software</span>
            <span>{new URL(siteConfig.url).host}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Mona Sans", data: display, weight: 800, style: "normal" },
        { name: "Mona Sans", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
