'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { captureAttribution, readAttribution } from '@/lib/attribution'
import { track } from '@/lib/track'

// Free 7-day trial request. TalkMate sets every agent up by hand, so this is a
// short qualifying form, then the visitor books a 20-minute setup call in
// Irfan's Calendly. The form goes to /api/trial, which forwards it to the
// portal (saved + alerted to Irfan).

const CALENDLY_URL = 'https://calendly.com/hello-talkmate/talkmate-free-trial-setup-call'

const INDUSTRIES = [
  'Plumbing',
  'Electrical',
  'Air conditioning',
  'Water, storm or fire restoration',
  'Property management',
  'Other trade or home service',
  'Other',
]
const TEAM_SIZES = ['Just me', '2 to 4', '5 to 9', '10 to 24', '25 or more']
const CALL_VOLUMES = ['Under 25', '25 to 50', '50 to 150', '150 to 300', 'More than 300']

const STEPS = [
  ['1 minute', 'Tell us about your business below.'],
  ['20 minutes', 'Pick a time for a setup call. We ask about your services, hours and how you take jobs.'],
  ['Within 48 hours', 'We build and test your agent. You hear it before any customer does.'],
  ['7 days free', 'Send it your calls. No card needed. Keep it from $299 a month, or walk away.'],
]

