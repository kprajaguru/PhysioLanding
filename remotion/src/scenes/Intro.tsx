import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { body, display } from "../fonts";
import { ORANGE, TEAL } from "../theme";

const WORDS = ["Onboard", "Remind", "Assess", "Treat", "Bill", "Report"];

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", paddingLeft: 140 }}>
      <div
        style={{
          fontFamily: body,
          fontSize: 24,
          letterSpacing: 5,
          textTransform: "uppercase",
          color: TEAL,
          opacity: s,
          transform: `translateX(${interpolate(s, [0, 1], [-30, 0])}px)`,
        }}
      >
        PhysIO · Clinic OS
      </div>
      <div
        style={{
          marginTop: 22,
          fontFamily: display,
          fontWeight: 700,
          fontSize: 116,
          lineHeight: 0.98,
          letterSpacing: -4,
          color: "#fff",
          maxWidth: 1300,
        }}
      >
        {["One patient journey,", "one workspace."].map((l, i) => {
          const ls = spring({ frame: frame - 6 - i * 8, fps, config: { damping: 200 } });
          return (
            <div key={l} style={{ overflow: "hidden" }}>
              <div
                style={{
                  transform: `translateY(${interpolate(ls, [0, 1], [110, 0])}px)`,
                  opacity: ls,
                }}
              >
                {i === 1 ? (
                  <span>
                    one <span style={{ color: TEAL }}>workspace.</span>
                  </span>
                ) : (
                  l
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 46, display: "flex", gap: 14 }}>
        {WORDS.map((w, i) => {
          const ws = spring({
            frame: frame - 24 - i * 5,
            fps,
            config: { damping: 18, stiffness: 160 },
          });
          return (
            <div
              key={w}
              style={{
                fontFamily: body,
                fontWeight: 700,
                fontSize: 25,
                padding: "10px 22px",
                borderRadius: 999,
                color: i === WORDS.length - 1 ? ORANGE : "#d6f2ee",
                border: `1px solid ${i === WORDS.length - 1 ? ORANGE : "rgba(255,255,255,0.2)"}`,
                background: "rgba(255,255,255,0.05)",
                opacity: ws,
                transform: `translateY(${interpolate(ws, [0, 1], [26, 0])}px)`,
              }}
            >
              {w}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
