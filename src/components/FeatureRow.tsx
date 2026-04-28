import type { LucideIcon } from 'lucide-react'

interface Props {
  icon?: LucideIcon
  emoji?: string
  title: string
  body: string
  accent?: string
  variant?: 'dark' | 'light'
}

export default function FeatureRow({ icon: Icon, emoji, title, body, accent = '#E8622A', variant = 'dark' }: Props) {
  const isDark = variant === 'dark'
  return (
    <div style={{
      display: 'flex', gap: 18, padding: 22,
      borderLeft: `3px solid ${accent}`,
      background: isDark ? 'rgba(255,255,255,0.03)' : 'white',
      border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid var(--edge)',
      borderLeftWidth: 3,
      borderLeftColor: accent,
      borderRadius: 12,
    }}>
      <div style={{
        width: 44, height: 44, flexShrink: 0,
        borderRadius: 11,
        background: `${accent}1f`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20,
      }}>
        {Icon ? <Icon size={22} color={accent} /> : <span>{emoji}</span>}
      </div>
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: isDark ? 'white' : 'var(--navy)', marginBottom: 6 }}>{title}</h3>
        <p style={{ fontSize: 14, color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--muted)', lineHeight: 1.6 }}>{body}</p>
      </div>
    </div>
  )
}
