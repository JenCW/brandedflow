import QuickLeadForm from "@/app/components/QuickLeadForm";
import EnzoLogo from "@/app/components/EnzoLogo";
import HiddenValuationForm from "@/app/components/HiddenValuationForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foreign National Mortgage | Enzo Mortgages",
  description: "Specialized mortgage guidance for foreign nationals and international investors buying property in the United States.",
};

export default function ForeignNationalLandingPage() {
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
              <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Non-QM Loans</p>
              <h1 
                className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wide"
                data-testid="text-landing-title"
              >
                U.S. Property Financing For Foreign Nationals
              </h1>
              <p className="text-xl text-zinc-300 mb-10 leading-relaxed">
                Specialized mortgage guidance for non-U.S. citizens looking to purchase or invest in American real estate.
              </p>
              
              <div className="space-y-5 text-zinc-300 text-lg leading-relaxed mb-10">
                <p>
                  Buying property in the U.S. as a foreign national isn't simple — and it shouldn't be handled casually.
                </p>
                <p>
                  Different documentation. Different income structures. Different lender rules.
                </p>
                <p>
                  Enzo specializes in foreign national and international investor loans. We understand what lenders actually require and how to structure files so they move forward smoothly.
                </p>
                <p className="text-white font-medium">
                  Trust is the luxury everyone deserves — especially when navigating unfamiliar territory.
                </p>
              </div>

              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-lg">•</span>
                  No U.S. credit history required
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-lg">•</span>
                  Use international income documentation
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-lg">•</span>
                  Finance investment and vacation properties
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-lg">•</span>
                  Discreet, professional handling
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">
                Start Your Inquiry
              </h2>
              <QuickLeadForm source="Landing - Foreign National" />
            </div>
          </div>
        </div>
      </section>

      <HiddenValuationForm source="Foreign National Landing Page" />
    </div>
  );
}
