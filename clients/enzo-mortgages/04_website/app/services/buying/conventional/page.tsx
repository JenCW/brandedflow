import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conventional Loans | Enzo Mortgages",
  description: "Conventional mortgage loans with competitive rates and flexible terms. Down payments as low as 3% for qualified buyers.",
};

export default function ConventionalLoansPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-zinc-900 py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <Link href="/services/buying" className="inline-flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Buying
          </Link>
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Home Buying</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
            Conventional Loans
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Traditional financing with competitive rates for qualified buyers. The most popular choice for homebuyers with good credit.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-zinc-900 mb-8 uppercase tracking-wide">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Low Down Payment</h3>
                <p className="text-zinc-600">As low as 3% down for first-time buyers</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Competitive Rates</h3>
                <p className="text-zinc-600">Often the best rates for qualified borrowers</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Flexible Terms</h3>
                <p className="text-zinc-600">Choose from 10, 15, 20, or 30-year terms</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">PMI Removal</h3>
                <p className="text-zinc-600">PMI can be removed once you reach 20% equity</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-6 uppercase tracking-wide">Requirements</h2>
          <ul className="space-y-3 text-zinc-600 mb-12">
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Credit score of 620 or higher (680+ for best rates)
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Debt-to-income ratio typically below 45%
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Stable employment and income verification
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Property appraisal and inspection
            </li>
          </ul>

          <div className="text-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-4 text-lg font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-apply-conventional"
            >
              Apply for Conventional Loan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
