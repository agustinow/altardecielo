import type { SiteSettings } from '../entities/site-settings'
import type { Locale } from '../locale'

export interface SiteSettingsRepository {
  get(locale: Locale): Promise<SiteSettings>
}
