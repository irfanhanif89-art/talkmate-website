import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function FinalCTA({ heading, sub, primary = 'Book a Free Demo', primaryHref = '/demo', secondary = 'Get Started', secondaryHref = '/pricing' }: {
  heading?: React.ReactNode
  sub?: React.ReactNode
  primary?: string
  primaryHref?: string
  secondary?: string
  secondaryHref?: string
}) {
  return (
    <section style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="section-pad" style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
        <h2 className="section-h">
          {heading ?? <>Every day you wait is <span className="orange">revenue left behind</span>.</>}
        </h2>
        <p className="section-p" style={{ margin: '12px auto 32px' }}>
          {sub ?? 'The average TalkMate client recovers $4,200 in missed orders in their first month. Setup takes 24 hours. We handle everything.'}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 18 }}>
          <Link href={primaryHref} className="btn-orange">
            {primary} <ArrowRight size={16} />
          </Link>
          <Link href={secondaryHref} className="btn-ghost">
            {secondary}
          </Link>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
          No credit card required · Live in 24 hours · 14-day money-back guarantee
        </p>
      </div>
    </section>
  )
}
