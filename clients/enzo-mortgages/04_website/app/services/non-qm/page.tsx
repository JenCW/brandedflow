import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, FileText, Building2, Wallet, CheckCircle, FileSpreadsheet } from "lucide-react";
import consultantImage from "@assets/stock_images/professional_mortgag_67d8837f.jpg";

export const metadata = {
  title: "Non-QM Loan Programs | Enzo Mortgages",
  description: "Explore our Non-QM loan programs including DSCR, Bank Statement, P&L, Foreign National, and Asset-Based loans. Flexible financing for unique situations.",
};

const programs = [
  {
    title: "DSCR Loans",
    href: "/services/non-qm/dscr",
    icon: Building2,
    description: "Debt Service Coverage Ratio loans for real estate investors. Qualify based on rental income, not personal income.",
  },
  {
    title: "Bank Statement Loans",
    href: "/services/non-qm/bank-statement",
    icon: FileText,
    description: "Perfect for self-employed borrowers. Use 12-24 months of bank statements instead of tax returns.",
  },
  {
    title: "P&L Statement Loans",
    href: "/services/non-qm/pnl",
    icon: FileSpreadsheet,
    description: "Qualify using a CPA-prepared profit and loss statement. Ideal for self-employed borrowers with strong businesses.",
  },
  {
    title: "Foreign National Loans",
    href: "/services/non-qm/foreign-national",
    icon: Globe,
    description: "Specialized financing for non-U.S. citizens looking to purchase or invest in American real estate.",
  },
  {
    title: "Asset-Based Loans",
    href: "/services/non-qm/asset-based",
    icon: Wallet,
    description: "Qualify based on your liquid assets rather than traditional income verification.",
  },
];

export default function NonQMPage() {
  return (
    <>
      {/* Hero Section - Full screen with dramatic image */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={consultantImage}
            alt="Mortgage consultant meeting with clients"
            fill
            className="object-cover grayscale opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase text-lg">Non-QM Loans</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 uppercase tracking-wide">
            <span className="gradient-text">Flexible</span> Financing<br />For Unique Situations
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mb-10 leading-relaxed">
            Don't fit the traditional lending box? Our Non-QM programs offer creative solutions for self-employed, investors, and international buyers.
          </p>
          <Link
            href="/apply"
            className="btn-luxury btn-shiny animate-glow-pulse"
            data-testid="button-apply-non-qm"
          >
            Explore Your Options <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Programs Section - Dark with glowing cards */}
      <section className="relative bg-zinc-950 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/context/IMG_6074.webp"
            alt=""
            fill
            className="object-cover grayscale opacity-15"
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6 uppercase tracking-wide">
            Non-QM Loan Programs
          </h2>
          <p className="text-zinc-400 text-lg text-center mb-16 max-w-2xl mx-auto">
            Non-Qualified Mortgage loans offer alternatives to traditional financing when standard programs don't fit your situation.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <Link
                key={program.href}
                href={program.href}
                className="group relative bg-zinc-900/80 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-primary transition-all duration-500 hover:shadow-[0_0_50px_rgba(47,169,159,0.2)] hover:-translate-y-2"
                data-testid={`link-program-${program.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-t-2xl" />
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 group-hover:shadow-[0_0_30px_rgba(47,169,159,0.3)] transition-all duration-500">
                    <program.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-between gap-4 uppercase tracking-wide">
                      {program.title}
                      <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0" />
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">{program.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Who Benefits Section - Dark with glowing icons */}
      <section className="relative bg-zinc-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/context/foreign-national-hero.png"
            alt=""
            fill
            className="object-cover grayscale opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-16 uppercase tracking-wide">
            Who Benefits From <span className="text-primary">Non-QM</span> Loans?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-zinc-800/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(47,169,159,0.15)]">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:shadow-[0_0_25px_rgba(47,169,159,0.3)] transition-all duration-500">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-white mb-3 text-lg">Self-Employed</h3>
              <p className="text-zinc-400">Business owners and freelancers with non-traditional income documentation</p>
            </div>
            <div className="bg-zinc-800/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(47,169,159,0.15)]">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:shadow-[0_0_25px_rgba(47,169,159,0.3)] transition-all duration-500">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-white mb-3 text-lg">Real Estate Investors</h3>
              <p className="text-zinc-400">Investors looking to finance multiple properties based on rental income</p>
            </div>
            <div className="bg-zinc-800/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(47,169,159,0.15)]">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:shadow-[0_0_25px_rgba(47,169,159,0.3)] transition-all duration-500">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-white mb-3 text-lg">Foreign Nationals</h3>
              <p className="text-zinc-400">Non-U.S. citizens purchasing property in the United States</p>
            </div>
            <div className="bg-zinc-800/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-primary/50 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(47,169,159,0.15)]">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:shadow-[0_0_25px_rgba(47,169,159,0.3)] transition-all duration-500">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-white mb-3 text-lg">High Net Worth</h3>
              <p className="text-zinc-400">Individuals with significant assets but non-traditional income streams</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-zinc-950 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/context/IMG_6104.webp"
            alt=""
            fill
            className="object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950" />
        </div>
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 uppercase tracking-wide">
            Let's Find The <span className="text-primary">Right</span> Solution
          </h2>
          <p className="text-zinc-300 text-xl mb-12">
            Every situation is unique. Schedule a consultation to discuss your specific needs and explore your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/apply"
              className="btn-luxury btn-shiny"
              data-testid="button-apply-non-qm-cta"
            >
              Start Application <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-zinc-600 text-white px-10 py-4 text-lg font-medium hover:border-primary hover:bg-primary/10 transition-all duration-300 rounded-lg"
              data-testid="button-contact-non-qm"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
