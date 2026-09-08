import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { body, display } from "../fonts";
import { TEAL } from "../theme";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  const s2 = spring({ frame: frame - 16, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          fontFamily: display,
          fontWeight: 700,
          fontSize: 104,
          letterSpacing: -3,
          color: "#fff",
          textAlign: "center",
          opacity: s,
          transform: `scale(${interpolate(s, [0, 1], [0.92, 1])})`,
        }}
      >
        Phys<span style={{ color: TEAL }}>IO</span>
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily: body,
          fontSize: 32,
          color: "#c6e8e3",
          opacity: s2,
          transform: `translateY(${interpolate(s2, [0, 1], [22, 0])}px)`,
        }}
      >
        Intake · reminders · assessments · billing · referrals
      </div>
      <div
        style={{
          marginTop: 34,
          fontFamily: body,
          fontWeight: 700,
          fontSize: 26,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: TEAL,
          opacity: spring({ frame: frame - 30, fps, config: { damping: 200 } }),
        }}
      >
        phys-io.com
      </div>
    </AbsoluteFill>
  );
};
