import Link from "next/link";
import { CheckCircle, ArrowLeft, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Streamline Refinance | Enzo Mortgages",
  description: "Simplified FHA and VA streamline refinancing with reduced documentation and faster processing times.",
};

export default function StreamlineRefinancePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-zinc-900 py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <Link href="/services/refinance" className="inline-flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Refinance
          </Link>
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Refinance</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
            Streamline Refinance
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Simplified refinancing for FHA and VA loans with reduced documentation and faster processing.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="bg-primary/10 p-6 mb-12 flex items-start gap-4">
            <Zap className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-zinc-900 mb-2">Fast & Simple</h3>
              <p className="text-zinc-600">Streamline refinances are designed to be quick and easy with minimal paperwork required.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-8 uppercase tracking-wide">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">No Appraisal Required</h3>
                <p className="text-zinc-600">Most streamline refis don't need a new appraisal</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Reduced Documentation</h3>
                <p className="text-zinc-600">Less paperwork than traditional refinancing</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Faster Closing</h3>
                <p className="text-zinc-600">Typically close in 2-3 weeks</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Lower Costs</h3>
                <p className="text-zinc-600">Reduced closing costs in many cases</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-6 uppercase tracking-wide">Available Programs</h2>
          <ul className="space-y-3 text-zinc-600 mb-12">
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              <strong>FHA Streamline:</strong> For existing FHA loan holders
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              <strong>VA IRRRL:</strong> Interest Rate Reduction Refinance Loan for veterans
            </li>
          </ul>

          <div className="text-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-4 text-lg font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-apply-streamline"
            >
              Start Streamline Refinance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
