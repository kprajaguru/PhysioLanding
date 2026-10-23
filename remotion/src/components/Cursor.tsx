import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { ORANGE } from "../theme";

/** Screen-recording style pointer: glides from `from` to `to`, then clicks. */
export const Cursor: React.FC<{
  from: [number, number];
  to: [number, number];
  travel?: [number, number];
  clickAt?: number;
}> = ({ from, to, travel = [10, 45], clickAt = 52 }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, travel, [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (x) => 1 - Math.pow(1 - x, 3),
  });
  const x = interpolate(t, [0, 1], [from[0], to[0]]);
  const y = interpolate(t, [0, 1], [from[1], to[1]]);
  const ring = interpolate(frame, [clickAt, clickAt + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const showRing = frame >= clickAt && frame <= clickAt + 18;

  return (
    <div style={{ position: "absolute", left: x, top: y, pointerEvents: "none" }}>
      {showRing ? (
        <div
          style={{
            position: "absolute",
            left: -34,
            top: -34,
            width: 68,
            height: 68,
            borderRadius: 99,
            border: `3px solid ${ORANGE}`,
            opacity: 1 - ring,
            transform: `scale(${0.3 + ring * 1.1})`,
          }}
        />
      ) : null}
      <svg width="34" height="34" viewBox="0 0 24 24">
        <path
          d="M4 2 L4 19 L9 14.5 L12.5 22 L15.5 20.6 L12 13.4 L19 13 Z"
          fill="#ffffff"
          stroke="rgba(15,23,42,0.65)"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
};
