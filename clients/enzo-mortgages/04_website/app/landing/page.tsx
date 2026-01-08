import Link from "next/link";
import type { Metadata } from "next";
import { 
  Home, 
  DollarSign, 
  TrendingUp, 
  Globe, 
  AlertCircle, 
  User, 
  ArrowRight,
  Shield
} from "lucide-react";

export const metadata: Metadata = {
  title: "Landing Pages | Enzo Mortgages",
  description: "Access all our specialized mortgage landing pages for different loan types and services.",
};

const landingPages = [
  {
    title: "VA Loan Landing",
    description: "Zero down payment options for veterans and active military",
    href: "/landing/va-loan",
    icon: Shield,
    category: "Buying",
  },
  {
    title: "First-Time Buyer",
    description: "Specialized guidance for first-time homebuyers",
    href: "/landing/first-time-buyer",
    icon: User,
    category: "Buying",
  },
  {
    title: "Home Buying",
    description: "Complete guide to purchasing your dream home",
    href: "/landing/buying",
    icon: Home,
    category: "Buying",
  },
  {
    title: "Refinance",
    description: "Lower your rate or change your loan terms",
    href: "/landing/refinance",
    icon: TrendingUp,
    category: "Refinance",
  },
  {
    title: "Cash-Out Refinance",
    description: "Access your home equity with cash-out refinancing",
    href: "/landing/cash-out",
    icon: DollarSign,
    category: "Refinance",
  },
  {
    title: "Investment Property",
    description: "Financing solutions for real estate investors",
    href: "/landing/investment",
    icon: TrendingUp,
    category: "Investment",
  },
  {
    title: "Foreign National",
    description: "Mortgage options for international buyers",
    href: "/landing/foreign-national",
    icon: Globe,
    category: "Non-QM",
  },
  {
    title: "Emergency Cash",
    description: "Fast access to cash when you need it most",
    href: "/landing/emergency-cash",
    icon: AlertCircle,
    category: "Non-QM",
  },
];

export default function LandingPagesIndex() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="py-24 px-6 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
            Landing Pages
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            Access all our specialized mortgage landing pages designed for different loan types and services.
          </p>
        </div>
      </section>

      {/* Landing Pages Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landingPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group bg-zinc-900 border border-zinc-800 p-6 rounded-lg hover:border-primary transition-all hover:scale-105"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/20 flex items-center justify-center rounded-lg group-hover:bg-primary/30 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-primary transition-colors">
                        {page.title}
                      </h3>
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-primary bg-primary/20 rounded uppercase tracking-wide">
                        {page.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-zinc-400 mb-4">{page.description}</p>
                  <div className="flex items-center text-primary font-semibold text-sm uppercase tracking-wide group-hover:gap-2 transition-all">
                    View Page
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-6 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">
            Need Something Else?
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/services" className="btn-luxury-outline">
              All Services
            </Link>
            <Link href="/tools" className="btn-luxury-outline">
              Tools & Calculators
            </Link>
            <Link href="/apply" className="btn-luxury">
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
