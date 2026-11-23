'use client'

import { useEffect } from 'react'
import { captureAttribution } from '@/lib/attribution'

// Renders nothing. Records where this visitor came from (see lib/attribution.ts).
export default function AttributionCapture() {
  useEffect(() => {
    try { captureAttribution() } catch { /* never break the page over tracking */ }
  }, [])
  return null
}
