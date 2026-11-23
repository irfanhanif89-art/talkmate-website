// First-party "how did they find us" capture.
//
// On every page load we look at the URL (utm_* tags and ad click IDs) and the
// referring site, and store them in a cookie on .talkmate.com.au. Because the
// cookie is on the parent domain, the portal signup page on app.talkmate.com.au
// can read it and save it against the new customer.
//
//   ft = first touch  (the very first time we saw this browser, never overwritten)
//   lt = last touch   (the most recent visit that came from an ad, a tagged link
//                      or another website)
//
// No third-party service is involved, so this works even before Google
// Analytics is switched on. Keep in sync with talkmate-portal src/lib/attribution.ts.

export const ATTRIBUTION_COOKIE = 'tm_attr'

const PARAM_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'ttclid', 'li_fat_id',
] as const

const MAX_LEN = 200
const MAX_AGE_SECONDS = 90 * 24 * 60 * 60

export type Touch = Partial<Record<(typeof PARAM_KEYS)[number], string>> & {
  ref?: string
  landing?: string
  at?: string
}

export type Attribution = { ft?: Touch; lt?: Touch }

function clip(v: string): string {
  return v.length > MAX_LEN ? v.slice(0, MAX_LEN) : v
}

export function readAttribution(): Attribution {
  try {
    const raw = document.cookie.split('; ').find(c => c.startsWith(`${ATTRIBUTION_COOKIE}=`))
    if (!raw) return {}
    const parsed = JSON.parse(decodeURIComponent(raw.slice(ATTRIBUTION_COOKIE.length + 1)))
    return parsed && typeof parsed === 'object' ? parsed as Attribution : {}
  } catch {
    return {}
  }
}

function writeAttribution(a: Attribution) {
  const host = window.location.hostname
  const domain = host === 'talkmate.com.au' || host.endsWith('.talkmate.com.au') ? '; domain=.talkmate.com.au' : ''
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${ATTRIBUTION_COOKIE}=${encodeURIComponent(JSON.stringify(a))}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax${domain}${secure}`
}

function externalReferrer(): string | undefined {
  const r = document.referrer
  if (!r) return undefined
  try {
    const u = new URL(r)
    if (u.hostname === 'talkmate.com.au' || u.hostname.endsWith('.talkmate.com.au')) return undefined
    return clip(`${u.hostname}${u.pathname === '/' ? '' : u.pathname}`)
  } catch {
    return undefined
  }
}

export function captureAttribution() {
  const params = new URLSearchParams(window.location.search)
  const touch: Touch = {}
  let tagged = false
  for (const k of PARAM_KEYS) {
    const v = params.get(k)
    if (v) { touch[k] = clip(v); tagged = true }
  }
  const ref = externalReferrer()
  if (ref) touch.ref = ref
  touch.landing = clip(window.location.pathname)
  touch.at = new Date().toISOString()

  const current = readAttribution()
  const next: Attribution = { ...current }
  if (!current.ft) next.ft = touch
  if (tagged || ref) next.lt = touch
  if (next.ft !== current.ft || next.lt !== current.lt) writeAttribution(next)
}
