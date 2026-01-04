import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            company: '',
            message: '',
          });
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with subtle background */}
        <section className="mb-20 -mx-6 px-6 py-12 bg-gradient-to-br from-gray-50 via-teal-50/30 to-gray-50">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-7xl mx-auto"
          >
            <div className="border-t-4 border-black pt-6 mb-8">
              <span className="text-xs uppercase tracking-[0.3em] font-mono">
                Get in Touch
              </span>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl leading-tight mb-6">
              Let's build<br />
              something<br />
              effective.
            </h1>
            <motion.p
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="text-xl text-gray-700 max-w-3xl"
            >
              Schedule a consultation to discuss your business objectives and explore how automation can drive growth.
            </motion.p>
          </motion.div>
        </section>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="border-2 border-black p-12 text-center bg-teal-50">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <Check className="text-teal-500 mx-auto mb-6" size={64} aria-hidden="true" />
                </motion.div>
                <h3 className="font-serif text-3xl mb-3">
                  Message received.
                </h3>
                <p className="text-gray-700">
                  We'll respond within 24 hours with next steps.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="John Doe"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="john@company.com"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    What are you trying to automate? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors resize-none"
                    placeholder="Example: Need website with lead capture, or AI phone system, or client onboarding automation..."
                    aria-required="true"
                  />
                </div>

                <MagneticButton className="w-full px-8 py-4 bg-black text-white font-medium uppercase tracking-wider border-2 border-black hover:bg-teal-500 hover:border-teal-500 transition-colors flex items-center justify-center space-x-3 group cursor-pointer">
                  <span>Send Message</span>
                  <Send className="group-hover:translate-x-1 transition-transform" size={20} aria-hidden="true" />
                </MagneticButton>
              </form>
            )}
          </motion.div>

          {/* Contact Info with image */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            >
              <div className="border-4 border-black overflow-hidden mb-8">
                <img 
                  src="https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/workspace-automation.png" 
                  alt="branded +flow office workspace in Irvine, California showing modern business automation setup"
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="border-4 border-teal-500 p-6 bg-teal-50 mb-8">
                <h3 className="font-serif text-2xl mb-3 italic">Prefer to book a call?</h3>
                <p className="text-gray-700 mb-4">Schedule a free 30-minute consultation instead of filling out a form.</p>
                <a 
                  href="https://calendly.com/brandedandflow" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-black text-white font-medium uppercase tracking-wider border-2 border-black hover:bg-teal-500 hover:border-teal-500 transition-colors"
                >
                  Book Free Call Now
                </a>
              </div>

              <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-6">
                Or contact directly
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-teal-500 pl-6">
                  <div className="text-sm text-gray-600 uppercase tracking-wider mb-2">Email</div>
                  <a href="mailto:jen@brandedandflow.com" className="text-black hover:text-teal-500 transition-colors text-lg">
                    jen@brandedandflow.com
                  </a>
                </div>

                <div className="border-l-4 border-black pl-6">
                  <div className="text-sm text-gray-600 uppercase tracking-wider mb-2">Phone</div>
                  <a href="tel:+17147884500" className="text-black hover:text-teal-500 transition-colors text-lg">
                    (714) 788-4500
                  </a>
                </div>

                <div className="border-l-4 border-black pl-6">
                  <div className="text-sm text-gray-600 uppercase tracking-wider mb-2">Location</div>
                  <p className="text-black text-lg">
                    18952 MacArthur Blvd, Suite 113<br />
                    Irvine, CA 92612
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
              className="border-2 border-black p-8 bg-white"
            >
              <h3 className="font-serif text-2xl mb-4 italic">
                What to expect
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3" aria-hidden="true">•</span>
                  <span>Response within 24 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3" aria-hidden="true">•</span>
                  <span>Professional consultation, not a sales pitch</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3" aria-hidden="true">•</span>
                  <span>Honest assessment of fit and scope</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3" aria-hidden="true">•</span>
                  <span>Clear next steps with no obligation</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
              className="border-l-4 border-yellow-400 pl-6 py-4"
            >
              <p className="text-gray-700">
                We work with businesses ready to implement professional systems and willing to invest in measurable growth.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
