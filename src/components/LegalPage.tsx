import type { ReactNode } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  lastUpdated: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0F172A] overflow-x-hidden">
      <SiteNav />
      <main className="max-w-3xl mx-auto px-6 pt-16 pb-24">
        <p className="text-xs uppercase tracking-[0.2em] text-[#14b8a6] font-bold mb-4">
          {eyebrow ?? "Legal"}
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
        <p className="mt-3 text-sm text-[#0F172A]/50">Last updated: {lastUpdated}</p>

        {intro && <div className="mt-6 text-base text-[#0F172A]/70 leading-relaxed">{intro}</div>}

        <div
          className="mt-12 space-y-10
            [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-[#0F172A]
            [&_p]:mt-3 [&_p]:text-[#0F172A]/70 [&_p]:leading-relaxed
            [&_ul]:mt-3 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5
            [&_li]:text-[#0F172A]/70 [&_li]:leading-relaxed
            [&_strong]:text-[#0F172A] [&_strong]:font-semibold
            [&_a]:text-[#0d9488] [&_a]:underline [&_a]:underline-offset-2"
        >
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
