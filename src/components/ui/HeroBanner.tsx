import { useEffect, useState } from 'react'
import Button from './Button.tsx'
import AudienceMarquee from './AudienceMarquee.tsx'
import BannerMedia from './BannerMedia.tsx'
import { homePageSeo } from '../../data/pageSeo.ts'
import { homeSlideBanners, homeSlideSrcSet } from '../../data/banners.ts'

type Slide = {
  title: string
  text: string
  cta: string
  to: string
  tab: string
  imageKey: keyof typeof homeSlideBanners
  fit?: 'cover' | 'contain' | 'cover-right'
}

const slides: Slide[] = [
  {
    title: 'See Everything. Decide Faster.',
    text: 'Track sales, purchases, collections and warehouse stock in one live operating view.',
    cta: 'Open Dashboard',
    to: '/platform/dashboard',
    tab: 'Dashboard',
    imageKey: 'dashboard',
    fit: 'cover-right',
  },
  {
    title: 'Price Smarter. Protect Every Margin.',
    text: 'Apply customer-specific rates, recall last prices and keep margins protected automatically.',
    cta: 'View Pricing Engine',
    to: '/platform/pricing-engine',
    tab: 'Pricing',
    imageKey: 'pricing',
    fit: 'cover-right',
  },
  {
    title: 'Serve Faster. Bill Without Friction.',
    text: 'Handle walk-in, DayPass and credit customers with a touch-friendly POS workflow.',
    cta: 'View Point of Sale',
    to: '/platform/pos',
    tab: 'POS',
    imageKey: 'pos',
    fit: 'cover-right',
  },
  {
    title: 'Inventory Control. Stock You Can Trust.',
    text: 'Track warehouse stock in real time — levels, movements and availability in one clear inventory view.',
    cta: 'Explore Inventory',
    to: '/platform/inventory',
    tab: 'Inventory',
    imageKey: 'platform',
  },
  {
    title: 'WhatsApp Orders. Invoice-Ready Drafts.',
    text: 'AI reads WhatsApp orders, matches products, then prepares drafts for staff review.',
    cta: 'Explore AI Ordering',
    to: '/features/ai-whatsapp-ordering',
    tab: 'AI Orders',
    imageKey: 'orders',
    fit: 'cover-right',
  },
  {
    title: 'Plan Routes. Dispatch with Confidence.',
    text: 'Auto-assign deliveries, manage capacity and keep every route linked to driver and vehicle.',
    cta: 'Explore Fleet',
    to: '/features/fleet-logistics',
    tab: 'Fleet',
    imageKey: 'fleet',
    fit: 'cover-right',
  },
]

export default function HeroBanner() {
  const [index, setIndex] = useState(0)
  const slide = slides[index]
  const image = homeSlideBanners[slide.imageKey]
  const secondaryIsDemo = slide.to !== '/demo'
  const fitClass = [
    slide.fit === 'contain' ? 'is-contain' : '',
    slide.fit === 'cover-right' ? 'is-cover-right' : '',
    slide.imageKey === 'pricing' ? 'is-pricing' : '',
  ]
    .filter(Boolean)
    .map((c) => ` ${c}`)
    .join('')
  const mediaClass =
    slide.fit === 'contain' ? 'banner-fit-contain' : slide.fit === 'cover-right' ? 'banner-cover-right' : ''

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % slides.length)
    }, 8500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <section className={`hero-stage relative text-white${fitClass}`}>
        <BannerMedia
          key={image}
          src={image}
          srcSet={homeSlideSrcSet(slide.imageKey)}
          sizes="100vw"
          priority={index === 0}
          className={mediaClass}
        />
        <div className="hero-stage-wash" aria-hidden />
        <div className="hero-stage-beam" aria-hidden />

        <h1 className="sr-only">{homePageSeo.h1}</h1>

        <div className="hero-stage-layout">
          <div className="hero-copy-col">
            <div key={index} className="banner-copy hero-story">
              <h2 className="hero-title">{slide.title}</h2>
              <p className="hero-lead">{slide.text}</p>
            </div>

            <div className="hero-cta-row">
              <Button to={slide.to} size="lg" className="w-full sm:w-auto" analytics="cta_click_hero_primary">
                {slide.cta}
              </Button>
              <Button
                to={secondaryIsDemo ? '/demo' : '/platform/inventory'}
                variant="line"
                size="lg"
                className="w-full sm:w-auto"
                analytics="cta_click_hero_secondary"
              >
                {secondaryIsDemo ? 'Book a client demo' : 'Explore Inventory'}
              </Button>
            </div>
          </div>

          <nav className="hero-film" aria-label="Product views">
            <div className="hero-film-track">
              {slides.map((item, slideIndex) => {
                const active = slideIndex === index
                return (
                  <button
                    key={item.tab}
                    type="button"
                    aria-current={active ? 'true' : undefined}
                    onClick={() => setIndex(slideIndex)}
                    className={`hero-film-item${active ? ' is-active' : ''}`}
                  >
                    {item.tab}
                  </button>
                )
              })}
            </div>
            <div className="hero-film-meter" aria-hidden>
              <i key={index} />
            </div>
          </nav>
        </div>
      </section>

      <AudienceMarquee />
    </>
  )
}
