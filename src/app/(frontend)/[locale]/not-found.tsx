import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import { Sparkles } from '@/presentation/components/sparkles'

export default async function NotFound() {
  const t = await getTranslations('notFound')

  return (
    <section className="relative flex flex-col items-center px-4 py-20 text-center sm:py-32">
      <Sparkles count={12} />
      <h1 className="font-display text-5xl font-bold text-gradient-fairy sm:text-6xl">404</h1>
      <p className="mt-4 font-display text-2xl text-night sm:text-3xl">{t('title')}</p>
      <p className="mt-2 text-night-soft">{t('subtitle')}</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gradient-fairy px-8 py-3.5 font-semibold text-white shadow-lg shadow-fairy-violet/30 transition-transform hover:scale-105"
      >
        {t('backHome')} ✨
      </Link>
    </section>
  )
}
