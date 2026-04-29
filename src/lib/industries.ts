// Industry config — drives the overview page and every /industries/[slug] sub-page.
// Each entry has the brief's required fields: hero copy, demo conversation,
// "what TalkMate handles" bullets, Command examples, and a real testimonial
// where one is available.

export interface IndustryDef {
  slug: string
  name: string
  emoji: string
  tagline: string
  hero: { eyebrow: string; title: string; sub: string }
  handles: string[]      // 4-6 use cases
  demo: {
    business: string
    bubbles: Array<{ from: 'caller' | 'agent'; text: string; orange?: boolean }>
  }
  command: {
    intro: string
    examples: string[]
  }
  testimonial?: {
    quote: string
    name: string
    location: string
    badge: string
  }
  crm?: {
    intro: string
    useCases: string[]
  }
}

// CRM use cases per industry, surfaced on each /industries/[slug] page (Session 2 brief Part 6).
export const INDUSTRY_CRM: Record<string, { intro: string; useCases: string[] }> = {
  restaurants: {
    intro: 'Every caller becomes a contact. Regulars get spotted, lapsed regulars get flagged for win-back, and your CRM updates itself with every order.',
    useCases: [
      'Auto-tag callers by order frequency — Regulars, Lapsed Regulars, Delivery Customers',
      'Capture order history per customer including average value and most-ordered items',
      'Identify lapsed regulars (was a regular, hasn\'t called in 21+ days) for win-back SMS',
      'Find high-value upsell-accepting customers in one tap',
    ],
  },
  towing: {
    intro: 'Every breakdown call gets logged with vehicle details, location, and outcome. Regulars and account clients are tracked automatically.',
    useCases: [
      'Vehicle history per contact, including make/model/year',
      'Identify repeat breakdowns and account clients with one filter',
      'After-hours calls auto-tagged for bonus billing',
      'Driver dispatch can pull caller history before arriving at the scene',
    ],
  },
  real_estate: {
    intro: 'Every enquiry becomes a qualified lead with budget, pre-approval status, and suburb preferences. Pipeline view tracks every prospect from enquiry to settlement.',
    useCases: [
      'Auto-create leads from every enquiry call with extracted budget and pre-approval status',
      'Hot Leads list filters to pre-approved buyers — your highest-priority follow-ups',
      'Inspection bookings auto-move contacts to "Inspection Booked" pipeline stage',
      'Stale Leads list catches anyone in pipeline without contact for 14+ days',
    ],
  },
  trades: {
    intro: 'Every job enquiry is captured with property address, urgency, and service type. Quote requests get tagged for follow-up.',
    useCases: [
      'Quote Requested list shows all price enquiries from the last 30 days',
      'Recurring clients identified after 3+ calls — perfect for loyalty offers',
      'Emergency jobs auto-tagged "urgent" and routed to the top of your dashboard',
      'Property addresses tracked per contact for fast site lookup on return visits',
    ],
  },
  healthcare: {
    intro: 'Every patient call is logged with appointment outcome and follow-up needs. Lapsed patients get flagged for re-engagement.',
    useCases: [
      'Recent patients (last 30 days) and lapsed patients (42+ days) tracked automatically',
      'Appointment outcomes logged per contact including no-shows',
      'New-patient enquiries auto-tagged for intake follow-up',
      'Patient call history accessible from any device for the practice manager',
    ],
  },
  ndis: {
    intro: 'Every participant and support coordinator call is captured with care and respect. Contact history follows the participant, not just the call.',
    useCases: [
      'Participants and support coordinators tracked separately',
      'New enquiries flagged for plan-coordinator review within 24 hours',
      'Compliance-friendly call recording with consent prompt',
      'Service history per participant captured automatically',
    ],
  },
  retail: {
    intro: 'Stock enquiries, holds, and laybys all get logged per customer. Repeat customers and complaints rise to the top.',
    useCases: [
      'Repeat customers (3+ calls) tracked for loyalty programs',
      'Stock enquiries auto-tagged for follow-up when product arrives',
      'Complaints surfaced immediately for owner review',
      'Layby and hold history per customer at a glance',
    ],
  },
  professional_services: {
    intro: 'Every new enquiry becomes a qualified lead. Pipeline view tracks every prospect from first call to engaged client.',
    useCases: [
      'Auto-create leads from every enquiry with extracted matter type and urgency',
      'Unconverted Leads list catches enquiries that didn\'t book a follow-up',
      'Pipeline tracks consultations from booked through to engaged or closed lost',
      'Existing clients identified after 2+ calls for retention',
    ],
  },
}

