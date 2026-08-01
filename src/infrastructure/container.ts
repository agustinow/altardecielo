import config from '@payload-config'
import { getPayload } from 'payload'

import { getFaqs } from '@/application/get-faqs'
import { getServiceBySlug } from '@/application/get-service-by-slug'
import { getServices } from '@/application/get-services'
import { getSiteSettings } from '@/application/get-site-settings'
import { getTestimonials } from '@/application/get-testimonials'
import { submitContactRequest } from '@/application/submit-contact-request'
import type { ContactNotifier } from '@/domain/services/contact-notifier'

import {
  ConsoleContactNotifier,
  ResendContactNotifier,
} from './email/resend-contact-notifier'
import { PayloadContactRequestRepository } from './payload/payload-contact-request-repository'
import { PayloadFaqRepository } from './payload/payload-faq-repository'
import { PayloadServiceRepository } from './payload/payload-service-repository'
import { PayloadSiteSettingsRepository } from './payload/payload-site-settings-repository'
import { PayloadTestimonialRepository } from './payload/payload-testimonial-repository'

function createNotifier(): ContactNotifier {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL_TO
  if (apiKey && to) {
    const from = process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev'
    return new ResendContactNotifier(apiKey, to, from)
  }
  return new ConsoleContactNotifier()
}

/**
 * Composition root. `getPayload` caches its instance across calls, so this is
 * cheap to call from any server component or action.
 */
export async function getContainer() {
  const payload = await getPayload({ config })

  const serviceRepository = new PayloadServiceRepository(payload)
  const testimonialRepository = new PayloadTestimonialRepository(payload)
  const faqRepository = new PayloadFaqRepository(payload)
  const siteSettingsRepository = new PayloadSiteSettingsRepository(payload)
  const contactRequestRepository = new PayloadContactRequestRepository(payload)

  return {
    getServices: getServices(serviceRepository),
    getServiceBySlug: getServiceBySlug(serviceRepository),
    getTestimonials: getTestimonials(testimonialRepository),
    getFaqs: getFaqs(faqRepository),
    getSiteSettings: getSiteSettings(siteSettingsRepository),
    submitContactRequest: submitContactRequest(contactRequestRepository, createNotifier()),
  }
}
