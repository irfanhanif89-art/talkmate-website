import { NextResponse } from 'next/server'
import { forwardLead } from '@/lib/lead-forward'

// "Book your free 7-day trial" form on /trial.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 })
  const r = await forwardLead(req, 'trial', body)
  return NextResponse.json({ ok: r.ok, error: r.error }, { status: r.ok ? 200 : r.status })
}
