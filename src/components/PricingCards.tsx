'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'

export type BillingCycle = 'monthly' | 'annual'

export interface Plan {
  key: 'starter' | 'growth' | 'pro'
  name: string
  monthly: number
  annual: number          // 10× monthly — 2 months free
  annual_savings: number  // (monthly × 12) − annual
  setup_fee: number       // one-off
  pitch: string
  features: string[]
  popular?: boolean
  cta: string
  ctaHref: string
}

export const PLANS: Plan[] = [
  {
    key: 'starter',
    name: 'Starter',
    monthly: 299,
    annual: 2990,
    annual_savings: 598,
    setup_fee: 299,
    pitch: 'For single-location businesses that want to stop missing calls and start capturing every order.',
    features: [
      '1 location',
      '300 calls per month',
      '24/7 AI receptionist',
      'Order taking and FAQs',
      'Upselling on every call',
      'Live dashboard',
      'Email support',
    ],
    cta: 'Get Starter',
    ctaHref: 'https://app.talkmate.com.au/signup?plan=starter',
  },
  {
    key: 'growth',
    name: 'Growth',
    monthly: 499,
    annual: 4990,
    annual_savings: 998,
    setup_fee: 349,
    popular: true,
    pitch: 'For businesses ready to go further. All calls answered plus TalkMate Command via Telegram.',
    features: [
      'Everything in Starter',
      '800 calls per month',
      'Job scheduler with driver availability',
      '200 booking SMS confirmations and reminders per month',
      'Automated waitlist management',
      'Live distance quoting on calls',
      'Account client management',
      'TalkMate Command via Telegram',
      '50 commands per day',
      'Advanced analytics',
      'Priority support',
    ],
    cta: 'Get Growth',
    ctaHref: 'https://app.talkmate.com.au/signup?plan=growth',
  },
  {
    key: 'pro',
    name: 'Pro',
    monthly: 799,
    annual: 7990,
    annual_savings: 1598,
    setup_fee: 399,
    pitch: 'Built for multi-location businesses and high-volume operators.',
    features: [
      'Everything in Growth',
      'Unlimited calls',
      'Up to 3 locations',
      '500 booking SMS confirmations and reminders per month',
      'Unlimited commands per day',
      'Dedicated onboarding specialist',
      'Priority phone support',
    ],
    cta: 'Get Pro',
    ctaHref: 'https://app.talkmate.com.au/signup?plan=pro',
  },
]

const GUARANTEES = [
  'Setup included',
  '14-day money-back guarantee',
  'No lock-in contracts',
  'Cancel anytime',
]

function formatAud(n: number): string {
  return n.toLocaleString('en-AU')
}

