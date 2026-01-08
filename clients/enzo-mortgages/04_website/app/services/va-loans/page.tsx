import Link from "next/link";
import type { Metadata } from "next";
import { FAQSchema } from "@/app/components/Schema";

export const metadata: Metadata = {
  title: "VA Home Loans | Enzo Mortgages",
  description: "Mortgage support for those who've served, handled with clarity and care. Knowledgeable, respectful guidance for VA loans.",
};

const faqs = [
  { question: "Do VA loans require a down payment?", answer: "No, VA loans offer 100% financing with no down payment required for eligible veterans and service members." },
  { question: "Is private mortgage insurance required on VA loans?", answer: "No, VA loans do not require private mortgage insurance (PMI), which can result in significant monthly savings." },
  { question: "Who is eligible for a VA loan?", answer: "Veterans, active-duty service members, National Guard members, and eligible surviving spouses may qualify for VA loans." },
];

export default function VALoansPage() {
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
            VA Loans — Knowledgeable, Respectful Guidance
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 mb-12 leading-relaxed">
            Mortgage support for those who've served, handled with clarity and care.
          </p>
        </div>
      </section>

      {/* Body Content */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              VA loans offer powerful benefits, but the rules and details matter. Sam works with veterans and active-duty service members to ensure VA loans are structured correctly and efficiently.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              This includes understanding eligibility, property requirements, and timelines — without unnecessary complications or confusion.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-12">
              You've earned these benefits. The process should be handled professionally and with respect.
            </p>
          </div>

          {/* What This Covers */}
          <div className="bg-zinc-900 p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">What This Covers</h2>
            <ul className="space-y-4 text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                VA purchase loans
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                VA refinance options
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                Eligibility review
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                Clear explanations of benefits
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
              Explore VA Loan Options
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
