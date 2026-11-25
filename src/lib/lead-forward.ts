// Forwards website lead forms (free trial, demo, callback) to the portal's
// public endpoint, which saves the lead (trial_requests table) and alerts
// Irfan (internal alerts only, never shown to customers). Replaces the old Make.com webhooks,
// which stopped working when Make.com was cancelled in Sept 2026.

const PORTAL_URL = process.env.PORTAL_URL || 'https://app.talkmate.com.au'

export type LeadKind = 'trial' | 'demo' | 'callback'

export async function forwardLead(
  req: Request,
  kind: LeadKind,
  fields: Record<string, unknown>,
): Promise<{ ok: boolean; status: number; error?: string }> {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null
  try {
    const res = await fetch(`${PORTAL_URL}/api/public/trial-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...fields, kind, ip }),
      cache: 'no-store',
    })
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
    return { ok: res.ok && data.ok !== false, status: res.status, error: data.error }
  } catch (e) {
    console.error('[lead-forward] portal unreachable', e)
    return { ok: false, status: 502, error: 'We could not send your details. Please call us instead.' }
  }
}
