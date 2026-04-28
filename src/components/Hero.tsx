import Link from 'next/link'
import { ArrowRight, Check, Phone } from 'lucide-react'
import DemoCard from './DemoCard'

export default function Hero() {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      minHeight: 'calc(100vh - 0px)',
      padding: '128px 32px 80px',
      background: 'var(--navy)',
    }}>
      <div style={{
        position: 'absolute', top: -200, right: -200,
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,98,42,0.12) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -200, left: -100,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(21,101,192,0.1) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 2,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(360px, 540px)',
        gap: 64, alignItems: 'center',
        maxWidth: 1280, margin: '0 auto', width: '100%',
      }} className="hero-grid">
        <style>{`
          @media (max-width: 1000px) {
            .hero-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(232,98,42,0.1)',
            border: '1px solid rgba(232,98,42,0.25)',
            borderRadius: 100, padding: '6px 14px',
            marginBottom: 24,
          }}>
            <span className="pulse-dot" style={{ width: 7, height: 7, background: 'var(--green)', borderRadius: '50%' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--orange)', letterSpacing: '0.05em' }}>LIVE NOW IN AUSTRALIA</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(40px, 6.4vw, 64px)',
            fontWeight: 900, lineHeight: 1.0, letterSpacing: '-2px',
            color: 'white', marginBottom: 20,
          }}>
            Every <span style={{ color: 'var(--orange)' }}>missed call</span> is a customer going <span style={{ color: 'var(--bluel)' }}>elsewhere</span>.
          </h1>

          <p style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7, marginBottom: 36, maxWidth: 480,
          }}>
            TalkMate is the AI voice agent that answers every single call in under 2 seconds, takes orders, books jobs and SMS confirms. Live in 24 hours.
          </p>

          <div style={{ display: 'flex', gap: 14, marginBottom: 30, flexWrap: 'wrap' }}>
            <Link href="/demo" className="btn-orange" style={{ fontSize: 17, padding: '17px 30px' }}>
              Book a Free Demo <ArrowRight size={18} />
            </Link>
            <Link href="#hear-it-live" className="btn-ghost" style={{ fontSize: 16 }}>
              <Phone size={16} /> Hear it Live · Free
            </Link>
          </div>

          <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', marginBottom: 16 }}>
            {['No credit card required', 'Live in 24 hours', '14-day money back'].map(t => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
                <Check size={14} color="var(--green)" /> {t}
              </span>
            ))}
          </div>
        </div>

        <DemoCard />
      </div>
    </section>
  )
}
