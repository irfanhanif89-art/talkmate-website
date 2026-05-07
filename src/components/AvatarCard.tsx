'use client'

import Link from 'next/link'
import { useState } from 'react'
import AvatarImage from './AvatarImage'
import type { Receptionist } from '@/lib/receptionists'

// Reused by the homepage Meet Your Receptionist grid AND by each
// /industries/[slug] page (with a slightly larger avatar via the size prop).
export default function AvatarCard({
  r, avatarSize = 96,
}: {
  r: Receptionist
  avatarSize?: number
}) {
  const [hover, setHover] = useState(false)

  return (
    <Link
      href={`/receptionist/${r.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'block', textDecoration: 'none',
        background: '#0A1E38',
        border: `1px solid ${hover ? 'var(--orange)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 16,
        padding: 22,
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
        boxShadow: hover ? '0 14px 32px rgba(0,0,0,0.35)' : 'none',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
        <AvatarImage slug={r.slug} name={r.name} bgColor={r.bgColor} size={avatarSize} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'white', letterSpacing: '-0.3px', marginBottom: 6 }}>{r.name}</div>
          <span style={{
            display: 'inline-block',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
            padding: '3px 9px', borderRadius: 99,
            background: 'rgba(232,98,42,0.14)', color: 'var(--orange)',
            textTransform: 'uppercase' as const,
          }}>{r.industry}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
        {r.teaserBullets.map(b => (
          <div key={b} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
            <span style={{ color: 'var(--orange)', flexShrink: 0, marginTop: 1, fontSize: 11 }}>·</span>
            <span>{b}</span>
          </div>
        ))}
      </div>

      <div style={{
        fontSize: 12, fontWeight: 700, color: 'var(--orange)',
        letterSpacing: '0.04em', textTransform: 'uppercase' as const,
      }}>View full profile →</div>
    </Link>
  )
}
