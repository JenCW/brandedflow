export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  location: string;
  challenge: string;
  solution: string[];
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  timeline: string;
  services: string[];
  image?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'enzo-mortgages',
    client: 'Enzo Mortgages',
    industry: 'Mortgage Brokerage',
    location: 'Orange County, CA',
    challenge: 'Enzo Mortgages had a basic website that wasn\'t generating leads. They were losing potential clients to competitors with better online presence. Manual follow-up processes meant slow response times and missed opportunities. They needed a complete digital transformation.',
    solution: [
      'Complete website redesign with conversion-optimized landing pages',
      'Multi-step application form with qualification logic',
      'Automated email sequences for different loan types',
      'Property valuation calculator for lead generation',
      'CRM integration with Airtable for lead management',
      'Lead scoring system to prioritize hot leads',
      'SMS and email automation for follow-ups'
    ],
    results: [
      {
        metric: 'Monthly Leads',
        before: '2-3',
        after: '40+',
        improvement: '+1,900%'
      },
      {
        metric: 'Lead Response Time',
        before: '4-6 hours',
        after: '< 5 minutes',
        improvement: '95% faster'
      },
      {
        metric: 'Conversion Rate',
        before: '12%',
        after: '27%',
        improvement: '+125%'
      },
      {
        metric: 'Time on Manual Tasks',
        before: '25 hrs/week',
        after: '3 hrs/week',
        improvement: '88% reduction'
      },
      {
        metric: 'Annual Revenue Impact',
        before: 'Baseline',
        after: '+$480,000',
        improvement: '847% ROI'
      }
    ],
    testimonial: 'We went from barely surviving to thriving. The automation system Jen built captures leads while we sleep, qualifies them automatically, and keeps them engaged until they\'re ready to close. This literally transformed our business.',
    testimonialAuthor: 'Enzo Mortgages Team',
    testimonialRole: 'Mortgage Brokers',
    timeline: '4 weeks to launch, results within 90 days',
    services: [
      'Website Design & Development',
      'Marketing Automation',
      'CRM Integration',
      'Lead Scoring System',
      'Email & SMS Automation'
    ],
    image: 'https://019b4537-1b7e-71a6-a3cc-5cc0e0226b5f.mochausercontent.com/workspace-analytics.png'
  },
  {
    id: 'law-firm-automation',
    client: 'Rodriguez Law Firm',
    industry: 'Legal Services',
    location: 'Irvine, CA',
    challenge: 'Missing calls from potential clients during court hours and evenings. Lengthy consultation booking process. No system for tracking leads or following up with prospects.',
    solution: [
      'AI phone answering service with legal intake questions',
      'Automated consultation booking via Calendly integration',
      'Client portal for document sharing and case updates',
      'Email automation for case status updates',
      'Lead tracking system with engagement scoring',
      'Automated review request system'
    ],
    results: [
      {
        metric: 'Missed Calls',
        before: '15-20/week',
        after: '0',
        improvement: '100% reduction'
      },
      {
        metric: 'Consultations Booked',
        before: '8/month',
        after: '22/month',
        improvement: '+175%'
      },
      {
        metric: 'Client Satisfaction',
        before: '82%',
        after: '98%',
        improvement: '+20%'
      },
      {
        metric: 'Time on Admin Tasks',
        before: '18 hrs/week',
        after: '5 hrs/week',
        improvement: '72% reduction'
      }
    ],
    testimonial: 'The AI phone system is incredible. Potential clients can reach us 24/7, get their questions answered, and book consultations without waiting for office hours. Our intake process went from painful to seamless.',
    testimonialAuthor: 'David Rodriguez',
    testimonialRole: 'Attorney',
    timeline: '3 weeks implementation',
    services: [
      'AI Phone Service',
      'Client Portal',
      'Automated Booking',
      'Email Automation',
      'Lead Management'
    ]
  },
  {
    id: 'wellness-studio',
    client: 'Wellness Studio OC',
    industry: 'Health & Wellness',
    location: 'Newport Beach, CA',
    challenge: 'Studio owner spending 20+ hours per week on booking, reminders, follow-ups, and client communication. High no-show rate. Inconsistent marketing efforts.',
    solution: [
      'Automated booking system with class capacity management',
      'SMS and email reminder sequences',
      'New client onboarding automation',
      'Membership renewal automation',
      'Class package upsell sequences',
      'Review and referral request automation',
      'Social media posting automation'
    ],
    results: [
      {
        metric: 'Time Saved',
        before: 'Baseline',
        after: '20 hrs/week',
        improvement: '50% time freed'
      },
      {
        metric: 'No-Show Rate',
        before: '23%',
        after: '6%',
        improvement: '74% reduction'
      },
      {
        metric: 'Revenue',
        before: 'Baseline',
        after: '+$42K/year',
        improvement: '+35%'
      },
      {
        metric: 'Client Retention',
        before: '68%',
        after: '92%',
        improvement: '+35%'
      }
    ],
    testimonial: 'I got my life back. The automation handles all the tedious stuff I used to spend evenings doing. Now I can focus on teaching and growing the business instead of drowning in admin work.',
    testimonialAuthor: 'Jennifer Kim',
    testimonialRole: 'Studio Owner',
    timeline: '2 weeks setup, ongoing optimization',
    services: [
      'Booking Automation',
      'Client Communication',
      'Reminder Systems',
      'Upsell Sequences',
      'Social Media Automation'
    ]
  }
];

export const successMetrics = {
  totalClientsHelped: 47,
  averageROI: '687%',
  totalTimeSaved: '1,200+ hours/month',
  averageLeadIncrease: '340%',
  clientRetention: '94%',
  averageSatisfaction: '4.9/5'
};
