import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LocalBusinessSchema } from "./components/Schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "Enzo Mortgages | The Ferrari of Home Loans | Orange County CA",
    template: "%s | Enzo Mortgages",
  },
  description: "Enzo Mortgages (NMLS #1984772) - Your trusted mortgage loan officer in Orange County, California. Specializing in home loans, refinancing, FHA, VA, conventional mortgages. Get pre-approved today with personalized service and competitive rates.",
  keywords: [
    "mortgage loan officer Orange County",
    "home loans California",
    "refinance Orange County",
    "FHA loans Orange County",
    "VA loans California",
    "first time home buyer Orange County",
    "mortgage rates California",
    "Enzo Mortgages",
    "E Mortgage Capital",
    "NMLS 1984772",
    "Irvine mortgage",
    "Newport Beach mortgage",
    "Santa Ana home loans",
    "Anaheim mortgage lender",
  ],
  authors: [{ name: "Enzo Mortgages" }],
  creator: "Enzo Mortgages",
  publisher: "Enzo Mortgages",
  metadataBase: new URL("https://enzomortgages.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Enzo Mortgages | The Ferrari of Home Loans | Orange County CA",
    description: "Trust is the luxury everyone deserves. Premium mortgage solutions in Orange County with exceptional service and competitive rates. NMLS #1984772.",
    type: "website",
    locale: "en_US",
    url: "https://enzomortgages.com",
    siteName: "Enzo Mortgages",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enzo Mortgages | The Ferrari of Home Loans",
    description: "Trust is the luxury everyone deserves. Premium mortgage solutions in Orange County with exceptional service and competitive rates.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}>
        <LocalBusinessSchema />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
