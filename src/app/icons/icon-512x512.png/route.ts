import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 512,
  height: 512,
}
export const contentType = 'image/png'

export default function icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 256,
          background: '#111827',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#be185d',
          borderRadius: '60px',
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
