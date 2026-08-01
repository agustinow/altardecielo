const STAR_PATH =
  'M12 0C12.9 6.6 17.4 11.1 24 12c-6.6.9-11.1 5.4-12 12-.9-6.6-5.4-11.1-12-12C6.6 11.1 11.1 6.6 12 0Z'

const COLORS = [
  'var(--color-fairy-violet)',
  'var(--color-fairy-rose)',
  'var(--color-fairy-gold)',
  'var(--color-fairy-teal)',
]

// Deterministic pseudo-random so server and client render identically.
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

export function Sparkles({ count = 14 }: { count?: number }) {
  // Values are pre-rounded so the browser re-serializes them unchanged,
  // otherwise React reports a hydration mismatch on the style attribute.
  const stars = Array.from({ length: count }, (_, i) => ({
    left: (pseudoRandom(i + 1) * 100).toFixed(2),
    top: (pseudoRandom(i + 101) * 100).toFixed(2),
    size: (8 + pseudoRandom(i + 201) * 14).toFixed(2),
    delay: (pseudoRandom(i + 301) * 3).toFixed(2),
    color: COLORS[i % COLORS.length],
  }))

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="animate-twinkle absolute"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            fill: star.color,
            opacity: 0.5,
          }}
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  )
}
