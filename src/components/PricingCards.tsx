import Link from 'next/link'
import { Check } from 'lucide-react'

export interface Plan {
  name: string
  price: number
  pitch: string
  features: string[]
  popular?: boolean
  cta: string
  ctaHref: string
}

export const PLANS: Plan[] = [
  {
    name: 'Starter',
    price: 299,
    pitch: 'For single-location businesses that want to stop missing calls and start capturing every order.',
    features: [
      '1 location',
      '300 calls per month',
      '24/7 AI voice agent',
      'Order taking and FAQs',
      'Upselling on every call',
      'SMS confirmations',
      'Live dashboard',
      'Email support',
    ],
    cta: 'Get Starter',
    ctaHref: '/demo',
  },
  {
    name: 'Growth',
    price: 499,
    popular: true,
    pitch: 'For businesses ready to go further. All calls answered plus TalkMate Command via WhatsApp.',
    features: [
      'Everything in Starter',
      '800 calls per month',
      'TalkMate Command',
      'WhatsApp / Telegram assistant',
      '50 commands per day',
      'Advanced analytics',
      'Priority support',
    ],
    cta: 'Get Growth',
    ctaHref: '/demo',
  },
  {
    name: 'Pro',
    price: 799,
    pitch: 'Built for multi-location businesses and high-volume operators.',
    features: [
      'Everything in Growth',
      'Unlimited calls',
      'Up to 3 locations',
      'Unlimited commands per day',
      'Dedicated onboarding specialist',
      'Priority phone support',
    ],
    cta: 'Get Pro',
    ctaHref: '/demo',
  },
]

const GUARANTEES = [
  'No setup fees',
  '14-day money-back guarantee',
  'No lock-in',
  'Cancel anytime',
]

export default function PricingCards({ background = 'light' }: { background?: 'light' | 'dark' }) {
  const isDark = background === 'dark'
  return (
    <section style={{ background: isDark ? 'var(--navy)' : 'var(--light)', color: isDark ? 'white' : 'var(--navy)' }}>
      <div className="section-pad" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 className={isDark ? 'section-h' : 'section-h dark'}>
            One subscription. <span style={{ color: 'var(--orange)' }}>No setup fees, ever.</span>
          </h2>
          <p className={isDark ? 'section-p' : 'section-p dark'} style={{ margin: '12px auto 0' }}>
            Simple monthly pricing. Cancel anytime. Most clients break even within their first week.
          </p>
        </div>

        <div style={{
          background: isDark ? 'rgba(255,255,255,0.03)' : 'white',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'var(--edge)'}`,
          borderRadius: 100,
          padding: '10px 18px',
          display: 'inline-flex',
          flexWrap: 'wrap',
          gap: 16,
          margin: '0 auto 36px',
          fontSize: 12,
          color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--muted)',
          alignItems: 'center', justifyContent: 'center',
          width: 'fit-content',
        }}>
          {GUARANTEES.map((g, i) => (
            <span key={g} style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
              <Check size={13} color="var(--green)" />
              {g}
              {i < GUARANTEES.length - 1 && <span style={{ marginLeft: 8, opacity: 0.4 }}>·</span>}
            </span>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {PLANS.map(p => {
            const popular = p.popular
            return (
              <div key={p.name} style={{
                position: 'relative',
                background: isDark ? (popular ? 'linear-gradient(135deg, rgba(232,98,42,0.08), rgba(74,159,232,0.04))' : 'rgba(255,255,255,0.03)') : 'white',
                border: `${popular ? 2 : 1}px solid ${popular ? 'var(--orange)' : isDark ? 'rgba(255,255,255,0.07)' : 'var(--edge)'}`,
                borderRadius: 18,
                padding: 30,
                display: 'flex', flexDirection: 'column',
                boxShadow: popular && !isDark ? '0 12px 32px rgba(232,98,42,0.12)' : 'none',
              }}>
                {popular && (
                  <span style={{
                    position: 'absolute', top: -12, right: 24,
                    background: 'var(--orange)', color: 'white',
                    fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
                    padding: '5px 12px', borderRadius: 99,
                  }}>MOST POPULAR</span>
                )}
                <div style={{ fontSize: 15, fontWeight: 700, color: isDark ? 'white' : 'var(--navy)', marginBottom: 8 }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
                  <span style={{ fontSize: 44, fontWeight: 800, color: isDark ? 'white' : 'var(--navy)', letterSpacing: '-1px' }}>${p.price}</span>
                  <span style={{ fontSize: 14, color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--muted)' }}>/month</span>
                </div>
                <p style={{ fontSize: 14, color: isDark ? 'rgba(255,255,255,0.55)' : 'var(--muted)', lineHeight: 1.55, marginBottom: 22 }}>{p.pitch}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 22 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: isDark ? 'rgba(255,255,255,0.8)' : 'var(--navy)' }}>
                      <Check size={15} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <Link href={p.ctaHref} style={{
                  display: 'block', width: '100%', textAlign: 'center',
                  padding: '13px 18px',
                  background: popular ? 'var(--orange)' : (isDark ? 'rgba(255,255,255,0.06)' : 'var(--navy)'),
                  color: 'white', border: 'none', borderRadius: 11,
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 14, fontWeight: 700, cursor: 'pointer', textDecoration: 'none',
                }}>
                  {p.cta} →
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
