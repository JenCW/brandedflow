"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RefreshCw, Shield, Clock, CheckCircle, ArrowRight, Phone, Star, DollarSign, TrendingDown, Award, ChevronDown, Loader2 } from "lucide-react";
import LeadMagnet from "@/app/components/LeadMagnet";
import HiddenValuationForm from "@/app/components/HiddenValuationForm";

const benefits = [
  { icon: TrendingDown, title: "Lower Your Rate", description: "Lock in a lower interest rate and reduce your monthly payment." },
  { icon: Clock, title: "Shorten Your Term", description: "Pay off your home faster with a 15 or 20-year loan." },
  { icon: DollarSign, title: "Save Thousands", description: "The right refinance can save you tens of thousands over your loan." },
  { icon: Shield, title: "No Hidden Costs", description: "We show you the real numbers upfront — no surprises." }
];

const refinanceReasons = [
  { reason: "Lower my monthly payment", icon: TrendingDown },
  { reason: "Pay off my loan faster", icon: Clock },
  { reason: "Switch from ARM to fixed rate", icon: Shield },
  { reason: "Remove mortgage insurance", icon: DollarSign },
  { reason: "Access home equity", icon: RefreshCw },
];

const testimonials = [
  { quote: "Enzo saved us $400/month on our mortgage. The whole process took less than 3 weeks.", name: "Robert & Linda K.", location: "Irvine, CA", savings: "$400/mo savings" },
  { quote: "I was skeptical about refinancing, but Enzo showed me the math. I'm saving $85,000 over the life of my loan.", name: "David M.", location: "Newport Beach, CA", savings: "$85K total savings" },
  { quote: "Finally got rid of my PMI thanks to Enzo. Should have called him years ago!", name: "Jennifer S.", location: "Laguna Beach, CA", savings: "No more PMI" }
];

const faqs = [
  { question: "Is refinancing worth it right now?", answer: "It depends on your current rate, how long you plan to stay, and your goals. We run the numbers for you — free, no obligation — and show you exactly when you'll break even." },
  { question: "How much does refinancing cost?", answer: "Closing costs typically range from 2-3% of your loan amount. We offer no-cost refinancing options where costs are rolled into your rate." },
  { question: "How long does a refinance take?", answer: "Most refinances close in 21-30 days. Some can be faster. We give you a realistic timeline upfront." },
  { question: "Can I refinance with less-than-perfect credit?", answer: "Yes! While higher credit scores get better rates, we have programs for scores as low as 580." },
  { question: "Should I wait for rates to drop more?", answer: "Trying to time the market is risky. If refinancing makes sense now, locking in protects you from rates going up." }
];

