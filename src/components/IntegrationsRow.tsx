const INTEGRATIONS = ['Google Calendar', 'Xero', 'Microsoft 365', 'Slack', 'Make.com', 'WhatsApp']

export default function IntegrationsRow() {
  return (
    <section style={{ background: 'var(--light)', borderTop: '1px solid var(--edge)' }}>
      <div className="section-pad" style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center', padding: '64px 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 26 }}>
          Plays nicely with your existing tools
        </div>
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'center', alignItems: 'center', gap: 32,
          opacity: 0.75,
        }}>
          {INTEGRATIONS.map(name => (
            <span key={name} style={{
              fontSize: 16, fontWeight: 600,
              color: 'var(--navy)', letterSpacing: '-0.3px',
            }}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
