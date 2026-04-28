interface Props {
  size?: 'sm' | 'md'
  showWordmark?: boolean
}

export default function Logo({ size = 'md', showWordmark = true }: Props) {
  const tile = size === 'sm' ? 30 : 36
  const inner = size === 'sm' ? 18 : 22
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      <span style={{
        width: tile, height: tile,
        background: 'var(--orange)', borderRadius: 9,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <svg width={inner} height={inner} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="18" height="3.5" rx="1.5" fill="white" />
          <rect x="9.5" y="5" width="5" height="14" rx="1.5" fill="white" />
        </svg>
      </span>
      {showWordmark && (
        <span style={{ fontSize: size === 'sm' ? 16 : 18, fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>
          Talk<span style={{ fontWeight: 300, color: '#7EC8F5' }}>Mate</span>
        </span>
      )}
    </span>
  )
}
