import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jumbo Loans | Enzo Mortgages",
  description: "Jumbo mortgage loans for luxury properties that exceed conforming loan limits. Competitive rates for high-value homes.",
};

export default function JumboLoansPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-zinc-900 py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <Link href="/services/buying" className="inline-flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Buying
          </Link>
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Home Buying</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
            Jumbo Loans
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Financing for luxury properties that exceed conforming loan limits. Get the home of your dreams.
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
                <h3 className="font-bold text-zinc-900 mb-1">Higher Loan Limits</h3>
                <p className="text-zinc-600">Finance properties above conforming limits</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Competitive Rates</h3>
                <p className="text-zinc-600">Rates comparable to conventional loans</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Flexible Terms</h3>
                <p className="text-zinc-600">Fixed and adjustable rate options</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Luxury Properties</h3>
                <p className="text-zinc-600">Finance your dream home</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-6 uppercase tracking-wide">Requirements</h2>
          <ul className="space-y-3 text-zinc-600 mb-12">
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Credit score typically 700+ (720+ for best rates)
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Down payment typically 10-20%
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Lower debt-to-income ratio requirements
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Cash reserves (6-12 months)
            </li>
          </ul>

          <div className="text-center">
            <Link
              href="/apply"
              className="btn-luxury"
              data-testid="button-apply-jumbo"
            >
              Apply for Jumbo Loan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
