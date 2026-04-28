import { NextResponse } from 'next/server'

// Demo booking endpoint. Forwards to Make.com (MAKE_WEBHOOK_DEMO) so the
// internal team gets the lead in Slack/email and the contact lands in the CRM.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as Record<string, string> | null
  if (!body) return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 })

  const required = ['firstName', 'lastName', 'phone', 'email', 'business', 'businessType']
  for (const k of required) {
    if (!body[k]) return NextResponse.json({ ok: false, error: `Missing ${k}` }, { status: 400 })
  }

  const webhook = process.env.MAKE_WEBHOOK_DEMO
  if (!webhook) {
    console.warn('[demo] MAKE_WEBHOOK_DEMO not configured — accepting silently')
    return NextResponse.json({ ok: true, queued: false })
  }

  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, source: 'website-demo', sentAt: new Date().toISOString() }),
    })
  } catch (e) {
    console.error('[demo] webhook failed:', e)
  }

  return NextResponse.json({ ok: true, queued: true })
}
