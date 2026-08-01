import type { CollectionConfig } from 'payload'

export const ContactRequests: CollectionConfig = {
  slug: 'contact-requests',
  labels: {
    singular: { es: 'Consulta', en: 'Contact request' },
    plural: { es: 'Consultas', en: 'Contact requests' },
  },
  access: {
    // Created only via the site's contact form (server-side local API).
    create: () => false,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'status', 'createdAt'],
    description: {
      es: 'Mensajes enviados desde el formulario de contacto de la web.',
      en: 'Messages sent from the website contact form.',
    },
  },
  defaultSort: '-createdAt',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
    },
    {
      name: 'locale',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: { es: 'Nueva', en: 'New' }, value: 'new' },
        { label: { es: 'Respondida', en: 'Replied' }, value: 'replied' },
        { label: { es: 'Archivada', en: 'Archived' }, value: 'archived' },
      ],
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
