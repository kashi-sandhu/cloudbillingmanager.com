import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

type Props = {
  children: ReactNode[]
  /** How many items to show on mobile before View more. */
  initialCount?: number
  className?: string
  moreLabel?: string
  lessLabel?: string
  /** Dark surfaces (e.g. close-band contact panel). */
  onDark?: boolean
}

/**
 * Mobile-first reveal: hides extra grid items until "View more" is tapped.
 * Desktop (md+) always shows everything.
 */
export default function ShowMoreGrid({
  children,
  initialCount = 3,
  className = '',
  moreLabel = 'View more',
  lessLabel = 'View less',
  onDark = false,
}: Props) {
  const [expanded, setExpanded] = useState(false)
  const items = children.filter(Boolean)
  const needsToggle = items.length > initialCount
  const remaining = items.length - initialCount

  return (
    <div className={`show-more${onDark ? ' show-more--on-dark' : ''}`}>
      <div
        className={`show-more-grid ${expanded ? 'is-expanded' : ''} ${className}`.trim()}
        data-initial={initialCount}
      >
        {items.map((child, index) => (
          <div
            key={index}
            className={index >= initialCount ? 'show-more-extra' : 'show-more-item'}
          >
            {child}
          </div>
        ))}
      </div>

      {needsToggle ? (
        <div className="show-more-actions">
          <button
            type="button"
            className="show-more-btn"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
          >
            <span>{expanded ? lessLabel : `${moreLabel} (${remaining})`}</span>
            <ChevronDown
              className={`size-4 shrink-0 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              strokeWidth={2.25}
            />
          </button>
        </div>
      ) : null}
    </div>
  )
}
