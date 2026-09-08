import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ORANGE, TEAL } from "../theme";
import { display, body } from "../fonts";

export const Caption: React.FC<{
  step: string;
  title: string;
  line: string;
}> = ({ step, title, line }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 4, fps, config: { damping: 200 } });
  const y = interpolate(s, [0, 1], [40, 0]);
  const s2 = spring({ frame: frame - 14, fps, config: { damping: 200 } });

  return (
    <div
      style={{
        position: "absolute",
        left: 96,
        bottom: 74,
        opacity: s,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 18px",
          borderRadius: 999,
          background: `${ORANGE}22`,
          border: `1px solid ${ORANGE}66`,
          color: ORANGE,
          fontFamily: body,
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: 1.6,
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: 99,
            background: ORANGE,
          }}
        />
        {step}
      </div>
      <div
        style={{
          marginTop: 16,
          fontFamily: display,
          fontWeight: 700,
          fontSize: 68,
          lineHeight: 1.02,
          color: "#ffffff",
          letterSpacing: -1.5,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 12,
          opacity: s2,
          transform: `translateY(${interpolate(s2, [0, 1], [14, 0])}px)`,
          fontFamily: body,
          fontSize: 27,
          color: "#cbe9e4",
          maxWidth: 900,
        }}
      >
        <span style={{ color: TEAL, marginRight: 10 }}>—</span>
        {line}
      </div>
    </div>
  );
};
