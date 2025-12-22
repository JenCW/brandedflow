import Link from "next/link";
import { CheckCircle, ArrowLeft, RefreshCw } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rate & Term Refinance | Enzo Mortgages",
  description: "Lower your interest rate or change your loan term without taking cash out. Reduce your monthly payment or pay off your loan faster.",
};

export default function RateTermRefinancePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-zinc-900 py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <Link href="/services/refinance" className="inline-flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Refinance
          </Link>
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Refinance</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
            Rate & Term Refinance
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Lower your interest rate or change your loan term to save money or pay off your mortgage faster.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="bg-primary/10 p-6 mb-12 flex items-start gap-4">
            <RefreshCw className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-zinc-900 mb-2">Simple Goal: Better Terms</h3>
              <p className="text-zinc-600">Rate & term refinancing replaces your current mortgage with a new one, ideally at a lower rate or better terms, without taking cash out.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-8 uppercase tracking-wide">Why Refinance?</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Lower Monthly Payment</h3>
                <p className="text-zinc-600">Reduce your rate to lower what you pay each month</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Shorten Your Term</h3>
                <p className="text-zinc-600">Go from 30 years to 15 and pay off faster</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Remove PMI</h3>
                <p className="text-zinc-600">If you've built equity, eliminate mortgage insurance</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Switch Loan Type</h3>
                <p className="text-zinc-600">Move from ARM to fixed for stability</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-4 text-lg font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-apply-rate-term"
            >
              Check My Rate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
