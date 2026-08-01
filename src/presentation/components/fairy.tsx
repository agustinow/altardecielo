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
        className="absolute -mt-6 -ml-6"
      >
        <div ref={bodyRef} className="fairy-bob" style={{ transform: `scaleX(${facing})` }}>
          <svg
            viewBox="0 0 56 56"
            className="h-14 w-14"
            style={{ filter: 'drop-shadow(0 0 7px rgba(217, 249, 157, 0.7))' }}
          >
            <defs>
              <radialGradient id="fairyGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef9c3" stopOpacity="0.8" />
                <stop offset="55%" stopColor="#d9f99d" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="fairyWing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#c4b5fd" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#99f6e4" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="fairyDress" x1="0%" y1="0%" x2="20%" y2="100%">
                <stop offset="0%" stopColor="#a7f3d0" />
                <stop offset="55%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
              <radialGradient id="fairySkin" cx="40%" cy="35%" r="80%">
                <stop offset="0%" stopColor="#ffe9d6" />
                <stop offset="100%" stopColor="#f6c9a0" />
              </radialGradient>
            </defs>

            {/* Soft halo behind the whole figure */}
            <circle cx="34" cy="29" r="17" fill="url(#fairyGlow)" />

            {/* Wings: two layered pairs sweeping up and back */}
            <g className="fairy-wing">
              <ellipse cx="21" cy="13" rx="12" ry="6" fill="url(#fairyWing)" transform="rotate(-38 21 13)" />
              <ellipse cx="19.5" cy="23" rx="8.5" ry="4.5" fill="url(#fairyWing)" transform="rotate(-10 19.5 23)" />
            </g>
            <g className="fairy-wing fairy-wing-front">
              <ellipse cx="24" cy="16" rx="10.5" ry="5" fill="url(#fairyWing)" opacity="0.9" transform="rotate(-28 24 16)" />
              <ellipse cx="22.5" cy="25" rx="7" ry="3.8" fill="url(#fairyWing)" opacity="0.9" transform="rotate(-2 22.5 25)" />
            </g>

            {/* Tinkerbell herself, tilted into the flight */}
            <g transform="rotate(-10 35 30)">
              {/* Back arm */}
              <path d="M34.5 25 Q31.5 27.5 30.5 30" fill="none" stroke="#f6c9a0" strokeWidth="1.8" strokeLinecap="round" />

              {/* Legs trailing behind */}
              <path d="M33.5 39.5 Q28.5 43.5 24.5 45" fill="none" stroke="url(#fairySkin)" strokeWidth="2" strokeLinecap="round" />
              <path d="M36 41 Q32 46.5 28.5 48.5" fill="none" stroke="url(#fairySkin)" strokeWidth="2" strokeLinecap="round" />
              {/* Tiny slippers */}
              <circle cx="24" cy="45.2" r="1.4" fill="#0d9488" />
              <circle cx="28" cy="48.6" r="1.4" fill="#0d9488" />

              {/* Petal dress with bodice */}
              <path
                d="M34 23 L38.6 23 L37.8 28.5 C39.5 31.5 40.8 35 41.6 38.5 L38.8 37 L38.2 41.5 L35.8 38 L33 42 L32.6 37.2 L30 38.8 C31 34.5 32.4 31 34.8 28.5 Z"
                fill="url(#fairyDress)"
              />

              {/* Front arm reaching out, sprinkling dust */}
              <path d="M38 24.5 Q42.5 22.5 45.5 21.8" fill="none" stroke="url(#fairySkin)" strokeWidth="1.8" strokeLinecap="round" />

              {/* Hair behind head + golden bun */}
              <circle cx="37.8" cy="16.8" r="4.8" fill="#eab308" />
              <circle cx="41" cy="12.4" r="2.5" fill="#eab308" />
              <circle cx="40.2" cy="11.7" r="0.9" fill="#fde68a" />

              {/* Head */}
              <circle cx="36.8" cy="19.2" r="4.1" fill="url(#fairySkin)" />

              {/* Pixie dust leaving her hand */}
              <path d={STAR_PATH} fill="#fcd34d" transform="translate(45.5 18.5) scale(0.22)" />
              <circle cx="49.5" cy="24" r="0.9" fill="#fde68a" opacity="0.9" />
              <circle cx="47" cy="26.5" r="0.7" fill="#f9a8d4" opacity="0.8" />
            </g>
          </svg>
        </div>
      </motion.div>
    </div>
  )
}
