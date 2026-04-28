'use client'

import { useState, useMemo } from 'react'

export default function RevenueCalculator() {
  const [missed, setMissed] = useState(8)
  const [avgValue, setAvgValue] = useState(45)
  const [totalCalls, setTotalCalls] = useState(40)

  const result = useMemo(() => {
    const lostPerMonth = missed * avgValue * 30
    const upsellPerMonth = totalCalls * avgValue * 0.23 * 30
    const totalRecovered = lostPerMonth + upsellPerMonth
    const dailyRecovered = totalRecovered / 30
    const paybackDays = dailyRecovered > 0 ? Math.ceil(299 / dailyRecovered) : Infinity
    return { lostPerMonth, upsellPerMonth, totalRecovered, paybackDays }
  }, [missed, avgValue, totalCalls])

  return (
    <section style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="section-pad" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-eyebrow">Revenue calculator</div>
          <h2 className="section-h">See what TalkMate <span className="orange">recovers</span> for you.</h2>
          <p className="section-p" style={{ margin: '12px auto 0' }}>
            Three sliders. Real numbers. No spreadsheet required.
          </p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20, padding: 36,
          display: 'grid', gap: 32,
          gridTemplateColumns: 'minmax(260px, 1fr) minmax(260px, 360px)',
        }} className="calc-grid">
          <style>{`@media (max-width: 800px) { .calc-grid { grid-template-columns: 1fr !important; } }`}</style>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <Slider
              label="Calls you miss each day"
              value={missed} setValue={setMissed} min={0} max={30} display={`${missed} calls`}
            />
            <Slider
              label="Average order or job value"
              value={avgValue} setValue={setAvgValue} min={20} max={500} step={5} display={`$${avgValue}`}
            />
            <Slider
              label="Total daily call volume"
              value={totalCalls} setValue={setTotalCalls} min={10} max={200} display={`${totalCalls} calls`}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Output
              label="Revenue captured each month"
              value={`$${Math.round(result.totalRecovered).toLocaleString()}`}
              hint={`From missed calls: $${Math.round(result.lostPerMonth).toLocaleString()} · upsell: $${Math.round(result.upsellPerMonth).toLocaleString()}`}
              accent="var(--orange)"
            />
            <Output
              label="Annual recovery"
              value={`$${Math.round(result.totalRecovered * 12).toLocaleString()}`}
              hint="Compounds every month"
              accent="var(--bluel)"
            />
            <Output
              label="Pays for itself in"
              value={result.paybackDays === Infinity ? '—' : `${result.paybackDays} day${result.paybackDays === 1 ? '' : 's'}`}
              hint="Starter plan, $299/mo"
              accent="var(--green)"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Slider({ label, value, setValue, min, max, step = 1, display }: {
  label: string; value: number; setValue: (n: number) => void; min: number; max: number; step?: number; display: string
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--orange)' }}>{display}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={e => setValue(Number(e.target.value))}
        style={{
          width: '100%', accentColor: 'var(--orange)', height: 6, cursor: 'pointer',
        }}
      />
    </div>
  )
}

function Output({ label, value, hint, accent }: { label: string; value: string; hint: string; accent: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid ${accent}40`,
      borderRadius: 12, padding: 16,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: accent, letterSpacing: '-0.5px', lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 5 }}>{hint}</div>
    </div>
  )
}
