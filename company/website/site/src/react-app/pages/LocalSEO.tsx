import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import CalendarBooking from '../components/CalendarBooking';
import Guarantee from '../components/Guarantee';

export default function LocalSEO() {
  const serviceAreas = [
    "Irvine", "Newport Beach", "Costa Mesa", "Tustin", "Lake Forest",
    "Mission Viejo", "Laguna Niguel", "Aliso Viejo", "Laguna Hills", "Foothill Ranch",
    "Santa Ana", "Orange", "Anaheim", "Huntington Beach", "Fountain Valley"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero with subtle background - left aligned */}
      <section className="relative min-h-screen flex items-center border-b-4 border-black -mx-6 px-6 py-12 bg-gradient-to-br from-gray-50 via-teal-50/30 to-gray-50">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="border-t-4 border-black pt-6 mb-8">
              <span className="text-xs uppercase tracking-[0.3em] font-mono">
                Local Business Automation • Orange County, CA
              </span>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl leading-tight mb-8">
              Orange County<br />
              Business<br />
              Automation
            </h1>
            <p className="text-2xl leading-relaxed mb-8 max-w-3xl text-gray-700">
              Professional website design, marketing automation, and 24/7 phone answering for small businesses in Irvine, Newport Beach, Costa Mesa, and throughout Orange County, California.
            </p>
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 text-lg mb-8">
              <div className="flex items-center space-x-2">
                <MapPin className="text-teal-500" size={24} aria-hidden="true" />
                <span>Irvine, CA 92612</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-teal-500" size={24} aria-hidden="true" />
                <a href="tel:+17147884500" className="hover:text-teal-500 transition-colors">
                  (714) 788-4500
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/services">
                <MagneticButton className="group relative px-10 py-5 bg-black text-white font-bold text-base uppercase tracking-[0.2em] border-4 border-black cursor-pointer transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <span className="relative z-10 flex items-center space-x-3">
                    <span>See Pricing</span>
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
                  </span>
                </MagneticButton>
              </Link>
              <Link to="/contact">
                <MagneticButton className="group relative px-10 py-5 bg-white text-black font-bold text-base uppercase tracking-[0.2em] border-4 border-black cursor-pointer transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
                  <span className="relative z-10 flex items-center space-x-3">
                    <span>Claim Your Spot</span>
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
                  </span>
                </MagneticButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Spacing Buffer */}
      <div className="h-20"></div>

      {/* Image Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <img 
            src="https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/workspace-automation.png" 
            alt="Orange County business automation workspace showing marketing and website systems"
            className="w-full h-96 object-cover border-4 border-black"
          />
        </div>
      </section>

      {/* Spacing Buffer */}
      <div className="h-20"></div>

      {/* What We Do */}
      <section className="py-40 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-16"
          >
            <div className="border-t-4 border-black pt-8 mb-12">
              <h3 className="text-2xl uppercase tracking-[0.3em] font-mono mb-12">
                What We Do
              </h3>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
              Orange County businesses choose us for professional automation.
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl">
              We help small businesses automate marketing, sales, and customer service. From professional websites to 24/7 phone answering, we build the systems that let you focus on running your business instead of managing technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="border-4 border-black p-8 bg-white hover:bg-teal-500 transition-colors group">
              <h3 className="font-serif text-2xl mb-4 italic">Website Design & Development</h3>
              <p className="text-gray-700 group-hover:text-black leading-relaxed mb-4">
                Professional, SEO/AI search-optimized websites built for Orange County businesses. Mobile-responsive, fast-loading, designed to convert.
              </p>
              <p className="text-sm text-gray-600 group-hover:text-black">
                Serving: Irvine, Newport Beach, Costa Mesa, Tustin, Lake Forest, Mission Viejo, and all of Orange County
              </p>
            </div>

            <div className="border-4 border-black p-8 bg-black text-white hover:bg-yellow-400 hover:text-black transition-colors group">
              <h3 className="font-serif text-2xl mb-4 italic">Marketing Automation</h3>
              <p className="group-hover:text-black leading-relaxed mb-4">
                Automated email sequences, lead capture systems, CRM integration, and follow-up automation. Stop losing leads and start converting them.
              </p>
              <p className="text-sm group-hover:text-black">
                Perfect for contractors, service providers, consultants, and professional services in Orange County
              </p>
            </div>

            <div className="border-4 border-black p-8 bg-white hover:bg-teal-500 transition-colors group">
              <h3 className="font-serif text-2xl mb-4 italic">24/7 Phone Answering</h3>
              <p className="text-gray-700 group-hover:text-black leading-relaxed mb-4">
                Never miss a call. Professional phone answering, lead qualification, appointment booking. Works nights, weekends, and holidays.
              </p>
              <p className="text-sm text-gray-600 group-hover:text-black">
                Ideal for busy business owners who can't answer every call immediately
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-center"
          >
            <Link to="/services">
              <MagneticButton className="group relative px-12 py-6 bg-black text-white font-bold text-base uppercase tracking-[0.2em] border-4 border-black cursor-pointer transition-all duration-300 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <span className="relative z-10 flex items-center space-x-3">
                  <span>View All Services & Pricing</span>
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={24} />
                </span>
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Spacing Buffer */}
      <div className="h-20"></div>

      {/* Service Areas */}
      <section className="py-40 border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-12"
          >
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-6">
              Serving All of<br />Orange County
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl">
              Based in Irvine, we provide professional business automation services throughout Orange County, California.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {serviceAreas.map((city, index) => (
              <div
                key={index}
                className="border-2 border-black p-4 bg-white text-center hover:bg-teal-500 hover:text-white transition-colors"
              >
                <div className="font-semibold">{city}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-700 text-lg">
              Not in Orange County? We work with businesses throughout Southern California and nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Spacing Buffer */}
      <div className="h-20"></div>

      {/* Why Choose Us */}
      <section className="py-40 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-16"
          >
            <div className="border-t-4 border-black pt-8 mb-12">
              <h3 className="text-2xl uppercase tracking-[0.3em] font-mono mb-12">
                Why Choose Us
              </h3>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-6">
              Why Orange County businesses choose <span className="font-bold">branded</span> <span className="font-script text-teal-500 text-6xl md:text-8xl">+flow</span>
            </h2>
          </motion.div>

          <div className="space-y-8 mb-16">
            <div className="border-l-4 border-teal-500 pl-8 py-6">
              <h3 className="font-serif text-3xl mb-3 italic">Local Expertise, Personal Service</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Based in Irvine. Meet in person at our Colab Space office or connect remotely. We understand Orange County businesses because we're part of this community.
              </p>
            </div>

            <div className="border-l-4 border-yellow-400 pl-8 py-6">
              <h3 className="font-serif text-3xl mb-3 italic">No Jargon, No Confusion</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                We explain everything in plain English. No confusing tech terms. No marketing speak. Just clear communication about what we're building and how it helps your business.
              </p>
            </div>

            <div className="border-l-4 border-teal-500 pl-8 py-6">
              <h3 className="font-serif text-3xl mb-3 italic">Fast Turnaround</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Most projects launch in 2-4 weeks. Quick Start packages in just 1 week. We move fast without sacrificing quality.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-center"
          >
            <Link to="/contact">
              <MagneticButton className="group relative px-10 py-5 bg-black text-white font-bold text-base uppercase tracking-[0.2em] border-4 border-black cursor-pointer transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <span className="relative z-10 flex items-center space-x-3">
                  <span>Get Started</span>
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={24} />
                </span>
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Spacing Buffer */}
      <div className="h-20"></div>

      {/* Contact Info */}
      <section className="py-40 border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-12"
          >
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-6">
              Contact Us
            </h2>
            <p className="text-xl text-gray-700">
              Let's discuss how automation can help your Orange County business grow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mb-16">
            <div className="border-4 border-black p-8 bg-white">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-teal-500 mt-1 flex-shrink-0" size={24} aria-hidden="true" />
                  <div>
                    <div className="font-bold mb-1">Office Location</div>
                    <p className="text-gray-700">
                      18952 MacArthur Blvd, Suite 113<br />
                      Irvine, CA 92612
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Colab Space - Available for in-person meetings
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="text-teal-500 mt-1 flex-shrink-0" size={24} aria-hidden="true" />
                  <div>
                    <div className="font-bold mb-1">Business Hours</div>
                    <p className="text-gray-700">
                      Monday - Friday: 9am - 6pm PST<br />
                      Weekend: By appointment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-4 border-black p-8 bg-white">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="text-teal-500 mt-1 flex-shrink-0" size={24} aria-hidden="true" />
                  <div>
                    <div className="font-bold mb-1">Phone</div>
                    <a href="tel:+17147884500" className="text-gray-700 hover:text-teal-500 transition-colors text-lg">
                      (714) 788-4500
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      Call or text anytime
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="text-teal-500 mt-1 flex-shrink-0" size={24} aria-hidden="true" />
                  <div>
                    <div className="font-bold mb-1">Email</div>
                    <a href="mailto:jen@brandedandflow.com" className="text-gray-700 hover:text-teal-500 transition-colors text-lg">
                      jen@brandedandflow.com
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      Response within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/contact">
              <MagneticButton className="px-12 py-5 bg-black text-white font-bold text-lg uppercase tracking-wider border-2 border-black hover:bg-teal-500 hover:border-teal-500 transition-colors cursor-pointer inline-block">
                Claim Your Spot
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Spacing Buffer */}
      <div className="h-20"></div>

      {/* Guarantee */}
      <Guarantee />

      {/* Spacing Buffer */}
      <div className="h-20"></div>

      {/* Calendar Booking */}
      <CalendarBooking />
    </div>
  );
}
