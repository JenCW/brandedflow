import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Home, Shield, Users, Building, DollarSign, CheckCircle } from "lucide-react";
import familyImage from "@assets/stock_images/happy_family_outside_d8aa7db6.jpg";

export const metadata = {
  title: "Home Buying Programs | Enzo Mortgages",
  description: "Explore our comprehensive home buying programs including Conventional, FHA, VA, Jumbo, and First-Time Buyer loans. Trust is the luxury everyone deserves.",
};

const programs = [
  {
    title: "Conventional Loans",
    href: "/services/buying/conventional",
    icon: Home,
    description: "Traditional financing with competitive rates for qualified buyers. Down payments as low as 3%.",
  },
  {
    title: "FHA Loans",
    href: "/services/buying/fha",
    icon: Shield,
    description: "Government-backed loans with flexible credit requirements and down payments as low as 3.5%.",
  },
  {
    title: "VA Loans",
    href: "/services/buying/va",
    icon: Users,
    description: "Exclusive benefits for veterans and active military including zero down payment options.",
  },
  {
    title: "Jumbo Loans",
    href: "/services/buying/jumbo",
    icon: Building,
    description: "Financing for luxury properties that exceed conforming loan limits in your area.",
  },
  {
    title: "First-Time Buyers",
    href: "/services/buying/first-time",
    icon: DollarSign,
    description: "Special programs and guidance designed specifically for first-time homebuyers.",
  },
];

export default function BuyingPage() {
  return (
    <>
      {/* Hero Section - Full screen with dramatic image */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={familyImage}
            alt="Happy family outside their new home"
            fill
            className="object-cover grayscale opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase text-lg animate-fade-in">Home Buying</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 uppercase tracking-wide">
            Find Your <span className="gradient-text">Perfect</span> Home Loan
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mb-10 leading-relaxed">
            Whether you're buying your first home or upgrading to your dream property, we have the right loan program for you.
          </p>
          <Link
            href="/apply"
            className="btn-luxury btn-shiny animate-glow-pulse"
            data-testid="button-apply-buying"
          >
            Start Your Application <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Programs Section - Dark with glowing cards */}
      <section className="relative bg-zinc-950 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/context/IMG_6080.webp"
            alt=""
            fill
            className="object-cover grayscale opacity-20"
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6 uppercase tracking-wide">
            Home Buying Programs
          </h2>
          <p className="text-zinc-400 text-lg text-center mb-16 max-w-2xl mx-auto">
            Choose the loan program that fits your unique situation
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Link
                key={program.href}
                href={program.href}
                className="group relative bg-zinc-900/80 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-primary transition-all duration-500 hover:shadow-[0_0_50px_rgba(47,169,159,0.2)] hover:-translate-y-2"
                data-testid={`link-program-${program.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-t-2xl" />
                <div className="flex-shrink-0 w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:shadow-[0_0_30px_rgba(47,169,159,0.3)] transition-all duration-500">
                  <program.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-between gap-4 uppercase tracking-wide">
                  {program.title}
                  <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0" />
                </h3>
                <p className="text-zinc-400 leading-relaxed">{program.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section - with glowing icons */}
      <section className="relative bg-zinc-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/context/IMG_6097.webp"
            alt=""
            fill
            className="object-cover grayscale opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
        </div>
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-16 uppercase tracking-wide">
            Why Buy With <span className="text-primary">Enzo</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-10 mb-16">
            <div className="text-center group">
              <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 group-hover:shadow-[0_0_40px_rgba(47,169,159,0.4)] transition-all duration-500">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">Competitive Rates</h3>
              <p className="text-zinc-400 text-lg">Access to the best rates from multiple lenders</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 group-hover:shadow-[0_0_40px_rgba(47,169,159,0.4)] transition-all duration-500">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">Fast Closings</h3>
              <p className="text-zinc-400 text-lg">Streamlined process for faster approvals</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 group-hover:shadow-[0_0_40px_rgba(47,169,159,0.4)] transition-all duration-500">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">Personal Service</h3>
              <p className="text-zinc-400 text-lg">One-on-one guidance from start to finish</p>
            </div>
          </div>
          <Link
            href="/apply"
            className="btn-luxury btn-shiny"
            data-testid="button-get-started-buying"
          >
            Get Started Today <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
