"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Shield, MapPin, Globe, Building2, ArrowRight, MessageCircle, Brain, UserCheck, Lightbulb, Home as HomeIcon, BadgeDollarSign, Clock, Heart, Calculator, FileCheck, Key, CheckCircle, Phone, Headphones } from "lucide-react";
import FlipCard from "./components/FlipCard";
import TrustMarquee from "./components/TrustMarquee";
import FloatInObserver from "./components/FloatInObserver";
import AvailabilitySection from "./components/AvailabilitySection";
import LiveRates from "./components/LiveRates";
import LoanProcessFlow from "./components/LoanProcessFlow";
import ParallaxProvider from "./components/ParallaxProvider";

// Dynamic imports for heavy components
const CalculatorSection = dynamic(() => import("./components/CalculatorSection"), { ssr: false });
const LoanFinderTool = dynamic(() => import("./components/LoanFinderTool"), { ssr: false });
const VerticalTestimonialSlider = dynamic(() => import("./components/VerticalTestimonialSlider"), { ssr: false });
const VideoModal = dynamic(() => import("./components/VideoModal").then(mod => ({ default: mod.VideoModal })), { ssr: false });
const VideoButton = dynamic(() => import("./components/VideoModal").then(mod => ({ default: mod.VideoButton })), { ssr: false });

const serviceCards = [
  {
    title: "Buy A Home",
    description: "Find the right loan for your dream home with competitive rates and expert guidance.",
    href: "/services/buying",
    iconName: "Home" as const,
    programs: [
      { label: "Conventional Loans", href: "/services/buying/conventional" },
      { label: "FHA Loans", href: "/services/buying/fha" },
      { label: "VA Loans", href: "/services/buying/va" },
      { label: "Jumbo Loans", href: "/services/buying/jumbo" },
    ],
  },
  {
    title: "Refinance",
    description: "Lower your rate, reduce your term, or tap into your home's equity.",
    href: "/services/refinance",
    iconName: "BadgeDollarSign" as const,
    programs: [
      { label: "Rate & Term", href: "/services/refinance/rate-term" },
      { label: "Cash-Out", href: "/services/refinance/cash-out" },
      { label: "Streamline", href: "/services/refinance/streamline" },
    ],
  },
  {
    title: "Cash-Out",
    description: "Access your home equity for renovations, debt consolidation, or investments.",
    href: "/landing/cash-out",
    iconName: "Building2" as const,
    programs: [
      { label: "Cash-Out Refinance", href: "/landing/cash-out" },
      { label: "Home Equity Guide", href: "/services/refinance/cash-out" },
    ],
  },
  {
    title: "Non-QM Loans",
    description: "Flexible solutions for self-employed, investors, and international buyers.",
    href: "/services/non-qm",
    iconName: "Globe" as const,
    programs: [
      { label: "DSCR Loans", href: "/services/non-qm/dscr" },
      { label: "Bank Statement", href: "/services/non-qm/bank-statement" },
      { label: "Foreign National", href: "/services/non-qm/foreign-national" },
      { label: "Asset-Based", href: "/services/non-qm/asset-based" },
    ],
  },
];

const buyerJourneySteps = [
  {
    step: 1,
    title: "Get Pre-Approved",
    description: "Know exactly what you can afford before you start shopping.",
  },
  {
    step: 2,
    title: "Find Your Home",
    description: "Shop with confidence knowing your financing is ready.",
  },
  {
    step: 3,
    title: "Lock Your Rate",
    description: "Secure your interest rate while we process your loan.",
  },
  {
    step: 4,
    title: "Close & Get Keys",
    description: "Sign the paperwork and move into your new home.",
  },
];

