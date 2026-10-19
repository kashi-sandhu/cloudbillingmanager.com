import { memo, useEffect, useRef, type Ref } from 'react'
import {
  Package,
  Ship,
  ShoppingBasket,
  ShoppingCart,
  Store,
  Truck,
} from 'lucide-react'
import { audiences } from '../../data/content.ts'

const audienceIcons = {
  'Food Distributors': Truck,
  Wholesalers: Store,
  'Cash & Carry': ShoppingBasket,
  'Retail Chains': ShoppingCart,
  Importers: Ship,
  'FMCG Businesses': Package,
} as const

/** Enough items that one half always exceeds wide viewports. */
const rowItems = [...audiences, ...audiences, ...audiences]

/** Slow, steady crawl — px per second. */
const SPEED_PX_PER_SEC = 26

function AudienceRow({
  copy,
  groupRef,
}: {
  copy: number
  groupRef?: Ref<HTMLUListElement>
}) {
  return (
    <ul
      ref={groupRef}
      className="audience-group"
      aria-hidden={copy === 1 ? true : undefined}
    >
      {rowItems.map((item, itemIndex) => {
        const Icon = audienceIcons[item]
        return (
          <li key={`${copy}-${item}-${itemIndex}`} className="audience-item">
            <span className="audience-item-ico" aria-hidden>
              <Icon size={14} strokeWidth={2} />
            </span>
            <span>{item}</span>
          </li>
        )
      })}
    </ul>
  )
}

function AudienceMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const firstGroupRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const group = firstGroupRef.current
    if (!track || !group) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return

    let raf = 0
    let x = 0
    let last = performance.now()
    let running = true

    const loopWidth = () =>
      // Include the 1px seam border between the two identical halves
      Math.max(1, group.offsetWidth + (group.nextElementSibling ? 1 : 0))

    const tick = (now: number) => {
      if (!running) return
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const width = loopWidth()
      x -= SPEED_PX_PER_SEC * dt
      // Wrap without resetting velocity — seamless continuous scroll
      while (x <= -width) x += width
      track.style.transform = `translate3d(${x}px,0,0)`
      raf = requestAnimationFrame(tick)
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else {
        running = true
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }

    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="audience-marquee" aria-label="Designed specifically for">
      <div className="audience-track" ref={trackRef}>
        <AudienceRow copy={0} groupRef={firstGroupRef} />
        <AudienceRow copy={1} />
      </div>
    </div>
  )
}

export default memo(AudienceMarquee)
