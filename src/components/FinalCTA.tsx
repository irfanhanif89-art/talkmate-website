import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// Session 17B -- FinalCTA primary defaults to "Sign Up" pointing at the
// signup flow on app.talkmate.com.au. Industry slug pages override the
// primary prop to keep "Book a Free Demo" -> /#contact for cold traffic.
export default function FinalCTA({ heading, sub, primary = 'Sign Up', primaryHref = 'https://app.talkmate.com.au/signup', secondary = 'See pricing', secondaryHref = '/pricing' }: {
  heading?: React.ReactNode
  sub?: React.ReactNode
  primary?: string
  primaryHref?: string
  secondary?: string
  secondaryHref?: string
}) {
  const primaryIsExternal = /^https?:\/\//.test(primaryHref)
  const secondaryIsExternal = /^https?:\/\//.test(secondaryHref)
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
          {primaryIsExternal ? (
            <a href={primaryHref} className="btn-orange">
              {primary} <ArrowRight size={16} />
            </a>
          ) : (
            <Link href={primaryHref} className="btn-orange">
              {primary} <ArrowRight size={16} />
            </Link>
          )}
          {secondaryIsExternal ? (
            <a href={secondaryHref} className="btn-ghost">
              {secondary}
            </a>
          ) : (
            <Link href={secondaryHref} className="btn-ghost">
              {secondary}
            </Link>
          )}
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
          Live in 24 hours · 14-day money-back guarantee
        </p>
      </div>
    </section>
  )
}
