import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { trackCalculatorUse, trackCTAClick } from '@/react-app/lib/analytics';

export default function ROICalculator() {
  const [formData, setFormData] = useState({
    avgLeadValue: '',
    monthlyLeads: '',
    conversionRate: '',
    missedCallsPerWeek: '',
    hoursPerWeek: '',
    hourlyRate: ''
  });

  const [results, setResults] = useState<{
    currentRevenue: number;
    lostRevenue: number;
    potentialRevenue: number;
    timeSavings: number;
    timeSavingsValue: number;
    totalROI: number;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculate = () => {
    const avgLeadValue = parseFloat(formData.avgLeadValue) || 0;
    const monthlyLeads = parseFloat(formData.monthlyLeads) || 0;
    const conversionRate = parseFloat(formData.conversionRate) || 0;
    const missedCallsPerWeek = parseFloat(formData.missedCallsPerWeek) || 0;
    const hoursPerWeek = parseFloat(formData.hoursPerWeek) || 0;
    const hourlyRate = parseFloat(formData.hourlyRate) || 0;

    // Current monthly revenue
    const currentRevenue = monthlyLeads * (conversionRate / 100) * avgLeadValue;

    // Lost revenue from missed calls (assume 30% would convert)
    const missedCallsPerMonth = missedCallsPerWeek * 4;
    const lostRevenue = missedCallsPerMonth * 0.30 * avgLeadValue;

    // Potential revenue with automation (capturing missed calls + 20% more leads)
    const potentialRevenue = currentRevenue + lostRevenue + (currentRevenue * 0.20);

    // Time savings (automation saves ~70% of manual work)
    const timeSavings = hoursPerWeek * 0.70;
    const timeSavingsValue = timeSavings * hourlyRate * 4; // Monthly value

    // Total ROI
    const totalROI = potentialRevenue - currentRevenue + timeSavingsValue;

    setResults({
      currentRevenue,
      lostRevenue,
      potentialRevenue,
      timeSavings,
      timeSavingsValue,
      totalROI
    });

    trackCalculatorUse('roi_calculator', { totalROI });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-yellow-400 p-6 border-b-4 border-black">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-black flex items-center justify-center">
            <Calculator className="text-teal-500" size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black">ROI Calculator</h2>
            <p className="text-sm font-semibold">
              See how much revenue you're losing to manual processes
            </p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Input Form */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold mb-2">
              Average Lead Value ($)
            </label>
            <input
              type="number"
              name="avgLeadValue"
              value={formData.avgLeadValue}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-teal-500"
              placeholder="2,500"
            />
            <p className="text-xs text-gray-600 mt-1">How much is each customer worth?</p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">
              Monthly Leads
            </label>
            <input
              type="number"
              name="monthlyLeads"
              value={formData.monthlyLeads}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-teal-500"
              placeholder="50"
            />
            <p className="text-xs text-gray-600 mt-1">How many leads do you get per month?</p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">
              Conversion Rate (%)
            </label>
            <input
              type="number"
              name="conversionRate"
              value={formData.conversionRate}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-teal-500"
              placeholder="20"
            />
            <p className="text-xs text-gray-600 mt-1">What % of leads become customers?</p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">
              Missed Calls Per Week
            </label>
            <input
              type="number"
              name="missedCallsPerWeek"
              value={formData.missedCallsPerWeek}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-teal-500"
              placeholder="15"
            />
            <p className="text-xs text-gray-600 mt-1">How many calls do you miss?</p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">
              Hours/Week on Manual Tasks
            </label>
            <input
              type="number"
              name="hoursPerWeek"
              value={formData.hoursPerWeek}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-teal-500"
              placeholder="20"
            />
            <p className="text-xs text-gray-600 mt-1">Follow-ups, emails, scheduling, etc.</p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">
              Your Hourly Rate ($)
            </label>
            <input
              type="number"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-teal-500"
              placeholder="75"
            />
            <p className="text-xs text-gray-600 mt-1">What's your time worth?</p>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculate}
          className="w-full px-8 py-4 bg-teal-500 text-black font-bold text-sm uppercase tracking-wider border-2 border-black hover:bg-black hover:text-teal-500 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
        >
          <TrendingUp size={20} />
          <span>Calculate My ROI</span>
        </button>

        {/* Results */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            {/* Main ROI Card */}
            <div className="bg-gradient-to-br from-teal-500 to-yellow-400 border-4 border-black p-8 mb-6">
              <div className="text-center">
                <p className="text-sm font-bold uppercase tracking-wider mb-2">
                  Your Monthly ROI with Automation:
                </p>
                <div className="text-6xl font-black mb-4">
                  {formatCurrency(results.totalROI)}
                </div>
                <p className="text-lg font-semibold">
                  That's {formatCurrency(results.totalROI * 12)} per year
                </p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white border-2 border-black p-6">
                <DollarSign className="text-red-500 mb-2" size={32} />
                <p className="text-sm font-bold text-gray-600 mb-1">Lost Revenue</p>
                <p className="text-2xl font-black text-red-500">
                  {formatCurrency(results.lostRevenue)}
                </p>
                <p className="text-xs text-gray-600 mt-2">From missed calls alone</p>
              </div>

              <div className="bg-white border-2 border-black p-6">
                <TrendingUp className="text-teal-500 mb-2" size={32} />
                <p className="text-sm font-bold text-gray-600 mb-1">Revenue Increase</p>
                <p className="text-2xl font-black text-teal-500">
                  {formatCurrency(results.potentialRevenue - results.currentRevenue)}
                </p>
                <p className="text-xs text-gray-600 mt-2">With automation</p>
              </div>

              <div className="bg-white border-2 border-black p-6">
                <Clock className="text-yellow-500 mb-2" size={32} />
                <p className="text-sm font-bold text-gray-600 mb-1">Time Saved</p>
                <p className="text-2xl font-black text-yellow-500">
                  {results.timeSavings.toFixed(1)} hrs/week
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Worth {formatCurrency(results.timeSavingsValue)}/mo
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-black text-white p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Ready to capture this revenue?
              </h3>
              <p className="text-gray-300 mb-6">
                Let's build the automation system that stops the revenue leak and frees up your time.
              </p>
              <a
                href="/contact"
                onClick={() => trackCTAClick('Get Started from ROI Calculator', 'ROI Calculator Results')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 text-black font-bold text-sm uppercase tracking-wider border-2 border-teal-500 hover:bg-yellow-400 hover:border-yellow-400 transition-colors"
              >
                <span>Get Started</span>
                <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
