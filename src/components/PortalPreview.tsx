// Portal preview section. Until real screenshots are dropped into /public,
// we render a faithful CSS recreation that matches the talkmate-portal-redesign
// dashboard mockup so launch isn't blocked by missing assets.
export default function PortalPreview() {
  return (
    <section style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="section-pad" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-eyebrow">Your control panel</div>
          <h2 className="section-h">Everything in one place. <span className="blue">Always in your pocket.</span></h2>
          <p className="section-p" style={{ margin: '12px auto 0' }}>
            Real-time call data, ROI counter, transcripts, command history, billing. Designed for the way you actually run a business.
          </p>
        </div>

        <div style={{
          background: '#0A1E38', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18,
          padding: 28, display: 'grid', gap: 20,
          gridTemplateColumns: 'minmax(0, 1.3fr) minmax(220px, 1fr)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
        }} className="pp-grid">
          <style>{`@media (max-width: 800px) { .pp-grid { grid-template-columns: 1fr !important; } }`}</style>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(232,98,42,0.1), rgba(245,158,11,0.04))', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>EST. REVENUE PROTECTED BY TALKMATE</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#F59E0B', letterSpacing: '-1px', lineHeight: 1 }}>$4,287</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 6 }}>This month. Updated daily.</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
              {[
                { l: 'Calls today', v: '34', c: '#4A9FE8' },
                { l: 'Revenue captured', v: '$8,420', c: '#E8622A' },
                { l: 'Answer rate', v: '100%', c: '#22C55E' },
                { l: 'Avg upsell', v: '+$6.20', c: '#8B5CF6' },
              ].map(s => (
                <div key={s.l} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 11, padding: 14 }}>
                  <div style={{ height: 2, background: s.c, marginBottom: 10, marginLeft: -14, marginRight: -14, marginTop: -14 }} />
                  <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{s.l}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>{s.v}</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>Recent calls</div>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span className="pulse-dot" style={{ width: 5, height: 5, background: 'var(--green)', borderRadius: '50%' }} /> LIVE
                </span>
              </div>
              {[
                ['+61 412 ••• 234', 'Order Taken', '$54.50', '#22C55E'],
                ['+61 433 ••• 891', 'Booking Made', '$120', '#22C55E'],
                ['+61 401 ••• 008', 'FAQ Answered', '—', '#4A9FE8'],
              ].map(([phone, outcome, value, color], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(34,197,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 4.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 11a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'white' }}>{phone}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{outcome}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: color as string }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(74,159,232,0.06), rgba(232,98,42,0.04))', border: '1px solid rgba(74,159,232,0.2)', borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--bluel)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Command Centre</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 4 }}>WhatsApp connected</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>3 commands today · 47 left</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Today&apos;s commands</div>
              {[
                ['How many calls today?', 'success'],
                ['Pause agent for 1hr', 'success'],
                ['Send invoice to Mike', 'pending'],
              ].map(([cmd, outcome], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '7px 0', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div style={{ fontSize: 12, color: 'white' }}>&quot;{cmd}&quot;</div>
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 99,
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    background: outcome === 'success' ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.15)',
                    color: outcome === 'success' ? '#22C55E' : '#F59E0B',
                  }}>{outcome}</span>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 12, padding: 14, fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
              <strong style={{ color: '#22C55E' }}>🎉 Paying for itself</strong>
              <br />Day 9 · Captured revenue beat your $499 plan.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
