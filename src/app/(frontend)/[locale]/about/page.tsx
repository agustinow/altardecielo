import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import type { Locale } from '@/domain/locale'
import { getContainer } from '@/infrastructure/container'
import { Prose } from '@/presentation/components/prose'
import { Reveal } from '@/presentation/components/reveal'
import { Sparkles } from '@/presentation/components/sparkles'
import { localeAlternates } from '@/presentation/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const tAbout = await getTranslations({ locale, namespace: 'about' })
  return {
    title: tAbout('title'),
    description: t('aboutDescription'),
    alternates: localeAlternates('/about'),
  }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const container = await getContainer()

  const [settings, t] = await Promise.all([
    container.getSiteSettings(locale as Locale),
    getTranslations({ locale, namespace: 'about' }),
  ])

  return (
    <section className="relative px-4 py-14 sm:px-6 sm:py-20">
      <Sparkles count={8} />
      <div className="relative mx-auto max-w-4xl">
        <Reveal className="text-center">
          <h1 className="font-display text-4xl font-bold text-gradient-fairy sm:text-5xl lg:text-6xl">
            {settings.aboutTitle || t('fallbackTitle')}
          </h1>
        </Reveal>

        <div className="mt-10 flex flex-col items-center gap-8 sm:mt-12 sm:gap-10 md:flex-row md:items-start">
          {settings.aboutImage ? (
            <Reveal delay={0.1} className="shrink-0">
              <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white shadow-xl shadow-fairy-rose/20 sm:h-72 sm:w-72">
                <Image
                  src={settings.aboutImage.url}
                  alt={settings.aboutImage.alt || settings.siteName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 224px, 288px"
                />
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={0.15} className="flex-1">
            {settings.aboutContent.length > 0 ? (
              <Prose paragraphs={settings.aboutContent} />
            ) : (
              <p className="text-lg text-night-soft">{t('fallbackContent')}</p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
