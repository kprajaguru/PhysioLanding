import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { BrowserFrame } from "./BrowserFrame";
import { Caption } from "./Caption";
import { Cursor } from "./Cursor";

export const ScreenScene: React.FC<{
  image: string;
  path: string;
  step: string;
  title: string;
  line: string;
  /** Ken-burns: [startScale, endScale] and pan offsets in px */
  zoom?: [number, number];
  pan?: [[number, number], [number, number]];
  cursor?: { from: [number, number]; to: [number, number]; clickAt?: number };
  duration: number;
}> = ({
  image,
  path,
  step,
  title,
  line,
  zoom = [1.04, 1.12],
  pan = [
    [0, 0],
    [-40, -30],
  ],
  cursor,
  duration,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(p, [0, 1], zoom);
  const tx = interpolate(p, [0, 1], [pan[0][0], pan[1][0]]);
  const ty = interpolate(p, [0, 1], [pan[0][1], pan[1][1]]);
  const enter = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (x) => 1 - Math.pow(1 - x, 3),
  });

  return (
    <AbsoluteFill>
      <BrowserFrame
        path={path}
        style={{
          opacity: enter,
          transform: `translateY(${interpolate(enter, [0, 1], [46, 0])}px) scale(${interpolate(
            enter,
            [0, 1],
            [0.975, 1],
          )})`,
        }}
      >
        <Img
          src={staticFile(`images/${image}`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
          }}
        />
        {cursor ? <Cursor from={cursor.from} to={cursor.to} clickAt={cursor.clickAt} /> : null}
      </BrowserFrame>
      <Caption step={step} title={title} line={line} />
    </AbsoluteFill>
  );
};
