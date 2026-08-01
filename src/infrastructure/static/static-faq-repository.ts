import { getFaqsContent } from '@/content/faqs'
import type { Faq } from '@/domain/entities/faq'
import type { Locale } from '@/domain/locale'
import type { FaqRepository } from '@/domain/repositories/faq-repository'

export class StaticFaqRepository implements FaqRepository {
  async findAll(locale: Locale): Promise<Faq[]> {
    return getFaqsContent(locale)
  }
}
