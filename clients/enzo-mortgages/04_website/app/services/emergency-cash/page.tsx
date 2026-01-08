import Link from "next/link";
import type { Metadata } from "next";
import { FAQSchema } from "@/app/components/Schema";

export const metadata: Metadata = {
  title: "Emergency & Life-Event Loans | Enzo Mortgages",
  description: "Calm, focused mortgage guidance during urgent or unexpected situations. Fast, discreet help when timing matters.",
};

const faqs = [
  { question: "How quickly can I access emergency cash through my home equity?", answer: "Expedited processing is available for qualified borrowers, with some solutions closing in as little as two weeks." },
  { question: "What options are available for emergency cash needs?", answer: "Options may include bridge loans, cash-out refinancing, and home equity lines of credit, depending on your situation." },
  { question: "Do I need perfect credit for emergency cash solutions?", answer: "Flexible qualification criteria are available. We work with borrowers across a range of credit profiles." },
];

export default function EmergencyCashPage() {
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
            When Timing Matters, Experience Matters
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 mb-12 leading-relaxed">
            Calm, focused mortgage guidance during urgent or unexpected situations.
          </p>
        </div>
      </section>

      {/* Body Content */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              Life doesn't always give you time to plan. Job changes, medical expenses, family needs, or sudden financial pressure can require fast, clear decisions.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              Sam approaches these situations with discretion and urgency — without panic or judgment. The priority is understanding what's possible and moving efficiently toward a solution.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-12">
              You don't have to navigate it alone.
            </p>
          </div>

          {/* What This Covers */}
          <div className="bg-zinc-900 p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">What This Covers</h2>
            <ul className="space-y-4 text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                Urgent equity access
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                Short-timeline solutions
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                Discreet, priority handling
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
              Get Help Now
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
