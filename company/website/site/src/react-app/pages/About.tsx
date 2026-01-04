import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import { Link } from 'react-router';

export default function About() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <section className="mb-32 border-b-4 border-black pb-20">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="border-t-4 border-black pt-6 mb-8">
              <span className="text-xs uppercase tracking-[0.3em] font-mono">
                Our Story
              </span>
            </div>
            <h1 className="font-serif text-6xl leading-tight mb-12" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>
              This is a story<br />
              about necessity.
            </h1>
          </motion.div>
        </section>

        {/* Story Section */}
        <section className="grid md:grid-cols-12 gap-16 mb-32 border-b border-black pb-32">
          <div className="md:col-span-7 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mb-8"
            >
              <img 
                src="https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/workspace-automation.png" 
                alt="Brand automation workspace in Irvine, California showing marketing automation systems"
                className="w-full border-2 border-black"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="border-t border-black pt-6"
            >
              <p className="text-lg leading-relaxed">
                I lost everything to COVID. Not just a job. Not just savings. Everything. No money. No one to help. Four kids depending on me. At 50 years old.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="border-t border-black pt-6"
            >
              <p className="text-lg leading-relaxed mb-4">
                Most people starting businesses talk about "finding their passion" or "disrupting an industry." That's not this story.
              </p>
              <p className="text-lg leading-relaxed">
                When you have nothing and no one, you have two choices: give up or rebuild. Giving up wasn't an option. My kids needed a roof. They needed food. They needed to see their mom not break.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
              className="border-t border-black pt-6"
            >
              <p className="text-lg leading-relaxed">
                So I started <span className="font-bold">branded</span> <span className="text-teal-500 font-script text-2xl">+flow</span> from absolute zero. No safety net. No investor backing. No fancy connections. Just skills, determination, and the kind of desperation that either destroys you or forges you into something stronger.
              </p>
            </motion.div>
          </div>

          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="sticky top-32 border-l-4 border-teal-500 pl-8 py-6"
            >
              <h3 className="font-serif text-2xl italic mb-6">This is why we exist</h3>
              <div className="space-y-4">
                <p className="text-gray-700">To help other people who are rebuilding</p>
                <p className="text-gray-700">To serve the underdogs and the overwhelmed</p>
                <p className="text-gray-700">To cut through the BS that confuses and intimidates people</p>
                <p className="text-gray-700">To build something real that actually helps people</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-32 border-b-4 border-black pb-32 bg-gradient-to-br from-teal-50 via-yellow-50 to-teal-50 -mx-6 px-6 py-20">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-7xl mx-auto"
          >
            <div className="border-b-4 border-black pb-6 mb-8">
              <span className="text-xs uppercase tracking-[0.3em] font-mono">
                Mission
              </span>
            </div>
            <div className="mb-8">
              <img 
                src="https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/business-owner-confident.png" 
                alt="Small business owner confident with business automation systems in place"
                className="w-full h-64 object-cover border-4 border-black"
              />
            </div>
            <h2 className="font-serif text-5xl leading-tight mb-8" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>
              Our Mission
            </h2>
            <motion.p
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="text-2xl leading-relaxed max-w-4xl mb-6"
            >
              For small businesses, solopreneurs, and entrepreneurs frustrated and overwhelmed with confusing marketing speak and technical AI jargon: <span className="font-bold">branded</span> <span className="text-teal-500 font-script text-3xl">+flow</span> creates the automation that works together and keeps you in the game.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
              className="text-xl text-gray-700 max-w-4xl"
            >
              So you can stop trying to figure out marketing automation and get back to doing what you love to do - your business.
            </motion.p>
          </motion.div>
        </section>

        {/* Core Beliefs */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-12"
          >
            <div className="border-b-2 border-black pb-6 mb-8">
              <span className="text-xs uppercase tracking-[0.3em] font-mono">
                Core Beliefs
              </span>
            </div>
            <h2 className="font-serif text-5xl leading-tight" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>Core Beliefs</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-1 bg-white">
            {[
              {
                title: 'Websites and automation are inseparable',
                desc: 'A beautiful website that doesn\'t respond, follow up, or handle interest is theater. Automation without trust doesn\'t get used.',
              },
              {
                title: 'Professionalism is behavior, not aesthetics',
                desc: 'If it doesn\'t look credible, people don\'t engage. But looking good without functioning is just as useless.',
              },
              {
                title: 'Sales and marketing don\'t require mind-reading',
                desc: 'You don\'t predict people. You respond professionally when they show up. You remove friction instead of manipulating behavior.',
              },
            ].map((belief, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, backgroundColor: '#ffffff' }}
                whileInView={{ 
                  opacity: 1,
                  backgroundColor: '#000000',
                  transition: {
                    duration: 1.5,
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }
                }}
                viewport={{ once: true }}
                className="p-8 border-2 border-black"
              >
                <motion.div
                  initial={{ color: '#000000' }}
                  whileInView={{ 
                    color: '#ffffff',
                    transition: {
                      duration: 1.5,
                      delay: index * 0.5 + 0.3,
                      ease: "easeInOut"
                    }
                  }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-serif text-2xl mb-3 italic">
                    {belief.title}
                  </h3>
                  <p className="leading-relaxed">
                    {belief.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What We Refuse */}
        <section className="border-t border-black pt-20 mb-32">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <h2 className="font-serif text-5xl leading-tight mb-6" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>What we refuse</h2>
                <p className="text-gray-700 text-lg mb-8">
                  These refusals are part of our authority.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                className="space-y-4 border-l-2 border-black pl-6"
              >
                {[
                  'Selling "funnels" based on psychology guesses',
                  'Pretending to know why people buy',
                  'Building websites that don\'t behave professionally',
                  'Building automation no one trusts enough to use',
                  'Using marketing jargon to confuse and intimidate',
                ].map((item, index) => (
                  <p key={index} className="text-gray-700">• {item}</p>
                ))}
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <h2 className="font-serif text-5xl leading-tight mb-6" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>What we promise</h2>
                <p className="text-gray-700 text-lg mb-8">
                  Certainty of response, not certainty of outcome.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                className="border-l-4 border-teal-500 pl-8 py-6"
              >
                <p className="text-lg leading-relaxed mb-4">
                  When someone interacts with your business, the business responds clearly, professionally, and consistently — every time.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  That is measurable. Defensible. True.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="border-t-4 border-black pt-20 mb-32 bg-gradient-to-br from-yellow-50 via-teal-50 to-yellow-50 -mx-6 px-6 py-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h2 className="font-serif text-5xl leading-tight mb-6" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>Get in touch</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong className="text-black">Email:</strong><br />
                  jen@brandedandflow.com
                </p>
                <p>
                  <strong className="text-black">Phone:</strong><br />
                  714.788.4500
                </p>
                <p>
                  <strong className="text-black">Location:</strong><br />
                  18952 MacArthur Blvd Suite 113<br />
                  Irvine, CA 92612
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            >
              <h2 className="font-serif text-5xl leading-tight mb-6" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>Working from</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                I work out of Colab Space in Irvine, California. If you're local and want to meet in person, we can do that. Otherwise, email and text work great.
              </p>
              <p className="text-gray-600 text-sm">
                No pressure. No sales calls unless you want one. Just real conversations about what you need.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center border-b-4 border-black pb-20"
        >
          <h2 className="font-serif text-4xl leading-tight mb-6" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>
            Every client I help is proof<br />that starting over works.
          </h2>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            Let's build your marketing automation together.
          </p>
          <Link to="/contact">
            <MagneticButton className="px-10 py-4 bg-black text-white font-medium uppercase tracking-wider border-2 border-black hover:bg-teal-500 hover:border-teal-500 transition-colors cursor-pointer inline-block">
              Start a Conversation
            </MagneticButton>
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
