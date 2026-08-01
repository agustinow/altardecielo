const STAR_PATH =
  'M12 0C12.9 6.6 17.4 11.1 24 12c-6.6.9-11.1 5.4-12 12-.9-6.6-5.4-11.1-12-12C6.6 11.1 11.1 6.6 12 0Z'

const COLORS = ['#8b5cf6', '#ec4899', '#d97706', '#0d9488']

// Deterministic pseudo-random so server and client render identically.
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

export function Sparkles({ count = 14 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    left: pseudoRandom(i + 1) * 100,
    top: pseudoRandom(i + 101) * 100,
    size: 8 + pseudoRandom(i + 201) * 14,
    delay: pseudoRandom(i + 301) * 3,
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
            width: star.size,
            height: star.size,
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
