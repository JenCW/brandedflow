import { Link } from "wouter";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/landing/foreign-national", label: "Foreign National" },
  { href: "/landing/first-time-buyer", label: "First-Time Buyer" },
  { href: "/landing/cash-out", label: "Cash-Out" },
  { href: "/tools/home-valuation", label: "Home Valuation" },
  { href: "/apply", label: "Apply" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-semibold" data-testid="link-logo">
            Samer Mortgage
          </Link>
          <nav className="flex flex-wrap items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground"
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
