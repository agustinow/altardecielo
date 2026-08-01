import { getServicesContent } from '@/content/services'
import type { Service } from '@/domain/entities/service'
import type { Locale } from '@/domain/locale'
import type { ServiceRepository } from '@/domain/repositories/service-repository'

export class StaticServiceRepository implements ServiceRepository {
  async findAll(locale: Locale): Promise<Service[]> {
    return getServicesContent(locale)
  }

  async findBySlug(slug: string, locale: Locale): Promise<Service | null> {
    return (
      getServicesContent(locale).find((service) => service.slug === slug) ??
      null
    )
  }
}
