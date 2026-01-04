import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Check } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import CalendarBooking from '../components/CalendarBooking';
import Guarantee from '../components/Guarantee';

export default function Services() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with subtle background */}
        <section className="mb-12 -mx-6 px-6 py-12 bg-gradient-to-br from-gray-50 via-teal-50/30 to-gray-50">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-7xl mx-auto"
          >
            <div className="border-t-4 border-black pt-6 mb-8">
              <span className="text-xs uppercase tracking-[0.3em] font-mono">
                Services & Pricing
              </span>
            </div>
            <h1 className="font-serif text-6xl leading-tight mb-6" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>
              Simple pricing.<br />
              No surprises.
            </h1>
            <motion.p
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="text-xl text-gray-700 max-w-3xl"
            >
              Quick Starts from $1,200. Full business automation from $3,500. Every service has two options: <strong className="text-black">DIY</strong> (we build it, train you, you run it) or <strong className="text-black">Managed</strong> (we build it and optimize it every month).
            </motion.p>
          </motion.div>
        </section>

        {/* Quick Starts */}
        <section className="mb-20 border-b-4 border-black pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="flex items-end justify-between mb-4">
                <div>
                  <span className="text-teal-600 font-mono text-sm uppercase tracking-widest">Starting at $1,200</span>
                  <h2 className="font-serif text-5xl leading-tight mt-2" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>
                    Quick Starts
                  </h2>
                </div>
                <div className="text-right">
                  <div className="text-gray-600 text-sm">Timeline:</div>
                  <div className="text-black font-bold text-xl">1 week</div>
                </div>
              </div>
              <p className="text-gray-700 text-lg max-w-3xl">
                Fix one thing fast. Perfect when you need help with ONE specific problem - no complexity, no confusion.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Brand Refresh + Auto-Announcement',
                  price: '$1,200',
                  managed: '$600 + $297/mo',
                  features: [
                    'Logo refresh/update, color palette, typography',
                    '3-page brand guide (PDF)',
                    'Email signature template and branded templates',
                    'Automated email announcing rebrand',
                    'Auto-scheduled social posts',
                  ],
                  kpi: 'Email open rate, social engagement, brand consistency',
                },
                {
                  title: 'Lead Magnet + Auto-Delivery System',
                  price: '$1,200',
                  managed: '$600 + $297/mo',
                  features: [
                    '1 PDF lead magnet (8-10 pages, designed)',
                    'Landing page',
                    'Branded email templates',
                    'Instant email with PDF download',
                    '3-email nurture sequence over 2 weeks',
                    'Lead added to CRM automatically',
                  ],
                  kpi: 'Landing page conversion rate, email engagement, leads captured',
                },
                {
                  title: 'Website Face-Lift + Launch Announcement',
                  price: '$1,500',
                  managed: '$750 + $397/mo',
                  features: [
                    '3-5 pages updated (copy, design, mobile, speed)',
                    'New contact form with integration',
                    'Search optimization',
                    'Auto-scheduled social posts',
                    'Email to contact list',
                    'Traffic tracking (before/after)',
                  ],
                  kpi: 'Site traffic increase, time on site, bounce rate improvement',
                },
                {
                  title: 'Client Onboarding System',
                  price: '$1,500',
                  managed: '$750 + $397/mo',
                  features: [
                    'Client portal setup',
                    'Branded welcome packet (PDF)',
                    'Onboarding checklist and templates',
                    'Auto portal creation when contract signed',
                    'Welcome email sequence',
                    'Document request automation',
                  ],
                  kpi: 'Onboarding completion time, document collection rate, client satisfaction',
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                  className="border-4 border-black bg-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all group"
                >
                  <div className="p-6">
                    <h3 className="font-serif text-2xl mb-4 leading-tight group-hover:text-teal-500 transition-colors">
                      {service.title}
                    </h3>
                    <div className="mb-4 pb-4 border-b-2 border-gray-200">
                      <div className="text-3xl font-bold mb-1">
                        {service.price}
                      </div>
                      <div className="text-xs text-gray-600 mb-3">
                        DIY (one-time)
                      </div>
                      <div className="text-lg text-black font-semibold">
                        {service.managed}
                      </div>
                      <div className="text-xs text-gray-600">
                        Managed (monthly)
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-xs uppercase tracking-wider text-gray-600 mb-2">What's Included:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <Check className="text-teal-500 mt-0.5 mr-2 flex-shrink-0" size={14} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-xs uppercase tracking-wider text-gray-600 mb-1">KPI:</div>
                      <div className="text-xs text-gray-600 leading-relaxed">{service.kpi}</div>
                    </div>
                  </div>
                  <Link to="/contact" className="block">
                    <div className="px-6 py-4 bg-black text-white text-center font-medium text-sm uppercase tracking-wider hover:bg-teal-500 transition-colors group-hover:bg-teal-500 cursor-pointer">
                      Get Started →
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Systems with image */}
        <section className="mb-32 border-b-4 border-black pb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <span className="text-teal-600 font-mono text-sm uppercase tracking-widest">Starting at $3,500</span>
              <h2 className="font-serif text-5xl leading-tight mt-4 mb-4" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>
                Full Systems
              </h2>
              <p className="text-gray-700 text-xl max-w-3xl">
                Everything working together. For when you're done being overwhelmed and want your whole business automated properly.
              </p>
              <div className="text-gray-600 mt-3">Timeline: 2-4 weeks</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="border-4 border-black overflow-hidden"
            >
              <img 
                src="https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/simple-automation-workspace.png" 
                alt="Complete business automation workspace showing clean organized systems without overwhelming complexity" 
                className="w-full h-96 object-cover"
              />
            </motion.div>
          </div>

          <div className="space-y-8">
            {[
              {
                title: 'Website + Lead System',
                price: '$3,500-$5,000',
                managed: '$2,000 + $497/mo',
                timeline: '2-3 weeks',
                description: 'Complete website (5-10 pages) with automated lead capture. No confusion. No tech jargon. Just a site that works.',
                features: [
                  'Complete website redesign OR new website (5-10 pages)',
                  'Mobile-responsive, modern, professional design',
                  'Optimized for search engines AND AI assistants',
                  'Clear messaging (no marketing jargon)',
                  'Contact forms → automated emails → lead capture',
                  'Abandoned form recovery',
                  'Lead tracking that makes sense',
                  'Simple dashboard showing what\'s working',
                ],
                kpi: 'Form submissions, lead quality, visitor-to-lead conversion rate',
              },
              {
                title: 'Brand + Marketing Automation',
                price: '$3,500-$5,000',
                managed: '$2,000 + $697/mo',
                timeline: '2-3 weeks',
                description: 'Complete professional brand with all marketing running automatically. Look credible. Stay consistent. Save time.',
                features: [
                  'Complete brand identity (logo, colors, typography, guidelines)',
                  'Marketing collateral (business cards, letterhead, email signature)',
                  'Brand guidelines in plain English',
                  'All email templates automatically branded',
                  'Document templates (proposals, invoices, contracts)',
                  'Email signature deployed to team automatically',
                  'Social media templates ready to use',
                ],
                kpi: 'Brand consistency, time saved creating materials, professional perception',
              },
              {
                title: 'Complete Business System',
                price: '$7,500-$10,000',
                managed: '$4,000 + $1,297/mo',
                timeline: '3-4 weeks',
                description: 'Everything. Full brand. Complete website. Phone service. Email automation. Client portal. The works. Stop doing everything manually.',
                features: [
                  'Full professional brand identity',
                  'Complete website (new or redesign)',
                  'Full email and CRM automation',
                  '24/7 professional phone service',
                  'Client portal for smooth onboarding',
                  'Lead capture → nurture → booking → onboarding (all automated)',
                  'Brand deployed everywhere automatically',
                  'Email and social marketing on autopilot',
                  'Dashboard tracking everything',
                  'Phone calls answered and qualified 24/7',
                ],
                kpi: 'Full funnel conversion, leads per week, revenue impact, hours saved weekly',
                featured: true,
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.2 }}
                className={`border-4 ${service.featured ? 'border-teal-500 bg-white' : 'border-black bg-white'} p-8`}
              >
                <div className="grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-5">
                    {service.featured && (
                      <div className="inline-block px-3 py-1 bg-teal-500 text-white text-xs font-bold uppercase tracking-wider mb-4">
                        Most Popular
                      </div>
                    )}
                    <h3 className="font-serif text-4xl mb-4 italic">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-black mb-1">
                        {service.price}
                      </div>
                      <div className="text-sm text-gray-600">
                        DIY (one-time)
                      </div>
                      <div className="text-2xl text-black mt-3">
                        {service.managed}
                      </div>
                      <div className="text-sm text-gray-600">
                        Managed (monthly)
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Timeline: {service.timeline}
                    </div>
                    <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                      <div className="text-xs uppercase tracking-wider text-gray-600 mb-1">KPI Tracking:</div>
                      <div className="text-sm text-gray-700">{service.kpi}</div>
                    </div>
                    <Link to="/contact">
                      <MagneticButton className={`px-8 py-4 ${service.featured ? 'bg-teal-500 text-white border-2 border-teal-500 hover:bg-black hover:border-black' : 'border-2 border-black text-black hover:bg-black hover:text-white'} font-semibold cursor-pointer transition-colors`}>
                        Get Started
                      </MagneticButton>
                    </Link>
                  </div>

                  <div className="md:col-span-7">
                    <h4 className="text-black font-semibold mb-4">What's included:</h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="text-teal-500 mt-1 mr-3 flex-shrink-0" size={18} aria-hidden="true" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What's Included */}
        <section className="border-t-4 border-black pt-20 mb-32">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-12"
          >
            <h2 className="font-serif text-5xl leading-tight mb-4" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>Included with every service</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-1 bg-white">
            {[
              'Portal access (track progress, see updates)',
              'Previews before final delivery',
              'Email and text communication (no unnecessary calls)',
              'All source files (you own everything)',
              'Training in plain English (no jargon)',
              '30 days email support after delivery',
              'Simple report showing it\'s working',
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white border border-black p-6"
              >
                <div className="flex items-start">
                  <Check className="text-teal-500 mt-1 mr-3 flex-shrink-0" size={18} aria-hidden="true" />
                  <span className="text-gray-700">{item}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What Managed Means */}
        <section className="mb-32 border-b-4 border-black pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mb-12"
            >
              <h2 className="font-serif text-5xl leading-tight mb-4" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>What "Managed" means</h2>
              <p className="text-gray-700 text-lg max-w-3xl">
                DIY: We build it, train you, you run it. Managed: We build it, run it, improve it. You just use it.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                className="border-l-4 border-teal-500 pl-8 py-6"
              >
                <h3 className="font-serif text-3xl mb-4 italic">With Managed, we:</h3>
                <ul className="space-y-3">
                  {[
                    'Make it better every month (not just keep it running)',
                    'Add new features as your business grows',
                    'Monitor, optimize, report on performance',
                    'Handle everything - you don\'t think about it',
                    'Give recommendations based on actual data',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="text-teal-500 mt-1 mr-3 flex-shrink-0" size={16} aria-hidden="true" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                className="border-l-4 border-yellow-400 pl-8 py-6"
              >
                <h3 className="font-serif text-3xl mb-4 italic">Examples:</h3>
                <ul className="space-y-3">
                  {[
                    'Test subject lines and improve open rates',
                    'Add new landing pages for new services',
                    'Improve phone scripts based on real calls',
                    'Automate new tasks you\'re doing manually',
                    'Analyze what\'s working and double down',
                    'Update content based on what converts',
                  ].map((item, idx) => (
                    <li key={idx} className="text-gray-700">• {item}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Payment Terms */}
        <section className="border-t-4 border-black pt-20 mb-32">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h3 className="font-serif text-3xl mb-4 italic">DIY (One-Time) Projects</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• 50% deposit to start</li>
                <li>• 50% on delivery</li>
                <li>• Payment via QuickBooks invoice (ACH or credit card)</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            >
              <h3 className="font-serif text-3xl mb-4 italic">Managed (Monthly) Services</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Setup fee due to start</li>
                <li>• Monthly billing begins after delivery</li>
                <li>• Auto-renewal</li>
                <li>• Cancel anytime with 30 days notice</li>
                <li>• No long-term contracts</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Guarantee */}
        <Guarantee />

        {/* Calendar Booking */}
        <CalendarBooking />

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center border-t-4 border-black pt-20"
        >
          <h2 className="font-serif text-5xl leading-tight mb-6" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>
            Still have questions?
          </h2>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            Email or text. We respond within 24 hours with straight answers in plain English.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <MagneticButton className="px-10 py-4 bg-black text-white font-medium uppercase tracking-wider border-2 border-black hover:bg-teal-500 hover:border-teal-500 transition-colors cursor-pointer inline-block">
                Contact Us
              </MagneticButton>
            </Link>
            <Link to="/case-studies">
              <MagneticButton className="px-10 py-4 bg-white text-black font-medium uppercase tracking-wider border-2 border-black hover:bg-yellow-400 transition-colors cursor-pointer inline-block">
                See Case Studies
              </MagneticButton>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
