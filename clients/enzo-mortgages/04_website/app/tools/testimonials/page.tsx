import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Star, Quote, ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials | Enzo Mortgages",
  description: "Read what our clients say about working with Enzo Mortgages. Real reviews from real homebuyers and refinancers in Orange County.",
};

const testimonials = [
  {
    name: "Michael & Sarah Chen",
    location: "Irvine, CA",
    type: "First-Time Home Buyer",
    rating: 5,
    quote: "Enzo made our first home purchase feel manageable. He explained everything in plain English and was available whenever we had questions. We closed in just 28 days!",
    image: "/images/testimonials/couple-1.png",
  },
  {
    name: "David Rodriguez",
    location: "Newport Beach, CA",
    type: "Jumbo Loan",
    rating: 5,
    quote: "After being declined by two other lenders for my jumbo loan, Enzo found a solution. His knowledge of non-traditional lending options saved our dream home purchase.",
    image: "/images/testimonials/professional-1.png",
  },
  {
    name: "Jennifer Martinez",
    location: "Santa Ana, CA",
    type: "Cash-Out Refinance",
    rating: 5,
    quote: "I needed to access my home equity quickly for my daughter's college. Enzo got me a great rate and we closed in 3 weeks. Couldn't be happier!",
    image: "/images/testimonials/woman-1.png",
  },
  {
    name: "Robert & Lisa Thompson",
    location: "Anaheim, CA",
    type: "VA Loan",
    rating: 5,
    quote: "As a veteran, I've used VA loans before but Enzo made it the smoothest experience yet. He truly understands the VA process inside and out.",
    image: "/images/testimonials/couple-2.png",
  },
  {
    name: "Kevin Park",
    location: "Irvine, CA",
    type: "DSCR Investment Loan",
    rating: 5,
    quote: "I've purchased 4 investment properties with Enzo. His DSCR loan expertise has helped me grow my portfolio faster than I thought possible.",
    image: "/images/testimonials/investor-1.png",
  },
  {
    name: "Amanda Wilson",
    location: "Costa Mesa, CA",
    type: "FHA Loan",
    rating: 5,
    quote: "My credit wasn't perfect but Enzo worked with me to find an FHA solution. Six months later, I'm a homeowner. Thank you, Enzo!",
    image: "/images/testimonials/woman-2.png",
  },
];

const stats = [
  { value: "500+", label: "Families Helped" },
  { value: "4.9", label: "Average Rating" },
  { value: "21", label: "Avg Days to Close" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase">Client Success Stories</p>
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide"
            data-testid="text-testimonials-title"
          >
            Reviews & Testimonials
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their experience with Enzo Mortgages.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-zinc-900 border border-zinc-800 p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-zinc-400 text-sm uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="group bg-zinc-900 border border-zinc-800 p-8 hover:border-primary/50 transition-all duration-500 hover-card-grow"
                data-testid={`testimonial-card-${index}`}
              >
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-zinc-300 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden relative">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-medium">{testimonial.name}</div>
                    <div className="text-zinc-500 text-sm">{testimonial.location}</div>
                    <div className="text-primary text-sm">{testimonial.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-6 bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-wide">
            Trusted & Verified
          </h2>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="flex items-center gap-2 text-zinc-400">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>NMLS Licensed</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>BBB Accredited</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>5-Star Google Reviews</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Zillow Premier Agent</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wide">
            Ready to Become Our Next Success Story?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied homeowners who trusted Enzo with their mortgage journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 px-10 py-4 text-lg font-medium text-primary-foreground transition-all"
              data-testid="button-testimonials-apply"
            >
              Start Your Application <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-zinc-600 bg-transparent px-10 py-4 text-lg font-medium text-white transition-all hover:bg-zinc-800"
              data-testid="button-testimonials-contact"
            >
              Talk to Enzo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
