import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import type { Locale } from '@/domain/locale'
import { getContainer } from '@/infrastructure/container'
import { Reveal } from '@/presentation/components/reveal'
import { SectionHeading } from '@/presentation/components/section-heading'
import { localeAlternates } from '@/presentation/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const tFaq = await getTranslations({ locale, namespace: 'faq' })
  return {
    title: tFaq('title'),
    description: t('faqDescription'),
    alternates: localeAlternates('/faq'),
  }
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params
  const container = await getContainer()

  const [faqs, t] = await Promise.all([
    container.getFaqs(locale as Locale),
    getTranslations({ locale, namespace: 'faq' }),
  ])

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.id} delay={i * 0.06}>
              <details className="group rounded-2xl border border-white/60 bg-white/70 shadow-sm backdrop-blur-sm open:shadow-md open:shadow-fairy-violet/10">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 font-semibold text-night [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden
                    className="text-fairy-violet transition-transform group-open:rotate-45"
                  >
                    ✦
                  </span>
                </summary>
                <p className="px-6 pb-5 leading-relaxed text-night-soft">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
