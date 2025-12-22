import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Phone, Calendar, Shield, Users, Clock, Handshake, FileText, Home, CreditCard, Building, TreePine, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Your Trusted Mortgage Loan Officer | Enzo Mortgages",
  description: "Expert guidance through every step of your home financing journey. Meet Enzo, your personal mortgage loan officer.",
};

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "Meet with your loan officer to discuss your financial goals, review your credit, and determine how much home you can afford.",
  },
  {
    number: "02",
    title: "Pre-Approval",
    description: "Submit financial documents for review. Your loan officer will secure a pre-approval letter showing sellers you're a serious buyer.",
  },
  {
    number: "03",
    title: "Home Shopping",
    description: "Armed with pre-approval, you can confidently search for your dream home within your budget range.",
  },
  {
    number: "04",
    title: "Loan Application",
    description: "Once you've found your home, your loan officer submits a formal application with all required documentation.",
  },
  {
    number: "05",
    title: "Processing & Underwriting",
    description: "Your loan officer coordinates with underwriters, ordering appraisals and verifying all information.",
  },
  {
    number: "06",
    title: "Closing",
    description: "Sign final documents, receive your keys, and celebrate your new home!",
  },
];

const responsibilities = [
  {
    title: "Financial Assessment",
    description: "Analyzing your income, assets, debts, and credit history to determine loan eligibility and optimal loan amounts.",
    icon: CreditCard,
  },
  {
    title: "Loan Product Matching",
    description: "Explaining different mortgage types—conventional, FHA, VA, USDA—and recommending the best fit for your situation.",
    icon: FileText,
  },
  {
    title: "Rate Negotiation",
    description: "Working to secure competitive interest rates and favorable terms that align with your financial goals.",
    icon: Shield,
  },
  {
    title: "Coordination & Support",
    description: "Managing communication between you, real estate agents, underwriters, and closing teams throughout the process.",
    icon: Users,
  },
];

const loanTypes = [
  {
    title: "Conventional Loans",
    description: "Traditional mortgages not backed by government agencies. Typically require higher credit scores and down payments, but offer competitive rates and flexible terms.",
    icon: Home,
    href: "/services/buying/conventional",
  },
  {
    title: "FHA Loans",
    description: "Government-insured loans ideal for first-time buyers. Lower down payment requirements (as low as 3.5%) and more lenient credit standards.",
    icon: Building,
    href: "/services/buying/fha",
  },
  {
    title: "VA Loans",
    description: "Exclusive benefit for veterans and active military. No down payment required, no private mortgage insurance, and competitive interest rates.",
    icon: Shield,
    href: "/services/buying/va",
  },
  {
    title: "USDA Loans",
    description: "Zero down payment loans for rural and suburban homebuyers. Income limits apply, but offer excellent terms for eligible properties.",
    icon: TreePine,
    href: "/services/buying",
  },
];

const documents = [
  "Recent pay stubs (last 30 days)",
  "W-2 forms from the past 2 years",
  "Federal tax returns (2 years)",
  "Bank statements (2-3 months)",
  "Photo identification (driver's license or passport)",
  "Proof of additional income or assets",
  "Employment verification letters",
  "Credit report authorization",
];

const whyEnzo = [
  {
    title: "Industry Expertise",
    description: "Years of experience navigating complex mortgage scenarios and finding creative solutions for diverse financial situations.",
    icon: Shield,
  },
  {
    title: "Personalized Service",
    description: "Every client receives individualized attention and customized loan strategies tailored to their unique goals and circumstances.",
    icon: Users,
  },
  {
    title: "Quick Response Time",
    description: "Available to answer questions, provide updates, and address concerns throughout your entire mortgage journey.",
    icon: Clock,
  },
  {
    title: "Strong Relationships",
    description: "Established connections with underwriters, processors, and real estate professionals ensure smooth transactions from application to closing.",
    icon: Handshake,
  },
];

const faqs = [
  {
    question: "How long does the mortgage process take?",
    answer: "Typically 30-45 days from application to closing, though this can vary based on loan type, documentation completeness, and market conditions. Your loan officer will keep you informed every step of the way.",
  },
  {
    question: "What credit score do I need?",
    answer: "Requirements vary by loan type. Conventional loans typically require 620+, FHA loans may accept scores as low as 580, and VA loans are more flexible. Your loan officer can help improve your chances regardless of your current score.",
  },
  {
    question: "How much down payment is required?",
    answer: "Down payments range from 0% (VA/USDA loans) to 3.5% (FHA) to 5-20% (conventional). Your loan officer will help you understand your options and find programs that minimize upfront costs.",
  },
  {
    question: "Can I get pre-approved before house hunting?",
    answer: "Absolutely! Pre-approval is highly recommended. It shows sellers you're a serious buyer, helps you understand your budget, and can give you an edge in competitive markets.",
  },
];

