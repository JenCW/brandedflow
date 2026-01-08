import Link from "next/link";
import { CheckCircle, ArrowLeft, FileSpreadsheet } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "P&L Loans | Enzo Mortgages",
  description: "P&L Statement loans for self-employed borrowers. Use your CPA-prepared profit and loss statement to qualify for a mortgage.",
};

export default function PnlLoansPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-zinc-900 py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <Link href="/services/non-qm" className="inline-flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Non-QM
          </Link>
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Non-QM Loans</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
            P&L Statement Loans
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Qualify using a CPA-prepared profit and loss statement. Ideal for self-employed borrowers with strong businesses.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="bg-primary/10 p-6 mb-12 flex items-start gap-4">
            <FileSpreadsheet className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-zinc-900 mb-2">CPA-Prepared P&L Statement</h3>
              <p className="text-zinc-600">Your CPA or accountant prepares a profit and loss statement that reflects your true business income. This gives a clearer picture of your earning potential than tax returns alone.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-8 uppercase tracking-wide">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Alternative Documentation</h3>
                <p className="text-zinc-600">Use P&L instead of traditional tax returns</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">CPA Verification</h3>
                <p className="text-zinc-600">Professional verification adds credibility</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">True Income Picture</h3>
                <p className="text-zinc-600">Shows actual business profitability</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Competitive Rates</h3>
                <p className="text-zinc-600">Attractive rates for qualified borrowers</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-6 uppercase tracking-wide">Ideal For</h2>
          <ul className="space-y-3 text-zinc-600 mb-12">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">-</span>
              Self-employed business owners with 2+ years in business
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">-</span>
              Entrepreneurs with growing businesses
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">-</span>
              Professionals with significant write-offs
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">-</span>
              Those who prefer CPA verification over bank statements
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-900 mb-6 uppercase tracking-wide">Requirements</h2>
          <ul className="space-y-3 text-zinc-600 mb-12">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">-</span>
              CPA or licensed accountant prepared P&L statement
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">-</span>
              Minimum 2 years self-employed
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">-</span>
              Business license verification
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">-</span>
              Credit score requirements vary by program
            </li>
          </ul>

          <div className="text-center">
            <Link
              href="/apply"
              className="btn-luxury"
              data-testid="button-apply-pnl"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
