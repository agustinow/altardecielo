import type { Testimonial } from '../entities/testimonial'
import type { Locale } from '../locale'

export interface TestimonialRepository {
  findAll(locale: Locale): Promise<Testimonial[]>
}
