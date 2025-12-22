import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Home, RefreshCw, Globe } from "lucide-react";
import type { Metadata } from "next";
import houseImage from "@assets/stock_images/luxury_modern_house__32807dab.jpg";

export const metadata: Metadata = {
  title: "Mortgage Services | Enzo Mortgages",
  description: "Explore our comprehensive mortgage services including home buying, refinancing, and Non-QM loan programs. The Ferrari of Home Loans.",
};

const categories = [
  {
    title: "Buying a Home",
    href: "/services/buying",
    icon: Home,
    description: "Conventional, FHA, VA, Jumbo, and First-Time Buyer programs to help you purchase your dream home.",
    programs: ["Conventional", "FHA", "VA", "Jumbo", "First-Time Buyer"],
  },
  {
    title: "Refinance",
    href: "/services/refinance",
    icon: RefreshCw,
    description: "Lower your rate, change your term, or access your home's equity with our refinance options.",
    programs: ["Rate & Term", "Cash-Out", "Streamline"],
  },
  {
    title: "Non-QM Loans",
    href: "/services/non-qm",
    icon: Globe,
    description: "Flexible financing for self-employed, investors, and international buyers who need non-traditional solutions.",
    programs: ["DSCR", "Bank Statement", "P&L", "Foreign National", "Asset-Based"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-zinc-900 py-24">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={houseImage}
            alt="Luxury modern home"
            fill
            className="object-cover grayscale"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900/80" />
        <div className="relative w-full max-w-7xl mx-auto px-6">
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Our Services</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide">
            Mortgage Solutions For Every Goal
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Whether you're buying, refinancing, or need a specialized loan program, we have the expertise to guide you through.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category.href}
                className="group relative bg-gradient-to-br from-zinc-50 to-zinc-100 border border-zinc-200 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
                <div className="p-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <category.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4 uppercase tracking-wide">
                    {category.title}
                  </h2>
                  <p className="text-zinc-600 mb-6">{category.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-3">Programs</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.programs.map((program) => (
                        <span key={program} className="text-xs bg-zinc-200 text-zinc-700 px-2 py-1">
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link
                    href={category.href}
                    className="inline-flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300"
                    data-testid={`link-category-${category.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    Explore {category.title} <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-900 py-24">
        <div className="w-full max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wide">
            Not Sure Which Program Is Right For You?
          </h2>
          <p className="text-zinc-300 text-lg mb-10">
            Every situation is unique. Let's talk about your goals and find the perfect solution together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-4 text-lg font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-apply-services"
            >
              Start Application
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-zinc-600 text-white px-10 py-4 text-lg font-medium hover:bg-zinc-800 transition-colors"
              data-testid="button-contact-services"
            >
              Talk to Enzo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
