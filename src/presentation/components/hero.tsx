'use client'

import { motion } from 'motion/react'

import { Link } from '@/i18n/navigation'

import { Sparkles } from './sparkles'

export function Hero({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
}: {
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
  secondaryLabel?: string
  secondaryHref?: string
}) {
  return (
    <section className="relative overflow-hidden px-4 py-16 text-center sm:py-24 lg:py-32">
      <Sparkles count={18} />

      {/* Floating aurora orbs */}
      <div
        aria-hidden
        className="animate-float absolute -top-16 left-[8%] h-40 w-40 rounded-full bg-fairy-violet-soft blur-3xl sm:h-56 sm:w-56"
      />
      <div
        aria-hidden
        className="animate-float-slow absolute top-24 right-[6%] h-44 w-44 rounded-full bg-fairy-rose-soft blur-3xl sm:h-64 sm:w-64"
      />
      <div
        aria-hidden
        className="animate-float absolute bottom-0 left-[35%] h-36 w-36 rounded-full bg-fairy-teal-soft blur-3xl sm:h-48 sm:w-48"
      />

      <div className="relative mx-auto max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-display text-4xl font-bold text-gradient-fairy sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="mx-auto mt-5 max-w-xl text-base text-night-soft sm:mt-6 sm:text-xl"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
        >
          <Link
            href={ctaHref}
            className="w-full max-w-72 rounded-full bg-gradient-fairy px-8 py-3.5 font-semibold text-white shadow-lg shadow-fairy-violet/30 transition-transform hover:scale-105 sm:w-auto"
          >
            {ctaLabel} ✨
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link
              href={secondaryHref}
              className="w-full max-w-72 rounded-full border border-fairy-violet/30 bg-white/60 px-8 py-3.5 font-semibold text-fairy-violet-deep backdrop-blur-sm transition-colors hover:bg-white sm:w-auto"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}
