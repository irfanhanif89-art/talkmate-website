'use client'

import { useState } from 'react'
import { Phone, Brain, MessageSquare } from 'lucide-react'

// Industry-aware How It Works section. Used on /how-it-works only.
// Default state (no industry selected) renders the same generic 3 steps
// as the homepage HowItWorks component. Clicking a pill swaps the step
// titles and bodies to receptionist-named, industry-specific copy.

interface Step {
  title: string
  body: string
}

interface IndustryFlow {
  key: string
  label: string
  steps: [Step, Step, Step]
}

const GENERIC_STEPS: [Step, Step, Step] = [
  {
    title: 'Tell us about your business',
    body: 'Takes 5 minutes. Business name, phone number, your services, and how you want calls handled.',
  },
  {
    title: 'We configure your receptionist',
    body: 'Same day. We set up your AI receptionist with your specific business knowledge, tone, and call handling rules.',
  },
  {
    title: 'Your number goes live',
    body: 'Within 24 hours. Your receptionist starts answering every call. You get a dashboard to see every call, transcript, and outcome.',
  },
]

const INDUSTRY_FLOWS: IndustryFlow[] = [
  {
    key: 'restaurants',
    label: 'Restaurants',
    steps: [
      { title: 'Tell us about your menu and hours', body: 'Takes 5 minutes. Your menu items, prices, delivery zones, and opening hours.' },
      { title: 'We train Bella on your business', body: 'Same day. Your receptionist learns your full menu, upsell items, dietary options, and order flow.' },
      { title: 'Bella answers every order call', body: 'Within 24 hours. Orders taken, upsells offered, SMS confirmations sent. You focus on cooking.' },
    ],
  },
  {
    key: 'towing',
    label: 'Towing',
    steps: [
      { title: 'Tell us about your services and coverage', body: 'Takes 5 minutes. Your job types, service area, rates, and dispatch process.' },
      { title: 'We train Troy on your business', body: 'Same day. Troy learns every job type you handle, the right questions to ask, and how to capture job details.' },
      { title: 'Troy takes every dispatch call', body: 'Within 24 hours. Jobs logged, ETAs given, SMS confirmations sent to every caller automatically.' },
    ],
  },
  {
    key: 'real-estate',
    label: 'Real Estate',
    steps: [
      { title: 'Tell us about your agency and listings', body: 'Takes 5 minutes. Your agency name, areas you cover, and how you handle enquiries.' },
      { title: 'We train Charlotte on your business', body: 'Same day. Charlotte learns how to qualify buyers, book inspections, and handle after-hours calls.' },
      { title: 'Charlotte answers every property enquiry', body: "Within 24 hours. Buyers qualified, inspections booked, your pipeline building automatically while you're at open homes." },
    ],
  },
  {
    key: 'trades',
    label: 'Trades',
    steps: [
      { title: 'Tell us about your trade and service area', body: 'Takes 5 minutes. What you do, where you work, and how you handle job bookings.' },
      { title: 'We train Jake on your business', body: 'Same day. Jake learns your job types, how to triage urgency, and how to book call-backs correctly.' },
      { title: 'Jake answers every job enquiry', body: "Within 24 hours. Emergencies flagged, jobs booked, no enquiry falls through the cracks while you're on tools." },
    ],
  },
  {
    key: 'healthcare',
    label: 'Healthcare',
    steps: [
      { title: 'Tell us about your clinic and practitioners', body: 'Takes 5 minutes. Your services, practitioners, and appointment booking process.' },
      { title: 'We train Grace on your clinic', body: 'Same day. Grace learns your appointment types, billing options, and when to transfer calls urgently.' },
      { title: 'Grace manages every patient call', body: 'Within 24 hours. Appointments booked, patients triaged, your reception phone finally quiet.' },
    ],
  },
  {
    key: 'ndis',
    label: 'NDIS',
    steps: [
      { title: 'Tell us about your services and participants', body: 'Takes 5 minutes. Your support types, coverage areas, and intake process.' },
      { title: 'We train Sophie on your business', body: 'Same day. Sophie learns your services, funding categories, and how to handle participant and coordinator calls with care.' },
      { title: 'Sophie answers every enquiry', body: 'Within 24 hours. Participants and coordinators handled warmly and professionally every time.' },
    ],
  },
  {
    key: 'retail',
    label: 'Retail',
    steps: [
      { title: 'Tell us about your store and products', body: 'Takes 5 minutes. Your product range, opening hours, location, and common customer questions.' },
      { title: 'We train Mia on your business', body: 'Same day. Mia learns your stock, policies, and how to handle every type of customer enquiry.' },
      { title: 'Mia answers every customer call', body: 'Within 24 hours. Stock questions answered, orders taken, your team free to focus on in-store customers.' },
    ],
  },
  {
    key: 'professional-services',
    label: 'Professional Services',
    steps: [
      { title: 'Tell us about your firm and services', body: 'Takes 5 minutes. Your practice areas, team, and how you handle new client enquiries.' },
      { title: 'We train James on your business', body: 'Same day. James learns how to qualify new enquiries, book consultations, and handle existing client calls correctly.' },
      { title: 'James manages every incoming call', body: 'Within 24 hours. New clients qualified, consultations booked, your time protected.' },
    ],
  },
]

