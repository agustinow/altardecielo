import type { Faq } from '@/domain/entities/faq'
import type { Locale } from '@/domain/locale'
import type { FaqRepository } from '@/domain/repositories/faq-repository'

export function getFaqs(repository: FaqRepository) {
  return (locale: Locale): Promise<Faq[]> => repository.findAll(locale)
}
