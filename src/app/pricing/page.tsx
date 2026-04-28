import PageHero from '@/components/PageHero'
import PricingCards from '@/components/PricingCards'
import FinalCTA from '@/components/FinalCTA'

const FAQS = [
  { q: 'What happens if I go over my call limit?', a: 'Calls above your plan limit are billed at $0.45 each. We send you alerts at 80% and 95% so you can upgrade if needed. No silent overages, ever.' },
  { q: 'Is there a setup fee?', a: 'No. There is never a setup fee. The price you see is the price you pay. Onboarding, configuration, and training are all included.' },
  { q: 'What does the 14-day money-back guarantee cover?', a: 'Full refund within 14 days of going live. No questions asked. If TalkMate isn\'t recovering revenue for you, we don\'t want to keep your money.' },
  { q: 'Can I change plans?', a: 'Yes. Anytime, from the portal. Changes apply immediately and prorate fairly.' },
]

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={<>Simple monthly pricing. <span style={{ color: 'var(--orange)' }}>No setup fees.</span></>}
        sub="Cancel anytime. Most clients break even within the first week. The Starter plan pays for itself with one missed order recovered per day."
      />

      <PricingCards />

      <section style={{ background: 'var(--navy)' }}>
        <div className="section-pad" style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 10 }}>Need more than 3 locations?</h3>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', marginBottom: 22, lineHeight: 1.65 }}>
            Talk to us about franchise and enterprise arrangements. We work with multi-site operators across Australia.
          </p>
          <a href="mailto:hello@talkmate.com.au?subject=Enterprise%20enquiry" className="btn-orange">Talk to us about enterprise →</a>
        </div>
      </section>

      <section style={{ background: 'var(--light)' }}>
        <div className="section-pad" style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="section-eyebrow">Pricing FAQ</div>
            <h2 className="section-h dark">Quick answers.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map(({ q, a }) => (
              <details key={q} style={{
                background: 'white', border: '1px solid var(--edge)', borderRadius: 12, padding: '16px 22px',
              }}>
                <summary style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {q}
                  <span style={{ color: 'var(--orange)', fontSize: 18, fontWeight: 700 }}>+</span>
                </summary>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, marginTop: 12 }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
