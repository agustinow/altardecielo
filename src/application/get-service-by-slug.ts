import type { Service } from '@/domain/entities/service'
import type { Locale } from '@/domain/locale'
import type { ServiceRepository } from '@/domain/repositories/service-repository'

export function getServiceBySlug(repository: ServiceRepository) {
  return (slug: string, locale: Locale): Promise<Service | null> =>
    repository.findBySlug(slug, locale)
}
