import PageHero from '../components/ui/PageHero.tsx'
import Button from '../components/ui/Button.tsx'
import { brand, brandAlsoKnownAs, brandPressBoilerplate } from '../data/brand.ts'
import { company, telHref } from '../data/content.ts'
import { checklistCitation } from '../data/resources.ts'
import { siteUrl } from '../data/seo.ts'

const brandFacts = [
  { label: 'Product', value: company.product },
  { label: 'Also known as', value: brandAlsoKnownAs },
  { label: 'Official domain', value: brand.domain },
  { label: 'Presented by', value: company.presenter },
  { label: 'Website', value: company.website },
  { label: 'Email', value: company.email },
  { label: 'Phone', value: company.phone },
  { label: 'Landline', value: company.landline },
  { label: 'Head Office', value: company.address },
]

const boilerplate = brandPressBoilerplate

export default function Press() {
  return (
    <>
      <PageHero
        eyebrow="Press & media"
        title="Press kit for Cloud Billing Manager"
        text="Verified brand facts, product boilerplate and resource links for journalists, partners and publishers. No fabricated statistics or awards."
      />

      <section className="py-12 sm:py-16">
        <div className="container-page max-w-3xl space-y-10">
          <div>
            <h2 className="text-xl font-bold text-brand-ink">Brand facts</h2>
            <dl className="mt-5 space-y-3">
              {brandFacts.map((item) => (
                <div key={item.label} className="grid gap-1 rounded-xl border border-line bg-white p-4 sm:grid-cols-[160px_1fr]">
                  <dt className="text-sm font-semibold text-muted">{item.label}</dt>
                  <dd className="text-sm font-medium break-words text-brand-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-ink">Approved short description</h2>
            <p className="mt-3 ui-card-soft p-5 text-[15px] leading-7 text-slate-700">
              {boilerplate}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-ink">Linkable resources</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a className="font-semibold text-brand" href={`${siteUrl}/about`}>
                  About Cloud Billing Manager
                </a>
              </li>
              <li>
                <a className="font-semibold text-brand" href={`${siteUrl}${checklistCitation.urlPath}`}>
                  {checklistCitation.title}
                </a>
              </li>
              <li>
                <a className="font-semibold text-brand" href={`${siteUrl}/blog`}>
                  Cloud Billing Manager Blog
                </a>
              </li>
              <li>
                <a className="font-semibold text-brand" href={`${siteUrl}/resources`}>
                  Resources hub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-ink">Media contact</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              For interviews, product briefings or resource permissions, contact{' '}
              <a className="font-semibold text-brand" href={`mailto:${company.email}`}>
                {company.email}
              </a>{' '}
              or call{' '}
              <a className="font-semibold text-brand" href={telHref(company.phone)}>
                {company.phone}
              </a>{' '}
              / landline{' '}
              <a className="font-semibold text-brand" href={telHref(company.landline)}>
                {company.landline}
              </a>
              .
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" className="w-full sm:w-auto">Contact form</Button>
              <Button to="/demo" variant="outline" className="w-full sm:w-auto">
                Book a product briefing
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted">
            This press page contains only verified company information already published on the website. It
            does not invent customer counts, awards, rankings or revenue claims.
          </p>
        </div>
      </section>
    </>
  )
}
