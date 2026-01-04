import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { ArrowRight, Phone, AlertTriangle, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import MagneticButton from '../components/MagneticButton';
import Testimonials from '../components/Testimonials';
import Guarantee from '../components/Guarantee';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const phrases = [
    { first: 'marketing', second: 'automation', result: 'automate' },
    { first: 'websites', second: 'SEO', result: 'brand' },
    { first: 'forms', second: 'AI', result: 'automate' },
    { first: 'phone service', second: '24/7', result: 'automate' },
    { first: 'follow-ups', second: 'automation', result: 'nurture' },
    { first: 'CRM', second: 'email', result: 'nurture' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const automationItems = [
    {
      title: 'Lead Capture & Follow-Up',
      desc: 'Forms that work. Automated emails. CRM integration. Lead tracking.',
      link: '/services',
      hoverColor: 'hover:bg-teal-500',
    },
    {
      title: 'Client Communication',
      desc: 'Onboarding sequences. Status updates. Satisfaction surveys.',
      link: '/services',
      hoverColor: 'hover:bg-yellow-400',
    },
    {
      title: 'Business Operations',
      desc: 'Scheduling. Invoicing. Reminders. Document generation.',
      link: '/services',
      hoverColor: 'hover:bg-teal-500',
    },
    {
      title: 'Phone Management',
      desc: '24/7 answering. Lead qualification. Appointment booking.',
      link: '/services',
      hoverColor: 'hover:bg-yellow-400',
    },
    {
      title: 'Marketing Automation',
      desc: 'Email campaigns. Social posts. Content distribution.',
      link: '/services',
      hoverColor: 'hover:bg-teal-500',
    },
    {
      title: 'Custom Solutions',
      desc: 'Unique process? We build custom automation for you.',
      link: '/contact',
      hoverColor: 'hover:bg-yellow-400',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative border-b-4 border-black overflow-hidden bg-white">
        {/* Company icon as background design element */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
          <img 
            src="https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/BRanded-and-flow-icon.png"
            alt=""
            className="w-[800px] h-[800px] object-contain"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="max-w-4xl relative">
            {/* Animated rotating phrases */}
            <div className="mb-12 relative min-h-[80px] md:min-h-[100px] lg:min-h-[120px] flex items-end">
              <AnimatePresence mode="wait">
                <div
                  key={currentIndex}
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight animate-fadeIn"
                  style={{ opacity: 0.4 }}
                >
                  <div className="font-sans flex items-center gap-2 md:gap-3 flex-wrap">
                    <span className="font-bold text-black">{phrases[currentIndex].first}</span>
                    <span className="font-script text-teal-500 text-4xl md:text-5xl lg:text-6xl xl:text-7xl">+</span>
                    <span className="text-gray-600">{phrases[currentIndex].second}</span>
                    <span className="text-gray-400">=</span>
                    <span className="font-bold text-teal-500">{phrases[currentIndex].result}</span>
                  </div>
                </div>
              </AnimatePresence>
            </div>

            {/* Company Name */}
            <div className="mb-24 relative animate-fadeIn">
              {/* Icon positioned before the company name */}
              <div className="absolute -left-16 md:-left-24 top-0 bottom-0 flex items-center">
                <img 
                  src="https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/BRanded-and-flow-icon.png"
                  alt="Branded and Flow Icon"
                  className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain opacity-40"
                />
              </div>
              
              <h1 className="text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-tight font-black tracking-tight" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.15)' }}>
                <span className="font-sans">branded</span>
                <span className="font-script text-teal-500">+</span>
                <span className="font-script text-teal-500 italic">flow</span>
              </h1>
              
              {/* Tagline */}
              <div className="text-2xl md:text-3xl lg:text-4xl text-gray-500 mt-6 font-sans">
                <span className="font-bold">brand</span>
                <span className="font-script text-teal-500 mx-2">+</span>
                <span className="font-bold">automate</span>
                <span className="font-script text-teal-500 mx-2">+</span>
                <span className="font-bold">nurture</span>
              </div>
            </div>
            
            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-16 max-w-3xl">
              Marketing <span className="font-script text-teal-500 text-5xl md:text-6xl lg:text-7xl">+</span> automation for business owners tired of losing leads to confusion.
            </h2>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl leading-relaxed mb-16 text-gray-700 max-w-2xl">
              We build, redesign or upgrade your brand then integrate it with AI automation systems that capture leads, convert calls, and automate follow-ups.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-20">
              <Link to="/services">
                <MagneticButton className="group relative px-8 py-4 bg-yellow-400 text-black font-bold text-sm uppercase tracking-wider border-2 border-black rounded-md cursor-pointer transition-all duration-300 hover:bg-black hover:text-yellow-400 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>See Pricing</span>
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
                  </span>
                </MagneticButton>
              </Link>
              <Link to="/contact">
                <MagneticButton className="group relative px-8 py-4 bg-teal-500 text-black font-bold text-sm uppercase tracking-wider border-2 border-black rounded-md cursor-pointer transition-all duration-300 hover:bg-black hover:text-teal-500 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Claim Your Spot</span>
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
                  </span>
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Scrolling ticker - fullscreen width */}
        <div className="w-full overflow-hidden bg-gradient-to-r from-teal-500 to-yellow-400 py-4">
          <div className="flex whitespace-nowrap animate-scroll">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-8 mr-8">
                <span className="text-black text-lg tracking-wider">
                  Limited Client Acceptance each month due to demand. Contact us Today to claim your spot
                </span>
                <span className="text-black text-lg">•</span>
                <span className="font-serif italic text-black text-lg">
                  "Finally someone to help me understand the confusion of marketing" - Sarah M.
                </span>
                <span className="text-black text-lg">•</span>
                <span className="font-serif italic text-black text-lg">
                  "The AI phone service saves me hours every week" - David R.
                </span>
                <span className="text-black text-lg">•</span>
                <span className="font-serif italic text-black text-lg">
                  "AI automation I can actually understand and use" - Jennifer K.
                </span>
                <span className="text-black text-lg">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Cards */}
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-4 border-yellow-400 p-6 bg-white hover:bg-teal-500 transition-all duration-300 group cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-serif text-xl mb-3 italic">Websites That Convert</h3>
              <p className="text-sm text-gray-700 group-hover:text-black leading-relaxed">
                Turn visitors into leads. Capture contact info. Get found everywhere. No confusing tech jargon.
              </p>
            </div>

            <div className="border-4 border-teal-500 p-6 bg-black text-white hover:bg-yellow-400 hover:text-black transition-all duration-300 group cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-serif text-xl mb-3 italic">Never Miss a Lead Again</h3>
              <p className="text-sm group-hover:text-black leading-relaxed">
                24/7 phone answering. Every caller becomes a qualified lead. Automatically scheduled. Zero missed opportunities.
              </p>
            </div>

            <div className="border-4 border-black p-6 bg-white hover:bg-teal-500 transition-all duration-300 group cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-serif text-xl mb-3 italic">Automated Lead Follow-Up</h3>
              <p className="text-sm text-gray-700 group-hover:text-black leading-relaxed">
                Every lead gets instant response. Automated nurturing. Scheduled follow-ups. Turn prospects into customers on autopilot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing Buffer */}
      <div className="h-20"></div>

      {/* Problem/Solution Section */}
      <section className="border-b-4 border-black bg-gray-50">
        <div className="grid md:grid-cols-2">
          {/* PROBLEM SIDE - Dark, chaotic */}
          <div className="bg-black text-white border-r-4 border-black">
            <div className="p-8 md:p-12 lg:p-16 min-h-[600px] flex flex-col justify-center">
              <div className="flex items-start mb-6">
                <AlertTriangle className="text-yellow-400 flex-shrink-0 mr-3" size={40} strokeWidth={2} />
                <h3 className="text-4xl md:text-5xl font-black text-yellow-400 uppercase tracking-tight">Problem</h3>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-8">
                Losing leads every day?
              </h2>
              <div className="space-y-4">
                <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                  Most small business owners watch potential customers slip away daily.
                </p>
                <ul className="space-y-4 text-base md:text-lg border-l-4 border-yellow-400 pl-6">
                  <li className="text-gray-200">Missed calls = Lost revenue</li>
                  <li className="text-gray-200">Forgotten follow-ups = Dead leads</li>
                  <li className="text-gray-200">Confusing tech = Wasted time</li>
                  <li className="text-gray-200">No systems = Constant chaos</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SOLUTION SIDE - Clean, organized */}
          <div className="bg-white text-black">
            <div className="p-8 md:p-12 lg:p-16 min-h-[600px] flex flex-col justify-center">
              <div className="flex items-start mb-6">
                <Check className="text-teal-500 flex-shrink-0 mr-3" size={40} strokeWidth={3} />
                <h3 className="text-4xl md:text-5xl font-black text-teal-500 uppercase tracking-tight">Solution</h3>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-8">
                Systems that actually work.
              </h2>
              <div className="space-y-4">
                <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                  We build the automation you need. No jargon. Just results.
                </p>
                <ul className="space-y-4 text-base md:text-lg border-l-4 border-teal-500 pl-6">
                  <li className="text-gray-900 font-semibold">Websites that convert visitors</li>
                  <li className="text-gray-900 font-semibold">Phones that answer 24/7</li>
                  <li className="text-gray-900 font-semibold">Emails on autopilot</li>
                  <li className="text-gray-900 font-semibold">Systems that run without you</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing Buffer */}
      <div className="h-32"></div>

      {/* Phone Service Feature */}
      <section className="py-20 border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-3 mb-6 bg-black text-white px-4 py-2">
                <Phone className="text-teal-500" size={20} />
                <span className="font-mono text-xs uppercase tracking-wider">Most Popular Service</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-8">
                Never miss another call.
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed mb-8 text-gray-900">
                Every call answered. Every lead captured. Every appointment booked. Automatically. Professionally. 24/7.
              </p>
              
              <div className="border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-8 bg-black text-white space-y-6">
                  <div className="border-l-4 border-teal-500 pl-6 py-4">
                    <h4 className="font-serif text-xl mb-2 italic text-teal-500">Simple Setup</h4>
                    <p className="text-sm">We configure everything electronically. No technical knowledge needed.</p>
                  </div>
                  <div className="border-l-4 border-teal-500 pl-6 py-4">
                    <h4 className="font-serif text-xl mb-2 italic text-teal-500">Works 24/7</h4>
                    <p className="text-sm">Nights, weekends, holidays. Never misses a call. Never takes a break.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <img 
                src="https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/phone-business-call.png"
                alt="Professional business phone call handling"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* CTA for this section */}
          <div className="text-center mt-16">
            <Link to="/services">
              <MagneticButton className="group relative px-8 py-4 bg-yellow-400 text-black font-bold text-sm uppercase tracking-wider border-2 border-black rounded-md cursor-pointer transition-all duration-300 hover:bg-black hover:text-yellow-400 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>See Pricing</span>
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
                </span>
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Spacing Buffer */}
      <div className="h-32"></div>

      {/* What We Automate */}
      <section className="py-20 border-b-4 border-black bg-gradient-to-br from-teal-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-8">
              Stop doing everything manually.
            </h2>
            <p className="text-xl md:text-2xl text-gray-700">
              Whatever repetitive task is eating your time - we can probably automate it electronically.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {automationItems.map((item, index) => (
              <Link key={index} to={item.link}>
                <div className={`border-4 border-black p-8 bg-white ${item.hoverColor} transition-all duration-300 group cursor-pointer hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[200px] flex flex-col justify-between`}>
                  <div>
                    <h3 className="font-serif text-2xl mb-3 italic group-hover:text-black">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-700 group-hover:text-black">
                      {item.desc}
                    </p>
                  </div>
                  <ArrowRight className="mt-4 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-black" size={24} />
                </div>
              </Link>
            ))}
          </div>

          {/* CTA for this section */}
          <div className="text-center">
            <Link to="/services">
              <MagneticButton className="group relative px-8 py-4 bg-teal-500 text-black font-bold text-sm uppercase tracking-wider border-2 border-black rounded-md cursor-pointer transition-all duration-300 hover:bg-black hover:text-teal-500 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>View All Services & Pricing</span>
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
                </span>
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Spacing Buffer */}
      <div className="h-32"></div>

      {/* Website Section */}
      <section className="py-20 border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <img 
                src="https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/workspace-analytics.png"
                alt="Analytics dashboard showing website performance"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-8">
                Get found. Everywhere.
              </h2>
              <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-700">
                Your customers search on Google. They also ask ChatGPT, Claude, Perplexity. We optimize for both - traditional search AND AI assistants.
              </p>
              
              <div className="space-y-4">
                <div className="border-4 border-black p-6 bg-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <h4 className="font-serif text-xl mb-2 italic text-teal-400">Traditional Search</h4>
                  <p className="text-sm">Google, Bing, Yahoo. Clean, fast, mobile-friendly.</p>
                </div>
                <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <h4 className="font-serif text-xl mb-2 italic">AI Search</h4>
                  <p className="text-sm text-gray-700">ChatGPT, Claude, Perplexity cite your business.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA for this section */}
          <div className="text-center mt-16">
            <Link to="/contact">
              <MagneticButton className="group relative px-8 py-4 bg-teal-500 text-black font-bold text-sm uppercase tracking-wider border-2 border-black rounded-md cursor-pointer transition-all duration-300 hover:bg-black hover:text-teal-500 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
                </span>
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Spacing Buffer */}
      <div className="h-32"></div>

      {/* How It Works */}
      <section className="py-20 border-b-4 border-black bg-gradient-to-br from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-8">
              Three steps. That's it.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                num: '01',
                title: 'Tell Us What You Need',
                desc: 'Quick conversation. No sales pressure. Just honest talk about what\'s frustrating you.',
              },
              {
                num: '02',
                title: 'We Build It',
                desc: 'We handle everything electronically. Setup, configuration, testing. Updates in plain English.',
              },
              {
                num: '03',
                title: 'It Works',
                desc: 'Systems run automatically. Leads get captured. Calls get answered. You focus on your business.',
              },
            ].map((item, index) => (
              <div key={index} className="border-4 border-black p-8 bg-white hover:bg-teal-500 transition-all duration-300 group shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="font-mono text-4xl mb-4 text-teal-500 group-hover:text-black">
                  {item.num}
                </div>
                <h3 className="font-serif text-2xl mb-4 italic">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-700 group-hover:text-black">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA for this section */}
          <div className="text-center">
            <Link to="/services">
              <MagneticButton className="group relative px-8 py-4 bg-yellow-400 text-black font-bold text-sm uppercase tracking-wider border-2 border-black rounded-md cursor-pointer transition-all duration-300 hover:bg-black hover:text-yellow-400 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>See How It Works</span>
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
                </span>
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Spacing Buffer */}
      <div className="h-20"></div>

      {/* Testimonials */}
      <Testimonials />

      {/* Spacing Buffer */}
      <div className="h-20"></div>

      {/* Guarantee */}
      <Guarantee />

      {/* Spacing Buffer */}
      <div className="h-32"></div>

      {/* Final CTA */}
      <section className="py-32 border-b-4 border-black bg-gradient-to-br from-teal-50 via-white to-yellow-50 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/business-owner-laptop.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-8">
              Tired of being confused and overwhelmed?
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed mb-12 max-w-2xl mx-auto text-gray-700">
              Let's simplify your marketing automation. No jargon. No confusion. Just systems that work.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/services">
                <MagneticButton className="group relative px-8 py-4 bg-yellow-400 text-black font-bold text-sm uppercase tracking-wider border-2 border-black rounded-md cursor-pointer transition-all duration-300 hover:bg-black hover:text-yellow-400 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>View Pricing</span>
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
                  </span>
                </MagneticButton>
              </Link>
              <Link to="/contact">
                <MagneticButton className="group relative px-8 py-4 bg-teal-500 text-black font-bold text-sm uppercase tracking-wider border-2 border-black rounded-md cursor-pointer transition-all duration-300 hover:bg-black hover:text-teal-500 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Claim Your Spot</span>
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
                  </span>
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
