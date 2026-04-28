'use client'

export default function TalkButton() {
  return (
    <section id="hear-it-live" style={{
      padding: '96px 32px',
      background: 'linear-gradient(135deg, rgba(21,101,192,0.06), rgba(6,19,34,0))',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div className="section-eyebrow">Live Demo</div>
        <h2 className="section-h">Hear it before you <span className="orange">commit</span>.</h2>
        <p className="section-p" style={{ margin: '12px auto 0' }}>
          Tap to talk to TalkMate now. No setup, no signup. Just press the button and have a conversation.
        </p>

        <button
          type="button"
          onClick={() => {
            const w = window.open('https://app.talkmate.com.au?demo=1', '_blank')
            if (!w) alert('Pop-up blocked. Tap the button again.')
          }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 14,
            background: 'white', borderRadius: 100,
            padding: '14px 28px 14px 14px',
            cursor: 'pointer', border: 'none',
            margin: '32px 0 20px',
            transition: 'all 0.2s',
            fontFamily: 'Outfit, sans-serif',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
        >
          <span style={{ width: 48, height: 48, background: 'var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 4.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 11a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </span>
          <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--navy)', letterSpacing: '0.05em' }}>TALK TO TALKMATE</span>
          <span style={{ display: 'flex', gap: 3, alignItems: 'center', marginLeft: 4 }}>
            {[8, 16, 12, 20, 10].map((h, i) => (
              <span key={i} style={{
                width: 3, height: h, background: 'var(--navy)', borderRadius: 100,
                animation: `wave-bar 1.2s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }} />
            ))}
          </span>
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
          {['Real Australian voice', 'Real-time conversation', 'Try ordering, asking, transferring'].map(t => (
            <span key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>✓ {t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
