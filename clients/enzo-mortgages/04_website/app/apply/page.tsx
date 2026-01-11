"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, CheckCircle, Phone } from "lucide-react";
import ApplyForm from "../components/ApplyForm";

export default function Page() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/context/va-loans-hero.png"
            alt="Apply for Mortgage"
            fill
            className="object-cover grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-2 mb-6 rounded-lg">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Application
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
              Start Your <span className="text-primary">Application</span>
            </h1>
            <p className="text-xl text-zinc-200 mb-8 leading-relaxed">
              Complete your mortgage application in minutes. Get pre-approved and start shopping for your dream home today.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <div className="text-zinc-300">
                <Shield className="w-5 h-5 inline mr-2 text-primary" />
                NMLS #1984772
              </div>
              <div className="text-zinc-300">
                <Clock className="w-5 h-5 inline mr-2 text-primary" />
                14-21 Day Closing
              </div>
              <div className="text-zinc-300">
                <CheckCircle className="w-5 h-5 inline mr-2 text-primary" />
                No Obligation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="relative bg-zinc-900 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900/95 backdrop-blur-sm border border-zinc-700 rounded-2xl p-8 shadow-2xl"
          >
            <ApplyForm />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zinc-950 py-16 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase tracking-wide">
            Questions? We're Here to Help
          </h2>
          <p className="text-lg text-zinc-300 mb-8">
            Speak directly with a mortgage specialist
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+19495220606"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary border border-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-5 h-5" />
              (949) 522-0606
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 text-white font-semibold rounded hover:bg-zinc-700 transition-colors"
            >
              Back to Home <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
