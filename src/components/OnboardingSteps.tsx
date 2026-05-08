// Three-card onboarding steps. Replaces the old "Sign up Monday, live
// Tuesday" timeline on /how-it-works.

const STEPS = [
  { num: '01', time: '5 minutes',     title: 'Tell us about your business' },
  { num: '02', time: 'Same day',      title: 'We configure your receptionist' },
  { num: '03', time: 'Within 24 hours', title: "You're live and answering every call" },
]

export default function OnboardingSteps() {
  return (
    <section style={{ background: 'var(--light)' }}>
      <div className="section-pad" style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="section-eyebrow">Live in 24 hours</div>
          <h2 className="section-h dark">
            Three steps. <span style={{ color: 'var(--orange)' }}>One day.</span>
          </h2>
          <p className="section-p dark" style={{ margin: '12px auto 0' }}>
            No drawn-out integrations. No 6-week kickoffs. From signup to live in a single day.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 18,
        }}>
          {STEPS.map(s => (
            <div
              key={s.num}
              style={{
                background: 'white',
                border: '1px solid var(--edge)',
                borderRadius: 16,
                padding: '26px 24px',
                textAlign: 'center' as const,
              }}
            >
              <div style={{
                fontSize: 42, fontWeight: 900, color: 'var(--orange)',
                letterSpacing: '-1.5px', lineHeight: 1, marginBottom: 10,
              }}>{s.num}</div>
              <div style={{
                fontSize: 11, fontWeight: 700,
                color: 'var(--muted)', letterSpacing: '0.08em',
                textTransform: 'uppercase' as const, marginBottom: 8,
              }}>{s.time}</div>
              <div style={{
                fontSize: 17, fontWeight: 700, color: 'var(--navy)',
                lineHeight: 1.35,
              }}>{s.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
