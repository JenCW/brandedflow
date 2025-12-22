import Link from "next/link";
import { CheckCircle, ArrowLeft, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VA Loans | Enzo Mortgages",
  description: "VA loans for veterans and active military with zero down payment and no PMI. Honor your service with the home you deserve.",
};

export default function VALoansPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-zinc-900 py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <Link href="/services/buying" className="inline-flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Buying
          </Link>
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Home Buying</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
            VA Loans
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Exclusive benefits for veterans and active-duty military including zero down payment options and no PMI.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="bg-primary/10 p-6 mb-12 flex items-start gap-4">
            <Shield className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-zinc-900 mb-2">Thank You for Your Service</h3>
              <p className="text-zinc-600">VA loans are our way of honoring those who served. We're committed to making the process as smooth as possible.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-8 uppercase tracking-wide">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">No Down Payment</h3>
                <p className="text-zinc-600">100% financing available for qualified veterans</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">No PMI</h3>
                <p className="text-zinc-600">Save hundreds monthly with no private mortgage insurance</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Competitive Rates</h3>
                <p className="text-zinc-600">Often lower rates than conventional loans</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Flexible Credit</h3>
                <p className="text-zinc-600">More lenient credit requirements</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-6 uppercase tracking-wide">Eligibility</h2>
          <ul className="space-y-3 text-zinc-600 mb-12">
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Active-duty service members with 90 days of service
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Veterans with honorable discharge
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              National Guard and Reserve members with 6+ years of service
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Surviving spouses of veterans who died in service or from service-related disability
            </li>
          </ul>

          <div className="text-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-4 text-lg font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-apply-va"
            >
              Apply for VA Loan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
