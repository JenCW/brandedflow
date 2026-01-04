import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'home' },
    { path: '/services', label: 'services' },
    { path: '/case-studies', label: 'results' },
    { path: '/portfolio', label: 'work' },
    { path: '/orange-county', label: 'orange county' },
    { path: '/contact', label: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b-4 border-black ${
        isScrolled ? 'shadow-[0_4px_0px_0px_rgba(0,0,0,1)]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="border-2 border-black p-1 bg-white shadow-[3px_3px_0px_0px_rgba(250,204,21,1)] hover:shadow-[4px_4px_0px_0px_rgba(250,204,21,1)] transition-all duration-200">
              <img
                src="https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/BRanded-and-flow-icon.png"
                alt="branded +flow icon"
                className="h-10 w-10"
              />
            </div>
            <img
              src="https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/branded-flow-logo-cropped.png"
              alt="branded +flow logo"
              className="h-12"
              style={{ filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.3))' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 ml-8 justify-end">
            <div className="flex items-center space-x-0">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-3 py-2"
                >
                  <span className={`text-base font-semibold tracking-wide transition-colors duration-200 ${
                    location.pathname === link.path 
                      ? 'text-black' 
                      : 'text-black hover:text-teal-500'
                  }`}>
                    {link.label}
                  </span>
                  {location.pathname === link.path && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500" />
                  )}
                </Link>
              ))}
            </div>
            <Link to="/contact" className="ml-6">
              <button className="px-6 py-2 bg-black text-white font-bold text-sm uppercase tracking-wider border-2 border-teal-500 rounded-md transition-all duration-200 hover:bg-teal-500 hover:text-black hover:scale-105 shadow-[3px_3px_0px_0px_rgba(250,204,21,1)]">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-black"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t-2 border-black animate-fadeIn">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-lg font-semibold transition-colors duration-200 ${
                  location.pathname === link.path ? 'text-black' : 'text-black hover:text-teal-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full px-6 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider border-2 border-teal-500 rounded-md transition-all duration-200 hover:bg-teal-500 hover:text-black">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
