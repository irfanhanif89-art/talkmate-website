'use client'

import { useState } from 'react'

// Renders a circular receptionist avatar.
// Looks for /receptionists/[slug].png. If the photo hasn't dropped in yet,
// falls back to a solid circle in the character's accent colour with their
// initial in white. The photos arrive separately from a designer; the site
// can ship today, the photos hot-swap in without any code change.
export default function AvatarImage({
  slug, name, bgColor, size = 96,
}: {
  slug: string
  name: string
  bgColor: string
  size?: number
}) {
  const [errored, setErrored] = useState(false)
  const initial = name.charAt(0).toUpperCase()

  const wrapperStyle: React.CSSProperties = {
    width: size, height: size, borderRadius: '50%',
    overflow: 'hidden',
    background: bgColor,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
    position: 'relative',
    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
  }

  if (errored) {
    return (
      <span style={wrapperStyle} aria-label={`${name} avatar`}>
        <span style={{
          color: 'white', fontWeight: 800,
          fontSize: Math.round(size * 0.42),
          letterSpacing: '-0.02em',
          fontFamily: 'Outfit, sans-serif',
        }}>{initial}</span>
      </span>
    )
  }

  return (
    <span style={wrapperStyle}>
      {/* Plain <img> so the onError handler runs in the browser. Next/Image
          would 500 in dev when the file is missing instead of triggering
          our placeholder. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/receptionists/${slug}.png`}
        alt={`${name} avatar`}
        width={size}
        height={size}
        onError={() => setErrored(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </span>
  )
}
