import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, MapPin, Home, Users, Shield, DollarSign, CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Down Payment Assistance Programs | Enzo Mortgages",
  description: "Explore down payment assistance programs available in California. Find grants, loans, and programs to help you become a homeowner.",
};

const programs = [
  {
    name: "California Housing Finance Agency (CalHFA)",
    description: "Offers deferred-payment junior loans up to 3.5% of purchase price for down payment and closing costs.",
    eligibility: "First-time buyers, income limits apply",
    link: "https://www.calhfa.ca.gov/homeownership/programs/",
    type: "State Program",
  },
  {
    name: "MyHome Assistance Program",
    description: "Deferred-payment junior loan up to 3.5% (or 3% for FHA) of the purchase price or appraised value.",
    eligibility: "First-time homebuyers in California",
    link: "https://www.calhfa.ca.gov/homeownership/programs/myhome.htm",
    type: "State Program",
  },
  {
    name: "Orange County Housing Authority",
    description: "Down payment assistance for low-to-moderate income first-time homebuyers in Orange County.",
    eligibility: "Orange County residents, income limits apply",
    link: "https://www.ochousing.org/",
    type: "County Program",
  },
  {
    name: "City of Irvine First-Time Homebuyer",
    description: "Provides silent second mortgages for qualified first-time homebuyers purchasing in Irvine.",
    eligibility: "Irvine residents/workers, income limits",
    link: "https://www.cityofirvine.org/",
    type: "City Program",
  },
  {
    name: "FHA Loans (3.5% Down)",
    description: "Government-backed loans requiring only 3.5% down payment with flexible credit requirements.",
    eligibility: "Credit score 580+, primary residence",
    link: "/services/buying/fha",
    type: "Loan Program",
    internal: true,
  },
  {
    name: "VA Loans (0% Down)",
    description: "No down payment required for eligible veterans, active military, and surviving spouses.",
    eligibility: "Veterans, active duty, National Guard",
    link: "/services/buying/va",
    type: "Loan Program",
    internal: true,
  },
  {
    name: "Down Payment Resource",
    description: "National database of over 2,000 homebuyer assistance programs searchable by location.",
    eligibility: "Varies by program",
    link: "https://downpaymentresource.com/",
    type: "National Resource",
  },
];

const assistanceTypes = [
  {
    title: "Grants",
    description: "Free money that doesn't need to be repaid. Often for first-time buyers meeting income requirements.",
    icon: DollarSign,
  },
  {
    title: "Forgivable Loans",
    description: "Loans that are forgiven after living in the home for a certain period (often 5-10 years).",
    icon: Shield,
  },
  {
    title: "Deferred Loans",
    description: "No payments required until you sell, refinance, or pay off your primary mortgage.",
    icon: Home,
  },
  {
    title: "Matched Savings",
    description: "Programs that match your savings contributions toward a down payment.",
    icon: Users,
  },
];

export default function DownPaymentPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <section className="py-20 px-6 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Down Payment Help</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide" data-testid="text-downpayment-title">
            Down Payment Assistance
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
            You may qualify for thousands in free grants or low-interest loans to help with your down payment. Let's find out what's available for you.
          </p>
          <Link href="/apply" className="btn-luxury" data-testid="button-dpa-apply">
            Check My Eligibility <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Assistance Types */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center uppercase tracking-wide mb-12">Types of Assistance Available</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {assistanceTypes.map((type) => (
              <div key={type.title} className="bg-zinc-900 border border-zinc-800 p-6">
                <div className="w-12 h-12 bg-primary/20 flex items-center justify-center mb-4">
                  <type.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">{type.title}</h3>
                <p className="text-zinc-400 text-sm">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-20 px-6 bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center uppercase tracking-wide mb-4">California Programs</h2>
          <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
            These are some of the most popular programs available in California and Orange County. Enzo can help you navigate eligibility and application.
          </p>
          <div className="space-y-4">
            {programs.map((program) => (
              <div key={program.name} className="bg-zinc-800 border border-zinc-700 p-6 hover:border-primary/50 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{program.name}</h3>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 uppercase tracking-wide">{program.type}</span>
                    </div>
                    <p className="text-zinc-300 mb-2">{program.description}</p>
                    <p className="text-sm text-zinc-500 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      {program.eligibility}
                    </p>
                  </div>
                  {program.internal ? (
                    <Link href={program.link} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium whitespace-nowrap" data-testid={`link-program-${program.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <a href={program.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium whitespace-nowrap" data-testid={`link-program-${program.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      Visit Site <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center uppercase tracking-wide mb-12">How Enzo Helps</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase">Review Eligibility</h3>
              <p className="text-zinc-400">We assess your income, location, and buyer status to identify programs you qualify for.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase">Stack Programs</h3>
              <p className="text-zinc-400">Many programs can be combined. We help you maximize available assistance.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase">Handle Applications</h3>
              <p className="text-zinc-400">We guide you through applications and coordinate with program administrators.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide">
            See What You Qualify For
          </h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Many buyers leave money on the table. A quick conversation can reveal programs you didn't know existed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="btn-luxury" data-testid="button-dpa-start">
              Start Your Application
            </Link>
            <a href="tel:+19495551234" className="inline-flex items-center justify-center gap-2 border border-zinc-600 bg-transparent px-10 py-4 text-lg font-medium text-white transition-all hover:bg-zinc-800" data-testid="button-dpa-call">
              Call Enzo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
