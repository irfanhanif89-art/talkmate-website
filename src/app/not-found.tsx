import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px' }}>
      <div style={{ textAlign: 'center', maxWidth: 540 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 12 }}>404</div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 800, color: 'white', letterSpacing: '-1px', marginBottom: 14 }}>
          That page took a wrong turn.
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 28 }}>
          But the AI agent never does. Take a step back, or book a demo and stop missing calls today.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-orange">Back to home</Link>
          <Link href="/demo" className="btn-ghost">Book a Demo</Link>
        </div>
      </div>
    </div>
  )
}
