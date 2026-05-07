import type { ChatLine } from '@/lib/receptionists'

// Same visual treatment as the homepage IndustryDemo card.
// Renders a sample call as alternating bubbles, with `agent_upsell` styled
// in orange to highlight upsell moments.
export default function ReceptionistChat({
  business, lines,
}: {
  business: string
  lines: ChatLine[]
}) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 18, overflow: 'hidden',
    }}>
      <div style={{
        padding: '14px 18px',
        background: 'rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{business}</span>
        </div>
        <span style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 11, fontWeight: 700, color: 'var(--green)', letterSpacing: '0.1em',
        }}>
          <span className="pulse-dot" style={{ width: 6, height: 6, background: 'var(--green)', borderRadius: '50%' }} /> LIVE
        </span>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {lines.map((l, i) => {
          const isCaller = l.role === 'caller'
          const isUpsell = l.role === 'agent_upsell'
          return (
            <div
              key={i}
              style={{
                maxWidth: '84%',
                padding: '10px 14px', borderRadius: 14,
                fontSize: 13, lineHeight: 1.55,
                alignSelf: isCaller ? 'flex-start' : 'flex-end',
                background: isCaller
                  ? 'rgba(255,255,255,0.07)'
                  : (isUpsell ? 'var(--orange)' : 'var(--blue)'),
                color: isCaller ? 'rgba(255,255,255,0.85)' : 'white',
                border: isCaller ? '1px solid rgba(255,255,255,0.08)' : 'none',
                borderBottomLeftRadius: isCaller ? 4 : 14,
                borderBottomRightRadius: isCaller ? 14 : 4,
              }}
            >
              {l.text}
            </div>
          )
        })}
      </div>
    </div>
  )
}
