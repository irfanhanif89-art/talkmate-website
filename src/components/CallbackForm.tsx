'use client'

import { useState } from 'react'
import { Phone, ArrowRight, Check } from 'lucide-react'

// Lightweight "we'll call you" form. Submits to /api/callback (a stub that
// can be wired to Make.com / Vapi outbound in production). Without that
// endpoint configured, it shows a friendly success state offline.
export default function CallbackForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [biz, setBiz] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!phone || !name) return
    setSubmitting(true)
    try {
      await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, biz }),
      }).catch(() => null)
      setDone(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section style={{ background: 'var(--navy)' }}>
      <div className="section-pad" style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(232,98,42,0.06), rgba(74,159,232,0.04))',
          border: '1px solid rgba(232,98,42,0.18)',
          borderRadius: 20, padding: 40,
          display: 'grid',
          gridTemplateColumns: '1fr minmax(320px, 480px)',
          gap: 32, alignItems: 'center',
        }} className="cb-grid">
          <style>{`@media (max-width: 880px) { .cb-grid { grid-template-columns: 1fr !important; } }`}</style>

          <div>
            <div className="section-eyebrow">No commitment</div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'white', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 12 }}>
              Enter your details and TalkMate will call you in <span style={{ color: 'var(--orange)' }}>60 seconds</span>.
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>
              Hear it for yourself. Our AI agent will call your number, take a fake order, and SMS you a sample confirmation. Zero pressure, zero credit card.
            </p>
          </div>

          {done ? (
            <div style={{
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.3)',
              borderRadius: 14, padding: 24, textAlign: 'center',
            }}>
              <div style={{ width: 48, height: 48, background: 'rgba(34,197,94,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Check size={24} color="var(--green)" />
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 6 }}>Calling you now</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Watch your phone — TalkMate dials in about 30 seconds.</div>
            </div>
          ) : (
            <form onSubmit={submit} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14, padding: 22,
            }}>
              <Field label="Your name">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Pat Smith" style={inputStyle} required />
              </Field>
              <Field label="Phone number">
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="0412 345 678" style={inputStyle} required type="tel" />
              </Field>
              <Field label="Business name (optional)">
                <input value={biz} onChange={e => setBiz(e.target.value)} placeholder="Pat's Plumbing" style={inputStyle} />
              </Field>
              <button type="submit" disabled={submitting || !phone || !name} style={{
                width: '100%', marginTop: 6,
                padding: '14px 18px',
                background: submitting || !phone || !name ? 'rgba(232,98,42,0.5)' : 'var(--orange)',
                color: 'white', border: 'none', borderRadius: 11,
                fontFamily: 'Outfit, sans-serif',
                fontSize: 15, fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <Phone size={16} />
                {submitting ? 'Calling…' : 'Call me now'}
                <ArrowRight size={16} />
              </button>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 10, textAlign: 'center' }}>
                Australian numbers only. We won&apos;t share your details.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'white',
  borderRadius: 9,
  fontFamily: 'Outfit, sans-serif',
  fontSize: 14, outline: 'none',
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', marginBottom: 12 }}>
      <span style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{label}</span>
      {children}
    </label>
  )
}
