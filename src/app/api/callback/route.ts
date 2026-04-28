import { NextResponse } from 'next/server'

// Stub endpoint for the homepage "we'll call you" form. In production this
// should POST to MAKE_WEBHOOK_CALLBACK (Make.com → Vapi outbound call).
// Returns 200 even when the webhook isn't configured so the UI doesn't
// regress — server logs the missing config for ops to wire up.
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({})) as { name?: string; phone?: string; biz?: string }
  if (!body.phone || !body.name) {
    return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
  }

  const webhook = process.env.MAKE_WEBHOOK_CALLBACK
  if (!webhook) {
    console.warn('[callback] MAKE_WEBHOOK_CALLBACK not configured — accepting silently')
    return NextResponse.json({ ok: true, queued: false })
  }

  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, source: 'website-callback', sentAt: new Date().toISOString() }),
    })
  } catch (e) {
    console.error('[callback] webhook failed:', e)
  }

  return NextResponse.json({ ok: true, queued: true })
}
