'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Link, usePathname } from '@/i18n/navigation'

import { LocaleSwitcher } from './locale-switcher'
import { ThemeSwitcher } from './theme-switcher'

const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/services', key: 'services' },
  { href: '/about', key: 'about' },
  { href: '/faq', key: 'faq' },
  { href: '/contact', key: 'contact' },
] as const

export function Header({ siteName }: { siteName: string }) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-40 border-b border-night/5 bg-cream/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-display text-2xl font-bold text-gradient-fairy"
          onClick={() => setOpen(false)}
        >
          ✦ {siteName}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-sm font-semibold transition-colors ${
                isActive(item.href)
                  ? 'text-fairy-violet-deep'
                  : 'text-night-soft hover:text-night'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
          <LocaleSwitcher />
          <ThemeSwitcher />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeSwitcher />
          <LocaleSwitcher />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-fairy-violet/20 bg-white/60"
          >
            <span
              className={`h-0.5 w-4 bg-night transition-transform ${open ? 'translate-y-1 rotate-45' : ''}`}
            />
            <span
              className={`h-0.5 w-4 bg-night transition-transform ${open ? '-translate-y-1 -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-night/5 px-4 pb-4 md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block py-2.5 text-base font-semibold ${
                isActive(item.href) ? 'text-fairy-violet-deep' : 'text-night-soft'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
