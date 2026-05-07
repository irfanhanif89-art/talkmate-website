import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react'
import AvatarImage from '@/components/AvatarImage'
import ReceptionistChat from '@/components/ReceptionistChat'
import { RECEPTIONISTS, getReceptionist } from '@/lib/receptionists'

export function generateStaticParams() {
  return RECEPTIONISTS.map(r => ({ slug: r.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const r = getReceptionist(params.slug)
  if (!r) return { title: 'Receptionist · TalkMate' }
  return {
    title: `${r.name}, your ${r.industry} receptionist · TalkMate`,
    description: r.tagline,
  }
}

export default function ReceptionistPage({ params }: { params: { slug: string } }) {
  const r = getReceptionist(params.slug)
  if (!r) return notFound()

  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'var(--navy)',
        padding: '120px 32px 72px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative' as const,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -150, right: -150,
          width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${r.bgColor}1F 0%, transparent 60%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative' as const, zIndex: 2 }}>
          <Link href="/#meet-your-receptionist" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none',
            marginBottom: 32,
          }}>
            <ArrowLeft size={14} /> All receptionists
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' as const, marginBottom: 24 }}>
            <AvatarImage slug={r.slug} name={r.name} bgColor={r.bgColor} size={120} />
            <div style={{ flex: 1, minWidth: 280 }}>
              <span style={{
                display: 'inline-block', fontSize: 11, fontWeight: 700,
                padding: '5px 12px', borderRadius: 99,
                background: 'rgba(232,98,42,0.15)', color: 'var(--orange)',
                letterSpacing: '0.06em', textTransform: 'uppercase' as const,
                marginBottom: 12,
              }}>{r.industry}</span>
              <h1 style={{
                fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 900,
                color: 'white', letterSpacing: '-1.6px', lineHeight: 1.05, marginBottom: 14,
              }}>
                {r.name} is your <span style={{ color: 'var(--orange)' }}>{r.industry}</span> receptionist.
              </h1>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55, maxWidth: 620 }}>
                {r.tagline}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const, marginTop: 18 }}>
            <Link href={r.pricingLink} className="btn-orange" style={{ fontSize: 16, padding: '15px 26px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {r.heroCTA}, $299/mo <ArrowRight size={16} />
            </Link>
            <Link href="/#live-demo" className="btn-ghost" style={{ fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Phone size={15} /> Talk to {r.name} now
            </Link>
          </div>
        </div>
      </section>

      {/* What [Name] knows */}
      <section style={{ background: 'var(--light)', padding: '88px 32px' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700,
            color: 'var(--orange)', letterSpacing: '0.12em',
            textTransform: 'uppercase' as const, marginBottom: 14,
          }}>Industry knowledge</div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800,
            color: 'var(--navy)', letterSpacing: '-1.2px', lineHeight: 1.15,
            marginBottom: 32,
          }}>
            What {r.name} knows about <span style={{ color: 'var(--orange)' }}>{r.industry.toLowerCase()}</span>.
          </h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12,
          }} className="knowledge-grid">
            {r.knowledgeBullets.map(b => (
              <div
                key={b}
                style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  padding: '14px 16px',
                  background: 'white', borderRadius: 12,
                  border: '1px solid rgba(15,23,42,0.06)',
                  fontSize: 14, color: 'var(--navy)', lineHeight: 1.55,
                }}
              >
                <Check size={16} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{b}</span>
              </div>
            ))}
          </div>

          <style>{`
            @media (max-width: 720px) {
              .knowledge-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* Sample call */}
      <section style={{ background: 'var(--navy)', padding: '88px 32px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: 28 }}>
            <div className="section-eyebrow">Live example</div>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800,
              color: 'white', letterSpacing: '-1px', lineHeight: 1.2,
              marginTop: 10,
            }}>
              Hear {r.name} handle a real <span style={{ color: 'var(--orange)' }}>{r.industry.toLowerCase()}</span> call.
            </h2>
          </div>

          <ReceptionistChat
            business={`${r.name} · TalkMate Receptionist`}
            lines={r.sampleChat}
          />

          <div style={{ textAlign: 'center' as const, marginTop: 30 }}>
            <Link href="/#live-demo" className="btn-orange" style={{ fontSize: 15, padding: '13px 24px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Talk to your receptionist now <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(232,98,42,0.08), rgba(6,19,34,0))',
        padding: '88px 32px',
        textAlign: 'center' as const,
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4.4vw, 40px)', fontWeight: 800,
            color: 'white', letterSpacing: '-1.2px', lineHeight: 1.15,
            marginBottom: 14,
          }}>
            Ready to <span style={{ color: 'var(--orange)' }}>hire {r.name}</span>?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 30 }}>
            Your receptionist is live in 24 hours. No setup fees. 14-day money-back guarantee.
          </p>
          <Link href="/pricing" className="btn-orange" style={{ fontSize: 17, padding: '16px 30px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Get started for $299/mo <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
