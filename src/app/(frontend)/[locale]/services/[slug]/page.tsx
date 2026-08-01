import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import type { ServiceModality } from '@/domain/entities/service'
import type { Locale } from '@/domain/locale'
import { getContainer } from '@/infrastructure/container'
import { buildWhatsAppUrl } from '@/presentation/lib/whatsapp'
import { localeAlternates } from '@/presentation/lib/seo'
import { Reveal } from '@/presentation/components/reveal'
import { RichText } from '@/presentation/components/rich-text'
import { ServiceCard } from '@/presentation/components/service-card'

type Props = { params: Promise<{ locale: string; slug: string }> }

const MODALITY_KEYS: Record<ServiceModality, string> = {
  online: 'modalityOnline',
  'in-person': 'modalityInPerson',
  both: 'modalityBoth',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const container = await getContainer()
  const service = await container.getServiceBySlug(slug, locale as Locale)
  if (!service) return {}
  return {
    title: service.title,
    description: service.excerpt,
    alternates: localeAlternates(`/services/${slug}`),
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params
  const container = await getContainer()

  const [service, allServices, settings, t, tCommon] = await Promise.all([
    container.getServiceBySlug(slug, locale as Locale),
    container.getServices(locale as Locale),
    container.getSiteSettings(locale as Locale),
    getTranslations({ locale, namespace: 'services' }),
    getTranslations({ locale, namespace: 'common' }),
  ])

  if (!service) notFound()

  const others = allServices.filter((s) => s.id !== service.id).slice(0, 3)
  const whatsappUrl = settings.whatsappNumber
    ? buildWhatsAppUrl(
        settings.whatsappNumber,
        tCommon('whatsappMessage', { service: service.title }),
      )
    : null

  const details: { label: string; value: string }[] = [
    service.price ? { label: tCommon('price'), value: service.price } : null,
    service.duration ? { label: tCommon('duration'), value: service.duration } : null,
    {
      label: tCommon('modality'),
      value: tCommon(MODALITY_KEYS[service.modality]),
    },
  ].filter((d): d is { label: string; value: string } => d !== null)

  return (
    <article className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <header className="text-center">
            <h1 className="font-display text-4xl font-bold text-gradient-fairy sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-night-soft sm:text-lg">
              {service.excerpt}
            </p>
          </header>
        </Reveal>

        {service.image ? (
          <Reveal delay={0.1} className="mt-8 sm:mt-10">
            <div className="relative h-56 overflow-hidden rounded-3xl shadow-xl shadow-fairy-violet/15 sm:h-72 lg:h-96">
              <Image
                src={service.image.url}
                alt={service.image.alt || service.title}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={0.15} className="mt-8 sm:mt-10">
          <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="rounded-2xl border border-white/60 bg-white/70 px-6 py-3 text-center shadow-sm backdrop-blur-sm"
              >
                <span className="block text-xs font-semibold tracking-wide text-fairy-violet-deep uppercase">
                  {detail.label}
                </span>
                <span className="mt-0.5 block font-semibold text-night">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {service.description ? (
          <Reveal delay={0.2} className="mt-12">
            <RichText content={service.description} />
          </Reveal>
        ) : null}

        {service.benefits.length > 0 ? (
          <Reveal delay={0.2} className="mt-12">
            <h2 className="font-display text-3xl font-semibold text-night">
              {t('benefitsTitle')}
            </h2>
            <ul className="mt-5 space-y-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-night-soft">
                  <span aria-hidden className="mt-0.5 text-fairy-gold">
                    ✦
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        {whatsappUrl ? (
          <Reveal delay={0.25} className="mt-10 text-center sm:mt-14">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full max-w-96 rounded-full bg-gradient-fairy px-10 py-4 text-base font-semibold text-white shadow-lg shadow-fairy-violet/30 transition-transform hover:scale-105 sm:w-auto sm:text-lg"
            >
              {tCommon('bookWhatsapp')} ✨
            </a>
          </Reveal>
        ) : null}
      </div>

      {others.length > 0 ? (
        <div className="mx-auto mt-16 max-w-6xl sm:mt-24">
          <Reveal className="mb-8 text-center sm:mb-10">
            <h2 className="font-display text-3xl font-semibold text-gradient-fairy sm:text-4xl">
              {t('otherServices')}
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {others.map((other, i) => (
              <ServiceCard
                key={other.id}
                service={other}
                learnMoreLabel={tCommon('learnMore')}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      ) : null}
    </article>
  )
}
