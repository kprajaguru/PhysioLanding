import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Bell,
  CalendarClock,
  Check,
  ClipboardList,
  Dumbbell,
  FileText,
  MessageCircle,
  Play,
  Stethoscope,
  Timer,
  TrendingUp,
  UserPlus,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoMark from "@/assets/logo-mark.png";

/* ============================================================
   Shared bits
   ============================================================ */

export function SectionHead({
  eyebrow,
  title,
  sub,
  center = false,
  dark = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`${center ? "text-center mx-auto" : ""} max-w-3xl`}
    >
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-[#14b8a6] font-bold mb-4">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.08] ${
          dark ? "text-white" : "text-[#0F172A]"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-5 text-base md:text-lg leading-relaxed ${
            dark ? "text-white/70" : "text-[#0F172A]/65"
          }`}
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}

function DemoButton({ className = "" }: { className?: string }) {
  return (
    <Button
      className={`h-13 md:h-14 px-7 md:px-8 rounded-full bg-[#F97316] hover:bg-[#ea6a10] text-white font-semibold text-base shadow-lg shadow-[#F97316]/30 ${className}`}
    >
      Request a Demo <ArrowUpRight className="size-4" />
    </Button>
  );
}

/* ============================================================
   HERO — live clinic interface
   ============================================================ */

const NAV = [
  { label: "Home", icon: Activity },
  { label: "Patients", icon: UserPlus },
  { label: "Appointments", icon: CalendarClock },
  { label: "Billing & Invoices", icon: FileText },
  { label: "Messaging", icon: MessageCircle },
  { label: "Settings", icon: ClipboardList },
];

const TABS = ["Summary", "Care", "Progress"];

/** Sequence steps drive the whole panel */
const STEPS = [
  {
    pain: 7,
    from: null as number | null,
    adherence: 24,
    days: "3 / 12 days",
    tab: 0,
    status: "BASELINE",
    stage: 1,
  },
  { pain: 5, from: 7, adherence: 41, days: "5 / 12 days", tab: 1, status: "IMPROVING", stage: 2 },
  { pain: 3, from: 7, adherence: 58, days: "7 / 12 days", tab: 2, status: "IMPROVING", stage: 3 },
  { pain: 1, from: 7, adherence: 67, days: "8 / 12 days", tab: 0, status: "IMPROVING", stage: 4 },
];

export function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(reduce ? STEPS.length - 1 : 0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((s) => (s + 1) % STEPS.length), 2200);
    return () => clearInterval(id);
  }, [reduce]);

  const s = STEPS[i];

  return (
    <header className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] bg-[radial-gradient(60%_60%_at_50%_40%,#CCFBF1_0%,transparent_70%)]"
      />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 pt-14 md:pt-20 pb-16 md:pb-24 grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0FDFA] text-xs font-semibold text-[#0F172A]/80 ring-1 ring-[#14b8a6]/25"
          >
            <span className="size-2 rounded-full bg-[#14b8a6] animate-pulse" />
            Built for physiotherapists who run a clinic
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mt-6"
          >
            You became a physio to treat patients.
            <br />
            <span className="text-[#14b8a6]">Not to run paperwork.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="mt-6 text-base md:text-lg text-[#0F172A]/70 max-w-xl leading-relaxed"
          >
            PhysioApp brings assessment, exercises, patient communication, payments, progress and
            referrals into one calm clinic workflow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <DemoButton />
            <Button
              asChild
              variant="outline"
              className="h-13 md:h-14 px-8 rounded-full font-semibold text-base border-[#0F172A]/15 hover:bg-[#F0FDFA]"
            >
              <a href="#how-it-works">See how it works</a>
            </Button>
          </motion.div>

          <p className="mt-6 text-sm text-[#0F172A]/50">
            See the pain. Track the recovery. Keep the patient.
          </p>
        </div>

        {/* Live app window */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-3xl bg-white border border-[#0F172A]/10 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.35)] overflow-hidden">
            {/* app top bar */}
            <div className="flex items-center gap-3 px-3 sm:px-4 py-3 border-b border-[#0F172A]/8">
              <img src={logoMark} alt="PhysioApp" className="size-7 object-contain" />
              <span className="font-display font-bold text-sm">PhysioApp</span>
              <div className="hidden sm:flex flex-1 items-center rounded-full bg-[#0F172A]/4 px-3 py-1.5 text-[11px] text-[#0F172A]/40">
                Search patients, staff or appointments…
              </div>
              <div className="ml-auto sm:ml-0 flex items-center gap-2">
                <span className="hidden md:inline text-[11px] text-[#0F172A]/45">All branches</span>
                <span className="relative grid size-6 place-items-center rounded-md bg-[#0F172A]/4">
                  <Bell className="size-3.5 text-[#0F172A]/60" />
                  <motion.span
                    animate={reduce ? {} : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-[#F97316]"
                  />
                </span>
                <span className="size-6 rounded-full bg-[#CCFBF1] text-[#0d9488] grid place-items-center text-[10px] font-bold">
                  AD
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[132px_1fr]">
              {/* sidebar */}
              <div className="hidden sm:block border-r border-[#0F172A]/8 py-3 bg-white">
                {NAV.map((n, k) => {
                  const active = k === 1;
                  const Icon = n.icon;
                  return (
                    <div key={n.label} className="relative px-2">
                      {active && (
                        <motion.span
                          layoutId="hero-nav-active"
                          className="absolute inset-y-0 inset-x-2 rounded-lg bg-[#F0FDFA] border-l-2 border-[#14b8a6]"
                        />
                      )}
                      <div
                        className={`relative flex items-center gap-2 px-2 py-2 text-[11px] font-medium ${
                          active ? "text-[#0d9488]" : "text-[#0F172A]/55"
                        }`}
                      >
                        <Icon className="size-3.5 shrink-0" />
                        <span className="truncate">{n.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* main content */}
              <div className="bg-[#F7F9F9] p-3 sm:p-4 space-y-3">
                {/* patient header */}
                <div className="rounded-xl bg-white border border-[#0F172A]/8 p-3 flex items-center gap-3">
                  <span className="size-9 rounded-full bg-[#CCFBF1] text-[#0d9488] grid place-items-center text-xs font-bold">
                    AS
                  </span>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-sm leading-tight truncate">
                      Anita Sharma{" "}
                      <span className="font-sans font-normal text-[11px] text-[#0F172A]/45">
                        34 · F · P-1042
                      </span>
                    </p>
                    <p className="text-[11px] text-[#0F172A]/55 flex items-center gap-1.5">
                      Lower-back strain
                      <span className="rounded bg-[#F0FDFA] text-[#0d9488] px-1.5 py-0.5 text-[9px] font-bold tracking-wide">
                        REHABILITATION
                      </span>
                    </p>
                  </div>
                </div>

                {/* tabs */}
                <div className="rounded-xl bg-white border border-[#0F172A]/8 p-1.5 flex items-center gap-1">
                  {TABS.map((t, k) => (
                    <div key={t} className="relative">
                      {k === s.tab && (
                        <motion.span
                          layoutId="hero-tab"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-lg bg-[#F0FDFA]"
                        />
                      )}
                      <span
                        className={`relative block px-2.5 py-1.5 text-[11px] font-semibold ${
                          k === s.tab ? "text-[#0d9488]" : "text-[#0F172A]/50"
                        }`}
                      >
                        {t}
                      </span>
                    </div>
                  ))}
                  <span className="ml-auto pr-1.5 text-[11px] text-[#0F172A]/40">More</span>
                </div>

                {/* current status */}
                <div className="rounded-xl bg-white border border-[#0F172A]/8 overflow-hidden">
                  <p className="px-3 py-2 border-b border-[#0F172A]/6 text-[9px] uppercase tracking-[0.18em] font-bold text-[#0F172A]/40">
                    Current status
                  </p>
                  <div className="p-3">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={s.status}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.3 }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-2.5 py-1 text-[9px] font-bold tracking-wide text-[#0d9488]"
                      >
                        <span className="size-1.5 rounded-full bg-[#14b8a6]" />
                        {s.status}
                      </motion.span>
                    </AnimatePresence>

                    <div className="mt-3 grid grid-cols-3 gap-3">
                      <Stat label="Pain">
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={s.pain}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="font-display text-xl font-bold text-[#0F172A] inline-block"
                          >
                            {s.pain}
                          </motion.span>
                        </AnimatePresence>
                        <span className="text-[10px] text-[#0F172A]/45"> / 10</span>
                        <p className="text-[9px] text-[#0d9488] font-semibold h-3">
                          {s.from ? `↓ from ${s.from}` : ""}
                        </p>
                      </Stat>

                      <Stat label="Adherence">
                        <span className="font-display text-xl font-bold text-[#0F172A]">
                          {s.adherence}
                        </span>
                        <span className="text-[10px] text-[#0F172A]/45"> %</span>
                        <div className="mt-1 h-1 rounded-full bg-[#0F172A]/8 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-[#14b8a6]"
                            animate={{ width: `${s.adherence}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <p className="text-[9px] text-[#0F172A]/45 mt-0.5">{s.days}</p>
                      </Stat>

                      <Stat label="Last assessment">
                        <span className="font-display text-base font-bold text-[#0F172A]">
                          Aug 09
                        </span>
                        <p className="text-[9px] text-[#0F172A]/45 leading-tight mt-1">
                          Baseline established
                        </p>
                      </Stat>
                    </div>
                  </div>
                </div>

                {/* next action + programme */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white border border-[#0F172A]/8 p-3">
                    <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-[#0F172A]/40 flex items-center gap-1">
                      <ArrowUpRight className="size-3" /> Next action
                    </p>
                    <p className="mt-2 text-[10px] text-[#0F172A]/45 flex items-center gap-1.5">
                      Rehab stage
                      <span className="rounded bg-[#F0FDFA] text-[#0d9488] px-1.5 py-0.5 text-[9px] font-bold">
                        {s.stage} / 7
                      </span>
                    </p>
                    <p className="mt-1.5 text-[11px] font-semibold text-[#0F172A] leading-snug">
                      Reassess before advancing to strengthening
                    </p>
                    <motion.div
                      animate={reduce ? {} : { scale: [1, 1.04, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-[#14b8a6] text-white px-2.5 py-1.5 text-[10px] font-bold"
                    >
                      Advance stage <ArrowUpRight className="size-3" />
                    </motion.div>
                  </div>

                  <div className="rounded-xl bg-white border border-[#0F172A]/8 p-3">
                    <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-[#0F172A]/40 flex items-center gap-1">
                      <Dumbbell className="size-3" /> Active program
                    </p>
                    <p className="mt-2 text-[11px] font-bold text-[#0F172A] uppercase leading-snug">
                      Lower-back recovery — 4W
                    </p>
                    <p className="text-[9px] text-[#0F172A]/45">Week 4 of 4 · 4 exercises</p>
                    <div className="mt-2 flex items-center gap-1">
                      {[0, 1, 2, 3].map((k) => (
                        <motion.span
                          key={k}
                          className="h-1.5 flex-1 rounded-full bg-[#0F172A]/8 overflow-hidden"
                        >
                          <motion.span
                            className="block h-full rounded-full bg-[#F59E0B]"
                            animate={{ width: k <= i ? "100%" : "0%" }}
                            transition={{ duration: 0.5, delay: k * 0.08 }}
                          />
                        </motion.span>
                      ))}
                    </div>
                    <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[#0d9488]">
                      <Play className="size-3" /> View program
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-wider font-bold text-[#0F172A]/40">{label}</p>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}

/* ============================================================
   SECTION 2 — THE PROBLEM
   ============================================================ */

const CHAOS = [
  {
    icon: MessageCircle,
    text: "“Can you send my exercises again?”",
    tag: "WhatsApp",
    x: "0%",
    y: "4%",
    r: -6,
  },
  { icon: Wallet, text: "₹2,000 pending", tag: "Payment", x: "46%", y: "0%", r: 5 },
  {
    icon: CalendarClock,
    text: "Sarah hasn’t booked her next visit",
    tag: "Follow-up",
    x: "6%",
    y: "36%",
    r: 3,
  },
  {
    icon: ClipboardList,
    text: "3 assessments incomplete",
    tag: "Documentation",
    x: "44%",
    y: "33%",
    r: -4,
  },
  { icon: Dumbbell, text: "Programme sent manually", tag: "Exercise", x: "16%", y: "66%", r: 6 },
  { icon: FileText, text: "Recovery report waiting", tag: "Referral", x: "48%", y: "64%", r: -3 },
];

export function ProblemChaos() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative bg-[#0F172A] text-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <SectionHead
            dark
            eyebrow="The problem"
            title={<>Your clinic shouldn’t follow you home.</>}
            sub="Between patients there is charting. After the last patient there are messages, reminders, invoices and reports. The clinic closes — the work doesn’t."
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 font-display text-xl md:text-2xl font-semibold text-[#5eead4] leading-snug"
          >
            Your patients need your attention.
            <br />
            Your admin doesn’t.
          </motion.p>
        </div>

        <div ref={ref}>
          {/* mobile: calm stacked list */}
          <div className="grid gap-3 sm:hidden">
            {CHAOS.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.text}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.08 * i }}
                  className="rounded-2xl bg-white/8 border border-white/12 px-4 py-3"
                >
                  <ChaosBody Icon={Icon} tag={c.tag} text={c.text} />
                </motion.div>
              );
            })}
          </div>

          {/* desktop: scattered pile */}
          <div className="relative hidden sm:block h-[420px]">
            {CHAOS.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.text}
                  initial={{ opacity: 0, y: 24, scale: 0.92 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.12 * i, ease: "easeOut" }}
                  whileHover={reduce ? undefined : { scale: 1.04, zIndex: 20 }}
                  style={{ left: c.x, top: c.y, rotate: `${c.r}deg` }}
                  className="absolute w-[52%] max-w-[300px] rounded-2xl bg-white/8 backdrop-blur-sm border border-white/12 px-4 py-3 shadow-xl"
                >
                  <ChaosBody Icon={Icon} tag={c.tag} text={c.text} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChaosBody({ Icon, tag, text }: { Icon: typeof MessageCircle; tag: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/10 text-[#5eead4]">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-white/45 font-bold">{tag}</p>
        <p className="text-sm text-white/90 leading-snug">{text}</p>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 4 — SAVE TIME (interactive timer)
   ============================================================ */

const TIME_STEPS = [
  { label: "Assessment completed", at: 46 },
  { label: "Exercise programme created", at: 43 },
  { label: "WhatsApp sent", at: 41 },
  { label: "Payment recorded", at: 39 },
  { label: "Next appointment scheduled", at: 37 },
];

export function SaveTime() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [sec, setSec] = useState(60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!inView || reduce) return;
    setRunning(true);
  }, [inView, reduce]);

  useEffect(() => {
    if (!running) return;
    if (sec <= 37) {
      setRunning(false);
      return;
    }
    const id = setTimeout(() => setSec((s) => s - 1), 90);
    return () => clearTimeout(id);
  }, [running, sec]);

  const mm = Math.floor(sec / 60);
  const ss = String(sec % 60).padStart(2, "0");

  return (
    <section id="how-it-works" className="bg-white py-20 md:py-28">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-2 gap-14 items-center"
      >
        <div>
          <SectionHead
            eyebrow="Save time"
            title={<>Less admin between every patient.</>}
            sub="Watch one patient handover run inside PhysioApp. Illustrative, not a measured benchmark — but this is the rhythm clinics settle into."
          />
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <DemoButton />
            <Button
              variant="outline"
              onClick={() => {
                setSec(60);
                setRunning(true);
              }}
              className="h-13 md:h-14 px-8 rounded-full font-semibold text-base border-[#0F172A]/15 hover:bg-[#F0FDFA]"
            >
              <Play className="size-4" /> Replay the minute
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-[#0F172A]/10 bg-[#F0FDFA] p-6 md:p-8">
          <div className="flex items-center gap-3">
            <Timer className="size-5 text-[#14b8a6]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#0F172A]/50">
              Between patients
            </span>
            <span className="ml-auto font-display text-4xl md:text-5xl font-bold tabular-nums text-[#0F172A]">
              0{mm}:{ss}
            </span>
          </div>

          <div className="mt-6 space-y-2">
            {TIME_STEPS.map((s) => {
              const done = sec <= s.at;
              return (
                <div
                  key={s.label}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-500 ${
                    done ? "bg-white text-[#0F172A] shadow-sm" : "text-[#0F172A]/35"
                  }`}
                >
                  <span
                    className={`grid size-6 place-items-center rounded-md ${
                      done ? "bg-[#14b8a6] text-white" : "bg-[#0F172A]/8"
                    }`}
                  >
                    <Check className="size-3.5" />
                  </span>
                  {s.label}
                </div>
              );
            })}
          </div>

          <p className="mt-6 font-display text-lg font-semibold text-[#0F172A]">
            Imagine doing that for every patient.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 5 — PATIENT ENGAGEMENT (WhatsApp)
   ============================================================ */

const CHAT = [
  { from: "clinic", text: "Hi Sarah — here’s your knee programme for this week 🦵" },
  { from: "clinic", text: "▶︎ Quad sets · 3×10  ·  2 min video" },
  { from: "patient", text: "Got it, doing them now" },
  { from: "patient", text: "✅ Marked today complete" },
  { from: "clinic", text: "Nice work. Adherence this week: 89%" },
];

export function Engagement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? CHAT.length : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setN((v) => (v >= CHAT.length ? v : v + 1)), 900);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const adherence = [42, 71, 89][Math.min(2, Math.max(0, Math.floor((n - 1) / 2)))] ?? 42;

  return (
    <section className="bg-[#F0FDFA] py-20 md:py-28">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-2 gap-14 items-center"
      >
        <div className="order-2 lg:order-1 mx-auto w-full max-w-[320px]">
          <div className="rounded-[2rem] bg-[#0F172A] p-2.5 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.5)]">
            <div className="rounded-[1.6rem] bg-[#E7F5EB] overflow-hidden">
              <div className="flex items-center gap-2 bg-[#075E54] px-4 py-3 text-white">
                <div className="size-7 rounded-full bg-white/20 grid place-items-center text-xs font-bold">
                  P
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">PhysioApp Clinic</p>
                  <p className="text-[10px] text-white/70">online</p>
                </div>
              </div>
              <div className="p-3 space-y-2 min-h-[300px]">
                <AnimatePresence initial={false}>
                  {CHAT.slice(0, n).map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-snug shadow-sm ${
                        m.from === "clinic"
                          ? "bg-white text-[#0F172A] rounded-tl-sm"
                          : "ml-auto bg-[#DCF8C6] text-[#0F172A] rounded-tr-sm"
                      }`}
                    >
                      {m.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHead
            eyebrow="Patient engagement"
            title={
              <>
                Your patients already use WhatsApp.
                <br />
                <span className="text-[#14b8a6]">Don’t make them learn another app.</span>
              </>
            }
            sub="Exercise programmes, appointment confirmations and payment nudges land where your patients already are — and completions flow straight back to you."
          />

          <div className="mt-8 rounded-2xl bg-white border border-[#0F172A]/10 p-5">
            <div className="flex items-baseline justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F172A]/45">
                HEP adherence
              </p>
              <motion.p
                key={adherence}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl font-bold text-[#14b8a6]"
              >
                {adherence}%
              </motion.p>
            </div>
            <div className="mt-3 h-2 rounded-full bg-[#0F172A]/8 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#14b8a6]"
                animate={{ width: `${adherence}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="mt-4 text-sm text-[#0F172A]/60">
              Treatment doesn’t stop when the patient leaves your clinic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 6 — RECOVERY
   ============================================================ */

const VISITS = [
  { v: "Visit 1", pain: 8, rom: 45, hep: 42 },
  { v: "Visit 2", pain: 6, rom: 62, hep: 71 },
  { v: "Visit 4", pain: 3, rom: 78, hep: 89 },
];

export function Recovery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const reduce = useReducedMotion();
  const [p, setP] = useState(reduce ? 1 : 0);
  useEffect(() => {
    if (reduce) return;
    return scrollYProgress.on("change", (v) => setP(v));
  }, [scrollYProgress, reduce]);

  const shown = Math.min(VISITS.length, Math.max(1, Math.ceil(p * VISITS.length + 0.001)));
  const last = VISITS[shown - 1];

  const W = 420;
  const H = 200;
  const xs = VISITS.map((_, i) => 40 + (i * (W - 80)) / (VISITS.length - 1));
  const painY = (val: number) => H - 30 - (val / 10) * (H - 70);
  const romY = (val: number) => H - 30 - (val / 100) * (H - 70);
  const line = (fn: (v: (typeof VISITS)[number]) => number) =>
    VISITS.slice(0, shown)
      .map((d, i) => `${i === 0 ? "M" : "L"}${xs[i]},${fn(d)}`)
      .join(" ");

  return (
    <section ref={ref} className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHead
          center
          eyebrow="Recovery"
          title={
            <>
              Stop recording visits.
              <br />
              <span className="text-[#14b8a6]">Start showing recovery.</span>
            </>
          }
          sub="Every assessment feeds one timeline. Pain down, range up, adherence up — visible to you, to the patient, and to the doctor who referred them."
        />

        <div className="mt-14 grid lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 rounded-3xl border border-[#0F172A]/10 p-6 md:p-8 bg-[#FAFDFC]">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-[#CCFBF1] text-[#0d9488] grid place-items-center font-bold">
                S
              </div>
              <div>
                <p className="font-display font-bold leading-tight">Sarah</p>
                <p className="text-xs text-[#0F172A]/55">Knee pain · recovery timeline</p>
              </div>
            </div>

            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full mt-6"
              role="img"
              aria-label="Recovery chart: pain decreasing, range of motion increasing"
            >
              {[0, 1, 2, 3].map((g) => (
                <line
                  key={g}
                  x1="30"
                  x2={W - 20}
                  y1={30 + g * ((H - 60) / 3)}
                  y2={30 + g * ((H - 60) / 3)}
                  stroke="#0F172A"
                  strokeOpacity="0.06"
                />
              ))}
              <path
                d={line((d) => romY(d.rom))}
                fill="none"
                stroke="#14b8a6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={line((d) => painY(d.pain))}
                fill="none"
                stroke="#F97316"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {VISITS.slice(0, shown).map((d, i) => (
                <g key={d.v}>
                  <circle cx={xs[i]} cy={romY(d.rom)} r="5" fill="#14b8a6" />
                  <circle cx={xs[i]} cy={painY(d.pain)} r="5" fill="#F97316" />
                  <text
                    x={xs[i]}
                    y={H - 8}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#0F172A"
                    opacity="0.5"
                  >
                    {d.v}
                  </text>
                </g>
              ))}
            </svg>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#0F172A]/60">
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#F97316]" /> Pain (NPRS) ↓
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#14b8a6]" /> Knee ROM ↑
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-[#0F172A] text-white p-6 md:p-8 flex flex-col"
          >
            <p className="text-xs uppercase tracking-widest font-bold text-white/45">
              Recovery report
            </p>
            <p className="mt-2 font-display text-xl font-bold">Sarah · Knee pain</p>
            <div className="mt-5 space-y-3 text-sm">
              <ReportRow k="Pain (NPRS)" v={`8 → ${last.pain}`} />
              <ReportRow k="Knee ROM" v={`45° → ${last.rom}°`} />
              <ReportRow k="HEP adherence" v={`${last.hep}%`} />
              <ReportRow k="Sessions" v={`${shown * 3} of 10`} />
            </div>
            <p className="mt-auto pt-8 font-display text-2xl font-bold text-[#5eead4]">
              Recovery you can see.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReportRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-2">
      <span className="text-white/60">{k}</span>
      <span className="font-semibold tabular-nums">{v}</span>
    </div>
  );
}

/* ============================================================
   SECTION 7 — REFERRALS
   ============================================================ */

const CHAIN = [
  { label: "Patient", icon: UserPlus },
  { label: "Recovery", icon: TrendingUp },
  { label: "Recovery report", icon: FileText },
  { label: "Referring doctor", icon: Stethoscope },
  { label: "Trust", icon: Check },
  { label: "New patient", icon: UserPlus },
];

export function Referrals() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="bg-[#F0FDFA] py-20 md:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHead
          center
          eyebrow="Growth"
          title={<>A recovered patient can become your next referral.</>}
          sub="PhysioApp turns the progress you already record into a professional report the referring doctor actually reads."
        />

        <div className="mt-14 grid md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CHAIN.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className="relative rounded-2xl bg-white border border-[#0F172A]/8 p-5 text-center shadow-sm"
              >
                <span className="mx-auto grid size-11 place-items-center rounded-xl bg-[#F0FDFA] text-[#0d9488]">
                  <Icon className="size-5" />
                </span>
                <p className="mt-3 text-sm font-semibold">{c.label}</p>
                {i < CHAIN.length - 1 && (
                  <span className="hidden lg:block absolute top-1/2 -right-2 size-1.5 rounded-full bg-[#14b8a6]" />
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center font-display text-2xl md:text-3xl font-bold text-[#0F172A]"
        >
          Turn clinical progress into professional trust.
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 8 — CLINIC CONTROL / MORNING BRIEFING
   ============================================================ */

const BRIEFING = [
  { n: 3, label: "patients need attention", tone: "#F97316", level: "High priority" },
  { n: 2, label: "payments pending", tone: "#F59E0B", level: "Today" },
  { n: 4, label: "follow-ups due", tone: "#F59E0B", level: "Today" },
  { n: 5, label: "exercises not completed", tone: "#0ea5e9", level: "This week" },
  { n: 4, label: "patients showing strong recovery", tone: "#14b8a6", level: "Good news" },
];

export function ClinicControl() {
  return (
    <section id="for-clinics" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-2 gap-14 items-center">
        <SectionHead
          eyebrow="Clinic control"
          title={<>Your clinic shouldn’t depend on your memory.</>}
          sub="Open PhysioApp and the day is already sorted for you — who needs attention, what’s outstanding, and who’s doing well."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-[#0F172A]/10 shadow-[0_40px_80px_-50px_rgba(15,23,42,0.4)] overflow-hidden"
        >
          <div className="flex items-center gap-2 bg-[#0F172A] text-white px-5 py-4">
            <Bell className="size-4 text-[#5eead4]" />
            <p className="font-display font-bold">Good morning</p>
            <span className="ml-auto text-xs text-white/50 font-mono">08:30</span>
          </div>
          <div className="divide-y divide-[#0F172A]/6 bg-white">
            {BRIEFING.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                className="flex items-center gap-4 px-5 py-4"
              >
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-xl font-display font-bold text-white"
                  style={{ background: b.tone }}
                >
                  {b.n}
                </span>
                <p className="text-sm font-medium text-[#0F172A]">{b.label}</p>
                <span
                  className="ml-auto text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full"
                  style={{ background: `${b.tone}1A`, color: b.tone }}
                >
                  {b.level}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="bg-[#F0FDFA] px-5 py-4 text-sm text-[#0F172A]/70">
            Here is what matters today.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 9 — THE PHYSIO'S DAY
   ============================================================ */

const DAY = [
  { t: "08:30", label: "Morning briefing", icon: Bell },
  { t: "09:00", label: "Patient assessment", icon: ClipboardList },
  { t: "09:30", label: "Treatment", icon: Activity },
  { t: "10:00", label: "Exercise programme", icon: Dumbbell },
  { t: "10:15", label: "WhatsApp follow-up", icon: MessageCircle },
  { t: "14:00", label: "Progress alert", icon: TrendingUp },
  { t: "17:30", label: "Payment / follow-up", icon: Wallet },
  { t: "18:30", label: "Recovery report", icon: FileText },
  { t: "19:00", label: "Clinic closed. Admin done.", icon: Check, final: true },
];

export function PhysioDay() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-[#0F172A] text-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-5 sm:px-6">
        <SectionHead
          center
          dark
          eyebrow="A day with PhysioApp"
          title={<>The physio’s day, start to close.</>}
          sub="One calm rhythm from the morning briefing to the last report — nothing left waiting for the evening."
        />

        <div ref={ref} className="relative mt-14 pl-10 sm:pl-14">
          <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-px bg-white/12" />
          <motion.div
            style={{ height }}
            className="absolute left-3 sm:left-5 top-0 w-px bg-[#14b8a6]"
          />
          {DAY.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.t}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, delay: 0.04 * i }}
                className="relative pb-8 last:pb-0"
              >
                <span
                  className={`absolute -left-[30px] sm:-left-[38px] grid size-7 place-items-center rounded-full ring-4 ring-[#0F172A] ${
                    d.final ? "bg-[#14b8a6] text-white" : "bg-white/10 text-[#5eead4]"
                  }`}
                >
                  <Icon className="size-3.5" />
                </span>
                <p className="font-mono text-xs text-white/45">{d.t}</p>
                <p
                  className={`font-display font-bold ${
                    d.final ? "text-2xl text-[#5eead4]" : "text-lg text-white"
                  }`}
                >
                  {d.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL CTA
   ============================================================ */

export function ClosingCTA() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="rounded-[2.5rem] bg-[#F0FDFA] border border-[#14b8a6]/20 px-6 py-16 md:p-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-[1.06] max-w-3xl mx-auto"
          >
            You became a physio
            <br />
            <span className="text-[#14b8a6]">to help people move better.</span>
          </motion.h2>
          <p className="mt-6 text-base md:text-lg text-[#0F172A]/70 max-w-xl mx-auto">
            PhysioApp helps you run the clinic without letting the clinic run you.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <DemoButton />
            <Button
              asChild
              variant="outline"
              className="h-13 md:h-14 px-8 rounded-full font-semibold text-base border-[#0F172A]/20 bg-white hover:bg-white"
            >
              <a href="#how-it-works">See how PhysioApp works</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   STICKY MOBILE CTA
   ============================================================ */

export function MobileCTABar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-50 p-3 bg-white/90 backdrop-blur border-t border-[#0F172A]/10 transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Button className="w-full h-12 rounded-full bg-[#F97316] hover:bg-[#ea6a10] text-white font-semibold shadow-lg">
        Request a Demo <ArrowUpRight className="size-4" />
      </Button>
    </div>
  );
}
