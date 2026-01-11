export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://enzomortgages.com",
    name: "Enzo Mortgages",
    description: "The Ferrari of Home Loans. Orange County mortgage experts providing premium home financing solutions.",
    url: "https://enzomortgages.com",
    telephone: "(714) 555-0100",
    email: "smahmoud@emortgagecapital.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Orange County",
      addressLocality: "Orange County",
      addressRegion: "CA",
      postalCode: "92701",
      addressCountry: "US",
    },
    areaServed: [
      {
        "@type": "County",
        name: "Orange County",
        containedInPlace: {
          "@type": "State",
          name: "California",
        },
      },
      {
        "@type": "State",
        name: "California",
      },
    ],
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
