import { CheckCircle2 } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import Button from '../components/ui/Button.tsx'
import ConversionBand from '../components/ui/ConversionBand.tsx'
import IconBadge from '../components/ui/IconBadge.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import { benefits, company, replacedSystems, whyUs } from '../data/content.ts'
import { replacedSystemIcons } from '../data/icons.ts'

export default function Why() {
  return (
    <>
      <PageHero
        eyebrow="Why Cloud Billing Manager?"
        title="Cloud Billing Manager One Platform. Complete Business Control."
        text={company.positioning}
      />

      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading title="Business Benefits" />
            <ul className="mt-8 space-y-3">
              {benefits.map((item) => (
                <li key={item} className="ui-card-soft flex items-start gap-3 px-4 py-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="Why Cloud Billing Manager?" />
            <ul className="mt-8 space-y-3">
              {whyUs.map((item) => (
                <li key={item} className="ui-card-soft flex items-start gap-3 px-4 py-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button to="/about" variant="outline" className="w-full sm:w-auto">
                Read official About facts
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 sm:py-16">
        <div className="container-page">
          <SectionHeading title="Our Solution" text="One Complete Cloud Platform. Instead of using:" />
          <div className="mt-8 flex flex-wrap gap-2">
            {replacedSystems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 ring-1 ring-line"
              >
                <IconBadge icon={replacedSystemIcons[item]} size="sm" />
                {item}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm font-semibold text-brand-navy">
            Everything is managed inside one system.
          </p>
          <div className="mt-10">
            <Button to="/demo" size="lg" className="w-full sm:w-auto">
              Book a client demo
            </Button>
          </div>
        </div>
      </section>

      <ConversionBand
        title="Replace disconnected systems with one cloud platform"
        text="Book a client demo to see invoicing, inventory, billing, POS and reporting working together."
      />
    </>
  )
}
