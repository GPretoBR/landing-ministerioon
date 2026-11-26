import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "MinisterioOn: membros, agenda, escalas e filiais da sua igreja num só painel";
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
          background: "#393e99",
          color: "white",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 700 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "white", display: "flex" }} />
          MinisterioOn
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
          Membros, agenda, escalas e filiais da sua igreja num só painel.
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#f2c14e" }}>Planos a partir de R$ 49,90 por mês</div>
      </div>
    ),
    size,
  );
}
