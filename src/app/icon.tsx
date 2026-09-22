import { ImageResponse } from "next/og";
import { site } from "@/content";

/* A plain favicon: the wordmark's initial letter on the primary fill. */

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const initial = site.name.trim().charAt(0);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e36849",
          color: "#fff8ef",
          fontSize: 44,
          fontWeight: 700,
          fontFamily: "serif",
        }}
      >
        {initial}
      </div>
    ),
    size,
  );
}
