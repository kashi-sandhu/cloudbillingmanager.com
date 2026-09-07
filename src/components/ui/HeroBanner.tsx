import { useEffect, useState } from 'react'
import { Package, Ship, ShoppingBasket, ShoppingCart, Store, Truck } from 'lucide-react'
import Button from './Button.tsx'
import BannerMedia from './BannerMedia.tsx'
import DashboardPreview from './DashboardPreview.tsx'
import { audiences, company } from '../../data/content.ts'
import { homePageSeo } from '../../data/pageSeo.ts'
import { homeSlideBanners, homeSlideSrcSet } from '../../data/banners.ts'

const audienceIcons = {
  'Food Distributors': Truck,
  Wholesalers: Store,
  'Cash & Carry': ShoppingBasket,
  'Retail Chains': ShoppingCart,
  Importers: Ship,
  'FMCG Businesses': Package,
} as const

const slides = [
  {
    kicker: company.clientDemonstration,
    title: company.headline,
    text: 'Manage inventory, billing, invoicing, sales, purchases and POS from one cloud platform for UK food distributors.',
    cta: 'Book a client demo',
    to: '/demo',
    tab: 'Overview',
    imageKey: 'overview' as const,
  },
  {
    kicker: 'Powerful Dashboard Features',
    title: 'One Dashboard. Complete Business Visibility.',
    text: 'Sales Overview, Purchase Overview, Payment Collection Overview, Inventory & Warehouse Overview.',
    cta: 'Open Dashboard',
    to: '/platform/dashboard',
    tab: 'Dashboard',
    imageKey: 'dashboard' as const,
  },
  {
    kicker: 'unique selling point (USP)',
    title: 'Intelligent Customer Pricing Engine',
    text: 'Automatic Customer-Specific Pricing, Smart Price Learning, Order History Price Recall.',
    cta: 'View Pricing Engine',
    to: '/platform/pricing-engine',
    tab: 'Pricing',
    imageKey: 'pricing' as const,
  },
  {
    kicker: 'Point of Sale (POS)',
    title: 'Fast, Smart & Touch-Friendly Retail Billing',
    text: 'Walk-In (Cash) Customer Billing, DayPass Customer Sales, Credit Customer Billing.',
    cta: 'View Point of Sale',
    to: '/platform/pos',
    tab: 'POS',
    imageKey: 'pos' as const,
  },
  {
    kicker: 'Our Solution',
    title: 'One Complete Cloud Platform',
    text: 'Everything is managed inside one system.',
    cta: 'Explore the platform',
    to: '/platform',
    tab: 'Platform',
    imageKey: 'platform' as const,
  },
]

export default function HeroBanner() {
  const [index, setIndex] = useState(0)
  const slide = slides[index]
  const image = homeSlideBanners[slide.imageKey]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % slides.length)
    }, 8000)
    return () => window.clearInterval(timer)
  }, [index])

  return (
    <section className="hero-wash relative text-white">
      <BannerMedia
        key={image}
        src={image}
        srcSet={homeSlideSrcSet(slide.imageKey)}
        sizes="100vw"
        priority={index === 0}
      />
      <h1 className="sr-only">{homePageSeo.h1 ?? company.headline}</h1>
      <div className="container-page grid items-stretch gap-8 py-10 sm:py-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:py-16">
        <div className="flex flex-col justify-center">
          <p className="text-[11px] font-medium tracking-[0.16em] text-white/55 uppercase sm:tracking-[0.2em]">
            {company.presentedBy}
          </p>

          <div key={index} className="banner-copy mt-4 sm:mt-5 lg:min-h-[168px]">
            <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              {slide.kicker}
            </p>
            <h2 className="mt-3 max-w-xl text-[1.7rem] leading-tight font-semibold tracking-tight sm:text-[34px] md:text-[42px]">
              {slide.title}
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-7 text-white/75">{slide.text}</p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Button to={slide.to} size="lg" className="w-full sm:w-auto">
              {slide.cta}
            </Button>
            <Button to="/platform" variant="line" size="lg" className="w-full sm:w-auto">
              Explore the platform
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap gap-2 sm:mt-8">
            {slides.map((item, slideIndex) => (
              <button
                key={item.tab}
                type="button"
                onClick={() => setIndex(slideIndex)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  slideIndex === index
                    ? 'bg-white text-brand-navy'
                    : 'bg-white/10 text-white/70 hover:bg-white/16 hover:text-white'
                }`}
              >
                {item.tab}
              </button>
            ))}
          </div>
          <div className="mt-4 h-px max-w-md overflow-hidden bg-white/15">
            <div key={index} className="banner-progress" />
          </div>
        </div>

        <div className="hidden h-[440px] overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_24px_50px_-24px_rgba(0,0,0,0.55)] md:block lg:h-[580px]">
          <DashboardPreview />
        </div>
      </div>

      <div className="audience-marquee" aria-label="Designed specifically for">
        <div className="audience-track">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="audience-group"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {Array.from({ length: 4 }, () => audiences)
                .flat()
                .map((item, index) => {
                  const Icon = audienceIcons[item]
                  return (
                    <span key={`${copy}-${item}-${index}`} className="audience-item">
                      <Icon className="size-3.5" strokeWidth={2.25} />
                      {item}
                    </span>
                  )
                })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
