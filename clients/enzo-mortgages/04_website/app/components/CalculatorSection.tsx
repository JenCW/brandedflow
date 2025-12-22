"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const MortgageCalculator = dynamic(() => import("./MortgageCalculator"), { 
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center text-zinc-300">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        Loading calculator...
      </div>
    </div>
  )
});

export default function CalculatorSection() {
  return (
    <section className="relative bg-zinc-950 py-24 border-y border-zinc-800 overflow-hidden" data-testid="section-calculator">
      {/* Grayscale background image - better framing */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-bottom grayscale"
          style={{ backgroundImage: "url('/images/context/IMG_6080.webp')" }}
        />
        <div className="absolute inset-0 bg-zinc-950/70" />
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase text-lg">Free Tools</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 uppercase tracking-wide">
            Calculate Your Payment
          </h2>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
            Get instant estimates. No signup required. Adjust the sliders to see your numbers in real-time.
          </p>
        </div>
        
        <div className="bg-zinc-900 border-2 border-zinc-700 p-8 md:p-12 shadow-2xl">
          <MortgageCalculator />
        </div>
        
        <div className="text-center mt-8">
          <Link
            href="/tools/calculator"
            className="btn-luxury-outline inline-flex"
            data-testid="link-full-calculator"
          >
            Open Full Calculator <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
