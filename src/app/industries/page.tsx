import Link from 'next/link'
import PageHero from '@/components/PageHero'
import FinalCTA from '@/components/FinalCTA'
import { INDUSTRIES } from '@/lib/industries'
import { ArrowRight } from 'lucide-react'

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Built for the businesses that <span style={{ color: 'var(--orange)' }}>actually call</span> Australia.</>}
        sub="Eight industry-specific configurations, each trained on the language, workflows, and edge cases that matter to your trade."
      />

      <section style={{ background: 'var(--light)' }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {INDUSTRIES.map(i => (
              <Link key={i.slug} href={`/industries/${i.slug}`} style={{
                background: 'white', border: '1px solid var(--edge)',
                borderRadius: 16, padding: 26, textDecoration: 'none',
                transition: 'all 0.18s',
                display: 'block',
              }} className="industry-card">
                <div style={{ fontSize: 30, marginBottom: 12 }}>{i.emoji}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>{i.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 14 }}>{i.tagline}</p>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  See it in action <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
          <style>{`.industry-card:hover { border-color: var(--orange); transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,0.06); }`}</style>
        </div>
      </section>

      <FinalCTA
        heading={<>Don&apos;t see your industry? <span className="orange">We probably handle it anyway.</span></>}
        sub="The agent learns your specific workflow during onboarding. Book a 30-minute call and we'll show you exactly how it'd work for your business."
        primary="Book a Free Demo"
      />
    </>
  )
}
