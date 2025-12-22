import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Loan Officer in Santa Ana CA | Enzo Mortgages",
  description: "Santa Ana-based mortgage loan officer serving Orange County. Local expertise, trusted guidance, and personalized home financing solutions.",
};

export default function SantaAnaPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative aspect-[21/9]  overflow-hidden mb-12">
            <Image
              src="/images/location/santa-ana.png"
              alt="Santa Ana, California"
              fill
              className="object-cover grayscale"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-zinc-400 text-sm uppercase tracking-wider mb-2">
                Our Home Office
              </p>
              <h1 
                className="text-4xl md:text-5xl font-bold text-white"
                data-testid="text-location-title"
              >
                Santa Ana, CA
              </h1>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">
                Serving Orange County
              </h2>
              <p className="text-zinc-300 leading-relaxed mb-6">
                Located in the heart of Orange County, our Santa Ana office serves as the 
                headquarters for Enzo Mortgages. From here, we provide personalized mortgage 
                solutions to homebuyers and homeowners throughout Southern California.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-8">
                Whether you&apos;re purchasing your first home, refinancing, or exploring 
                investment opportunities, our experienced team is ready to guide you through 
                every step of the process.
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Address</p>
                  <p className="text-zinc-200">Santa Ana, CA</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Service Area</p>
                  <p className="text-zinc-200">Orange County and surrounding areas</p>
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
                src="/images/trust/consultation-meeting.png"
                alt="Professional consultation"
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
