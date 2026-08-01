import type { ContactRequest } from '../entities/contact-request'

/** Port for notifying the practitioner about a new contact request. */
export interface ContactNotifier {
  notify(request: ContactRequest): Promise<void>
}
