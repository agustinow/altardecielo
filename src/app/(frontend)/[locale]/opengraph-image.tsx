import { ImageResponse } from 'next/og'

import { DEFAULT_LOCALE } from '@/domain/locale'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const tagline =
    locale === DEFAULT_LOCALE
      ? 'Tarot · Registros Akáshicos · Limpiezas Energéticas'
      : 'Tarot · Akashic Records · Energetic Cleanses'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(120deg, #ede9fe 0%, #fce7f3 45%, #fef3c7 100%)',
          color: '#372554',
        }}
      >
        <div style={{ fontSize: 44, display: 'flex' }}>✦ ✧ ✦</div>
        <div
          style={{
            fontSize: 110,
            fontWeight: 700,
            display: 'flex',
            background: 'linear-gradient(100deg, #6d28d9, #ec4899, #d97706)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Altar de Cielo
        </div>
        <div style={{ fontSize: 36, display: 'flex', color: '#5b4a7a' }}>{tagline}</div>
      </div>
    ),
    size,
  )
}
