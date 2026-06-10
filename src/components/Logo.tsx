interface Props {
  size?: 'sm' | 'md'
  showWordmark?: boolean
}

export default function Logo({ size = 'md', showWordmark = true }: Props) {
  const tile = size === 'sm' ? 30 : 36
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      {/* Brand mark — canonical refreshed logo (squircle + gradient + wifi) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark.svg" alt="" aria-hidden="true" width={tile} height={tile} style={{ display: 'block', flexShrink: 0 }} />
      {showWordmark && (
        <span style={{ fontSize: size === 'sm' ? 16 : 18, fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>
          Talk<span style={{ fontWeight: 300, color: '#7EC8F5' }}>Mate</span>
        </span>
      )}
    </span>
  )
}
