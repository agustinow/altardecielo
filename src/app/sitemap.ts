import type { MetadataRoute } from 'next'

import { LOCALES } from '@/domain/locale'
import { getContainer } from '@/infrastructure/container'

const STATIC_PATHS = ['', '/services', '/about', '/faq', '/contact']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const container = await getContainer()
  const services = await container.getServices('es')

  const paths = [
    ...STATIC_PATHS,
    ...services.map((service) => `/services/${service.slug}`),
  ]

  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${base}/${l}${path}`]),
        ),
      },
    })),
  )
}
