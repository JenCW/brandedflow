"use client";

import { useState, useEffect } from "react";
import { Calculator, DollarSign, Percent, Home, TrendingUp, RefreshCw, Shield } from "lucide-react";

interface RateData {
  rate30yr: number | null;
  rate15yr: number | null;
  source: string;
  lastUpdated: string;
}

export default function MortgageCalculator() {
  const [activeTab, setActiveTab] = useState<"payment" | "affordability" | "refinance">("payment");
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [income, setIncome] = useState(150000);
  const [monthlyDebt, setMonthlyDebt] = useState(500);
  const [currentRate, setCurrentRate] = useState(7.5);
  const [newRate, setNewRate] = useState(6.0);
  const [loanBalance, setLoanBalance] = useState(400000);
  const [propertyTax, setPropertyTax] = useState(1.1);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [liveRates, setLiveRates] = useState<RateData | null>(null);
  const [loadingRates, setLoadingRates] = useState(true);

  useEffect(() => {
    fetchLiveRates();
  }, []);

  const fetchLiveRates = async () => {
    setLoadingRates(true);
    try {
      const response = await fetch("/api/rates");
      const data = await response.json();
      setLiveRates(data);
      if (data.rate30yr) {
        setInterestRate(data.rate30yr);
        setNewRate(data.rate30yr);
      }
    } catch (error) {
      console.error("Failed to fetch live rates:", error);
    } finally {
      setLoadingRates(false);
    }
  };

  const calculateMonthlyPayment = () => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    return isNaN(payment) ? 0 : payment;
  };

  const calculateAffordability = () => {
    const monthlyIncome = income / 12;
    const maxMonthlyPayment = monthlyIncome * 0.28;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    const maxLoan = maxMonthlyPayment * (Math.pow(1 + monthlyRate, numPayments) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, numPayments));
    return isNaN(maxLoan) ? 0 : maxLoan + downPayment;
  };

  const calculateRefinanceSavings = () => {
    const currentMonthlyRate = currentRate / 100 / 12;
    const newMonthlyRate = newRate / 100 / 12;
    const numPayments = loanTerm * 12;
    const currentPayment = loanBalance * (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, numPayments)) / (Math.pow(1 + currentMonthlyRate, numPayments) - 1);
    const newPayment = loanBalance * (newMonthlyRate * Math.pow(1 + newMonthlyRate, numPayments)) / (Math.pow(1 + newMonthlyRate, numPayments) - 1);
    return isNaN(currentPayment - newPayment) ? 0 : currentPayment - newPayment;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  };

  const tabs = [
    { id: "payment" as const, label: "Payment", icon: Calculator },
    { id: "affordability" as const, label: "Affordability", icon: Home },
    { id: "refinance" as const, label: "Refinance", icon: TrendingUp },
  ];

  const calculateTotalPayment = () => {
    const pi = calculateMonthlyPayment();
    const monthlyTax = (homePrice * (propertyTax / 100)) / 12;
    const monthlyInsurance = homeInsurance / 12;
    const pmi = downPayment < homePrice * 0.2 ? (homePrice - downPayment) * 0.005 / 12 : 0;
    return pi + monthlyTax + monthlyInsurance + pmi;
  };

  const calculateAffordabilityWithDebt = () => {
    const monthlyIncome = income / 12;
    const maxDTI = 0.43;
    const maxPayment = (monthlyIncome * maxDTI) - monthlyDebt;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    if (maxPayment <= 0 || monthlyRate === 0) return downPayment;
    const maxLoan = maxPayment * (Math.pow(1 + monthlyRate, numPayments) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, numPayments));
    return isNaN(maxLoan) ? downPayment : maxLoan + downPayment;
  };

  return (
    <div className="w-full" data-testid="mortgage-calculator">
      {/* Live Rates Indicator */}
      {liveRates && (
        <div className="flex items-center justify-between mb-6 p-4 bg-zinc-800/50 border border-zinc-700">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${liveRates.source === "estimate" ? "bg-yellow-500" : "bg-green-500"} animate-pulse`} />
              <span className="text-xs text-zinc-400 uppercase tracking-wide">
                {loadingRates ? "Loading rates..." : liveRates.source === "estimate" ? "Estimated Rates" : "Live Rates"}
              </span>
            </div>
            <span className="text-sm text-white font-medium">
              30-yr: {liveRates.rate30yr?.toFixed(2)}% | 15-yr: {liveRates.rate15yr?.toFixed(2)}%
            </span>
          </div>
          <button
            onClick={fetchLiveRates}
            disabled={loadingRates}
            className="p-2 hover:bg-zinc-700 transition-colors disabled:opacity-50"
            data-testid="button-refresh-rates"
          >
            <RefreshCw className={`w-4 h-4 text-zinc-400 ${loadingRates ? "animate-spin" : ""}`} />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-300 border-2 ${
              activeTab === tab.id
                ? "bg-primary text-white border-primary shadow-lg"
                : "bg-zinc-800 text-zinc-300 border-zinc-600 hover:border-primary/50 hover:text-white hover:scale-105 hover:shadow-md"
            }`}
            data-testid={`tab-${tab.id}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Payment Calculator */}
      {activeTab === "payment" && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Home Price</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  data-testid="input-home-price"
                />
              </div>
              <input
                type="range"
                min="100000"
                max="2000000"
                step="10000"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full mt-2 accent-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Down Payment</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  data-testid="input-down-payment"
                />
              </div>
              <input
                type="range"
                min="0"
                max={homePrice * 0.5}
                step="5000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full mt-2 accent-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Interest Rate</label>
                <div className="relative">
                  <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    data-testid="input-interest-rate"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Loan Term</label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  data-testid="select-loan-term"
                >
                  <option value={30}>30 years</option>
                  <option value={20}>20 years</option>
                  <option value={15}>15 years</option>
                </select>
              </div>
            </div>
          </div>
          <div className="bg-zinc-800 border-2 border-zinc-600 shadow-xl p-8 flex flex-col justify-center items-center text-center">
            <p className="text-zinc-300 text-sm uppercase tracking-wide mb-2">Estimated Monthly Payment</p>
            <p className="text-5xl font-bold text-white mb-4" data-testid="result-monthly-payment">
              {formatCurrency(calculateMonthlyPayment())}
            </p>
            <p className="text-zinc-400 text-sm mb-6">Principal & Interest Only</p>
            <div className="text-sm text-zinc-200 space-y-1 bg-zinc-700/50 p-4 border border-zinc-600">
              <p>Loan Amount: {formatCurrency(homePrice - downPayment)}</p>
              <p>Down Payment: {((downPayment / homePrice) * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Affordability Calculator */}
      {activeTab === "affordability" && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Annual Household Income</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  data-testid="input-income"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Monthly Debts (car, student loans, cards)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="number"
                  value={monthlyDebt}
                  onChange={(e) => setMonthlyDebt(Number(e.target.value))}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  data-testid="input-monthly-debt"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Down Payment Available</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  data-testid="input-affordability-down"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Interest Rate</label>
                <div className="relative">
                  <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Loan Term</label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                >
                  <option value={30}>30 years</option>
                  <option value={20}>20 years</option>
                  <option value={15}>15 years</option>
                </select>
              </div>
            </div>
          </div>
          <div className="bg-zinc-800 border-2 border-zinc-600 shadow-xl p-8 flex flex-col justify-center items-center text-center">
            <p className="text-zinc-300 text-sm uppercase tracking-wide mb-2">You Could Afford Up To</p>
            <p className="text-5xl font-bold text-white mb-4" data-testid="result-affordability">
              {formatCurrency(calculateAffordabilityWithDebt())}
            </p>
            <p className="text-zinc-400 text-sm mb-4">Based on 43% total debt-to-income ratio</p>
            <div className="text-sm text-zinc-200 space-y-1 bg-zinc-700/50 p-4 border border-zinc-600 w-full">
              <p>Max Monthly Payment: {formatCurrency((income / 12 * 0.43) - monthlyDebt)}</p>
              <p>Current DTI: {((monthlyDebt / (income / 12)) * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Refinance Calculator */}
      {activeTab === "refinance" && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Current Loan Balance</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="number"
                  value={loanBalance}
                  onChange={(e) => setLoanBalance(Number(e.target.value))}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  data-testid="input-loan-balance"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Current Rate</label>
                <div className="relative">
                  <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="number"
                    step="0.1"
                    value={currentRate}
                    onChange={(e) => setCurrentRate(Number(e.target.value))}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    data-testid="input-current-rate"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">New Rate</label>
                <div className="relative">
                  <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="number"
                    step="0.1"
                    value={newRate}
                    onChange={(e) => setNewRate(Number(e.target.value))}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    data-testid="input-new-rate"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Loan Term</label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              >
                <option value={30}>30 years</option>
                <option value={20}>20 years</option>
                <option value={15}>15 years</option>
              </select>
            </div>
          </div>
          <div className="bg-zinc-800 border-2 border-zinc-600 shadow-xl p-8 flex flex-col justify-center items-center text-center">
            <p className="text-zinc-300 text-sm uppercase tracking-wide mb-2">Monthly Savings</p>
            <p className="text-5xl font-bold text-white mb-4" data-testid="result-refinance">
              {formatCurrency(calculateRefinanceSavings())}
            </p>
            <p className="text-zinc-400 text-sm mb-4">Per month with refinancing</p>
            <p className="text-2xl font-bold text-primary bg-zinc-700/50 px-4 py-2 border border-zinc-600">
              {formatCurrency(calculateRefinanceSavings() * 12)}/year
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
