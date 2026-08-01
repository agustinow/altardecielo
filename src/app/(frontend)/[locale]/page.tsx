import { getTranslations } from 'next-intl/server'

import type { Locale } from '@/domain/locale'
import { Link } from '@/i18n/navigation'
import { getContainer } from '@/infrastructure/container'
import { Hero } from '@/presentation/components/hero'
import { Reveal } from '@/presentation/components/reveal'
import { SectionHeading } from '@/presentation/components/section-heading'
import { ServiceCard } from '@/presentation/components/service-card'
import { TestimonialCarousel } from '@/presentation/components/testimonial-carousel'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const container = await getContainer()

  const [settings, services, testimonials, tHome, tCommon] = await Promise.all([
    container.getSiteSettings(locale as Locale),
    container.getServices(locale as Locale),
    container.getTestimonials(locale as Locale),
    getTranslations({ locale, namespace: 'home' }),
    getTranslations({ locale, namespace: 'common' }),
  ])

  return (
    <>
      <Hero
        title={settings.heroTitle || tHome('heroTitleFallback')}
        subtitle={settings.heroSubtitle || tHome('heroSubtitleFallback')}
        ctaLabel={tHome('heroCta')}
        ctaHref="/services"
        secondaryLabel={tHome('ctaButton')}
        secondaryHref="/contact"
      />

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title={tHome('servicesTitle')}
            subtitle={tHome('servicesSubtitle')}
          />
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
          {services.length > 3 ? (
            <Reveal className="mt-10 text-center">
              <Link
                href="/services"
                className="font-semibold text-fairy-violet-deep hover:underline"
              >
                {tCommon('seeAllServices')} →
              </Link>
            </Reveal>
          ) : null}
        </div>
      </section>

      {testimonials.length > 0 ? (
        <section className="px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              title={tHome('testimonialsTitle')}
              subtitle={tHome('testimonialsSubtitle')}
            />
            <Reveal>
              <TestimonialCarousel testimonials={testimonials} />
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-fairy px-6 py-12 text-center text-white shadow-xl shadow-fairy-violet/30 sm:px-8 sm:py-14">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              {tHome('ctaTitle')}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/90">{tHome('ctaSubtitle')}</p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 font-semibold text-fairy-violet-deep transition-transform hover:scale-105"
            >
              {tHome('ctaButton')} ✨
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
