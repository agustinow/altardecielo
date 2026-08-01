import type { Locale } from '../locale'

export interface ContactRequest {
  name: string
  email: string
  message: string
  serviceId: string | null
  locale: Locale
}
