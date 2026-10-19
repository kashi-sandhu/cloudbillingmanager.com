import { CheckCircle2 } from 'lucide-react'
import Button from '../components/ui/Button.tsx'
import ConversionBand from '../components/ui/ConversionBand.tsx'
import FaqSection from '../components/ui/FaqSection.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import ConnectedWorkflow from '../components/features/ConnectedWorkflow.tsx'
import FleetLogisticsVisual from '../components/features/FleetLogisticsVisual.tsx'
import { featurePaths, fleetLogisticsFeature } from '../data/features.ts'

export default function FleetLogistics() {
  const feature = fleetLogisticsFeature

  return (
    <>
      <PageHero eyebrow={feature.eyebrow} title={feature.heroTitle} text={feature.heroText} />

      <section className="nf-overview border-b border-line bg-surface py-12 sm:py-16">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div>
            <SectionHeading
              eyebrow="Live routes & dispatch"
              title={feature.overviewTitle}
              text={feature.overviewText}
            />
            <ul className="nf-overview-points">
              <li>Live route path with numbered delivery stops</li>
              <li>Driver and vehicle stay linked during dispatch</li>
              <li>Capacity-aware load visibility on every van</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/demo" analytics="cta_click_demo">
                Book a Demo
              </Button>
              <Button to="#auto-assign" variant="outline">
                Explore Auto Assignment
              </Button>
            </div>
          </div>
          <FleetLogisticsVisual />
        </div>
      </section>

      <section id="auto-assign" className="border-y border-line bg-brand-navy py-12 text-white sm:py-16">
        <div className="container-page">
          <SectionHeading
            light
            eyebrow="Auto Assign Deliveries"
            title="Five-step smarter delivery planning"
            text="One of our most important logistics capabilities — automatic local route building with capacity awareness."
          />
          <ol className="nf-steps mt-10">
            {feature.autoAssignSteps.map((item) => (
              <li key={item.step} className="nf-step-card">
                <span className="nf-step-num">Step {item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {feature.sections.map((section, index) => (
        <section
          key={section.id}
          className={`py-12 sm:py-16${index % 2 === 1 ? ' bg-surface' : ''}`}
        >
          <div className="container-page">
            <SectionHeading title={section.title} text={section.text} />
            {'note' in section && section.note ? (
              <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">{section.note}</p>
            ) : null}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {section.points.map((point) => (
                <li key={point} className="ui-card-soft flex items-start gap-3 p-4 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="border-y border-line py-12 sm:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Connected Operations"
            title="Logistics stays linked to sales and invoicing"
            text="Delivery routes draw from the same delivery invoice pool used in sales workflows — helping teams move from invoice posting to dispatch without disconnected tools."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/platform/sales" variant="outline">
              Sales Management
            </Button>
            <Button to={featurePaths.whatsappOrdering} variant="outline">
              AI WhatsApp Ordering
            </Button>
            <Button to="/platform" variant="outline">
              Full Platform
            </Button>
          </div>
        </div>
      </section>

      <ConnectedWorkflow compact />

      <section className="py-12 sm:py-16">
        <div className="container-page">
          <FaqSection faqs={[...feature.faqs]} />
        </div>
      </section>

      <ConversionBand
        title="See fleet and logistics in a live walkthrough"
        text="Book a client demonstration covering drivers, vehicles, auto assignment, capacity planning and delivery history."
        secondaryLabel="Explore AI Ordering"
        secondaryTo={featurePaths.whatsappOrdering}
      />
    </>
  )
}
