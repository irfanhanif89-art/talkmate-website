import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer style={{ background: '#020A14', borderTop: '1px solid rgba(255,255,255,0.05)', paddingBottom: 90 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40 }}>
        <div>
          <Logo />
          <p style={{ marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 240 }}>
            AI voice agent that answers every call in under 2 seconds.
          </p>
          <p style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            Gold Coast owned and operated.
          </p>
        </div>

        <FooterCol heading="Product" links={[
          { href: '/how-it-works', label: 'How it works' },
          { href: '/features', label: 'Features' },
          { href: '/pricing', label: 'Pricing' },
          { href: '/features#command', label: 'TalkMate Command' },
          { href: '/industries', label: 'Industries' },
        ]} />

        <FooterCol heading="Company" links={[
          { href: '/about', label: 'About us' },
          { href: '/partners', label: 'Partner program' },
          { href: '/status', label: 'System status' },
          { href: '/demo', label: 'Contact' },
        ]} />

        <FooterCol heading="Legal" links={[
          { href: '/privacy', label: 'Privacy Policy' },
          { href: '/terms', label: 'Terms of Service' },
          { href: '/privacy#act', label: 'Australian Privacy Act' },
        ]} />
      </div>

      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '20px 32px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        fontSize: 12, color: 'rgba(255,255,255,0.35)',
      }}>
        <span>© 2026 TalkMate Pty Ltd · Gold Coast, QLD</span>
        <span>Built on the <span style={{ color: 'var(--orange)' }}>Gold Coast</span> for Australian business</span>
      </div>
    </footer>
  )
}

function FooterCol({ heading, links }: { heading: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>{heading}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {links.map(l => (
          <Link key={l.href + l.label} href={l.href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{l.label}</Link>
        ))}
      </div>
    </div>
  )
}
