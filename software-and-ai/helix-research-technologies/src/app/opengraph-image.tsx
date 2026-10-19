import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Helix Research Technologies: AI agents for lab and medical supply companies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #05080f 0%, #0a1020 55%, #12173a 100%)",
          color: "#eef2ff",
          fontFamily: "Inter, Arial, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(53,182,217,0.45), transparent 62%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -160,
            bottom: -200,
            width: 560,
            height: 560,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(139,124,240,0.4), transparent 62%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#7fd8f0" }} />
          Helix Research Technologies
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -3, lineHeight: 1.02 }}>
            Quote requests answered in minutes, not days.
          </div>
          <div style={{ fontSize: 30, color: "#b8c2d9", lineHeight: 1.3 }}>
            AI agents for lab, medical, and B2B supply companies. Fixed price. You own everything.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#7e8aa6" }}>
          <span>helixresearchtech.com</span>
          <span>Fredericksburg, VA</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
