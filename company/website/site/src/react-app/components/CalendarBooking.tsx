import { motion } from 'framer-motion';
import { Calendar, Clock, Video } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function CalendarBooking() {
  return (
    <section className="py-24 border-y-4 border-black bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-3 mb-6 bg-black text-white px-6 py-3">
            <Calendar size={28} />
            <span className="font-mono text-lg uppercase tracking-wider">Ready to Get Started?</span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-6">
            Let's talk about<br />your business
          </h2>
          <p className="text-2xl text-gray-700 mb-4">
            Call us or schedule a time that works for you.
          </p>
          <p className="text-lg text-gray-600">
            We'll walk through your current process and show you exactly what we can automate.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-4 mb-12"
        >
          <div className="border-2 border-black p-6 bg-white text-center">
            <Clock className="mx-auto mb-3 text-teal-500" size={32} />
            <div className="font-bold text-black mb-1">Quick Call</div>
            <div className="text-sm text-gray-600">30 minutes or less</div>
          </div>
          <div className="border-2 border-black p-6 bg-white text-center">
            <Video className="mx-auto mb-3 text-teal-500" size={32} />
            <div className="font-bold text-black mb-1">Phone or Video</div>
            <div className="text-sm text-gray-600">Your preference</div>
          </div>
          <div className="border-2 border-black p-6 bg-white text-center">
            <Calendar className="mx-auto mb-3 text-teal-500" size={32} />
            <div className="font-bold text-black mb-1">Available Now</div>
            <div className="text-sm text-gray-600">Same or next day</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="border-4 border-black p-12 bg-white text-center"
        >
          <div className="mb-6">
            <p className="text-gray-700 text-lg mb-4">
              <strong className="text-black">What happens next:</strong> We discuss your business, identify automation opportunities, provide clear pricing, and outline next steps.
            </p>
            <p className="text-sm text-gray-600">
              No sales pitch. No pressure. Just practical solutions for your specific needs.
            </p>
          </div>
          
          <a 
            href="https://calendly.com/brandedandflow" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <MagneticButton className="px-16 py-6 bg-black text-white font-bold text-xl uppercase tracking-wider border-4 border-black hover:bg-teal-500 hover:border-teal-500 transition-colors cursor-pointer inline-flex items-center space-x-3">
              <Calendar size={28} />
              <span>Schedule Your Call</span>
            </MagneticButton>
          </a>
          
          <p className="mt-6 text-sm text-gray-600">
            Or call now: (714) 788-4500
          </p>
        </motion.div>
      </div>
    </section>
  );
}
