import Link from "next/link";
import { Phone, Clock } from "lucide-react";
import { SiInstagram, SiGoogle } from "react-icons/si";
import EnzoLogo from "./EnzoLogo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-zinc-900 text-zinc-300 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <EnzoLogo size="md" showTagline />
            <p className="mt-4 text-sm text-zinc-400">
              Trust is the luxury everyone deserves.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a 
                href="https://g.page/enzo-mortgages" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary transition-all hover:scale-110"
                aria-label="Google My Business"
                data-testid="link-social-google"
              >
                <SiGoogle className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/enzomortgages.mortgages" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary transition-all hover:scale-110"
                aria-label="Instagram"
                data-testid="link-social-instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
            </div>

            {/* 24/7 Availability Badge */}
            <div className="mt-6 p-3 bg-zinc-800 border border-zinc-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-primary text-xs font-semibold uppercase tracking-wider">Live Person 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+19495551234" className="text-white hover:text-primary transition-colors">(949) 555-1234</a>
              </div>
              <p className="text-zinc-500 text-xs mt-1">Always speak to a real person</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">Buying</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/buying" className="hover:text-primary transition-colors">All Buying Programs</Link></li>
              <li><Link href="/services/buying/conventional" className="hover:text-primary transition-colors">Conventional Loans</Link></li>
              <li><Link href="/services/buying/fha" className="hover:text-primary transition-colors">FHA Loans</Link></li>
              <li><Link href="/services/buying/va" className="hover:text-primary transition-colors">VA Loans</Link></li>
              <li><Link href="/services/buying/jumbo" className="hover:text-primary transition-colors">Jumbo Loans</Link></li>
              <li><Link href="/landing/first-time-buyer" className="hover:text-primary transition-colors">First-Time Buyers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">Refinance</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/refinance" className="hover:text-primary transition-colors">All Refinance Options</Link></li>
              <li><Link href="/services/refinance/rate-term" className="hover:text-primary transition-colors">Rate & Term</Link></li>
              <li><Link href="/landing/cash-out" className="hover:text-primary transition-colors">Cash-Out Refinance</Link></li>
              <li><Link href="/services/refinance/streamline" className="hover:text-primary transition-colors">Streamline Refinance</Link></li>
              <li><Link href="/landing/refinance" className="hover:text-primary transition-colors">Refinance Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">Non-QM</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/non-qm" className="hover:text-primary transition-colors">All Non-QM Loans</Link></li>
              <li><Link href="/services/non-qm/dscr" className="hover:text-primary transition-colors">DSCR Loans</Link></li>
              <li><Link href="/services/non-qm/bank-statement" className="hover:text-primary transition-colors">Bank Statement</Link></li>
              <li><Link href="/services/non-qm/pnl" className="hover:text-primary transition-colors">P&L Loans</Link></li>
              <li><Link href="/landing/foreign-national" className="hover:text-primary transition-colors">Foreign National</Link></li>
              <li><Link href="/services/non-qm/asset-based" className="hover:text-primary transition-colors">Asset-Based</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools" className="hover:text-primary transition-colors">All Tools</Link></li>
              <li><Link href="/tools/calculator" className="hover:text-primary transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/tools/home-valuation" className="hover:text-primary transition-colors">Home Valuation</Link></li>
              <li><Link href="/landing/emergency-cash" className="hover:text-primary transition-colors">Emergency Cash</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Enzo</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/apply" className="hover:text-primary transition-colors">Apply Now</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
          <p>Enzo — NMLS 1984772</p>
          <p>E Mortgage Capital, Inc. — NMLS 1416824</p>
          <p className="mt-2">Orange County, California</p>
          <p className="mt-4">&copy; {new Date().getFullYear()} Enzo Mortgages. All rights reserved.</p>
          <p className="mt-6 max-w-3xl mx-auto text-xs text-zinc-600 leading-relaxed">
            For information purposes only. This is not a commitment to lend or extend credit. 
            Information and/or dates are subject to change without notice. All loans are subject to 
            credit approval. E Mortgage Capital, Inc. d/b/a E Mortgage Capital. NMLS# 1416824. 
            Equal Housing Lender. NMLS consumer access: <a href="https://www.nmlsconsumeraccess.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">www.nmlsconsumeraccess.org</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
