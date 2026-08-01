'use client'

import { useLocale } from 'next-intl'

import { LOCALES } from '@/domain/locale'
import { usePathname, useRouter } from '@/i18n/navigation'

export function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex items-center gap-1 rounded-full border border-fairy-violet/20 bg-white/60 p-1 text-xs font-semibold">
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => router.replace(pathname, { locale: code })}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            code === locale
              ? 'bg-gradient-fairy text-white'
              : 'text-night-soft hover:text-night'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
