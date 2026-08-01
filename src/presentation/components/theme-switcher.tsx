'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  THEMES,
  type Theme,
} from '@/presentation/lib/theme'

const SWATCHES: Record<Theme, string> = {
  fairy: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
  aura: 'conic-gradient(from 40deg, #f97316, #e93bb4, #5a5af0, #67e8f9, #10b981, #fde047, #f97316)',
}

export function ThemeSwitcher() {
  const t = useTranslations('theme')
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME)

  // The real theme is only known on the client (localStorage).
  useEffect(() => {
    const stored = document.documentElement.dataset.theme as Theme | undefined
    if (stored && THEMES.includes(stored)) setTheme(stored)
  }, [])

  const apply = (next: Theme) => {
    setTheme(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Storage may be unavailable (private mode); the theme still applies.
    }
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-fairy-violet/20 bg-white/60 p-1">
      {THEMES.map((name) => (
        <button
          key={name}
          type="button"
          aria-label={t(name)}
          title={t(name)}
          aria-pressed={name === theme}
          onClick={() => apply(name)}
          className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${
            name === theme
              ? 'ring-2 ring-fairy-violet/60 ring-offset-1'
              : 'opacity-60 hover:opacity-100'
          }`}
        >
          <span
            aria-hidden
            className="h-4 w-4 rounded-full"
            style={{ background: SWATCHES[name] }}
          />
        </button>
      ))}
    </div>
  )
}
