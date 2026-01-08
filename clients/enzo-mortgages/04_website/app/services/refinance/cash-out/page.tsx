import Link from "next/link";
import { CheckCircle, ArrowLeft, Wallet } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cash-Out Refinance | Enzo Mortgages",
  description: "Access your home equity with a cash-out refinance. Use your equity for renovations, debt consolidation, investments, or major expenses.",
};

export default function CashOutRefinancePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-zinc-900 py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <Link href="/services/refinance" className="inline-flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Refinance
          </Link>
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Refinance</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
            Cash-Out Refinance
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Turn your home equity into cash for renovations, debt consolidation, investments, or other major expenses.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="bg-primary/10 p-6 mb-12 flex items-start gap-4">
            <Wallet className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-zinc-900 mb-2">Your Home's Value, Unlocked</h3>
              <p className="text-zinc-600">If your home has appreciated, you may be able to access that equity while potentially lowering your interest rate.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-8 uppercase tracking-wide">Popular Uses</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Home Renovations</h3>
                <p className="text-zinc-600">Kitchen remodels, additions, or updates</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Debt Consolidation</h3>
                <p className="text-zinc-600">Pay off high-interest credit cards</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Investment Property</h3>
                <p className="text-zinc-600">Use equity to purchase rental properties</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Education Expenses</h3>
                <p className="text-zinc-600">Fund college tuition or private school</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-6 uppercase tracking-wide">Requirements</h2>
          <ul className="space-y-3 text-zinc-600 mb-12">
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Typically need 20%+ equity remaining after cash-out
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Credit score requirements vary by program
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Income and employment verification
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Property appraisal to determine current value
            </li>
          </ul>

          <div className="text-center">
            <Link
              href="/apply"
              className="btn-luxury"
              data-testid="button-apply-cash-out"
            >
              Check My Equity
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
