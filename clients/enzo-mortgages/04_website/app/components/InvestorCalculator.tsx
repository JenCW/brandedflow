"use client";

import { useState, useEffect } from "react";
import { Building2, DollarSign, TrendingUp, Calculator, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function InvestorCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(25);
  const [monthlyRent, setMonthlyRent] = useState(3000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [propertyTax, setPropertyTax] = useState(400);
  const [insurance, setInsurance] = useState(150);
  const [hoa, setHoa] = useState(0);

  const [results, setResults] = useState({
    loanAmount: 0,
    monthlyMortgage: 0,
    totalExpenses: 0,
    cashFlow: 0,
    dscr: 0,
    capRate: 0,
  });

  useEffect(() => {
    const loanAmount = purchasePrice * (1 - downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = 360;
    
    const monthlyMortgage = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                            (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalExpenses = monthlyMortgage + propertyTax + insurance + hoa;
    const cashFlow = monthlyRent - totalExpenses;
    const dscr = monthlyRent / (monthlyMortgage + propertyTax + insurance);
    const annualNOI = (monthlyRent - propertyTax - insurance - hoa) * 12;
    const capRate = (annualNOI / purchasePrice) * 100;

    setResults({
      loanAmount,
      monthlyMortgage: Math.round(monthlyMortgage),
      totalExpenses: Math.round(totalExpenses),
      cashFlow: Math.round(cashFlow),
      dscr: parseFloat(dscr.toFixed(2)),
      capRate: parseFloat(capRate.toFixed(2)),
    });
  }, [purchasePrice, downPayment, monthlyRent, interestRate, propertyTax, insurance, hoa]);

  const dscrStatus = results.dscr >= 1.25 ? "excellent" : results.dscr >= 1.0 ? "good" : "needs-work";

  return (
    <section className="bg-zinc-900 py-24 border-y border-zinc-800" data-testid="section-investor-calculator">
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 mb-6">
            <Building2 className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">For Investors</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide mb-4">
            DSCR Loan Calculator
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            See if your investment property qualifies for a DSCR loan. We look at rental income, not your W-2.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Side */}
          <div className="bg-zinc-800 border border-zinc-700 p-8 space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-6">Property Details</h3>
            
            {/* Purchase Price */}
            <div>
              <label className="flex items-center justify-between mb-2">
                <span className="text-zinc-300 text-sm uppercase tracking-wider">Purchase Price</span>
                <span className="text-primary font-bold">${purchasePrice.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="100000"
                max="2000000"
                step="25000"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(parseInt(e.target.value))}
                className="w-full accent-primary"
                data-testid="input-investor-price"
              />
            </div>

            {/* Down Payment */}
            <div>
              <label className="flex items-center justify-between mb-2">
                <span className="text-zinc-300 text-sm uppercase tracking-wider">Down Payment</span>
                <span className="text-primary font-bold">{downPayment}%</span>
              </label>
              <input
                type="range"
                min="15"
                max="50"
                step="5"
                value={downPayment}
                onChange={(e) => setDownPayment(parseInt(e.target.value))}
                className="w-full accent-primary"
                data-testid="input-investor-down"
              />
            </div>

            {/* Monthly Rent */}
            <div>
              <label className="flex items-center justify-between mb-2">
                <span className="text-zinc-300 text-sm uppercase tracking-wider">Expected Monthly Rent</span>
                <span className="text-primary font-bold">${monthlyRent.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(parseInt(e.target.value))}
                className="w-full accent-primary"
                data-testid="input-investor-rent"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <label className="flex items-center justify-between mb-2">
                <span className="text-zinc-300 text-sm uppercase tracking-wider">Interest Rate</span>
                <span className="text-primary font-bold">{interestRate}%</span>
              </label>
              <input
                type="range"
                min="5"
                max="12"
                step="0.125"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full accent-primary"
                data-testid="input-investor-rate"
              />
            </div>

            {/* Additional Expenses */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-700">
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">Property Tax</label>
                <input
                  type="number"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(parseInt(e.target.value) || 0)}
                  className="w-full bg-zinc-900 border border-zinc-600 text-white px-3 py-2 text-center"
                  data-testid="input-property-tax"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">Insurance</label>
                <input
                  type="number"
                  value={insurance}
                  onChange={(e) => setInsurance(parseInt(e.target.value) || 0)}
                  className="w-full bg-zinc-900 border border-zinc-600 text-white px-3 py-2 text-center"
                  data-testid="input-insurance"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">HOA</label>
                <input
                  type="number"
                  value={hoa}
                  onChange={(e) => setHoa(parseInt(e.target.value) || 0)}
                  className="w-full bg-zinc-900 border border-zinc-600 text-white px-3 py-2 text-center"
                  data-testid="input-hoa"
                />
              </div>
            </div>
          </div>

          {/* Results Side */}
          <div className="space-y-6">
            {/* DSCR Score - Main Result */}
            <div className={`p-8 border ${
              dscrStatus === "excellent" ? "bg-green-900/20 border-green-500/30" :
              dscrStatus === "good" ? "bg-yellow-900/20 border-yellow-500/30" :
              "bg-red-900/20 border-red-500/30"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-300 uppercase tracking-wider">DSCR Ratio</span>
                {dscrStatus === "excellent" ? (
                  <span className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" /> Excellent
                  </span>
                ) : dscrStatus === "good" ? (
                  <span className="flex items-center gap-2 text-yellow-400 text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" /> Qualifies
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-red-400 text-sm font-semibold">
                    <AlertCircle className="w-4 h-4" /> Below 1.0
                  </span>
                )}
              </div>
              <div className={`text-6xl font-bold ${
                dscrStatus === "excellent" ? "text-green-400" :
                dscrStatus === "good" ? "text-yellow-400" :
                "text-red-400"
              }`}>
                {results.dscr}x
              </div>
              <p className="text-zinc-400 text-sm mt-2">
                {dscrStatus === "excellent" 
                  ? "Great! Most lenders require 1.0-1.25x. You're in excellent shape."
                  : dscrStatus === "good"
                  ? "You meet the minimum requirement. Consider a larger down payment for better terms."
                  : "Your rental income doesn't cover expenses. Adjust your numbers or consider a larger down payment."}
              </p>
            </div>

            {/* Financial Breakdown */}
            <div className="bg-zinc-800 border border-zinc-700 p-6 space-y-4">
              <h4 className="text-white font-bold uppercase tracking-wide">Monthly Breakdown</h4>
              
              <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                <span className="text-zinc-400">Mortgage Payment</span>
                <span className="text-white font-semibold">${results.monthlyMortgage.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                <span className="text-zinc-400">Property Tax</span>
                <span className="text-white font-semibold">${propertyTax}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                <span className="text-zinc-400">Insurance</span>
                <span className="text-white font-semibold">${insurance}</span>
              </div>
              {hoa > 0 && (
                <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                  <span className="text-zinc-400">HOA</span>
                  <span className="text-white font-semibold">${hoa}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                <span className="text-zinc-400">Total Expenses</span>
                <span className="text-white font-bold">${results.totalExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                <span className="text-zinc-400">Rental Income</span>
                <span className="text-primary font-bold">+${monthlyRent.toLocaleString()}</span>
              </div>
              <div className={`flex justify-between items-center py-3 ${results.cashFlow >= 0 ? "text-green-400" : "text-red-400"}`}>
                <span className="font-bold uppercase">Monthly Cash Flow</span>
                <span className="text-2xl font-bold">
                  {results.cashFlow >= 0 ? "+" : ""}{results.cashFlow.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-800 border border-zinc-700 p-4 text-center">
                <span className="text-zinc-400 text-sm block mb-1">Cap Rate</span>
                <span className="text-2xl font-bold text-primary">{results.capRate}%</span>
              </div>
              <div className="bg-zinc-800 border border-zinc-700 p-4 text-center">
                <span className="text-zinc-400 text-sm block mb-1">Loan Amount</span>
                <span className="text-2xl font-bold text-white">${(results.loanAmount / 1000).toFixed(0)}K</span>
              </div>
            </div>

            {/* CTA */}
            <Link href="/apply" className="btn-luxury w-full text-center block" data-testid="button-investor-apply">
              <TrendingUp className="w-5 h-5 inline mr-2" />
              Get Pre-Approved for DSCR Loan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
