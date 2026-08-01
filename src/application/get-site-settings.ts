import type { SiteSettings } from '@/domain/entities/site-settings'
import type { Locale } from '@/domain/locale'
import type { SiteSettingsRepository } from '@/domain/repositories/site-settings-repository'

export function getSiteSettings(repository: SiteSettingsRepository) {
  return (locale: Locale): Promise<SiteSettings> => repository.get(locale)
}
