import QuickLeadForm from "@/app/components/QuickLeadForm";
import EnzoLogo from "@/app/components/EnzoLogo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergency & Life-Event Loans | Enzo Mortgages",
  description: "Calm, focused mortgage guidance for urgent or unexpected situations. Discreet, priority handling from Enzo.",
};

export default function EmergencyCashLandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="py-6 px-6 border-b border-zinc-800">
        <div className="max-w-5xl mx-auto">
          <EnzoLogo size="md" />
        </div>
      </header>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Life Happens</p>
              <h1 
                className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wide"
                data-testid="text-landing-title"
              >
                When Timing Matters, Clarity Matters
              </h1>
              <p className="text-xl text-zinc-300 mb-10 leading-relaxed">
                Calm, focused mortgage guidance for urgent or unexpected situations.
              </p>
              
              <div className="space-y-5 text-zinc-300 text-lg leading-relaxed mb-10">
                <p>
                  Life doesn't always give you time to plan.
                </p>
                <p>
                  Medical costs, family needs, job changes, or sudden financial pressure can require fast, clear decisions.
                </p>
                <p>
                  Enzo approaches these situations with discretion, urgency, and experience — without panic or judgment.
                </p>
                <p className="text-white font-medium">
                  Trust is the luxury everyone deserves — especially when you need it most.
                </p>
              </div>

              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-lg">•</span>
                  Priority handling
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-lg">•</span>
                  Discreet communication
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-lg">•</span>
                  Clear next steps
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-lg">•</span>
                  No pressure, no shame
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">
                Request Immediate Assistance
              </h2>
              <QuickLeadForm source="Landing - Emergency Cash" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
