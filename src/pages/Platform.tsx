import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button.tsx'
import ConversionBand from '../components/ui/ConversionBand.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import { capabilities, company, modules } from '../data/content.ts'
import { capabilityIcons, moduleIcons } from '../data/icons.ts'

const capabilityLinks = [
  '/platform/dashboard',
  '/platform/sales',
  '/platform/dashboard',
  '/platform/inventory',
  '/platform/inventory',
  '/platform/sales',
  '/platform/accounting',
  '/platform/hr',
  '/platform/customizable',
]

export default function Platform() {
  return (
    <>
      <PageHero
        eyebrow={company.product}
        title="One Complete Cloud Platform"
        text="Designed for businesses that require:"
      />

      <section className="cap-section py-12 sm:py-16">
        <div className="container-page">
          <SectionHeading title="Designed for businesses that require:" />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {capabilities.map((item, index) => {
              const Icon = capabilityIcons[item.title]
              return (
                <Link key={item.title} to={capabilityLinks[index]} className="plat-mod">
                  <span className="plat-icon">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <h2 className="text-[16px] leading-snug font-semibold tracking-tight break-words text-brand-ink sm:text-[17px]">
                      {item.title}
                    </h2>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.text}</p>
                  </span>
                  <span className="plat-go" aria-hidden>
                    <ArrowRight className="size-4" strokeWidth={2.25} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="plat-section py-12 sm:py-16">
        <div className="container-page">
          <SectionHeading title="Powerful Dashboard Features" text="One Dashboard. Complete Business Visibility." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {modules.map((module) => {
              const Icon = moduleIcons[module.slug]
              return (
                <Link key={module.slug} to={`/platform/${module.slug}`} className="plat-mod">
                  <span className="plat-icon">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <h2 className="text-[16px] leading-snug font-semibold tracking-tight break-words text-brand-ink sm:text-[17px]">
                      {module.name}
                    </h2>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">{module.tagline}</p>
                  </span>
                  <span className="plat-go" aria-hidden>
                    <ArrowRight className="size-4" strokeWidth={2.25} />
                  </span>
                </Link>
              )
            })}
          </div>
          <div className="mt-10">
            <Button to="/demo" className="w-full sm:w-auto">
              Book a client demo
            </Button>
          </div>
        </div>
      </section>

      <ConversionBand
        title="Ready to explore the full platform?"
        text="Book a client demonstration or contact AVANTCORE Technologies to discuss your distribution workflow."
      />
    </>
  )
}
