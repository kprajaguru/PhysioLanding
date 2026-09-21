import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import logoMark from "@/assets/logo-mark.png";
import { getVisitorCountry } from "@/lib/geo";
import { SIGNUP_URL } from "@/lib/links";
import {
  Activity,
  ArrowUpRight,
  Building2,
  Calendar,
  Check,
  CreditCard,
  Dumbbell,
  Facebook,
  FileText,
  Github,
  Instagram,
  MessageCircle,
  ScanLine,
  Send,
  Twitter,
  UserPlus,
  Wallet,
} from "lucide-react";

import {
  Hero,
  ProblemChaos,
  SaveTime,
  Engagement,
  Recovery,
  Referrals,
  ClinicControl,
  PhysioDay,
  ClosingCTA,
  MobileCTABar,
} from "@/components/site/story";
import { PatientFlow } from "@/components/site/patient-flow";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => ({ country: await getVisitorCountry() }),
  head: () => ({
    meta: [
      { title: "PhysioApp - Your Clinic Manager" },
      {
        name: "description",
        content:
          "The physio software that shows recovery, not just records it. Assessments, WhatsApp reminders, UPI billing and home exercise plans — one calm clinic OS.",
      },
      { property: "og:title", content: "PhysioApp - Your Clinic Manager" },
      {
        property: "og:description",
        content:
          "The physio software that shows recovery, not just records it. Assessments, WhatsApp reminders, UPI billing and home exercise plans — one calm clinic OS.",
      },
    ],
  }),
});

/* ============ COLOR TOKENS (inline for clarity) ============
  teal      #14b8a6
  orange    #F97316   (CTAs)
  slate     #0F172A   (text)
  brand-50  #F0FDFA   (section bg)
==============================================================*/

function Index() {
  const { country } = Route.useLoaderData();
  const isUK = country === "GB";

  return (
    <div className="min-h-screen bg-white font-sans text-[#0F172A] overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <ProblemChaos />
        <FeatureHub />
        <SaveTime />
        <Engagement />
        <Recovery />
        <Referrals />
        <ClinicControl />
        <PhysioDay />
        <FeatureWheel isUK={isUK} />
        <PatientFlow />
        <BuiltForEveryone />

        <Pricing isUK={isUK} />
        <FAQ />
        <ClosingCTA />
      </main>
      <Footer />
      <MobileCTABar />
    </div>
  );
}

