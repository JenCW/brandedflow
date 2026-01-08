import Link from "next/link";
import type { Metadata } from "next";
import { FAQSchema } from "@/app/components/Schema";

export const metadata: Metadata = {
  title: "Foreign National Mortgage Loans | Enzo Mortgages",
  description: "Clear guidance for international buyers and investors purchasing property in the United States — even without U.S. income or residency. Specializing in foreign national and international investor loans.",
};

const faqs = [
  { question: "Can I get a mortgage in the U.S. without a Social Security number?", answer: "Yes, foreign national loan programs do not require a Social Security number or U.S. credit history." },
  { question: "What types of properties can foreign nationals finance?", answer: "Foreign nationals can typically finance investment properties and vacation homes in the U.S." },
  { question: "What documentation is required for a foreign national mortgage?", answer: "Requirements typically include passport, visa documentation, proof of income, and bank statements." },
];

export default function ForeignNationalPage() {
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
            Foreign National Mortgage Loans — Handled Correctly
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 mb-12 leading-relaxed">
            Clear guidance for international buyers and investors purchasing property in the United States — even without U.S. income or residency.
          </p>
        </div>
      </section>

      {/* Body Content */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              Buying property in the U.S. as a foreign national comes with additional layers of complexity — documentation, income verification, currency considerations, and lender requirements that aren't always clearly explained.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              Enzo specializes in foreign national and international investor loans. We understand how these files are underwritten, what lenders actually look for, and how to structure applications so they move forward smoothly.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-12">
              This is not a one-size-fits-all process. The right approach depends on your residency status, income source, assets, and long-term goals. Sam works through those details carefully so you can invest with confidence.
            </p>
          </div>

          {/* What This Covers */}
          <div className="bg-zinc-900 p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">What This Covers</h2>
            <ul className="space-y-4 text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                Foreign national purchase loans
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                International investor financing
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                ITIN / non-U.S. borrower scenarios
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                High-value and multi-property transactions
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
              Start a Foreign National Inquiry
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
