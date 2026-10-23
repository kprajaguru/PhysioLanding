import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { INK, TEAL } from "../theme";

export const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 30;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 15% 0%, #12303a 0%, ${INK} 55%, #08101f 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(40% 40% at ${50 + drift / 10}% 8%, ${TEAL}33 0%, transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.06,
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          transform: `translateY(${drift}px)`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
