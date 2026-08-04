'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type Point = { x: number; y: number }
type Particle = { id: number; x: number; y: number; color: string; drift: number }

const DUST_COLORS = ['#c4b5fd', '#f9a8d4', '#fcd34d', '#99f6e4']
const STAR_PATH =
  'M12 0C12.9 6.6 17.4 11.1 24 12c-6.6.9-11.1 5.4-12 12-.9-6.6-5.4-11.1-12-12C6.6 11.1 11.1 6.6 12 0Z'
const SPEED = 110 // px per second

function randomPoint(): Point {
  const margin = 70
  return {
    x: margin + Math.random() * Math.max(window.innerWidth - margin * 2, 100),
    y: margin + Math.random() * Math.max(window.innerHeight * 0.75 - margin, 100),
  }
}

export function Fairy() {
  const reducedMotion = useReducedMotion()
  const [flight, setFlight] = useState<{ from: Point; to: Point } | null>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const bodyRef = useRef<HTMLDivElement>(null)
  const particleId = useRef(0)

  // Random positions can't be server-rendered — take flight after mount.
  useEffect(() => {
    if (reducedMotion) return
    const start = randomPoint()
    setFlight({ from: start, to: randomPoint() })
  }, [reducedMotion])

  // Sprinkle pixie dust from the fairy's current position while flying.
  useEffect(() => {
    if (!flight) return
    const timer = setInterval(() => {
      const el = bodyRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const id = particleId.current++
      setParticles((prev) => [
        ...prev.slice(-14),
        {
          id,
          x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 10,
          y: rect.top + rect.height / 2 + 6,
          color: DUST_COLORS[id % DUST_COLORS.length],
          drift: (Math.random() - 0.5) * 24,
        },
      ])
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id))
      }, 1400)
    }, 320)
    return () => clearInterval(timer)
  }, [flight])

  if (reducedMotion || !flight) return null

  const distance = Math.hypot(flight.to.x - flight.from.x, flight.to.y - flight.from.y)
  const duration = Math.min(Math.max(distance / SPEED, 2.5), 8)
  const facing = flight.to.x >= flight.from.x ? 1 : -1

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {particles.map((particle) => (
        <motion.svg
          key={particle.id}
          viewBox="0 0 24 24"
          className="absolute h-3 w-3"
          style={{ left: particle.x, top: particle.y, fill: particle.color }}
          initial={{ opacity: 0.9, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2, y: 26, x: particle.drift }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        >
          <path d={STAR_PATH} />
        </motion.svg>
      ))}

      <motion.div
        initial={{ x: flight.from.x, y: flight.from.y }}
        animate={{ x: flight.to.x, y: flight.to.y }}
        transition={{ duration, ease: 'easeInOut' }}
        onAnimationComplete={() => setFlight({ from: flight.to, to: randomPoint() })}
        className="absolute -mt-8 -ml-8"
      >
        <div ref={bodyRef} className="fairy-bob" style={{ transform: `scaleX(${facing})` }}>
          <svg
            viewBox="0 0 64 64"
            className="h-16 w-16"
            style={{ filter: 'drop-shadow(0 0 8px rgba(252, 211, 77, 0.55))' }}
          >
            <defs>
              <radialGradient id="fairyGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--color-fairy-gold-soft)" stopOpacity="0.9" />
                <stop offset="45%" stopColor="var(--color-fairy-gold-soft)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="var(--color-fairy-violet-soft)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="fairyWing" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="55%" stopColor="var(--color-fairy-violet-soft)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--color-fairy-violet)" stopOpacity="0.35" />
              </linearGradient>
            </defs>

            {/* Soft golden halo behind the whole figure */}
            <circle cx="36" cy="30" r="21" fill="url(#fairyGlow)" />

            {/* Wings: two pairs sweeping back from the shoulders */}
            <g className="fairy-wing" opacity="0.8">
              <path
                d="M33 26 C28 12, 14 3.5, 11.8 9 C9.5 14.5, 21 24.5, 33 26 Z"
                fill="url(#fairyWing)"
                stroke="#ffffff"
                strokeOpacity="0.7"
                strokeWidth="0.5"
              />
              <path
                d="M32.5 28.5 C26 34.5, 14 42.5, 12.8 37 C11.8 32, 23.5 27.6, 32.5 28.5 Z"
                fill="url(#fairyWing)"
                stroke="#ffffff"
                strokeOpacity="0.7"
                strokeWidth="0.5"
              />
            </g>
            <g className="fairy-wing fairy-wing-front">
              <path
                d="M34 26.5 C30.5 16, 20 7.5, 18 12.2 C16 17, 24.5 25, 34 26.5 Z"
                fill="url(#fairyWing)"
                stroke="#ffffff"
                strokeOpacity="0.9"
                strokeWidth="0.5"
              />
              <path
                d="M33.5 29 C28.5 34, 19.5 39.5, 18.5 35.3 C17.7 31.8, 26 28.3, 33.5 29 Z"
                fill="url(#fairyWing)"
                stroke="#ffffff"
                strokeOpacity="0.9"
                strokeWidth="0.5"
              />
            </g>

            {/* Fairy silhouette: bun, petal dress, legs trailing into the flight */}
            <g fill="var(--color-fairy-violet-deep)" stroke="var(--color-fairy-violet-deep)">
              <circle cx="36.5" cy="17.5" r="4.4" stroke="none" />
              <circle cx="40.8" cy="12" r="2.5" stroke="none" />
              <path d="M39 15 Q40.5 13.5 40.8 12" fill="none" strokeWidth="1.6" />
              <path
                d="M33.8 22.5 L39.2 22.5 C39.8 26, 41.8 30, 43.4 34 L40 32.4 L38.6 37 L35.6 33.6 L32.2 37.4 L31.6 32.4 L28.6 34.4 C30.4 29.8, 32 26, 33.8 22.5 Z"
                stroke="none"
              />
              <path d="M38.8 24 Q43.5 21.5 47.5 20.3" fill="none" strokeWidth="2.1" strokeLinecap="round" />
              <path d="M34.6 24.5 Q31.8 26.8 31 29.4" fill="none" strokeWidth="1.9" strokeLinecap="round" />
              <path d="M32.6 35.8 Q28 41.5 24 44.2" fill="none" strokeWidth="2.1" strokeLinecap="round" />
              <path d="M35.4 36.8 Q31.8 43.5 28.2 46.4" fill="none" strokeWidth="2.1" strokeLinecap="round" />
              <path d="M24.4 43.6 L21.6 46 L25.4 45.4 Z" stroke="none" />
              <path d="M28.6 45.8 L26 48.4 L29.8 47.6 Z" stroke="none" />
            </g>

            {/* Pixie dust leaving her hand */}
            <path
              d="M50 15.5 l1.1 2.9 2.9 1.1 -2.9 1.1 -1.1 2.9 -1.1 -2.9 -2.9 -1.1 2.9 -1.1 Z"
              fill="var(--color-fairy-gold)"
            />
            <circle cx="53.5" cy="24" r="1" fill="#fde68a" />
            <circle cx="49" cy="27" r="0.8" fill="#f9a8d4" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}
