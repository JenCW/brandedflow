import { motion } from 'framer-motion';
import { Shield, Check } from 'lucide-react';

export default function Guarantee() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
      className="py-16 border-y-4 border-black bg-gradient-to-br from-teal-50 via-white to-yellow-50"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-3 mb-6 bg-black text-yellow-400 px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Shield size={32} />
              <span className="font-mono text-sm uppercase tracking-wider">Our Guarantee</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6 text-black">
              You get results<br />or you get your<br />money back.
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              If your automated system doesn't perform as promised within 90 days, we'll refund your setup fee. No questions asked.
            </p>
            <p className="text-gray-600">
              We're that confident in what we build.
            </p>
          </div>

          <div className="border-4 border-black p-8 bg-black text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-serif text-2xl mb-6 italic text-yellow-400">What this means:</h3>
            <ul className="space-y-4">
              {[
                "System doesn't work as specified? Full refund.",
                "Not getting leads from your website? Full refund.",
                "AI receptionist missing calls? Full refund.",
                "Automation not saving you time? Full refund.",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="text-yellow-400 mt-1 mr-3 flex-shrink-0" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-yellow-400">
              <p className="text-sm text-gray-300">
                The only risk is staying stuck doing everything manually.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
