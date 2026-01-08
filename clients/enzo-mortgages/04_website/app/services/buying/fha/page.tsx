import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FHA Loans | Enzo Mortgages",
  description: "FHA loans with flexible credit requirements and low down payments. Government-backed financing for qualified buyers.",
};

export default function FHALoansPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-zinc-900 py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <Link href="/services/buying" className="inline-flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Buying
          </Link>
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Home Buying</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
            FHA Loans
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Government-backed loans with flexible credit requirements and down payments as low as 3.5%.
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
                <p className="text-zinc-600">Just 3.5% down with 580+ credit score</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Flexible Credit</h3>
                <p className="text-zinc-600">Approve borrowers with lower credit scores</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Gift Funds Allowed</h3>
                <p className="text-zinc-600">100% of down payment can be gifted</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Lower Closing Costs</h3>
                <p className="text-zinc-600">Sellers can contribute up to 6% toward closing</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-6 uppercase tracking-wide">Requirements</h2>
          <ul className="space-y-3 text-zinc-600 mb-12">
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Credit score of 580+ for 3.5% down (500-579 for 10% down)
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Property must be primary residence
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Mortgage insurance required (upfront and annual)
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Property must meet FHA minimum standards
            </li>
          </ul>

          <div className="text-center">
            <Link
              href="/apply"
              className="btn-luxury"
              data-testid="button-apply-fha"
            >
              Apply for FHA Loan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
