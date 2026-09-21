import { Link } from "@tanstack/react-router";
import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoMark from "@/assets/logo-mark.png";

type FooterLink = { label: string; to: string };

const PRODUCT_LINKS: FooterLink[] = [
  { label: "Features", to: "/#features" },
  { label: "Pricing", to: "/#pricing" },
  { label: "Integrations", to: "/#" },
  { label: "Changelog", to: "/#" },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: "About", to: "/#" },
  { label: "Careers", to: "/#" },
  { label: "Contact", to: "/#" },
  { label: "Press", to: "/#" },
];

const RESOURCE_LINKS: FooterLink[] = [
  { label: "Blog", to: "/#" },
  { label: "Docs", to: "/#" },
  { label: "Community", to: "/#" },
  { label: "Support", to: "/#" },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms-of-service" },
  { label: "Data Deletion", to: "/data-deletion" },
];

const COLUMNS: { t: string; l: FooterLink[] }[] = [
  { t: "Product", l: PRODUCT_LINKS },
  { t: "Company", l: COMPANY_LINKS },
  { t: "Resources", l: RESOURCE_LINKS },
  { t: "Legal", l: LEGAL_LINKS },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#0F172A] text-white/80">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid md:grid-cols-6 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoMark} alt="PhysioApp" className="size-14 rounded-full object-contain" />
            </Link>
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
              {[Twitter, Instagram, Facebook, Github].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="size-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-[#14b8a6] hover:border-[#14b8a6] transition"
                >
                  <I className="size-4" />
                </a>
              ))}
            </div>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.t}>
              <p className="text-xs uppercase tracking-widest text-[#14b8a6] font-semibold mb-4">
                {c.t}
              </p>
              <ul className="space-y-2 text-sm">
                {c.l.map((x) => (
                  <li key={x.label}>
                    <Link to={x.to} className="hover:text-[#14b8a6] transition text-white/70">
                      {x.label}
                    </Link>
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
