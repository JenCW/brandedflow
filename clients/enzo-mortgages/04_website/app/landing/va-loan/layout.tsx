import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VA Loan Officer | Mortgage Specialist | Enzo Mortgages | Orange County CA",
  description: "Connect with a trusted VA loan officer at Enzo Mortgages. Zero down payment VA loans, competitive rates, fast approval. Get pre-approved in minutes. NMLS #1984772. Serving Orange County, California.",
  keywords: [
    "VA loan officer",
    "mortgage loan officer",
    "VA loan specialist",
    "mortgage specialist Orange County",
    "VA loans California",
    "zero down payment mortgage",
    "veteran home loans",
    "VA loan pre-approval",
    "mortgage rates Orange County",
    "Enzo Mortgages",
    "NMLS 1984772",
    "Irvine VA loans",
    "Newport Beach mortgage officer",
    "Santa Ana VA loans",
    "Anaheim mortgage specialist",
    "California VA loans",
    "VA loan application",
    "mortgage pre-approval",
  ],
  openGraph: {
    title: "VA Loan Officer | Mortgage Specialist | Enzo Mortgages",
    description: "Connect with a trusted VA loan officer. Zero down payment. Competitive rates. Fast approval. Get pre-approved in minutes.",
    type: "website",
    url: "https://enzomortgages.com/landing/va-loan",
  },
  twitter: {
    card: "summary_large_image",
    title: "VA Loan Officer | Enzo Mortgages",
    description: "Connect with a trusted VA loan officer. Zero down payment. Competitive rates. Fast approval.",
  },
  alternates: {
    canonical: "/landing/va-loan",
  },
};

export default function LoanOfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
