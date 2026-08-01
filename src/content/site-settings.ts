import type { SiteSettings } from '@/domain/entities/site-settings'
import type { Locale } from '@/domain/locale'

const SHARED = {
  siteName: 'Altar de Cielo',
  whatsappNumber: '+59891919348',
  instagramUrl: 'https://instagram.com/altardecielo',
  contactEmail: null,
  aboutImage: null,
} satisfies Partial<SiteSettings>

export const SITE_SETTINGS: Record<Locale, SiteSettings> = {
  es: {
    ...SHARED,
    tagline: 'Tarot · Registros Akáshicos · Limpiezas Energéticas',
    heroTitle: 'Un espacio mágico para tu alma',
    heroSubtitle:
      'Tarot, registros akáshicos y limpiezas energéticas para reconectar con tu luz interior.',
    aboutTitle: 'Hola, soy Ara',
    aboutContent: [
      'Desde muy chica sentí una conexión especial con lo invisible. El tarot llegó a mi vida como un lenguaje para traducir aquello que el corazón ya sabe.',
      'Hoy acompaño a personas de todo el mundo a encontrar claridad, sanar su energía y reconectar con su propósito a través del tarot, los registros akáshicos y las limpiezas energéticas.',
    ],
    contactIntro:
      'Escribime y te respondo a la brevedad. ¡Será un gusto acompañarte!',
  },
  en: {
    ...SHARED,
    tagline: 'Tarot · Akashic Records · Energetic Cleanses',
    heroTitle: 'A magical space for your soul',
    heroSubtitle:
      'Tarot, akashic records and energetic cleanses to reconnect with your inner light.',
    aboutTitle: "Hi, I'm Ara",
    aboutContent: [
      'Since I was a little girl I felt a special connection with the unseen. Tarot came into my life as a language to translate what the heart already knows.',
      'Today I guide people from all over the world to find clarity, heal their energy and reconnect with their purpose through tarot, akashic records and energetic cleanses.',
    ],
    contactIntro:
      "Write to me and I'll get back to you shortly. It will be a joy to walk with you!",
  },
}
