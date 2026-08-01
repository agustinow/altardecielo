import type { ImageResource } from './service'

export interface SiteSettings {
  siteName: string
  tagline: string | null
  heroTitle: string | null
  heroSubtitle: string | null
  aboutTitle: string | null
  /** Plain paragraphs. */
  aboutContent: string[]
  aboutImage: ImageResource | null
  whatsappNumber: string | null
  instagramUrl: string | null
  contactEmail: string | null
  contactIntro: string | null
}
