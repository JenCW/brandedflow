import Link from "next/link";
import { CheckCircle, ArrowLeft, Wallet } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asset-Based Loans | Enzo Mortgages",
  description: "Asset-based mortgage loans for high-net-worth individuals. Qualify based on your liquid assets rather than traditional income verification.",
};

export default function AssetBasedLoansPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-zinc-900 py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <Link href="/services/non-qm" className="inline-flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Non-QM
          </Link>
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Non-QM Loans</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
            Asset-Based Loans
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Qualify based on your liquid assets rather than traditional income verification.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="bg-primary/10 p-6 mb-12 flex items-start gap-4">
            <Wallet className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-zinc-900 mb-2">Your Assets = Your Income</h3>
              <p className="text-zinc-600">Asset-based loans calculate income by dividing your liquid assets by the loan term, creating a monthly income figure for qualification.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-8 uppercase tracking-wide">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">No Income Verification</h3>
                <p className="text-zinc-600">No W-2s or tax returns required</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Flexible Assets</h3>
                <p className="text-zinc-600">Use retirement, stocks, or other liquid assets</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">High Loan Amounts</h3>
                <p className="text-zinc-600">Finance luxury properties</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Retirees Welcome</h3>
                <p className="text-zinc-600">Perfect for those living on investments</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-6 uppercase tracking-wide">Ideal For</h2>
          <ul className="space-y-3 text-zinc-600 mb-12">
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Retirees with significant investment portfolios
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              High-net-worth individuals with complex income
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Those living off investments and dividends
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Business owners who take minimal salary
            </li>
          </ul>

          <div className="text-center">
            <Link
              href="/apply"
              className="btn-luxury"
              data-testid="button-apply-asset-based"
            >
              Explore Asset-Based Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
