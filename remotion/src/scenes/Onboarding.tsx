import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption } from "../components/Caption";
import { Bubble, Phone } from "../components/Phone";
import { body, display } from "../fonts";
import { TEAL, ORANGE } from "../theme";

const FIELDS = [
  ["Chief complaint", "Lower back pain, 3 weeks"],
  ["History", "Desk job · no prior surgery"],
  ["Pain now (NPRS)", "7 / 10"],
  ["Consent", "Signed"],
];

export const Onboarding: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const linkIn = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const formIn = spring({ frame: frame - 26, fps, config: { damping: 200 } });
  const sent = spring({ frame: frame - 88, fps, config: { damping: 18, stiffness: 150 } });
  const float = Math.sin(frame / 22) * 6;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 210,
          top: 60,
          opacity: linkIn,
          transform: `translateY(${interpolate(linkIn, [0, 1], [40, float])}px)`,
        }}
      >
        <Phone title="Clinic · PhysIO">
          <Bubble out={false} opacity={linkIn}>
            Hi Anita — please complete your intake before your first visit.
          </Bubble>
          <Bubble out={false} opacity={linkIn}>
            <div style={{ color: TEAL, fontWeight: 700 }}>phys-io.com/intake/9f2a…</div>
            <div style={{ fontSize: 15, color: "#9fb4bd", marginTop: 4 }}>
              Secure magic link · no password
            </div>
          </Bubble>
          <Bubble opacity={sent} y={interpolate(sent, [0, 1], [16, 0])}>
            Submitted · history, symptoms & consent
          </Bubble>
        </Phone>
      </div>

      <div
        style={{
          position: "absolute",
          left: 720,
          top: 78,
          width: 1020,
          borderRadius: 26,
          background: "linear-gradient(180deg, #ffffff 0%, #f4fdfb 100%)",
          boxShadow: "0 50px 100px -30px rgba(0,0,0,0.7)",
          padding: 40,
          opacity: formIn,
          transform: `translateY(${interpolate(formIn, [0, 1], [50, 0])}px)`,
          fontFamily: body,
        }}
      >
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 40, color: "#0F172A" }}>
          Patient intake
        </div>
        <div style={{ color: "#5c7b82", fontSize: 21, marginTop: 6 }}>
          Anita Sharma fills it in from her phone — the chart is ready before she arrives.
        </div>
        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 16 }}>
          {FIELDS.map((f, i) => {
            const fs = spring({ frame: frame - 40 - i * 12, fps, config: { damping: 200 } });
            return (
              <div
                key={f[0]}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "18px 22px",
                  borderRadius: 16,
                  background: "#fff",
                  border: `1px solid ${fs > 0.5 ? TEAL + "66" : "#e4eef0"}`,
                  boxShadow: fs > 0.5 ? `0 0 0 4px ${TEAL}12` : "none",
                }}
              >
                <span style={{ color: "#6b8890", fontSize: 20, fontWeight: 600 }}>{f[0]}</span>
                <span
                  style={{
                    color: "#0F172A",
                    fontSize: 22,
                    fontWeight: 700,
                    opacity: fs,
                    transform: `translateX(${interpolate(fs, [0, 1], [22, 0])}px)`,
                  }}
                >
                  {f[1]}
                </span>
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 26,
            display: "inline-block",
            padding: "16px 32px",
            borderRadius: 14,
            background: ORANGE,
            color: "#fff",
            fontWeight: 800,
            fontSize: 22,
            transform: `scale(${interpolate(sent, [0, 1], [1, 0.96])})`,
            opacity: interpolate(frame, [70, 82], [0.5, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {frame > 88 ? "Sent to clinic ✓" : "Submit intake"}
        </div>
      </div>

      <Caption
        step="Step 01 · Onboarding"
        title="Intake arrives before the patient does"
        line="A magic link on WhatsApp collects symptoms, history and consent — straight into the chart."
      />
      <div style={{ display: "none" }}>{duration}</div>
    </AbsoluteFill>
  );
};
