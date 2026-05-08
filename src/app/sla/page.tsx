import Link from 'next/link'
import { Activity, Bell, Clock, BarChart, ArrowRight } from 'lucide-react'
import PageHero from '@/components/PageHero'

export const metadata = {
  title: 'Service Level Agreement · TalkMate',
  description: "TalkMate's uptime commitment, response times, and what happens if something goes wrong.",
}

interface Commitment {
  icon: typeof Activity
  headline: string
  body: string
  accent: string
}

const COMMITMENTS: Commitment[] = [
  {
    icon: Activity,
    headline: '99.9% uptime',
    body: 'TalkMate targets 99.9% monthly uptime for all voice agent services. Planned maintenance is scheduled outside of peak business hours and announced in advance via your portal and email.',
    accent: '#22C55E',
  },
  {
    icon: Bell,
    headline: '24/7 monitoring',
    body: 'Our systems are monitored around the clock. If something goes wrong, our team is alerted immediately and working on a fix before most clients even notice.',
    accent: '#1565C0',
  },
  {
    icon: Clock,
    headline: 'Fast incident response',
    body: 'Critical incidents affecting call answering are our highest priority. We aim to resolve critical issues within 2 hours and will communicate status updates throughout via status.talkmate.com.au.',
    accent: '#E8622A',
  },
  {
    icon: BarChart,
    headline: 'Full transparency',
    body: "Our public status page at status.talkmate.com.au shows real-time system status, active incidents, and historical uptime. You always know what's happening.",
    accent: '#8B5CF6',
  },
]

export default function SlaPage() {
  return (
    <>
      <PageHero
        eyebrow="Our commitment to you"
        title={<>We take uptime seriously. <span style={{ color: 'var(--orange)' }}>Your business depends on it.</span></>}
        sub="TalkMate is answering calls for your business 24 hours a day, 7 days a week. Here is exactly what we commit to."
      />

      <section style={{ background: 'var(--light)' }}>
        <div className="section-pad" style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 18,
          }}>
            {COMMITMENTS.map(c => {
              const Icon = c.icon
              return (
                <div
                  key={c.headline}
                  style={{
                    background: 'white',
                    border: '1px solid var(--edge)',
                    borderRadius: 16,
                    padding: 26,
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 11,
                    background: `${c.accent}1A`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 16,
                  }}>
                    <Icon size={22} color={c.accent} />
                  </div>
                  <h3 style={{
                    fontSize: 20, fontWeight: 800, color: 'var(--navy)',
                    letterSpacing: '-0.4px', marginBottom: 10,
                  }}>{c.headline}</h3>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
                    {c.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--light)', paddingTop: 0 }}>
        <div className="section-pad" style={{ maxWidth: 720, margin: '0 auto', paddingTop: 0 }}>
          <div style={{
            background: 'white',
            border: '1px solid var(--edge)',
            borderRadius: 16,
            padding: 32,
          }}>
            <h2 style={{
              fontSize: 24, fontWeight: 800, color: 'var(--navy)',
              letterSpacing: '-0.6px', lineHeight: 1.3, marginBottom: 14,
            }}>
              What happens if we miss our commitment?
            </h2>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 24 }}>
              If TalkMate experiences downtime that prevents your agent from answering calls, contact us at{' '}
              <Link href="mailto:hello@talkmate.com.au" style={{ color: 'var(--orange)', textDecoration: 'none', fontWeight: 600 }}>
                hello@talkmate.com.au
              </Link>
              . We will review the incident and apply a pro-rata credit to your next invoice for any verified outage exceeding 1 hour. We stand behind the product.
            </p>
            <Link
              href="https://status.talkmate.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, padding: '13px 24px' }}
            >
              View live system status <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
