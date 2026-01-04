import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function Portfolio() {
  const projects = [
    {
      title: 'AQ Remodeling Inc',
      category: 'Construction & Remodeling',
      year: '2024',
      description: 'Professional remodeling contractor needed a modern web presence to showcase their work and capture leads. Built complete website with portfolio gallery, contact forms, and service pages.',
      impact: 'Professional web presence',
      url: 'https://aqremodelinginc.com',
      image: 'https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/portfolio-aq-remodeling.png',
    },
    {
      title: 'Enzo Mortgages Inc',
      category: 'Financial Services',
      year: '2024',
      description: 'Mortgage broker required clear, trustworthy website to explain services and build credibility. Created professional site with loan calculators and lead capture system.',
      impact: 'Increased credibility',
      url: 'https://enzomortgagesinc.com',
      image: 'https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/portfolio-enzo-mortgages.png',
    },
    {
      title: 'Proper Places Organizing',
      category: 'Home Services',
      year: '2024',
      description: 'Professional organizing service needed website to showcase transformations and book consultations. Built visual portfolio site with before/after galleries and booking integration.',
      impact: 'Streamlined booking',
      url: 'https://properplacesorganizing.com',
      image: 'https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/portfolio-proper-places.png',
    },
    {
      title: 'Simple Tech Solutions',
      category: 'Technology Services',
      year: '2024',
      description: 'IT services company needed clean, professional website to explain technical services in plain English. Created service-focused site with clear CTAs and contact integration.',
      impact: 'Clear service positioning',
      url: 'https://simpletech.solutions',
      image: 'https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/portfolio-simple-tech.png',
    },
    {
      title: 'Pacific Wellness Center',
      category: 'Healthcare & Wellness',
      year: '2024',
      description: 'Holistic wellness center needed elegant website to showcase services and enable online booking. Built calming, professional site with appointment scheduling and service descriptions.',
      impact: 'Online booking system',
      url: 'https://pacificwellnesscenter.com',
      image: 'https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/portfolio-wellness-center.png',
    },
    {
      title: 'Elite Legal Partners',
      category: 'Legal Services',
      year: '2024',
      description: 'Law firm required authoritative web presence to attract high-value clients. Created sophisticated site with practice area pages, attorney profiles, and consultation booking.',
      impact: 'Premium positioning',
      url: 'https://elitelegalpartners.com',
      image: 'https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/portfolio-legal-partners.png',
    },
    {
      title: 'Greenscape Landscaping',
      category: 'Landscaping & Design',
      year: '2024',
      description: 'Landscape design company needed visual showcase for their projects. Built stunning portfolio site with project galleries, service packages, and estimate request forms.',
      impact: 'Visual portfolio',
      url: 'https://greenscapelandscaping.com',
      image: 'https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/portfolio-greenscape.png',
    },
    {
      title: 'Urban Coffee Collective',
      category: 'Food & Beverage',
      year: '2024',
      description: 'Modern coffee shop chain needed digital presence to match their brand. Created sleek site with menu, locations, online ordering, and loyalty program integration.',
      impact: 'Online ordering',
      url: 'https://urbancoffeecollective.com',
      image: 'https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/portfolio-coffee-collective.png',
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
                Portfolio
              </span>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl leading-tight mb-6">
              Recent work.
            </h1>
            <motion.p
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="text-xl text-gray-700 max-w-3xl"
            >
              Real businesses. Professional websites. Marketing automation that works.
            </motion.p>
          </motion.div>
        </section>

        {/* Projects Grid */}
        <section className="grid md:grid-cols-2 gap-8 mb-32">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 }}
              className="border-4 border-black bg-white group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow"
            >
              {/* Website Preview */}
              <div className="relative w-full h-80 bg-gray-100 border-b-4 border-black overflow-hidden">
                <img 
                  src={project.image}
                  alt={`${project.title} website preview`}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80" />
              </div>

              {/* Project Info */}
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-sm text-gray-600 font-mono">{project.category}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-600 font-mono">{project.year}</span>
                </div>
                
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 group/link mb-4"
                >
                  <h2 className="font-serif text-3xl group-hover/link:text-teal-500 transition-colors">
                    {project.title}
                  </h2>
                  <ExternalLink className="text-gray-400 group-hover/link:text-teal-500 transition-colors" size={20} />
                </a>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="border-l-4 border-teal-500 pl-6">
                  <div className="text-sm text-gray-600 uppercase tracking-wider mb-1">Result</div>
                  <div className="text-xl font-bold text-teal-500">
                    {project.impact}
                  </div>
                </div>

                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-6 inline-block"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="px-6 py-3 bg-black text-white font-medium uppercase tracking-wider border-2 border-black hover:bg-teal-500 hover:border-teal-500 transition-colors"
                  >
                    View Live Site →
                  </motion.button>
                </a>
              </div>
            </motion.div>
          ))}
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="border-t-4 border-black pt-20 text-center"
        >
          <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-6">
            Ready to build<br />
            your website?
          </h2>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a website that works for your business.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            className="inline-block px-10 py-4 bg-black text-white font-medium uppercase tracking-wider border-2 border-black hover:bg-teal-500 hover:border-teal-500 transition-colors"
          >
            Start a Project
          </motion.a>
        </motion.section>
      </div>
    </div>
  );
}
