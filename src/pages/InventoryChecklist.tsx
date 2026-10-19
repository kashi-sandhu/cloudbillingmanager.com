import { Link } from 'react-router-dom'
import { CheckCircle2, Printer } from 'lucide-react'
import Button from '../components/ui/Button.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import {
  checklistCitation,
  inventoryChecklistGroups,
  inventoryWorkflowSteps,
} from '../data/resources.ts'
import { company } from '../data/content.ts'
import { siteUrl } from '../data/seo.ts'

export default function InventoryChecklist() {
  const citeUrl = `${siteUrl}${checklistCitation.urlPath}`

  return (
    <>
      <PageHero
        eyebrow="Free operational resource"
        title={checklistCitation.title}
        text="A practical checklist for UK food distributors, wholesalers and cash & carry operators who need clearer stock control across purchasing, sales, warehouses and POS."
      />

      <article className="py-12 sm:py-16">
        <div className="container-page">
          <div className="flex flex-col gap-4 ui-card-soft p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 print:hidden">
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Use this checklist in operations reviews, onboarding workshops or consulting engagements. It is
              free to reference with attribution.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                arrow={false}
                onClick={() => window.print()}
                className="w-full sm:w-auto"
              >
                <Printer className="size-4" />
                Print checklist
              </Button>
              <Button to="/demo" className="w-full sm:w-auto">
                Book a client demo
              </Button>
            </div>
          </div>

          <div className="mt-10 max-w-3xl space-y-5 text-[15px] leading-7 text-slate-600">
            <p>
              Inventory problems rarely start with software alone. They start when product masters are messy,
              purchases enter stock without verification, sales and POS reduce quantity in different systems,
              or returns update accounts without updating warehouses.
            </p>
            <p>
              This checklist is designed for distribution businesses that need live stock visibility across
              purchasing, sales, warehouses and counter sales. It maps to practical workflows supported by{' '}
              <Link to="/platform/inventory" className="font-semibold text-brand">
                Cloud Billing Manager inventory management
              </Link>
              . For concepts and related articles, see the{' '}
              <Link to="/resources/inventory-management-guide" className="font-semibold text-brand">
                inventory management guide
              </Link>
              , without inventing features or fabricated benchmarks.
            </p>
          </div>

          <section className="mt-12" aria-labelledby="workflow-heading">
            <h2 id="workflow-heading" className="text-2xl font-bold text-brand-ink">
              Inventory workflow at a glance
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Use this sequence when explaining how stock should move through the business.
            </p>
            <ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {inventoryWorkflowSteps.map((item, index) => (
                <li key={item.step} className="ui-card p-4">
                  <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 text-base font-bold text-brand-ink">{item.step}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-12 space-y-8">
            {inventoryChecklistGroups.map((group) => (
              <section
                key={group.title}
                className="ui-card p-5 sm:p-8"
                aria-labelledby={group.title}
              >
                <h2 id={group.title} className="text-xl font-bold text-brand-ink sm:text-2xl">
                  {group.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{group.intro}</p>
                <ul className="mt-6 space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-6 text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <section className="mt-12 ui-card-soft p-5 sm:p-8">
            <h2 className="text-xl font-bold text-brand-ink sm:text-2xl">How this connects to Cloud Billing Manager</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              Cloud Billing Manager supports product masters, multi-warehouse allocation, transfers,
              adjustments, returns, inventory reports, purchase updates, sales invoicing and POS stock updates
              in one cloud platform for UK food distribution businesses.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { to: '/platform/inventory', label: 'Inventory' },
                { to: '/platform/purchasing', label: 'Purchasing' },
                { to: '/platform/sales', label: 'Sales & invoicing' },
                { to: '/platform/pos', label: 'POS' },
                { to: '/platform/dashboard', label: 'Dashboards' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-brand"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button to="/demo" className="w-full sm:w-auto">Book a client demo</Button>
              <Button to="/blog/what-is-inventory-management" variant="outline" className="w-full sm:w-auto">
                Read inventory guide
              </Button>
            </div>
          </section>

          <section className="mt-12 ui-card border-dashed p-5 sm:p-8">
            <h2 className="text-lg font-bold text-brand-ink">How to cite or share this checklist</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Publishers, consultants and educators may reference this resource with a natural brand citation.
              Suggested attribution:
            </p>
            <blockquote className="mt-4 rounded-xl bg-surface p-4 text-sm leading-6 text-brand-ink">
              {checklistCitation.title} ({checklistCitation.year}). {checklistCitation.publisher}.{' '}
              <a href={citeUrl} className="font-semibold text-brand break-all">
                {citeUrl}
              </a>
            </blockquote>
            <p className="mt-4 text-sm text-muted">
              Presented by {company.presenter}. Head Office: {company.office}.
            </p>
          </section>

          <div className="mt-8">
            <Button to="/blog" variant="outline" className="w-full sm:w-auto">
              Back to blog
            </Button>
          </div>
        </div>
      </article>
    </>
  )
}
