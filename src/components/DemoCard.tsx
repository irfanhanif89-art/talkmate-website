'use client'

import { useState } from 'react'

type IndustryKey = 'food' | 'towing' | 'realestate' | 'trades'

interface Conversation {
  business: string
  bubbles: Array<{ from: 'caller' | 'agent'; text: string; orange?: boolean }>
  summary?: { lines: Array<[string, string]>; total?: [string, string] }
  stats: Array<{ n: string; l: string }>
}

const CONVERSATIONS: Record<IndustryKey, Conversation> = {
  food: {
    business: '🐟 Burleigh British Chippey',
    bubbles: [
      { from: 'caller', text: "G'day, can I get one large fish and chips please?" },
      { from: 'agent', text: 'No worries — large fish and chips. Would you like to add our garlic bread for $4? It pairs beautifully.' },
      { from: 'caller', text: 'Yeah go on, throw it in.' },
      { from: 'agent', text: "Sweet. What's the best number for the SMS confirmation?", orange: true },
    ],
    summary: {
      lines: [
        ['1× Large fish & chips', '$22.00'],
        ['1× Garlic bread', '$4.00'],
      ],
      total: ['Total · ETA 18 min', '$26.00'],
    },
    stats: [
      { n: '187', l: 'calls last month' },
      { n: '$6.2K', l: 'revenue recovered' },
      { n: '4 days', l: 'paid for itself' },
    ],
  },
  towing: {
    business: '🚛 Hume Towing',
    bubbles: [
      { from: 'caller', text: "I've broken down on the M1 northbound, just past Robina." },
      { from: 'agent', text: "Got it. Are you safe? I'll send a tow now. Can I confirm your name and a contact number?" },
      { from: 'caller', text: "Yeah I'm fine, pulled off. Adam, 0412 555 234." },
      { from: 'agent', text: 'Job logged #TM-2847. ETA 28 minutes. Driver will SMS when 5 min away.', orange: true },
    ],
    stats: [
      { n: '24/7', l: 'breakdown coverage' },
      { n: '$8.1K', l: 'recovered month 1' },
      { n: '<2s', l: 'answer time' },
    ],
  },
  realestate: {
    business: '🏡 Coastal Realty',
    bubbles: [
      { from: 'caller', text: 'Hi, I saw the listing on Norfolk Avenue, can I book an inspection?' },
      { from: 'agent', text: 'Sure. Are you pre-approved, and what budget range are you working with?' },
      { from: 'caller', text: "Yes, pre-approved up to $1.2M." },
      { from: 'agent', text: "Inspection booked Saturday 11am. Confirmation SMS coming through now.", orange: true },
    ],
    stats: [
      { n: '4×', l: 'qualified leads' },
      { n: '92%', l: 'inspection show rate' },
      { n: '24/7', l: 'enquiries captured' },
    ],
  },
  trades: {
    business: '🔧 Reliable Plumbing',
    bubbles: [
      { from: 'caller', text: "There's water leaking out of my hot water system, it's spreading." },
      { from: 'agent', text: "Sounds urgent. I'll get someone out today. Can I take your address and best contact number?" },
      { from: 'caller', text: "12 Banksia Drive, Mermaid Waters. 0412 999 100." },
      { from: 'agent', text: 'Booked for 3pm today. Plumber will SMS 30 min before arrival.', orange: true },
    ],
    stats: [
      { n: 'same-day', l: 'job booking' },
      { n: '$320', l: 'avg job value' },
      { n: '3.4×', l: 'lead conversion' },
    ],
  },
}

const TABS: Array<{ key: IndustryKey; label: string }> = [
  { key: 'food', label: 'Food' },
  { key: 'towing', label: 'Towing' },
  { key: 'realestate', label: 'Real Estate' },
  { key: 'trades', label: 'Trades' },
]

export default function DemoCard() {
  const [active, setActive] = useState<IndustryKey>('food')
  const data = CONVERSATIONS[active]

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 20,
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '14px 18px',
        background: 'rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{data.business}</span>
        </div>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: 'var(--green)', letterSpacing: '0.1em' }}>
          <span className="pulse-dot" style={{ width: 6, height: 6, background: 'var(--green)', borderRadius: '50%' }} />
          LIVE
        </span>
      </div>

      <div style={{ padding: '20px 18px' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 4 }}>
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              style={{
                flex: 1, padding: '7px',
                borderRadius: 7,
                fontFamily: 'Outfit, sans-serif',
                fontSize: 11, fontWeight: 600,
                color: active === t.key ? 'white' : 'rgba(255,255,255,0.4)',
                background: active === t.key ? 'var(--orange)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="fade-up" key={active} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16, minHeight: 200 }}>
          {data.bubbles.map((b, i) => (
            <div
              key={i}
              style={{
                maxWidth: '82%',
                padding: '10px 14px',
                borderRadius: 14,
                fontSize: 13,
                lineHeight: 1.5,
                alignSelf: b.from === 'caller' ? 'flex-start' : 'flex-end',
                background: b.from === 'caller' ? 'rgba(255,255,255,0.07)' : (b.orange ? 'var(--orange)' : 'var(--blue)'),
                color: b.from === 'caller' ? 'rgba(255,255,255,0.85)' : 'white',
                border: b.from === 'caller' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                borderBottomLeftRadius: b.from === 'caller' ? 4 : 14,
                borderBottomRightRadius: b.from === 'agent' ? 4 : 14,
              }}
            >{b.text}</div>
          ))}
        </div>

        {data.summary && (
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12,
            padding: 14, marginBottom: 14,
          }}>
            {data.summary.lines.map(([k, v], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.5)', padding: '3px 0' }}>
                <span>{k}</span><span>{v}</span>
              </div>
            ))}
            {data.summary.total && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: 'white', paddingTop: 8, marginTop: 6, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <span>{data.summary.total[0]}</span><span>{data.summary.total[1]}</span>
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {data.stats.map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 9, padding: 10, textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--orange)', letterSpacing: '-0.5px', lineHeight: 1, marginBottom: 2 }}>{s.n}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', lineHeight: 1.2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
