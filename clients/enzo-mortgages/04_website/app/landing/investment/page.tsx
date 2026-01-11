"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Building2, Shield, TrendingUp, CheckCircle, ArrowRight, Phone, Star, DollarSign, Percent, Calculator, ChevronDown, Loader2 } from "lucide-react";
import HiddenValuationForm from "@/app/components/HiddenValuationForm";

// Dynamic imports for heavy components
const LeadMagnet = dynamic(() => import("@/app/components/LeadMagnet"), { ssr: false });
const InvestorCalculator = dynamic(() => import("@/app/components/InvestorCalculator"), { ssr: false });

const benefits = [
  { icon: DollarSign, title: "No W-2 Required", description: "DSCR loans qualify you based on rental income, not personal income." },
  { icon: TrendingUp, title: "Scale Your Portfolio", description: "No limit on the number of investment properties you can finance." },
  { icon: Percent, title: "Competitive Rates", description: "Investment property rates starting from 7% with the right down payment." },
  { icon: Shield, title: "Fast Closings", description: "Close in as few as 14 days with our streamlined process." }
];

const loanPrograms = [
  { name: "DSCR Loans", description: "Qualify based on rental income. Perfect for buy-and-hold investors.", minDown: "20%", minDscr: "1.0" },
  { name: "Bank Statement Loans", description: "Use 12-24 months of bank statements instead of tax returns.", minDown: "10%", minDscr: "N/A" },
  { name: "Fix & Flip Loans", description: "Short-term financing for renovation projects.", minDown: "10%", minDscr: "N/A" },
  { name: "Portfolio Loans", description: "Finance multiple properties with one loan application.", minDown: "25%", minDscr: "1.25" }
];

const testimonials = [
  { quote: "Built my portfolio from 2 to 8 properties with Enzo's help. The DSCR loan process was seamless.", name: "Michael D.", location: "Irvine, CA", result: "8 properties financed" },
  { quote: "Self-employed for 10 years but couldn't get approved anywhere. Enzo got me funded in 3 weeks.", name: "Patricia K.", location: "Newport Beach, CA", result: "First rental property" },
  { quote: "Enzo understands investors. He helped me analyze deals and structure financing that works.", name: "Steven L.", location: "Orange, CA", result: "5 properties in 2 years" }
];

const faqs = [
  { question: "What is a DSCR loan?", answer: "DSCR (Debt Service Coverage Ratio) loans qualify you based on the property's rental income, not your personal income. If the property generates enough rent to cover the mortgage, you qualify." },
  { question: "What DSCR ratio do I need?", answer: "Most lenders require 1.0-1.25 DSCR. A 1.0 means rent equals your monthly payment. 1.25 means rent is 25% more than your payment. Higher DSCR gets better rates." },
  { question: "How much down payment do I need?", answer: "Investment property loans typically require 20-25% down. Some programs allow 15% for strong borrowers. We'll find the best option for your situation." },
  { question: "Can I finance multiple properties?", answer: "Yes! There's no limit on DSCR loans. We have investors with 20+ financed properties. We also offer portfolio loans to bundle multiple properties." },
  { question: "Do I need rental history?", answer: "Not necessarily. We can use market rent estimates from an appraisal. Properties with existing leases often get better terms." }
];

