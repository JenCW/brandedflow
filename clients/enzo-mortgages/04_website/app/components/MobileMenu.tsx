"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronUp, Home, BadgeDollarSign, Globe, Calculator, User, Phone, FileText } from "lucide-react";

const menuItems = [
  {
    label: "Buying",
    href: "/services/buying",
    icon: Home,
    programs: [
      { label: "Conventional", href: "/services/buying/conventional" },
      { label: "FHA Loans", href: "/services/buying/fha" },
      { label: "VA Loans", href: "/services/buying/va" },
      { label: "Jumbo Loans", href: "/services/buying/jumbo" },
    ],
  },
  {
    label: "Refinance",
    href: "/services/refinance",
    icon: BadgeDollarSign,
    programs: [
      { label: "Rate & Term", href: "/services/refinance/rate-term" },
      { label: "Cash-Out", href: "/services/refinance/cash-out" },
      { label: "Streamline", href: "/services/refinance/streamline" },
    ],
  },
  {
    label: "Non-QM",
    href: "/services/non-qm",
    icon: Globe,
    programs: [
      { label: "DSCR Loans", href: "/services/non-qm/dscr" },
      { label: "Bank Statement", href: "/services/non-qm/bank-statement" },
      { label: "Foreign National", href: "/services/non-qm/foreign-national" },
      { label: "Asset-Based", href: "/services/non-qm/asset-based" },
    ],
  },
  {
    label: "Loan Guides",
    href: "/landing",
    icon: FileText,
    programs: [
      { label: "Refinance", href: "/landing/refinance" },
      { label: "Buying", href: "/landing/buying" },
      { label: "Cash-Out", href: "/landing/cash-out" },
      { label: "Investment", href: "/landing/investment" },
      { label: "VA Loan", href: "/landing/va-loan" },
      { label: "First-Time Buyer", href: "/landing/first-time-buyer" },
      { label: "Foreign National", href: "/landing/foreign-national" },
      { label: "Emergency Cash", href: "/landing/emergency-cash" },
    ],
  },
  {
    label: "Tools",
    href: "/tools",
    icon: Calculator,
    programs: [
      { label: "Mortgage Calculator", href: "/tools/calculator" },
      { label: "Home Valuation", href: "/tools/home-valuation" },
    ],
  },
];

const quickLinks = [
  { label: "About Enzo", href: "/about", icon: User },
  { label: "Contact", href: "/contact", icon: Phone },
  { label: "Apply Now", href: "/apply", icon: FileText },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (label: string) => {
    setExpandedSection(expandedSection === label ? null : label);
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-white hover:text-primary transition-colors"
        aria-label="Open menu"
        data-testid="button-mobile-menu-open"
      >
        <Menu className="w-7 h-7" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-zinc-900 z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <span className="text-lg font-bold text-white uppercase tracking-wide">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close menu"
              data-testid="button-mobile-menu-close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <div key={item.label} className="border-b border-zinc-800/50">
                <button
                  onClick={() => toggleSection(item.label)}
                  className="w-full flex items-center justify-between px-4 py-4 text-zinc-200 hover:text-primary hover:bg-zinc-800/50 transition-colors"
                  data-testid={`button-mobile-${item.label.toLowerCase()}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {expandedSection === item.label ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                
                {expandedSection === item.label && (
                  <div className="bg-zinc-800/30 py-2">
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 pl-12 text-sm text-zinc-400 hover:text-primary transition-colors"
                    >
                      View All {item.label}
                    </Link>
                    {item.programs.map((program) => (
                      <Link
                        key={program.href}
                        href={program.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 pl-12 text-sm text-zinc-400 hover:text-primary transition-colors"
                        data-testid={`link-mobile-${program.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {program.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Quick Links */}
            <div className="pt-4 mt-4 border-t border-zinc-800">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-4 text-zinc-200 hover:text-primary hover:bg-zinc-800/50 transition-colors"
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <link.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer CTA */}
          <div className="p-4 border-t border-zinc-800">
            <Link
              href="/apply"
              onClick={() => setIsOpen(false)}
              className="btn-luxury w-full"
              data-testid="button-mobile-apply"
            >
              Start Your Application
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
