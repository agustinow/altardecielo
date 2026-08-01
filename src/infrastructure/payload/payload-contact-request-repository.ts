import type { Payload } from 'payload'

import type { ContactRequest } from '@/domain/entities/contact-request'
import type { ContactRequestRepository } from '@/domain/repositories/contact-request-repository'

export class PayloadContactRequestRepository implements ContactRequestRepository {
  constructor(private readonly payload: Payload) {}

  async save(request: ContactRequest): Promise<void> {
    const serviceId = request.serviceId ? Number(request.serviceId) : null

    await this.payload.create({
      collection: 'contact-requests',
      data: {
        name: request.name,
        email: request.email,
        message: request.message,
        service: serviceId && Number.isFinite(serviceId) ? serviceId : null,
        locale: request.locale,
        status: 'new',
      },
    })
  }
}
