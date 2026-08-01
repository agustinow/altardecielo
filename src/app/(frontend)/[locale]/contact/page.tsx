import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import type { Locale } from '@/domain/locale'
import { getContainer } from '@/infrastructure/container'
import { Reveal } from '@/presentation/components/reveal'
import { SectionHeading } from '@/presentation/components/section-heading'
import { buildWhatsAppUrl } from '@/presentation/lib/whatsapp'
import { localeAlternates } from '@/presentation/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const tContact = await getTranslations({ locale, namespace: 'contact' })
  return {
    title: tContact('title'),
    description: t('contactDescription'),
    alternates: localeAlternates('/contact'),
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  const container = await getContainer()

  const [settings, t] = await Promise.all([
    container.getSiteSettings(locale as Locale),
    getTranslations({ locale, namespace: 'contact' }),
  ])

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          title={t('title')}
          subtitle={settings.contactIntro || t('subtitle')}
        />

        <Reveal>
          <div className="rounded-3xl border border-white/60 bg-white/70 p-8 text-center shadow-lg shadow-fairy-violet/10 backdrop-blur-sm sm:p-12">
            <span aria-hidden className="text-5xl">
              💬
            </span>
            <p className="mx-auto mt-5 max-w-md text-night-soft">
              {t('whatsappIntro')}
            </p>
            {settings.whatsappNumber ? (
              <a
                href={buildWhatsAppUrl(settings.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block w-full max-w-96 rounded-full bg-gradient-fairy px-10 py-4 text-base font-semibold text-white shadow-lg shadow-fairy-violet/30 transition-transform hover:scale-105 sm:w-auto sm:text-lg"
              >
                {t('whatsappCta')} ✨
              </a>
            ) : null}
            {settings.instagramUrl ? (
              <p className="mt-8 text-sm text-night-soft">
                {t('instagramIntro')}{' '}
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-fairy-violet-deep hover:underline"
                >
                  Instagram
                </a>
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
