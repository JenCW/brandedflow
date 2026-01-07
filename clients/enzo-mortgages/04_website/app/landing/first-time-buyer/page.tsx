import QuickLeadForm from "@/app/components/QuickLeadForm";
import EnzoLogo from "@/app/components/EnzoLogo";
import HiddenValuationForm from "@/app/components/HiddenValuationForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First-Time Homebuyer | Enzo Mortgages",
  description: "Down payments as low as 3%. Expert guidance for first-time homebuyers from Enzo Mortgages.",
};

export default function FirstTimeBuyerLandingPage() {
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
              <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Buying a Home</p>
              <h1 
                className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wide"
                data-testid="text-landing-title"
              >
                Your First Home Awaits
              </h1>
              <p className="text-xl text-zinc-300 mb-10 leading-relaxed">
                Buying your first home is a major milestone. Let us guide you through 
                the process with specialized programs designed for first-time buyers.
              </p>
              
              <div className="space-y-5 text-zinc-300 text-lg leading-relaxed mb-10">
                <p>
                  Buying your first home should be exciting, not overwhelming. But between the paperwork, the jargon, and the pressure, it's easy to feel lost.
                </p>
                <p>
                  That's where we come in. Enzo Mortgages specializes in making the process clear and stress-free for first-time buyers.
                </p>
                <p className="text-white font-medium">
                  We believe everyone deserves to see dreams come true — and we'll help you get there.
                </p>
              </div>

              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-lg">•</span>
                  Down payments as low as 3%
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-lg">•</span>
                  FHA, Conventional, and VA options
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-lg">•</span>
                  Down payment assistance programs
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-lg">•</span>
                  Personal guidance from start to finish
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">
                Get Started Today
              </h2>
              <QuickLeadForm source="Landing - First Time Buyer" />
            </div>
          </div>
        </div>
      </section>

      <HiddenValuationForm source="First-Time Buyer Landing Page" />
    </div>
  );
}
