import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { ArrowRight, TrendingUp, Clock, DollarSign } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

export default function CaseStudies() {
  const caseStudies = [
    {
      client: "AQ Remodeling Inc",
      industry: "Construction & Remodeling",
      challenge: "Losing leads to voicemail and slow response times. Manual follow-up process. No way to track lead sources.",
      solution: "Complete website redesign with integrated lead capture, automated email sequences, and AI phone receptionist for after-hours calls.",
      results: [
        { metric: "Lead Volume", before: "2-3/month", after: "15-20/month", change: "+500%" },
        { metric: "Response Time", before: "4-6 hours", after: "Instant", change: "100% improvement" },
        { metric: "Conversion Rate", before: "12%", after: "34%", change: "+183%" },
        { metric: "Time Saved", before: "N/A", after: "8 hrs/week", change: "8 hours saved" },
      ],
      roi: "$47,000 additional revenue in first 6 months",
      timeline: "3 weeks to launch",
      investment: "$5,000 setup + $497/month managed",
    },
    {
      client: "Enzo Mortgages Inc",
      industry: "Financial Services",
      challenge: "High-value mortgage leads going to competitors because of missed calls. No automated nurture sequence for warm leads.",
      solution: "Professional website with trust-building elements, 24/7 AI receptionist, automated lead qualification, and CRM integration with drip campaigns.",
      results: [
        { metric: "Missed Calls", before: "40%", after: "0%", change: "100% reduction" },
        { metric: "Qualified Leads", before: "8/month", after: "23/month", change: "+188%" },
        { metric: "Close Rate", before: "18%", after: "29%", change: "+61%" },
        { metric: "Average Deal Size", before: "$4,200", after: "$5,800", change: "+38%" },
      ],
      roi: "$156,000 additional commission in first year",
      timeline: "2 weeks to launch",
      investment: "$3,500 setup + $697/month managed",
    },
    {
      client: "Proper Places Organizing",
      industry: "Home Services",
      challenge: "Spending 15+ hours/week on admin work. Inconsistent booking process. No client onboarding system.",
      solution: "Website with automated booking, client portal, onboarding sequences, and follow-up automation. Integrated payment processing.",
      results: [
        { metric: "Admin Time", before: "15 hrs/week", after: "5 hrs/week", change: "-67%" },
        { metric: "Bookings", before: "12/month", after: "28/month", change: "+133%" },
        { metric: "No-Shows", before: "15%", after: "3%", change: "-80%" },
        { metric: "Repeat Clients", before: "30%", after: "65%", change: "+117%" },
      ],
      roi: "10 hours per week to focus on billable work = $42,000/year value",
      timeline: "2 weeks to launch",
      investment: "$4,000 setup + $497/month managed",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <section className="mb-20 border-b-4 border-black pb-20">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="border-t-4 border-black pt-6 mb-8">
              <span className="text-xs uppercase tracking-[0.3em] font-mono">
                Proven Results
              </span>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl leading-tight mb-6">
              Real metrics.<br />
              Real businesses.<br />
              Real growth.
            </h1>
            <motion.p
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="text-xl text-gray-700 max-w-3xl"
            >
              See exactly how automation transformed these businesses. Numbers don't lie.
            </motion.p>
          </motion.div>
        </section>

        {/* Case Studies */}
        {caseStudies.map((study, index) => (
          <section key={index} className="mb-32 border-b-4 border-black pb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="mb-12"
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-teal-500 font-mono text-sm uppercase tracking-widest">{study.industry}</span>
              </div>
              <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-6">{study.client}</h2>
            </motion.div>

            <div className="mb-8">
              <img 
                src="https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/business-owner-confident.png" 
                alt={`${study.client} business automation success story`}
                className="w-full h-64 object-cover border-4 border-black"
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="space-y-8"
              >
                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="font-serif text-2xl mb-4 italic">The Challenge</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{study.challenge}</p>
                </div>

                <div className="border-l-4 border-teal-500 pl-6">
                  <h3 className="font-serif text-2xl mb-4 italic">The Solution</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{study.solution}</p>
                </div>

                <div className="border-2 border-black p-6 bg-gradient-to-br from-yellow-50 to-teal-50">
                  <div className="flex items-start space-x-3 mb-3">
                    <TrendingUp className="text-teal-500 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-lg mb-2">ROI</h4>
                      <p className="text-2xl font-bold text-teal-500">{study.roi}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-black">
                    <div className="flex items-start space-x-2">
                      <Clock className="text-gray-600 mt-1" size={18} />
                      <div>
                        <div className="text-xs text-gray-600 uppercase">Timeline</div>
                        <div className="font-semibold">{study.timeline}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <DollarSign className="text-gray-600 mt-1" size={18} />
                      <div>
                        <div className="text-xs text-gray-600 uppercase">Investment</div>
                        <div className="font-semibold text-sm">{study.investment}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="border-4 border-black p-8 bg-black text-white"
              >
                <h3 className="font-serif text-3xl mb-8 italic text-yellow-400">Results</h3>
                <div className="space-y-6">
                  {study.results.map((result, idx) => (
                    <div key={idx} className="border-b border-gray-700 pb-6 last:border-b-0">
                      <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">{result.metric}</div>
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                          <div className="text-xs text-gray-500">Before</div>
                          <div className="text-xl font-bold text-red-400">{result.before}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">After</div>
                          <div className="text-xl font-bold text-teal-400">{result.after}</div>
                        </div>
                      </div>
                      <div className="text-yellow-400 font-bold text-lg">{result.change}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-center border-t-4 border-black pt-20"
        >
          <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
            Ready for results<br />like these?
          </h2>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            Book a free consultation to see what automation can do for your business.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://calendly.com/brandedandflow" target="_blank" rel="noopener noreferrer">
              <MagneticButton className="px-12 py-5 bg-black text-white font-bold text-lg uppercase tracking-wider border-2 border-black hover:bg-teal-500 hover:border-teal-500 transition-colors cursor-pointer inline-flex items-center space-x-3">
                <span>Book Free Consultation</span>
                <ArrowRight size={24} />
              </MagneticButton>
            </a>
            <Link to="/services">
              <MagneticButton className="px-12 py-5 bg-white text-black font-bold text-lg uppercase tracking-wider border-2 border-black hover:bg-yellow-400 transition-colors cursor-pointer">
                See Pricing
              </MagneticButton>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
