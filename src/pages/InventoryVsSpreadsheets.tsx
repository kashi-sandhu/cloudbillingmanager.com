import Button from '../components/ui/Button.tsx'
import FaqSection from '../components/ui/FaqSection.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import { staticPageSeo } from '../data/pageSeo.ts'
import { productPositioning } from '../data/semantic.ts'

const rows = [
  {
    topic: 'Multi-user updates',
    spreadsheet: 'Version conflicts and overwritten rows are common',
    software: 'One live stock record shared by sales, warehouse and purchasing',
  },
  {
    topic: 'Warehouse locations',
    spreadsheet: 'Often a single total quantity',
    software: 'Allocation and transfers by warehouse',
  },
  {
    topic: 'Sales and POS',
    spreadsheet: 'Manual reductions after the fact',
    software: 'Invoices and POS can update availability automatically',
  },
  {
    topic: 'Purchase receipts',
    spreadsheet: 'Easy to forget or double-enter',
    software: 'Verified receipts update stock and costs',
  },
  {
    topic: 'Audit trail',
    spreadsheet: 'Hard to see who changed what and why',
    software: 'Adjustments, transfers and history support investigation',
  },
  {
    topic: 'Reporting',
    spreadsheet: 'Rebuilt weekly from exports',
    software: 'Stock value, low stock and movement reports in-platform',
  },
]

export default function InventoryVsSpreadsheets() {
  return (
    <>
      <PageHero
        eyebrow="Comparison"
        title="Inventory Management Software vs Spreadsheets"
        text="A practical comparison for distributors deciding when spreadsheets stop being enough for stock control."
      />

      <article className="py-12 sm:py-16">
        <div className="container-page max-w-3xl space-y-8">
          <p className="text-[15px] leading-7 text-slate-600">{productPositioning}</p>
          <p className="text-[15px] leading-7 text-slate-600">
            Spreadsheets are useful for early-stage lists. They become risky when product ranges grow, multiple
            people edit stock, or sales and purchasing need the same live availability number.
          </p>

          <div className="ui-card overflow-x-auto">
            <table className="min-w-[36rem] w-full text-left text-sm">
              <thead className="bg-surface text-brand-ink">
                <tr>
                  <th className="px-4 py-3 font-semibold">Topic</th>
                  <th className="px-4 py-3 font-semibold">Spreadsheets</th>
                  <th className="px-4 py-3 font-semibold">Inventory software</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.topic} className="border-t border-line align-top">
                    <td className="px-4 py-3 font-semibold text-brand-ink">{row.topic}</td>
                    <td className="px-4 py-3 text-slate-600">{row.spreadsheet}</td>
                    <td className="px-4 py-3 text-slate-600">{row.software}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="ui-card p-5 sm:p-7">
            <h2 className="text-xl font-bold text-brand-ink">When to move off spreadsheets</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
              <li>More than one person updates stock during the day</li>
              <li>Orders are fulfilled from more than one warehouse or van stock</li>
              <li>POS or sales invoices are separate from the stock list</li>
              <li>Returns and adjustments are recorded inconsistently</li>
            </ul>
          </section>

          <section className="ui-card border-brand-soft bg-brand-soft/40 p-6">
            <h2 className="text-xl font-bold text-brand-ink">How Cloud Billing Manager helps</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Cloud Billing Manager keeps product masters, warehouses, purchases, sales, POS and inventory
              reports in one cloud system so stock decisions use live operational data.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button to="/platform/inventory" className="w-full sm:w-auto">Explore inventory management</Button>
              <Button to="/resources/inventory-management-checklist" variant="outline" className="w-full sm:w-auto">
                Use the inventory checklist
              </Button>
            </div>
          </section>

          <FaqSection faqs={staticPageSeo['/resources/inventory-software-vs-spreadsheets']?.faqs ?? []} />

          <div className="mt-8">
            <Button to="/resources" variant="outline" className="w-full sm:w-auto">
              Back to resources
            </Button>
          </div>
        </div>
      </article>
    </>
  )
}
