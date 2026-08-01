'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useActionState } from 'react'

import {
  submitContactAction,
  type ContactFormState,
} from '@/app/(frontend)/[locale]/contact/actions'

const INITIAL_STATE: ContactFormState = { status: 'idle' }

const inputClasses =
  'w-full rounded-2xl border border-fairy-violet/20 bg-white/80 px-5 py-3 text-night placeholder:text-night-soft/50 focus:border-fairy-violet focus:ring-2 focus:ring-fairy-violet/20 focus:outline-none'

export function ContactForm({
  services,
}: {
  services: { id: string; title: string }[]
}) {
  const t = useTranslations('contact.form')
  const locale = useLocale()
  const [state, formAction, pending] = useActionState(submitContactAction, INITIAL_STATE)

  if (state.status === 'success') {
    return (
      <div className="rounded-3xl border border-fairy-teal/30 bg-fairy-teal-soft/60 p-8 text-center">
        <span aria-hidden className="text-4xl">
          ✨
        </span>
        <p className="mt-3 text-lg font-semibold text-fairy-teal-deep">{t('success')}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot — hidden from humans, catnip for bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-night">
            {t('name')}
          </span>
          <input name="name" required minLength={2} className={inputClasses} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-night">
            {t('email')}
          </span>
          <input name="email" type="email" required className={inputClasses} />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-night">
          {t('service')}
        </span>
        <select name="service" defaultValue="" className={inputClasses}>
          <option value="">{t('serviceNone')}</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-night">
          {t('message')}
        </span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder={t('messagePlaceholder')}
          className={inputClasses}
        />
      </label>

      {state.status === 'error' ? (
        <p role="alert" className="rounded-2xl bg-fairy-rose-soft px-5 py-3 text-sm font-semibold text-fairy-rose-deep">
          {t(state.errorKey)}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-gradient-fairy px-8 py-4 font-semibold text-white shadow-lg shadow-fairy-violet/30 transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {pending ? t('sending') : `${t('submit')} ✨`}
      </button>
    </form>
  )
}
