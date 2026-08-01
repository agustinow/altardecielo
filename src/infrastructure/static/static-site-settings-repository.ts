import { SITE_SETTINGS } from '@/content/site-settings'
import type { SiteSettings } from '@/domain/entities/site-settings'
import type { Locale } from '@/domain/locale'
import type { SiteSettingsRepository } from '@/domain/repositories/site-settings-repository'

export class StaticSiteSettingsRepository implements SiteSettingsRepository {
  async get(locale: Locale): Promise<SiteSettings> {
    return SITE_SETTINGS[locale]
  }
}