export const INDUSTRIES: IndustryDef[] = [
  {
    slug: 'restaurants',
    name: 'Restaurants & Takeaway',
    emoji: '🍔',
    tagline: 'Stop missing orders during the dinner rush.',
    hero: {
      eyebrow: 'Restaurants & Takeaway',
      title: 'Never miss another order. Even on Friday night.',
      sub: 'TalkMate answers every call instantly, takes the order, upsells the sides, and SMS confirms. While your kitchen stays focused on cooking.',
    },
    handles: [
      'Takes orders with full menu knowledge',
      'Upsells garlic bread, drinks, and sides on every call',
      'Confirms delivery zones and ETAs',
      'Sends SMS confirmation with order summary',
      'Handles FAQs about hours, location, allergens',
      'Transfers complaints or special requests immediately',
    ],
    demo: {
      business: '🐟 Burleigh British Chippey',
      bubbles: [
        { from: 'caller', text: "G'day, can I get one large fish and chips?" },
        { from: 'agent', text: "No worries. Would you like garlic bread for $4 to go with that?" },
        { from: 'caller', text: 'Yeah throw it in.' },
        { from: 'agent', text: "What's the best number for the SMS confirmation?", orange: true },
      ],
    },
    command: {
      intro: 'Update the menu on the fly without touching a computer.',
      examples: [
        "Add tonight's special: Barramundi $28",
        "How many orders today?",
        "Pause agent — closing early",
        "Yesterday's revenue?",
      ],
    },
    testimonial: {
      quote: "TalkMate answered 187 calls last month while we were flat out during the dinner rush. We didn't miss a single order. It paid for itself in 4 days.",
      name: 'Anita & Ian, Burleigh British Chippey',
      location: 'Gold Coast',
      badge: '+$6,240 month 1',
    },
  },
  {
    slug: 'towing',
    name: 'Towing & Transport',
    emoji: '🚛',
    tagline: 'Capture every breakdown. Day or night.',
    hero: {
      eyebrow: 'Towing & Transport',
      title: 'Every stranded driver. Every breakdown. Captured.',
      sub: 'TalkMate logs the location, vehicle, and urgency, gives an honest ETA, and SMS-confirms the job ID before the driver hangs up.',
    },
    handles: [
      'Captures location, vehicle make/model, urgency',
      'Provides ETA based on driver availability',
      'Logs job ID and SMS confirms instantly',
      'Triages safety: stranded on motorway gets fast-tracked',
      'Books scheduled pickups for non-emergency tows',
      'Transfers in if the situation needs human judgement',
    ],
    demo: {
      business: '🚛 Hume Towing',
      bubbles: [
        { from: 'caller', text: "I've broken down on the M1 northbound, just past Robina." },
        { from: 'agent', text: "Got it. Are you safe? I'll send a tow now. Can I confirm your name and contact number?" },
        { from: 'caller', text: "Adam, 0412 555 234." },
        { from: 'agent', text: 'Job logged #TM-2847. ETA 28 minutes. Driver will SMS when 5 min away.', orange: true },
      ],
    },
    command: {
      intro: 'Run the dispatch board from your phone.',
      examples: [
        "How many jobs in progress?",
        "Read me the last 5 calls",
        "What's tonight's roster?",
        "Pause agent for 30 min",
      ],
    },
    testimonial: {
      quote: "I was driving at 11pm when a breakdown came in. TalkMate took the whole job, logged it, and sent the SMS confirmation. I just drove to the location.",
      name: 'Ben, Hume Towing',
      location: 'Gold Coast',
      badge: '+$8,100 month 1',
    },
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    emoji: '🏡',
    tagline: 'Qualify every buyer. Book every inspection.',
    hero: {
      eyebrow: 'Real Estate',
      title: 'Answers calls during open homes. Books inspections automatically.',
      sub: 'Every buyer enquiry gets qualified, every inspection gets booked, and every lead lands in your CRM with full context.',
    },
    handles: [
      'Qualifies buyers on budget and pre-approval',
      'Books inspections directly into your calendar',
      'Captures suburb preferences and timeline',
      'Answers calls during open homes when you can\'t',
      'Sends SMS confirmation with inspection details',
      'Logs lead source, urgency, and notes for follow-up',
    ],
    demo: {
      business: '🏡 Coastal Realty',
      bubbles: [
        { from: 'caller', text: 'Hi, I saw the listing on Norfolk Avenue, can I book an inspection?' },
        { from: 'agent', text: 'Sure. Are you pre-approved, and what budget range?' },
        { from: 'caller', text: 'Yes, pre-approved up to $1.2M.' },
        { from: 'agent', text: 'Inspection booked Saturday 11am. Confirmation SMS coming through.', orange: true },
      ],
    },
    command: {
      intro: 'Get pipeline answers without opening a CRM.',
      examples: [
        'How many buyer enquiries this week?',
        'Read me Saturday\'s inspections',
        'Send Norfolk Ave details to the last caller',
        'What\'s my best lead source this month?',
      ],
    },
  },
  {
    slug: 'trades',
    name: 'Trades & Services',
    emoji: '🔧',
    tagline: 'Same-day jobs booked while you\'re on the tools.',
    hero: {
      eyebrow: 'Trades & Services',
      title: 'Identifies emergencies. Transfers to you immediately.',
      sub: 'TalkMate triages the call, books standard jobs, captures the address, and gets a callback locked in before the customer hangs up.',
    },
    handles: [
      'Triage: emergency vs scheduled vs quote',
      'Books same-day jobs based on availability',
      'Captures address, problem description, urgency',
      'Confirms callback or arrival window via SMS',
      'Transfers true emergencies (burst pipe, no power) immediately',
      'Logs photos and notes when customer texts them in',
    ],
    demo: {
      business: '🔧 Reliable Plumbing',
      bubbles: [
        { from: 'caller', text: "There's water leaking out of my hot water system, it's spreading." },
        { from: 'agent', text: "Sounds urgent. I'll get someone out today. Address and best contact number?" },
        { from: 'caller', text: '12 Banksia Drive, Mermaid Waters. 0412 999 100.' },
        { from: 'agent', text: 'Booked for 3pm today. Plumber will SMS 30 min before arrival.', orange: true },
      ],
    },
    command: {
      intro: 'Run jobs and quotes from your ute.',
      examples: [
        'How many emergency jobs today?',
        'Send quote to Mike for $850',
        "What's my Friday looking like?",
        'Pause agent — on a job',
      ],
    },
  },
  {
    slug: 'healthcare',
    name: 'Healthcare & Clinics',
    emoji: '🏥',
    tagline: 'Every patient call answered with care.',
    hero: {
      eyebrow: 'Healthcare & Clinics',
      title: 'Books appointments. Answers questions. With care.',
      sub: 'TalkMate handles new appointment bookings, FAQ answers, and prescription enquiries. Clinical questions are always transferred to your team.',
    },
    handles: [
      'Books appointments based on practitioner availability',
      'Answers FAQs about hours, parking, insurance',
      'Captures patient name, contact, presenting concern',
      'Transfers clinical questions immediately',
      'Sends SMS appointment confirmations and reminders',
      'Handles cancellations and reschedules respectfully',
    ],
    demo: {
      business: '🏥 Coastal Medical',
      bubbles: [
        { from: 'caller', text: "Hi, I'd like to book an appointment with Dr Patel." },
        { from: 'agent', text: 'Sure. Is this for a routine review or something specific?' },
        { from: 'caller', text: 'Routine, please.' },
        { from: 'agent', text: 'Tuesday 2:30pm with Dr Patel. SMS confirmation coming through now.', orange: true },
      ],
    },
    command: {
      intro: 'Manage the schedule without leaving reception.',
      examples: [
        "How many appointments today?",
        'Send today\'s reminder list',
        "What's tomorrow's first appointment?",
        'Pause new bookings until 3pm',
      ],
    },
  },
  {
    slug: 'ndis',
    name: 'NDIS Providers',
    emoji: '💚',
    tagline: 'Compassionate, compliant call handling.',
    hero: {
      eyebrow: 'NDIS Providers',
      title: 'Empathetic. Compliant. Always available.',
      sub: 'Participants and support coordinators get a calm, professional response on every call. With full audit trail.',
    },
    handles: [
      'Participant enquiry intake with empathy',
      'Support coordinator scheduling and follow-ups',
      'Captures plan goals and service preferences',
      'Compliance-first call recording with consent prompt',
      'SMS confirmations with plain-language summaries',
      'Transfers any complex or sensitive matter to a coordinator',
    ],
    demo: {
      business: '💚 Coastal Support Services',
      bubbles: [
        { from: 'caller', text: "Hi, I'd like to ask about getting some support hours for my son." },
        { from: 'agent', text: 'Of course. I\'ll arrange a coordinator to call you back. Can I take your name and best contact number?' },
        { from: 'caller', text: 'Sarah, 0412 444 022. He\'s on a self-managed plan.' },
        { from: 'agent', text: 'Thanks Sarah. A coordinator will call within 24 hours. SMS confirmation on its way.', orange: true },
      ],
    },
    command: {
      intro: 'Stay on top of every participant interaction.',
      examples: [
        "Read me today's intake calls",
        'How many follow-ups overdue?',
        'Send the welcome pack to Sarah',
        "What's our roster gap this week?",
      ],
    },
  },
  {
    slug: 'retail',
    name: 'Retail',
    emoji: '🛍️',
    tagline: 'Stock checks, holds, and laybys answered automatically.',
    hero: {
      eyebrow: 'Retail',
      title: 'Stock enquiries answered in seconds.',
      sub: 'TalkMate checks availability, holds items for collection, and confirms layby instalments without pulling staff off the shop floor.',
    },
    handles: [
      'Real-time stock checks against your SKU list',
      'Holds items at the counter for 24 hours',
      'Layby setup, instalment reminders, balance enquiries',
      'Store hours, location, and parking FAQs',
      'SMS confirmation with hold reference',
      'Transfers price-match or special-order requests',
    ],
    demo: {
      business: '🛍️ Beach Lane Boutique',
      bubbles: [
        { from: 'caller', text: 'Do you have the linen blazer in size 12?' },
        { from: 'agent', text: "Yes, we've got two in stock. Want me to put one on hold for you?" },
        { from: 'caller', text: 'Please. I can come in this afternoon.' },
        { from: 'agent', text: "Held under your name til 5pm. SMS reference coming now.", orange: true },
      ],
    },
    command: {
      intro: 'Quick answers between customers.',
      examples: [
        "What's on hold today?",
        'Send today\'s sales total',
        'Pause agent during stocktake',
        'What\'s our top seller this week?',
      ],
    },
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    emoji: '⚖️',
    tagline: 'Qualifies leads before they reach you.',
    hero: {
      eyebrow: 'Professional Services',
      title: 'Qualifies new clients before they reach you.',
      sub: 'TalkMate captures the matter, urgency, and budget, books a consult into your calendar, and sends a confirmation. Your time stays focused on existing clients.',
    },
    handles: [
      'Qualifies new client matters by type, scope, urgency',
      'Books initial consultations directly into your calendar',
      'Sends prep instructions and intake form via SMS',
      'Handles fee enquiries with your standard rates',
      'Transfers complex matters or existing-client calls immediately',
      'Logs every enquiry for compliance and follow-up',
    ],
    demo: {
      business: '⚖️ Coastal Legal',
      bubbles: [
        { from: 'caller', text: "I'm looking at buying a property and need help with conveyancing." },
        { from: 'agent', text: 'Sure. Are you the buyer, and have you signed any contracts yet?' },
        { from: 'caller', text: "Buyer, no contracts signed." },
        { from: 'agent', text: '30-min consult booked Thursday 11am with Olivia. Intake form on the way via SMS.', orange: true },
      ],
    },
    command: {
      intro: 'Run the practice from your phone between meetings.',
      examples: [
        "How many new matters this week?",
        'Send invoice to Smith & Co for $2,450',
        "What's tomorrow's diary?",
        'Pause new bookings — out of office',
      ],
    },
  },
]

export function getIndustry(slug: string): IndustryDef | undefined {
  return INDUSTRIES.find(i => i.slug === slug)
}
