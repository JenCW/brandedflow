import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Bell, TrendingDown, TrendingUp, Clock, Mail, ArrowRight } from "lucide-react";

const LiveRates = dynamic(() => import("@/app/components/LiveRates"), { 
  ssr: false,
  loading: () => <div className="h-48 flex items-center justify-center text-zinc-400">Loading rates...</div>
});

export const metadata: Metadata = {
  title: "Live Mortgage Rates & Alerts | Enzo Mortgages",
  description: "View today's live mortgage rates updated hourly. Sign up for rate alerts and get notified when rates drop to your target.",
};

export default function RatesPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Updated Hourly</p>
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide"
            data-testid="text-rates-title"
          >
            Live Mortgage Rates
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            Real-time rate comparisons powered by Federal Reserve data. Sign up for alerts when rates hit your target.
          </p>
        </div>
      </section>

      {/* Live Rates Display */}
      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <LiveRates />
        </div>
      </section>

      {/* Rate Comparison Table */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-wide text-center">
            Rate Comparison by Loan Type
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-800/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wide">Loan Type</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-zinc-300 uppercase tracking-wide">Best For</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-zinc-300 uppercase tracking-wide">Min Down</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-zinc-300 uppercase tracking-wide">Credit Score</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-300 uppercase tracking-wide">Learn More</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-5 text-white font-medium">Conventional</td>
                  <td className="px-6 py-5 text-zinc-400 text-center">Strong credit buyers</td>
                  <td className="px-6 py-5 text-zinc-400 text-center">3%</td>
                  <td className="px-6 py-5 text-zinc-400 text-center">620+</td>
                  <td className="px-6 py-5 text-right"><Link href="/services/buying/conventional" className="text-primary hover:underline">View</Link></td>
                </tr>
                <tr className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-5 text-white font-medium">FHA</td>
                  <td className="px-6 py-5 text-zinc-400 text-center">First-time buyers</td>
                  <td className="px-6 py-5 text-zinc-400 text-center">3.5%</td>
                  <td className="px-6 py-5 text-zinc-400 text-center">580+</td>
                  <td className="px-6 py-5 text-right"><Link href="/services/buying/fha" className="text-primary hover:underline">View</Link></td>
                </tr>
                <tr className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-5 text-white font-medium">VA</td>
                  <td className="px-6 py-5 text-zinc-400 text-center">Veterans & military</td>
                  <td className="px-6 py-5 text-zinc-400 text-center">0%</td>
                  <td className="px-6 py-5 text-zinc-400 text-center">No min</td>
                  <td className="px-6 py-5 text-right"><Link href="/services/buying/va" className="text-primary hover:underline">View</Link></td>
                </tr>
                <tr className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-5 text-white font-medium">Jumbo</td>
                  <td className="px-6 py-5 text-zinc-400 text-center">High-value homes</td>
                  <td className="px-6 py-5 text-zinc-400 text-center">10-20%</td>
                  <td className="px-6 py-5 text-zinc-400 text-center">700+</td>
                  <td className="px-6 py-5 text-right"><Link href="/services/buying/jumbo" className="text-primary hover:underline">View</Link></td>
                </tr>
                <tr className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-5 text-white font-medium">DSCR</td>
                  <td className="px-6 py-5 text-zinc-400 text-center">Investors</td>
                  <td className="px-6 py-5 text-zinc-400 text-center">20-25%</td>
                  <td className="px-6 py-5 text-zinc-400 text-center">660+</td>
                  <td className="px-6 py-5 text-right"><Link href="/services/non-qm/dscr" className="text-primary hover:underline">View</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Rate Alerts Signup */}
      <section className="py-20 px-6 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 mb-6">
              <Bell className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              Get Rate Alerts
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Set your target rate and we'll notify you when rates drop. Never miss an opportunity to lock in a better rate.
            </p>
          </div>
          
          <form className="max-w-xl mx-auto space-y-4" data-testid="form-rate-alerts">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-4 bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
                data-testid="input-rate-alert-email"
              />
              <select
                className="w-full px-4 py-4 bg-zinc-800 border border-zinc-700 text-white focus:border-primary focus:outline-none"
                data-testid="select-rate-alert-type"
              >
                <option value="">Loan type of interest</option>
                <option value="conventional">Conventional</option>
                <option value="fha">FHA</option>
                <option value="va">VA</option>
                <option value="jumbo">Jumbo</option>
                <option value="refinance">Refinance</option>
              </select>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Target rate (e.g., 6.5%)"
                className="w-full px-4 py-4 bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
                data-testid="input-rate-alert-target"
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 px-6 py-4 text-lg font-medium text-primary-foreground transition-all"
                data-testid="button-rate-alert-submit"
              >
                <Mail className="w-5 h-5 inline mr-2" />
                Notify Me
              </button>
            </div>
            <p className="text-zinc-500 text-sm text-center">
              We'll only email you when rates match your criteria. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide">
            Ready to Lock Your Rate?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Rates change daily. When you're ready to move forward, we can lock your rate and protect you from increases.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 px-10 py-4 text-lg font-medium text-primary-foreground transition-all btn-luxury"
            data-testid="button-rates-apply"
          >
            Start Your Application <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
