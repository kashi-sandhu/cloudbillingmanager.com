import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  tone?: 'brand' | 'accent' | 'navy'
  size?: 'sm' | 'md'
}

export default function IconBadge({ icon: Icon, tone = 'brand', size = 'md' }: Props) {
  const box = size === 'sm' ? 'size-8 rounded-md' : 'size-11 rounded-lg'
  const glyph = size === 'sm' ? 'size-4' : 'size-5'
  const colors =
    tone === 'accent'
      ? 'bg-accent-soft text-accent'
      : tone === 'navy'
        ? 'bg-white/12 text-white'
        : 'bg-brand-soft text-brand'

  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${box} ${colors}`}>
      <Icon className={glyph} />
    </span>
  )
}