export default function LoanOfficerPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <section className="relative py-20 px-6 border-b border-zinc-800">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/trust/consultation-meeting.png"
            alt="Loan officer consultation"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 to-zinc-950" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Your Trusted Mortgage Loan Officer</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide" data-testid="text-loan-officer-title">
            What is a Loan Officer
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
            Expert guidance through every step of your home financing journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 px-8 py-4 text-lg font-medium text-primary-foreground transition-all" data-testid="button-lo-preapproval">
              Get Pre-Approved
            </Link>
            <a href="tel:+19495551234" className="inline-flex items-center justify-center gap-2 border border-zinc-600 bg-transparent px-8 py-4 text-lg font-medium text-white transition-all hover:bg-zinc-800" data-testid="button-lo-consultation">
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>

      {/* What Does a Loan Officer Do */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center uppercase tracking-wide mb-8">What Does a Mortgage Loan Officer Do?</h2>
          <div className="text-zinc-300 space-y-4 text-lg leading-relaxed">
            <p>
              A mortgage loan officer serves as your personal guide through the complex world of home financing. They work directly with borrowers to understand their financial situation, goals, and needs, then match them with the best loan products available.
            </p>
            <p>
              Loan officers like Enzo evaluate your creditworthiness, explain different mortgage options, and help you navigate the application process from start to finish. They act as the bridge between you and the lender, ensuring smooth communication and helping you secure the best possible terms for your home loan.
            </p>
          </div>
        </div>
      </section>

      {/* The Mortgage Process */}
      <section className="py-20 px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center uppercase tracking-wide mb-12">The Mortgage Process: Step by Step</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="bg-zinc-800 border border-zinc-700 p-6">
                <span className="text-4xl font-bold text-primary">{step.number}</span>
                <h3 className="text-xl font-bold text-white mt-4 mb-2 uppercase tracking-wide">{step.title}</h3>
                <p className="text-zinc-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Responsibilities */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center uppercase tracking-wide mb-12">Core Responsibilities of Your Loan Officer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {responsibilities.map((item) => (
              <div key={item.title} className="bg-zinc-900 border border-zinc-800 p-6">
                <div className="w-12 h-12 bg-primary/20 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{item.title}</h3>
                <p className="text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mortgage Options */}
      <section className="py-20 px-6 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center uppercase tracking-wide mb-12">Understanding Your Mortgage Options</h2>
          <div className="space-y-4">
            {loanTypes.map((loan) => (
              <Link key={loan.title} href={loan.href} className="block bg-zinc-800 border border-zinc-700 p-6 hover:border-primary/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <loan.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{loan.title}</h3>
                    <p className="text-zinc-400">{loan.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center uppercase tracking-wide mb-4">The Documentation You'll Need</h2>
          <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
            Your loan officer will guide you through gathering the necessary documentation for your mortgage application. Being prepared with these documents can significantly speed up the approval process.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 p-8">
            <ul className="grid md:grid-cols-2 gap-3">
              {documents.map((doc) => (
                <li key={doc} className="flex items-center gap-3 text-zinc-300">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  {doc}
                </li>
              ))}
            </ul>
            <p className="text-zinc-500 mt-6 text-sm">
              Self-employed borrowers may need additional documentation including profit and loss statements and business tax returns.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Enzo */}
      <section className="py-20 px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center uppercase tracking-wide mb-12">Why Work With Enzo?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyEnzo.map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center uppercase tracking-wide mb-12">Common Questions Answered</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-zinc-900 border border-zinc-800 p-6">
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Path to Homeownership */}
      <section className="py-20 px-6 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase tracking-wide">
            Your Path to Homeownership Starts Here
          </h2>
          <h3 className="text-xl text-primary font-semibold mb-6">Ready to Take the Next Step?</h3>
          <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
            Whether you're a first-time homebuyer or looking to refinance, Enzo is here to guide you through every aspect of the mortgage process. With personalized service, expert knowledge, and a commitment to finding the best loan solution for your needs, you're in capable hands.
          </p>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            The journey to homeownership doesn't have to be overwhelming. With the right loan officer by your side, you'll have clarity, confidence, and support from application through closing day.
          </p>
          <blockquote className="text-lg italic text-zinc-300 border-l-4 border-primary pl-6 text-left max-w-xl mx-auto mb-12">
            "My goal is to make your home financing experience as smooth and stress-free as possible, while securing the best possible terms for your situation."
          </blockquote>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12 uppercase tracking-wide">
            Let's Get Started on Your Home Loan
          </h2>
          <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
            Contact Enzo today to begin your mortgage journey. Schedule a free consultation to discuss your goals, explore your options, and take the first step toward homeownership.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-zinc-900 border border-zinc-800 p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Free Consultation</h3>
              <p className="text-zinc-400 text-sm">No obligation discussion about your home financing goals and options</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Fast Pre-Approval</h3>
              <p className="text-zinc-400 text-sm">Get pre-approved quickly and start shopping with confidence</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Handshake className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Ongoing Support</h3>
              <p className="text-zinc-400 text-sm">Expert guidance from application through closing and beyond</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 px-10 py-4 text-lg font-medium text-primary-foreground transition-all" data-testid="button-lo-schedule">
              Schedule Your Consultation
            </Link>
            <a href="tel:+19495551234" className="inline-flex items-center justify-center gap-2 border border-zinc-600 bg-transparent px-10 py-4 text-lg font-medium text-white transition-all hover:bg-zinc-800" data-testid="button-lo-call">
              <Phone className="w-5 h-5" /> Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
