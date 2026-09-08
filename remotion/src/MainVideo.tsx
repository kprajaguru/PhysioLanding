import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Stage } from "./components/Stage";
import { ScreenScene } from "./components/ScreenScene";
import { Intro } from "./scenes/Intro";
import { Onboarding } from "./scenes/Onboarding";
import { Referral } from "./scenes/Referral";
import { Outro } from "./scenes/Outro";

export const TRANSITION = 15;

export const SCENES = [
  { d: 75 },
  { d: 130 },
  { d: 105 },
  { d: 100 },
  { d: 110 },
  { d: 100 },
  { d: 95 },
  { d: 100 },
  { d: 125 },
  { d: 80 },
];

export const TOTAL = SCENES.reduce((a, s) => a + s.d, 0) - TRANSITION * (SCENES.length - 1);

const T = (i: number) => (
  <TransitionSeries.Transition
    key={`t${i}`}
    presentation={i % 3 === 2 ? slide({ direction: "from-right" }) : fade()}
    timing={linearTiming({ durationInFrames: TRANSITION })}
  />
);

export const MainVideo: React.FC = () => (
  <Stage>
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES[0].d}>
          <Intro />
        </TransitionSeries.Sequence>
        {T(0)}
        <TransitionSeries.Sequence durationInFrames={SCENES[1].d}>
          <Onboarding duration={SCENES[1].d} />
        </TransitionSeries.Sequence>
        {T(1)}
        <TransitionSeries.Sequence durationInFrames={SCENES[2].d}>
          <ScreenScene
            duration={SCENES[2].d}
            image="app-15.png"
            path="appointments"
            step="Step 02 · Appointment"
            title="Book her into the week"
            line="The full schedule at a glance — drop her into the first free slot."
            zoom={[1.05, 1.14]}
            pan={[
              [0, 0],
              [-30, -25],
            ]}
            cursor={{ from: [1100, 520], to: [700, 300], clickAt: 55 }}
          />
        </TransitionSeries.Sequence>
        {T(2)}
        <TransitionSeries.Sequence durationInFrames={SCENES[3].d}>
          <ScreenScene
            duration={SCENES[3].d}
            image="app-17.png"
            path="messaging"
            step="Step 03 · WhatsApp reminder"
            title="Reminders that actually get read"
            line="Appointment, exercise and payment nudges go out automatically on WhatsApp."
            zoom={[1.08, 1.02]}
            pan={[
              [0, 20],
              [0, -10],
            ]}
          />
        </TransitionSeries.Sequence>
        {T(3)}
        <TransitionSeries.Sequence durationInFrames={SCENES[4].d}>
          <ScreenScene
            duration={SCENES[4].d}
            image="app-18.png"
            path="assessments"
            step="Step 04 · Assessment"
            title="Score the pain on the body map"
            line="Body-diagram pain capture and ROM findings, recorded in seconds."
            zoom={[1.02, 1.16]}
            pan={[
              [0, 0],
              [-20, -60],
            ]}
            cursor={{ from: [420, 480], to: [640, 250], clickAt: 60 }}
          />
        </TransitionSeries.Sequence>
        {T(4)}
        <TransitionSeries.Sequence durationInFrames={SCENES[5].d}>
          <ScreenScene
            duration={SCENES[5].d}
            image="app-12.png"
            path="programs"
            step="Step 05 · Program"
            title="Assign the home exercise plan"
            line="Video-guided HEP with live adherence tracking, delivered to her phone."
            zoom={[1.06, 1.13]}
            pan={[
              [0, 0],
              [-40, -30],
            ]}
            cursor={{ from: [1200, 480], to: [860, 260], clickAt: 52 }}
          />
        </TransitionSeries.Sequence>
        {T(5)}
        <TransitionSeries.Sequence durationInFrames={SCENES[6].d}>
          <ScreenScene
            duration={SCENES[6].d}
            image="app-13.png"
            path="sessions"
            step="Step 06 · Follow-up"
            title="Keep the rhythm of visits"
            line="Every session logged, the next one booked before she leaves."
            zoom={[1.04, 1.12]}
            pan={[
              [0, 0],
              [-25, -35],
            ]}
          />
        </TransitionSeries.Sequence>
        {T(6)}
        <TransitionSeries.Sequence durationInFrames={SCENES[7].d}>
          <ScreenScene
            duration={SCENES[7].d}
            image="app-16.png"
            path="billing"
            step="Step 07 · Billing"
            title="Invoice raised, payment tracked"
            line="Draft the bill, send the invoice, chase what's due — automatically."
            zoom={[1.02, 1.1]}
            pan={[
              [0, 10],
              [-30, -20],
            ]}
            cursor={{ from: [1150, 430], to: [980, 210], clickAt: 55 }}
          />
        </TransitionSeries.Sequence>
        {T(7)}
        <TransitionSeries.Sequence durationInFrames={SCENES[8].d}>
          <Referral />
        </TransitionSeries.Sequence>
        {T(8)}
        <TransitionSeries.Sequence durationInFrames={SCENES[9].d}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  </Stage>
);