const STEP_ICONS = [Phone, Brain, MessageSquare] as const

export default function HowItWorksIndustryPicker() {
  const [activeKey, setActiveKey] = useState<string | null>(null)

  const activeFlow = INDUSTRY_FLOWS.find(f => f.key === activeKey)
  const steps: [Step, Step, Step] = activeFlow ? activeFlow.steps : GENERIC_STEPS

  return (
    <section style={{ background: 'var(--light)', color: 'var(--navy)' }}>
      <div className="section-pad" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className="section-eyebrow">How it works</div>
          <h2 className="section-h dark">
            Three steps. One missed call <span style={{ color: 'var(--orange)' }}>becomes a sale</span>.
          </h2>
          <p className="section-p dark" style={{ margin: '12px auto 0' }}>
            Pick your industry to see exactly what onboarding looks like for you.
          </p>
        </div>

        {/* Industry pill selector */}
        <div
          role="tablist"
          aria-label="Industry"
          style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: 8, marginBottom: 36,
          }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeKey === null}
            onClick={() => setActiveKey(null)}
            style={pillStyle(activeKey === null)}
          >All industries</button>
          {INDUSTRY_FLOWS.map(f => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={activeKey === f.key}
              onClick={() => setActiveKey(f.key)}
              style={pillStyle(activeKey === f.key)}
            >{f.label}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {steps.map((s, i) => {
            const Icon = STEP_ICONS[i]
            return (
              <div key={i} style={{
                background: 'white', border: '1px solid var(--edge)',
                borderRadius: 16, padding: 28,
              }}>
                <div style={{
                  width: 44, height: 44,
                  background: 'rgba(232,98,42,0.1)', borderRadius: 11,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18,
                }}>
                  <Icon size={22} color="var(--orange)" />
                </div>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--orange)', letterSpacing: '0.2em', marginBottom: 10 }}>
                  STEP 0{i + 1}
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: 'var(--navy)', marginBottom: 10, lineHeight: 1.25 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{s.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function pillStyle(active: boolean): React.CSSProperties {
  return {
    padding: '8px 16px',
    fontSize: 13, fontWeight: 600,
    fontFamily: 'Outfit, sans-serif',
    background: active ? 'var(--orange)' : 'white',
    color: active ? 'white' : 'var(--navy)',
    border: `1px solid ${active ? 'var(--orange)' : 'var(--edge)'}`,
    borderRadius: 99, cursor: 'pointer',
    transition: 'background 0.15s, color 0.15s, border-color 0.15s',
  }
}
