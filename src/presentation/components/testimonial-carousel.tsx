'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import type { Testimonial } from '@/domain/entities/testimonial'

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (testimonials.length <= 1) return
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      6000,
    )
    return () => clearInterval(timer)
  }, [testimonials.length])

  if (testimonials.length === 0) return null

  const current = testimonials[index]

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative min-h-52 rounded-3xl border border-white/60 bg-white/70 p-6 pt-8 text-center shadow-lg shadow-fairy-rose/10 backdrop-blur-sm sm:p-10">
        <span
          aria-hidden
          className="absolute -top-5 left-1/2 -translate-x-1/2 font-display text-7xl leading-none text-fairy-rose/40"
        >
          “
        </span>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-base leading-relaxed text-night-soft italic sm:text-lg">
              {current.quote}
            </p>
            <footer className="mt-5 font-semibold text-night">
              {current.name}
              {current.serviceTitle ? (
                <span className="mt-1 block text-sm font-normal text-fairy-violet-deep">
                  {current.serviceTitle}
                </span>
              ) : null}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {testimonials.length > 1 ? (
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? 'w-7 bg-gradient-fairy' : 'w-2.5 bg-fairy-violet/25'
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
