import Link from "next/link";
import EnzoLogo from "./EnzoLogo";
import MobileMenu from "./MobileMenu";
import { ChevronDown, Calculator } from "lucide-react";

const serviceCategories = [
  {
    label: "Buying",
    href: "/services/buying",
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
    programs: [
      { label: "Rate & Term", href: "/services/refinance/rate-term" },
      { label: "Cash-Out", href: "/services/refinance/cash-out" },
      { label: "Streamline", href: "/services/refinance/streamline" },
    ],
  },
  {
    label: "Non-QM",
    href: "/services/non-qm",
    programs: [
      { label: "DSCR Loans", href: "/services/non-qm/dscr" },
      { label: "Bank Statement", href: "/services/non-qm/bank-statement" },
      { label: "Foreign National", href: "/services/non-qm/foreign-national" },
      { label: "Asset-Based", href: "/services/non-qm/asset-based" },
    ],
  },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-6">
          <EnzoLogo size="md" />
          
          <nav className="hidden lg:flex items-center gap-1">
            {serviceCategories.map((category) => (
              <div key={category.href} className="relative group">
                <Link
                  href={category.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium uppercase tracking-wide text-zinc-300 hover:text-primary transition-colors"
                  data-testid={`link-nav-${category.label.toLowerCase()}`}
                >
                  {category.label}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </Link>
                
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-zinc-900 border border-zinc-700 shadow-xl p-4 min-w-[200px]">
                    {category.programs.map((program) => (
                      <Link
                        key={program.href}
                        href={program.href}
                        className="block px-3 py-2 text-sm text-zinc-400 hover:text-primary hover:bg-zinc-800 transition-colors"
                        data-testid={`link-nav-${program.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {program.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="relative group">
              <Link
                href="/landing"
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium uppercase tracking-wide text-zinc-300 hover:text-primary transition-colors"
                data-testid="link-nav-landing"
              >
                Loan Guides
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Link>
              
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-zinc-900 border border-zinc-700 shadow-xl p-4 min-w-[220px]">
                  <Link
                    href="/landing/refinance"
                    className="block px-3 py-2 text-sm text-zinc-400 hover:text-primary hover:bg-zinc-800 transition-colors"
                    data-testid="link-nav-refinance-landing"
                  >
                    Refinance
                  </Link>
                  <Link
                    href="/landing/buying"
                    className="block px-3 py-2 text-sm text-zinc-400 hover:text-primary hover:bg-zinc-800 transition-colors"
                    data-testid="link-nav-buying-landing"
                  >
                    Buying
                  </Link>
                  <Link
                    href="/landing/cash-out"
                    className="block px-3 py-2 text-sm text-zinc-400 hover:text-primary hover:bg-zinc-800 transition-colors"
                    data-testid="link-nav-cash-out-landing"
                  >
                    Cash-Out
                  </Link>
                  <Link
                    href="/landing/investment"
                    className="block px-3 py-2 text-sm text-zinc-400 hover:text-primary hover:bg-zinc-800 transition-colors"
                    data-testid="link-nav-investment-landing"
                  >
                    Investment
                  </Link>
                  <Link
                    href="/landing/va-loan"
                    className="block px-3 py-2 text-sm text-zinc-400 hover:text-primary hover:bg-zinc-800 transition-colors"
                    data-testid="link-nav-va-loan-landing"
                  >
                    VA Loan
                  </Link>
                  <Link
                    href="/landing/first-time-buyer"
                    className="block px-3 py-2 text-sm text-zinc-400 hover:text-primary hover:bg-zinc-800 transition-colors"
                    data-testid="link-nav-first-time-landing"
                  >
                    First-Time Buyer
                  </Link>
                  <Link
                    href="/landing/foreign-national"
                    className="block px-3 py-2 text-sm text-zinc-400 hover:text-primary hover:bg-zinc-800 transition-colors"
                    data-testid="link-nav-foreign-national-landing"
                  >
                    Foreign National
                  </Link>
                  <Link
                    href="/landing/emergency-cash"
                    className="block px-3 py-2 text-sm text-zinc-400 hover:text-primary hover:bg-zinc-800 transition-colors"
                    data-testid="link-nav-emergency-cash-landing"
                  >
                    Emergency Cash
                  </Link>
                </div>
              </div>
            </div>
            
            <Link
              href="/tools"
              className="px-4 py-2 text-sm font-medium uppercase tracking-wide text-zinc-300 hover:text-primary transition-colors"
              data-testid="link-nav-tools"
            >
              Tools
            </Link>
            
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium uppercase tracking-wide text-zinc-300 hover:text-primary transition-colors"
              data-testid="link-nav-about"
            >
              About
            </Link>
            
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-medium uppercase tracking-wide text-zinc-300 hover:text-primary transition-colors"
              data-testid="link-nav-contact"
            >
              Contact
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link
              href="/tools/calculator"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-primary transition-all"
              data-testid="link-nav-calculator"
            >
              <Calculator className="w-4 h-4" />
              Calculator
            </Link>
            <Link
              href="/apply"
              className="hidden sm:inline-flex items-center justify-center bg-primary text-white px-6 py-2.5 text-sm font-semibold uppercase tracking-wide border-2 border-primary shadow-md hover:bg-transparent hover:text-primary transition-all duration-300"
              data-testid="button-apply-nav"
            >
              Apply Now
            </Link>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
