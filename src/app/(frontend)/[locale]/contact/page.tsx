import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import type { Locale } from '@/domain/locale'
import { getContainer } from '@/infrastructure/container'
import { ContactForm } from '@/presentation/components/contact-form'
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

  const [settings, services, t] = await Promise.all([
    container.getSiteSettings(locale as Locale),
    container.getServices(locale as Locale),
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
          <div className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-lg shadow-fairy-violet/10 backdrop-blur-sm sm:p-8">
            <ContactForm
              services={services.map((s) => ({ id: s.id, title: s.title }))}
            />
          </div>
        </Reveal>

        {settings.whatsappNumber ? (
          <Reveal delay={0.1} className="mt-10 text-center">
            <p className="text-night-soft">{t('orWhatsapp')}</p>
            <a
              href={buildWhatsAppUrl(settings.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-full border-2 border-fairy-teal bg-white/70 px-8 py-3 font-semibold text-fairy-teal-deep transition-colors hover:bg-fairy-teal-soft"
            >
              {t('whatsappCta')} 💬
            </a>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