export default function HomePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <ParallaxProvider>
    <FloatInObserver>
    <VideoModal 
      isOpen={isVideoOpen} 
      onClose={() => setIsVideoOpen(false)} 
      videoSrc="/videos/IMG_6181.MOV"
    />
    {/* Hero Section */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Ken Burns */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero/SMHero.png"
          alt=""
          fill
          priority
          quality={85}
          className="object-cover animate-ken-burns-right scale-110"
          sizes="100vw"
        />
      </div>
      {/* STRONG dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" aria-hidden="true" />
      
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center px-6 py-24">
        <p className="text-primary font-semibold mb-4 tracking-widest uppercase animate-fade-in-up text-lg">The Ferrari of Home Loans</p>
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up animation-delay-100 drop-shadow-2xl"
          data-testid="text-hero-title"
        >
          <span className="text-white">ENZO</span> <span className="gradient-text">MORTGAGES</span>
        </h1>
        <p 
          className="text-lg md:text-xl lg:text-2xl text-zinc-200 mb-10 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 drop-shadow-lg"
          data-testid="text-hero-subtitle"
        >
          We believe everyone deserves to see dreams come true. We understand the magnitude of faith you put in us and carry that privilege as our own — because trust is the luxury everyone deserves.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
          <Link
            href="/apply"
            className="btn-luxury btn-shiny animate-glow-pulse"
            data-testid="button-get-prequalified"
          >
            Apply Now
          </Link>
          <Link
            href="/tools/calculator"
            className="btn-luxury-outline"
            data-testid="button-calculate-payment"
          >
            <Calculator className="w-5 h-5" />
            Calculate Payment
          </Link>
        </div>
        
        <div className="mt-10 animate-fade-in-up animation-delay-500">
          <VideoButton onClick={() => setIsVideoOpen(true)} />
        </div>
      </div>
    </section>

    {/* Live Person 24/7 Banner - Front Facing CTA */}
    <section className="relative bg-gradient-to-r from-primary via-primary to-amber-600 py-4 overflow-hidden" data-testid="section-live-person-banner" suppressHydrationWarning>
      <div
        className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)] bg-[size:6px_6px]"
        suppressHydrationWarning
      />
      <Link 
        href="tel:+19495220606" 
        className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 group"
        data-testid="link-call-live-person"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping"></span>
            <div className="relative flex items-center justify-center w-10 h-10 bg-white/20 border border-white/40 rounded-full">
              <Headphones className="w-5 h-5 text-white" />
            </div>
          </div>
          <span className="text-white font-bold text-lg md:text-xl uppercase tracking-wide">
            Live Person 24/7
          </span>
        </div>
        
        <div className="hidden md:block w-px h-8 bg-white/30" />
        
        <p className="text-white/90 text-center md:text-left text-sm md:text-base">
          <span className="font-semibold">Questions about the process?</span> Get answers any time — day or night. 
          <span className="hidden lg:inline"> Schedule a callback from Enzo within 15 minutes (7am–9pm daily).</span>
        </p>
        
        <div className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 border border-white/40 group-hover:border-white/60">
          <Phone className="w-4 h-4 text-white" />
          <span className="text-white font-semibold">Call Now</span>
          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </section>

    {/* Scrolling Trust Marquee */}
    <TrustMarquee />

    {/* Live Mortgage Rates */}
    <LiveRates />

    {/* Loan Process Flowchart */}
    <LoanProcessFlow />

    {/* Interactive Loan Finder Tool */}
    <section className="relative bg-zinc-100 min-h-screen flex items-center py-24 overflow-hidden" data-testid="section-loan-finder">
      {/* Parallax grayscale background - more visible */}
      <div className="parallax-container absolute inset-0 z-0">
        <div className="relative h-full w-full">
          <Image
            src="/images/context/IMG_6080.webp"
            alt=""
            fill
            loading="lazy"
            quality={75}
            className="object-cover grayscale opacity-25"
            sizes="100vw"
          />
        </div>
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 text-center mb-6 uppercase tracking-wide float-in">
          Find Your Perfect Loan
        </h2>
        <p className="text-zinc-600 text-lg text-center mb-12 max-w-2xl mx-auto float-in">
          Answer a few simple questions and we'll recommend the best loan program for your situation.
        </p>
        <div className="float-in">
          <LoanFinderTool />
        </div>
      </div>
    </section>

    {/* Buyer Journey Section */}
    <section className="relative bg-zinc-950 min-h-screen flex items-center py-24 overflow-hidden" data-testid="section-buyer-journey">
      {/* Parallax grayscale background - more visible */}
      <div className="parallax-container absolute inset-0 z-0">
        <div className="relative h-full w-full">
          <Image
            src="/images/hero/IMG_6062.webp"
            alt=""
            fill
            loading="lazy"
            quality={75}
            className="object-cover grayscale opacity-25"
            sizes="100vw"
          />
        </div>
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6 uppercase tracking-wide float-in">
          Your Path to Homeownership
        </h2>
        <p className="text-zinc-300 text-lg text-center mb-16 max-w-2xl mx-auto float-in">
          A clear, simple process from start to finish. We guide you every step of the way.
        </p>
        
        <div className="grid md:grid-cols-4 gap-8 float-in-stagger">
          {buyerJourneySteps.map((step, index) => (
            <div 
              key={step.step}
              className="float-in relative text-center group hover-card-glow bg-zinc-800/90 p-6 border border-zinc-600 rounded-2xl backdrop-blur-sm"
              data-testid={`journey-step-${step.step}`}
            >
              {/* Connector line */}
              {index < buyerJourneySteps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 z-0" />
              )}
              
              <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 bg-primary/20 mb-6 border border-primary/30 shadow-md group-hover:bg-primary/30 group-hover:shadow-xl transition-all duration-300 rounded-xl">
                {step.step === 1 && <FileCheck className="w-10 h-10 text-primary" />}
                {step.step === 2 && <HomeIcon className="w-10 h-10 text-primary" />}
                {step.step === 3 && <Clock className="w-10 h-10 text-primary" />}
                {step.step === 4 && <Key className="w-10 h-10 text-primary" />}
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 bg-primary text-white text-sm font-bold flex items-center justify-center shadow-md rounded-lg">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{step.title}</h3>
              <p className="text-zinc-300">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 float-in">
          <Link
            href="/apply"
            className="btn-luxury"
            data-testid="button-start-journey"
          >
            Apply Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>

    {/* Interactive Service Cards - Rocket Mortgage Style */}
    <section className="relative bg-zinc-100 min-h-screen flex items-center py-24 overflow-hidden" data-testid="section-services">
      {/* Parallax grayscale background */}
      <div className="parallax-container absolute inset-0 z-0">
        <div className="relative h-full w-full">
          <Image
            src="/images/context/IMG_6096.webp"
            alt=""
            fill
            className="object-cover grayscale opacity-20"
          />
        </div>
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 text-center mb-6 uppercase tracking-wide float-in" data-testid="text-services-title">
          What's Your Goal?
        </h2>
        <p className="text-zinc-600 text-lg text-center mb-16 max-w-2xl mx-auto float-in">
          Hover or tap to explore our loan programs. Each card flips to reveal all your options.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 float-in-stagger">
          {serviceCards.map((card) => (
            <div key={card.href} className="float-in">
              <FlipCard
                title={card.title}
                description={card.description}
                href={card.href}
                iconName={card.iconName}
                programs={card.programs}
                testId={`card-service-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Vertical Testimonial Slider */}
    <VerticalTestimonialSlider />

    {/* Calculator Section - PROMINENT */}
    <CalculatorSection />

    {/* 24/7 Availability Section */}
    <AvailabilitySection />

    {/* Why Clients Choose Enzo */}
    <section className="relative bg-zinc-950 min-h-screen flex items-center py-24 overflow-hidden" data-testid="section-why-sam">
      {/* Parallax grayscale background - more visible */}
      <div className="parallax-container absolute inset-0 z-0">
        <div className="relative h-full w-full">
          <Image
            src="/images/context/IMG_6097.webp"
            alt=""
            fill
            className="object-cover grayscale opacity-25"
          />
        </div>
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* Header with Enzo badge */}
        <div className="flex flex-col items-center mb-16">
          {/* Enzo headshot badge */}
          <Link href="/about" className="group mb-6" data-testid="link-enzo-badge">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow-xl group-hover:scale-105 transition-transform">
              <Image
                src="/images/trust/IMG_2500.webp"
                alt="Enzo - Mortgage Expert"
                fill
                className="object-cover"
              />
            </div>
          </Link>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center uppercase tracking-wide float-in" data-testid="text-why-sam-title">
            Why Clients Choose Enzo
          </h2>
          <Link 
            href="/about" 
            className="mt-4 text-primary font-medium hover:underline flex items-center gap-1"
            data-testid="link-meet-enzo"
          >
            Meet Enzo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6 float-in-stagger">
          <div 
            className="float-in group relative bg-zinc-800/90 p-8 border border-zinc-600 rounded-2xl backdrop-blur-sm hover-card-glow"
            data-testid="value-prop-1"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-14 h-14 bg-primary/20 border border-primary/30 shadow-md flex items-center justify-center group-hover:bg-primary/30 group-hover:shadow-lg transition-all duration-300">
                <MessageCircle className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Straight Answers</h3>
                <p className="text-zinc-300 text-lg leading-relaxed">You get straight answers — no pressure, no confusion.</p>
              </div>
            </div>
          </div>

          <div 
            className="float-in group relative bg-zinc-800/90 p-8 border border-zinc-600 rounded-2xl backdrop-blur-sm hover-card-glow"
            data-testid="value-prop-2"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-14 h-14 bg-primary/20 border border-primary/30 shadow-md flex items-center justify-center group-hover:bg-primary/30 group-hover:shadow-lg transition-all duration-300">
                <Brain className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Complex Situations Handled</h3>
                <p className="text-zinc-300 text-lg leading-relaxed">Complex situations are handled calmly and professionally.</p>
              </div>
            </div>
          </div>

          <div 
            className="float-in group relative bg-zinc-800/90 p-8 border border-zinc-600 rounded-2xl backdrop-blur-sm hover-card-glow"
            data-testid="value-prop-3"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-14 h-14 bg-primary/20 border border-primary/30 shadow-md flex items-center justify-center group-hover:bg-primary/30 group-hover:shadow-lg transition-all duration-300">
                <UserCheck className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Start To Finish</h3>
                <p className="text-zinc-300 text-lg leading-relaxed">Enzo stays involved from start to finish.</p>
              </div>
            </div>
          </div>

          <div 
            className="float-in group relative bg-zinc-800/90 p-8 border border-zinc-600 rounded-2xl backdrop-blur-sm hover-card-glow"
            data-testid="value-prop-4"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-14 h-14 bg-primary/20 border border-primary/30 shadow-md flex items-center justify-center group-hover:bg-primary/30 group-hover:shadow-lg transition-all duration-300">
                <Lightbulb className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Clear Options</h3>
                <p className="text-zinc-300 text-lg leading-relaxed">Options are explained clearly so you can decide with confidence.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Enzo Section - Human Trust */}
    <section className="relative bg-zinc-100 min-h-screen flex items-center py-24 overflow-hidden" data-testid="section-enzo">
      {/* Grayscale background image */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full">
          <Image
            src="/images/hero/IMG_6074.webp"
            alt=""
            fill
            className="object-cover grayscale opacity-20"
          />
        </div>
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        <div className="float-in inline-flex items-center justify-center w-20 h-20 bg-white border border-zinc-300 shadow-xl mb-10 rounded-2xl animate-glow-pulse">
          <Heart className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 mb-10 uppercase tracking-wide float-in" data-testid="text-enzo-title">
          Trust Is The Luxury Everyone Deserves
        </h2>
        <div className="space-y-6 text-zinc-700 text-lg md:text-xl leading-relaxed float-in">
          <p>
            Enzo is known for staying steady when situations feel complicated or time-sensitive. He understands that a mortgage isn't just a financial decision — it's tied to real life, real pressure, and real consequences.
          </p>
          <p>
            Clients work with Enzo because he listens first, explains clearly, and stays engaged until the job is done. When you work with us, you're not just getting a loan — you're getting a partner who treats your goals like his own.
          </p>
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="relative bg-zinc-950 min-h-screen flex items-center py-28 overflow-hidden" data-testid="section-final-cta">
      {/* Grayscale background image - more visible */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full">
          <Image
            src="/images/context/IMG_6104.webp"
            alt=""
            fill
            className="object-cover grayscale opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-zinc-900/70 to-zinc-900" />
        </div>
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 uppercase tracking-wide float-in" data-testid="text-final-cta-title">
          Let's Take The Next Step — Calmly.
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center float-in">
          <Link
            href="/apply"
            className="btn-luxury"
            data-testid="button-start-application"
          >
            Apply Now
          </Link>
          <Link
            href="/contact"
            className="btn-luxury-outline"
            data-testid="button-talk-to-enzo"
          >
            Talk to Enzo
          </Link>
        </div>
      </div>
    </section>
    </FloatInObserver>
    </ParallaxProvider>
  );
}
