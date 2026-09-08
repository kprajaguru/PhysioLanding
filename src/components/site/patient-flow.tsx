import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import patientsList from "@/assets/app-9.png";
import patientSummary from "@/assets/app-10.png";
import patientAssessments from "@/assets/app-18.png";
import patientPrograms from "@/assets/app-12.png";
import patientSessions from "@/assets/app-13.png";
import patientProgress from "@/assets/app-14.png";
import appointments from "@/assets/app-15.png";
import billingInvoices from "@/assets/app-16.png";
import messaging from "@/assets/app-17.png";

const steps = [
  {
    step: "01",
    title: "Patients",
    subtitle: "Search, review and assess — every patient in one list",
    src: patientsList,
    alt: "PhysioApp patients list with status and condition for each patient",
  },
  {
    step: "02",
    title: "Summary",
    subtitle: "Pain, adherence and the next action, decided for you",
    src: patientSummary,
    alt: "PhysioApp patient summary showing pain score, adherence and next action",
  },
  {
    step: "03",
    title: "Assessments",
    subtitle: "Body-diagram pain scoring and ROM capture — record the objective findings",
    src: patientAssessments,
    alt: "PhysioApp patient assessment screen with body diagram, pain NPRS scoring and ROM input",
    path: "assessments",
  },
  {
    step: "04",
    title: "Programs",
    subtitle: "Home exercise plans with live adherence tracking",
    src: patientPrograms,
    alt: "PhysioApp home exercise programs with adherence progress bars",
  },
  {
    step: "05",
    title: "Sessions",
    subtitle: "Book the next visit so the patient stays on rhythm",
    src: patientSessions,
    alt: "PhysioApp sessions tab with upcoming and past sessions",
  },
  {
    step: "06",
    title: "Progress",
    subtitle: "Pain falling, adherence rising — proof you can share",
    src: patientProgress,
    alt: "PhysioApp progress charts showing pain NPRS trend and weekly exercise adherence",
  },
  {
    step: "07",
    title: "Appointments",
    subtitle: "The whole week at a glance — book, move and fill every slot",
    src: appointments,
    alt: "PhysioApp weekly appointments calendar with booked sessions across the week",
    path: "appointments",
  },
  {
    step: "08",
    title: "Billing & Invoices",
    subtitle: "Draft bills, send invoices and track payments in one place",
    src: billingInvoices,
    alt: "PhysioApp billing and invoices list with status, amount and due date",
    path: "billing",
  },
  {
    step: "09",
    title: "WhatsApp Messaging",
    subtitle: "Appointment, exercise and payment reminders delivered where patients reply",
    src: messaging,
    alt: "PhysioApp messaging log showing WhatsApp reminders for appointments, exercises and payments",
    path: "messaging",
  },
];

export function PatientFlow() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "center" });
  const [sel, setSel] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSel = () => setSel(embla.selectedScrollSnap());
    embla.on("select", onSel);
    const t = setInterval(() => embla.scrollNext(), 5000);
    return () => {
      embla.off("select", onSel);
      clearInterval(t);
    };
  }, [embla]);

  const active = steps[sel];

  return (
    <section id="patient-flow" className="w-full py-24 bg-[#F0FDFA]">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[#14b8a6] font-bold mb-4">
          Inside the product
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          One patient, start to discharge —{" "}
          <span className="text-[#14b8a6]">this is the actual app.</span>
        </h2>
        <p className="mt-5 text-lg text-[#0F172A]/70 max-w-2xl mx-auto">
          Step {active.step} · {active.title} — {active.subtitle}
        </p>
      </div>

      <div className="mt-10 mx-auto max-w-6xl px-6 flex flex-wrap justify-center gap-2">
        {steps.map((s, i) => (
          <button
            key={s.step}
            onClick={() => embla?.scrollTo(i)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors border ${
              i === sel
                ? "bg-[#14b8a6] text-white border-[#14b8a6]"
                : "bg-white text-[#0F172A]/70 border-[#0F172A]/10 hover:text-[#0F172A]"
            }`}
          >
            <span className="font-mono text-[11px] opacity-60 mr-2">{s.step}</span>
            {s.title}
          </button>
        ))}
      </div>

      <div className="mt-10 overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {steps.map((s, i) => (
            <div key={s.step} className="min-w-0 flex-[0_0_92%] md:flex-[0_0_80%] px-3">
              <motion.div
                animate={{ scale: i === sel ? 1 : 0.94, opacity: i === sel ? 1 : 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="rounded-[2rem] bg-white border border-[#0F172A]/10 shadow-2xl overflow-hidden"
              >
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#0F172A]/5">
                  <span className="size-2.5 rounded-full bg-[#F97316]" />
                  <span className="size-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="size-2.5 rounded-full bg-[#14b8a6]" />
                  <span className="mx-auto text-[11px] text-[#0F172A]/40 font-mono">
                    app.phys-io.com / {"path" in s ? s.path : "patients"}
                  </span>
                </div>
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className="w-full h-auto block bg-white"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
