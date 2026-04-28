const STATS = [
  { n: '<2s', l: 'Answer time' },
  { n: '24/7', l: 'Always on' },
  { n: '99.5%', l: 'Uptime SLA' },
  { n: '187', l: 'Calls / month avg' },
  { n: '$4.2K', l: 'Avg month 1 revenue recovered' },
]

export default function ProofBar() {
  return (
    <section style={{
      background: 'rgba(255,255,255,0.03)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '20px 24px',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 32, flexWrap: 'wrap',
      }}>
        {STATS.map((s, i) => (
          <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--orange)', letterSpacing: '-0.5px', lineHeight: 1, marginBottom: 4 }}>{s.n}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{s.l}</div>
            </div>
            {i < STATS.length - 1 && <div className="hidden md:block" style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.08)' }} />}
          </div>
        ))}
      </div>
    </section>
  )
}
