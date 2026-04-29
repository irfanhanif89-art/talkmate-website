'use client'

const LOGOS: { name: string; colour: string; svg: string }[] = [
  {
    name: 'Google Calendar',
    colour: '#4285F4',
    svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="36" height="36" rx="4" fill="currentColor" opacity="0.12"/>
      <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" stroke-width="2.5" fill="none"/>
      <rect x="6" y="14" width="36" height="2.5" fill="currentColor"/>
      <line x1="16" y1="6" x2="16" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="32" y1="6" x2="32" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <text x="24" y="35" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor" font-family="sans-serif">31</text>
    </svg>`,
  },
  {
    name: 'Xero',
    colour: '#13B5EA',
    svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" fill="currentColor" opacity="0.12"/>
      <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="2.5" fill="none"/>
      <path d="M15 17 L24 24 L15 31M33 17 L24 24 L33 31" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    name: 'MYOB',
    colour: '#6633CC',
    svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="36" height="36" rx="6" fill="currentColor" opacity="0.12"/>
      <rect x="6" y="6" width="36" height="36" rx="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
      <text x="24" y="28" text-anchor="middle" font-size="11" font-weight="800" fill="currentColor" font-family="sans-serif">MYOB</text>
    </svg>`,
  },
  {
    name: 'Microsoft 365',
    colour: '#D83B01',
    svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="16" height="16" rx="2" fill="currentColor"/>
      <rect x="26" y="6" width="16" height="16" rx="2" fill="currentColor" opacity="0.7"/>
      <rect x="6" y="26" width="16" height="16" rx="2" fill="currentColor" opacity="0.7"/>
      <rect x="26" y="26" width="16" height="16" rx="2" fill="currentColor" opacity="0.5"/>
    </svg>`,
  },
  {
    name: 'Slack',
    colour: '#4A154B',
    svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="4.5" fill="currentColor"/>
      <circle cx="32" cy="32" r="4.5" fill="currentColor"/>
      <circle cx="32" cy="16" r="4.5" fill="currentColor" opacity="0.6"/>
      <circle cx="16" cy="32" r="4.5" fill="currentColor" opacity="0.6"/>
      <line x1="16" y1="16" x2="16" y2="32" stroke="currentColor" stroke-width="3"/>
      <line x1="32" y1="16" x2="32" y2="32" stroke="currentColor" stroke-width="3"/>
    </svg>`,
  },
  {
    name: 'Make.com',
    colour: '#6D00CC',
    svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="2.5" fill="none"/>
      <circle cx="24" cy="14" r="4" fill="currentColor"/>
      <circle cx="34" cy="29" r="4" fill="currentColor"/>
      <circle cx="14" cy="29" r="4" fill="currentColor"/>
      <path d="M24 18 L34 25M24 18 L14 25" stroke="currentColor" stroke-width="2" opacity="0.5"/>
    </svg>`,
  },
  {
    name: 'Zapier',
    colour: '#FF4A00',
    svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" fill="currentColor" opacity="0.1"/>
      <path d="M14 24 L24 14 L34 24 L24 34 Z" stroke="currentColor" stroke-width="2.5" fill="none"/>
      <circle cx="24" cy="24" r="4" fill="currentColor"/>
    </svg>`,
  },
  {
    name: 'WhatsApp',
    colour: '#25D366',
    svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" fill="currentColor" opacity="0.12"/>
      <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="2.5" fill="none"/>
      <path d="M17 30 C16 33 15 35 14 36 C17 35 19 34 20 33 C21.2 33.6 22.6 34 24 34 C29.5 34 34 29.5 34 24 C34 18.5 29.5 14 24 14 C18.5 14 14 18.5 14 24 C14 26.3 14.8 28.4 17 30Z" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    name: 'Stripe',
    colour: '#635BFF',
    svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="36" height="36" rx="8" fill="currentColor" opacity="0.12"/>
      <rect x="6" y="6" width="36" height="36" rx="8" stroke="currentColor" stroke-width="2.5" fill="none"/>
      <path d="M21 22 C21 20 22.5 19 24.5 19 C27 19 29 20.5 30 22 L33 20 C31.5 17.5 28.5 16 24.5 16 C20 16 17 18.5 17 22.5 C17 29 27 27.5 27 30.5 C27 32.5 25.5 33.5 23 33.5 C20 33.5 18 32 17 30 L14 32 C15.5 34.5 18.5 36 23 36 C27.5 36 31 33.5 31 29.5 C31 23 21 24.5 21 22Z" fill="currentColor"/>
    </svg>`,
  },
  {
    name: 'Twilio',
    colour: '#F22F46',
    svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" fill="currentColor" opacity="0.12"/>
      <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="2.5" fill="none"/>
      <circle cx="18" cy="18" r="3.5" fill="currentColor"/>
      <circle cx="30" cy="18" r="3.5" fill="currentColor"/>
      <circle cx="18" cy="30" r="3.5" fill="currentColor"/>
      <circle cx="30" cy="30" r="3.5" fill="currentColor"/>
    </svg>`,
  },
]

function Logo({ name, colour, svg }: { name: string; colour: string; svg: string }) {
  return (
    <div
      title={name}
      style={{
        flex: '0 0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: '0 32px',
        cursor: 'default',
      }}
      className="integration-logo"
    >
      <div
        style={{ width: 44, height: 44, color: '#94A3B8' }}
        className="logo-icon"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <span style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.02em', whiteSpace: 'nowrap' }} className="logo-label">
        {name}
      </span>
      <style>{`
        .integration-logo:hover .logo-icon { color: ${colour} !important; }
        .integration-logo:hover .logo-label { color: ${colour} !important; }
        .integration-logo .logo-icon { transition: color 0.2s ease; }
        .integration-logo .logo-label { transition: color 0.2s ease; }
      `}</style>
    </div>
  )
}

export default function IntegrationsRow() {
  return (
    <section style={{ background: 'var(--light)', borderTop: '1px solid var(--edge)', borderBottom: '1px solid var(--edge)', overflow: 'hidden', padding: '52px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 32, fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
        Plays nicely with your existing tools
      </div>

      {/* overflow hidden here prevents pre-hydration layout flash */}
      <div
        style={{ position: 'relative', overflow: 'hidden', minHeight: 76 }}
        className="marquee-outer"
      >
        <div className="marquee-track" style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}>
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <Logo key={`${logo.name}-${i}`} {...logo} />
          ))}
        </div>
      </div>
    </section>
  )
}
