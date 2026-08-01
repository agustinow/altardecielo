import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: { es: 'Configuración del sitio', en: 'Site settings' },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { es: 'General', en: 'General' },
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
              defaultValue: 'Altar de Cielo',
            },
            {
              name: 'tagline',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          label: { es: 'Portada', en: 'Hero' },
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              localized: true,
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          label: { es: 'Sobre mí', en: 'About' },
          fields: [
            {
              name: 'aboutTitle',
              type: 'text',
              localized: true,
            },
            {
              name: 'aboutContent',
              type: 'richText',
              localized: true,
              editor: lexicalEditor(),
            },
            {
              name: 'aboutImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: { es: 'Contacto', en: 'Contact' },
          fields: [
            {
              name: 'whatsappNumber',
              type: 'text',
              admin: {
                description: {
                  es: 'Con código de país, sin espacios ni signos. Ej: 5491122334455',
                  en: 'With country code, no spaces or symbols. E.g. 5491122334455',
                },
              },
            },
            {
              name: 'instagramUrl',
              type: 'text',
            },
            {
              name: 'contactEmail',
              type: 'email',
            },
            {
              name: 'contactIntro',
              type: 'textarea',
              localized: true,
            },
          ],
        },
      ],
    },
  ],
}
