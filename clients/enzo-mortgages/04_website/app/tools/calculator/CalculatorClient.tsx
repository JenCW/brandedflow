"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const MortgageCalculator = dynamic(() => import("@/app/components/MortgageCalculator"), { 
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center text-zinc-400">Loading calculator...</div>
});

export default function CalculatorClient() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Free Tools</p>
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide"
            data-testid="text-calculator-title"
          >
            Mortgage Calculators
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            Get instant estimates for monthly payments, affordability, and refinance savings. No signup required.
          </p>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto bg-zinc-900 border border-zinc-800 p-8 md:p-12">
          <MortgageCalculator />
        </div>
      </section>

      <section className="py-20 px-6 bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide">
            Ready to Get Your Personalized Rate?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            These calculators provide estimates. For accurate rates and terms tailored to your situation, let's talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="btn-luxury"
              data-testid="button-calculator-apply"
            >
              Start Your Application
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-zinc-600 bg-transparent px-10 py-4 text-lg font-medium text-white transition-all hover:bg-zinc-800 hover:border-zinc-500"
              data-testid="button-calculator-contact"
            >
              Talk to Enzo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
