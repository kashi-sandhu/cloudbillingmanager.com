type Props = {
  eyebrow?: string
  title: string
  text?: string
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  light = false,
}: Props) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <p
          className={`text-xs font-semibold tracking-[0.18em] uppercase ${light ? 'text-accent' : 'text-brand'}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-2 text-[1.35rem] leading-snug font-semibold tracking-tight sm:text-2xl md:text-[32px] ${light ? 'text-white' : 'text-brand-ink'}`}
      >
        {title}
      </h2>
      {text ? (
        <p className={`mt-4 text-base leading-7 ${light ? 'text-white/80' : 'text-muted'}`}>
          {text}
        </p>
      ) : null}
    </div>
  )
}
