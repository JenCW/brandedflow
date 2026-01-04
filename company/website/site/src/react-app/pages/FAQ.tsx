import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Add FAQ schema markup for rich snippets
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const faqs = [
    {
      question: 'How much does business automation cost?',
      answer: 'Quick Start packages begin at $1,200 for single automation projects (like lead capture or client onboarding). Full business automation packages with website, CRM, and AI phone receptionist range from $3,500-$10,000. We offer both DIY (one-time payment) and Managed (monthly optimization) options. All pricing is transparent with no hidden fees.',
    },
    {
      question: 'What is a 24/7 AI phone receptionist?',
      answer: 'Our AI phone receptionist answers your business calls instantly, 24 hours a day, 7 days a week. It qualifies leads by asking relevant questions, books appointments directly into your calendar, and routes urgent calls to you. It never misses a call, never sounds tired, and works nights, weekends, and holidays. Perfect for service-based businesses that can\'t afford to miss opportunities.',
    },
    {
      question: 'How long does it take to launch my automation?',
      answer: 'Quick Start projects launch in 1 week. Website projects with marketing automation take 2-3 weeks. Complete business automation (website, CRM, AI receptionist, client portal) typically launches in 3-4 weeks. We move fast without sacrificing quality because we know time matters when you\'re running a business.',
    },
    {
      question: 'Do I need technical knowledge to use the automation?',
      answer: 'No technical knowledge required. We build everything to be simple and intuitive. You get training documentation written in plain English, video walkthroughs, and 30 days of support after delivery. If you can use email and a web browser, you can manage your automation.',
    },
    {
      question: 'What\'s the difference between DIY and Managed services?',
      answer: 'DIY means we build your automation and train you to run it yourself - perfect if you enjoy tech and have time. Managed means we build it AND actively optimize it every month - we monitor performance, make improvements, A/B test, add new automations as your business grows, and provide ongoing strategic recommendations. Managed is ideal if you want to focus on your business while automation keeps getting better.',
    },
    {
      question: 'How do I know if automation will work for my business?',
      answer: 'If you\'re spending time on repetitive tasks (responding to the same questions, manually following up with leads, sending the same emails, scheduling appointments back and forth), automation will help. If you\'re missing calls or losing leads because you\'re too busy, automation will help. Book a free 30-minute consultation and we\'ll analyze your current process and show you exactly what can be automated and the expected ROI.',
    },
    {
      question: 'Do you serve businesses outside of Orange County?',
      answer: 'Yes. While we\'re based in Irvine, California and serve many Orange County businesses, we work with clients throughout Southern California and nationwide. Everything can be done remotely via email, text, and video calls. The automation we build works anywhere.',
    },
    {
      question: 'What if the automation doesn\'t work as promised?',
      answer: '90-day money-back guarantee. If your automated system doesn\'t perform as specified within 90 days, we refund your setup fee. No questions asked. We\'re that confident in what we build. The only risk is continuing to do everything manually while your competitors automate.',
    },
    {
      question: 'Can I see examples of your work?',
      answer: 'Yes. Visit our Portfolio page to see live client websites, or check our Case Studies page for detailed results with actual metrics: lead volume increases, time savings, conversion rate improvements, and ROI numbers. We only show real businesses with real results.',
    },
    {
      question: 'How do I get started?',
      answer: 'Three ways: (1) Book a free 30-minute consultation on our calendar, (2) Call or text us at (714) 788-4500, or (3) Fill out the contact form and we\'ll respond within 24 hours. No sales pitch. We\'ll analyze your needs, show you what\'s possible, give you transparent pricing, and let you decide.',
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <section className="mb-20 border-b-4 border-black pb-20">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="border-t-4 border-black pt-6 mb-8">
              <span className="text-xs uppercase tracking-[0.3em] font-mono">
                Common Questions
              </span>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl leading-tight mb-6">
              Questions &<br />
              clear answers.
            </h1>
          </motion.div>
        </section>

        {/* FAQ List */}
        <div className="space-y-1 mb-20">
          {faqs.map((faq, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.05 }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left border-t border-black py-6 group hover:bg-teal-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-serif text-xl md:text-2xl pr-8 group-hover:text-teal-500 transition-colors italic">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 mt-1"
                >
                  <Plus className={`${openIndex === index ? 'text-teal-500' : 'text-gray-400'} transition-colors`} size={24} />
                </motion.div>
              </div>

              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-700 leading-relaxed pt-4 pr-12">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="border-2 border-black p-12 text-center bg-gradient-to-br from-teal-50 via-yellow-50 to-teal-50"
        >
          <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-4">
            Additional questions?
          </h2>
          <p className="text-gray-700 mb-8">
            Schedule a consultation to discuss your specific needs.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            className="inline-block px-10 py-4 bg-black text-white font-medium uppercase tracking-wider border-2 border-black hover:bg-teal-500 hover:border-teal-500 transition-colors"
          >
            Contact Us
          </motion.a>
        </motion.section>
      </div>
    </div>
  );
}
