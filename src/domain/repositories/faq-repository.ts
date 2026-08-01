import type { Faq } from '../entities/faq'
import type { Locale } from '../locale'

export interface FaqRepository {
  findAll(locale: Locale): Promise<Faq[]>
}
