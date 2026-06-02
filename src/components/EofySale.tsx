'use client'

import { useEffect, useState } from 'react'
import { EOFY_SALE, isSaleActive, regularPrice } from '@/lib/eofy-sale'

function useSaleActive(): boolean {
  const [active, setActive] = useState(false)
  useEffect(() => { setActive(isSaleActive()) }, [])
  return active
}

/** Struck-through "regular" price (net × 2). Renders nothing when the sale is off. */
export function EofyWas({ net, style }: { net: number; style?: React.CSSProperties }) {
  const active = useSaleActive()
  if (!active) return null
  return (
    <span
      style={{
        textDecoration: 'line-through',
        opacity: 0.55,
        fontWeight: 700,
        marginRight: 8,
        ...style,
      }}
    >
      ${regularPrice(net).toLocaleString('en-AU')}
    </span>
  )
}

/** EOFY sale badge pill. Renders nothing when the sale is off. */
export function EofyBadge({ style }: { style?: React.CSSProperties }) {
  const active = useSaleActive()
  if (!active) return null
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '4px 11px', borderRadius: 99,
        background: 'rgba(232,98,42,0.12)',
        border: '1px solid rgba(232,98,42,0.45)',
        color: '#E8622A', fontSize: 11, fontWeight: 800,
        letterSpacing: '0.06em', whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {EOFY_SALE.badge}
    </span>
  )
}
