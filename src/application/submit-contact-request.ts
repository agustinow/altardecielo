import type { ContactRequest } from '@/domain/entities/contact-request'
import type { ContactRequestRepository } from '@/domain/repositories/contact-request-repository'
import type { ContactNotifier } from '@/domain/services/contact-notifier'

export type ContactValidationError = 'invalid-name' | 'invalid-email' | 'invalid-message'

export type SubmitContactResult = { ok: true } | { ok: false; error: ContactValidationError }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function submitContactRequest(
  repository: ContactRequestRepository,
  notifier: ContactNotifier,
) {
  return async (request: ContactRequest): Promise<SubmitContactResult> => {
    const name = request.name.trim()
    const email = request.email.trim()
    const message = request.message.trim()

    if (name.length < 2 || name.length > 120) {
      return { ok: false, error: 'invalid-name' }
    }
    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      return { ok: false, error: 'invalid-email' }
    }
    if (message.length < 10 || message.length > 5000) {
      return { ok: false, error: 'invalid-message' }
    }

    const sanitized: ContactRequest = { ...request, name, email, message }

    await repository.save(sanitized)

    // Notification failures must not lose the request — it is already stored.
    try {
      await notifier.notify(sanitized)
    } catch (error) {
      console.error('[contact] Failed to send notification email:', error)
    }

    return { ok: true }
  }
}
