import type { Testimonial } from '@/domain/entities/testimonial'
import type { Locale } from '@/domain/locale'
import type { TestimonialRepository } from '@/domain/repositories/testimonial-repository'

export function getTestimonials(repository: TestimonialRepository) {
  return (locale: Locale): Promise<Testimonial[]> => repository.findAll(locale)
}
