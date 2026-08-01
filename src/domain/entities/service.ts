export type ServiceModality = 'online' | 'in-person' | 'both'

export type ServiceAccent = 'violet' | 'rose' | 'gold' | 'teal'

export interface ImageResource {
  url: string
  alt: string
  width?: number
  height?: number
}

export interface Service {
  id: string
  slug: string
  title: string
  excerpt: string
  /** Plain paragraphs. */
  description: string[]
  benefits: string[]
  duration: string | null
  modality: ServiceModality
  image: ImageResource | null
  accent: ServiceAccent
}
