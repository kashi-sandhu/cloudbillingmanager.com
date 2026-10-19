import { CheckCircle2 } from 'lucide-react'
import Button from '../components/ui/Button.tsx'
import ConversionBand from '../components/ui/ConversionBand.tsx'
import FaqSection from '../components/ui/FaqSection.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import ConnectedWorkflow from '../components/features/ConnectedWorkflow.tsx'
import WhatsAppOrderVisual from '../components/features/WhatsAppOrderVisual.tsx'
import { featurePaths, whatsappOrderingFeature } from '../data/features.ts'

export default function AiWhatsappOrdering() {
  const feature = whatsappOrderingFeature

  return (
    <>
      <PageHero eyebrow={feature.eyebrow} title={feature.heroTitle} text={feature.heroText} />

      <section className="nf-overview border-b border-line bg-surface py-12 sm:py-16">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div>
            <SectionHeading
              eyebrow="AI order recognition"
              title={feature.overviewTitle}
              text={feature.overviewText}
            />
            <ul className="nf-overview-points">
              <li>WhatsApp messages become structured invoice drafts</li>
              <li>Customer and product matching with confidence scoring</li>
              <li>Staff review, edit and approve before posting</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/demo" analytics="cta_click_demo">
                Book a Demo
              </Button>
              <Button to="/platform" variant="outline">
                Explore the Platform
              </Button>
            </div>
          </div>
          <WhatsAppOrderVisual />
        </div>
      </section>

      <section className="border-y border-line bg-surface py-12 sm:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Process"
            title="WhatsApp Message → AI Draft → Staff Control"
            text="AI prepares structured drafts. Your team reviews and posts."
          />
          <ol className="nf-process mt-10">
            {feature.processSteps.map((step, index) => (
              <li key={step.label} className="nf-process-item">
                <span className="nf-process-num">{index + 1}</span>
                <h3>{step.label}</h3>
                <p>{step.detail}</p>
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
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {section.points.map((point) => (
                <li key={point} className="ui-card-soft flex items-start gap-3 p-4 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
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
            eyebrow="Sales Operations"
            title="Built into your existing sales workflow"
            text="AI WhatsApp ordering sits inside Cloud Billing Manager Sales — connected to customers, products, invoice posting and delivery preparation."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/platform/sales" variant="outline">
              Sales Management
            </Button>
            <Button to={featurePaths.fleetLogistics} variant="outline">
              Fleet & Logistics
            </Button>
            <Button to="/pricing" variant="outline">
              Pricing
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
        title="See AI WhatsApp ordering in a live walkthrough"
        text="Book a client demonstration covering WhatsApp order intake, AI draft review, invoice posting and connected delivery preparation."
        secondaryLabel="Explore Fleet Management"
        secondaryTo={featurePaths.fleetLogistics}
      />
    </>
  )
}