export default function RefinanceLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", currentRate: "", refinanceGoal: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/lead/base44", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, leadType: "Refinance", loanType: "Rate & Term Refi", source: "Landing Page", urgency: "Hot" }),
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
          <Image src="/images/context/refinance-hero.png" alt="Refinance" fill className="object-cover grayscale" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-2 mb-6">
                <RefreshCw className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Refinance</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">Lower Your Rate. Save Thousands.</h1>
              <p className="text-xl text-zinc-200 mb-8 leading-relaxed">Stop overpaying on your mortgage. We'll show you exactly how much you could save — no obligation.</p>

              <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 p-6 mb-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><p className="text-3xl font-bold text-primary">$400+</p><p className="text-zinc-400 text-sm">Avg. Monthly Savings</p></div>
                  <div><p className="text-3xl font-bold text-white">21</p><p className="text-zinc-400 text-sm">Days to Close</p></div>
                  <div><p className="text-3xl font-bold text-primary">$85K</p><p className="text-zinc-400 text-sm">Avg. Lifetime Savings</p></div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                <span className="text-white font-semibold ml-2">5.0</span>
                <span className="text-zinc-400">(200+ Reviews)</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#get-started" className="btn-luxury">Check My Savings <ArrowRight className="w-5 h-5" /></Link>
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
                  <h3 className="text-2xl font-bold text-white mb-4">Calculating Your Savings!</h3>
                  <p className="text-zinc-300">A specialist will call within 5 minutes with your personalized analysis.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 p-8 space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wide">See Your Savings</h3>
                    <p className="text-zinc-400 mt-2">Free analysis, no obligation</p>
                  </div>
                  <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 placeholder-zinc-500 focus:border-primary focus:outline-none" data-testid="input-refi-name" />
                  <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 placeholder-zinc-500 focus:border-primary focus:outline-none" data-testid="input-refi-email" />
                  <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 placeholder-zinc-500 focus:border-primary focus:outline-none" data-testid="input-refi-phone" />
                  <select value={formData.currentRate} onChange={(e) => setFormData({...formData, currentRate: e.target.value})} className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 focus:border-primary focus:outline-none" data-testid="select-refi-rate">
                    <option value="">What's your current rate?</option>
                    <option value="7%+">7% or higher</option>
                    <option value="6-7%">6% - 7%</option>
                    <option value="5-6%">5% - 6%</option>
                    <option value="Under 5%">Under 5%</option>
                  </select>
                  <select value={formData.refinanceGoal} onChange={(e) => setFormData({...formData, refinanceGoal: e.target.value})} className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 focus:border-primary focus:outline-none" data-testid="select-refi-goal">
                    <option value="">What's your main goal?</option>
                    <option value="Lower payment">Lower my monthly payment</option>
                    <option value="Pay off faster">Pay off my loan faster</option>
                    <option value="Cash out">Access my home equity</option>
                    <option value="Remove PMI">Remove mortgage insurance</option>
                  </select>
                  <button type="submit" disabled={isSubmitting} className="w-full btn-luxury justify-center text-lg py-4 disabled:opacity-50" data-testid="button-refi-submit">
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Calculate My Savings <ArrowRight className="w-5 h-5" /></>}
                  </button>
                  <p className="text-zinc-500 text-xs text-center">No credit check. No commitment.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section - Dark */}
      <section className="relative bg-zinc-900 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square relative overflow-hidden rounded-xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(47,169,159,0.15)]">
              <Image src="/images/trust/client-handshake.png" alt="Client handshake" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="aspect-square relative overflow-hidden rounded-xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(47,169,159,0.15)]">
              <Image src="/images/trust/consultation-meeting.png" alt="Consultation meeting" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="aspect-square relative overflow-hidden rounded-xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(47,169,159,0.15)]">
              <Image src="/images/location/newport-beach.png" alt="Newport Beach" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
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
          <Image src="/images/context/IMG_6080.webp" alt="" fill className="object-cover grayscale opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wide mb-16">Why Refinance With <span className="text-primary">Enzo</span>?</h2>
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

      {/* Reasons */}
      <section className="bg-zinc-950 py-24 border-y border-zinc-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wide mb-12">Which Describes You?</h2>
          <div className="grid gap-4">
            {refinanceReasons.map((item, i) => (
              <Link key={i} href="#get-started" className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-6 hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20"><item.icon className="w-6 h-6 text-primary" /></div>
                <span className="text-xl text-white flex-1">{item.reason}</span>
                <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enzo Section - Dark */}
      <section className="relative bg-zinc-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/context/IMG_6097.webp" alt="" fill className="object-cover grayscale opacity-10" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-2xl border border-zinc-700 shadow-2xl overflow-hidden group hover:shadow-[0_0_60px_rgba(47,169,159,0.2)] transition-all duration-500">
                <Image src="/images/trust/IMG_6080.webp" alt="Enzo" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-xl border border-primary/30" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide mb-6">Work Directly With <span className="text-primary">Enzo</span></h2>
              <p className="text-zinc-300 text-lg mb-4">When you refinance with Enzo Mortgages, you work with Enzo himself — not a call center.</p>
              <p className="text-zinc-300 text-lg mb-6">Enzo reviews your situation honestly and explains your options clearly. If refinancing makes sense, you'll understand exactly why. If it doesn't, you'll know that too.</p>
              <a href="tel:+19495551234" className="btn-luxury btn-shiny"><Phone className="w-5 h-5" />Call Enzo Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-zinc-950 py-24 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wide mb-12">Real Savings From Real Clients</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 p-8">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 mb-4">
                  <DollarSign className="w-4 h-4 text-primary" /><span className="text-primary font-semibold text-sm">{t.savings}</span>
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
          <Image src="/images/context/refinance-hero.png" alt="" fill className="object-cover grayscale opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white uppercase tracking-wide mb-4">Free Refinance <span className="text-primary">Checklist</span></h2>
              <p className="text-zinc-300 text-lg mb-6">Everything you need to know before refinancing. Avoid costly mistakes and maximize your savings.</p>
              <ul className="space-y-3">
                {["When refinancing makes sense", "Documents you'll need", "How to compare offers", "Hidden costs to watch for"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300"><CheckCircle className="w-5 h-5 text-primary" />{item}</li>
                ))}
              </ul>
            </div>
            <LeadMagnet title="Refinance Checklist" description="Download the free PDF checklist." magnetType="checklist" source="Refinance Landing Page" />
          </div>
        </div>
      </section>

      {/* FAQ - Dark */}
      <section className="relative bg-zinc-950 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/context/IMG_6083.webp" alt="" fill className="object-cover grayscale opacity-10" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wide mb-12">Refinance <span className="text-primary">FAQs</span></h2>
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide mb-6">Find Out How Much You Could Save</h2>
          <p className="text-xl text-zinc-300 mb-10">Get a free, no-obligation savings analysis today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="btn-luxury">Get My Savings Analysis <ArrowRight className="w-5 h-5" /></Link>
            <a href="tel:+19495551234" className="btn-luxury-outline"><Phone className="w-5 h-5" />(949) 555-1234</a>
          </div>
          <p className="text-zinc-500 text-sm mt-8">Available 24/7 — 5-minute callback guarantee</p>
        </div>
      </section>

      <HiddenValuationForm source="Refinance Landing Page" />
    </div>
  );
}
