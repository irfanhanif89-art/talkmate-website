import { Phone, Brain, MessageSquare } from 'lucide-react'

const STEPS = [
  {
    icon: Phone,
    label: 'STEP 01',
    title: 'Customer calls your number',
    body: 'Forward your existing business number to your TalkMate AI line, or use a fresh dedicated number we provide. TalkMate answers in under 2 seconds, every time.',
  },
  {
    icon: Brain,
    label: 'STEP 02',
    title: 'AI takes the order, books the job, qualifies the lead',
    body: 'TalkMate is trained on your business. It speaks your menu, your prices, your hours. It upsells, captures details, and transfers to you when it matters.',
  },
  {
    icon: MessageSquare,
    label: 'STEP 03',
    title: 'SMS confirmation and dashboard logging',
    body: 'Every customer gets an SMS confirmation within seconds. Every call lands in your dashboard with a transcript, recording, and outcome tag. Ready to action.',
  },
]

export default function HowItWorks() {
  return (
    <section style={{ background: 'var(--light)', color: 'var(--navy)' }}>
      <div className="section-pad" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-eyebrow">How it works</div>
          <h2 className="section-h dark">Three steps. One missed call <span style={{ color: 'var(--orange)' }}>becomes a sale</span>.</h2>
          <p className="section-p dark" style={{ margin: '12px auto 0' }}>
            From the moment your phone rings, TalkMate has already answered, captured the order, and sent the confirmation.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {STEPS.map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} style={{
                background: 'white', border: '1px solid var(--edge)',
                borderRadius: 16, padding: 28,
              }}>
                <div style={{ width: 44, height: 44, background: 'rgba(232,98,42,0.1)', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon size={22} color="var(--orange)" />
                </div>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--orange)', letterSpacing: '0.2em', marginBottom: 10 }}>{s.label}</div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: 'var(--navy)', marginBottom: 10, lineHeight: 1.25 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{s.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
