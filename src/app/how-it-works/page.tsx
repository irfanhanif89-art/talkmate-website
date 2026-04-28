import PageHero from '@/components/PageHero'
import HowItWorks from '@/components/HowItWorks'
import FinalCTA from '@/components/FinalCTA'
import FeatureRow from '@/components/FeatureRow'
import DemoCard from '@/components/DemoCard'
import { CheckCircle2, MessageSquare, Phone, Sparkles, ListChecks, ArrowRight, Clock } from 'lucide-react'

const CALL_FLOW = [
  { icon: Phone, title: 'Answers in under 2 seconds', body: 'No matter the time of day. No hold music, no voicemail loops.' },
  { icon: ListChecks, title: 'Captures every detail', body: 'Name, phone, address, order, vehicle, urgency. Whatever your business needs.' },
  { icon: Sparkles, title: 'Upsells naturally', body: 'Suggests garlic bread on a fish order. Offers extras on a job. Never pushy.' },
  { icon: ArrowRight, title: 'Transfers when it matters', body: 'High-value caller, complaint, or anything outside its confidence zone goes straight to you.' },
  { icon: MessageSquare, title: 'SMS confirmation in seconds', body: "Customer gets a confirmation text before they've hung up." },
  { icon: CheckCircle2, title: 'Logs to your dashboard', body: 'Transcript, recording, outcome tag, attributed revenue. All searchable.' },
]

const TIMELINE = [
  { time: '0 min', title: 'Sign up', body: 'Pick a plan, create your account.' },
  { time: '15 min', title: '30-min onboarding call', body: "We capture your menu, hours, FAQs, and escalation rules. Live with you on screen-share." },
  { time: '2 hrs', title: 'Agent trained', body: 'Your AI agent is configured and tested. We call it ourselves before you do.' },
  { time: '4 hrs', title: 'Call forwarding set up', body: 'Forward your existing number, or use the dedicated TalkMate number we provide.' },
  { time: '24 hrs', title: 'You go live', body: 'Customer rings, AI answers. You watch the dashboard come alive.' },
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

      <HowItWorks />

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

      {/* Live in 24 hours timeline */}
      <section style={{ background: 'var(--light)' }}>
        <div className="section-pad" style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-eyebrow">Live in 24 hours</div>
            <h2 className="section-h dark">Sign up Monday. Live by <span style={{ color: 'var(--orange)' }}>Tuesday</span>.</h2>
            <p className="section-p dark" style={{ margin: '12px auto 0' }}>
              We don&apos;t do drawn-out integrations or 6-week kickoffs. You sign up, we onboard, you go live. Same week. Every time.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {TIMELINE.map((t, i) => (
              <div key={t.time} style={{
                background: 'white', border: '1px solid var(--edge)',
                borderRadius: 14, padding: '18px 22px',
                display: 'flex', gap: 18, alignItems: 'center',
              }}>
                <div style={{
                  width: 70, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                  background: i === TIMELINE.length - 1 ? 'rgba(34,197,94,0.1)' : 'rgba(232,98,42,0.1)',
                  borderRadius: 9, padding: '8px 6px',
                  fontSize: 12, fontWeight: 800,
                  color: i === TIMELINE.length - 1 ? '#16A34A' : 'var(--orange)',
                  letterSpacing: '0.04em',
                }}>
                  <Clock size={12} /> {t.time}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)' }}>{t.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>{t.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        heading={<>Book a 30-minute onboarding call and you&apos;ll be <span className="orange">live before the end of the week</span>.</>}
        sub="No salesperson reading from a script. A real person who'll listen to your business and have your AI live before Friday."
        primary="Book a Free Demo"
        primaryHref="/demo"
      />
    </>
  )
}