export default function TrialPage() {
  const [plan, setPlan] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    captureAttribution()
    const p = new URLSearchParams(window.location.search).get('plan')
    if (p && ['starter', 'growth', 'pro'].includes(p)) setPlan(p)
  }, [])

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>
    if (plan) data.notes = [`Interested in the ${plan} plan.`, data.notes].filter(Boolean).join(' ')
    try {
      const res = await fetch('/api/trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, attribution: readAttribution() }),
      })
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || out.ok === false) throw new Error(out.error || 'Something went wrong. Please try again.')
      track('generate_lead', { lead_type: 'trial', industry: data.industry, team_size: data.team_size })
      setDone({ name: data.full_name ?? '', email: data.email ?? '' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  const calendlySrc = done
    ? `${CALENDLY_URL}?embed_domain=talkmate.com.au&embed_type=Inline&hide_gdpr_banner=1&primary_color=e8622a&name=${encodeURIComponent(done.name)}&email=${encodeURIComponent(done.email)}`
    : ''

  return (
    <div className="trial-page">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <main className="trial-main">
        {done ? (
          <section className="trial-done">
            <p className="trial-eyebrow">Step 2 of 4</p>
            <h1>Thanks{done.name ? `, ${done.name.split(' ')[0]}` : ''}. Now pick a time for your setup call.</h1>
            <p className="trial-lead">20 minutes on the phone. We call you. If none of these times suit, we&apos;ll ring you anyway within one business day.</p>
            <iframe className="trial-calendly" src={calendlySrc} title="Book your TalkMate setup call" loading="lazy" />
          </section>
        ) : (
          <div className="trial-grid">
            <section className="trial-intro">
              <p className="trial-eyebrow">Free 7-day trial</p>
              <h1>We build it. <span>You try it free.</span></h1>
              <p className="trial-lead">
                TalkMate isn&apos;t a do-it-yourself app. We set up your AI front desk for your business, test it with you, then you try it on your real calls for 7 days.
              </p>
            </section>

            <section className="trial-how">
              <ol className="trial-steps">
                {STEPS.map(([when, what]) => (
                  <li key={when}><strong>{when}</strong><span>{what}</span></li>
                ))}
              </ol>
              <p className="trial-note">Prefer to talk first? Call the demo line on <a href="tel:+61480892284">0480 892 284</a> and hear TalkMate answer.</p>
            </section>

            <form className="trial-form" onSubmit={submit}>
              <h2>Book your free trial</h2>
              {plan && <p className="trial-plan">Plan: <strong>{plan[0].toUpperCase() + plan.slice(1)}</strong> (you can change it later)</p>}

              <label>Your name<input name="full_name" required autoComplete="name" maxLength={120} /></label>
              <label>Business name<input name="business_name" required autoComplete="organization" maxLength={160} /></label>
              <div className="trial-row">
                <label>Mobile<input name="phone" required type="tel" autoComplete="tel" maxLength={40} /></label>
                <label>Email<input name="email" required type="email" autoComplete="email" maxLength={160} /></label>
              </div>
              <label>Industry
                <select name="industry" required defaultValue="">
                  <option value="" disabled>Choose one</option>
                  {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                </select>
              </label>
              <div className="trial-row">
                <label>How many people work in the business?
                  <select name="team_size" required defaultValue="">
                    <option value="" disabled>Choose one</option>
                    {TEAM_SIZES.map(i => <option key={i}>{i}</option>)}
                  </select>
                </label>
                <label>Roughly how many calls a week?
                  <select name="calls_per_week" required defaultValue="">
                    <option value="" disabled>Choose one</option>
                    {CALL_VOLUMES.map(i => <option key={i}>{i}</option>)}
                  </select>
                </label>
              </div>
              <label>Anything we should know? <span className="trial-opt">(optional)</span>
                <textarea name="notes" rows={3} maxLength={1000} placeholder="For example: we miss calls after 5pm, or we use ServiceM8" />
              </label>
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="trial-hp" aria-hidden="true" />

              {error && <p className="trial-error" role="alert">{error}</p>}
              <button type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Next: pick a setup call time →'}</button>
              <p className="trial-fine">No card needed. We only use your details to set up your trial. See our <Link href="/privacy">privacy policy</Link>.</p>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

const CSS = `
.trial-page { min-height: 100vh; background: var(--navy); color: #fff; font-family: inherit; }
.trial-main { max-width: 1080px; margin: 0 auto; padding: 116px 16px 64px; }
.trial-grid { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,480px); grid-template-areas: 'intro form' 'how form'; column-gap: 48px; row-gap: 0; align-items: start; }
.trial-intro { grid-area: intro; }
.trial-how { grid-area: how; }
.trial-form { grid-area: form; }
.trial-eyebrow { color: var(--orange); text-transform: uppercase; letter-spacing: .16em; font-size: 13px; font-weight: 700; margin: 0 0 14px; }
.trial-intro h1, .trial-done h1 { font-size: clamp(30px, 4.4vw, 44px); line-height: 1.1; letter-spacing: -1px; font-weight: 800; margin: 0 0 16px; }
.trial-intro h1 span { color: var(--orange); }
.trial-lead { color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.65; margin: 0 0 28px; }
.trial-steps { list-style: none; padding: 0; margin: 0 0 28px; display: grid; gap: 14px; }
.trial-steps li { display: grid; grid-template-columns: 120px 1fr; gap: 12px; padding: 14px 16px; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; background: rgba(255,255,255,0.03); font-size: 15px; line-height: 1.5; }
.trial-steps strong { color: var(--orange); }
.trial-steps span { color: rgba(255,255,255,0.8); }
.trial-note { font-size: 14px; color: rgba(255,255,255,0.6); }
.trial-note a { color: #fff; }
.trial-form { background: #fff; color: #0B1226; border-radius: 18px; padding: 26px 24px; display: grid; gap: 14px; box-shadow: 0 24px 60px -30px rgba(0,0,0,0.6); }
.trial-form h2 { margin: 0; font-size: 22px; }
.trial-plan { margin: 0; font-size: 14px; color: #4A5168; }
.trial-form label { display: grid; gap: 6px; font-size: 14px; font-weight: 600; color: #0B1226; }
.trial-form input, .trial-form select, .trial-form textarea { font: inherit; font-weight: 400; font-size: 16px; padding: 11px 12px; border: 1px solid #D5DBE5; border-radius: 10px; background: #fff; color: #0B1226; width: 100%; box-sizing: border-box; }
.trial-form input:focus, .trial-form select:focus, .trial-form textarea:focus { outline: 2px solid var(--orange); outline-offset: 1px; }
.trial-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.trial-opt { font-weight: 400; color: #6B7388; }
.trial-hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
.trial-form button { margin-top: 4px; padding: 14px 18px; border: 0; border-radius: 999px; background: var(--orange); color: #fff; font-size: 16px; font-weight: 700; cursor: pointer; }
.trial-form button:disabled { opacity: .6; cursor: wait; }
.trial-error { margin: 0; padding: 10px 12px; border-radius: 10px; background: #FEE2E2; color: #991B1B; font-size: 14px; }
.trial-fine { margin: 0; font-size: 12.5px; color: #6B7388; }
.trial-fine a { color: #4A5168; }
.trial-done { max-width: 820px; margin: 0 auto; text-align: center; }
.trial-calendly { width: 100%; height: 720px; border: 0; border-radius: 16px; background: #fff; margin-top: 8px; }
@media (max-width: 900px) {
  .trial-grid { grid-template-columns: 1fr; grid-template-areas: 'intro' 'form' 'how'; row-gap: 28px; }
}
@media (max-width: 520px) {
  .trial-row { grid-template-columns: 1fr; }
  .trial-steps li { grid-template-columns: 1fr; gap: 4px; }
  .trial-main { padding-top: 92px; }
  .trial-calendly { height: 900px; }
}
`
