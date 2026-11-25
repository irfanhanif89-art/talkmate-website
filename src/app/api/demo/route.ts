import { NextResponse } from 'next/server'
import { forwardLead } from '@/lib/lead-forward'

// Legacy "book a demo" endpoint. The /demo page now redirects to /trial,
// but anything still posting here is saved and alerted like a trial request.
export async function POST(req: Request) {
  const b = (await req.json().catch(() => null)) as Record<string, string> | null
  if (!b) return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 })
  const r = await forwardLead(req, 'demo', {
    full_name: [b.firstName, b.lastName].filter(Boolean).join(' ') || b.full_name,
    phone: b.phone,
    email: b.email,
    business_name: b.business ?? b.business_name,
    industry: b.businessType ?? b.industry,
    notes: b.message ?? b.notes,
    company_website: b.company_website,
  })
  return NextResponse.json({ ok: r.ok, error: r.error }, { status: r.ok ? 200 : r.status })
}
