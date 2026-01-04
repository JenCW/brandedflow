import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Testimonial {
  name: string;
  company: string;
  role: string;
  content: string;
  result: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Alex Rodriguez",
    company: "AQ Remodeling Inc",
    role: "Owner",
    content: "We went from getting maybe 2-3 inquiries a month to 15-20. The automated follow-up system means I never miss a potential client.",
    result: "500% increase in qualified leads",
    rating: 5,
  },
  {
    name: "David Chen",
    company: "Enzo Mortgages Inc",
    role: "Mortgage Broker",
    content: "The AI receptionist has been a game changer. It handles initial questions, qualifies leads, and books consultations automatically.",
    result: "40% higher close rate",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    company: "Proper Places Organizing",
    role: "Professional Organizer",
    content: "Before branded +flow, I was drowning in admin work. Now the booking system, client onboarding, and follow-ups run themselves.",
    result: "10 hours saved per week",
    rating: 5,
  },
  {
    name: "Michael Stevens",
    company: "Simple Tech Solutions",
    role: "IT Services Director",
    content: "The website actually converts visitors into calls. Clear messaging, easy contact options, and the 24/7 AI phone system means we never lose a potential client.",
    result: "Zero missed opportunities",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 border-y-4 border-black bg-gradient-to-br from-teal-50 via-white to-yellow-50">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="fill-yellow-400 text-yellow-400" size={20} />
            ))}
          </div>
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Real results from real businesses</h2>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="border-4 border-black p-8 md:p-12 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <Quote className="text-teal-500 mb-4" size={32} />
              
              <p className="text-gray-900 text-xl md:text-2xl leading-relaxed mb-8 font-serif italic">
                "{testimonials[currentIndex].content}"
              </p>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="font-bold text-black text-lg">{testimonials[currentIndex].name}</div>
                  <div className="text-gray-600 text-sm">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</div>
                </div>
                
                <div className="border-l-4 border-teal-500 pl-4">
                  <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Result</div>
                  <div className="text-lg font-bold text-teal-500">{testimonials[currentIndex].result}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={prev}
              className="p-3 bg-black text-white border-2 border-black hover:bg-teal-500 hover:text-black transition-all duration-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 border-2 border-black transition-all duration-300 ${
                    index === currentIndex ? 'bg-teal-500' : 'bg-white'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 bg-black text-white border-2 border-black hover:bg-teal-500 hover:text-black transition-all duration-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
