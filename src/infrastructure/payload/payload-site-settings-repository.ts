import type { Payload } from 'payload'

import type { SiteSettings } from '@/domain/entities/site-settings'
import type { Locale } from '@/domain/locale'
import type { SiteSettingsRepository } from '@/domain/repositories/site-settings-repository'

import { mapImage } from './mappers'

export class PayloadSiteSettingsRepository implements SiteSettingsRepository {
  constructor(private readonly payload: Payload) {}

  async get(locale: Locale): Promise<SiteSettings> {
    const doc = await this.payload.findGlobal({
      slug: 'site-settings',
      locale,
      depth: 1,
    })
    return {
      siteName: doc.siteName || 'Altar de Cielo',
      tagline: doc.tagline ?? null,
      heroTitle: doc.heroTitle ?? null,
      heroSubtitle: doc.heroSubtitle ?? null,
      aboutTitle: doc.aboutTitle ?? null,
      aboutContent: doc.aboutContent ?? null,
      aboutImage: mapImage(doc.aboutImage),
      whatsappNumber: doc.whatsappNumber ?? null,
      instagramUrl: doc.instagramUrl ?? null,
      contactEmail: doc.contactEmail ?? null,
      contactIntro: doc.contactIntro ?? null,
    }
  }
}
