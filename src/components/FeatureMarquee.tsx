import { useMemo } from "react";

type CardDef = {
  title: string;
  tint: string;
  accent: string;
  svg: React.ReactNode;
};

const IntakeSVG = (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    <rect
      x="30"
      y="20"
      width="140"
      height="100"
      rx="12"
      fill="#fff"
      stroke="#0f2a44"
      strokeWidth="2"
    />
    <circle cx="55" cy="45" r="10" fill="#8FD3C1" />
    <rect x="72" y="40" width="70" height="6" rx="3" fill="#0f2a44" />
    <rect x="72" y="52" width="50" height="4" rx="2" fill="#c8d0da" />
    <rect x="45" y="72" width="110" height="6" rx="3" fill="#F4A57C" />
    <rect x="45" y="86" width="90" height="4" rx="2" fill="#e6e2d8" />
    <rect x="45" y="96" width="70" height="4" rx="2" fill="#e6e2d8" />
    <circle cx="150" cy="100" r="12" fill="#F4A57C" />
    <path
      d="M144 100 l4 4 l8 -8"
      stroke="#fff"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const AssessmentSVG = (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    <rect
      x="24"
      y="24"
      width="152"
      height="92"
      rx="10"
      fill="#fff"
      stroke="#0f2a44"
      strokeWidth="2"
    />
    <line x1="40" y1="96" x2="160" y2="96" stroke="#c8d0da" strokeWidth="1.5" />
    <line x1="40" y1="76" x2="160" y2="76" stroke="#eee6d8" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="40" y1="56" x2="160" y2="56" stroke="#eee6d8" strokeWidth="1" strokeDasharray="3 3" />
    <polyline
      points="40,88 60,72 80,80 100,58 120,66 140,44 160,50"
      fill="none"
      stroke="#8FD3C1"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="100" cy="58" r="4" fill="#0f2a44" />
    <circle cx="140" cy="44" r="4" fill="#F4A57C" />
  </svg>
);

const WhatsAppSVG = (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    <rect
      x="60"
      y="14"
      width="80"
      height="112"
      rx="14"
      fill="#fff"
      stroke="#0f2a44"
      strokeWidth="2"
    />
    <rect x="66" y="22" width="68" height="96" rx="8" fill="#E7F5EB" />
    <rect x="72" y="34" width="42" height="14" rx="7" fill="#25D366" />
    <rect x="76" y="40" width="30" height="2.5" rx="1" fill="#fff" />
    <rect
      x="86"
      y="56"
      width="42"
      height="14"
      rx="7"
      fill="#fff"
      stroke="#0f2a44"
      strokeWidth="1.2"
    />
    <rect x="72" y="78" width="52" height="16" rx="8" fill="#25D366" />
    <rect x="76" y="84" width="34" height="2.5" rx="1" fill="#fff" />
    <rect x="76" y="90" width="24" height="2.5" rx="1" fill="#fff" />
    <circle cx="130" cy="102" r="7" fill="#F4A57C" />
    <path
      d="M127 100 v4 M130 98 v6 M133 100 v4"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const UPISVG = (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    <rect x="30" y="30" width="140" height="80" rx="12" fill="#0f2a44" />
    <rect x="30" y="30" width="140" height="18" rx="12" fill="#F4A57C" />
    <rect x="42" y="60" width="34" height="24" rx="4" fill="#8FD3C1" />
    <rect x="42" y="92" width="60" height="6" rx="3" fill="#fff" opacity="0.85" />
    <rect x="42" y="102" width="40" height="4" rx="2" fill="#fff" opacity="0.5" />
    <circle cx="146" cy="92" r="14" fill="#F4A57C" />
    <text
      x="146"
      y="97"
      textAnchor="middle"
      fontSize="12"
      fontWeight="800"
      fontFamily="system-ui"
      fill="#0f2a44"
    >
      ₹
    </text>
  </svg>
);

const BillingSVG = (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    <path
      d="M60 18 h80 v104 l-10 -6 l-10 6 l-10 -6 l-10 6 l-10 -6 l-10 6 l-10 -6 l-10 6 z"
      fill="#fff"
      stroke="#0f2a44"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect x="72" y="34" width="40" height="6" rx="3" fill="#0f2a44" />
    <rect x="72" y="46" width="56" height="4" rx="2" fill="#c8d0da" />
    <rect x="72" y="62" width="56" height="4" rx="2" fill="#e6e2d8" />
    <rect x="72" y="72" width="40" height="4" rx="2" fill="#e6e2d8" />
    <rect x="72" y="82" width="50" height="4" rx="2" fill="#e6e2d8" />
    <rect x="72" y="98" width="30" height="8" rx="4" fill="#8FD3C1" />
    <rect x="108" y="98" width="20" height="8" rx="4" fill="#F4A57C" />
  </svg>
);

const ExerciseSVG = (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    <rect x="24" y="20" width="152" height="100" rx="10" fill="#0f2a44" />
    <rect x="34" y="30" width="132" height="80" rx="6" fill="#FDECE2" />
    {/* stick-figure yoga */}
    <circle cx="100" cy="52" r="7" fill="#0f2a44" />
    <path
      d="M100 60 v18 M100 70 l-14 6 M100 70 l14 -6 M100 78 l-10 16 M100 78 l10 16"
      stroke="#0f2a44"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="152" cy="96" r="10" fill="#F4A57C" />
    <path d="M149 92 v8 l7 -4 z" fill="#fff" />
  </svg>
);

const BranchSVG = (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    <rect
      x="18"
      y="60"
      width="52"
      height="60"
      rx="6"
      fill="#fff"
      stroke="#0f2a44"
      strokeWidth="2"
    />
    <path
      d="M18 60 l26 -20 l26 20 z"
      fill="#8FD3C1"
      stroke="#0f2a44"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect x="30" y="80" width="10" height="14" fill="#0f2a44" />
    <rect x="48" y="80" width="10" height="10" fill="#0f2a44" />
    <rect
      x="78"
      y="48"
      width="52"
      height="72"
      rx="6"
      fill="#fff"
      stroke="#0f2a44"
      strokeWidth="2"
    />
    <path
      d="M78 48 l26 -22 l26 22 z"
      fill="#F4A57C"
      stroke="#0f2a44"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect x="92" y="68" width="10" height="14" fill="#0f2a44" />
    <rect x="108" y="68" width="10" height="14" fill="#0f2a44" />
    <rect x="92" y="90" width="26" height="30" fill="#8FD3C1" />
    <rect
      x="138"
      y="70"
      width="44"
      height="50"
      rx="6"
      fill="#fff"
      stroke="#0f2a44"
      strokeWidth="2"
    />
    <path
      d="M138 70 l22 -18 l22 18 z"
      fill="#8FD3C1"
      stroke="#0f2a44"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect x="150" y="88" width="8" height="10" fill="#0f2a44" />
    <rect x="164" y="88" width="8" height="10" fill="#0f2a44" />
  </svg>
);

const RemindersSVG = (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    <circle cx="100" cy="72" r="46" fill="#FDECE2" />
    <path
      d="M100 40 c-14 0 -24 10 -24 24 v14 l-6 8 h60 l-6 -8 v-14 c0 -14 -10 -24 -24 -24 z"
      fill="#fff"
      stroke="#0f2a44"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M92 92 c2 6 14 6 16 0"
      stroke="#0f2a44"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="128" cy="44" r="10" fill="#F4A57C" />
    <text
      x="128"
      y="48"
      textAnchor="middle"
      fontSize="11"
      fontWeight="800"
      fontFamily="system-ui"
      fill="#fff"
    >
      3
    </text>
  </svg>
);

const CARDS: CardDef[] = [
  { title: "Patient Intake", tint: "bg-[#E8F6F2]", accent: "text-[#0f2a44]", svg: IntakeSVG },
  { title: "SVG Assessments", tint: "bg-[#FDECE2]", accent: "text-[#0f2a44]", svg: AssessmentSVG },
  { title: "WhatsApp Reminders", tint: "bg-[#E6F4EA]", accent: "text-[#0f2a44]", svg: WhatsAppSVG },
  { title: "UPI Payments", tint: "bg-[#F1EFFB]", accent: "text-[#0f2a44]", svg: UPISVG },
  { title: "Billing & Invoice", tint: "bg-[#E8F6F2]", accent: "text-[#0f2a44]", svg: BillingSVG },
  {
    title: "Home Exercise Videos",
    tint: "bg-[#FDECE2]",
    accent: "text-[#0f2a44]",
    svg: ExerciseSVG,
  },
  {
    title: "Automated Reminders",
    tint: "bg-[#E6F4EA]",
    accent: "text-[#0f2a44]",
    svg: RemindersSVG,
  },
  { title: "Branch Management", tint: "bg-[#F1EFFB]", accent: "text-[#0f2a44]", svg: BranchSVG },
];

export function FeatureMarquee() {
  // Duplicate for seamless loop
  const loop = useMemo(() => [...CARDS, ...CARDS], []);

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs font-semibold text-foreground/80 mb-6">
          One workspace
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-3xl">
          A clinic OS that keeps
          <br />
          <span className="italic font-normal text-primary">moving with you.</span>
        </h2>
      </div>

      <div className="relative">
        {/* fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FBF9F4] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#FBF9F4] to-transparent z-10" />

        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max">
          {loop.map((c, i) => (
            <div
              key={`${c.title}-${i}`}
              className="w-[280px] shrink-0 bg-background rounded-3xl border border-border/70 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`${c.tint} rounded-2xl aspect-[4/3] flex items-center justify-center p-6`}
              >
                {c.svg}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <h3 className={`font-display font-bold text-lg ${c.accent}`}>{c.title}</h3>
                <span className="size-8 rounded-full bg-secondary flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7v9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
