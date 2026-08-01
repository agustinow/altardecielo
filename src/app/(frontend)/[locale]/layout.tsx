import type { Metadata } from 'next'
import { Cormorant_Garamond, Quicksand } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import type { Locale } from '@/domain/locale'
import { routing } from '@/i18n/routing'
import { getContainer } from '@/infrastructure/container'
import { Fairy } from '@/presentation/components/fairy'
import { Footer } from '@/presentation/components/footer'
import { Header } from '@/presentation/components/header'
import { localeAlternates } from '@/presentation/lib/seo'

import '../globals.css'

// Content is managed in the CMS — render dynamically so edits show immediately.
export const dynamic = 'force-dynamic'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
    title: {
      default: `Altar de Cielo — ${t('titleTemplate')}`,
      template: '%s | Altar de Cielo',
    },
    description: t('description'),
    alternates: localeAlternates('/'),
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const container = await getContainer()
  const settings = await container.getSiteSettings(locale as Locale)

  return (
    <html lang={locale} className={`${cormorant.variable} ${quicksand.variable}`}>
      <body className="fairy-backdrop flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <Header siteName={settings.siteName} />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
          <Fairy />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
