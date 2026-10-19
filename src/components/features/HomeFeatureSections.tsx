import { CheckCircle2 } from 'lucide-react'
import Button from '../ui/Button.tsx'
import SectionHeading from '../ui/SectionHeading.tsx'
import { fleetLogisticsFeature, whatsappOrderingFeature } from '../../data/features.ts'
import FleetLogisticsVisual from './FleetLogisticsVisual.tsx'
import WhatsAppOrderVisual from './WhatsAppOrderVisual.tsx'

export default function HomeFeatureSections() {
  return (
    <>
      <section className="border-y border-line bg-white py-12 sm:py-16 lg:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              eyebrow={whatsappOrderingFeature.eyebrow}
              title={whatsappOrderingFeature.homeHeading}
              text={whatsappOrderingFeature.homeText}
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {whatsappOrderingFeature.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              to={whatsappOrderingFeature.path}
              className="mt-8 w-full sm:w-auto"
              analytics="cta_click_ai_whatsapp"
            >
              {whatsappOrderingFeature.homeCta}
            </Button>
          </div>
          <WhatsAppOrderVisual />
        </div>
      </section>

      <section className="bg-surface py-12 sm:py-16 lg:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 lg:order-1">
            <FleetLogisticsVisual />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow={fleetLogisticsFeature.eyebrow}
              title={fleetLogisticsFeature.homeHeading}
              text={fleetLogisticsFeature.homeText}
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {fleetLogisticsFeature.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              to={fleetLogisticsFeature.path}
              className="mt-8 w-full sm:w-auto"
              analytics="cta_click_fleet"
            >
              {fleetLogisticsFeature.homeCta}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
