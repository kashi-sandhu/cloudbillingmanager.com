import { Link } from 'react-router-dom'
import Button from './Button.tsx'
import { brandOfficialLine } from '../../data/brand.ts'
import { officialProductFacts } from '../../data/entity.ts'

type Props = {
  /** Show compact list only (for homepage). */
  compact?: boolean
}

/**
 * Machine-readable HTML facts block — important claims as text, not images.
 */
export default function EntityFacts({ compact = false }: Props) {
  return (
    <section className="ui-card p-5 sm:p-8" aria-labelledby="entity-facts-heading">
      <h2 id="entity-facts-heading" className="text-xl font-bold text-brand-ink sm:text-2xl">
        What is Cloud Billing Manager?
      </h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600">
        {officialProductFacts.shortDefinition}
      </p>
      <p className="sr-only">
        {brandOfficialLine} Also known as: {officialProductFacts.alsoKnownAs}.
      </p>

      <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-2">
        <div className="ui-card-soft p-4 sm:p-5">
          <h3 className="text-base font-semibold text-brand-ink">Who is it for?</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{officialProductFacts.whoFor}</p>
        </div>
        <div className="ui-card-soft p-4 sm:p-5">
          <h3 className="text-base font-semibold text-brand-ink">Geographic focus</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {officialProductFacts.geographicAvailability}
          </p>
        </div>
      </div>

      {!compact ? (
        <>
          <h3 className="mt-8 text-base font-semibold text-brand-ink">What problems does it help solve?</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {officialProductFacts.problemsSolved.map((item) => (
              <li key={item} className="ui-card-soft px-4 py-3 text-sm leading-6 text-slate-700">
                {item}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-base font-semibold text-brand-ink">Key capabilities</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {officialProductFacts.keyCapabilities.map((item) => (
              <li key={item} className="ui-card-soft px-3 py-2.5 text-sm text-slate-700">
                {item}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-base font-semibold text-brand-ink">How related modules connect</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Inventory, purchasing, sales, POS, billing and reporting share the same operational data so stock
            and accounts stay aligned.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {officialProductFacts.modules.slice(0, 8).map((item) => (
              <li key={item.slug}>
                <Link
                  to={`/platform/${item.slug}`}
                  className="inline-flex rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-brand transition hover:border-brand hover:bg-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/platform"
                className="inline-flex rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-brand transition hover:border-brand hover:bg-white"
              >
                Full platform
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <div className="mt-6">
          <Button to="/about" variant="outline" className="w-full sm:w-auto">
            Read the full About page
          </Button>
        </div>
      )}
    </section>
  )
}
