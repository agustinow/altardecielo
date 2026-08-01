import Image from 'next/image'

import type { Service, ServiceAccent } from '@/domain/entities/service'
import { Link } from '@/i18n/navigation'

import { Reveal } from './reveal'

/** Bundled artwork used when a service has no image uploaded in the CMS. */
const FALLBACK_IMAGES: Record<string, string> = {
  tarot: '/images/services/tarot.webp',
  'registros-akashicos': '/images/services/registros-akashicos.webp',
  'limpieza-energetica': '/images/services/limpieza-energetica.webp',
}

const ACCENT_STYLES: Record<ServiceAccent, { halo: string; link: string }> = {
  violet: {
    halo: 'from-fairy-violet-soft',
    link: 'text-fairy-violet-deep',
  },
  rose: {
    halo: 'from-fairy-rose-soft',
    link: 'text-fairy-rose-deep',
  },
  gold: {
    halo: 'from-fairy-gold-soft',
    link: 'text-fairy-gold-deep',
  },
  teal: {
    halo: 'from-fairy-teal-soft',
    link: 'text-fairy-teal-deep',
  },
}

export function ServiceCard({
  service,
  learnMoreLabel,
  delay = 0,
}: {
  service: Service
  learnMoreLabel: string
  delay?: number
}) {
  const accent = ACCENT_STYLES[service.accent]
  const image =
    service.image ??
    (FALLBACK_IMAGES[service.slug]
      ? { url: FALLBACK_IMAGES[service.slug], alt: service.title }
      : null)

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className="fairy-card group flex h-full flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-lg shadow-fairy-violet/5 backdrop-blur-sm"
      >
        <div
          className={`relative h-48 w-full bg-gradient-to-br ${accent.halo} to-white`}
        >
          {image ? (
            <Image
              src={image.url}
              alt={image.alt || service.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-display text-6xl opacity-30">✦</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="font-display text-2xl font-semibold text-night">
            {service.title}
          </h3>
          <p className="flex-1 text-night-soft">{service.excerpt}</p>
          <span
            className={`text-sm font-semibold ${accent.link} transition-transform group-hover:translate-x-1`}
          >
            {learnMoreLabel} →
          </span>
        </div>
      </Link>
    </Reveal>
  )
}
