interface Testimonial {
  quote: string
  name: string
  business: string
  location: string
  badge: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "TalkMate answered 187 calls last month while we were flat out during the dinner rush. We didn't miss a single order. It paid for itself in 4 days.",
    name: 'Anita & Ian',
    business: 'Burleigh British Chippey',
    location: 'Gold Coast',
    badge: '+$6,240 month 1',
  },
  {
    quote: "I was driving at 11pm when a breakdown came in. TalkMate took the whole job, logged it, and sent the SMS confirmation. I just drove to the location.",
    name: 'Ben',
    business: 'Hume Towing',
    location: 'Gold Coast',
    badge: '+$8,100 month 1',
  },
  {
    quote: "Our Friday night rush was chaos. Staff couldn't answer the phone and cook. TalkMate fixed it in 24 hours. Saturday revenue went up 30%.",
    name: 'Marcus',
    business: 'The Golden Batter',
    location: 'Brisbane',
    badge: '+$5,600 month 1',
  },
]

export default function Testimonials() {
  return (
    <section style={{ background: 'var(--light)' }}>
      <div className="section-pad" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-eyebrow">Real Australian businesses</div>
          <h2 className="section-h dark">Real revenue. <span style={{ color: 'var(--orange)' }}>Real customers.</span></h2>
          <p className="section-p dark" style={{ margin: '12px auto 0' }}>
            From fish &amp; chip shops to tow trucks. TalkMate is making a measurable difference for businesses across Australia.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {TESTIMONIALS.map(t => (
            <div key={t.business} style={{
              background: 'white', border: '1px solid var(--edge)',
              borderRadius: 16, padding: 26,
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 16, color: '#F59E0B' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                ))}
              </div>
              <p style={{ fontSize: 15, color: 'var(--navy)', lineHeight: 1.65, marginBottom: 18, flex: 1 }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--edge)', paddingTop: 14 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.business} · {t.location}</div>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  padding: '5px 10px', borderRadius: 99,
                  background: 'rgba(34,197,94,0.12)',
                  color: '#16A34A',
                }}>{t.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
