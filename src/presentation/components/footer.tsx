import { getTranslations } from 'next-intl/server'

import type { SiteSettings } from '@/domain/entities/site-settings'
import { Link } from '@/i18n/navigation'
import { buildWhatsAppUrl } from '@/presentation/lib/whatsapp'

export async function Footer({ settings }: { settings: SiteSettings }) {
  const t = await getTranslations('footer')

  return (
    <footer className="border-t border-night/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
        <Link href="/" className="font-display text-2xl font-bold text-gradient-fairy">
          ✦ {settings.siteName}
        </Link>
        <p className="text-sm text-night-soft">{settings.tagline || t('tagline')}</p>

        <div className="flex items-center gap-4 text-sm font-semibold text-fairy-violet-deep">
          {settings.whatsappNumber ? (
            <a
              href={buildWhatsAppUrl(settings.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              WhatsApp
            </a>
          ) : null}
          {settings.instagramUrl ? (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Instagram
            </a>
          ) : null}
          {settings.contactEmail ? (
            <a href={`mailto:${settings.contactEmail}`} className="hover:underline">
              Email
            </a>
          ) : null}
        </div>

        <p className="text-xs text-night-soft/70">
          © {new Date().getFullYear()} {settings.siteName}. {t('rights')} ·{' '}
          {t('madeWith')} ✨
        </p>
      </div>
    </footer>
  )
}
