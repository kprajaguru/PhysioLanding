import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption } from "../components/Caption";
import { Bubble, Phone } from "../components/Phone";
import { body, display } from "../fonts";
import { TEAL, ORANGE } from "../theme";

const METRICS: [string, string, string, number][] = [
  ["Pain (NPRS)", "7 → 1", "-86%", 0.9],
  ["Lumbar flexion", "42° → 78°", "+36°", 0.78],
  ["HEP adherence", "88%", "12 wks", 0.88],
  ["Sessions", "10 / 10", "complete", 1],
];

export const Referral: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardIn = spring({ frame: frame - 4, fps, config: { damping: 200 } });
  const sendIn = spring({ frame: frame - 62, fps, config: { damping: 18, stiffness: 140 } });
  const float = Math.sin(frame / 24) * 6;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 62,
          width: 1000,
          borderRadius: 26,
          background: "linear-gradient(180deg,#ffffff,#f2fdfa)",
          boxShadow: "0 50px 100px -30px rgba(0,0,0,0.7)",
          padding: 40,
          fontFamily: body,
          opacity: cardIn,
          transform: `translateY(${interpolate(cardIn, [0, 1], [46, 0])}px)`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: display, fontWeight: 700, fontSize: 38, color: "#0F172A" }}>
              Recovery summary
            </div>
            <div style={{ color: "#5c7b82", fontSize: 20, marginTop: 4 }}>
              Anita Sharma · discharged · Dr. Menon (referring)
            </div>
          </div>
          <div
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              background: `${TEAL}18`,
              color: "#0d7f74",
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            Goals met
          </div>
        </div>

        <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {METRICS.map((m, i) => {
            const ms = spring({ frame: frame - 18 - i * 9, fps, config: { damping: 200 } });
            return (
              <div
                key={m[0]}
                style={{
                  padding: 22,
                  borderRadius: 18,
                  background: "#fff",
                  border: "1px solid #e3eff0",
                  opacity: ms,
                  transform: `translateY(${interpolate(ms, [0, 1], [24, 0])}px)`,
                }}
              >
                <div style={{ color: "#6b8890", fontSize: 18, fontWeight: 600 }}>{m[0]}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 6 }}>
                  <span
                    style={{ fontFamily: display, fontWeight: 700, fontSize: 34, color: "#0F172A" }}
                  >
                    {m[1]}
                  </span>
                  <span style={{ color: ORANGE, fontWeight: 700, fontSize: 19 }}>{m[2]}</span>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: "#eaf5f4", marginTop: 14 }}>
                  <div
                    style={{
                      height: 8,
                      borderRadius: 99,
                      width: `${m[3] * 100 * ms}%`,
                      background: `linear-gradient(90deg,${TEAL},#5eead4)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 170,
          top: 58,
          opacity: interpolate(frame, [40, 58], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${float}px)`,
        }}
      >
        <Phone title="Dr. Menon">
          <Bubble opacity={sendIn} y={interpolate(sendIn, [0, 1], [18, 0])}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Recovery report · Anita Sharma</div>
            Pain 7 → 1 · flexion +36° · adherence 88% · discharged after 10 sessions.
            <div style={{ color: "#8fe3c9", marginTop: 8, fontSize: 16 }}>report.pdf · 1 page</div>
          </Bubble>
          <Bubble
            out={false}
            opacity={spring({ frame: frame - 88, fps, config: { damping: 200 } })}
          >
            Excellent — sending two more patients your way.
          </Bubble>
        </Phone>
      </div>

      <Caption
        step="Step 08 · Referral loop"
        title="The referring doctor gets the proof"
        line="One tap sends the outcome report back on WhatsApp — that's how referrals keep coming."
      />
    </AbsoluteFill>
  );
};
