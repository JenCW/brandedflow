import Link from "next/link";
import type { Metadata } from "next";
import { FAQSchema } from "@/app/components/Schema";

export const metadata: Metadata = {
  title: "First-Time Home Buyer Loans | Enzo Mortgages",
  description: "Clear, steady guidance from pre-approval to closing — so you can move forward with confidence. Expert support for first-time home buyers.",
};

const faqs = [
  { question: "How much down payment do I need as a first-time buyer?", answer: "Down payment requirements vary by loan type. Some programs allow as little as 3% down, while others may require more." },
  { question: "What is pre-approval and why is it important?", answer: "Pre-approval is a lender's conditional commitment to lend you a specific amount. It shows sellers you're a serious buyer." },
  { question: "How long does the home buying process take?", answer: "The timeline varies, but typically takes 30-45 days from accepted offer to closing." },
];

export default function FirstTimeBuyerPage() {
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
            First-Time Home Buying — Without the Overwhelm
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 mb-12 leading-relaxed">
            Clear, steady guidance from pre-approval to closing — so you can move forward with confidence.
          </p>
        </div>
      </section>

      {/* Body Content */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              Buying your first home is exciting, but it can also feel confusing and high-pressure. Between rates, paperwork, and competing advice, it's easy to feel unsure about what actually matters.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              Sam works closely with first-time buyers to explain the process clearly, answer questions honestly, and keep things moving at a pace that makes sense. No rushed decisions. No unnecessary pressure.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-12">
              The goal is simple: help you understand your options so you can choose what's right for you.
            </p>
          </div>

          {/* What This Covers */}
          <div className="bg-zinc-900 p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">What This Covers</h2>
            <ul className="space-y-4 text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                First-time buyer loan programs
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                Down payment options
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                Pre-approval guidance
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                Step-by-step support through closing
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
              Get Pre-Approved
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
