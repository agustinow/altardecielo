import type { Testimonial } from '@/domain/entities/testimonial'
import type { Locale } from '@/domain/locale'

type TestimonialContent = {
  id: string
  name: string
} & Record<Locale, { quote: string; serviceTitle: string | null }>

/**
 * Real testimonials go here. The homepage section appears automatically
 * once this list has at least one entry.
 *
 * Example:
 * {
 *   id: 'lucia',
 *   name: 'Lucía M.',
 *   es: { quote: '...', serviceTitle: 'Lectura de Tarot' },
 *   en: { quote: '...', serviceTitle: 'Tarot Reading' },
 * }
 */
const TESTIMONIALS_CONTENT: TestimonialContent[] = []

export function getTestimonialsContent(locale: Locale): Testimonial[] {
  return TESTIMONIALS_CONTENT.map((testimonial) => ({
    id: testimonial.id,
    name: testimonial.name,
    quote: testimonial[locale].quote,
    serviceTitle: testimonial[locale].serviceTitle,
  }))
}
