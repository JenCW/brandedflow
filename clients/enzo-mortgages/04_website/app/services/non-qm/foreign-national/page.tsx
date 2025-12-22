import Link from "next/link";
import { CheckCircle, ArrowLeft, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foreign National Loans | Enzo Mortgages",
  description: "Mortgage loans for non-U.S. citizens looking to purchase or invest in American real estate. Specialized guidance for international buyers.",
};

export default function ForeignNationalLoansPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-zinc-900 py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <Link href="/services/non-qm" className="inline-flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Non-QM
          </Link>
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Non-QM Loans</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
            Foreign National Loans
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Specialized financing for non-U.S. citizens looking to purchase or invest in American real estate.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="bg-primary/10 p-6 mb-12 flex items-start gap-4">
            <Globe className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-zinc-900 mb-2">No U.S. Credit Required</h3>
              <p className="text-zinc-600">We work with international credit reports and alternative documentation to qualify foreign nationals for U.S. property purchases.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-8 uppercase tracking-wide">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">No SSN Required</h3>
                <p className="text-zinc-600">Use ITIN or passport for identification</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">International Income</h3>
                <p className="text-zinc-600">Use income from your home country</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Investment Properties</h3>
                <p className="text-zinc-600">Finance rental and vacation properties</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Expert Guidance</h3>
                <p className="text-zinc-600">Navigate U.S. real estate with confidence</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-6 uppercase tracking-wide">Requirements</h2>
          <ul className="space-y-3 text-zinc-600 mb-12">
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Valid passport from your home country
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Down payment typically 25-30% (funds must be in U.S. bank)
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Proof of income or assets from home country
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              International credit report or reference letters from banks
            </li>
          </ul>

          <div className="text-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-4 text-lg font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-apply-foreign-national"
            >
              Start Your Application
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
