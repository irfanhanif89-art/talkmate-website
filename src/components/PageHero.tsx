// Reusable dark-navy page hero used by all secondary pages (How it works,
// Features, Pricing, FAQ, About, Partners, Industries...). Keeps headline,
// eyebrow, sub, and optional CTA row consistent.

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Props {
  eyebrow?: string
  title: React.ReactNode
  sub?: React.ReactNode
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
}

export default function PageHero({ eyebrow, title, sub, primary, secondary }: Props) {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      padding: '140px 32px 72px',
      background: 'var(--navy)',
    }}>
      <div style={{
        position: 'absolute', top: -200, right: -200,
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,98,42,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 920, margin: '0 auto', textAlign: 'center' }}>
        {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
        <h1 style={{
          fontSize: 'clamp(36px, 5.5vw, 56px)',
          fontWeight: 800, lineHeight: 1.05, letterSpacing: '-1.5px',
          color: 'white', marginBottom: sub ? 18 : 0,
        }}>{title}</h1>
        {sub && (
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, maxWidth: 660, margin: '0 auto' }}>
            {sub}
          </p>
        )}
        {(primary || secondary) && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 30, flexWrap: 'wrap' }}>
            {primary && <Link href={primary.href} className="btn-orange">{primary.label} <ArrowRight size={16} /></Link>}
            {secondary && <Link href={secondary.href} className="btn-ghost">{secondary.label}</Link>}
          </div>
        )}
      </div>
    </section>
  )
}
