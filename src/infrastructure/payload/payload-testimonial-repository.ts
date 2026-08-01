import type { Payload } from 'payload'

import type { Testimonial } from '@/domain/entities/testimonial'
import type { Locale } from '@/domain/locale'
import type { TestimonialRepository } from '@/domain/repositories/testimonial-repository'

export class PayloadTestimonialRepository implements TestimonialRepository {
  constructor(private readonly payload: Payload) {}

  async findAll(locale: Locale): Promise<Testimonial[]> {
    const result = await this.payload.find({
      collection: 'testimonials',
      locale,
      depth: 1,
      sort: 'order',
      pagination: false,
    })
    return result.docs.map((doc) => ({
      id: String(doc.id),
      name: doc.name,
      quote: doc.quote,
      serviceTitle:
        doc.service && typeof doc.service === 'object' ? doc.service.title : null,
    }))
  }
}
