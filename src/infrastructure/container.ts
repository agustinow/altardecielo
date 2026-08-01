import { getFaqs } from '@/application/get-faqs'
import { getServiceBySlug } from '@/application/get-service-by-slug'
import { getServices } from '@/application/get-services'
import { getSiteSettings } from '@/application/get-site-settings'
import { getTestimonials } from '@/application/get-testimonials'

import { StaticFaqRepository } from './static/static-faq-repository'
import { StaticServiceRepository } from './static/static-service-repository'
import { StaticSiteSettingsRepository } from './static/static-site-settings-repository'
import { StaticTestimonialRepository } from './static/static-testimonial-repository'

/**
 * Composition root. Content is served from static files in `src/content`;
 * swap these repositories for CMS-backed ones if a CMS is reintroduced.
 */
export async function getContainer() {
  return {
    getServices: getServices(new StaticServiceRepository()),
    getServiceBySlug: getServiceBySlug(new StaticServiceRepository()),
    getTestimonials: getTestimonials(new StaticTestimonialRepository()),
    getFaqs: getFaqs(new StaticFaqRepository()),
    getSiteSettings: getSiteSettings(new StaticSiteSettingsRepository()),
  }
}
