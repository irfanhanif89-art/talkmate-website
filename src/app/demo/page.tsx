'use client'

import { useState } from 'react'
import Logo from '@/components/Logo'
import Link from 'next/link'
import { ArrowRight, Check, Phone } from 'lucide-react'

const PROMISES = [
  { time: '30 mins', body: 'A real walk-through. No high-pressure scripts.' },
  { time: 'Live demo', body: "We'll call our own AI on the call so you can hear it." },
  { time: 'Honest answers', body: "If TalkMate isn't right for your business, we'll say so." },
  { time: 'Live by week end', body: 'Sign up today, live before Friday in most cases.' },
  { time: '14-day refund', body: "No-questions money-back guarantee if it doesn't work for you." },
]

const BUSINESS_TYPES = [
  'Restaurant or takeaway',
  'Towing or transport',
  'Real estate',
  'Trades or services',
  'Healthcare or clinic',
  'NDIS provider',
  'Retail',
  'Professional services',
  'Other',
]

export default function DemoPage() {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true); setError(null)
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    try {
      await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setDone(true)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', flexDirection: 'column' }}>
      {/* Minimal header — no nav links to avoid distraction */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        height: 68, padding: '0 32px',
        background: 'rgba(6,19,34,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" aria-label="TalkMate home" style={{ textDecoration: 'none' }}>
          <Logo />
        </Link>
        <Link href="/" style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>← Back</Link>
      </header>

      <div style={{ flex: 1, padding: '56px 24px' }}>
        <div style={{
          maxWidth: 1080, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(360px, 480px)', gap: 48, alignItems: 'flex-start',
        }} className="demo-grid">
          <style>{`@media (max-width: 900px) { .demo-grid { grid-template-columns: 1fr !important; } }`}</style>

          <div>
            <div className="section-eyebrow">Book a demo</div>
            <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 44px)', fontWeight: 800, color: 'white', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 18 }}>
              30 minutes. <span style={{ color: 'var(--orange)' }}>Live before Friday.</span>
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: 36 }}>
              No salesperson reading from a script. We&apos;ll call our own AI on the call so you can hear it. Honest answers, real numbers, and a path to live by week end.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {PROMISES.map(p => (
                <div key={p.time} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 100, flexShrink: 0,
                    fontSize: 12, fontWeight: 800,
                    color: 'var(--orange)', letterSpacing: '0.04em',
                    padding: '5px 10px',
                    background: 'rgba(232,98,42,0.1)',
                    border: '1px solid rgba(232,98,42,0.25)',
                    borderRadius: 8, textAlign: 'center',
                  }}>{p.time}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, paddingTop: 4 }}>{p.body}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 36, padding: 18, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
              <Phone size={14} color="var(--orange)" style={{ verticalAlign: '-2px', marginRight: 6 }} />
              Prefer to reach us by email? Get in touch at <a href="mailto:hello@talkmate.com.au" style={{ color: 'var(--bluel)', textDecoration: 'none' }}>hello@talkmate.com.au</a> and we&apos;ll get back to you same day.
            </div>
          </div>

          {done ? (
            <div style={{
              background: 'rgba(34,197,94,0.06)',
              border: '1px solid rgba(34,197,94,0.3)',
              borderRadius: 16, padding: 32, textAlign: 'center',
            }}>
              <div style={{ width: 56, height: 56, background: 'rgba(34,197,94,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Check size={28} color="var(--green)" />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 10 }}>Booked. We&apos;ll be in touch.</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                One of us will call you within 2 business hours to book your demo. Check your phone and your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: 26,
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <Field name="firstName" label="First name" required />
                <Field name="lastName" label="Last name" required />
              </div>
              <Field name="phone" label="Phone" type="tel" required placeholder="0412 345 678" />
              <Field name="email" label="Email" type="email" required placeholder="you@yourbusiness.com.au" />
              <Field name="business" label="Business name" required />

              <label style={{ display: 'block', marginBottom: 14 }}>
                <span style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Business type</span>
                <select name="businessType" required style={{
                  width: '100%', padding: '11px 12px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)', color: 'white',
                  borderRadius: 9, fontFamily: 'Outfit, sans-serif', fontSize: 14, outline: 'none',
                }}>
                  <option value="" style={{ background: '#0A1E38' }}>Pick one…</option>
                  {BUSINESS_TYPES.map(t => <option key={t} value={t} style={{ background: '#0A1E38' }}>{t}</option>)}
                </select>
              </label>

              {error && <div style={{ fontSize: 12, color: '#EF4444', marginBottom: 12 }}>{error}</div>}

              <button type="submit" disabled={submitting} style={{
                width: '100%', padding: '14px 18px',
                background: submitting ? 'rgba(232,98,42,0.5)' : 'var(--orange)',
                color: 'white', border: 'none', borderRadius: 12,
                fontFamily: 'Outfit, sans-serif',
                fontSize: 16, fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                {submitting ? 'Booking…' : 'Book my free demo'} <ArrowRight size={16} />
              </button>

              <p style={{ marginTop: 12, fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                We&apos;ll call within 2 business hours. No credit card required.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ name, label, type = 'text', placeholder, required }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label style={{ display: 'block', marginBottom: 12 }}>
      <span style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '11px 12px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)', color: 'white',
          borderRadius: 9, fontFamily: 'Outfit, sans-serif', fontSize: 14, outline: 'none',
        }}
      />
    </label>
  )
}
