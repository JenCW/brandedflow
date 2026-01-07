"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Home, Shield, Clock, CheckCircle, ArrowRight, Phone, Star, DollarSign, FileCheck, Key, Users, Award, ChevronDown, Loader2 } from "lucide-react";
import LeadMagnet from "@/app/components/LeadMagnet";
import HiddenValuationForm from "@/app/components/HiddenValuationForm";

const benefits = [
  {
    icon: Clock,
    title: "Close in 14 Days",
    description: "We move fast so you don't lose your dream home to slow financing."
  },
  {
    icon: DollarSign,
    title: "Competitive Rates",
    description: "Access to 100+ lenders means we find you the best rate available."
  },
  {
    icon: Shield,
    title: "No Surprises",
    description: "Transparent pricing with no hidden fees or last-minute changes."
  },
  {
    icon: Users,
    title: "Personal Service",
    description: "Work directly with Enzo from application to closing."
  }
];

const processSteps = [
  {
    step: 1,
    title: "Quick Pre-Approval",
    description: "Answer a few questions and get pre-approved in as little as 15 minutes.",
    icon: FileCheck
  },
  {
    step: 2,
    title: "Find Your Home",
    description: "Shop with confidence knowing exactly what you can afford.",
    icon: Home
  },
  {
    step: 3,
    title: "Lock Your Rate",
    description: "We secure your interest rate while processing your loan.",
    icon: Shield
  },
  {
    step: 4,
    title: "Close & Get Keys",
    description: "Sign the paperwork and move into your new home.",
    icon: Key
  }
];

const testimonials = [
  {
    quote: "Enzo made buying our first home so easy. He explained everything clearly and was always available when we had questions.",
    name: "Sarah & Mike T.",
    location: "Irvine, CA",
    type: "First-Time Buyers"
  },
  {
    quote: "We closed in just 12 days! Enzo's team was incredible. I've never experienced such smooth financing.",
    name: "James R.",
    location: "Newport Beach, CA",
    type: "Home Purchase"
  },
  {
    quote: "After being turned down by two other lenders, Enzo found a solution that worked for our situation. Forever grateful.",
    name: "Maria L.",
    location: "Costa Mesa, CA",
    type: "Self-Employed Buyer"
  }
];

const faqs = [
  {
    question: "How much down payment do I need?",
    answer: "It depends on your situation. We have programs starting at 0% down for veterans (VA loans), 3% down for first-time buyers, and 3.5% down for FHA loans. During our conversation, we'll find the best option for your budget."
  },
  {
    question: "What credit score do I need to buy a home?",
    answer: "While conventional loans typically require 620+, we have FHA programs for scores as low as 580, and specialized programs for those rebuilding credit. Don't let your score hold you back from calling."
  },
  {
    question: "How long does the process take?",
    answer: "On average, we close in 14-21 days. Some loans can close even faster. We'll give you a realistic timeline upfront based on your specific situation."
  },
  {
    question: "What documents do I need to get pre-approved?",
    answer: "Typically: 2 months of pay stubs, 2 years of W-2s or tax returns, 2 months of bank statements, and your ID. Self-employed? We have bank statement programs that require less documentation."
  },
  {
    question: "Are there any hidden fees?",
    answer: "Absolutely not. We provide a detailed loan estimate upfront with all costs clearly listed. No surprises at closing."
  }
];

