"use client";

import { Shield, Award, Clock, Users, Star, CheckCircle, TrendingUp, Heart } from "lucide-react";

const trustItems = [
  { icon: Shield, text: "NMLS Licensed" },
  { icon: Award, text: "500+ Five-Star Reviews" },
  { icon: Clock, text: "Close in 21 Days" },
  { icon: Users, text: "2,000+ Families Served" },
  { icon: Star, text: "Top 1% Loan Officer" },
  { icon: CheckCircle, text: "Bank Statement Specialist" },
  { icon: TrendingUp, text: "Best Rate Guarantee" },
  { icon: Heart, text: "Trusted Since 2015" },
];

export default function TrustMarquee() {
  const duplicatedItems = [...trustItems, ...trustItems];

  return (
    <div className="w-full bg-zinc-950 border-y border-zinc-800 py-5 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-content gap-12">
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 whitespace-nowrap"
            >
              <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-white font-medium tracking-wide uppercase text-sm">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