/* ---------- NAV (compact, centered) ---------- */
function Nav() {
  const links = [
    { l: "How it works", h: "#how-it-works" },
    { l: "Features", h: "#features" },
    { l: "For clinics", h: "#for-clinics" },
    { l: "Pricing", h: "#pricing" },
  ];
  return (
    <nav className="sticky top-4 z-40 w-full flex justify-center px-4">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur border border-[#0F172A]/10 pl-2 pr-2 py-2 shadow-sm">
        <a href="#" className="flex items-center gap-2 pl-1">
          <img src={logoMark} alt="PhysioApp" className="size-10 rounded-full object-contain" />
        </a>

        <div className="hidden md:flex items-center gap-0.5 text-sm font-medium text-[#0F172A]/70 ml-3">
          {links.map((l) => (
            <a
              key={l.l}
              href={l.h}
              className="px-3 py-1.5 rounded-full hover:bg-[#F0FDFA] hover:text-[#0F172A] transition"
            >
              {l.l}
            </a>
          ))}
        </div>

        <Button
          asChild
          className="rounded-full bg-[#F97316] hover:bg-[#ea6a10] text-white shadow-md h-9 px-4 ml-2 text-sm"
        >
          <a href={`${SIGNUP_URL}?plan=demo`}>
            Request Demo <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </div>
    </nav>
  );
}

/* ============================================================
   FEATURE HUB
   - 4 left icons + 4 right icons
   - SVG paths draw toward center on scroll into view
   - Center "physioapp" pulses once when triggered
   ============================================================ */
/* ============================================================
   FEATURE HUB — static diagram
   Center: PhysioApp logo
   Left branch: Patient clipart with HEP/Assessment above, WhatsApp below
   Right branch: Clinic with Branch above, Billing + Dashboard below
   Lines draw in on scroll; icons swivel on hover and reveal label
   ============================================================ */
function FeatureHub() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, amount: 0.3 });

  // viewBox 1000 x 300 — single horizontal spine with one fork per side.
  const VB_W = 1000;
  const VB_H = 300;
  const SPINE_Y = 150;
  const SPINE_X1 = 70;
  const SPINE_X2 = 930;
  const LEFT_FORK_X = 300;
  const RIGHT_FORK_X = 700;

  type Node = {
    key: string;
    label: string;
    icon: typeof Activity;
    x: number;
    y: number;
    forkX: number; // where the branch meets the spine
    elbowX?: number; // if set, branch bends here at y = node.y (turning edge)
    bg: string;
    fg: string;
  };

  // Bent branches: diagonal from the spine up/down to an elbow, then a short
  // horizontal run into the icon. The elbow gets a purple dot.
  const nodes: Node[] = [
    {
      key: "patient",
      label: "Patient",
      icon: UserPlus,
      x: SPINE_X1,
      y: SPINE_Y,
      forkX: SPINE_X1,
      bg: "#FDE68A",
      fg: "#B45309",
    },
    {
      key: "assessment",
      label: "SVG Assessment",
      icon: ScanLine,
      x: 150,
      y: 22,
      forkX: 245,
      elbowX: 200,
      bg: "#BAE6FD",
      fg: "#0369A1",
    },
    {
      key: "hep",
      label: "Home Exercise",
      icon: Dumbbell,
      x: 260,
      y: 22,
      forkX: 400,
      elbowX: 305,
      bg: "#E9D5FF",
      fg: "#6D28D9",
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      x: 250,
      y: 278,
      forkX: 355,
      elbowX: 300,
      bg: "#DCFCE7",
      fg: "#15803D",
    },
    {
      key: "clinic",
      label: "Clinic",
      icon: Building2,
      x: SPINE_X2,
      y: SPINE_Y,
      forkX: SPINE_X2,
      bg: "#FED7AA",
      fg: "#C2410C",
    },
    {
      key: "billing",
      label: "Billing",
      icon: FileText,
      x: 850,
      y: 22,
      forkX: 655,
      elbowX: 780,
      bg: "#FFE4E6",
      fg: "#BE123C",
    },
    {
      key: "dashboard",
      label: "Dashboard",
      icon: CreditCard,
      x: 785,
      y: 278,
      forkX: 700,
      elbowX: 760,
      bg: "#FEF3C7",
      fg: "#B45309",
    },
  ];

  const ICON_R = 32;
  const trim = (x1: number, y1: number, x2: number, y2: number, r: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    return { x: x2 - (dx / len) * r, y: y2 - (dy / len) * r };
  };

  const spineLeftTrim = trim(SPINE_X1 + 40, SPINE_Y, SPINE_X1, SPINE_Y, ICON_R + 4);
  const spineRightTrim = trim(SPINE_X2 - 40, SPINE_Y, SPINE_X2, SPINE_Y, ICON_R + 4);

  const branchNodes = nodes.filter((n) => n.y !== SPINE_Y);

  // Each branch => diagonal segment + horizontal segment (elbow'd polyline).
  type Seg = {
    key: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    delay: number;
    dashed: boolean;
  };
  const branchSegs: Seg[] = [];
  const elbowDots: { key: string; x: number; y: number; delay: number }[] = [];
  const forkDots: { x: number; y: number; delay: number }[] = [];

  branchNodes.forEach((n, i) => {
    const baseDelay = 0.85 + i * 0.09;
    const elbowX = n.elbowX ?? n.forkX;
    // horizontal endpoint into the icon
    const iconEdgeX = n.x + (elbowX < n.x ? -ICON_R : ICON_R);
    branchSegs.push({
      key: `${n.key}-diag`,
      x1: n.forkX,
      y1: SPINE_Y,
      x2: elbowX,
      y2: n.y,
      delay: baseDelay,
      dashed: true,
    });
    branchSegs.push({
      key: `${n.key}-horz`,
      x1: elbowX,
      y1: n.y,
      x2: iconEdgeX,
      y2: n.y,
      delay: baseDelay + 0.25,
      dashed: true,
    });
    elbowDots.push({ key: n.key, x: elbowX, y: n.y, delay: baseDelay + 0.22 });
    forkDots.push({ x: n.forkX, y: SPINE_Y, delay: 0.8 + i * 0.09 });
  });

  const lines = [
    {
      key: "spine-l",
      x1: 500,
      y1: SPINE_Y,
      x2: spineLeftTrim.x,
      y2: spineLeftTrim.y,
      delay: 0.15,
      dashed: false,
    },
    {
      key: "spine-r",
      x1: 500,
      y1: SPINE_Y,
      x2: spineRightTrim.x,
      y2: spineRightTrim.y,
      delay: 0.15,
      dashed: false,
    },
    ...branchSegs,
  ];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative bg-white min-h-screen w-full flex flex-col justify-center py-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0FDFA] text-xs font-semibold text-[#0d9488] mb-6 ring-1 ring-[#14b8a6]/20"
          >
            One workspace
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-[#0F172A]"
          >
            The one clinic OS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base md:text-lg text-[#0F172A]/60"
          >
            Every workflow branches into one calm spine — patient side and clinic side, flowing
            together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-7"
          >
            <Button
              asChild
              className="rounded-full bg-[#F97316] hover:bg-[#ea6a10] text-white shadow-lg px-7 py-6 text-base font-semibold"
            >
              <a href={`${SIGNUP_URL}?plan=demo`}>
                Request a Demo <ArrowUpRight className="size-4 ml-1" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Fishbone stage */}
        <div ref={stageRef} className="relative w-full mx-auto" style={{ maxWidth: 1100 }}>
          <div className="relative w-full" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              {lines.map((l, i) => (
                <motion.line
                  key={i}
                  x1={l.x1}
                  y1={l.y1}
                  x2={l.x2}
                  y2={l.y2}
                  stroke="#94a3b8"
                  strokeOpacity={l.dashed ? 0.55 : 0.75}
                  strokeWidth={l.dashed ? 1.5 : 2}
                  strokeLinecap="round"
                  strokeDasharray={l.dashed ? "4 5" : undefined}
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.9, delay: l.delay, ease: "easeInOut" }}
                />
              ))}

              {forkDots.map((d, i) => (
                <motion.circle
                  key={`fork-${i}`}
                  cx={d.x}
                  cy={d.y}
                  r="5"
                  fill="#a855f7"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: d.delay, type: "spring", stiffness: 260, damping: 14 }}
                  style={{ transformOrigin: `${d.x}px ${d.y}px` }}
                />
              ))}

              {elbowDots.map((d) => (
                <motion.g key={`elbow-${d.key}`}>
                  <motion.circle
                    cx={d.x}
                    cy={d.y}
                    r="8"
                    fill="#a855f7"
                    fillOpacity={0.18}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: d.delay, type: "spring", stiffness: 260, damping: 14 }}
                    style={{ transformOrigin: `${d.x}px ${d.y}px` }}
                  />
                  <motion.circle
                    cx={d.x}
                    cy={d.y}
                    r="4"
                    fill="#a855f7"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      delay: d.delay + 0.05,
                      type: "spring",
                      stiffness: 260,
                      damping: 14,
                    }}
                    style={{ transformOrigin: `${d.x}px ${d.y}px` }}
                  />
                </motion.g>
              ))}
            </svg>

            {/* Centre PhysioApp logo hub */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: "50%", top: `${(SPINE_Y / VB_H) * 100}%` }}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.4, type: "spring", stiffness: 180, damping: 15 }}
            >
              <div className="relative">
                {inView && (
                  <motion.span
                    className="absolute inset-0 rounded-3xl bg-[#14b8a6]/25"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <div className="relative flex items-center rounded-2xl bg-gradient-to-br from-[#2dd4bf] to-[#0d9488] px-5 py-4 shadow-[0_20px_50px_-10px_rgba(20,184,166,0.6)]">
                  <img
                    src={logoMark}
                    alt="PhysioApp"
                    className="size-12 rounded-full object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* Icon nodes */}
            {nodes.map((n, i) => (
              <HubNode
                key={n.key}
                node={n}
                inView={inView}
                delay={1.15 + i * 0.08}
                stageW={VB_W}
                stageH={VB_H}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HubNode({
  node,
  inView,
  delay,
  stageW,
  stageH,
}: {
  node: {
    key: string;
    label: string;
    icon: typeof Activity;
    x: number;
    y: number;
    bg: string;
    fg: string;
  };
  inView: boolean;
  delay: number;
  stageW: number;
  stageH: number;
}) {
  const [hover, setHover] = useState(false);
  const Icon = node.icon;
  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
      style={{
        left: `${(node.x / stageW) * 100}%`,
        top: `${(node.y / stageH) * 100}%`,
      }}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, type: "spring", stiffness: 200, damping: 16 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={hover ? { rotate: [-12, 12, -12], scale: 1.08 } : { rotate: 0, scale: 1 }}
          transition={
            hover
              ? {
                  rotate: { duration: 0.9, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 0.2 },
                }
              : { type: "spring", stiffness: 240, damping: 16 }
          }
          className="size-16 rounded-2xl flex items-center justify-center shadow-[0_12px_30px_-8px_rgba(15,23,42,0.25)] ring-1 ring-black/5 cursor-pointer"
          style={{ backgroundColor: node.bg, color: node.fg }}
        >
          <Icon className="size-7" />
        </motion.div>

        <AnimatePresence>
          {hover && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 whitespace-nowrap px-2.5 py-1 rounded-md bg-[#0F172A] text-white text-[11px] font-semibold shadow"
            >
              {node.label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ============================================================
   EXPLORE EACH FEATURE — premium bento grid, hover-reactive
   ============================================================ */
function FeatureWheel({ isUK }: { isUK: boolean }) {
  const items = [
    {
      title: "Patient Intake",
      desc: "Digital forms filled in two minutes. Consent captured over WhatsApp before the first visit.",
      icon: UserPlus,
      span: "md:col-span-2",
      accent: "from-[#F0FDFA] to-white",
      dot: "#14b8a6",
    },
    {
      title: "SVG Assessment",
      desc: "Tap the body — mark the pain. Compare visits side-by-side and watch recovery draw itself.",
      icon: ScanLine,
      span: "md:col-span-2 md:row-span-2",
      accent: "from-[#0F172A] to-[#14b8a6]",
      dot: "#ffffff",
      dark: true,
    },
    {
      title: "WhatsApp Reminders",
      desc: "94% open rate. Exercise nudges, appointment confirms and payment follow-ups — automated.",
      icon: MessageCircle,
      span: "md:col-span-2",
      accent: "from-[#DCFCE7] to-white",
      dot: "#15803D",
    },
    {
      title: "Home Exercise",
      desc: "Personalised video plans. Track completion daily.",
      icon: Dumbbell,
      span: "md:col-span-2",
      accent: "from-[#E9D5FF] to-white",
      dot: "#6D28D9",
    },
    {
      title: isUK ? "Billing & Invoicing" : "UPI Billing",
      desc: isUK
        ? "VAT-ready invoices in seconds. Card and bank payments, auto-reconciled."
        : "GST-ready invoices in seconds. UPI collect in one tap, auto-reconciled.",
      icon: Wallet,
      span: "md:col-span-2",
      accent: "from-[#FFE4E6] to-white",
      dot: "#BE123C",
    },
    {
      title: "Branch Management",
      desc: "Unified view across every location. Per-branch revenue, load and recovery trends.",
      icon: Building2,
      span: "md:col-span-2",
      accent: "from-[#CFFAFE] to-white",
      dot: "#0E7490",
    },
    {
      title: "Recovery Dashboard",
      desc: "Everything, at a glance. Weekly trends, drop-off risks, therapist load.",
      icon: Activity,
      span: "md:col-span-2",
      accent: "from-[#FED7AA] to-white",
      dot: "#C2410C",
    },
    {
      title: "Referral Reports",
      desc: "One tap sends the recovery report to the referring doctor. They see results. They send more patients.",
      icon: FileText,
      span: "md:col-span-2",
      accent: "from-[#FCE7F3] to-white",
      dot: "#BE185D",
    },
  ];

  return (
    <section className="min-h-screen w-full flex items-center bg-[#F0FDFA] py-24 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#14b8a6] font-bold mb-4">
              Explore each feature
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] text-[#0F172A]">
              One physio solution <span className="text-[#14b8a6]">for all.</span>
            </h2>
          </div>
          <p className="text-base md:text-lg text-[#0F172A]/65 max-w-md md:justify-self-end">
            Eight tools, one calm rhythm. Hover any tile — the whole clinic bends around the patient
            in front of you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 md:auto-rows-[220px] gap-5">
          {items.map((it, i) => (
            <BentoTile key={it.title} item={it} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoTile({
  item,
  index,
}: {
  item: {
    title: string;
    desc: string;
    icon: typeof Activity;
    span: string;
    accent: string;
    dot: string;
    dark?: boolean;
  };
  index: number;
}) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${item.accent} p-7 md:p-8 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.25)] ring-1 ring-black/5 ${item.span}`}
    >
      <div
        className="absolute -right-16 -top-16 size-48 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ backgroundColor: item.dot }}
      />
      <div className="relative flex h-full flex-col">
        <div
          className="flex size-12 items-center justify-center rounded-2xl shadow-sm ring-1 ring-black/5 transition-transform duration-500 group-hover:rotate-6"
          style={{
            backgroundColor: item.dark ? "rgba(255,255,255,0.15)" : "white",
            color: item.dot,
          }}
        >
          <Icon className="size-6" />
        </div>
        <h3
          className={`mt-6 font-display text-2xl font-bold tracking-tight ${item.dark ? "text-white" : "text-[#0F172A]"}`}
        >
          {item.title}
        </h3>
        <p
          className={`mt-3 text-sm leading-relaxed ${item.dark ? "text-white/75" : "text-[#0F172A]/65"} max-w-md`}
        >
          {item.desc}
        </p>
        <div
          className={`mt-auto pt-6 flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase ${item.dark ? "text-white/90" : "text-[#14b8a6]"} opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0`}
        >
          Learn more <ArrowUpRight className="size-3.5" />
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   BUILT FOR EVERYONE — full-width carousel of app screens
   ============================================================ */
function BuiltForEveryone() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "center" });
  const [sel, setSel] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSel = () => setSel(embla.selectedScrollSnap());
    embla.on("select", onSel);
    const t = setInterval(() => embla.scrollNext(), 4500);
    return () => {
      embla.off("select", onSel);
      clearInterval(t);
    };
  }, [embla]);

  const screens = [
    { title: "Clinic Dashboard", subtitle: "Everything, at a glance", render: <DashboardScreen /> },
    {
      title: "Patient Assessment",
      subtitle: "Tap the body — see the pain",
      render: <AssessmentScreen />,
    },
    {
      title: "WhatsApp Integration",
      subtitle: "Where patients already are",
      render: <WhatsAppScreen />,
    },
    { title: "Home Exercise Plan", subtitle: "Recovery, on their phone", render: <HEPScreen /> },
    {
      title: "Close the referral loop",
      subtitle: "The doctor who sent this patient? They'll know it worked.",
      render: <ReferralScreen />,
    },
  ];

  return (
    <section
      id="product"
      className="min-h-screen w-screen flex flex-col justify-center py-20 bg-white"
    >
      <div className="w-full px-6 md:px-10 text-center mb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-[#14b8a6] font-bold mb-4">
          Built for everyone in the clinic
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight w-full">
          Your patients show you where it hurts —{" "}
          <span className="text-[#14b8a6]">before they even walk in.</span>
        </h2>
        <p className="mt-5 text-lg text-[#0F172A]/70 w-full">
          {screens[sel].title} · {screens[sel].subtitle}
        </p>
      </div>

      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex">
          {screens.map((s, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%] px-6 md:px-10">
              <div className="rounded-[2rem] bg-white border border-[#0F172A]/10 shadow-2xl overflow-hidden w-full">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#0F172A]/5">
                  <span className="size-2.5 rounded-full bg-[#F97316]" />
                  <span className="size-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="size-2.5 rounded-full bg-[#14b8a6]" />
                  <span className="mx-auto text-[11px] text-[#0F172A]/40 font-mono">
                    physioapp.io / {s.title.toLowerCase().replace(/\s+/g, "-")}
                  </span>
                </div>
                <div className="p-4 md:p-8 min-h-[420px] bg-white">{s.render}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {screens.map((_, k) => (
          <button
            key={k}
            aria-label={`Slide ${k + 1}`}
            onClick={() => embla?.scrollTo(k)}
            className={`h-1.5 rounded-full transition-all ${
              k === sel ? "w-8 bg-[#14b8a6]" : "w-2 bg-[#0F172A]/15"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* --- carousel screen mocks --- */
function DashboardScreen() {
  const stats = [
    { l: "Patients", v: "1,284", g: "#14b8a6" },
    { l: "Sessions", v: "312", g: "#F97316" },
    { l: "Revenue", v: "₹4.2L", g: "#0F172A" },
  ];
  return (
    <div className="grid grid-cols-12 gap-4">
      <aside className="col-span-3 hidden md:block space-y-2">
        {["Overview", "Patients", "Calendar", "Billing", "Reports"].map((s, i) => (
          <div
            key={s}
            className={`text-xs px-3 py-2 rounded-lg font-medium ${
              i === 0 ? "bg-[#0F172A] text-white" : "text-[#0F172A]/60 hover:bg-[#F0FDFA]"
            }`}
          >
            {s}
          </div>
        ))}
      </aside>
      <div className="col-span-12 md:col-span-9 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((k) => (
            <div key={k.l} className="rounded-xl border border-[#0F172A]/10 p-3">
              <p className="text-[10px] uppercase text-[#0F172A]/50 font-bold tracking-wider">
                {k.l}
              </p>
              <p className="font-display text-2xl font-bold mt-1">{k.v}</p>
              <div className="mt-2 h-1.5 rounded-full" style={{ background: k.g }} />
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-[#0F172A]/10 p-4">
          <p className="text-sm font-semibold mb-3">Weekly recovery trend</p>
          <svg viewBox="0 0 400 120" className="w-full h-28">
            <defs>
              <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,95 C40,85 80,70 120,60 C160,50 200,55 240,42 C280,30 320,25 400,10 L400,120 L0,120 Z"
              fill="url(#dg)"
            />
            <path
              d="M0,95 C40,85 80,70 120,60 C160,50 200,55 240,42 C280,30 320,25 400,10"
              fill="none"
              stroke="#14b8a6"
              strokeWidth="2.5"
            />
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {["A. Sharma — 10:30", "R. Patel — 11:00", "S. Iyer — 11:45", "K. Rao — 12:15"].map(
            (u) => (
              <div
                key={u}
                className="flex items-center gap-2 rounded-lg border border-[#0F172A]/10 px-3 py-2 text-xs"
              >
                <Calendar className="size-4 text-[#14b8a6]" />
                {u}
              </div>
            ),
          )}
        </div>
        <div className="rounded-xl border border-[#0F172A]/10 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold">Referrals by doctor</p>
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#14b8a6]">
              This month
            </span>
          </div>
          <ul className="space-y-2">
            {[
              { n: "Dr. Kumar", p: 14 },
              { n: "Dr. Mehta", p: 9 },
              { n: "Dr. Reddy", p: 6 },
            ].map((r) => (
              <li key={r.n} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-[#0F172A]/80">
                  <UserPlus className="size-3.5 text-[#BE185D]" />
                  {r.n}
                </span>
                <span className="font-semibold text-[#0F172A]">{r.p} patients</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function AssessmentScreen() {
  const pts = [
    { x: 100, y: 90, s: "Neck" },
    { x: 92, y: 145, s: "Shoulder" },
    { x: 108, y: 210, s: "Lower back" },
    { x: 96, y: 300, s: "Knee" },
  ];
  return (
    <div className="grid grid-cols-12 gap-4 items-center">
      <div className="col-span-12 md:col-span-5 flex justify-center">
        <svg viewBox="0 0 200 400" className="h-[360px]">
          <path
            d="M100 20 c14 0 22 12 22 26 s-8 26 -22 26 s-22 -12 -22 -26 s8 -26 22 -26 z
               M70 78 h60 l10 90 l-10 60 h-60 l-10 -60 z
               M62 230 h30 v130 h-22 z M108 230 h30 v130 h-22 z
               M52 90 l-14 90 l14 8 l6 -84 z M148 90 l14 90 l-14 8 l-6 -84 z"
            fill="#F0FDFA"
            stroke="#0F172A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {pts.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="10" fill="#F97316" opacity="0.35">
                <animate attributeName="r" values="8;14;8" dur="1.6s" repeatCount="indefinite" />
              </circle>
              <circle cx={p.x} cy={p.y} r="5" fill="#F97316" />
            </g>
          ))}
        </svg>
      </div>
      <div className="col-span-12 md:col-span-7 space-y-3">
        <p className="text-sm font-semibold text-[#0F172A]/60">Patient · A. Sharma · Visit 3</p>
        {pts.map((p, i) => (
          <div
            key={p.s}
            className="rounded-xl border border-[#0F172A]/10 p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-lg bg-[#F97316]/10 text-[#F97316] flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold">{p.s}</p>
                <p className="text-xs text-[#0F172A]/50">Pain trending down</p>
              </div>
            </div>
            <div className="w-24 h-2 rounded-full bg-[#F0FDFA] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#14b8a6]"
                style={{ width: `${40 + i * 15}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatsAppScreen() {
  const msgs = [
    { from: "clinic", t: "Hi Anita 👋 Reminder: session tomorrow at 10:30 AM." },
    { from: "me", t: "Got it, thanks!" },
    { from: "clinic", t: "Here's your home exercise plan for today 🎥" },
    { from: "clinic", t: "Payment link for session #4 → pay in one tap." },
    { from: "me", t: "Paid ✅" },
  ];
  return (
    <div className="grid grid-cols-12 gap-6 items-center">
      <div className="col-span-12 md:col-span-6 space-y-3">
        <p className="text-sm font-semibold text-[#0F172A]/60">Automated on WhatsApp</p>
        <h3 className="font-display text-2xl font-bold">Your patients read this. Every time.</h3>
        <ul className="space-y-2 mt-3 text-sm">
          {[
            "94% open rate vs 21% for email",
            "Exercise videos delivered natively",
            "UPI payment collected in the same chat",
            "Zero app install for the patient",
          ].map((l) => (
            <li key={l} className="flex gap-2">
              <Check className="size-4 mt-0.5 text-[#14b8a6]" />
              {l}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-12 md:col-span-6 flex justify-center">
        <div className="w-64 rounded-[2rem] bg-[#0F172A] p-2 shadow-2xl">
          <div className="rounded-[1.6rem] bg-[#E7F5EB] p-3 space-y-2 min-h-[340px]">
            <div className="flex items-center gap-2 pb-2 border-b border-black/5">
              <div className="size-8 rounded-full bg-[#14b8a6] flex items-center justify-center">
                <MessageCircle className="size-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold">PhysioApp Clinic</p>
                <p className="text-[10px] text-[#0F172A]/50">online</p>
              </div>
            </div>
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] text-[11px] px-3 py-2 rounded-2xl ${
                  m.from === "me" ? "ml-auto bg-[#DCF8C6] rounded-tr-sm" : "bg-white rounded-tl-sm"
                }`}
              >
                {m.t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HEPScreen() {
  const ex = [
    "Cervical rotation · 10 reps",
    "Shoulder pendulum · 15 reps",
    "Bridge hold · 30s × 3",
    "Wall squat · 30s × 3",
    "Ankle mobility · 12 reps",
  ];
  return (
    <div className="grid grid-cols-12 gap-6 items-center">
      <div className="col-span-12 md:col-span-6 space-y-3">
        <p className="text-sm font-semibold text-[#0F172A]/60">Today's plan · Anita S.</p>
        <div className="rounded-2xl bg-[#F0FDFA] p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="font-display text-lg font-bold">Recovery streak</p>
            <span className="text-xs font-bold text-[#14b8a6]">12 days 🔥</span>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 21 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded ${
                  i < 15 ? "bg-[#14b8a6]" : i < 18 ? "bg-[#14b8a6]/40" : "bg-[#0F172A]/10"
                }`}
              />
            ))}
          </div>
        </div>
        <ul className="space-y-2">
          {ex.map((e, i) => (
            <li
              key={e}
              className="flex items-center gap-3 rounded-xl border border-[#0F172A]/10 px-3 py-2.5"
            >
              <span
                className={`size-6 rounded-md flex items-center justify-center ${
                  i < 3 ? "bg-[#14b8a6] text-white" : "bg-[#F0FDFA] text-[#14b8a6]"
                }`}
              >
                {i < 3 ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span className="text-sm">{e}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-12 md:col-span-6 flex justify-center">
        <div className="w-64 rounded-[2rem] bg-[#0F172A] p-2 shadow-2xl">
          <div className="rounded-[1.6rem] bg-white p-4 min-h-[340px]">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-[#14b8a6] to-[#0F172A] flex items-center justify-center mb-3">
              <Dumbbell className="size-10 text-white" />
            </div>
            <p className="font-display font-bold text-sm">Bridge Hold</p>
            <p className="text-xs text-[#0F172A]/60 mt-1">
              Lift hips off the floor, hold for 30 seconds. 3 sets.
            </p>
            <Button className="mt-4 w-full h-10 rounded-full bg-[#F97316] hover:bg-[#ea6a10] text-xs">
              Mark done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- PRICING ---------- */
function ReferralScreen() {
  const metrics = [
    { l: "Pain (NPRS)", from: "8", to: "3" },
    { l: "Neck rotation", from: "45°", to: "70°" },
    { l: "Sessions", from: "", to: "8 of 10" },
    { l: "HEP adherence", from: "", to: "86%" },
  ];
  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        {/* Recovery summary card */}
        <div className="rounded-2xl bg-white border border-[#0F172A]/10 p-5">
          <p className="text-[11px] text-[#0F172A]/40 font-mono mb-3">
            physioapp.io / referral-report
          </p>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[#14b8a6]/15 flex items-center justify-center text-[12px] font-bold text-[#0F766E]">
              AS
            </div>
            <div>
              <h3 className="font-display text-base font-bold">Anita Sharma</h3>
              <p className="text-[12px] text-[#0F172A]/60 flex items-center gap-1">
                <UserPlus className="size-3 text-[#BE185D]" />
                Referred by Dr. Kumar · Ortho One
              </p>
            </div>
          </div>

          <div className="mt-4 border-t border-[#0F172A]/10 pt-3 space-y-2.5">
            {metrics.map((m) => (
              <div key={m.l} className="flex items-center justify-between text-sm">
                <span className="text-[#0F172A]/70">{m.l}</span>
                <span className="font-semibold">
                  {m.from && (
                    <>
                      <span className="text-[#0F172A]/40">{m.from}</span>
                      <span className="mx-1 text-[#14b8a6]">→</span>
                    </>
                  )}
                  <span className="text-[#0F172A]">{m.to}</span>
                </span>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full rounded-xl border border-[#0F172A]/15 hover:border-[#14b8a6] hover:bg-[#F0FDFA] text-sm font-semibold py-2.5 px-4 flex items-center justify-center gap-2 transition-colors">
            <Send className="size-4" />
            Send report to Dr. Kumar
          </button>
        </div>

        {/* WhatsApp mock card */}
        <div className="rounded-2xl bg-white border border-[#0F172A]/10 p-5">
          <p className="text-[11px] text-[#0F172A]/40 font-mono mb-3">Dr. Kumar's WhatsApp</p>

          <div className="bg-[#DCF8C6] rounded-xl rounded-tl-sm px-3 py-2.5 text-[13px] text-[#0F172A]">
            Update on your referral, Anita Sharma: pain down 8→3 in 8 sessions. Full recovery report
            attached. — PhysioApp Clinic
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#0F172A]/10 px-3 py-2.5">
            <div className="size-9 rounded-md bg-[#BE185D]/10 flex items-center justify-center">
              <FileText className="size-4 text-[#BE185D]" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-bold truncate">Recovery-report-AS.pdf</p>
              <p className="text-[11px] text-[#0F172A]/50">Pain map · scores · plan</p>
            </div>
          </div>

          <div className="mt-3 rounded-xl bg-[#F1F5F9] px-3 py-2.5 text-[13px] text-[#0F172A]">
            Excellent progress. Sending two more patients your way 👍
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-[#0F172A]/75 pt-2">
        {[
          "Auto-generated PDF",
          "Sent at discharge or milestones",
          "Tracks referrals per doctor",
        ].map((t) => (
          <div key={t} className="flex items-center gap-1.5">
            <Check className="size-4 text-[#14b8a6]" />
            <span className="font-medium">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pricing({ isUK }: { isUK: boolean }) {
  const plans = [
    {
      n: "Starter",
      p: isUK ? "£15" : "₹1,099",
      s: "For solo therapists",
      feats: [
        "Up to 100 patients",
        isUK ? "Billing & VAT invoicing" : "Billing & GST invoicing",
        "Email support",
        "Up to 2 branches",
      ],
      hi: false,
    },
    {
      n: "Advance",
      p: isUK ? "£45" : "₹3,499",
      s: "For growing clinics",
      feats: [
        "Unlimited patients",
        "Exercise video library",
        "Priority support",
        "Up to 5 branches",
      ],
      hi: true,
    },
    {
      n: "Enterprise",
      p: "Custom",
      s: "For multi-branch",
      feats: ["Everything in Advance", "Multi-branch reports", "SSO & audit logs", "Dedicated CSM"],
      hi: false,
    },
  ];
  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 py-28">
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-[#14b8a6] font-bold mb-4">Pricing</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
          Simple pricing. Serious recovery.
        </h2>
        <p className="mt-4 text-[#0F172A]/70 text-lg">Start free for 14 days. No card required.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {plans.map((p) => (
          <div
            key={p.n}
            className={`relative rounded-3xl p-8 transition ${
              p.hi
                ? "bg-[#0F172A] text-white shadow-2xl shadow-[#14b8a6]/25 md:-translate-y-4"
                : "bg-white border border-[#0F172A]/10 hover:shadow-xl"
            }`}
          >
            {p.hi && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#F97316] text-white text-xs font-bold rounded-full">
                MOST POPULAR
              </span>
            )}
            <p className={`text-sm font-semibold ${p.hi ? "text-white/70" : "text-[#0F172A]/60"}`}>
              {p.n}
            </p>
            <p className="font-display text-5xl font-bold mt-2">{p.p}</p>
            <p className={`text-sm mt-1 ${p.hi ? "text-white/60" : "text-[#0F172A]/60"}`}>
              {p.s} · per month
            </p>
            <Button
              asChild
              className={`w-full mt-6 rounded-full h-12 font-semibold ${
                p.hi
                  ? "bg-[#F97316] hover:bg-[#ea6a10] text-white"
                  : "bg-[#0F172A] hover:bg-[#0F172A]/90 text-white"
              }`}
            >
              <a href={`${SIGNUP_URL}?plan=${p.n.toLowerCase()}`}>
                {p.hi ? "Request Demo" : "Get started"}
              </a>
            </Button>
            <ul className="mt-6 space-y-3">
              {p.feats.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="size-4 mt-0.5 shrink-0 text-[#14b8a6]" />
                  <span className={p.hi ? "text-white/85" : "text-[#0F172A]/80"}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const qs = [
    {
      q: "Do my patients need to install anything?",
      a: "No. Reminders, exercise videos and payment links go straight to their WhatsApp — no app install required. A dedicated patient app is coming as part of MVP2.",
    },
    {
      q: "How does the SVG assessment work?",
      a: "Tap the body diagram to mark pain points, severity and range-of-motion. Every visit is stored so you can see recovery, visit over visit.",
    },
    {
      q: "Can I import patients from my current system?",
      a: "Yes. We provide CSV import and a white-glove migration service on the Advance and Enterprise plans.",
    },
    {
      q: "Is my data secure?",
      a: "PhysioApp is HIPAA and DPDP-aligned with encryption at rest and in transit, granular role-based access and full audit logs.",
    },
    {
      q: "Can I use PhysioApp across multiple branches?",
      a: "Absolutely. The Enterprise plan gives you unified reporting, branch-level settings and SSO.",
    },
  ];
  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[#14b8a6] font-bold mb-4">FAQ</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
          Questions, answered.
        </h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {qs.map((q, i) => (
          <AccordionItem
            key={i}
            value={`i${i}`}
            className="bg-white rounded-2xl px-5 border border-[#0F172A]/10"
          >
            <AccordionTrigger className="text-left font-semibold hover:no-underline">
              {q.q}
            </AccordionTrigger>
            <AccordionContent className="text-[#0F172A]/70 leading-relaxed">{q.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

/* ---------- FOOTER ---------- */
const LEGAL_HREFS: Record<string, string> = {
  "Privacy Policy": "/privacy-policy",
  "Terms of Service": "/terms-of-service",
  "Data Deletion": "/data-deletion",
};

function Footer() {
  const cols = [
    { t: "Product", l: ["Features", "Pricing", "Integrations", "Changelog"] },
    { t: "Company", l: ["About", "Careers", "Contact", "Press"] },
    { t: "Resources", l: ["Blog", "Docs", "Community", "Support"] },
    { t: "Legal", l: ["Privacy Policy", "Terms of Service", "Data Deletion"] },
  ];
  return (
    <footer className="bg-[#0F172A] text-white/80">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid md:grid-cols-6 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <img src={logoMark} alt="PhysioApp" className="size-14 rounded-full object-contain" />
            </div>

            <p className="mt-4 text-white/60 text-sm max-w-xs">
              The physio software that shows recovery, not just records it.
            </p>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-widest text-[#14b8a6] font-semibold mb-3">
                Get product updates
              </p>
              <form className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="you@clinic.com"
                  className="flex-1 h-11 px-4 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                />
                <Button className="h-11 rounded-full bg-[#F97316] hover:bg-[#ea6a10] text-white px-5">
                  Subscribe
                </Button>
              </form>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {[Twitter, Instagram, Facebook, Github].map((SocialIcon, i) => (
                <a
                  key={i}
                  href="#"
                  className="size-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-[#14b8a6] hover:border-[#14b8a6] transition"
                >
                  <SocialIcon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.t}>
              <p className="text-xs uppercase tracking-widest text-[#14b8a6] font-semibold mb-4">
                {c.t}
              </p>
              <ul className="space-y-2 text-sm">
                {c.l.map((x) => (
                  <li key={x}>
                    <a
                      href={LEGAL_HREFS[x] ?? "#"}
                      className="hover:text-[#14b8a6] transition text-white/70"
                    >
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>© 2026 PhysioApp. All rights reserved.</p>
          <p>Built for physiotherapists — with care.</p>
        </div>
      </div>
    </footer>
  );
}
