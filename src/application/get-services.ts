import type { Service } from '@/domain/entities/service'
import type { Locale } from '@/domain/locale'
import type { ServiceRepository } from '@/domain/repositories/service-repository'

export function getServices(repository: ServiceRepository) {
  return (locale: Locale): Promise<Service[]> => repository.findAll(locale)
}
