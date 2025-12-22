import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, TrendingUp, Calendar, Star, BookOpen, FileText, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Mortgage Tools & Resources | Enzo Mortgages",
  description: "Free mortgage calculators, live rates, booking, testimonials, and educational resources to help you navigate your home purchase or refinance.",
};

const tools = [
  {
    title: "Mortgage Calculators",
    description: "Payment, affordability, and refinance calculators to instantly understand your financial picture and make confident decisions.",
    href: "/tools/calculator",
    icon: Calculator,
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "Book A Consultation",
    description: "Schedule a phone call, video chat, or in-person meeting. Easy online booking with no back-and-forth.",
    href: "/tools/book",
    icon: Calendar,
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    title: "Live Rates & Alerts",
    description: "Real-time rate comparisons updated hourly from Federal Reserve data. Sign up for alerts when rates hit your target.",
    href: "/tools/rates",
    icon: TrendingUp,
    color: "from-green-500/20 to-green-500/5",
  },
  {
    title: "Client Testimonials",
    description: "Read real reviews from homebuyers and refinancers. See why clients trust Enzo with their mortgage journey.",
    href: "/tools/testimonials",
    icon: Star,
    color: "from-yellow-500/20 to-yellow-500/5",
  },
  {
    title: "Educational Resources",
    description: "Glossary of terms, FAQs, and in-depth guides. Understand mortgages without the confusion.",
    href: "/tools/resources",
    icon: BookOpen,
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    title: "Loan Programs",
    description: "Dedicated pages for every loan type: Conventional, FHA, VA, Jumbo, DSCR, and more. Find the right fit for your needs.",
    href: "/services",
    icon: FileText,
    color: "from-orange-500/20 to-orange-500/5",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Free Resources</p>
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide"
            data-testid="text-tools-title"
          >
            Mortgage Tools
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            Everything you need to understand your options, run the numbers, and connect with us — all in one place.
          </p>
        </div>
      </section>

      {/* 6 Tools Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative bg-zinc-900 border border-zinc-800 p-8 hover:border-primary/50 transition-all duration-500 hover-card-grow overflow-hidden"
                data-testid={`link-tool-${tool.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative">
                  <div className="w-16 h-16 bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors duration-300">
                    <tool.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">
                    {tool.title}
                  </h3>
                  
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    {tool.description}
                  </p>
                  
                  <span className="inline-flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Explore <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Bar */}
      <section className="py-12 px-6 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold text-zinc-400 uppercase tracking-wide mb-6 text-center">
            Quick Access
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tools/calculator" className="px-6 py-3 bg-zinc-800 border border-zinc-700 text-white hover:border-primary/50 transition-colors" data-testid="link-quick-payment-calculator">
              Payment Calculator
            </Link>
            <Link href="/tools/calculator" className="px-6 py-3 bg-zinc-800 border border-zinc-700 text-white hover:border-primary/50 transition-colors" data-testid="link-quick-affordability">
              Affordability Tool
            </Link>
            <Link href="/tools/down-payment" className="px-6 py-3 bg-zinc-800 border border-zinc-700 text-white hover:border-primary/50 transition-colors" data-testid="link-quick-down-payment">
              Down Payment Help
            </Link>
            <Link href="/landing/investment#calculator" className="px-6 py-3 bg-zinc-800 border border-zinc-700 text-white hover:border-primary/50 transition-colors" data-testid="link-quick-dscr">
              DSCR Calculator
            </Link>
            <Link href="/tools/home-valuation" className="px-6 py-3 bg-zinc-800 border border-zinc-700 text-white hover:border-primary/50 transition-colors" data-testid="link-quick-home-valuation">
              Home Valuation
            </Link>
          </div>
        </div>
      </section>

      {/* Why These Tools Matter */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wide">
            Your 24/7 First Impression
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            Don't work to understand who we are or how we can help. These tools let you explore your options, run numbers, and learn at your own pace — no pressure, no phone calls until you're ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 px-10 py-4 text-lg font-medium text-primary-foreground transition-all btn-luxury"
              data-testid="button-tools-apply"
            >
              Start Your Application
            </Link>
            <Link
              href="/tools/book"
              className="inline-flex items-center justify-center border border-zinc-600 bg-transparent px-10 py-4 text-lg font-medium text-white transition-all hover:bg-zinc-800 btn-luxury-outline"
              data-testid="button-tools-book"
            >
              Book A Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
