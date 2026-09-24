import { createFileRoute } from "@tanstack/react-router";
import { Check, ArrowUpRight, Gift, ShieldCheck, Sparkles, Timer } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { getVisitorCountry } from "@/lib/geo";
import { currencyForCountry, formatPrice, CURRENCY_LABEL, type Currency } from "@/lib/currency";
import {
  PLANS,
  COMPARISON,
  type Plan,
  type PlanId,
  type ComparisonValue,
} from "@/lib/pricing-data";
import { SIGNUP_URL } from "@/lib/links";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  loader: async () => ({ country: await getVisitorCountry() }),
  head: () => ({
    meta: [
      { title: "Pricing - PhysioApp" },
      {
        name: "description",
        content:
          "Simple, transparent pricing for physiotherapy clinics of every size — from solo therapists to multi-branch chains. Start free for 10 days.",
      },
    ],
  }),
});

function signupHref(plan: PlanId) {
  return `${SIGNUP_URL}?plan=${plan}`;
}

function PricingPage() {
  const { country } = Route.useLoaderData();
  const currency = currencyForCountry(country);

  return (
    <div className="min-h-screen bg-white font-sans text-[#0F172A] overflow-x-hidden">
      <SiteNav />
      <PricingHero currency={currency} />
      <TrialBanner />
      <PlanCards currency={currency} />
      <ComparisonTable />
      <SiteFooter />
    </div>
  );
}

/* ---------------------------------------------------------------------- */

function PricingHero({ currency }: { currency: Currency }) {
  return (
    <header className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0FDFA] text-xs font-semibold text-[#0F172A]/80 ring-1 ring-[#14b8a6]/20 mb-6">
        <span className="size-2 rounded-full bg-[#14b8a6] animate-pulse" />
        Simple pricing, no surprises
      </div>
      <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
        A plan for every clinic — <span className="text-[#14b8a6]">solo to multi-branch.</span>
      </h1>
      <p className="mt-6 text-lg text-[#0F172A]/70 max-w-xl mx-auto leading-relaxed">
        Start free, upgrade when you're ready. No setup fees, cancel anytime.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#0F172A]/10 bg-white px-4 py-1.5 text-xs font-medium text-[#0F172A]/60 shadow-sm">
        <Sparkles className="size-3.5 text-[#14b8a6]" />
        {CURRENCY_LABEL[currency]}
      </div>
    </header>
  );
}

function TrialBanner() {
  return (
    <section className="max-w-[1600px] mx-auto px-6 pb-16">
      <div className="rounded-3xl bg-gradient-to-br from-[#F0FDFA] to-[#FFF7ED] border border-[#14b8a6]/15 px-6 py-8 md:px-10 md:py-9 flex flex-col lg:flex-row items-center gap-6">
        <div className="size-16 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center">
          <Gift className="size-7 text-[#F97316]" />
        </div>

        <div className="flex-1 text-center lg:text-left">
          <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight">
            Start your 10-day free trial
          </h2>
          <p className="mt-1.5 text-sm text-[#0F172A]/65 max-w-md">
            Explore the full app, set up your first patient, and see if PhysioApp fits your clinic —
            before you commit to anything.
          </p>
        </div>

        <div className="hidden xl:flex items-center gap-6 text-xs font-medium text-[#0F172A]/70">
          <TrustPoint
            icon={ShieldCheck}
            label={
              <>
                No card
                <br />
                required
              </>
            }
          />
          <TrustPoint
            icon={Sparkles}
            label={
              <>
                Full access
                <br />
                to essentials
              </>
            }
          />
          <TrustPoint
            icon={Timer}
            label={
              <>
                Setup in
                <br />
                minutes
              </>
            }
          />
        </div>

        <a
          href={signupHref("free")}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#F97316] hover:bg-[#ea6a10] text-white text-sm font-semibold px-6 py-3 shadow-md transition-colors"
        >
          Unlock free trial <ArrowUpRight className="size-4" />
        </a>
      </div>
    </section>
  );
}

function TrustPoint({ icon: Icon, label }: { icon: typeof ShieldCheck; label: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="size-8 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
        <Icon className="size-4 text-[#14b8a6]" />
      </span>
      <span className="leading-tight">{label}</span>
    </div>
  );
}

// The Free trial already has its own banner above — no need to repeat it
// as a full plan card here.
const CARD_PLANS = PLANS.filter((p) => p.id !== "free");

