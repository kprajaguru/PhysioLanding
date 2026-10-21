import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import patientsList from "@/assets/flows/onboarding-1-patients-list.png";
import addPatient from "@/assets/flows/onboarding-2-add-patient.png";
import sendLinkMenu from "@/assets/flows/onboarding-3-send-link-menu.png";
import linkGenerated from "@/assets/flows/onboarding-4-link-generated.png";
import patientFillsIn from "@/assets/flows/onboarding-5-patient-fills-in.png";

const STEPS = [
  {
    label: "Patients",
    caption: "Start from the patient list",
    path: "app.phys-io.com/patients",
    src: patientsList,
    alt: "PhysioApp patients list",
  },
  {
    label: "Add patient",
    caption: "Just the essentials — name, phone, condition",
    path: "app.phys-io.com/patients",
    src: addPatient,
    alt: "Add patient form with name, age, WhatsApp phone and presenting condition",
  },
  {
    label: "Send intake link",
    caption: "One tap sends a secure link",
    path: "app.phys-io.com/patients/1052",
    src: sendLinkMenu,
    alt: "Patient actions menu with Send intake link highlighted",
  },
  {
    label: "Magic link",
    caption: "Delivered straight to WhatsApp",
    path: "app.phys-io.com/patients/1052",
    src: linkGenerated,
    alt: "Generated one-time intake link ready to open in WhatsApp",
  },
  {
    label: "Patient fills it in",
    caption: "Pain points, history — on their own phone",
    path: "app.phys-io.com/p/8PJ7W8izj...",
    src: patientFillsIn,
    alt: "Patient-facing intake form with SVG body pain diagram",
  },
];

const STEP_MS = 3200;

export function OnboardingFlow() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % STEPS.length), STEP_MS);
    return () => clearInterval(id);
  }, [paused]);

  const step = STEPS[i];

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="rounded-[2rem] bg-white border border-[#0F172A]/10 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#0F172A]/5">
          <span className="size-2.5 rounded-full bg-[#F97316]" />
          <span className="size-2.5 rounded-full bg-[#F59E0B]" />
          <span className="size-2.5 rounded-full bg-[#14b8a6]" />
          <span className="mx-auto text-[11px] text-[#0F172A]/40 font-mono">{step.path}</span>
        </div>

        <div className="relative h-[340px] md:h-[460px] bg-[#F8FAFC] flex items-center justify-center p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.img
              key={i}
              src={step.src}
              alt={step.alt}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-h-full max-w-full object-contain rounded-lg shadow-[0_20px_50px_-25px_rgba(15,23,42,0.35)] ring-1 ring-[#0F172A]/8"
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-[#0F172A]/70">
          <span className="font-semibold text-[#0F172A]">
            {i + 1}. {step.label}
          </span>{" "}
          — {step.caption}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {STEPS.map((s, k) => (
          <button
            key={s.label}
            onClick={() => setI(k)}
            aria-label={`Step ${k + 1}: ${s.label}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors border ${
              k === i
                ? "bg-[#14b8a6] text-white border-[#14b8a6]"
                : "bg-white text-[#0F172A]/70 border-[#0F172A]/10 hover:text-[#0F172A]"
            }`}
          >
            <span className="font-mono text-[11px] opacity-60 mr-2">
              {String(k + 1).padStart(2, "0")}
            </span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