export default function InvestmentLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", propertyCount: "", investmentGoal: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/lead/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData, 
          leadType: "Investment Property", 
          loanType: "DSCR", 
          source: "Landing Page", 
          timeline: "asap", // Landing pages imply immediate interest
        }),
      });
      if (response.ok) setSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/location/newport-beach.png" alt="Investment Properties" fill className="object-cover grayscale" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-2 mb-6">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Investment Properties</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">Financing For Real Estate Investors</h1>
              <p className="text-xl text-zinc-200 mb-8 leading-relaxed">DSCR loans, bank statement programs, and portfolio financing. Qualify based on rental income — not your W-2.</p>

              <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 p-6 mb-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><p className="text-3xl font-bold text-primary">No W-2</p><p className="text-zinc-400 text-sm">Required</p></div>
                  <div><p className="text-3xl font-bold text-white">20%</p><p className="text-zinc-400 text-sm">Min Down</p></div>
                  <div><p className="text-3xl font-bold text-primary">14</p><p className="text-zinc-400 text-sm">Days to Close</p></div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                <span className="text-white font-semibold ml-2">5.0</span>
                <span className="text-zinc-400">(200+ Reviews)</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#calculator" className="btn-luxury"><Calculator className="w-5 h-5" />Calculate DSCR</Link>
                <a href="tel:+19495220606" className="btn-luxury-outline"><Phone className="w-5 h-5" />(949) 522-0606</a>
              </div>

              <div className="mt-8 inline-flex items-center gap-3 bg-zinc-900/80 border border-zinc-700 px-4 py-3">
                <span className="relative flex h-3 w-3"><span className="animate-ping absolute h-full w-full rounded-full bg-primary opacity-75"></span><span className="relative rounded-full h-3 w-3 bg-primary"></span></span>
                <span className="text-zinc-300 text-sm"><span className="text-primary font-semibold">24/7 Available</span> — We answer day or night</span>
              </div>
            </div>

            <div className="hidden lg:block">
              {submitted ? (
                <div className="bg-zinc-900/90 backdrop-blur-sm border border-primary/30 p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Let's Talk Investment Strategy!</h3>
                  <p className="text-zinc-300">An investment lending specialist will call within 5 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 p-8 space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wide">Get Investor Financing</h3>
                    <p className="text-zinc-400 mt-2">DSCR & bank statement loans</p>
                  </div>
                  <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 placeholder-zinc-500 focus:border-primary focus:outline-none" data-testid="input-investor-name" />
                  <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 placeholder-zinc-500 focus:border-primary focus:outline-none" data-testid="input-investor-email" />
                  <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 placeholder-zinc-500 focus:border-primary focus:outline-none" data-testid="input-investor-phone" />
                  <select value={formData.propertyCount} onChange={(e) => setFormData({...formData, propertyCount: e.target.value})} className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 focus:border-primary focus:outline-none" data-testid="select-investor-properties">
                    <option value="">Current investment properties?</option>
                    <option value="0">This will be my first</option>
                    <option value="1-3">1-3 properties</option>
                    <option value="4-10">4-10 properties</option>
                    <option value="10+">10+ properties</option>
                  </select>
                  <select value={formData.investmentGoal} onChange={(e) => setFormData({...formData, investmentGoal: e.target.value})} className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 focus:border-primary focus:outline-none" data-testid="select-investor-goal">
                    <option value="">What's your goal?</option>
                    <option value="Buy first rental">Buy my first rental</option>
                    <option value="Expand portfolio">Expand my portfolio</option>
                    <option value="Refinance existing">Refinance existing rentals</option>
                    <option value="Cash out equity">Cash out rental equity</option>
                  </select>
                  <button type="submit" disabled={isSubmitting} className="w-full btn-luxury justify-center text-lg py-4 disabled:opacity-50" data-testid="button-investor-submit">
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Get Pre-Approved <ArrowRight className="w-5 h-5" /></>}
                  </button>
                  <p className="text-zinc-500 text-xs text-center">No personal income verification needed for DSCR.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery - Dark */}
      <section className="relative bg-zinc-900 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square relative overflow-hidden rounded-xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(47,169,159,0.15)]">
              <Image src="/images/location/anaheim.png" alt="Anaheim investment properties" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="aspect-square relative overflow-hidden rounded-xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(47,169,159,0.15)]">
              <Image src="/images/trust/client-handshake.png" alt="Client handshake" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="aspect-square relative overflow-hidden rounded-xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(47,169,159,0.15)]">
              <Image src="/images/location/irvine.png" alt="Irvine properties" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="aspect-square relative overflow-hidden rounded-xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(47,169,159,0.15)]">
              <Image src="/images/trust/explaining-options.png" alt="Explaining options" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - Dark with glow */}
      <section className="relative bg-zinc-950 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/context/investor-hero.png" alt="" fill className="object-cover grayscale opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wide mb-16">Why Investors Choose <span className="text-primary">Enzo</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="group bg-zinc-900/80 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-primary transition-all duration-500 hover:shadow-[0_0_40px_rgba(47,169,159,0.15)] hover:-translate-y-2">
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:shadow-[0_0_25px_rgba(47,169,159,0.3)] transition-all duration-500"><b.icon className="w-7 h-7 text-primary" /></div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">{b.title}</h3>
                <p className="text-zinc-400">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DSCR Calculator */}
      <div id="calculator">
        <InvestorCalculator />
      </div>

      {/* Loan Programs - Dark */}
      <section className="relative bg-zinc-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/context/IMG_6097.webp" alt="" fill className="object-cover grayscale opacity-10" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wide mb-4">Investor <span className="text-primary">Loan Programs</span></h2>
          <p className="text-zinc-400 text-lg text-center mb-16 max-w-2xl mx-auto">Multiple financing options for every investment strategy.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {loanPrograms.map((p, i) => (
              <div key={i} className="group bg-zinc-800/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(47,169,159,0.15)]">
                <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-wide">{p.name}</h3>
                <p className="text-zinc-400 mb-4">{p.description}</p>
                <div className="flex gap-4 flex-wrap">
                  <div className="bg-primary/20 border border-primary/30 rounded-lg px-3 py-1"><span className="text-primary font-semibold text-sm">{p.minDown} Down</span></div>
                  {p.minDscr !== "N/A" && <div className="bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-1"><span className="text-zinc-300 font-semibold text-sm">{p.minDscr} Min DSCR</span></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-zinc-950 py-24 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wide mb-12">Investor Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 p-8">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 mb-4">
                  <TrendingUp className="w-4 h-4 text-primary" /><span className="text-primary font-semibold text-sm">{t.result}</span>
                </div>
                <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
                <p className="text-zinc-300 mb-6">"{t.quote}"</p>
                <p className="text-white font-semibold">{t.name}</p>
                <p className="text-zinc-500 text-sm">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet - Dark */}
      <section className="relative bg-zinc-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/context/investor-hero.png" alt="" fill className="object-cover grayscale opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white uppercase tracking-wide mb-4">Free Investor's <span className="text-primary">Financing Guide</span></h2>
              <p className="text-zinc-300 text-lg mb-6">Everything you need to know about financing investment properties in today's market.</p>
              <ul className="space-y-3">
                {["DSCR loan requirements explained", "How to analyze a rental deal", "Building a scalable portfolio", "Tax strategies for investors"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300"><CheckCircle className="w-5 h-5 text-primary" />{item}</li>
                ))}
              </ul>
            </div>
            <LeadMagnet title="Investor's Financing Guide" description="Download the complete guide to investment property financing." magnetType="guide" source="Investment Landing Page" />
          </div>
        </div>
      </section>

      {/* FAQ - Dark */}
      <section className="relative bg-zinc-950 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/context/IMG_6083.webp" alt="" fill className="object-cover grayscale opacity-10" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wide mb-12">Investor <span className="text-primary">FAQs</span></h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-700 overflow-hidden hover:border-primary/50 transition-all duration-300">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800/50 transition-colors">
                  <span className="font-semibold text-white">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-primary transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <div className="px-6 pb-6 text-zinc-400">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-zinc-950 py-24 border-t border-zinc-800" id="get-started">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide mb-6">Ready To Grow Your Portfolio?</h2>
          <p className="text-xl text-zinc-300 mb-10">Get pre-approved for investor financing today. No W-2 required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="btn-luxury">Get Pre-Approved <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+19495220606" className="btn-luxury-outline"><Phone className="w-5 h-5" />(949) 522-0606</a>
          </div>
          <p className="text-zinc-500 text-sm mt-8">Available 24/7 — 5-minute callback guarantee</p>
        </div>
      </section>

      <HiddenValuationForm source="Investment Landing Page" />
    </div>
  );
}
