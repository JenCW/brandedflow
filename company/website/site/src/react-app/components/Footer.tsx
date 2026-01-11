import { Link } from 'react-router';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          <div className="md:col-span-5">
            <div className="font-mono text-lg tracking-tight mb-6">
              <span className="text-white font-bold text-xs">branded</span>
              <span className="text-teal font-bold">+FLOW</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-md mb-6">
              Professional business automation for Orange County small businesses. Websites, 24/7 AI phone receptionist, marketing automation, and CRM integration. Based in Irvine, CA.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a 
                href="https://calendly.com/brandedandflow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-teal-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-teal-400 transition-colors"
              >
                Book Free Call
              </a>
              <Link 
                to="/contact"
                className="px-4 py-2 border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://www.instagram.com/brandedandflow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/50 hover:text-teal-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/brandedandflow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/50 hover:text-teal-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.facebook.com/brandedandflow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/50 hover:text-teal-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-white/90 font-semibold text-sm uppercase tracking-wider mb-4">Navigate</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-white/50 hover:text-teal text-sm transition-colors">Services & Pricing</Link></li>
              <li><Link to="/case-studies" className="text-white/50 hover:text-teal text-sm transition-colors">Case Studies</Link></li>
              <li><Link to="/portfolio" className="text-white/50 hover:text-teal text-sm transition-colors">Portfolio</Link></li>
              <li><Link to="/orange-county" className="text-white/50 hover:text-teal text-sm transition-colors">Orange County Services</Link></li>
              <li><Link to="/faq" className="text-white/50 hover:text-teal text-sm transition-colors">FAQ</Link></li>
              <li><Link to="/about" className="text-white/50 hover:text-teal text-sm transition-colors">About</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-white/90 font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-white/50">
              <li>18952 MacArthur Blvd, Suite 113<br />Irvine, CA 92612</li>
              <li><a href="mailto:jen@brandedandflow.com" className="hover:text-teal transition-colors">jen@brandedandflow.com</a></li>
              <li><a href="tel:+17147884500" className="hover:text-teal transition-colors">(714) 788-4500</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4">
            <p className="text-white/30 text-xs">
              &copy; {currentYear} <span className="text-xs">branded</span>+FLOW. All rights reserved.
            </p>
            <p className="text-white/30 text-xs font-mono">
              Serving Irvine, Newport Beach, Costa Mesa & All of Orange County, California
            </p>
          </div>
          <p className="text-white/20 text-xs text-center">
            Professional website design, 24/7 AI phone receptionist, marketing automation, CRM integration, email automation, lead capture systems, and business automation solutions for small businesses in Orange County and throughout Southern California.
          </p>
        </div>
      </div>
    </footer>
  );
}
