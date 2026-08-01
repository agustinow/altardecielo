import config from '@payload-config'
import { getPayload } from 'payload'

/** Minimal Lexical editor state from plain paragraphs. */
function richText(...paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        version: 1,
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            version: 1,
          },
        ],
        direction: null,
        format: '' as const,
        indent: 0,
      })),
      direction: null,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'hola@altardecielo.com'
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'cambiame-123'

async function seed() {
  const payload = await getPayload({ config })

  // Admin user
  const users = await payload.find({ collection: 'users', limit: 1 })
  if (users.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { name: 'Ara', email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    })
    payload.logger.info(`Admin user created: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
  } else {
    payload.logger.info('Users already exist — skipping admin creation.')
  }

  // Site settings
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'es',
    data: {
      siteName: 'Altar de Cielo',
      tagline: 'Tarot · Registros Akáshicos · Limpiezas Energéticas',
      heroTitle: 'Un espacio mágico para tu alma',
      heroSubtitle:
        'Tarot, registros akáshicos y limpiezas energéticas para reconectar con tu luz interior.',
      aboutTitle: 'Hola, soy Ara',
      aboutContent: richText(
        'Desde muy chica sentí una conexión especial con lo invisible. El tarot llegó a mi vida como un lenguaje para traducir aquello que el corazón ya sabe.',
        'Hoy acompaño a personas de todo el mundo a encontrar claridad, sanar su energía y reconectar con su propósito a través del tarot, los registros akáshicos y las limpiezas energéticas.',
      ),
      whatsappNumber: '5491100000000',
      instagramUrl: 'https://instagram.com/altardecielo',
      contactEmail: 'hola@altardecielo.com',
      contactIntro: 'Escribime y te respondo a la brevedad. ¡Será un gusto acompañarte!',
    },
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      siteName: 'Altar de Cielo',
      tagline: 'Tarot · Akashic Records · Energetic Cleanses',
      heroTitle: 'A magical space for your soul',
      heroSubtitle:
        'Tarot, akashic records and energetic cleanses to reconnect with your inner light.',
      aboutTitle: "Hi, I'm Ara",
      aboutContent: richText(
        'Since I was a little girl I felt a special connection with the unseen. Tarot came into my life as a language to translate what the heart already knows.',
        'Today I guide people from all over the world to find clarity, heal their energy and reconnect with their purpose through tarot, akashic records and energetic cleanses.',
      ),
      contactIntro: "Write to me and I'll get back to you shortly. It will be a joy to walk with you!",
    },
  })
  payload.logger.info('Site settings seeded.')

  // Services
  const existingServices = await payload.find({ collection: 'services', limit: 1 })
  if (existingServices.totalDocs > 0) {
    payload.logger.info('Content already exists — skipping services/testimonials/FAQs.')
    return
  }

  const servicesData = [
    {
      slug: 'tarot',
      accent: 'violet' as const,
      order: 1,
      modality: 'both' as const,
      es: {
        title: 'Lectura de Tarot',
        excerpt:
          'Una tirada personalizada para encontrar claridad y orientación en tu presente.',
        description: richText(
          'El tarot es un espejo del alma. En cada sesión abrimos un espacio íntimo y seguro donde las cartas nos ayudan a iluminar aquello que necesitás ver.',
          'Trabajamos sobre tus preguntas concretas — amor, trabajo, decisiones, ciclos — con una mirada amorosa y sin juicios.',
        ),
        benefits: [
          'Claridad sobre tu momento presente',
          'Orientación para tomar decisiones',
          'Un espacio de escucha sin juicios',
        ],
        price: 'AR$ 25.000',
        duration: '60 minutos',
      },
      en: {
        title: 'Tarot Reading',
        excerpt:
          'A personalized spread to find clarity and guidance in your present moment.',
        description: richText(
          'Tarot is a mirror of the soul. In each session we open an intimate, safe space where the cards help illuminate what you need to see.',
          'We work on your specific questions — love, work, decisions, cycles — with a loving, judgment-free approach.',
        ),
        benefits: [
          'Clarity about your present moment',
          'Guidance for making decisions',
          'A judgment-free listening space',
        ],
        price: 'USD 30',
        duration: '60 minutes',
      },
    },
    {
      slug: 'registros-akashicos',
      accent: 'gold' as const,
      order: 2,
      modality: 'online' as const,
      es: {
        title: 'Registros Akáshicos',
        excerpt:
          'Una lectura profunda de la memoria de tu alma para comprender tu camino.',
        description: richText(
          'Los registros akáshicos son la memoria energética de tu alma: todo lo que fuiste, sos y podés llegar a ser.',
          'En esta sesión accedemos a esa información con permiso y respeto, para responder tus preguntas más profundas y liberar patrones que ya no te sirven.',
        ),
        benefits: [
          'Comprensión profunda de patrones repetitivos',
          'Conexión con el propósito de tu alma',
          'Sanación de vínculos y memorias',
        ],
        price: 'AR$ 35.000',
        duration: '90 minutos',
      },
      en: {
        title: 'Akashic Records',
        excerpt: "A deep reading of your soul's memory to understand your path.",
        description: richText(
          'The akashic records are the energetic memory of your soul: everything you were, are and can become.',
          'In this session we access that information with permission and respect, to answer your deepest questions and release patterns that no longer serve you.',
        ),
        benefits: [
          'Deep understanding of repeating patterns',
          "Connection with your soul's purpose",
          'Healing of bonds and memories',
        ],
        price: 'USD 45',
        duration: '90 minutes',
      },
    },
    {
      slug: 'limpieza-energetica',
      accent: 'teal' as const,
      order: 3,
      modality: 'both' as const,
      es: {
        title: 'Limpieza Energética',
        excerpt:
          'Liberá cargas y bloqueos para que tu energía vuelva a fluir liviana.',
        description: richText(
          'Nuestro campo energético acumula cargas: emociones densas, ambientes pesados, vínculos que drenan.',
          'Con esta limpieza armonizamos tu energía y la de tus espacios, para que vuelvas a sentirte liviana, protegida y en tu centro.',
        ),
        benefits: [
          'Sensación inmediata de liviandad',
          'Protección y armonización de tu campo',
          'Limpieza de ambientes y espacios',
        ],
        price: 'AR$ 28.000',
        duration: '75 minutos',
      },
      en: {
        title: 'Energetic Cleanse',
        excerpt: 'Release burdens and blockages so your energy flows light again.',
        description: richText(
          'Our energy field accumulates burdens: dense emotions, heavy environments, draining bonds.',
          'With this cleanse we harmonize your energy and that of your spaces, so you feel light, protected and centered again.',
        ),
        benefits: [
          'Immediate feeling of lightness',
          'Protection and harmonization of your field',
          'Cleansing of environments and spaces',
        ],
        price: 'USD 35',
        duration: '75 minutes',
      },
    },
  ]

  const serviceIds: Record<string, number> = {}
  for (const service of servicesData) {
    const created = await payload.create({
      collection: 'services',
      locale: 'es',
      data: {
        slug: service.slug,
        accent: service.accent,
        order: service.order,
        modality: service.modality,
        title: service.es.title,
        excerpt: service.es.excerpt,
        description: service.es.description,
        benefits: service.es.benefits.map((benefit) => ({ benefit })),
        price: service.es.price,
        duration: service.es.duration,
      },
    })
    await payload.update({
      collection: 'services',
      id: created.id,
      locale: 'en',
      data: {
        title: service.en.title,
        excerpt: service.en.excerpt,
        description: service.en.description,
        benefits: service.en.benefits.map((benefit) => ({ benefit })),
        price: service.en.price,
        duration: service.en.duration,
      },
    })
    serviceIds[service.slug] = created.id
  }
  payload.logger.info('Services seeded.')

  // Testimonials
  const testimonialsData = [
    {
      name: 'Lucía M.',
      service: 'tarot',
      order: 1,
      es: 'La lectura con Ara me dio una claridad que hacía meses buscaba. Salí de la sesión sintiéndome escuchada y en paz.',
      en: "Ara's reading gave me a clarity I had been seeking for months. I left the session feeling heard and at peace.",
    },
    {
      name: 'Federico G.',
      service: 'registros-akashicos',
      order: 2,
      es: 'Los registros akáshicos me ayudaron a entender patrones que repetía sin darme cuenta. Una experiencia transformadora.',
      en: 'The akashic records helped me understand patterns I was repeating without realizing. A transforming experience.',
    },
    {
      name: 'Camila R.',
      service: 'limpieza-energetica',
      order: 3,
      es: 'Después de la limpieza energética sentí una liviandad increíble. Mi casa y yo respiramos distinto.',
      en: 'After the energetic cleanse I felt an incredible lightness. My home and I breathe differently now.',
    },
  ]

  for (const testimonial of testimonialsData) {
    const created = await payload.create({
      collection: 'testimonials',
      locale: 'es',
      data: {
        name: testimonial.name,
        quote: testimonial.es,
        service: serviceIds[testimonial.service],
        order: testimonial.order,
      },
    })
    await payload.update({
      collection: 'testimonials',
      id: created.id,
      locale: 'en',
      data: { quote: testimonial.en },
    })
  }
  payload.logger.info('Testimonials seeded.')

  // FAQs
  const faqsData = [
    {
      order: 1,
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
      order: 2,
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
      order: 3,
      es: {
        question: '¿Cómo reservo y pago mi sesión?',
        answer:
          'Escribime por WhatsApp o por el formulario de contacto. Coordinamos día y horario, y te paso los medios de pago disponibles.',
      },
      en: {
        question: 'How do I book and pay for my session?',
        answer:
          'Message me on WhatsApp or through the contact form. We coordinate a date and time, and I will share the available payment methods.',
      },
    },
    {
      order: 4,
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

  for (const faq of faqsData) {
    const created = await payload.create({
      collection: 'faqs',
      locale: 'es',
      data: { question: faq.es.question, answer: faq.es.answer, order: faq.order },
    })
    await payload.update({
      collection: 'faqs',
      id: created.id,
      locale: 'en',
      data: { question: faq.en.question, answer: faq.en.answer },
    })
  }
  payload.logger.info('FAQs seeded.')

  payload.logger.info('Seed complete ✨')
}

await seed()
process.exit(0)
