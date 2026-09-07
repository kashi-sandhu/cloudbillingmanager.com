import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.tsx'
import FaqSection from '../components/ui/FaqSection.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import { staticPageSeo } from '../data/pageSeo.ts'
import { glossaryTerms, productPositioning } from '../data/semantic.ts'

export default function Glossary() {
  return (
    <>
      <PageHero
        eyebrow="Glossary"
        title="Inventory, billing and POS glossary"
        text="Short definitions of operational terms used across Cloud Billing Manager and UK food distribution workflows."
      />

      <section className="py-12 sm:py-16">
        <div className="container-page max-w-3xl">
          <p className="text-[15px] leading-7 text-slate-600">{productPositioning}</p>
          <p className="mt-3 text-sm leading-6 text-muted">
            Definitions are practical, not legal advice. Each term links to related product or learning pages
            where useful.
          </p>

          <dl className="mt-10 space-y-5">
            {glossaryTerms.map((item) => (
              <div key={item.term} id={item.term.toLowerCase().replace(/\s+/g, '-')} className="ui-card p-5 sm:p-6">
                <dt className="text-lg font-bold text-brand-ink">{item.term}</dt>
                <dd className="mt-2 text-sm leading-6 text-slate-600">{item.definition}</dd>
                {item.related?.length ? (
                  <dd className="mt-4 flex flex-wrap gap-2">
                    {item.related.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-brand"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </dd>
                ) : null}
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <FaqSection faqs={staticPageSeo['/resources/glossary']?.faqs ?? []} />
          </div>

          <div className="mt-10">
            <Button to="/resources" variant="outline" className="w-full sm:w-auto">
              Back to resources
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
