import { Phone, MessageSquare, Check, Sparkles } from 'lucide-react'

const VOICE_FEATURES = [
  'Answers every call under 2 seconds',
  'Takes orders, books jobs, qualifies leads',
  'Upsells on every single call',
  'SMS confirmations to every customer',
  'Full call transcripts and dashboard',
  'Australian voice and accent',
  'Every caller automatically becomes a contact in your CRM. No data entry.',
]

const COMMAND_EXAMPLES = [
  'How many calls today?',
  'Send invoice to Mike for $380',
  'Add prawn cutlets $18.50',
  'Pause agent for 2 hours',
  "What's my busiest day?",
  'Find Christina from Melbourne',
  'Show me lapsed regulars',
  'Who are my top callers this week?',
]

export default function TwoProducts() {
  return (
    <section id="products" style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="section-pad" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-eyebrow">Two products</div>
          <h2 className="section-h">Two products. <span className="orange">One subscription.</span></h2>
          <p className="section-p" style={{ margin: '12px auto 0' }}>
            Growth and Pro clients get both, a voice agent that handles every call, plus a business assistant they control from WhatsApp.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {/* Voice agent */}
          <div style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: 20, padding: 36,
            background: 'linear-gradient(135deg, #0A1E38, #061322)',
            border: '1px solid rgba(74,159,232,0.2)',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #4A9FE8, #1565C0)' }} />
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,159,232,0.12), transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <span style={{ width: 44, height: 44, background: 'rgba(74,159,232,0.12)', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={22} color="var(--bluel)" />
              </span>
              <span style={{ fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 100, background: 'rgba(74,159,232,0.15)', color: 'var(--bluel)', letterSpacing: '0.12em' }}>ALL PLANS</span>
            </div>

            <h3 style={{ fontSize: 26, fontWeight: 800, color: 'white', letterSpacing: '-0.5px', marginBottom: 6 }}>TalkMate Voice Agent</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 22 }}>The AI that answers every call.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {VOICE_FEATURES.map(f => (
                <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
                  <Check size={15} color="var(--bluel)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Command */}
          <div style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: 20, padding: 36,
            background: 'linear-gradient(135deg, #1a0a00, #061322)',
            border: '1px solid rgba(232,98,42,0.2)',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #E8622A, #FF7A42)' }} />
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,98,42,0.12), transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <span style={{ width: 44, height: 44, background: 'rgba(232,98,42,0.12)', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageSquare size={22} color="var(--orange)" />
              </span>
              <span style={{ fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 100, background: 'rgba(232,98,42,0.15)', color: 'var(--orange)', letterSpacing: '0.12em' }}>GROWTH & PRO</span>
              <span style={{ fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 100, background: 'var(--orange)', color: 'white', letterSpacing: '0.12em', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Sparkles size={11} /> NEW
              </span>
            </div>

            <h3 style={{ fontSize: 26, fontWeight: 800, color: 'white', letterSpacing: '-0.5px', marginBottom: 6 }}>TalkMate Command</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 22 }}>Run your business by texting WhatsApp or Telegram.</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 18 }}>
              {COMMAND_EXAMPLES.map(c => (
                <span key={c} style={{
                  fontSize: 12, fontWeight: 600,
                  padding: '7px 11px',
                  background: 'rgba(232,98,42,0.08)',
                  border: '1px solid rgba(232,98,42,0.2)',
                  borderRadius: 99,
                  color: 'rgba(255,255,255,0.85)',
                }}>&quot;{c}&quot;</span>
              ))}
            </div>

            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
              Plain English commands. Confirmations for anything risky. Daily summaries on demand. Like having a 24/7 staff member that doesn&apos;t sleep.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
