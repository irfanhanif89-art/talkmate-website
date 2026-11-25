import { NextResponse } from 'next/server'
import { forwardLead } from '@/lib/lead-forward'

// "We'll call you back" form. Saved and alerted to Irfan via the portal.
export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as { name?: string; phone?: string; biz?: string }
  if (!b.phone || !b.name) {
    return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
  }
  const r = await forwardLead(req, 'callback', { full_name: b.name, phone: b.phone, business_name: b.biz })
  return NextResponse.json({ ok: r.ok, error: r.error }, { status: r.ok ? 200 : r.status })
}
