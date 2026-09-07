import Button from '../components/ui/Button.tsx'
import EntityFacts from '../components/ui/EntityFacts.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import { officialProductFacts } from '../data/entity.ts'
import { company, telHref } from '../data/content.ts'

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="About Cloud Billing Manager"
        text="Official product and company facts for UK food distribution businesses — presented by AVANTCORE Technologies."
      />

      <article className="py-12 sm:py-16">
        <div className="container-page space-y-8 sm:space-y-10">
          <EntityFacts />

          <div className="grid gap-6 lg:grid-cols-2">
            <section aria-labelledby="company-heading" className="ui-card p-5 sm:p-8">
              <h2 id="company-heading" className="text-xl font-bold text-brand-ink sm:text-2xl">
                Company information
              </h2>
              <dl className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
                <div className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-3">
                  <dt className="font-semibold text-brand-ink">Presented by</dt>
                  <dd className="break-words">{officialProductFacts.company.presenter}</dd>
                </div>
                <div className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-3">
                  <dt className="font-semibold text-brand-ink">Head office</dt>
                  <dd className="break-words">
                    {officialProductFacts.company.office}
                    <br />
                    {officialProductFacts.company.address}
                  </dd>
                </div>
                <div className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-3">
                  <dt className="font-semibold text-brand-ink">Email</dt>
                  <dd className="min-w-0 break-all">
                    <a className="font-semibold text-brand" href={`mailto:${officialProductFacts.company.email}`}>
                      {officialProductFacts.company.email}
                    </a>
                  </dd>
                </div>
                <div className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-3">
                  <dt className="font-semibold text-brand-ink">Phone</dt>
                  <dd>
                    <a
                      className="font-semibold text-brand"
                      href={telHref(officialProductFacts.company.phone)}
                    >
                      {officialProductFacts.company.phone}
                    </a>
                  </dd>
                </div>
                <div className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-3">
                  <dt className="font-semibold text-brand-ink">Landline</dt>
                  <dd>
                    <a
                      className="font-semibold text-brand"
                      href={telHref(officialProductFacts.company.landline)}
                    >
                      {officialProductFacts.company.landline}
                    </a>
                  </dd>
                </div>
                <div className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-3">
                  <dt className="font-semibold text-brand-ink">Group site</dt>
                  <dd className="min-w-0 break-all">
                    <a
                      className="font-semibold text-brand"
                      href={officialProductFacts.company.groupSite}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {company.groupSiteLabel}
                    </a>
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-sm leading-6 text-muted">{officialProductFacts.pricingNote}</p>
            </section>

            <section aria-labelledby="industries-heading" className="ui-card p-5 sm:p-8">
              <h2 id="industries-heading" className="text-xl font-bold text-brand-ink sm:text-2xl">
                Industries served
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Cloud Billing Manager is positioned for food distribution verticals including:
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {officialProductFacts.industries.map((name) => (
                  <li
                    key={name}
                    className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-brand-navy"
                  >
                    {name}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button to="/industries" variant="outline" className="w-full sm:w-auto">
                  Explore industry pages
                </Button>
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button to="/demo" className="w-full sm:w-auto">
              Book a client demo
            </Button>
            <Button to="/contact" variant="outline" className="w-full sm:w-auto">
              Contact Us
            </Button>
            <Button to="/platform" variant="ghost" className="w-full sm:w-auto">
              View platform modules
            </Button>
          </div>
        </div>
      </article>
    </>
  )
}
