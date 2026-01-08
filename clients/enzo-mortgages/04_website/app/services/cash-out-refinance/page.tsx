import Link from "next/link";
import type { Metadata } from "next";
import { FAQSchema } from "@/app/components/Schema";

export const metadata: Metadata = {
  title: "Cash-Out Refinance | Enzo Mortgages",
  description: "Strategic cash-out options designed to support real financial needs. Accessing home equity done thoughtfully.",
};

const faqs = [
  { question: "How much equity can I access with a cash-out refinance?", answer: "Most lenders allow you to borrow up to 80% of your home's value, minus your existing mortgage balance." },
  { question: "What can I use cash-out refinance funds for?", answer: "Funds can be used for home improvements, debt consolidation, education expenses, investments, or other financial needs." },
  { question: "How is a cash-out refinance different from a home equity loan?", answer: "A cash-out refinance replaces your existing mortgage with a new, larger loan, while a home equity loan is a separate loan in addition to your mortgage." },
];

export default function CashOutRefinancePage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide"
            data-testid="text-service-title"
          >
            Accessing Home Equity — Done Thoughtfully
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 mb-12 leading-relaxed">
            Strategic cash-out options designed to support real financial needs.
          </p>
        </div>
      </section>

      {/* Body Content */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              Home equity can be a powerful tool when used intentionally. A cash-out refinance can help consolidate debt, fund major expenses, or provide flexibility during transitions.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              Sam works through these options carefully — explaining costs, long-term impact, and alternatives — so you're not guessing or reacting under pressure.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-12">
              The focus is on using equity responsibly and intelligently.
            </p>
          </div>

          {/* What This Covers */}
          <div className="bg-zinc-900 p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">What This Covers</h2>
            <ul className="space-y-4 text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                Cash-out refinance strategies
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                Equity access planning
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                Long-term financial impact review
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/apply"
              className="btn-luxury"
              data-testid="button-apply-now"
            >
              Explore Cash-Out Options
            </Link>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <div className="py-8 px-6 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/services" 
            className="inline-flex items-center text-zinc-400 hover:text-white text-sm transition-colors"
            data-testid="link-back-services"
          >
            <span className="mr-2">&larr;</span> All Services
          </Link>
        </div>
      </div>
    </div>
  );
}
