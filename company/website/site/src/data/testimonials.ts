export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  image?: string;
  linkedIn?: string;
  quote: string;
  result?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  videoUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'enzo-1',
    name: 'Enzo Mortgages',
    company: 'Enzo Mortgages',
    role: 'Mortgage Brokerage',
    quote: 'Branded and Flow transformed our entire digital presence. The website they built captures leads 24/7, and the automation system saves us 15+ hours per week on follow-ups.',
    result: '127% increase in qualified leads within 90 days',
    metrics: [
      { label: 'Lead Increase', value: '127%' },
      { label: 'Time Saved', value: '15 hrs/week' },
      { label: 'Conversion Rate', value: '73%' }
    ]
  },
  {
    id: 'sarah-m',
    name: 'Sarah Martinez',
    company: 'SM Consulting',
    role: 'Business Consultant',
    quote: 'Finally, someone who speaks plain English instead of marketing jargon. Jen built exactly what I needed - a simple website that actually brings in clients.',
    result: 'Went from 0 to 12 qualified leads per month',
    metrics: [
      { label: 'Monthly Leads', value: '12+' },
      { label: 'Lead Quality', value: 'High' },
      { label: 'ROI', value: '8x' }
    ]
  },
  {
    id: 'david-r',
    name: 'David Rodriguez',
    company: 'Rodriguez Law Firm',
    role: 'Attorney',
    quote: 'The AI phone system is a game-changer. I never miss a potential client call, even at 9 PM. It qualifies leads and books consultations automatically.',
    result: 'Zero missed calls, 40% more consultations booked',
    metrics: [
      { label: 'Missed Calls', value: '0' },
      { label: 'Consultations', value: '+40%' },
      { label: 'Client Satisfaction', value: '98%' }
    ]
  },
  {
    id: 'jennifer-k',
    name: 'Jennifer Kim',
    company: 'Wellness Studio OC',
    role: 'Studio Owner',
    quote: 'I was drowning in manual tasks - booking, reminders, follow-ups. Now everything runs automatically. I actually have time to focus on my clients again.',
    result: 'Saved 20 hours per week, revenue up 35%',
    metrics: [
      { label: 'Time Saved', value: '20 hrs/week' },
      { label: 'Revenue Growth', value: '35%' },
      { label: 'Client Retention', value: '92%' }
    ]
  },
  {
    id: 'michael-t',
    name: 'Michael Thompson',
    company: 'Thompson Remodeling',
    role: 'Contractor',
    quote: 'No more lost estimates or forgotten follow-ups. The CRM automation Jen set up keeps track of every lead and reminds me exactly when to follow up.',
    result: 'Closed 23% more jobs, $180K additional revenue',
    metrics: [
      { label: 'Close Rate', value: '+23%' },
      { label: 'Revenue Impact', value: '$180K' },
      { label: 'Lead Response', value: '<5 min' }
    ]
  },
  {
    id: 'lisa-c',
    name: 'Lisa Chen',
    company: 'OC Marketing Solutions',
    role: 'Marketing Director',
    quote: 'We needed help with our own marketing! Jen built us a lead magnet system that generates 50+ qualified leads monthly. The irony is not lost on us.',
    result: '50+ leads per month from content marketing',
    metrics: [
      { label: 'Monthly Leads', value: '50+' },
      { label: 'Email List Growth', value: '400%' },
      { label: 'Cost Per Lead', value: '$12' }
    ]
  }
];

export const featuredTestimonial: Testimonial = {
  id: 'enzo-featured',
  name: 'Enzo Mortgages',
  company: 'Enzo Mortgages',
  role: 'Mortgage Brokerage - Orange County',
  quote: 'We went from a basic website that got maybe 2 leads a month to a full automation system capturing 40+ qualified leads. The best part? Everything runs without us touching it. Branded and Flow didn\'t just build us a website - they built us a revenue machine.',
  result: 'From 2 leads/month to 40+ leads/month in 90 days',
  metrics: [
    { label: 'Lead Volume', value: '1,900%' },
    { label: 'Time Saved', value: '25 hrs/week' },
    { label: 'Revenue Impact', value: '$480K/year' },
    { label: 'ROI', value: '847%' }
  ]
};
