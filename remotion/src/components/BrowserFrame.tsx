import React from "react";
import { body } from "../fonts";
import { TEAL } from "../theme";

export const BrowserFrame: React.FC<{
  path: string;
  left: number;
  top: number;
  width: number;
  height: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ path, left, top, width, height, children, style }) => {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        borderRadius: 26,
        overflow: "hidden",
        background: "#0b1526",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 60px 120px -30px rgba(0,0,0,0.75)",
        ...style,
      }}
    >
      <div
        style={{
          height: 52,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 20px",
          background: "rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} style={{ width: 12, height: 12, borderRadius: 99, background: c }} />
        ))}
        <div
          style={{
            marginLeft: 18,
            flex: 1,
            height: 30,
            borderRadius: 99,
            background: "rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            fontFamily: body,
            fontSize: 16,
            color: "#9fd8d0",
          }}
        >
          <span style={{ color: TEAL, marginRight: 8 }}>●</span>
          {path}
        </div>
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: height - 52,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};
