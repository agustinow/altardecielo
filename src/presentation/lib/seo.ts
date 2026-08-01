import type { Metadata } from 'next'

import { DEFAULT_LOCALE, LOCALES } from '@/domain/locale'

/** hreflang alternates for a locale-agnostic path like "/services/tarot". */
export function localeAlternates(path: string): Metadata['alternates'] {
  const suffix = path === '/' ? '' : path
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [locale, `/${locale}${suffix}`]),
  )
  return {
    canonical: `/${DEFAULT_LOCALE}${suffix}`,
    languages: { ...languages, 'x-default': `/${DEFAULT_LOCALE}${suffix}` },
  }
}
