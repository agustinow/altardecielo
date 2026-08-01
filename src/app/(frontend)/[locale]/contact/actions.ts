'use server'

import type { ContactValidationError } from '@/application/submit-contact-request'
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/domain/locale'
import { getContainer } from '@/infrastructure/container'

export type ContactFormState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; errorKey: string }

const ERROR_KEYS: Record<ContactValidationError, string> = {
  'invalid-name': 'errorName',
  'invalid-email': 'errorEmail',
  'invalid-message': 'errorMessage',
}

export async function submitContactAction(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: bots fill every field; humans never see this one.
  if (formData.get('website')) {
    return { status: 'success' }
  }

  const rawLocale = String(formData.get('locale') ?? '')
  const locale: Locale = (LOCALES as readonly string[]).includes(rawLocale)
    ? (rawLocale as Locale)
    : DEFAULT_LOCALE

  try {
    const container = await getContainer()
    const result = await container.submitContactRequest({
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
      serviceId: formData.get('service') ? String(formData.get('service')) : null,
      locale,
    })

    if (!result.ok) {
      return { status: 'error', errorKey: ERROR_KEYS[result.error] }
    }
    return { status: 'success' }
  } catch (error) {
    console.error('[contact] Failed to submit contact request:', error)
    return { status: 'error', errorKey: 'errorGeneric' }
  }
}
