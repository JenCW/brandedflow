"use client";

import { useState, useEffect, useRef } from "react";
import ValuationForm from "./ValuationForm";

interface HiddenValuationFormProps {
  source: string; // Landing page source for tracking
}

export default function HiddenValuationForm({ source }: HiddenValuationFormProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show form when user scrolls to bottom 20% of page
    const handleScroll = () => {
      if (hasShown) return;
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight;

      // Show when user has scrolled 80% down the page
      if (scrollPercentage >= 0.8) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // Also show after 30 seconds on page (exit intent alternative)
    const timeTimer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, 30000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeTimer);
    };
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <section 
      ref={sectionRef}
      className="relative bg-zinc-900/50 py-16 border-t border-zinc-800"
      id="home-valuation"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 uppercase tracking-wide">
            Get Your Home's Value Instantly
          </h2>
          <p className="text-zinc-400 text-lg">
            See what your property is worth in today's market. Free, no obligation.
          </p>
        </div>
        <div className="bg-zinc-800/50 rounded-lg p-6 border border-zinc-700">
          <ValuationForm />
        </div>
      </div>
    </section>
  );
}
