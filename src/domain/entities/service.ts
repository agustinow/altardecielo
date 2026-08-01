export type ServiceModality = 'online' | 'in-person' | 'both'

export type ServiceAccent = 'violet' | 'rose' | 'gold' | 'teal'

export interface ImageResource {
  url: string
  alt: string
  width?: number
  height?: number
}

/**
 * Opaque rich text content (serialized editor state). The domain doesn't
 * depend on any editor; the presentation layer knows how to render it.
 */
export type RichTextContent = unknown

export interface Service {
  id: string
  slug: string
  title: string
  excerpt: string
  description: RichTextContent | null
  benefits: string[]
  price: string | null
  duration: string | null
  modality: ServiceModality
  image: ImageResource | null
  accent: ServiceAccent
}
