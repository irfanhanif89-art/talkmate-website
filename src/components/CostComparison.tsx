import Link from 'next/link'
import { Check, X, ArrowRight } from 'lucide-react'

// Light-treatment section sandwiched between the live-demo button and
// the Two Products card. The visual contrast against the surrounding
// dark sections is intentional, it makes this row jump.

interface CostRow {
  label: string
  human: string
  talkmate: string
  isTotal?: boolean
}

const COST_ROWS: CostRow[] = [
  { label: 'Annual salary', human: '$65,000', talkmate: '$0' },
  { label: 'Superannuation (11.5%)', human: '$7,475', talkmate: '$0' },
  { label: 'Annual leave loading', human: '$2,500', talkmate: '$0' },
  { label: 'Sick days (avg 9/yr)', human: '$2,250', talkmate: '$0' },
  { label: 'Recruitment cost', human: '$3,000 to $8,000', talkmate: '$0' },
  { label: 'Total real cost', human: '~$80,000+', talkmate: '$3,588/yr', isTotal: true },
]

interface FeatureRow {
  label: string
  human: string
  talkmate: string
}

const FEATURE_ROWS: FeatureRow[] = [
  { label: 'Answers calls 24/7', human: 'No, only during business hours', talkmate: 'Yes, every call, every hour' },
  { label: 'Never calls in sick', human: 'No, avg 9 sick days per year', talkmate: 'Yes, 100% availability guaranteed' },
  { label: 'Upsells every caller', human: 'Rarely, staff forget or feel awkward', talkmate: 'Yes, every single call, without fail' },
]

export default function CostComparison() {
  return (
    <section style={{
      background: '#F1F5F9',
      padding: '96px 32px',
      borderTop: '1px solid rgba(0,0,0,0.05)',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
    }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700,
            color: 'var(--orange)', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: 14,
          }}>
            The smartest hire you&apos;ll ever make
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4.4vw, 44px)',
            fontWeight: 800, color: 'var(--navy)',
            letterSpacing: '-1.2px', lineHeight: 1.1,
            marginBottom: 18, maxWidth: 820, marginLeft: 'auto', marginRight: 'auto',
          }}>
            Your receptionist costs $3,588 a year. <span style={{ color: 'var(--orange)' }}>Not $80,000.</span>
          </h2>
          <p style={{
            fontSize: 17, color: '#475569', lineHeight: 1.6,
            maxWidth: 700, margin: '0 auto',
          }}>
            The average Australian receptionist costs over $80,000 per year when you include super, leave, and on-costs.
            TalkMate costs $299 a month. Here&apos;s the full breakdown.
          </p>
        </div>

        {/* Cost table */}
        <div style={{
          background: 'white', borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(15,23,42,0.06)',
          border: '1px solid rgba(15,23,42,0.06)',
          marginBottom: 24,
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr',
            background: 'var(--navy)', color: 'white',
            fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
            textTransform: 'uppercase' as const,
          }}>
            <div style={{ padding: '16px 22px' }}> </div>
            <div style={{ padding: '16px 22px', textAlign: 'center' as const }}>Human Receptionist</div>
            <div style={{ padding: '16px 22px', textAlign: 'center' as const }}>TalkMate</div>
          </div>

          {COST_ROWS.map((row, i) => {
            const totalStyle: React.CSSProperties = row.isTotal
              ? { background: 'var(--navy)', color: 'white', fontWeight: 800 }
              : { background: i % 2 === 0 ? 'white' : '#F8FAFC' }
            return (
              <div
                key={row.label}
                style={{
                  display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr',
                  fontSize: 15, ...totalStyle,
                  borderTop: i === 0 ? 'none' : `1px solid ${row.isTotal ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.04)'}`,
                }}
              >
                <div style={{ padding: '16px 22px', fontWeight: row.isTotal ? 800 : 600, color: row.isTotal ? 'white' : 'var(--navy)' }}>
                  {row.label}
                </div>
                <div style={{ padding: '16px 22px', textAlign: 'center' as const, color: row.isTotal ? 'white' : '#475569' }}>
                  {row.human}
                </div>
                <div style={{
                  padding: '16px 22px', textAlign: 'center' as const, fontWeight: 700,
                  color: row.isTotal
                    ? 'var(--orange)'
                    : (row.talkmate === '$0' ? 'var(--green)' : 'var(--navy)'),
                }}>
                  {row.talkmate}
                </div>
              </div>
            )
          })}
        </div>

        {/* Feature comparison rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {FEATURE_ROWS.map(f => (
            <div
              key={f.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.4fr 1fr 1fr',
                background: 'white', borderRadius: 12,
                border: '1px solid rgba(15,23,42,0.06)',
                overflow: 'hidden',
              }}
              className="cost-feature-row"
            >
              <div style={{ padding: '16px 22px', fontSize: 15, fontWeight: 700, color: 'var(--navy)', borderRight: '1px solid rgba(15,23,42,0.06)' }}>
                {f.label}
              </div>
              <div style={{ padding: '16px 22px', fontSize: 13, color: '#475569', display: 'flex', alignItems: 'center', gap: 10, borderRight: '1px solid rgba(15,23,42,0.06)' }}>
                <X size={16} color="#DC2626" style={{ flexShrink: 0 }} />
                <span>{f.human}</span>
              </div>
              <div style={{ padding: '16px 22px', fontSize: 13, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600 }}>
                <Check size={16} color="var(--green)" style={{ flexShrink: 0 }} />
                <span>{f.talkmate}</span>
              </div>
            </div>
          ))}
        </div>

        <p style={{
          fontSize: 10, color: '#64748B', lineHeight: 1.6,
          textAlign: 'center' as const, maxWidth: 720, margin: '0 auto 28px',
        }}>
          Salary data based on SEEK and Hays Australia 2026 averages for receptionist roles.
          On-costs include superannuation at 11.5%, average annual leave loading, and average sick leave at current rates.
        </p>

        <div style={{ textAlign: 'center' as const }}>
          <Link
            href="/pricing"
            className="btn-orange"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 16, padding: '15px 28px',
            }}
          >
            Get your receptionist for $299/mo <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Mobile collapse: stack the comparison rows.
          dangerouslySetInnerHTML avoids the React SSR/CSR mismatch where
          the `>` child combinator gets entity-encoded on the server but
          rendered raw on the client (triggers hydration error #425). */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 720px) {
          .cost-feature-row { grid-template-columns: 1fr !important; }
          .cost-feature-row > div { border-right: none !important; border-bottom: 1px solid rgba(15,23,42,0.06) !important; }
          .cost-feature-row > div:last-child { border-bottom: none !important; }
        }
      ` }} />
    </section>
  )
}