export default function PricingCards({ background = 'light' }: { background?: 'light' | 'dark' }) {
  const isDark = background === 'dark'
  const [cycle, setCycle] = useState<BillingCycle>('monthly')
  const isAnnual = cycle === 'annual'

  return (
    <section style={{ background: isDark ? 'var(--navy)' : 'var(--light)', color: isDark ? 'white' : 'var(--navy)' }}>
      <div className="section-pad" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 className={isDark ? 'section-h' : 'section-h dark'}>
            One subscription. <span style={{ color: 'var(--orange)' }}>Save 2 months with annual.</span>
          </h2>
          <p className={isDark ? 'section-p' : 'section-p dark'} style={{ margin: '12px auto 0' }}>
            Simple monthly or annual pricing. Cancel anytime. Most clients break even within their first week.
          </p>
        </div>

        {/* Trust signal strip */}
        <div style={{
          background: isDark ? 'rgba(255,255,255,0.03)' : 'white',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'var(--edge)'}`,
          borderRadius: 100,
          padding: '10px 18px',
          display: 'flex', flexWrap: 'wrap', gap: 16,
          margin: '0 auto 24px',
          fontSize: 12,
          color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--muted)',
          alignItems: 'center', justifyContent: 'center',
          width: 'fit-content', maxWidth: '100%',
        }}>
          {GUARANTEES.map((g, i) => (
            <span key={g} style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
              <Check size={13} color="var(--green)" />
              {g}
              {i < GUARANTEES.length - 1 && <span style={{ marginLeft: 8, opacity: 0.4 }}>·</span>}
            </span>
          ))}
        </div>

        {/* Annual upsell pill — replaces the old "No setup fees" pill */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 10, marginBottom: 22,
          padding: '10px 18px', borderRadius: 99,
          background: isDark ? 'rgba(34,197,94,0.10)' : 'rgba(34,197,94,0.08)',
          border: '1px solid rgba(34,197,94,0.35)',
          width: 'fit-content', maxWidth: '100%',
          marginLeft: 'auto', marginRight: 'auto',
          color: '#22C55E', fontSize: 14, fontWeight: 700,
          fontFamily: 'Outfit, sans-serif', textAlign: 'center' as const,
        }}>
          <Sparkles size={16} color="#22C55E" />
          <span>2 months free on annual plans</span>
        </div>

        {/* Monthly / Annual toggle */}
        <div role="tablist" aria-label="Billing cycle" style={{
          display: 'flex', justifyContent: 'center', marginBottom: 30,
        }}>
          <div style={{
            display: 'inline-flex', gap: 4, padding: 4, borderRadius: 99,
            background: 'var(--navy)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <ToggleButton
              label="Monthly"
              active={!isAnnual}
              onClick={() => setCycle('monthly')}
            />
            <ToggleButton
              label="Annual"
              badge="2 MONTHS FREE"
              active={isAnnual}
              onClick={() => setCycle('annual')}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {PLANS.map(p => {
            const popular = p.popular
            const price = isAnnual ? p.annual : p.monthly
            const cardCta = isAnnual
              ? `Get Started — Save $${formatAud(p.annual_savings)}`
              : p.cta
            const cardHref = isAnnual
              ? `${p.ctaHref}&billing=annual`
              : `${p.ctaHref}&billing=monthly`

            return (
              <div key={p.name} style={{
                position: 'relative',
                background: isDark ? (popular ? 'linear-gradient(135deg, rgba(232,98,42,0.08), rgba(74,159,232,0.04))' : 'rgba(255,255,255,0.03)') : 'white',
                border: `${popular ? 2 : 1}px solid ${popular ? 'var(--orange)' : isDark ? 'rgba(255,255,255,0.07)' : 'var(--edge)'}`,
                borderRadius: 18,
                padding: 30,
                display: 'flex', flexDirection: 'column',
                boxShadow: popular && !isDark ? '0 12px 32px rgba(232,98,42,0.12)' : 'none',
                transform: isAnnual ? 'scale(1.015)' : 'scale(1)',
                transition: 'transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}>
                {popular && (
                  <span style={{
                    position: 'absolute', top: -12, right: 24,
                    background: 'var(--orange)', color: 'white',
                    fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
                    padding: '5px 12px', borderRadius: 99,
                  }}>MOST POPULAR</span>
                )}

                {popular && isAnnual && (
                  <span style={{
                    position: 'absolute', top: -12, left: 24,
                    background: 'var(--green)', color: 'white',
                    fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
                    padding: '5px 12px', borderRadius: 99,
                  }}>BEST VALUE</span>
                )}

                <div style={{ fontSize: 15, fontWeight: 700, color: isDark ? 'white' : 'var(--navy)', marginBottom: 8 }}>{p.name}</div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                  {isAnnual && (
                    <Sparkles size={20} color="var(--orange)" style={{ marginRight: 2, marginBottom: -2 }} />
                  )}
                  <span style={{ fontSize: 44, fontWeight: 800, color: isDark ? 'white' : 'var(--navy)', letterSpacing: '-1px' }}>
                    ${formatAud(price)}
                  </span>
                  <span style={{ fontSize: 14, color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--muted)' }}>
                    {isAnnual ? '/year' : '/month'}
                  </span>
                </div>

                {isAnnual ? (
                  <div style={{ fontSize: 12, color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--muted)', marginBottom: 6 }}>
                    Billed annually
                  </div>
                ) : null}

                <div style={{
                  fontSize: 12, color: isDark ? 'rgba(255,255,255,0.45)' : 'var(--muted)',
                  marginBottom: 12,
                }}>
                  One-off setup fee: ${p.setup_fee}
                </div>

                {isAnnual && (
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    alignSelf: 'flex-start',
                    padding: '4px 11px', borderRadius: 99,
                    background: 'rgba(34,197,94,0.12)',
                    border: '1px solid rgba(34,197,94,0.35)',
                    color: '#22C55E', fontSize: 12, fontWeight: 800,
                    marginBottom: 16,
                    animation: 'pricingSavingsPop 280ms ease-out',
                  }}>
                    Save ${formatAud(p.annual_savings)}
                  </div>
                )}

                <p style={{ fontSize: 14, color: isDark ? 'rgba(255,255,255,0.55)' : 'var(--muted)', lineHeight: 1.55, marginBottom: 22 }}>{p.pitch}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 22 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: isDark ? 'rgba(255,255,255,0.8)' : 'var(--navy)' }}>
                      <Check size={15} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <Link href={cardHref} style={{
                  display: 'block', width: '100%', textAlign: 'center',
                  padding: '13px 18px',
                  background: popular ? 'var(--orange)' : (isDark ? 'rgba(255,255,255,0.06)' : 'var(--navy)'),
                  color: 'white', border: 'none', borderRadius: 11,
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 14, fontWeight: 700, cursor: 'pointer', textDecoration: 'none',
                }}>
                  {cardCta} →
                </Link>
              </div>
            )
          })}
        </div>

        {/* Setup fee explainer — sits below cards, low-key */}
        <div style={{
          marginTop: 28, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto',
          padding: '18px 22px', borderRadius: 14,
          background: isDark ? 'rgba(255,255,255,0.03)' : '#F4F6F9',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'var(--edge)'}`,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: isDark ? 'rgba(255,255,255,0.45)' : 'var(--muted)', marginBottom: 6,
          }}>About the setup fee</div>
          <p style={{
            fontSize: 13, lineHeight: 1.65, margin: 0,
            color: isDark ? 'rgba(255,255,255,0.65)' : 'var(--muted)',
          }}>
            The one-off setup fee covers your dedicated AI receptionist configuration, voice tuning, business knowledge setup, and go-live support. Once you're live, it's just your monthly (or annual) subscription.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pricingSavingsPop {
          0%   { transform: scale(0.85); opacity: 0; }
          60%  { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  )
}

function ToggleButton({
  label, badge, active, onClick,
}: { label: string; badge?: string; active: boolean; onClick: () => void }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '10px 18px', borderRadius: 99, border: 'none', cursor: 'pointer',
        background: active ? 'var(--orange)' : 'transparent',
        color: active ? 'white' : 'rgba(255,255,255,0.7)',
        fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 700,
        transition: 'all 0.15s ease',
      }}
    >
      {label}
      {badge && (
        <span style={{
          fontSize: 9, fontWeight: 800, letterSpacing: '0.08em',
          padding: '2px 7px', borderRadius: 99,
          background: active ? 'rgba(255,255,255,0.18)' : 'rgba(34,197,94,0.18)',
          color: active ? 'white' : '#22C55E',
          border: `1px solid ${active ? 'rgba(255,255,255,0.25)' : 'rgba(34,197,94,0.35)'}`,
        }}>
          {badge}
        </span>
      )}
    </button>
  )
}
