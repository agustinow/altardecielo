export function Prose({
  paragraphs,
  className,
}: {
  paragraphs: string[]
  className?: string
}) {
  return (
    <div
      className={
        className ?? 'space-y-4 text-lg leading-relaxed text-night-soft'
      }
    >
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  )
}
