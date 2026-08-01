import { Reveal } from './reveal'

export function SectionHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <Reveal className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
      <h2 className="font-display text-3xl font-semibold text-gradient-fairy sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base text-night-soft sm:text-lg">{subtitle}</p>
      ) : null}
    </Reveal>
  )
}
