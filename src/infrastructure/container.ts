import config from '@payload-config'
import { getPayload } from 'payload'

import { getFaqs } from '@/application/get-faqs'
import { getServiceBySlug } from '@/application/get-service-by-slug'
import { getServices } from '@/application/get-services'
import { getSiteSettings } from '@/application/get-site-settings'
import { getTestimonials } from '@/application/get-testimonials'

import { PayloadFaqRepository } from './payload/payload-faq-repository'
import { PayloadServiceRepository } from './payload/payload-service-repository'
import { PayloadSiteSettingsRepository } from './payload/payload-site-settings-repository'
import { PayloadTestimonialRepository } from './payload/payload-testimonial-repository'

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

  return {
    getServices: getServices(serviceRepository),
    getServiceBySlug: getServiceBySlug(serviceRepository),
    getTestimonials: getTestimonials(testimonialRepository),
    getFaqs: getFaqs(faqRepository),
    getSiteSettings: getSiteSettings(siteSettingsRepository),
  }
}
