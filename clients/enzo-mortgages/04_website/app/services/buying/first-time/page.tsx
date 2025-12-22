import Link from "next/link";
import { CheckCircle, ArrowLeft, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First-Time Buyer Programs | Enzo Mortgages",
  description: "Special mortgage programs for first-time homebuyers. Low down payments, competitive rates, and expert guidance through every step.",
};

export default function FirstTimeBuyerPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-zinc-900 py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <Link href="/services/buying" className="inline-flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Buying
          </Link>
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Home Buying</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
            First-Time Buyers
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Special programs and guidance designed specifically for first-time homebuyers. We make the process clear and stress-free.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="bg-primary/10 p-6 mb-12 flex items-start gap-4">
            <Heart className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-zinc-900 mb-2">Your First Home Is a Big Deal</h3>
              <p className="text-zinc-600">We understand this is one of the biggest decisions of your life. Our team will guide you through every step with patience and clarity.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-8 uppercase tracking-wide">Available Programs</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Conventional 97</h3>
                <p className="text-zinc-600">Just 3% down for first-time buyers</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">FHA Loans</h3>
                <p className="text-zinc-600">3.5% down with flexible credit requirements</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Down Payment Assistance</h3>
                <p className="text-zinc-600">Access to local and state programs</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Homebuyer Education</h3>
                <p className="text-zinc-600">We'll walk you through the entire process</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-6 uppercase tracking-wide">What to Expect</h2>
          <ul className="space-y-3 text-zinc-600 mb-12">
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Pre-approval in as little as 24 hours
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Clear explanation of all costs and fees
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Regular updates throughout the process
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">•</span>
              Personal guidance from Enzo himself
            </li>
          </ul>

          <div className="text-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-4 text-lg font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-apply-first-time"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
