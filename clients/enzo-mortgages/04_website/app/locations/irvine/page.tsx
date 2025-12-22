import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Loan Officer in Irvine CA | Enzo Mortgages",
  description: "Your trusted Irvine mortgage expert. Local market knowledge for Turtle Rock, Woodbridge, and all Irvine communities. Competitive rates and personalized service.",
};

export default function IrvinePage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative aspect-[21/9]  overflow-hidden mb-12">
            <Image
              src="/images/location/irvine.png"
              alt="Irvine, California"
              fill
              className="object-cover grayscale"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-zinc-400 text-sm uppercase tracking-wider mb-2">
                Serving Irvine
              </p>
              <h1 
                className="text-4xl md:text-5xl font-bold text-white"
                data-testid="text-location-title"
              >
                Irvine, CA
              </h1>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">
                Mortgage Solutions for Irvine
              </h2>
              <p className="text-zinc-300 leading-relaxed mb-6">
                Irvine is known for its master-planned communities, excellent schools, and 
                thriving business environment. We help residents navigate the competitive 
                Irvine real estate market with tailored mortgage solutions.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-8">
                From luxury homes in Turtle Rock to family-friendly neighborhoods in 
                Woodbridge, we understand the unique dynamics of Irvine&apos;s housing market.
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Areas Served</p>
                  <p className="text-zinc-200">Irvine, Tustin, Lake Forest</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Specialties</p>
                  <p className="text-zinc-200">Jumbo loans, First-time buyers, Refinancing</p>
                </div>
              </div>

              <Link
                href="/apply"
                className="inline-flex items-center justify-center bg-white px-8 py-4 text-base font-medium text-zinc-900"
                data-testid="button-get-started"
              >
                Get Started
              </Link>
            </div>

            <div className="relative aspect-square  overflow-hidden max-w-[280px] group">
              <Image
                src="/images/trust/client-handshake.png"
                alt="Client partnership"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          <div className="pt-12">
            <Link 
              href="/" 
              className="inline-flex items-center text-zinc-400 hover:text-white text-sm transition-colors"
              data-testid="link-back-home"
            >
              <span className="mr-2">&larr;</span> Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
