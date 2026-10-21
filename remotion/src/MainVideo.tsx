import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Stage } from "./components/Stage";
import { ScreenScene } from "./components/ScreenScene";

export const TRANSITION = 15;
const D = 130; // frames per scene

export const SCENES = [{ d: D }, { d: D }, { d: D }, { d: D }, { d: D }];

export const TOTAL = SCENES.reduce((a, s) => a + s.d, 0) - TRANSITION * (SCENES.length - 1);

const T = (i: number) => (
  <TransitionSeries.Transition
    key={`t${i}`}
    presentation={fade()}
    timing={linearTiming({ durationInFrames: TRANSITION })}
  />
);

export const MainVideo: React.FC = () => (
  <Stage>
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES[0].d}>
          <ScreenScene
            duration={SCENES[0].d}
            image="onboarding-1-patients-list.png"
            path="app.phys-io.com/patients"
            step="Step 01 · Onboarding"
            title="Start from the patient list"
            line="Every patient, one screen — search, review, and add a new one in seconds."
            width={1560}
            height={693}
            zoom={[1.0, 1.06]}
            pan={[
              [0, 0],
              [-20, -10],
            ]}
            cursor={{ from: [700, 420], to: [1177, 101], clickAt: 58 }}
          />
        </TransitionSeries.Sequence>
        {T(0)}
        <TransitionSeries.Sequence durationInFrames={SCENES[1].d}>
          <ScreenScene
            duration={SCENES[1].d}
            image="onboarding-2-add-patient.png"
            path="app.phys-io.com/patients"
            step="Step 02 · Add patient"
            title="Just the essentials"
            line="Name, phone, condition — that's it. No twenty-field forms before the first visit."
            width={460}
            height={624}
            zoom={[1.0, 1.03]}
            pan={[
              [0, 0],
              [0, -10],
            ]}
            cursor={{ from: [180, 260], to: [387, 586], clickAt: 60 }}
          />
        </TransitionSeries.Sequence>
        {T(1)}
        <TransitionSeries.Sequence durationInFrames={SCENES[2].d}>
          <ScreenScene
            duration={SCENES[2].d}
            image="onboarding-3-send-link-menu.png"
            path="app.phys-io.com/patients/1052"
            step="Step 03 · Send intake link"
            title="One tap, link sent"
            line="Generate a secure, single-use intake link straight from the patient record."
            width={1560}
            height={451}
            zoom={[1.0, 1.05]}
            pan={[
              [0, 0],
              [-15, 0],
            ]}
            cursor={{ from: [950, 140], to: [1430, 250], clickAt: 55 }}
          />
        </TransitionSeries.Sequence>
        {T(2)}
        <TransitionSeries.Sequence durationInFrames={SCENES[3].d}>
          <ScreenScene
            duration={SCENES[3].d}
            image="onboarding-4-link-generated.png"
            path="app.phys-io.com/patients/1052"
            step="Step 04 · Magic link"
            title="Delivered on WhatsApp"
            line="One-time, expires in 14 days — no app install, no password for the patient."
            width={520}
            height={411}
            zoom={[1.0, 1.04]}
            pan={[
              [0, 0],
              [0, -8],
            ]}
            cursor={{ from: [160, 140], to: [406, 318], clickAt: 58 }}
          />
        </TransitionSeries.Sequence>
        {T(3)}
        <TransitionSeries.Sequence durationInFrames={SCENES[4].d}>
          <ScreenScene
            duration={SCENES[4].d}
            image="onboarding-5-patient-fills-in.png"
            path="app.phys-io.com/p/8PJ7W8izj..."
            step="Step 05 · Patient fills it in"
            title="Chart ready before they arrive"
            line="Pain points, history and consent — completed on their own phone."
            width={610}
            height={700}
            zoom={[1.0, 1.05]}
            pan={[
              [0, 0],
              [0, -15],
            ]}
            cursor={{ from: [150, 420], to: [281, 234], clickAt: 62 }}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  </Stage>
);
