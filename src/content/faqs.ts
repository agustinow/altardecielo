import type { Faq } from '@/domain/entities/faq'
import type { Locale } from '@/domain/locale'

type FaqContent = {
  id: string
} & Record<Locale, { question: string; answer: string }>

const FAQS_CONTENT: FaqContent[] = [
  {
    id: 'online-session',
    es: {
      question: '¿Cómo se realiza una sesión online?',
      answer:
        'Nos encontramos por videollamada (Zoom o Meet). Solo necesitás un lugar tranquilo, buena conexión y un cuaderno para anotar lo que resuene.',
    },
    en: {
      question: 'How does an online session work?',
      answer:
        'We meet via video call (Zoom or Meet). You only need a quiet place, a good connection and a notebook to write down what resonates.',
    },
  },
  {
    id: 'experience',
    es: {
      question: '¿Necesito experiencia previa o creer en el tarot?',
      answer:
        'Para nada. Solo hace falta apertura y una intención sincera. Las cartas hablan igual para todas las personas.',
    },
    en: {
      question: 'Do I need previous experience or to believe in tarot?',
      answer:
        'Not at all. You only need openness and a sincere intention. The cards speak equally to everyone.',
    },
  },
  {
    id: 'booking',
    es: {
      question: '¿Cómo reservo y pago mi sesión?',
      answer:
        'Escribime por WhatsApp. Coordinamos día y horario, te cuento el valor de la sesión y te paso los medios de pago disponibles.',
    },
    en: {
      question: 'How do I book and pay for my session?',
      answer:
        'Message me on WhatsApp. We coordinate a date and time, I share the session price and the available payment methods.',
    },
  },
  {
    id: 'reschedule',
    es: {
      question: '¿Qué pasa si necesito reprogramar?',
      answer:
        'No hay problema: avisame con al menos 24 horas de anticipación y buscamos juntas un nuevo horario.',
    },
    en: {
      question: 'What if I need to reschedule?',
      answer:
        'No problem: let me know at least 24 hours in advance and we will find a new time together.',
    },
  },
]

export function getFaqsContent(locale: Locale): Faq[] {
  return FAQS_CONTENT.map((faq) => ({ id: faq.id, ...faq[locale] }))
}
