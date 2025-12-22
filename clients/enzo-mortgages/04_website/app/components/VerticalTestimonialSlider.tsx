"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  loanType: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael & Sarah Chen",
    location: "Irvine, CA",
    rating: 5,
    text: "Enzo made our first home purchase feel effortless. He explained every step clearly and found us a rate we didn't think was possible.",
    loanType: "First-Time Buyer",
  },
  {
    id: 2,
    name: "David Rodriguez",
    location: "Newport Beach, CA",
    rating: 5,
    text: "As a self-employed business owner, I was told by other lenders I wouldn't qualify. Enzo found a bank statement loan that worked perfectly.",
    loanType: "Bank Statement Loan",
  },
  {
    id: 3,
    name: "Jennifer Park",
    location: "Santa Ana, CA",
    rating: 5,
    text: "The refinance process was smooth from start to finish. We're saving $400/month on our mortgage now!",
    loanType: "Rate & Term Refinance",
  },
  {
    id: 4,
    name: "Robert & Lisa Thompson",
    location: "Anaheim, CA",
    rating: 5,
    text: "We were nervous about the jumbo loan process, but Enzo walked us through everything. His expertise is unmatched.",
    loanType: "Jumbo Loan",
  },
  {
    id: 5,
    name: "Marcus Williams",
    location: "Costa Mesa, CA",
    rating: 5,
    text: "As a veteran, I wanted to use my VA benefits. Enzo helped me understand all my options and closed in just 21 days.",
    loanType: "VA Loan",
  },
];

export default function VerticalTestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 400);
  }, [isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 400);
  }, [isTransitioning]);

  useEffect(() => {
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <section className="relative bg-zinc-100 py-16 overflow-hidden" data-testid="section-testimonials">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-primary font-semibold mb-2 tracking-widest uppercase text-sm">Client Success</p>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 uppercase tracking-wide">
            What Our Clients Say
          </h2>
        </div>

        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white border border-zinc-300 shadow-md flex items-center justify-center text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 transition-colors"
            aria-label="Previous testimonial"
            data-testid="button-testimonial-prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white border border-zinc-300 shadow-md flex items-center justify-center text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 transition-colors"
            aria-label="Next testimonial"
            data-testid="button-testimonial-next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Testimonial cards - show 3 at a time on desktop */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-400 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white border border-zinc-200 p-6 shadow-sm">
                    {/* Quote icon */}
                    <Quote className="w-8 h-8 text-primary/30 mb-4" />

                    {/* Stars */}
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>

                    {/* Text */}
                    <p 
                      className="text-zinc-700 leading-relaxed mb-4 text-sm"
                      data-testid="text-testimonial-content"
                    >
                      "{testimonial.text}"
                    </p>

                    {/* Client info */}
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                      <div>
                        <p className="font-semibold text-zinc-900 text-sm" data-testid="text-testimonial-name">
                          {testimonial.name}
                        </p>
                        <p className="text-zinc-500 text-xs">{testimonial.location}</p>
                      </div>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium">
                        {testimonial.loanType}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsTransitioning(false), 400);
                  }
                }}
                className={`w-2 h-2 transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-primary w-6" 
                    : "bg-zinc-300 hover:bg-zinc-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                data-testid={`button-testimonial-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
