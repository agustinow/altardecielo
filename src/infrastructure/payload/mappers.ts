import type { ImageResource } from '@/domain/entities/service'
import type { Media } from '@/payload-types'

export function mapImage(
  media: number | Media | null | undefined,
  preferredSize?: 'thumbnail' | 'card' | 'hero',
): ImageResource | null {
  if (!media || typeof media === 'number') return null

  const sized = preferredSize ? media.sizes?.[preferredSize] : undefined
  const url = sized?.url || media.url
  if (!url) return null

  return {
    url,
    alt: media.alt ?? '',
    width: (sized?.width || media.width) ?? undefined,
    height: (sized?.height || media.height) ?? undefined,
  }
}
