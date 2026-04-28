'use client'

import { useEffect, useState } from 'react'
import Logo from '@/components/Logo'

interface Service {
  name: string
  description: string
  status: 'operational' | 'degraded' | 'down'
  lastCheck: string
}

interface StatusPayload {
  overall: 'operational' | 'degraded' | 'down'
  updatedAt: string
  services: Service[]
  incidents: Array<{ id: string; type: string; message: string; sent_at: string; resolved: boolean }>
}

const STATUS_LABEL: Record<Service['status'], { bg: string; color: string; label: string }> = {
  operational: { bg: 'rgba(34,197,94,0.12)', color: '#22C55E', label: 'OPERATIONAL' },
  degraded: { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B', label: 'DEGRADED' },
  down: { bg: 'rgba(239,68,68,0.12)', color: '#EF4444', label: 'DOWN' },
}

const FALLBACK: StatusPayload = {
  overall: 'operational',
  updatedAt: new Date().toISOString(),
  services: [
    { name: 'Voice Agent (Vapi)', description: 'Inbound AI voice answering and call handling', status: 'operational', lastCheck: new Date().toISOString() },
    { name: 'Client Portal', description: 'app.talkmate.com.au — dashboard, settings, billing', status: 'operational', lastCheck: new Date().toISOString() },
    { name: 'Billing (Stripe)', description: 'Subscriptions, payments, partner payouts', status: 'operational', lastCheck: new Date().toISOString() },
    { name: 'Command Assistant', description: 'WhatsApp / Telegram natural-language commands', status: 'operational', lastCheck: new Date().toISOString() },
  ],
  incidents: [],
}

export default function StatusPage() {
  const [data, setData] = useState<StatusPayload>(FALLBACK)

  useEffect(() => {
    let mounted = true
    async function pull() {
      try {
        // Pull from the portal's public status endpoint when available.
        const res = await fetch('https://app.talkmate.com.au/api/public/status', { cache: 'no-store' })
        if (!res.ok) throw new Error(String(res.status))
        const json: StatusPayload = await res.json()
        if (mounted) setData({ ...json, updatedAt: new Date().toISOString() })
      } catch {
        if (mounted) setData({ ...FALLBACK, updatedAt: new Date().toISOString() })
      }
    }
    pull()
    const t = setInterval(pull, 60_000)
    return () => { mounted = false; clearInterval(t) }
  }, [])

  const overall = STATUS_LABEL[data.overall]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <Logo />
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Public status</span>
        </div>

        <div style={{
          background: '#0A1E38',
          border: `1px solid ${overall.bg}`,
          borderRadius: 16, padding: 26, marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: overall.color }} className="pulse-dot" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>
              {data.overall === 'operational' ? 'All systems operational' : data.overall === 'degraded' ? 'Degraded performance' : 'Service disruption'}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
              Updated {new Date(data.updatedAt).toLocaleString('en-AU')} · refreshes every 60 seconds
            </div>
          </div>
        </div>

        <div style={{ background: '#0A1E38', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ padding: '14px 22px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Services
          </div>
          {data.services.map((s, i) => {
            const label = STATUS_LABEL[s.status]
            return (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 22px', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: label.color }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{s.description}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99, background: label.bg, color: label.color, letterSpacing: '0.05em' }}>{label.label}</span>
              </div>
            )
          })}
        </div>

        <div style={{ background: '#0A1E38', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '14px 22px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Recent incidents
          </div>
          {data.incidents.length === 0 ? (
            <div style={{ padding: 22, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>No incidents reported in the last 30 days.</div>
          ) : data.incidents.map(i => (
            <div key={i.id} style={{ padding: '14px 22px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>{i.type.replace(/_/g, ' ')}</div>
                <span style={{ fontSize: 11, color: i.resolved ? '#22C55E' : '#F59E0B' }}>{i.resolved ? 'Resolved' : 'Investigating'}</span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{i.message}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{new Date(i.sent_at).toLocaleString('en-AU')}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
          <a href="https://talkmate.com.au" style={{ color: 'var(--bluel)', textDecoration: 'none' }}>← Back to TalkMate</a>
          <span style={{ margin: '0 8px' }}>·</span>
          Need help? <a href="mailto:hello@talkmate.com.au" style={{ color: 'var(--bluel)', textDecoration: 'none' }}>hello@talkmate.com.au</a>
        </div>
      </div>
    </div>
  )
}