function PlanCards({ currency }: { currency: Currency }) {
  return (
    <section id="plans" className="max-w-[1600px] mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {CARD_PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} currency={currency} />
        ))}
      </div>
    </section>
  );
}

function PlanCard({ plan, currency }: { plan: Plan; currency: Currency }) {
  const amount = plan.price[currency];

  return (
    <div
      className={`relative rounded-3xl p-7 flex flex-col ${
        plan.popular
          ? "bg-white border-2 border-[#14b8a6] shadow-[0_25px_60px_-30px_rgba(20,184,166,0.5)] md:-translate-y-3"
          : "bg-white border border-[#0F172A]/10"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-7 px-3 py-1 bg-[#F97316] text-white text-[11px] font-bold uppercase tracking-wide rounded-full">
          Popular
        </span>
      )}

      <h2 className="font-display text-2xl font-bold tracking-tight">{plan.name}</h2>
      <p className="mt-2 text-sm text-[#0F172A]/65 leading-relaxed">{plan.tagline}</p>

      <div className="mt-5 rounded-xl bg-[#F0FDFA] px-4 py-3.5">
        <p className="text-[10px] uppercase tracking-widest font-bold text-[#0d9488]">
          {plan.highlightCaption}
        </p>
        <ul className="mt-2 space-y-1">
          {plan.limits.map((l) => (
            <li key={l} className="flex items-center gap-1.5 text-sm font-medium text-[#0F172A]">
              <span className="size-1.5 rounded-full bg-[#14b8a6] shrink-0" />
              {l}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <span className="font-display text-4xl font-bold tracking-tight">
          {amount === null ? "Custom" : formatPrice(amount, currency)}
        </span>
        <p className="mt-1 text-xs uppercase tracking-wide text-[#0F172A]/45">{plan.priceSuffix}</p>
      </div>

      <a
        href={signupHref(plan.id)}
        className={`mt-6 inline-flex items-center justify-center gap-1.5 rounded-full h-12 text-sm font-semibold transition-colors ${
          plan.popular
            ? "bg-[#F97316] hover:bg-[#ea6a10] text-white shadow-md"
            : "bg-[#0F172A] hover:bg-[#0F172A]/90 text-white"
        }`}
      >
        {plan.ctaLabel} <ArrowUpRight className="size-3.5" />
      </a>

      <ul className="mt-7 space-y-3 flex-1">
        {plan.capabilities.map((c) => (
          <li key={c} className="flex items-start gap-2 text-sm">
            <Check className="size-4 mt-0.5 shrink-0 text-[#14b8a6]" />
            <span className="text-[#0F172A]/80">{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComparisonCell({ value }: { value: ComparisonValue }) {
  if (value === true) {
    return <Check className="size-4 text-[#14b8a6]" />;
  }
  if (value === false) {
    return <span className="text-[#0F172A]/30">–</span>;
  }
  return <span className="text-[#0F172A]/80">{value}</span>;
}

function ComparisonTable() {
  return (
    <section className="max-w-[1600px] mx-auto px-6 pb-24">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-[#14b8a6] font-bold mb-4">
          Compare plans
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
          Every detail, side by side.
        </h2>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-[#0F172A]/10">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-[#0F172A]/10 bg-[#F0FDFA]">
              <th className="text-left font-medium text-[#0F172A]/60 px-6 py-4 w-1/3">&nbsp;</th>
              {PLANS.map((plan) => (
                <th key={plan.id} className="text-left font-display font-bold text-base px-4 py-4">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((group) => (
              <ComparisonRowsGroup key={group.title} title={group.title} rows={group.rows} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ComparisonRowsGroup({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; values: Record<PlanId, ComparisonValue> }[];
}) {
  return (
    <>
      <tr>
        <td
          colSpan={PLANS.length + 1}
          className="px-6 pt-6 pb-2 text-xs uppercase tracking-wide font-bold text-[#0d9488] bg-white"
        >
          {title}
        </td>
      </tr>
      {rows.map((row) => (
        <tr key={row.label} className="border-b border-[#0F172A]/8 last:border-b-0 bg-white">
          <td className="px-6 py-3.5 text-[#0F172A]/80">{row.label}</td>
          {PLANS.map((plan) => (
            <td key={plan.id} className="px-4 py-3.5">
              <ComparisonCell value={row.values[plan.id]} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
