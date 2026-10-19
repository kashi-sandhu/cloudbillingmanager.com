import { Check, Minus } from 'lucide-react'
import Button from '../components/ui/Button.tsx'
import ConversionBand from '../components/ui/ConversionBand.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import FaqSection from '../components/ui/FaqSection.tsx'
import {
  pricingComparisonRows,
  pricingPageCopy,
  pricingPlans,
  type PricingFeatureValue,
  type PricingPlanId,
} from '../data/pricing.ts'
import { staticPageSeo } from '../data/pageSeo.ts'

function FeatureCell({ value }: { value: PricingFeatureValue }) {
  if (typeof value === 'boolean') {
    return value ? (
      <span className="pricing-check" aria-label="Included">
        <Check className="size-4" strokeWidth={2.5} />
      </span>
    ) : (
      <span className="pricing-dash" aria-label="Not included">
        <Minus className="size-4" strokeWidth={2} />
      </span>
    )
  }

  return <span className="pricing-text-value">{value}</span>
}

function planColumn(planId: PricingPlanId, row: (typeof pricingComparisonRows)[number]) {
  return row[planId]
}

export default function Pricing() {
  return (
    <>
      <PageHero
        eyebrow={pricingPageCopy.eyebrow}
        title={pricingPageCopy.title}
        text={`${pricingPageCopy.subtitle}. ${pricingPageCopy.intro}`}
      />

      <section className="py-12 sm:py-16">
        <div className="container-page">
          <SectionHeading title={pricingPageCopy.subtitle} text={pricingPageCopy.intro} />

          <div className="pricing-plans mt-10">
            {pricingPlans.map((plan) => (
              <article
                key={plan.id}
                className={`pricing-plan${plan.popular ? ' is-popular' : ''}`}
              >
                {plan.popular ? <span className="pricing-badge">Most Popular</span> : null}
                <header className="pricing-plan-head">
                  <h2 className="pricing-plan-name">{plan.name}</h2>
                  <p className="pricing-plan-summary">{plan.summary}</p>
                  <p className="pricing-plan-price">
                    <span className="pricing-amount">{plan.price}</span>
                    <span className="pricing-period">{plan.period}</span>
                  </p>
                </header>
                <ul className="pricing-highlights">
                  {plan.highlights.map((item) => (
                    <li key={item}>
                      <Check className="pricing-highlight-icon" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pricing-plan-cta">
                  <Button to={plan.cta.to} className="w-full" variant={plan.popular ? 'accent' : 'outline'}>
                    {plan.cta.label}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 sm:py-16">
        <div className="container-page">
          <SectionHeading title={pricingPageCopy.tableTitle} text={pricingPageCopy.tableText} />

          <div className="pricing-table-wrap mt-8">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  {pricingPlans.map((plan) => (
                    <th key={plan.id} scope="col" className={plan.popular ? 'is-popular' : undefined}>
                      {plan.name}
                      {plan.popular ? <span className="pricing-th-badge">Popular</span> : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricingComparisonRows.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    {pricingPlans.map((plan) => (
                      <td key={plan.id} className={plan.popular ? 'is-popular' : undefined}>
                        <FeatureCell value={planColumn(plan.id, row)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="pricing-note mt-6">{pricingPageCopy.note}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-page">
          <FaqSection faqs={staticPageSeo['/pricing']?.faqs ?? []} />
        </div>
      </section>

      <ConversionBand
        title="Ready to choose a plan?"
        text="Book a client demo and we will walk through Starter, Business or Advanced against your invoice volume, users and warehouse workflow."
      />
    </>
  )
}
