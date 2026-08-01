import { getTestimonialsContent } from '@/content/testimonials'
import type { Testimonial } from '@/domain/entities/testimonial'
import type { Locale } from '@/domain/locale'
import type { TestimonialRepository } from '@/domain/repositories/testimonial-repository'

export class StaticTestimonialRepository implements TestimonialRepository {
  async findAll(locale: Locale): Promise<Testimonial[]> {
    return getTestimonialsContent(locale)
  }
}
