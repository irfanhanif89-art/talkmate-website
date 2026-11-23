// Sends a named event to whichever analytics tools are loaded (Google
// Analytics via gtag, Google Tag Manager via dataLayer). Silent no-op when
// none are switched on.
type Params = Record<string, string | number | boolean | undefined>

export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
  try {
    if (typeof w.gtag === 'function') w.gtag('event', event, params)
    else if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event, ...params })
  } catch {
    // never break the page over tracking
  }
}
