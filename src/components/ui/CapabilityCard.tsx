import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Props = {
  to: string
  index: number
  title: string
  text: string
  icon: LucideIcon
  heading?: 'h2' | 'h3'
}

export default function CapabilityCard({
  to,
  index,
  title,
  text,
  icon: Icon,
  heading = 'h3',
}: Props) {
  const Heading = heading

  return (
    <Link to={to} className="cap-card" title={`Open ${title}`}>
      <div className="flex items-start justify-between gap-4">
        <span className="cap-icon">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <span className="text-[11px] font-semibold tracking-[0.18em] text-brand/40">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <Heading className="mt-6 text-[17px] leading-snug font-semibold tracking-tight text-brand-ink">
        {title}
      </Heading>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{text}</p>
      <span className="cap-arrow mt-6">
        Open page
        <span className="cap-arrow-line" />
        <ArrowRight className="size-4 shrink-0" />
      </span>
    </Link>
  )
}
