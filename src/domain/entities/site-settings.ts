import type { ImageResource, RichTextContent } from './service'

export interface SiteSettings {
  siteName: string
  tagline: string | null
  heroTitle: string | null
  heroSubtitle: string | null
  aboutTitle: string | null
  aboutContent: RichTextContent | null
  aboutImage: ImageResource | null
  whatsappNumber: string | null
  instagramUrl: string | null
  contactEmail: string | null
  contactIntro: string | null
}
