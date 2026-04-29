import Link from 'next/link'
import PageHero from '@/components/PageHero'
import FinalCTA from '@/components/FinalCTA'
import { ArrowRight, Building2, Layers, LifeBuoy, Trophy } from 'lucide-react'

const STEPS = [
  { n: '1', title: 'Share your referral link', body: 'Send via SMS, WhatsApp, or email. We write the message for you so you don\'t have to.' },
  { n: '2', title: 'They sign up and go live', body: 'Your referral completes their first billing month with 10+ calls answered.' },
  { n: '3', title: 'You earn every month', body: '15% of their subscription, paid on the 1st of every month, automatic bank transfer via Stripe.' },
]

const TIERS = [
  { tier: 'Starter Partner', range: '1 to 2 active referrals', rate: '15%', color: '#4A9FE8' },
  { tier: 'Silver Partner', range: '3 to 9 active referrals', rate: '20%', color: '#9CA3AF' },
  { tier: 'Gold Partner', range: '10 or more active referrals', rate: '25%', color: '#F59E0B' },
]

const EARNINGS = [
  { count: 1, monthly: 45, annual: 540 },
  { count: 3, monthly: 180, annual: 2160 },
  { count: 5, monthly: 300, annual: 3600 },
  { count: 10, monthly: 750, annual: 9000 },
  { count: 20, monthly: 1500, annual: 18000 },
]

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner program"
        title={<>Earn <span style={{ color: 'var(--green)' }}>monthly income</span> sharing TalkMate.</>}
        sub="Refer once. Earn every month. 15% of every subscription, paid into your bank on the 1st. No caps, no expiry."
        primary={{ label: 'Join the Partner Program', href: 'https://app.talkmate.com.au/refer-and-earn' }}
        secondary={{ label: 'Book a Demo', href: '/demo' }}
      />

      <section style={{ background: 'var(--navy)' }}>
        <div className="section-pad" style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-eyebrow">How it works</div>
            <h2 className="section-h">Refer once. <span className="orange">Earn every month.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {STEPS.map(s => (
              <div key={s.n} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, padding: 26,
              }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(232,98,42,0.15)', border: '1px solid rgba(232,98,42,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: 'var(--orange)', marginBottom: 14 }}>{s.n}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--light)' }}>
        <div className="section-pad" style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-eyebrow">Tiered earnings</div>
            <h2 className="section-h dark">The more you refer, <span style={{ color: 'var(--orange)' }}>the more you earn</span>.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {TIERS.map(t => (
              <div key={t.tier} style={{
                background: 'white', border: `1px solid var(--edge)`, borderRadius: 16, padding: 26, textAlign: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ height: 3, background: t.color, marginLeft: -26, marginRight: -26, marginTop: -26, marginBottom: 18 }} />
                <Trophy size={28} color={t.color} style={{ marginBottom: 10 }} />
                <div style={{ fontSize: 38, fontWeight: 800, color: t.color, letterSpacing: '-0.5px' }}>{t.rate}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginTop: 4 }}>{t.tier}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{t.range}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, background: 'white', border: '1px solid var(--edge)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--edge)' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)' }}>Estimated earnings, by referral count</h3>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Based on Starter plan at $299/mo. Growth and Pro referrals earn more.</p>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
              <thead>
                <tr style={{ background: 'var(--light)' }}>
                  {['Active referrals', 'Monthly earnings', 'Annual earnings'].map(h => (
                    <th key={h} style={{ padding: '12px 24px', textAlign: 'left' as const, fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EARNINGS.map((e, i) => (
                  <tr key={e.count} style={{ borderTop: i > 0 ? '1px solid var(--edge)' : 'none' }}>
                    <td style={{ padding: '14px 24px', fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>{e.count} referral{e.count > 1 ? 's' : ''}</td>
                    <td style={{ padding: '14px 24px', fontSize: 14, fontWeight: 700, color: 'var(--orange)' }}>${e.monthly.toLocaleString()}/mo</td>
                    <td style={{ padding: '14px 24px', fontSize: 14, fontWeight: 600, color: '#16A34A' }}>${e.annual.toLocaleString()}/yr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 14, fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
            Numbers reflect Starter plan referrals. Higher tiers and Growth/Pro referrals pay more.
          </p>
        </div>
      </section>

      {/* White-label section (Session 3 brief Part 7) */}
      <section style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-pad" style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-eyebrow">White label</div>
            <h2 className="section-h">Power your entire network with TalkMate <span className="orange">under your brand</span>.</h2>
            <p className="section-p" style={{ margin: '12px auto 0', maxWidth: 720 }}>
              Built for agencies, franchise groups, and industry networks. Your branding. Your pricing. Our infrastructure.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 36 }}>
            {[
              { icon: Building2, title: 'Your brand on every portal', body: 'Custom logo, colours, support contact, and (Gold tier) full removal of TalkMate branding. Your members log in to your portal — not ours.' },
              { icon: Layers, title: 'Earn on every agent in your network', body: 'Bulk pricing built for franchise groups and agencies. Take the margin between TalkMate wholesale and your retail price.' },
              { icon: LifeBuoy, title: 'Full support from the TalkMate team', body: 'Dedicated partner manager, priority engineering, and co-marketing collateral. We help you launch and stay successful.' },
            ].map(b => {
              const Icon = b.icon
              return (
                <div key={b.title} style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16, padding: 26,
                }}>
                  <div style={{ width: 44, height: 44, background: 'rgba(232,98,42,0.12)', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <Icon size={22} color="#E8622A" />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 8, letterSpacing: '-0.3px' }}>{b.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{b.body}</p>
                </div>
              )
            })}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link
              href="/demo?type=whitelabel"
              className="btn-orange"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, padding: '14px 26px' }}
            >
              Talk to us about white labelling <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA
        heading={<>Start earning from your <span className="orange">first referral</span>.</>}
        sub="Free to join. No minimum referrals. Paid the 1st of every month, automatic bank transfer."
        primary="Join the Partner Program"
        primaryHref="https://app.talkmate.com.au/refer-and-earn"
      />
    </>
  )
}
