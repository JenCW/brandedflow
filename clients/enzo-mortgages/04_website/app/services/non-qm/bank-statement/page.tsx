import Link from "next/link";
import { CheckCircle, ArrowLeft, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bank Statement Loans | Enzo Mortgages",
  description: "Bank statement loans for self-employed borrowers. Use 12-24 months of bank statements instead of tax returns to qualify.",
};

export default function BankStatementLoansPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-zinc-900 py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <Link href="/services/non-qm" className="inline-flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Non-QM
          </Link>
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Non-QM Loans</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
            Bank Statement Loans
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Perfect for self-employed borrowers. Use 12-24 months of bank statements instead of tax returns.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="bg-primary/10 p-6 mb-12 flex items-start gap-4">
            <FileText className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-zinc-900 mb-2">No Tax Returns Needed</h3>
              <p className="text-zinc-600">Many self-employed individuals write off business expenses, making their tax returns show less income than they actually earn. Bank statement loans solve this problem.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-8 uppercase tracking-wide">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">No Tax Returns</h3>
                <p className="text-zinc-600">Qualify using bank deposits instead</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Personal or Business</h3>
                <p className="text-zinc-600">Use personal or business bank statements</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Flexible Terms</h3>
                <p className="text-zinc-600">Various loan terms and options available</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">High Loan Amounts</h3>
                <p className="text-zinc-600">Loans up to several million dollars</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-6 uppercase tracking-wide">Ideal For</h2>
          <ul className="space-y-3 text-zinc-600 mb-12">
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Self-employed business owners
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Freelancers and consultants
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              1099 contractors
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Anyone with complex tax situations
            </li>
          </ul>

          <div className="text-center">
            <Link
              href="/apply"
              className="btn-luxury"
              data-testid="button-apply-bank-statement"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
