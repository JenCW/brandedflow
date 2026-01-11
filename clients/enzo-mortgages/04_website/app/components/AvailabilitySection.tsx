"use client";

import { Phone, Clock, MessageCircle, Headphones, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AvailabilitySection() {
  return (
    <section className="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 py-24 overflow-hidden border-y border-zinc-800" data-testid="section-availability">
      {/* Grayscale background image - more visible */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/trust/IMG_6105.webp"
          alt=""
          fill
          loading="lazy"
          quality={75}
          className="object-cover grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-zinc-950/70" />
      </div>
      
      <div className="relative w-full max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Available Now</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide">
              <span className="text-primary">Live Person</span> 24/7
            </h2>

            <p className="text-xl text-zinc-300 leading-relaxed">
              When you call, you'll always speak to a real person — not a machine, not a voicemail. 
              Get any questions about the mortgage process answered day or night. Need to speak directly 
              with Enzo? Schedule a callback within 15 minutes, 7am–9pm daily.
            </p>

            {/* Key Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-4 bg-zinc-800/50 border border-zinc-700">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wide">Always A Live Person</h4>
                  <p className="text-zinc-400 text-sm">Never a machine — speak to someone real</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-zinc-800/50 border border-zinc-700">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wide">15-Min Callback</h4>
                  <p className="text-zinc-400 text-sm">Enzo calls you back 7am–9pm daily</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-zinc-800/50 border border-zinc-700">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wide">Text or Call</h4>
                  <p className="text-zinc-400 text-sm">Reach us however you prefer</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-zinc-800/50 border border-zinc-700">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wide">Nights & Weekends</h4>
                  <p className="text-zinc-400 text-sm">2am Sunday? We're still here</p>
                </div>
              </div>
            </div>

            {/* Promise List */}
            <div className="space-y-3 pt-4">
              {[
                "Always a live person — never voicemail or hold music",
                "Any mortgage question answered, any time day or night",
                "Enzo callback within 15 minutes, 7am–9pm daily",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="tel:+19495220606" className="btn-luxury" data-testid="button-call-now">
                <Phone className="w-5 h-5" />
                Call Now
              </Link>
              <Link href="/apply" className="btn-luxury-outline" data-testid="button-request-callback">
                Request Callback <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Image Side - Enzo */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/5] overflow-hidden border border-zinc-700 shadow-2xl group">
              <Image
                src="/images/hero/IMG_6054.webp"
                alt="Enzo - Available 24/7"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 p-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Phone className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Talk to Enzo</p>
                    <p className="text-primary font-semibold">(949) 522-0606</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 border border-primary/20" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 border border-primary/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
