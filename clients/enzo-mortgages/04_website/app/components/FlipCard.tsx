"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Home, BadgeDollarSign, Building2, Globe } from "lucide-react";

const iconMap = {
  Home,
  BadgeDollarSign,
  Building2,
  Globe,
};

interface FlipCardProps {
  title: string;
  description: string;
  href: string;
  iconName: keyof typeof iconMap;
  programs: { label: string; href: string }[];
  testId: string;
}

export default function FlipCard({ title, description, href, iconName, programs, testId }: FlipCardProps) {
  const Icon = iconMap[iconName];
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group perspective-1000 h-[340px] w-full cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
      tabIndex={0}
      role="button"
      aria-expanded={isFlipped}
      data-testid={testId}
    >
      <div 
        className={`relative w-full h-full transition-all duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180 scale-105" : ""
        }`}
        style={{ 
          boxShadow: isFlipped 
            ? "0 25px 50px rgba(0,0,0,0.5), 0 0 40px rgba(45,212,191,0.15)" 
            : "0 10px 30px rgba(0,0,0,0.4)"
        }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="h-full bg-white border-2 border-zinc-300 rounded-2xl p-8 flex flex-col transition-all duration-500 group-hover:border-primary group-hover:shadow-[0_0_40px_rgba(47,169,159,0.2)] shadow-lg">
            <div className="w-16 h-16 bg-primary/10 border border-primary/30 shadow-md flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-3 uppercase tracking-wide">
              {title}
            </h3>
            <p className="text-zinc-600 leading-relaxed flex-grow">{description}</p>
            <div className="mt-4 flex items-center text-primary font-medium">
              <span>Hover to see programs</span>
              <ArrowRight className="w-4 h-4 ml-2 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="h-full bg-zinc-900 border-2 border-primary rounded-2xl p-8 flex flex-col shadow-[0_0_50px_rgba(47,169,159,0.3)]">
            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide border-b border-zinc-700 pb-3">
              {title} Programs
            </h3>
            <div className="flex-grow space-y-1">
              {programs.map((program) => (
                <Link
                  key={`${program.href}-${program.label}`}
                  href={program.href}
                  className="flex items-center gap-2 text-zinc-200 hover:text-primary transition-all py-2 px-3 hover:bg-zinc-800 border border-transparent hover:border-zinc-600 hover:translate-x-1"
                  data-testid={`link-program-${program.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <ArrowRight className="w-4 h-4" />
                  {program.label}
                </Link>
              ))}
            </div>
            <Link
              href={href}
              className="btn-luxury mt-4 text-center"
              data-testid={`button-view-all-${title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              View All Options
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
