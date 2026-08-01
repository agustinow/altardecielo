import type { Service } from '@/domain/entities/service'
import type { Locale } from '@/domain/locale'

type LocalizedServiceContent = {
  title: string
  excerpt: string
  description: string[]
  benefits: string[]
  duration: string
}

type ServiceContent = Pick<Service, 'slug' | 'accent' | 'modality'> & {
  order: number
  image: string | null
} & Record<Locale, LocalizedServiceContent>

const SERVICES_CONTENT: ServiceContent[] = [
  {
    slug: 'tarot',
    accent: 'violet',
    modality: 'both',
    order: 1,
    image: '/images/services/tarot.webp',
    es: {
      title: 'Lectura de Tarot',
      excerpt:
        'Una tirada personalizada para encontrar claridad y orientación en tu presente.',
      description: [
        'El tarot es un espejo del alma. En cada sesión abrimos un espacio íntimo y seguro donde las cartas nos ayudan a iluminar aquello que necesitás ver.',
        'Trabajamos sobre tus preguntas concretas — amor, trabajo, decisiones, ciclos — con una mirada amorosa y sin juicios.',
      ],
      benefits: [
        'Claridad sobre tu momento presente',
        'Orientación para tomar decisiones',
        'Un espacio de escucha sin juicios',
      ],
      duration: '60 minutos',
    },
    en: {
      title: 'Tarot Reading',
      excerpt:
        'A personalized spread to find clarity and guidance in your present moment.',
      description: [
        'Tarot is a mirror of the soul. In each session we open an intimate, safe space where the cards help illuminate what you need to see.',
        'We work on your specific questions — love, work, decisions, cycles — with a loving, judgment-free approach.',
      ],
      benefits: [
        'Clarity about your present moment',
        'Guidance for making decisions',
        'A judgment-free listening space',
      ],
      duration: '60 minutes',
    },
  },
  {
    slug: 'registros-akashicos',
    accent: 'gold',
    modality: 'online',
    order: 2,
    image: '/images/services/registros-akashicos.webp',
    es: {
      title: 'Registros Akáshicos',
      excerpt:
        'Una lectura profunda de la memoria de tu alma para comprender tu camino.',
      description: [
        'Los registros akáshicos son la memoria energética de tu alma: todo lo que fuiste, sos y podés llegar a ser.',
        'En esta sesión accedemos a esa información con permiso y respeto, para responder tus preguntas más profundas y liberar patrones que ya no te sirven.',
      ],
      benefits: [
        'Comprensión profunda de patrones repetitivos',
        'Conexión con el propósito de tu alma',
        'Sanación de vínculos y memorias',
      ],
      duration: '90 minutos',
    },
    en: {
      title: 'Akashic Records',
      excerpt: "A deep reading of your soul's memory to understand your path.",
      description: [
        'The akashic records are the energetic memory of your soul: everything you were, are and can become.',
        'In this session we access that information with permission and respect, to answer your deepest questions and release patterns that no longer serve you.',
      ],
      benefits: [
        'Deep understanding of repeating patterns',
        "Connection with your soul's purpose",
        'Healing of bonds and memories',
      ],
      duration: '90 minutes',
    },
  },
  {
    slug: 'limpieza-energetica',
    accent: 'teal',
    modality: 'both',
    order: 3,
    image: '/images/services/limpieza-energetica.webp',
    es: {
      title: 'Limpieza Energética',
      excerpt:
        'Liberá cargas y bloqueos para que tu energía vuelva a fluir liviana.',
      description: [
        'Nuestro campo energético acumula cargas: emociones densas, ambientes pesados, vínculos que drenan.',
        'Con esta limpieza armonizamos tu energía y la de tus espacios, para que vuelvas a sentirte liviana, protegida y en tu centro.',
      ],
      benefits: [
        'Sensación inmediata de liviandad',
        'Protección y armonización de tu campo',
        'Limpieza de ambientes y espacios',
      ],
      duration: '75 minutos',
    },
    en: {
      title: 'Energetic Cleanse',
      excerpt: 'Release burdens and blockages so your energy flows light again.',
      description: [
        'Our energy field accumulates burdens: dense emotions, heavy environments, draining bonds.',
        'With this cleanse we harmonize your energy and that of your spaces, so you feel light, protected and centered again.',
      ],
      benefits: [
        'Immediate feeling of lightness',
        'Protection and harmonization of your field',
        'Cleansing of environments and spaces',
      ],
      duration: '75 minutes',
    },
  },
]

export function getServicesContent(locale: Locale): Service[] {
  return [...SERVICES_CONTENT]
    .sort((a, b) => a.order - b.order)
    .map((service) => ({
      id: service.slug,
      slug: service.slug,
      accent: service.accent,
      modality: service.modality,
      image: service.image
        ? { url: service.image, alt: service[locale].title }
        : null,
      title: service[locale].title,
      excerpt: service[locale].excerpt,
      description: service[locale].description,
      benefits: service[locale].benefits,
      duration: service[locale].duration,
    }))
}
