import PageHero from '@/components/PageHero'
import HowItWorksIndustryPicker from '@/components/HowItWorksIndustryPicker'
import OnboardingSteps from '@/components/OnboardingSteps'
import FinalCTA from '@/components/FinalCTA'
import FeatureRow from '@/components/FeatureRow'
import DemoCard from '@/components/DemoCard'
import { CheckCircle2, MessageSquare, Phone, Sparkles, ListChecks, ArrowRight } from 'lucide-react'

const CALL_FLOW = [
  { icon: Phone, title: 'Answers in under 2 seconds', body: 'No matter the time of day. No hold music, no voicemail loops.' },
  { icon: ListChecks, title: 'Captures every detail', body: 'Name, phone, address, order, vehicle, urgency. Whatever your business needs.' },
  { icon: Sparkles, title: 'Upsells naturally', body: 'Suggests garlic bread on a fish order. Offers extras on a job. Never pushy.' },
  { icon: ArrowRight, title: 'Transfers when it matters', body: 'High-value caller, complaint, or anything outside its confidence zone goes straight to you.' },
  { icon: MessageSquare, title: 'SMS confirmation in seconds', body: "Customer gets a confirmation text before they've hung up." },
  { icon: CheckCircle2, title: 'Logs to your dashboard', body: 'Transcript, recording, outcome tag, attributed revenue. All searchable.' },
]

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={<>From missed call to <span style={{ color: 'var(--orange)' }}>captured revenue</span> in 4 seconds.</>}
        sub="TalkMate answers, captures, confirms, and logs every single inbound call. Here's exactly what happens when your phone rings."
        primary={{ label: 'Book a Free Demo', href: '/demo' }}
        secondary={{ label: 'See pricing', href: '/pricing' }}
      />

      <HowItWorksIndustryPicker />

      {/* What happens on every call */}
      <section style={{ background: 'var(--navy)' }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-eyebrow">Every single call</div>
            <h2 className="section-h">What happens when your <span className="orange">phone rings</span>.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(280px, 480px)', gap: 40, alignItems: 'flex-start' }} className="how-grid">
            <style>{`@media (max-width: 900px) { .how-grid { grid-template-columns: 1fr !important; } }`}</style>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {CALL_FLOW.map((f, i) => (
                <FeatureRow
                  key={f.title} icon={f.icon} title={f.title} body={f.body}
                  accent={['#E8622A', '#4A9FE8', '#22C55E', '#8B5CF6', '#F59E0B', '#EC4899'][i] || '#E8622A'}
                />
              ))}
            </div>
            <DemoCard />
          </div>
        </div>
      </section>

      <OnboardingSteps />

      <FinalCTA
        heading={<>Book a 30-minute onboarding call and you&apos;ll be <span className="orange">live before the end of the week</span>.</>}
        sub="No salesperson reading from a script. A real person who'll listen to your business and have your AI live before Friday."
        primary="Book a Free Demo"
        primaryHref="/demo"
      />
    </>
  )
}
