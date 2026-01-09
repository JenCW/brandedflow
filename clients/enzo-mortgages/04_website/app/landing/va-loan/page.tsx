"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Phone, 
  CheckCircle, 
  Shield, 
  Clock, 
  DollarSign,
  Home,
  MapPin,
  Calendar,
  Loader2,
  Star
} from "lucide-react";
import VeteranSaluteIllustration from "@/app/components/VeteranSaluteIllustration";
import ValuationForm from "@/app/components/ValuationForm";

// Veteran salute animation component - slides in from right with next card
const VeteranSalute = ({ 
  isVisible, 
  onComplete 
}: { 
  isVisible: boolean;
  onComplete: () => void;
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-50 pointer-events-none"
        >
          <div className="relative w-full h-full flex items-center justify-end pr-8">
            <motion.div
              className="relative w-64 h-80 md:w-80 md:h-96"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <VeteranSaluteIllustration onAnimationComplete={onComplete} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// California cities for mortgage leads
const californiaCities = [
  "Irvine", "Newport Beach", "Santa Ana", "Anaheim", "Costa Mesa",
  "Huntington Beach", "Laguna Beach", "Tustin", "Orange", "Fullerton",
  "Los Angeles", "San Diego", "San Francisco", "Sacramento", "Fresno",
  "Long Beach", "Oakland", "Bakersfield", "Riverside", "Stockton",
  "San Jose", "Fremont", "Santa Clarita", "San Bernardino", "Modesto"
];

// Property value ranges (for home valuation step)
const propertyValueRanges = [
  { value: "under-300k", label: "Under $300,000" },
  { value: "300k-500k", label: "$300,000 - $500,000" },
  { value: "500k-750k", label: "$500,000 - $750,000" },
  { value: "750k-1m", label: "$750,000 - $1,000,000" },
  { value: "1m-1.5m", label: "$1,000,000 - $1,500,000" },
  { value: "1.5m-plus", label: "$1,500,000+" },
];

const loanTypes = [
  { value: "va", label: "VA Loan", description: "Zero down payment for veterans" },
  { value: "fha", label: "FHA Loan", description: "Low down payment option" },
  { value: "conventional", label: "Conventional", description: "Traditional financing" },
  { value: "jumbo", label: "Jumbo Loan", description: "For higher loan amounts" },
  { value: "usda", label: "USDA Loan", description: "Rural property financing" },
];

const timelines = [
  { value: "immediately", label: "Immediately", description: "Ready to move now" },
  { value: "1-3-months", label: "1-3 Months", description: "Looking actively" },
  { value: "3-6-months", label: "3-6 Months", description: "Planning ahead" },
  { value: "6-plus-months", label: "6+ Months", description: "Just exploring" },
];

export default function LoanOfficerLandingPage() {
  const [step, setStep] = useState(1);
  const [showSalute, setShowSalute] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    loanGoal: "",
    city: "",
    propertyType: "",
    loanType: "",
    timeline: "",
  });
  const [valuationSubmitted, setValuationSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Handle salute completion and slide to next step
  const handleSaluteComplete = () => {
    // Start transitioning the card while soldier is still visible
    setIsTransitioning(true);
    // Advance to next step
    setStep((prev) => prev + 1);
    // Hide soldier after a brief moment
    setTimeout(() => {
      setShowSalute(false);
      setIsTransitioning(false);
    }, 200);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelect = (name: string, value: string, autoAdvance: boolean = true) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    
    // Auto-advance to next step after selection
    if (autoAdvance) {
      // Trigger salute animation
      setShowSalute(true);
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1 && !formData.loanGoal) {
      newErrors.loanGoal = "Please select a loan goal";
    }

    if (currentStep === 2) {
      if (!formData.propertyType) newErrors.propertyType = "Please select property type";
    }

    if (currentStep === 3) {
      // Valuation step - validation handled by ValuationForm component
    }

    if (currentStep === 4 && !formData.loanType) {
      newErrors.loanType = "Please select a loan type";
    }

    if (currentStep === 5 && !formData.timeline) {
      newErrors.timeline = "Please select your timeline";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setShowSalute(true);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };


  const handleFinalSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/lead/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          leadType: formData.loanGoal === "purchase" ? "Home Purchase" : "Refinance",
          loanType: formData.loanType,
          timeline: formData.timeline, // Qualification factor: how soon
          source: "VA Loan Landing Page",
          state: "CA", // Qualification factor: licensed area (California)
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

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const inputClass =
    "w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-primary rounded-lg transition-colors";
  const selectClass =
    "w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-primary rounded-lg transition-colors";
  const labelClass = "block text-sm font-medium text-zinc-300 mb-2";
  const errorClass = "text-sm text-red-400 mt-1";

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-zinc-900 border border-primary/30 p-12 text-center rounded-2xl"
        >
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-wide">
            Thank You!
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            A mortgage specialist will contact you within 5 minutes with your personalized rate quote.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors"
          >
            Continue to Application <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  // Schema.org structured data for SEO
  const financialServiceSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Enzo Mortgages - VA Loan Officer",
    description: "Trusted VA loan officer providing zero down payment mortgages, competitive rates, and fast approval for veterans in Orange County, California.",
    url: "https://enzomortgages.com/landing/va-loan",
    telephone: "(949) 555-1234",
    areaServed: {
      "@type": "State",
      name: "California",
    },
    serviceType: ["VA Loans", "Mortgage Loans", "Home Loans", "Refinancing"],
    provider: {
      "@type": "LocalBusiness",
      name: "Enzo Mortgages",
      "@id": "https://enzomortgages.com",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financialServiceSchema) }}
      />

      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/context/va-loans-hero.png"
            alt="VA Loans"
            fill
            className="object-cover animate-ken-burns-right scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 w-full h-screen flex items-center justify-center px-6">
          {/* Multi-Step Form - Full Screen Bright */}
          <div className="relative w-full max-w-4xl mx-auto bg-zinc-100/95 backdrop-blur-sm border border-zinc-300 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden">
            {/* Veteran Salute Overlay - positioned relative to form */}
            <VeteranSalute isVisible={showSalute} onComplete={handleSaluteComplete} />

            <AnimatePresence mode="wait">
              {/* Step 1: Loan Goal */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6 relative z-10"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-2 uppercase tracking-wide">
                      What's Your Goal?
                    </h2>
                    <p className="text-zinc-600">Choose the option that best describes you</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleSelect("loanGoal", "purchase")}
                      className={`p-6 border-2 rounded transition-all text-left ${
                        formData.loanGoal === "purchase"
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-primary/30 bg-accent/30 hover:border-primary/60 hover:bg-accent/50 text-zinc-900"
                      }`}
                    >
                      <Home className={`w-8 h-8 mb-3 ${formData.loanGoal === "purchase" ? "text-primary-foreground" : "text-primary"}`} />
                      <h3 className={`text-xl font-bold mb-2 ${formData.loanGoal === "purchase" ? "text-primary-foreground" : "text-zinc-900"}`}>Buy a Home</h3>
                      <p className={formData.loanGoal === "purchase" ? "text-primary-foreground/90" : "text-zinc-600"}>
                        Ready to purchase your dream home with a VA loan
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelect("loanGoal", "refinance")}
                      className={`p-6 border-2 rounded transition-all text-left ${
                        formData.loanGoal === "refinance"
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-primary/30 bg-accent/30 hover:border-primary/60 hover:bg-accent/50 text-zinc-900"
                      }`}
                    >
                      <DollarSign className={`w-8 h-8 mb-3 ${formData.loanGoal === "refinance" ? "text-primary-foreground" : "text-primary"}`} />
                      <h3 className={`text-xl font-bold mb-2 ${formData.loanGoal === "refinance" ? "text-primary-foreground" : "text-zinc-900"}`}>Refinance</h3>
                      <p className={formData.loanGoal === "refinance" ? "text-primary-foreground/90" : "text-zinc-600"}>
                        Lower your rate or access your home's equity
                      </p>
                    </button>
                  </div>

                  {errors.loanGoal && (
                    <p className={errorClass}>{errors.loanGoal}</p>
                  )}
                </motion.div>
              )}

              {/* Step 2: Property Type */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6 relative z-10"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-2 uppercase tracking-wide">
                      What Type of Property?
                    </h2>
                    <p className="text-zinc-600">
                      Select your property type
                    </p>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Property Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: "single-family", label: "Single Family", icon: Home },
                        { value: "condo", label: "Condo", icon: Home },
                        { value: "townhome", label: "Townhome", icon: Home },
                        { value: "multi-unit", label: "Multi-Unit", icon: Home },
                      ].map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handleSelect("propertyType", type.value)}
                          className={`p-4 border-2 rounded transition-all text-center ${
                            formData.propertyType === type.value
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-primary/30 bg-accent/30 hover:border-primary/60 hover:bg-accent/50 text-zinc-900"
                          }`}
                        >
                          <type.icon className={`w-8 h-8 mx-auto mb-2 ${formData.propertyType === type.value ? "text-primary-foreground" : "text-primary"}`} />
                          <h3 className={`text-lg font-bold ${formData.propertyType === type.value ? "text-primary-foreground" : "text-zinc-900"}`}>{type.label}</h3>
                        </button>
                      ))}
                    </div>
                    {errors.propertyType && (
                      <p className={errorClass}>{errors.propertyType}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Property Valuation with Tool */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6 relative z-10"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-2 uppercase tracking-wide">
                      Get Your Home Valuation
                    </h2>
                    <p className="text-zinc-600">
                      Enter your property details to get an instant valuation
                    </p>
                  </div>

                  {/* Integrated Valuation Form */}
                  <div className="bg-white/80 rounded-lg p-6 border border-zinc-300">
                    <ValuationForm 
                      onSuccess={() => {
                        setValuationSubmitted(true);
                        setShowSalute(true);
                      }}
                    />
                  </div>
                  
                  {valuationSubmitted && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-zinc-600">
                        Valuation submitted! Moving to next step...
                      </p>
                    </div>
                  )}

                  <div className="bg-primary/20 border border-primary/40 p-4 rounded-lg">
                    <p className="text-sm text-zinc-800">
                      <CheckCircle className="w-4 h-4 inline mr-2 text-primary" />
                      We'll provide a free home valuation and connect you with a VA loan specialist
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Loan Type */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6 relative z-10"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-2 uppercase tracking-wide">
                      What Type of Loan?
                    </h2>
                    <p className="text-zinc-600">Select your preferred loan program</p>
                  </div>

                  <div className="grid gap-4">
                    {loanTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => handleSelect("loanType", type.value)}
                        className={`p-4 border-2 rounded transition-all text-left ${
                          formData.loanType === type.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-primary/30 bg-accent/30 hover:border-primary/60 hover:bg-accent/50 text-zinc-900"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className={`text-lg font-bold mb-1 ${formData.loanType === type.value ? "text-primary-foreground" : "text-zinc-900"}`}>
                              {type.label}
                            </h3>
                            <p className={`text-sm ${formData.loanType === type.value ? "text-primary-foreground/90" : "text-zinc-600"}`}>{type.description}</p>
                          </div>
                          {formData.loanType === type.value && (
                            <CheckCircle className="w-6 h-6 text-primary" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {errors.loanType && <p className={errorClass}>{errors.loanType}</p>}
                </motion.div>
              )}

              {/* Step 5: Timeline */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6 relative z-10"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-2 uppercase tracking-wide">
                      When Are You Ready?
                    </h2>
                    <p className="text-zinc-600">
                      Help us prioritize your application
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {timelines.map((timeline) => (
                      <button
                        key={timeline.value}
                        type="button"
                        onClick={() => {
                          if (!formData.timeline) {
                            handleSelect("timeline", timeline.value, false);
                            // For final step, submit after salute animation completes
                            setTimeout(() => {
                              handleFinalSubmit();
                            }, 1800); // After salute animation (1.2s) + transition (0.5s) + buffer
                          }
                        }}
                        className={`p-4 border-2 rounded transition-all text-left ${
                          formData.timeline === timeline.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-primary/30 bg-accent/30 hover:border-primary/60 hover:bg-accent/50 text-zinc-900"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className={`text-lg font-bold mb-1 ${formData.timeline === timeline.value ? "text-primary-foreground" : "text-zinc-900"}`}>
                              {timeline.label}
                            </h3>
                            <p className={`text-sm ${formData.timeline === timeline.value ? "text-primary-foreground/90" : "text-zinc-600"}`}>{timeline.description}</p>
                          </div>
                          {formData.timeline === timeline.value && (
                            <CheckCircle className="w-6 h-6 text-primary" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {errors.timeline && <p className={errorClass}>{errors.timeline}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons - Back Only */}
            <div className="flex justify-between mt-8 pt-6 border-t border-zinc-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 bg-zinc-800 text-zinc-200 font-medium rounded hover:bg-zinc-700 transition-colors"
                >
                  Back
                </button>
              ) : (
                <div />
              )}
              <div />
            </div>

            <p className="text-center text-zinc-600 text-xs mt-6">
              No credit check required. No obligation. We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-zinc-900 py-16 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Licensed & Insured</h3>
              <p className="text-zinc-400">NMLS #1984772</p>
            </div>
            <div>
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Fast Approval</h3>
              <p className="text-zinc-400">14-21 day average closing</p>
            </div>
            <div>
              <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Competitive Rates</h3>
              <p className="text-zinc-400">Access to 100+ lenders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-zinc-950 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wide">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-zinc-300 mb-10">
            Complete your application and get pre-approved in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="btn-luxury"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+19495551234"
              className="btn-luxury-outline"
            >
              <Phone className="w-5 h-5" />
              (949) 555-1234
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
