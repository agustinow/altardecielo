import type { Payload } from 'payload'

import type { Faq } from '@/domain/entities/faq'
import type { Locale } from '@/domain/locale'
import type { FaqRepository } from '@/domain/repositories/faq-repository'

export class PayloadFaqRepository implements FaqRepository {
  constructor(private readonly payload: Payload) {}

  async findAll(locale: Locale): Promise<Faq[]> {
    const result = await this.payload.find({
      collection: 'faqs',
      locale,
      sort: 'order',
      pagination: false,
    })
    return result.docs.map((doc) => ({
      id: String(doc.id),
      question: doc.question,
      answer: doc.answer,
    }))
  }
}
