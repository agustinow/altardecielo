import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: { es: 'Servicio', en: 'Service' },
    plural: { es: 'Servicios', en: 'Services' },
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: {
          es: 'Identificador para la URL, ej: "tarot". No usar espacios ni acentos.',
          en: 'URL identifier, e.g. "tarot". No spaces or accents.',
        },
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: {
          es: 'Resumen corto que se muestra en las tarjetas.',
          en: 'Short summary shown on cards.',
        },
      },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      editor: lexicalEditor(),
    },
    {
      name: 'benefits',
      type: 'array',
      localized: true,
      labels: {
        singular: { es: 'Beneficio', en: 'Benefit' },
        plural: { es: 'Beneficios', en: 'Benefits' },
      },
      fields: [
        {
          name: 'benefit',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'duration',
      type: 'text',
      localized: true,
      admin: {
        description: {
          es: 'Ej: "60 minutos".',
          en: 'E.g. "60 minutes".',
        },
      },
    },
    {
      name: 'modality',
      type: 'select',
      options: [
        { label: { es: 'Online', en: 'Online' }, value: 'online' },
        { label: { es: 'Presencial', en: 'In person' }, value: 'in-person' },
        { label: { es: 'Online y presencial', en: 'Online & in person' }, value: 'both' },
      ],
      defaultValue: 'both',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'accent',
      type: 'select',
      options: [
        { label: { es: 'Violeta', en: 'Violet' }, value: 'violet' },
        { label: { es: 'Rosa', en: 'Rose' }, value: 'rose' },
        { label: { es: 'Dorado', en: 'Gold' }, value: 'gold' },
        { label: { es: 'Turquesa', en: 'Teal' }, value: 'teal' },
      ],
      defaultValue: 'violet',
      admin: {
        position: 'sidebar',
        description: {
          es: 'Color de acento de la tarjeta en la web.',
          en: 'Accent color of the card on the site.',
        },
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
