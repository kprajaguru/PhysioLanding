import React from "react";
import { body } from "../fonts";
import { WHATSAPP } from "../theme";

export const Phone: React.FC<{
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ title, children, style }) => (
  <div
    style={{
      width: 430,
      height: 640,
      borderRadius: 42,
      background: "#0b141a",
      border: "8px solid #1b2733",
      boxShadow: "0 50px 90px -25px rgba(0,0,0,0.8)",
      overflow: "hidden",
      fontFamily: body,
      ...style,
    }}
  >
    <div
      style={{
        height: 74,
        background: "#1f2c33",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "0 18px",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 99,
          background: WHATSAPP,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0b141a",
          fontWeight: 800,
          fontSize: 17,
        }}
      >
        P
      </div>
      <div>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 19 }}>{title}</div>
        <div style={{ color: "#8fa3ad", fontSize: 14 }}>online</div>
      </div>
    </div>
    <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
  </div>
);

export const Bubble: React.FC<{
  children: React.ReactNode;
  out?: boolean;
  opacity?: number;
  y?: number;
}> = ({ children, out = true, opacity = 1, y = 0 }) => (
  <div
    style={{
      alignSelf: out ? "flex-end" : "flex-start",
      maxWidth: 330,
      background: out ? "#075E54" : "#1f2c33",
      color: "#eaf6f3",
      borderRadius: 16,
      borderBottomRightRadius: out ? 4 : 16,
      borderBottomLeftRadius: out ? 16 : 4,
      padding: "12px 14px",
      fontSize: 18,
      lineHeight: 1.35,
      opacity,
      transform: `translateY(${y}px)`,
    }}
  >
    {children}
  </div>
);
