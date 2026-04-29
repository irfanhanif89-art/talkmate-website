// Session 2 brief Part 6 — CRM homepage section. Sits between PortalPreview
// and Testimonials.

import { Database, ListFilter, MessageCircle } from 'lucide-react'

const CARDS = [
  {
    icon: Database,
    title: 'Contacts built from calls',
    body: 'Every unique caller becomes a contact with their name, history, and what they asked about. No forms, no manual data entry, no spreadsheets.',
  },
  {
    icon: ListFilter,
    title: 'Smart lists that update themselves',
    body: 'Regulars, lapsed customers, complaints, hot leads. Filtered lists that stay current automatically as TalkMate captures new calls.',
  },
  {
    icon: MessageCircle,
    title: 'Query from anywhere',
    body: 'Ask TalkMate Command "Who are my top callers?" or "Find Christina" from WhatsApp while you\'re driving. Your CRM in your pocket.',
  },
]

export default function CrmSection() {
  return (
    <section style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="section-pad" style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-eyebrow">Built-in CRM</div>
          <h2 className="section-h">
            Your business builds a CRM. <span className="orange">Automatically.</span>
          </h2>
          <p className="section-p" style={{ margin: '12px auto 0' }}>
            Every call TalkMate answers adds a contact to your database. No forms. No data entry. Just calls turning into an intelligent contact list over time.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {CARDS.map(c => {
            const Icon = c.icon
            return (
              <div key={c.title} style={{
                background: '#0A1E38',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, padding: 28,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ height: 2, background: 'linear-gradient(90deg, #1565C0, #4A9FE8)', position: 'absolute', top: 0, left: 0, right: 0 }} />
                <div style={{ width: 44, height: 44, background: 'rgba(74,159,232,0.12)', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon size={22} color="#4A9FE8" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 10, letterSpacing: '-0.3px' }}>{c.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{c.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
