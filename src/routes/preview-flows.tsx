import { createFileRoute } from "@tanstack/react-router";
import { OnboardingFlow } from "@/components/site/flows/OnboardingFlow";

// Temporary review route — not linked from anywhere, delete once the real
// flow animations are approved and wired into the homepage.
export const Route = createFileRoute("/preview-flows")({
  component: PreviewFlows,
});

function PreviewFlows() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0F172A]">
      <section className="w-full py-24">
        <div className="mx-auto max-w-6xl px-6 text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[#14b8a6] font-bold mb-4">
            Inside the product
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Patient onboarding — <span className="text-[#14b8a6]">this is the actual app.</span>
          </h2>
        </div>

        <div className="mx-auto max-w-5xl px-6">
          <OnboardingFlow />
        </div>
      </section>
    </div>
  );
}
