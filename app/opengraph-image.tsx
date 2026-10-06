import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Redfern Plastering Solutions — Brisbane plasterer";
export const size = { width: 1200, height: 630 };

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0b0c",
          color: "#f6f5f1",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          <div
            style={{
              width: 48,
              height: 4,
              background: "#f6f5f1",
              opacity: 0.5,
            }}
          />
          Brisbane · Residential &amp; Commercial
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 96,
            fontWeight: 900,
            textTransform: "uppercase",
            lineHeight: 0.95,
            letterSpacing: -2,
          }}
        >
          Redfern
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 12,
            marginTop: 8,
            opacity: 0.85,
          }}
        >
          Plastering Solutions
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          0425 743 992
        </div>
      </div>
    ),
    size
  );
}