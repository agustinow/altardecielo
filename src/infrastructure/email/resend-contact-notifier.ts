import { Resend } from 'resend'

import type { ContactRequest } from '@/domain/entities/contact-request'
import type { ContactNotifier } from '@/domain/services/contact-notifier'

export class ResendContactNotifier implements ContactNotifier {
  private readonly resend: Resend

  constructor(
    apiKey: string,
    private readonly to: string,
    private readonly from: string,
  ) {
    this.resend = new Resend(apiKey)
  }

  async notify(request: ContactRequest): Promise<void> {
    const { error } = await this.resend.emails.send({
      from: this.from,
      to: this.to,
      replyTo: request.email,
      subject: `Nueva consulta de ${request.name}`,
      text: [
        `Nombre: ${request.name}`,
        `Email: ${request.email}`,
        `Idioma: ${request.locale}`,
        '',
        request.message,
      ].join('\n'),
    })
    if (error) {
      throw new Error(`Resend error: ${error.message}`)
    }
  }
}

/** Used when RESEND_API_KEY isn't configured — requests are still stored in the CMS. */
export class ConsoleContactNotifier implements ContactNotifier {
  async notify(request: ContactRequest): Promise<void> {
    console.info(`[contact] New contact request from ${request.name} <${request.email}>`)
  }
}
