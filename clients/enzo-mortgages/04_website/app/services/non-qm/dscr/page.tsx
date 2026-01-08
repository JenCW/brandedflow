import Link from "next/link";
import { CheckCircle, ArrowLeft, Building2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DSCR Loans | Enzo Mortgages",
  description: "DSCR loans for real estate investors. Qualify based on rental income, not personal income. Perfect for building your investment portfolio.",
};

export default function DSCRLoansPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-zinc-900 py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <Link href="/services/non-qm" className="inline-flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Non-QM
          </Link>
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Non-QM Loans</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
            DSCR Loans
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Debt Service Coverage Ratio loans for real estate investors. Qualify based on rental income, not your personal income.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="bg-primary/10 p-6 mb-12 flex items-start gap-4">
            <Building2 className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-zinc-900 mb-2">What is DSCR?</h3>
              <p className="text-zinc-600">DSCR compares the property's rental income to its mortgage payment. A DSCR of 1.0 means rent covers the payment. Most lenders require 1.0-1.25.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-8 uppercase tracking-wide">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">No Income Verification</h3>
                <p className="text-zinc-600">No W-2s, tax returns, or pay stubs required</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Unlimited Properties</h3>
                <p className="text-zinc-600">No limit on the number of investment properties</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Close in LLC</h3>
                <p className="text-zinc-600">Purchase in your business entity's name</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Fast Closing</h3>
                <p className="text-zinc-600">Streamlined process for experienced investors</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-6 uppercase tracking-wide">Ideal For</h2>
          <ul className="space-y-3 text-zinc-600 mb-12">
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Real estate investors building a rental portfolio
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Self-employed individuals with complex tax returns
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Investors who own multiple properties
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Short-term rental property owners (Airbnb, VRBO)
            </li>
          </ul>

          <div className="text-center">
            <Link
              href="/apply"
              className="btn-luxury"
              data-testid="button-apply-dscr"
            >
              Apply for DSCR Loan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
