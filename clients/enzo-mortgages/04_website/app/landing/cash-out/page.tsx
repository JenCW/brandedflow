"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Banknote, Shield, Clock, CheckCircle, ArrowRight, Phone, Star, DollarSign, Home, Wrench, CreditCard, ChevronDown, Loader2 } from "lucide-react";
import LeadMagnet from "@/app/components/LeadMagnet";
import HiddenValuationForm from "@/app/components/HiddenValuationForm";

const useCases = [
  { icon: Wrench, title: "Home Renovations", description: "Upgrade your kitchen, add a bathroom, or expand your living space." },
  { icon: CreditCard, title: "Debt Consolidation", description: "Pay off high-interest credit cards and simplify your finances." },
  { icon: Home, title: "Investment Property", description: "Use your equity as a down payment on a rental property." },
  { icon: DollarSign, title: "Major Expenses", description: "Fund college tuition, medical bills, or other significant costs." }
];

const testimonials = [
  { quote: "Used our equity to renovate our entire home. Enzo made the process smooth and the rate was better than a HELOC.", name: "Mark & Susan T.", location: "Newport Beach, CA", amount: "$150K cash out" },
  { quote: "Consolidated $60K in credit card debt into one low payment. Saving over $800/month now.", name: "Anthony R.", location: "Irvine, CA", amount: "$60K debt consolidated" },
  { quote: "Bought my first investment property using equity from my primary home. Best decision I ever made.", name: "Lisa M.", location: "Costa Mesa, CA", amount: "$100K for investment" }
];

const faqs = [
  { question: "How much equity can I access?", answer: "Most programs allow up to 80% loan-to-value. If your home is worth $800K and you owe $400K, you could potentially access up to $240K. We'll show you the exact numbers." },
  { question: "Is cash-out refinance better than a HELOC?", answer: "It depends. Cash-out gives you a fixed rate on the entire loan, while HELOCs have variable rates. We'll compare both options for your situation." },
  { question: "Will my rate go up?", answer: "Your new rate depends on current market rates. Even if slightly higher, consolidating debt can still save you money overall. We run the complete analysis." },
  { question: "How long does it take to get the cash?", answer: "Typically 21-30 days from application to funding. We can often move faster for straightforward situations." },
  { question: "Can I use the cash for anything?", answer: "Yes — home improvements, debt consolidation, investments, education, emergencies, or anything else. It's your equity." }
];