export default function BuyingLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purchaseTimeline: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead/base44", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          leadType: "Home Purchase",
          loanType: "Purchase",
          source: "Landing Page",
          urgency: formData.purchaseTimeline,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/services-hero-cheerful.png"
            alt="Happy homeowners"
            fill
            className="object-cover grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-2 mb-6">
                <Home className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Home Purchase</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
                Buy Your Dream Home With Confidence
              </h1>

              <p className="text-xl text-zinc-200 mb-8 leading-relaxed">
                Whether you're buying your first home or your fifth, we guide you through every step. 
                Get pre-approved in minutes and close in as few as 14 days.
              </p>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-white font-semibold">5.0</span>
                  <span className="text-zinc-400">(200+ Reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Award className="w-5 h-5 text-primary" />
                  <span>NMLS #1984772</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#get-started" className="btn-luxury">
                  Get Pre-Approved <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+19495551234" className="btn-luxury-outline">
                  <Phone className="w-5 h-5" />
                  (949) 555-1234
                </a>
              </div>

              {/* 24/7 Badge */}
              <div className="mt-8 inline-flex items-center gap-3 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 px-4 py-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="text-zinc-300 text-sm">
                  <span className="text-primary font-semibold">24/7 Available</span> — We answer your call, day or night
                </span>
              </div>
            </div>

            {/* Lead Capture Form */}
            <div className="hidden lg:block">
              {submitted ? (
                <div className="bg-zinc-900/90 backdrop-blur-sm border border-primary/30 p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 border border-primary/30 mb-6">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">We'll Call You Shortly!</h3>
                  <p className="text-zinc-300">
                    One of our loan officers will reach out within 5 minutes during business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 p-8 space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wide">Get Pre-Approved Today</h3>
                    <p className="text-zinc-400 mt-2">Takes less than 2 minutes</p>
                  </div>

                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 placeholder-zinc-500 focus:border-primary focus:outline-none"
                    data-testid="input-hero-name"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 placeholder-zinc-500 focus:border-primary focus:outline-none"
                    data-testid="input-hero-email"
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 placeholder-zinc-500 focus:border-primary focus:outline-none"
                    data-testid="input-hero-phone"
                  />

                  <select
                    value={formData.purchaseTimeline}
                    onChange={(e) => setFormData({ ...formData, purchaseTimeline: e.target.value })}
                    required
                    className="w-full bg-zinc-800 border border-zinc-600 text-white px-4 py-4 focus:border-primary focus:outline-none"
                    data-testid="select-hero-timeline"
                  >
                    <option value="">When are you looking to buy?</option>
                    <option value="ASAP">As soon as possible</option>
                    <option value="1-3 months">Within 1-3 months</option>
                    <option value="3-6 months">Within 3-6 months</option>
                    <option value="Just exploring">Just exploring options</option>
                  </select>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-luxury justify-center text-lg py-4 disabled:opacity-50"
                    data-testid="button-hero-submit"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>Get My Free Pre-Approval <ArrowRight className="w-5 h-5" /></>
                    )}
                  </button>

                  <p className="text-zinc-500 text-xs text-center">
                    No credit check required for pre-qualification. Your info is secure.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Dark with glow */}
      <section className="relative bg-zinc-950 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/context/IMG_6080.webp" alt="" fill className="object-cover grayscale opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide mb-4">
              Why Home Buyers Choose <span className="text-primary">Enzo</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              We've helped hundreds of families get the keys to their dream homes. Here's what makes us different.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="group bg-zinc-900/80 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-primary transition-all duration-500 hover:shadow-[0_0_40px_rgba(47,169,159,0.15)] hover:-translate-y-2">
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:shadow-[0_0_25px_rgba(47,169,159,0.3)] transition-all duration-500">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">{benefit.title}</h3>
                <p className="text-zinc-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-zinc-950 py-24 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide mb-4">
              Your Path To Homeownership
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              A clear, simple process from start to finish. We guide you every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="relative text-center group">
                {step.step < 4 && (
                  <div className="hidden md:block absolute top-14 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20" />
                )}
                <div className="relative z-10 inline-flex items-center justify-center w-28 h-28 bg-zinc-900 border border-zinc-700 mb-6 group-hover:border-primary/50 transition-all">
                  <step.icon className="w-12 h-12 text-primary" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{step.title}</h3>
                <p className="text-zinc-400">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="#get-started" className="btn-luxury">
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enzo Section with Image - Dark */}
      <section className="relative bg-zinc-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/context/IMG_6097.webp" alt="" fill className="object-cover grayscale opacity-10" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-2xl border border-zinc-700 shadow-2xl overflow-hidden group hover:shadow-[0_0_60px_rgba(47,169,159,0.2)] transition-all duration-500">
                <Image
                  src="/images/trust/IMG_6094.webp"
                  alt="Enzo"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-xl border border-primary/30" />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide mb-6">
                Work Directly With <span className="text-primary">Enzo</span>
              </h2>
              <div className="space-y-4 text-zinc-300 text-lg leading-relaxed">
                <p>
                  When you work with Enzo Mortgages, you work with Enzo himself — not a call center, 
                  not a rotating team of strangers.
                </p>
                <p>
                  Enzo stays involved from your first question to your closing day. He understands that 
                  buying a home is one of the biggest decisions you'll make, and treats your goals like his own.
                </p>
                <p>
                  With access to over 100 lenders and decades of experience, Enzo finds solutions where 
                  others see problems.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <a href="tel:+19495551234" className="btn-luxury btn-shiny">
                  <Phone className="w-5 h-5" />
                  Call Enzo Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-zinc-950 py-24 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide mb-4">
              What Our Clients Say
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-zinc-400">5.0 stars from 200+ verified reviews</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-zinc-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-zinc-500 text-sm">{testimonial.location} — {testimonial.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet Section - Dark */}
      <section className="relative bg-zinc-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/context/first-time-buyer-hero.png" alt="" fill className="object-cover grayscale opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white uppercase tracking-wide mb-4">
                Free First-Time Buyer's <span className="text-primary">Guide</span>
              </h2>
              <p className="text-zinc-300 text-lg mb-6">
                Everything you need to know about buying your first home — from pre-approval to closing day. 
                No jargon, just clear answers.
              </p>
              <ul className="space-y-3">
                {["Step-by-step buying process", "Down payment assistance programs", "Common mistakes to avoid", "Closing cost breakdown"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <LeadMagnet
              title="First-Time Buyer's Guide"
              description="Get the free PDF guide delivered to your inbox instantly."
              magnetType="guide"
              source="Buying Landing Page"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section - Dark */}
      <section className="relative bg-zinc-950 py-24 overflow-hidden" id="faq">
        <div className="absolute inset-0">
          <Image src="/images/context/IMG_6083.webp" alt="" fill className="object-cover grayscale opacity-10" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wide mb-12">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-700 overflow-hidden hover:border-primary/50 transition-all duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800/50 transition-colors"
                  data-testid={`faq-button-${i}`}
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-primary transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-zinc-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-zinc-950 py-24 border-t border-zinc-800" id="get-started">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide mb-6">
            Ready To Get Started?
          </h2>
          <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
            Get pre-approved today and take the first step toward your new home. 
            No obligation, no credit check for pre-qualification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="btn-luxury">
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+19495551234" className="btn-luxury-outline">
              <Phone className="w-5 h-5" />
              Call (949) 555-1234
            </a>
          </div>
          <p className="text-zinc-500 text-sm mt-8">
            Available 24/7 — Our AI receptionist is always here, and Enzo calls you back within 5 minutes.
          </p>
        </div>
      </section>

      <HiddenValuationForm source="Buying Landing Page" />
    </div>
  );
}
