'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { X } from 'lucide-react'

const HIDE_ON = ['/demo', '/status']

export default function StickyBottomBar() {
  const pathname = usePathname()
  const [closed, setClosed] = useState(false)
  if (HIDE_ON.includes(pathname) || closed) return null

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 80,
      background: 'rgba(6,19,34,0.95)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid rgba(232,98,42,0.2)',
      padding: '12px 24px',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16, flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, minWidth: 200, fontSize: 14, color: 'white', fontWeight: 500 }}>
          <span style={{ color: 'var(--orange)', fontWeight: 700 }}>Every missed call</span> costs you money. TalkMate fixes that in 24 hours.
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link href="/how-it-works" style={{
            padding: '9px 18px', fontSize: 13, fontWeight: 600,
            color: 'rgba(255,255,255,0.75)',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 8, textDecoration: 'none',
          }}>Learn more</Link>
          <Link href="/demo" style={{
            padding: '9px 20px', fontSize: 13, fontWeight: 700,
            color: 'white', background: 'var(--orange)',
            border: 'none', borderRadius: 8, textDecoration: 'none',
          }}>Book a Free Demo</Link>
          <button onClick={() => setClosed(true)} aria-label="Dismiss" style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 4, marginLeft: 4 }}>
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
