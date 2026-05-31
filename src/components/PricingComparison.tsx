import { Check, X } from 'lucide-react'

interface Row {
  feature: string
  starter: boolean
  growth: boolean
  pro: boolean
}

const ROWS: Row[] = [
  { feature: 'AI Website Chatbot', starter: false, growth: true, pro: true },
  { feature: 'ROI Dashboard', starter: true, growth: true, pro: true },
  { feature: 'Missed Call Win-back', starter: true, growth: true, pro: true },
  { feature: 'Google Review Requests', starter: true, growth: true, pro: true },
  { feature: 'Two-way SMS Inbox', starter: false, growth: true, pro: true },
  { feature: 'Train TalkMate', starter: true, growth: true, pro: true },
]

const PLAN_HEADS = ['Starter', 'Growth', 'Pro'] as const

function Cell({ on }: { on: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {on ? (
        <span
          aria-label="Included"
          style={{
            width: 26, height: 26, borderRadius: '50%',
            background: 'rgba(34,197,94,0.12)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Check size={15} color="var(--green)" />
        </span>
      ) : (
        <span
          aria-label="Not included"
          style={{
            width: 26, height: 26, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <X size={15} color="rgba(255,255,255,0.3)" />
        </span>
      )}
    </div>
  )
}

export default function PricingComparison() {
  return (
    <section style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="section-pad" style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="section-eyebrow">Compare plans</div>
          <h2 className="section-h">What is included <span className="orange">on each plan</span>.</h2>
        </div>

        <div style={{
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1.6fr) repeat(3, minmax(70px,1fr))',
            alignItems: 'center',
            padding: '16px 20px',
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Feature</div>
            {PLAN_HEADS.map(h => (
              <div key={h} style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: 'white' }}>{h}</div>
            ))}
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.feature}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0,1.6fr) repeat(3, minmax(70px,1fr))',
                alignItems: 'center',
                padding: '15px 20px',
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{row.feature}</div>
              <Cell on={row.starter} />
              <Cell on={row.growth} />
              <Cell on={row.pro} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
