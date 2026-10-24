import { ImageResponse } from "next/og";
export const alt = "MyView — Stories in every frame";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ background: "#f4f3ed", color: "#272822", width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "65px 80px", justifyContent: "space-between" }}><div style={{ fontSize: 38, display: "flex" }}>MyView<span style={{ color: "#cf5735", marginLeft: 8 }}>®</span></div><div style={{ fontSize: 100, letterSpacing: -5, lineHeight: 1.05 }}>Stories in every frame.</div><div style={{ fontSize: 23, letterSpacing: 4 }}>PHOTOGRAPHY & CINEMATOGRAPHY</div></div>, size);
}
