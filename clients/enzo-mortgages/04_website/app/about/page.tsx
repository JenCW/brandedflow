import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Phone, Mail, MapPin, Award, Users, Clock, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Enzo | The Ferrari of Home Loans",
  description: "Meet Enzo, your trusted mortgage advisor in Orange County. With years of experience and a passion for helping families achieve homeownership.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section with Enzo's Photo */}
      <section className="py-20 px-6 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold mb-4 tracking-widest uppercase">
                Meet Your Loan Officer
              </p>
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-wide"
                data-testid="text-about-title"
              >
                About Enzo
              </h1>
              <p className="text-xl text-zinc-300 leading-relaxed mb-6">
                I'm Enzo, and I believe everyone deserves a trusted partner when navigating 
                one of life's biggest financial decisions. Whether you're buying your first 
                home or refinancing your current one, I'm here to guide you every step of the way.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-8">
                With deep roots in Orange County and a genuine passion for helping families 
                achieve their homeownership dreams, I've made it my mission to provide 
                personalized service, honest advice, and clear communication from start to finish.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="btn-luxury"
                  data-testid="button-about-apply"
                >
                  Work With Me
                </Link>
                <a
                  href="tel:+19495551234"
                  className="inline-flex items-center justify-center gap-2 border border-zinc-600 bg-transparent px-8 py-4 text-lg font-medium text-white transition-all hover:bg-zinc-800"
                  data-testid="button-about-call"
                >
                  <Phone className="w-5 h-5" /> Call Me
                </a>
              </div>
            </div>
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto rounded-full overflow-hidden border-4 border-zinc-800">
              <Image
                src="/images/hero/IMG_6062.webp"
                alt="Enzo - Your Mortgage Loan Officer"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wide text-center">
            My Story
          </h2>
          <div className="space-y-6">
            <p className="text-zinc-300 leading-relaxed text-lg">
              My journey into mortgage lending started with a simple belief: the home buying 
              process shouldn't be stressful or confusing. Too many families feel overwhelmed 
              by jargon, pressured by deadlines, and unsure who to trust.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              That's why I built my practice around transparency and accessibility. When you 
              work with me, you get direct access — not a call center, not a rotating door 
              of processors. I'm your point of contact from the first conversation through 
              closing day and beyond.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              I take the time to understand your unique situation, explain all your options 
              in plain language, and help you make the best decision for your family's future. 
              Because at the end of the day, it's not just about closing a loan — it's about 
              helping you achieve your dreams.
            </p>
          </div>
        </div>
      </section>

      {/* What Sets Me Apart */}
      <section className="py-20 px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 uppercase tracking-wide">
            What Sets Me Apart
          </h2>
          <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
            I'm not just another loan officer. Here's why clients choose to work with me.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-zinc-800 border border-zinc-700 p-6 text-center">
              <div className="w-16 h-16 bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Direct Access</h3>
              <p className="text-zinc-400 text-sm">
                Call or text me directly. No phone trees, no waiting on hold, no runaround.
              </p>
            </div>
            <div className="bg-zinc-800 border border-zinc-700 p-6 text-center">
              <div className="w-16 h-16 bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Personal Touch</h3>
              <p className="text-zinc-400 text-sm">
                Every client gets my full attention. Your loan isn't just a file number to me.
              </p>
            </div>
            <div className="bg-zinc-800 border border-zinc-700 p-6 text-center">
              <div className="w-16 h-16 bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Fast Response</h3>
              <p className="text-zinc-400 text-sm">
                Questions answered quickly. Updates provided proactively. Always in the loop.
              </p>
            </div>
            <div className="bg-zinc-800 border border-zinc-700 p-6 text-center">
              <div className="w-16 h-16 bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Honest Advice</h3>
              <p className="text-zinc-400 text-sm">
                I'll tell you if a loan doesn't make sense. Your best interest comes first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ferrari of Home Loans + Credentials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square max-w-md overflow-hidden rounded-lg">
              <Image
                src="/images/hero/IMG_6089.webp"
                alt="Enzo - Professional Headshot"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wide">
                The Ferrari of Home Loans
              </h2>
              <p className="text-zinc-300 leading-relaxed mb-6">
                Just like the Italian sports car, I believe in performance, precision, and 
                delivering an exceptional experience. When you work with me, you get speed 
                without sacrificing quality, expertise without the ego, and results that 
                exceed expectations.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-8">
                Trust is the luxury everyone deserves. Let me earn yours.
              </p>
              <div className="space-y-4 pt-6 border-t border-zinc-800">
                <div className="flex items-start gap-4">
                  <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium">Licensed Mortgage Loan Officer</p>
                    <p className="text-zinc-400 text-sm">NMLS #1984772</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium">E Mortgage Capital, Inc.</p>
                    <p className="text-zinc-400 text-sm">NMLS #1416824</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium">Orange County, California</p>
                    <p className="text-zinc-400 text-sm">Serving all of Southern California</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wide">
            Let's Talk About Your Goals
          </h2>
          <p className="text-zinc-300 mb-10 max-w-xl mx-auto">
            Whether you're just starting to explore your options or ready to move forward, 
            I'm here to help. Reach out anytime — no pressure, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/apply"
              className="btn-luxury"
              data-testid="button-get-started"
            >
              Get Pre-Qualified
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-zinc-600 text-white px-10 py-4 text-lg font-medium hover:bg-zinc-800 transition-colors"
              data-testid="button-contact"
            >
              Contact Me
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-zinc-400">
            <a href="tel:+19495551234" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-5 h-5" /> (949) 555-1234
            </a>
            <a href="mailto:enzo@enzomortgages.com" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-5 h-5" /> enzo@enzomortgages.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
