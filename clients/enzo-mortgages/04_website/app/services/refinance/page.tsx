import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { FAQSchema } from "@/app/components/Schema";
import { ArrowRight, RefreshCw, Wallet, Zap, CheckCircle } from "lucide-react";
import houseImage from "@assets/stock_images/luxury_modern_house__5422a8d6.jpg";

export const metadata: Metadata = {
  title: "Refinance Programs | Enzo Mortgages",
  description: "Explore refinance options including Rate & Term, Cash-Out, and Streamline refinancing. Lower your payment, access equity, or improve your terms.",
};

const faqs = [
  { question: "When does refinancing make sense?", answer: "Refinancing may be beneficial when interest rates drop, you want to change your loan term, or you need to remove PMI." },
  { question: "What costs are involved in refinancing?", answer: "Refinancing typically involves closing costs similar to your original mortgage, including appraisal, title, and lender fees." },
  { question: "How long does the refinance process take?", answer: "A typical refinance takes 30 to 45 days from application to closing, depending on various factors." },
];

const programs = [
  {
    title: "Rate & Term Refinance",
    href: "/services/refinance/rate-term",
    icon: RefreshCw,
    description: "Lower your interest rate or change your loan term without taking cash out. Reduce your monthly payment or pay off your loan faster.",
  },
  {
    title: "Cash-Out Refinance",
    href: "/services/refinance/cash-out",
    icon: Wallet,
    description: "Access your home's equity for renovations, debt consolidation, investments, or major expenses.",
  },
  {
    title: "Streamline Refinance",
    href: "/services/refinance/streamline",
    icon: Zap,
    description: "Simplified refinancing for FHA and VA loans with reduced documentation and faster processing.",
  },
];

export default function RefinancePage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section - Full screen with dramatic image */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={houseImage}
            alt="Modern luxury home exterior"
            fill
            className="object-cover grayscale opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase text-lg">Refinance</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 uppercase tracking-wide">
            Refinance With <span className="gradient-text">Confidence</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mb-10 leading-relaxed">
            Whether you want to lower your rate, change your term, or access your home's equity, we'll help you make an informed decision.
          </p>
          <Link
            href="/apply"
            className="btn-luxury btn-shiny animate-glow-pulse"
            data-testid="button-apply-refinance"
          >
            Check My Options <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Programs Section - Dark with glowing cards */}
      <section className="relative bg-zinc-950 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/context/refinance-hero.png"
            alt=""
            fill
            className="object-cover grayscale opacity-20"
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6 uppercase tracking-wide">
            Refinance Programs
          </h2>
          <p className="text-zinc-400 text-lg text-center mb-16 max-w-2xl mx-auto">
            Lower your rate, access equity, or simplify your finances
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Link
                key={program.href}
                href={program.href}
                className="group relative bg-zinc-900/80 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-primary transition-all duration-500 hover:shadow-[0_0_50px_rgba(47,169,159,0.2)] hover:-translate-y-2"
                data-testid={`link-program-${program.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-t-2xl" />
                <div className="flex-shrink-0 w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:shadow-[0_0_30px_rgba(47,169,159,0.3)] transition-all duration-500">
                  <program.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-between gap-4 uppercase tracking-wide">
                  {program.title}
                  <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0" />
                </h3>
                <p className="text-zinc-400 leading-relaxed">{program.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Dark with glowing icons */}
      <section className="relative bg-zinc-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/context/IMG_6083.webp"
            alt=""
            fill
            className="object-cover grayscale opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-16 uppercase tracking-wide">
            Is Refinancing <span className="text-primary">Right</span> For You?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-zinc-800/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(47,169,159,0.15)]">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:shadow-[0_0_25px_rgba(47,169,159,0.3)] transition-all duration-500">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-white mb-3 text-lg">Lower Your Rate</h3>
              <p className="text-zinc-400">If rates have dropped since you got your loan, refinancing could save you thousands.</p>
            </div>
            <div className="bg-zinc-800/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(47,169,159,0.15)]">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:shadow-[0_0_25px_rgba(47,169,159,0.3)] transition-all duration-500">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-white mb-3 text-lg">Change Your Term</h3>
              <p className="text-zinc-400">Switch from a 30-year to a 15-year loan to pay off faster, or extend for lower payments.</p>
            </div>
            <div className="bg-zinc-800/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(47,169,159,0.15)]">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:shadow-[0_0_25px_rgba(47,169,159,0.3)] transition-all duration-500">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-white mb-3 text-lg">Remove PMI</h3>
              <p className="text-zinc-400">If your home has appreciated, refinancing may help you eliminate private mortgage insurance.</p>
            </div>
            <div className="bg-zinc-800/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(47,169,159,0.15)]">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:shadow-[0_0_25px_rgba(47,169,159,0.3)] transition-all duration-500">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-white mb-3 text-lg">Access Equity</h3>
              <p className="text-zinc-400">Cash-out refinancing lets you tap your home's value for major expenses or investments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-zinc-950 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/context/IMG_6096.webp"
            alt=""
            fill
            className="object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950" />
        </div>
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 uppercase tracking-wide">
            Get A Free <span className="text-primary">Refinance</span> Analysis
          </h2>
          <p className="text-zinc-300 text-xl mb-12">
            Not sure if refinancing makes sense? Let us run the numbers and show you what's possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/apply"
              className="btn-luxury btn-shiny"
              data-testid="button-apply-now"
            >
              Start My Application <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-zinc-600 text-white px-10 py-4 text-lg font-medium hover:border-primary hover:bg-primary/10 transition-all duration-300 rounded-lg"
              data-testid="button-contact-refinance"
            >
              Talk to Enzo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
