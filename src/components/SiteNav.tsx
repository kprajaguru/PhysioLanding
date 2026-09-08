import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoMark from "@/assets/logo-mark.png";

const NAV_LINKS = ["Features", "Product", "Pricing", "FAQ"];

export function SiteNav() {
  return (
    <nav className="sticky top-4 z-40 w-full flex justify-center px-4">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur border border-[#0F172A]/10 pl-2 pr-2 py-2 shadow-sm">
        <Link to="/" className="flex items-center gap-2 pl-1">
          <img src={logoMark} alt="PhysioApp" className="size-9 object-contain" />
          <span className="font-display text-base font-bold tracking-tight">PhysioApp</span>
        </Link>
        <div className="hidden md:flex items-center gap-0.5 text-sm font-medium text-[#0F172A]/70 ml-3">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`/#${l.toLowerCase()}`}
              className="px-3 py-1.5 rounded-full hover:bg-[#F0FDFA] hover:text-[#0F172A] transition"
            >
              {l}
            </a>
          ))}
        </div>
        <Button className="rounded-full bg-[#F97316] hover:bg-[#ea6a10] text-white shadow-md h-9 px-4 ml-2 text-sm">
          Request Demo <ArrowUpRight className="size-4" />
        </Button>
      </div>
    </nav>
  );
}
