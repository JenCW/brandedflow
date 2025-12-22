"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Home, Building2, DollarSign, CreditCard, CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";

type Step = 1 | 2 | 3 | 4 | 5;

interface LoanResult {
  recommendedLoan: string;
  estimatedPayment: string;
  downPaymentPercent: number;
  reasoning: string;
  nextSteps: string[];
}

export default function LoanFinderTool() {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState({
    purpose: "" as "buy" | "refinance" | "cashout" | "investor" | "",
    propertyType: "" as "singleFamily" | "condo" | "multiFamily" | "manufactured" | "",
    creditScore: "" as "excellent" | "good" | "fair" | "rebuilding" | "",
    downPayment: "" as "0" | "3" | "5" | "10" | "20" | "25plus" | "",
    purchasePrice: 500000,
    isFirstTime: null as boolean | null,
    isVeteran: null as boolean | null,
  });
  const [showResult, setShowResult] = useState(false);

  const calculateResult = (): LoanResult => {
    const { purpose, creditScore, downPayment, purchasePrice, isFirstTime, isVeteran } = answers;
    
    let recommendedLoan = "Conventional Loan";
    let reasoning = "";
    let estimatedRate = 6.875;
    
    // VA Loan check
    if (isVeteran && (purpose === "buy" || purpose === "refinance")) {
      recommendedLoan = "VA Loan";
      reasoning = "As a veteran, you qualify for VA loans with no down payment required and competitive rates.";
      estimatedRate = 6.25;
    }
    // First-time buyer with low down payment
    else if (isFirstTime && (downPayment === "0" || downPayment === "3" || downPayment === "5")) {
      if (creditScore === "fair" || creditScore === "rebuilding") {
        recommendedLoan = "FHA Loan";
        reasoning = "FHA loans are ideal for first-time buyers with lower credit scores. Only 3.5% down required.";
        estimatedRate = 6.5;
      } else {
        recommendedLoan = "Conventional 97";
        reasoning = "With good credit, a Conventional 97 loan lets you put just 3% down without mortgage insurance for life.";
        estimatedRate = 6.75;
      }
    }
    // Investor
    else if (purpose === "investor") {
      recommendedLoan = "DSCR Loan";
      reasoning = "For investment properties, DSCR loans qualify you based on rental income, not personal income.";
      estimatedRate = 7.5;
    }
    // High purchase price
    else if (purchasePrice > 766550) {
      recommendedLoan = "Jumbo Loan";
      reasoning = "Your purchase price exceeds conforming loan limits. Jumbo loans are designed for luxury properties.";
      estimatedRate = 7.0;
    }
    // Cash-out refinance
    else if (purpose === "cashout") {
      recommendedLoan = "Cash-Out Refinance";
      reasoning = "Access your home equity while potentially getting a better rate than a HELOC.";
      estimatedRate = 7.0;
    }
    // Standard conventional
    else {
      recommendedLoan = "Conventional Loan";
      reasoning = "A conventional loan offers the best rates and flexibility for your situation.";
      estimatedRate = 6.875;
    }

    // Calculate estimated payment
    const loanAmount = purchasePrice * (1 - (parseInt(downPayment || "20") / 100));
    const monthlyRate = estimatedRate / 100 / 12;
    const numPayments = 360;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);

    return {
      recommendedLoan,
      estimatedPayment: `$${Math.round(monthlyPayment).toLocaleString()}`,
      downPaymentPercent: parseInt(downPayment || "20"),
      reasoning,
      nextSteps: [
        "Get pre-approved in minutes",
        "Lock in your rate",
        "Start shopping with confidence"
      ]
    };
  };

  const advanceStep = () => {
    setTimeout(() => {
      if (step < 5) {
        setStep((step + 1) as Step);
      } else {
        setShowResult(true);
      }
    }, 300);
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
    } else if (step > 1) {
      setStep((step - 1) as Step);
    }
  };

  const handleOptionSelect = (field: string, value: any, autoAdvance = true) => {
    setAnswers({ ...answers, [field]: value });
    if (autoAdvance) {
      advanceStep();
    }
  };

  const result = showResult ? calculateResult() : null;

  return (
    <div className="bg-zinc-800 border border-zinc-600 shadow-2xl overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-zinc-700 px-6 py-4 border-b border-zinc-600">
        <div className="flex items-center justify-between mb-2">
          <span className="text-zinc-400 text-sm uppercase tracking-wider">
            {showResult ? "Your Results" : `Step ${step} of 5`}
          </span>
          <span className="text-primary font-semibold">
            {showResult ? "100%" : `${(step / 5) * 100}%`}
          </span>
        </div>
        <div className="h-2 bg-zinc-600 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
            style={{ width: showResult ? "100%" : `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-8">
        {!showResult ? (
          <>
            {/* Step 1: Purpose */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wide">What's Your Goal?</h3>
                <p className="text-zinc-400">Select the option that best describes what you're looking to do.</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "buy", label: "Buy a Home", icon: Home },
                    { value: "refinance", label: "Refinance", icon: DollarSign },
                    { value: "cashout", label: "Cash Out Equity", icon: Building2 },
                    { value: "investor", label: "Investment Property", icon: Building2 },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionSelect("purpose", option.value)}
                      className={`p-6 border-2 transition-all duration-300 hover:scale-105 ${
                        answers.purpose === option.value
                          ? "border-primary bg-primary/20 text-white"
                          : "border-zinc-500 bg-zinc-700 text-zinc-200 hover:border-zinc-400 hover:bg-zinc-600"
                      }`}
                      data-testid={`option-purpose-${option.value}`}
                    >
                      <option.icon className={`w-8 h-8 mb-3 mx-auto ${answers.purpose === option.value ? "text-primary" : "text-zinc-500"}`} />
                      <span className="font-semibold">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Property Type */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wide">Property Type?</h3>
                <p className="text-zinc-400">What type of property are you interested in?</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "singleFamily", label: "Single Family Home" },
                    { value: "condo", label: "Condo / Townhouse" },
                    { value: "multiFamily", label: "Multi-Family (2-4 units)" },
                    { value: "manufactured", label: "Manufactured / Prefab" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionSelect("propertyType", option.value)}
                      className={`p-6 border-2 transition-all duration-300 hover:scale-105 ${
                        answers.propertyType === option.value
                          ? "border-primary bg-primary/20 text-white"
                          : "border-zinc-500 bg-zinc-700 text-zinc-200 hover:border-zinc-400 hover:bg-zinc-600"
                      }`}
                      data-testid={`option-property-${option.value}`}
                    >
                      <span className="font-semibold">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Credit Score */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wide">Credit Score Range?</h3>
                <p className="text-zinc-400">Don't worry - we have options for all credit levels.</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "excellent", label: "Excellent (740+)", color: "text-green-400" },
                    { value: "good", label: "Good (680-739)", color: "text-primary" },
                    { value: "fair", label: "Fair (620-679)", color: "text-yellow-400" },
                    { value: "rebuilding", label: "Rebuilding (<620)", color: "text-orange-400" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionSelect("creditScore", option.value)}
                      className={`p-6 border-2 transition-all duration-300 hover:scale-105 ${
                        answers.creditScore === option.value
                          ? "border-primary bg-primary/20 text-white"
                          : "border-zinc-500 bg-zinc-700 text-zinc-200 hover:border-zinc-400 hover:bg-zinc-600"
                      }`}
                      data-testid={`option-credit-${option.value}`}
                    >
                      <CreditCard className={`w-6 h-6 mb-2 mx-auto ${option.color}`} />
                      <span className="font-semibold">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Down Payment */}
            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wide">Down Payment?</h3>
                <p className="text-zinc-400">How much are you planning to put down?</p>
                
                <div className="space-y-4">
                  <label className="block text-zinc-300">
                    <span className="text-sm uppercase tracking-wider mb-2 block">Purchase Price</span>
                    <input
                      type="range"
                      min="100000"
                      max="2000000"
                      step="25000"
                      value={answers.purchasePrice}
                      onChange={(e) => setAnswers({ ...answers, purchasePrice: parseInt(e.target.value) })}
                      className="w-full accent-primary"
                      data-testid="input-purchase-price"
                    />
                    <div className="text-2xl font-bold text-primary mt-2">
                      ${answers.purchasePrice.toLocaleString()}
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "0", label: "0% (VA/USDA)" },
                    { value: "3", label: "3%" },
                    { value: "5", label: "5%" },
                    { value: "10", label: "10%" },
                    { value: "20", label: "20%" },
                    { value: "25plus", label: "25%+" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionSelect("downPayment", option.value)}
                      className={`p-4 border-2 transition-all duration-300 hover:scale-105 ${
                        answers.downPayment === option.value
                          ? "border-primary bg-primary/20 text-white"
                          : "border-zinc-500 bg-zinc-700 text-zinc-200 hover:border-zinc-400 hover:bg-zinc-600"
                      }`}
                      data-testid={`option-downpayment-${option.value}`}
                    >
                      <span className="font-semibold text-sm">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Additional Info */}
            {step === 5 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wide">A Few More Details</h3>
                <p className="text-zinc-400">This helps us find the best program for you.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-zinc-700 border border-zinc-500">
                    <span className="text-zinc-200">Are you a first-time homebuyer?</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOptionSelect("isFirstTime", true, false)}
                        className={`px-4 py-2 border transition-all ${
                          answers.isFirstTime === true
                            ? "border-primary bg-primary/20 text-white"
                            : "border-zinc-400 bg-zinc-600 text-zinc-200 hover:border-zinc-300"
                        }`}
                        data-testid="option-firsttime-yes"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleOptionSelect("isFirstTime", false, false)}
                        className={`px-4 py-2 border transition-all ${
                          answers.isFirstTime === false
                            ? "border-primary bg-primary/20 text-white"
                            : "border-zinc-400 bg-zinc-600 text-zinc-200 hover:border-zinc-300"
                        }`}
                        data-testid="option-firsttime-no"
                      >
                        No
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-zinc-700 border border-zinc-500">
                    <span className="text-zinc-200">Are you a veteran or active military?</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { handleOptionSelect("isVeteran", true, false); setTimeout(() => setShowResult(true), 300); }}
                        className={`px-4 py-2 border transition-all ${
                          answers.isVeteran === true
                            ? "border-primary bg-primary/20 text-white"
                            : "border-zinc-400 bg-zinc-600 text-zinc-200 hover:border-zinc-300"
                        }`}
                        data-testid="option-veteran-yes"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => { handleOptionSelect("isVeteran", false, false); setTimeout(() => setShowResult(true), 300); }}
                        className={`px-4 py-2 border transition-all ${
                          answers.isVeteran === false
                            ? "border-primary bg-primary/20 text-white"
                            : "border-zinc-400 bg-zinc-600 text-zinc-200 hover:border-zinc-300"
                        }`}
                        data-testid="option-veteran-no"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation - Back button only, selections auto-advance */}
            <div className="flex justify-between mt-8 pt-6 border-t border-zinc-600">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className={`flex items-center gap-2 px-6 py-3 transition-all ${
                  step === 1
                    ? "text-zinc-600 cursor-not-allowed"
                    : "text-zinc-400 hover:text-white"
                }`}
                data-testid="button-back"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <span className="text-zinc-500 text-sm flex items-center">
                Select an option to continue
              </span>
            </div>
          </>
        ) : result && (
          /* Results Screen */
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 border border-primary/30 mb-6">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white uppercase tracking-wide mb-2">
                Your Perfect Match
              </h3>
              <p className="text-zinc-400">Based on your answers, here's what we recommend:</p>
            </div>

            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 p-8">
              <div className="text-center mb-6">
                <span className="text-primary text-sm uppercase tracking-widest">Recommended Program</span>
                <h4 className="text-4xl font-bold text-white mt-2">{result.recommendedLoan}</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center p-4 bg-zinc-700/70 border border-zinc-500">
                  <span className="text-zinc-300 text-sm block mb-1">Est. Monthly Payment</span>
                  <span className="text-3xl font-bold text-primary">{result.estimatedPayment}</span>
                </div>
                <div className="text-center p-4 bg-zinc-700/70 border border-zinc-500">
                  <span className="text-zinc-300 text-sm block mb-1">Down Payment</span>
                  <span className="text-3xl font-bold text-white">{result.downPaymentPercent}%</span>
                </div>
              </div>

              <p className="text-zinc-300 text-center">{result.reasoning}</p>
            </div>

            <div className="space-y-3">
              <h5 className="text-white font-semibold uppercase tracking-wide">Next Steps:</h5>
              {result.nextSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-300">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/apply" className="btn-luxury flex-1 text-center" data-testid="button-apply-now">
                Apply Now <ArrowRight className="w-5 h-5 inline ml-2" />
              </Link>
              <button
                onClick={() => { setShowResult(false); setStep(1); setAnswers({ purpose: "", propertyType: "", creditScore: "", downPayment: "", purchasePrice: 500000, isFirstTime: null, isVeteran: null }); }}
                className="btn-luxury-outline flex-1"
                data-testid="button-start-over"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
