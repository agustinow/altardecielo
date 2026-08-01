import type { Metadata } from 'next'
import { Cormorant_Garamond, Quicksand } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import type { Locale } from '@/domain/locale'
import { routing } from '@/i18n/routing'
import { getContainer } from '@/infrastructure/container'
import { Fairy } from '@/presentation/components/fairy'
import { Footer } from '@/presentation/components/footer'
import { Header } from '@/presentation/components/header'
import { localeAlternates } from '@/presentation/lib/seo'
import { THEME_STORAGE_KEY, THEMES } from '@/presentation/lib/theme'

import '../globals.css'

// Content lives in static files — prerender every locale at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

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
  setRequestLocale(locale)

  const container = await getContainer()
  const settings = await container.getSiteSettings(locale as Locale)

  // Applies the stored theme before first paint to avoid a flash.
  const themeScript = `try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(${JSON.stringify([...THEMES])}.indexOf(t)>-1){document.documentElement.dataset.theme=t}}catch(e){}`

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${quicksand.variable}`}
      suppressHydrationWarning
    >
      <body className="fairy-backdrop flex min-h-screen flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
