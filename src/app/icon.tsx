import { ImageResponse } from 'next/og'

// Make sure this route is statically generated
export const dynamic = 'force-static';

export const size = {
  width: 48,
  height: 48,
}
export const contentType = 'image/png'

export default function icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 28,
          background: '#111827',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#be185d',
          borderRadius: '8px',
          fontWeight: 'bolder',
        }}
      >
        JK
      </div>
    ),
    {
      ...size,
    }
  )
}
