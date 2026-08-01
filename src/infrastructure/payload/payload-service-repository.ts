import type { Payload } from 'payload'

import type { Service } from '@/domain/entities/service'
import type { Locale } from '@/domain/locale'
import type { ServiceRepository } from '@/domain/repositories/service-repository'
import type { Service as ServiceDoc } from '@/payload-types'

import { mapImage } from './mappers'

function toDomain(doc: ServiceDoc): Service {
  return {
    id: String(doc.id),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    description: doc.description ?? null,
    benefits: (doc.benefits ?? []).map((item) => item.benefit),
    duration: doc.duration ?? null,
    modality: doc.modality ?? 'both',
    image: mapImage(doc.image),
    accent: doc.accent ?? 'violet',
  }
}

export class PayloadServiceRepository implements ServiceRepository {
  constructor(private readonly payload: Payload) {}

  async findAll(locale: Locale): Promise<Service[]> {
    const result = await this.payload.find({
      collection: 'services',
      locale,
      depth: 1,
      sort: 'order',
      pagination: false,
    })
    return result.docs.map(toDomain)
  }

  async findBySlug(slug: string, locale: Locale): Promise<Service | null> {
    const result = await this.payload.find({
      collection: 'services',
      locale,
      depth: 1,
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const doc = result.docs[0]
    return doc ? toDomain(doc) : null
  }
}
