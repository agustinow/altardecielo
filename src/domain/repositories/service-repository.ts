import type { Service } from '../entities/service'
import type { Locale } from '../locale'

export interface ServiceRepository {
  findAll(locale: Locale): Promise<Service[]>
  findBySlug(slug: string, locale: Locale): Promise<Service | null>
}
