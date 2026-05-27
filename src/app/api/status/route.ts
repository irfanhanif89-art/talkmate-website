import { NextResponse } from 'next/server'

// Same-origin proxy to the portal's public status endpoint. Avoids the
// browser-side CORS dependency on app.talkmate.com.au — works from any
// host (talkmate.com.au, www.talkmate.com.au, preview deploys).
export const dynamic = 'force-dynamic'
export const revalidate = 0

const PORTAL_STATUS = 'https://app.talkmate.com.au/api/public/status'

export async function GET() {
  try {
    const res = await fetch(PORTAL_STATUS, { cache: 'no-store' })
    if (!res.ok) {
      return NextResponse.json(
        { error: 'upstream_not_ok', status: res.status },
        { status: 502 }
      )
    }
    const json = await res.json()
    return NextResponse.json(json, { headers: { 'Cache-Control': 'no-store' } })
  } catch (e) {
    return NextResponse.json(
      { error: 'upstream_unreachable', message: String(e).slice(0, 200) },
      { status: 502 }
    )
  }
}
