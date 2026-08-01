import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import type { Locale } from '@/domain/locale'
import { getContainer } from '@/infrastructure/container'
import { SectionHeading } from '@/presentation/components/section-heading'
import { ServiceCard } from '@/presentation/components/service-card'
import { Sparkles } from '@/presentation/components/sparkles'
import { localeAlternates } from '@/presentation/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const tServices = await getTranslations({ locale, namespace: 'services' })
  return {
    title: tServices('title'),
    description: t('servicesDescription'),
    alternates: localeAlternates('/services'),
  }
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  const container = await getContainer()

  const [services, t, tCommon] = await Promise.all([
    container.getServices(locale as Locale),
    getTranslations({ locale, namespace: 'services' }),
    getTranslations({ locale, namespace: 'common' }),
  ])

  return (
    <section className="relative px-4 py-14 sm:px-6 sm:py-20">
      <Sparkles count={10} />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              learnMoreLabel={tCommon('learnMore')}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
