import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#E8622A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ width: 20, height: 3.5, background: 'white', borderRadius: 1.5 }} />
          <div style={{ width: 6, height: 11, background: 'white', borderRadius: 1.5, marginTop: -0.5 }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