export default function CashOutLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", homeValue: "", cashNeeded: "", purpose: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/lead/base44", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, leadType: "Cash-Out Refinance", loanType: "Cash-Out", source: "Landing Page", urgency: "Hot" }),
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
          <Image src="/images/context/cash-out-hero.png" alt="Cash-Out Refinance" fill className="object-cover grayscale" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-2 mb-6">
                <Banknote className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Cash-Out Refinance</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">Access Your Home Equity</h1>
              <p className="text-xl text-zinc-200 mb-8 leading-relaxed">Turn your home equity into cash for renovations, debt consolidation, investments, or major expenses. Lower rates than credit cards or personal loans.</p>

              <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 p-6 mb-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><p className="text-3xl font-bold text-primary">80%</p><p className="text-zinc-400 text-sm">Max LTV Available</p></div>
                  <div><p className="text-3xl font-bold text-white">$500K+</p><p className="text-zinc-400 text-sm">Cash Available</p></div>
                  <div><p className="text-3xl font-bold text-primary">6.5%</p><p className="text-zinc-400 text-sm">Rates From</p></div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                <span className="text-white font-semibold ml-2">5.0</span>
                <span className="text-zinc-400">(200+ Reviews)</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#get-started" className="btn-luxury">Check My Equity <ArrowRight className="w-5 h-5" /></Link>
                <a href="tel:+19495551234" className="btn-luxury-outline"><Phone className="w-5 h-5" />(949) 555-1234</a>
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
                  <h3 className="text-2xl font-bold text-white mb-4">We're Checking Your Options!</h3>
                  <p className="text-zinc-300">A specialist will call within 5 minutes with your personalized equity analysis.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 p-8 space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wide">See Your Equity Options</h3>
                    <p className="text-zinc-400 mt-2">Free analysis in minutes</p>
                  </div>
                  <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 placeholder-zinc-500 focus:border-primary focus:outline-none" data-testid="input-cashout-name" />
                  <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 placeholder-zinc-500 focus:border-primary focus:outline-none" data-testid="input-cashout-email" />
                  <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 placeholder-zinc-500 focus:border-primary focus:outline-none" data-testid="input-cashout-phone" />
                  <select value={formData.homeValue} onChange={(e) => setFormData({...formData, homeValue: e.target.value})} className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 focus:border-primary focus:outline-none" data-testid="select-cashout-value">
                    <option value="">Estimated home value?</option>
                    <option value="Under $500K">Under $500K</option>
                    <option value="$500K-$750K">$500K - $750K</option>
                    <option value="$750K-$1M">$750K - $1M</option>
                    <option value="$1M+">$1M+</option>
                  </select>
                  <select value={formData.cashNeeded} onChange={(e) => setFormData({...formData, cashNeeded: e.target.value})} className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 focus:border-primary focus:outline-none" data-testid="select-cashout-amount">
                    <option value="">How much cash do you need?</option>
                    <option value="$25K-$50K">$25K - $50K</option>
                    <option value="$50K-$100K">$50K - $100K</option>
                    <option value="$100K-$200K">$100K - $200K</option>
                    <option value="$200K+">$200K+</option>
                  </select>
                  <select value={formData.purpose} onChange={(e) => setFormData({...formData, purpose: e.target.value})} className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 focus:border-primary focus:outline-none" data-testid="select-cashout-purpose">
                    <option value="">What will you use it for?</option>
                    <option value="Home renovation">Home renovation</option>
                    <option value="Debt consolidation">Debt consolidation</option>
                    <option value="Investment">Investment property</option>
                    <option value="Major expense">Major expense</option>
                    <option value="Other">Other</option>
                  </select>
                  <button type="submit" disabled={isSubmitting} className="w-full btn-luxury justify-center text-lg py-4 disabled:opacity-50" data-testid="button-cashout-submit">
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Check My Equity <ArrowRight className="w-5 h-5" /></>}
                  </button>
                  <p className="text-zinc-500 text-xs text-center">No credit check required. Free analysis.</p>
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
              <Image src="/images/trust/IMG_6094.webp" alt="Professional consultation" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="aspect-square relative overflow-hidden rounded-xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(47,169,159,0.15)]">
              <Image src="/images/location/irvine.png" alt="Irvine homes" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="aspect-square relative overflow-hidden rounded-xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(47,169,159,0.15)]">
              <Image src="/images/trust/IMG_2500.webp" alt="Happy clients" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="aspect-square relative overflow-hidden rounded-xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(47,169,159,0.15)]">
              <Image src="/images/location/santa-ana.png" alt="Santa Ana" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases - Dark with glow */}
      <section className="relative bg-zinc-950 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/context/cash-out-hero.png" alt="" fill className="object-cover grayscale opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wide mb-4">What Will You Do With Your <span className="text-primary">Equity</span>?</h2>
          <p className="text-zinc-400 text-lg text-center mb-16 max-w-2xl mx-auto">Your home equity is a powerful financial tool. Here are the most common ways our clients use it.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((u, i) => (
              <div key={i} className="group bg-zinc-900/80 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-primary transition-all duration-500 hover:shadow-[0_0_40px_rgba(47,169,159,0.15)] hover:-translate-y-2">
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:shadow-[0_0_25px_rgba(47,169,159,0.3)] transition-all duration-500"><u.icon className="w-7 h-7 text-primary" /></div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">{u.title}</h3>
                <p className="text-zinc-400">{u.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enzo Section */}
      <section className="bg-zinc-950 py-24 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide mb-6">Strategic Equity Access</h2>
              <p className="text-zinc-300 text-lg mb-4">Home equity is a powerful tool — when used thoughtfully. Enzo helps you understand the full picture: costs, impact on your mortgage, and alternatives.</p>
              <p className="text-zinc-300 text-lg mb-6">We don't push you toward a decision. We give you clear information so you can decide what's right for your situation.</p>
              <ul className="space-y-3 mb-8">
                {["Clear breakdown of all costs", "Compare to HELOC options", "Long-term impact analysis", "No-pressure guidance"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300"><CheckCircle className="w-5 h-5 text-primary" />{item}</li>
                ))}
              </ul>
              <a href="tel:+19495551234" className="btn-luxury"><Phone className="w-5 h-5" />Talk to Enzo</a>
            </div>
            <div className="relative hidden lg:block">
              <div className="aspect-square relative border border-zinc-700 shadow-2xl overflow-hidden">
                <Image src="/images/trust/IMG_6105.webp" alt="Enzo consultation" fill className="object-cover grayscale" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Dark */}
      <section className="relative bg-zinc-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/context/IMG_6096.webp" alt="" fill className="object-cover grayscale opacity-10" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wide mb-12">How Clients Used Their <span className="text-primary">Equity</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700 p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(47,169,159,0.15)]">
                <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-lg px-3 py-1 mb-4">
                  <Banknote className="w-4 h-4 text-primary" /><span className="text-primary font-semibold text-sm">{t.amount}</span>
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

      {/* Lead Magnet */}
      <section className="bg-zinc-950 py-24 border-y border-zinc-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white uppercase tracking-wide mb-4">Free Equity Guide</h2>
              <p className="text-zinc-400 text-lg mb-6">Learn how to strategically use your home equity without making costly mistakes.</p>
              <ul className="space-y-3">
                {["Cash-out vs HELOC comparison", "Tax implications to know", "Common mistakes to avoid", "When to use (and not use) equity"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300"><CheckCircle className="w-5 h-5 text-primary" />{item}</li>
                ))}
              </ul>
            </div>
            <LeadMagnet title="Home Equity Guide" description="Download the complete guide to using your equity wisely." magnetType="guide" source="Cash-Out Landing Page" />
          </div>
        </div>
      </section>

      {/* FAQ - Dark */}
      <section className="relative bg-zinc-950 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/context/IMG_6083.webp" alt="" fill className="object-cover grayscale opacity-10" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wide mb-12">Cash-Out <span className="text-primary">FAQs</span></h2>
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide mb-6">Unlock Your Home Equity Today</h2>
          <p className="text-xl text-zinc-300 mb-10">Get a free equity analysis and see how much cash you could access.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="btn-luxury">Check My Equity <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+19495551234" className="btn-luxury-outline"><Phone className="w-5 h-5" />(949) 555-1234</a>
          </div>
          <p className="text-zinc-500 text-sm mt-8">Available 24/7 — 5-minute callback guarantee</p>
        </div>
      </section>

      <HiddenValuationForm source="Cash-Out Landing Page" />
    </div>
  );
}
