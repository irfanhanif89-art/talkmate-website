'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'
import Logo from './Logo'

const INDUSTRY_LINKS = [
  { href: '/industries/restaurants', label: 'Restaurants & Takeaway' },
  { href: '/industries/towing', label: 'Towing & Transport' },
  { href: '/industries/real-estate', label: 'Real Estate' },
  { href: '/industries/trades', label: 'Trades & Services' },
  { href: '/industries/healthcare', label: 'Healthcare & Clinics' },
  { href: '/industries/ndis', label: 'NDIS Providers' },
  { href: '/industries/retail', label: 'Retail' },
  { href: '/industries/professional-services', label: 'Professional Services' },
  { href: '/industries', label: 'View all industries' },
]

const COMPANY_LINKS = [
  { href: '/about', label: 'About us' },
  { href: '/partners', label: 'Partner program' },
  { href: '/status', label: 'System status' },
]

export default function Nav() {
  const [openDropdown, setOpenDropdown] = useState<'industries' | 'company' | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpenDropdown(null)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 68, padding: '0 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'rgba(6,19,34,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }} ref={ref}>
      <Link href="/" aria-label="TalkMate home" style={{ textDecoration: 'none' }}>
        <Logo />
      </Link>

      <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 32 }}>
        <NavLink href="/how-it-works">How it works</NavLink>
        <NavLink href="/features">Features</NavLink>
        <NavLink href="/pricing">Pricing</NavLink>
        <NavLink href="/faq">FAQ</NavLink>

        <Dropdown
          label="Industries"
          isOpen={openDropdown === 'industries'}
          onToggle={() => setOpenDropdown(openDropdown === 'industries' ? null : 'industries')}
          links={INDUSTRY_LINKS}
        />
        <Dropdown
          label="Company"
          isOpen={openDropdown === 'company'}
          onToggle={() => setOpenDropdown(openDropdown === 'company' ? null : 'company')}
          links={COMPANY_LINKS}
        />
      </div>

      <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 12 }}>
        <a
          href="https://app.talkmate.com.au/login"
          style={{
            padding: '9px 20px', fontFamily: 'Outfit, sans-serif',
            fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)',
            background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 9, cursor: 'pointer', textDecoration: 'none',
          }}
        >Log in</a>
        <Link
          href="/demo"
          style={{
            padding: '9px 22px', fontFamily: 'Outfit, sans-serif',
            fontSize: 14, fontWeight: 700, color: 'white',
            background: 'var(--orange)', border: 'none',
            borderRadius: 9, cursor: 'pointer', textDecoration: 'none',
          }}
        >Book a Demo</Link>
      </div>

      <button
        className="lg:hidden"
        aria-label="Open menu"
        onClick={() => setMobileOpen(true)}
        style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 6 }}
      >
        <Menu size={22} />
      </button>

      {mobileOpen && (
        <div className="lg:hidden" style={{ position: 'fixed', inset: 0, background: 'var(--navy)', zIndex: 200, padding: 24, overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <Logo />
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu" style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}>
              <X size={24} />
            </button>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              ['/how-it-works', 'How it works'],
              ['/features', 'Features'],
              ['/pricing', 'Pricing'],
              ['/faq', 'FAQ'],
            ].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{ padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: 16 }}>{label}</Link>
            ))}
            <details style={{ padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <summary style={{ color: 'white', fontWeight: 600, fontSize: 16, cursor: 'pointer', listStyle: 'none' }}>Industries ›</summary>
              <div style={{ paddingTop: 8, paddingLeft: 16 }}>
                {INDUSTRY_LINKS.map(l => (
                  <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '8px 0', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>{l.label}</Link>
                ))}
              </div>
            </details>
            <details style={{ padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <summary style={{ color: 'white', fontWeight: 600, fontSize: 16, cursor: 'pointer', listStyle: 'none' }}>Company ›</summary>
              <div style={{ paddingTop: 8, paddingLeft: 16 }}>
                {COMPANY_LINKS.map(l => (
                  <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '8px 0', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>{l.label}</Link>
                ))}
              </div>
            </details>
          </nav>
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="https://app.talkmate.com.au/login" style={{ padding: '14px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', color: 'white', textDecoration: 'none', fontWeight: 600, textAlign: 'center', fontSize: 15 }}>Log in</a>
            <Link href="/demo" onClick={() => setMobileOpen(false)} style={{ padding: '14px 18px', borderRadius: 10, background: 'var(--orange)', color: 'white', textDecoration: 'none', fontWeight: 700, textAlign: 'center', fontSize: 15 }}>Book a Demo</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>{children}</Link>
  )
}

function Dropdown({ label, isOpen, onToggle, links }: { label: string; isOpen: boolean; onToggle: () => void; links: { href: string; label: string }[] }) {
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: 'transparent', border: 'none',
          fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.6)',
          cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
          padding: 0,
        }}
      >
        {label}
        <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
      </button>
      {isOpen && (
        <div className="fade-up" style={{
          position: 'absolute', top: 'calc(100% + 12px)', left: -8, minWidth: 230,
          background: 'var(--navy2)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12, padding: 6,
          boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={onToggle} style={{
              display: 'block', padding: '9px 12px', borderRadius: 8,
              fontSize: 13, color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
              fontWeight: 500,
            }}>{l.label}</Link>
          ))}
        </div>
      )}
    </div>
  )
}
