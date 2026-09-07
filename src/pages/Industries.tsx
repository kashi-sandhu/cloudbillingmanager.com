import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import Button from '../components/ui/Button.tsx'
import IconBadge from '../components/ui/IconBadge.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import { audiences, industries } from '../data/content.ts'
import { industryIcons } from '../data/icons.ts'

export default function Industries() {
  return (
    <>
      <PageHero
        eyebrow="Industry Focus"
        title="Designed specifically for"
        text="Modern Cloud ERP designed specifically for Food Distributors, Wholesalers, Cash & Carry, Retail Chains, Importers, FMCG Businesses."
      />

      <section className="py-12 sm:py-16">
        <div className="container-page">
          <SectionHeading title="Modern Cloud ERP designed specifically for" />
          <div className="mt-8 flex flex-wrap gap-2">
            {audiences.map((item) => (
              <span
                key={item}
                className="rounded-full bg-surface px-4 py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-soft hover:text-brand"
              >
                {item}
              </span>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-bold text-brand-ink">Industry Focus:</h2>
          <p className="mt-2 text-sm text-muted">Designed specifically for</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                to={`/industries/${industry.slug}`}
                className="ui-card flex h-full flex-col p-6"
              >
                <IconBadge icon={industryIcons[industry.slug]} />
                <h3 className="mt-4 text-xl font-bold text-brand-ink">{industry.name}</h3>
                <span className="cap-arrow mt-auto pt-4">
                  Open page
                  <span className="cap-arrow-line" />
                  <ArrowRight className="size-4 shrink-0" />
                </span>
              </Link>
            ))}
          </div>

          <Button to="/demo" className="mt-10 w-full sm:w-auto">
            Book a client demo
          </Button>
        </div>
      </section>
    </>
  )
}
