import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, HelpCircle, FileText, Video, ArrowRight, ChevronDown, Download, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Mortgage Resources & Education | Enzo Mortgages",
  description: "Learn about mortgages with our glossary, FAQs, guides, and educational resources. Understand loan types, the buying process, and more.",
};

const glossaryTerms = [
  { term: "APR", definition: "Annual Percentage Rate - The yearly cost of a loan including interest and fees, expressed as a percentage." },
  { term: "Closing Costs", definition: "Fees and expenses paid when finalizing a mortgage, typically 2-5% of the loan amount." },
  { term: "DTI", definition: "Debt-to-Income ratio - Your monthly debt payments divided by gross monthly income. Most loans require under 43%." },
  { term: "Escrow", definition: "An account held by the lender to pay property taxes and insurance on your behalf." },
  { term: "LTV", definition: "Loan-to-Value ratio - The loan amount divided by the home's value. Lower LTV often means better rates." },
  { term: "PMI", definition: "Private Mortgage Insurance - Required when your down payment is less than 20%. Protects the lender." },
  { term: "Points", definition: "Fees paid to lower your interest rate. One point equals 1% of the loan amount." },
  { term: "Pre-Approval", definition: "A conditional commitment from a lender for a specific loan amount based on your financial review." },
  { term: "DSCR", definition: "Debt Service Coverage Ratio - For investment properties, the rental income divided by mortgage payment." },
  { term: "Underwriting", definition: "The process where the lender verifies your application and assesses lending risk." },
];

const faqs = [
  {
    question: "How much do I need for a down payment?",
    answer: "Down payment requirements vary by loan type. Conventional loans start at 3%, FHA at 3.5%, and VA loans offer 0% down for eligible veterans. We can help you find programs that may provide down payment assistance."
  },
  {
    question: "What credit score do I need to buy a home?",
    answer: "Credit requirements vary: FHA loans accept scores as low as 580 (sometimes 500 with 10% down), Conventional typically requires 620+, and VA has no official minimum. We work with clients across the credit spectrum."
  },
  {
    question: "How long does the mortgage process take?",
    answer: "A typical mortgage closes in 30-45 days, though we often close faster. The timeline depends on your responsiveness with documents, property appraisal, and underwriting complexity."
  },
  {
    question: "Should I get pre-approved before house hunting?",
    answer: "Absolutely. Pre-approval shows sellers you're a serious buyer and helps you understand your budget. In competitive markets, it's often required just to make an offer."
  },
  {
    question: "What's the difference between pre-qualification and pre-approval?",
    answer: "Pre-qualification is an estimate based on self-reported info. Pre-approval involves document verification and is a stronger commitment. Sellers prefer pre-approved buyers."
  },
  {
    question: "Can I buy a home if I'm self-employed?",
    answer: "Yes! We offer bank statement loans and other non-QM products designed for self-employed borrowers. You'll typically need 12-24 months of bank statements instead of tax returns."
  },
];

const guides = [
  { title: "First-Time Homebuyer Guide", description: "Everything you need to know about buying your first home", href: "/landing/buying" },
  { title: "Refinancing 101", description: "When it makes sense to refinance and how to do it", href: "/landing/refinance" },
  { title: "Investment Property Financing", description: "DSCR loans and other investor-friendly options", href: "/landing/investment" },
  { title: "VA Loan Benefits", description: "A complete guide for veterans and service members", href: "/services/buying/va" },
  { title: "FHA Loan Guide", description: "Low down payment options for qualified buyers", href: "/services/buying/fha" },
  { title: "Cash-Out Refinance Guide", description: "How to access your home equity", href: "/landing/cash-out" },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Learn & Understand</p>
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide"
            data-testid="text-resources-title"
          >
            Educational Resources
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            Mortgages shouldn't be confusing. Browse our glossary, FAQs, and guides to understand your options clearly.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="#glossary" className="bg-zinc-900 border border-zinc-800 p-6 text-center hover:border-primary/50 transition-colors" data-testid="link-nav-glossary">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
              <span className="text-white font-medium">Glossary</span>
            </a>
            <a href="#faqs" className="bg-zinc-900 border border-zinc-800 p-6 text-center hover:border-primary/50 transition-colors" data-testid="link-nav-faqs">
              <HelpCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <span className="text-white font-medium">FAQs</span>
            </a>
            <a href="#guides" className="bg-zinc-900 border border-zinc-800 p-6 text-center hover:border-primary/50 transition-colors" data-testid="link-nav-guides">
              <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
              <span className="text-white font-medium">Guides</span>
            </a>
            <Link href="/tools/calculator" className="bg-zinc-900 border border-zinc-800 p-6 text-center hover:border-primary/50 transition-colors" data-testid="link-nav-calculators">
              <Video className="w-8 h-8 text-primary mx-auto mb-3" />
              <span className="text-white font-medium">Calculators</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Glossary Section */}
      <section id="glossary" className="py-16 px-6 bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-wide">
            Mortgage Glossary
          </h2>
          <p className="text-zinc-400 mb-8">Key terms you'll encounter during the mortgage process.</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {glossaryTerms.map((item) => (
              <div key={item.term} className="bg-zinc-800/50 border border-zinc-700 p-6">
                <h3 className="text-lg font-bold text-primary mb-2">{item.term}</h3>
                <p className="text-zinc-300">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-16 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-wide">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 mb-8">Common questions from homebuyers and refinancers.</p>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-zinc-900 border border-zinc-800">
                <summary className="flex items-center justify-between cursor-pointer p-6 text-white font-medium hover:bg-zinc-800/50 transition-colors">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 text-primary group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-zinc-300 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section id="guides" className="py-16 px-6 bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-wide">
            In-Depth Guides
          </h2>
          <p className="text-zinc-400 mb-8">Comprehensive resources for every stage of your mortgage journey.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group bg-zinc-800/50 border border-zinc-700 p-6 hover:border-primary/50 transition-all hover-card-grow"
              >
                <FileText className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{guide.title}</h3>
                <p className="text-zinc-400 text-sm mb-4">{guide.description}</p>
                <span className="inline-flex items-center text-primary text-sm font-medium group-hover:translate-x-2 transition-transform">
                  Read Guide <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wide">
            Still Have Questions?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Our team is here to answer your questions and provide personalized guidance for your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-luxury"
              data-testid="button-resources-contact"
            >
              Talk to Enzo <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center border border-zinc-600 bg-transparent px-10 py-4 text-lg font-medium text-white transition-all hover:bg-zinc-800"
              data-testid="button-resources-apply"
            >
              Start Application
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
