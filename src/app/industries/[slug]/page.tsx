import { notFound } from 'next/navigation'
import PageHero from '@/components/PageHero'
import FinalCTA from '@/components/FinalCTA'
import IndustryDemo from '@/components/IndustryDemo'
import { Check, MessageSquare } from 'lucide-react'
import { INDUSTRIES, getIndustry, INDUSTRY_CRM } from '@/lib/industries'
import { Database } from 'lucide-react'

export async function generateStaticParams() {
  return INDUSTRIES.map(i => ({ slug: i.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const i = getIndustry(params.slug)
  if (!i) return { title: 'Industry · TalkMate' }
  return {
    title: `${i.name} · TalkMate AI Voice Agent`,
    description: `${i.tagline} TalkMate answers, captures, and confirms every call for ${i.name.toLowerCase()} in Australia.`,
  }
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const ind = getIndustry(params.slug)
  if (!ind) return notFound()

  return (
    <>
      <PageHero
        eyebrow={ind.hero.eyebrow}
        title={<><span>{ind.emoji}</span> {ind.hero.title}</>}
        sub={ind.hero.sub}
        primary={{ label: 'Book a Free Demo', href: '/demo' }}
        secondary={{ label: 'See pricing', href: '/pricing' }}
      />

      {/* Demo + handles */}
      <section style={{ background: 'var(--navy)' }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 480px)', gap: 40, alignItems: 'flex-start' }} className="ind-grid">
            <style>{`@media (max-width: 900px) { .ind-grid { grid-template-columns: 1fr !important; } }`}</style>
            <div>
              <div className="section-eyebrow">What TalkMate handles</div>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: 'white', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 22 }}>
                Specifically for <span style={{ color: 'var(--orange)' }}>{ind.name.toLowerCase()}</span>.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {ind.handles.map(h => (
                  <div key={h} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                    <Check size={16} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <IndustryDemo business={ind.demo.business} bubbles={ind.demo.bubbles} />
          </div>
        </div>
      </section>

      {/* Command for this industry */}
      <section style={{ background: 'var(--light)' }}>
        <div className="section-pad" style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{
            background: 'white', border: '1px solid var(--edge)',
            borderRadius: 18, padding: 32,
            display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(220px, 360px)', gap: 32, alignItems: 'center',
          }} className="cmd-grid">
            <style>{`@media (max-width: 880px) { .cmd-grid { grid-template-columns: 1fr !important; } }`}</style>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 10px', borderRadius: 99, background: 'rgba(232,98,42,0.1)', color: 'var(--orange)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 12 }}>
                <MessageSquare size={12} /> TALKMATE COMMAND · GROWTH & PRO
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.5px', marginBottom: 8 }}>
                Run your business by texting.
              </h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{ind.command.intro}</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {ind.command.examples.map(c => (
                <span key={c} style={{
                  fontSize: 12, fontWeight: 600,
                  padding: '8px 12px',
                  background: 'rgba(232,98,42,0.06)',
                  border: '1px solid rgba(232,98,42,0.2)',
                  borderRadius: 99,
                  color: 'var(--navy)',
                }}>&ldquo;{c}&rdquo;</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {INDUSTRY_CRM[ind.slug] && (
        <section style={{ background: 'var(--navy)' }}>
          <div className="section-pad" style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 480px)', gap: 40, alignItems: 'center' }} className="crm-grid">
              <style>{`@media (max-width: 880px) { .crm-grid { grid-template-columns: 1fr !important; } }`}</style>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 99, background: 'rgba(74,159,232,0.1)', color: 'var(--bluel)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12 }}>
                  <Database size={12} /> Your CRM, automatic
                </div>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'white', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 14 }}>
                  Every {ind.name.toLowerCase()} call becomes a contact.
                </h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{INDUSTRY_CRM[ind.slug].intro}</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {INDUSTRY_CRM[ind.slug].useCases.map(uc => (
                  <li key={uc} style={{
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                    padding: '12px 14px', background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10,
                    fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5,
                  }}>
                    <span style={{ color: 'var(--bluel)', flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span>{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {ind.testimonial && (
        <section style={{ background: 'var(--light)' }}>
          <div className="section-pad" style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{
              background: 'white', border: '1px solid var(--edge)',
              borderRadius: 18, padding: 32, textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>“</div>
              <p style={{ fontSize: 18, color: 'var(--navy)', lineHeight: 1.55, marginBottom: 20, fontWeight: 500 }}>
                {ind.testimonial.quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{ind.testimonial.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{ind.testimonial.location}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, padding: '5px 10px', borderRadius: 99, background: 'rgba(34,197,94,0.12)', color: '#16A34A' }}>
                  {ind.testimonial.badge}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      <FinalCTA
        heading={<>{ind.name}, ready to <span className="orange">stop missing calls</span>?</>}
        sub={`Book a 30-minute demo. We'll show you exactly how TalkMate handles ${ind.name.toLowerCase()} calls and what it'd recover for your business.`}
        primary="Book a Free Demo"
      />
    </>
  )
}
