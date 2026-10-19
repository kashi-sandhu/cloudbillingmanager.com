import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.tsx'
import FaqSection from '../components/ui/FaqSection.tsx'
import InventoryWorkflowGraphic from '../components/ui/InventoryWorkflowGraphic.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import { staticPageSeo } from '../data/pageSeo.ts'
import { productPositioning } from '../data/semantic.ts'

const sections = [
  {
    title: 'What inventory management means for distributors',
    body: 'Inventory management is how a business tracks products, quantities, warehouses and stock movements after purchases, sales, transfers and returns. For food distributors, that visibility affects fulfilment, purchasing and cash flow.',
    links: [
      { to: '/blog/what-is-inventory-management', label: 'What is inventory management?' },
      { to: '/platform/inventory', label: 'Inventory management software' },
    ],
  },
  {
    title: 'Stock control and warehouse balances',
    body: 'Useful stock control separates available, reserved and incoming quantities, and shows which warehouse holds stock. Transfers and adjustments keep location balances trustworthy.',
    links: [
      { to: '/blog/how-to-manage-stock-effectively', label: 'How to manage stock effectively' },
      { to: '/resources/inventory-management-checklist', label: 'Inventory checklist' },
    ],
  },
  {
    title: 'Purchasing, sales and POS connections',
    body: 'Inventory accuracy depends on verified purchase receipts, sales invoices and POS transactions updating the same stock record. Disconnected tools create overselling and late replenishment.',
    links: [
      { to: '/platform/purchasing', label: 'Purchase management software' },
      { to: '/platform/sales', label: 'Sales and invoicing software' },
      { to: '/blog/pos-and-inventory-management', label: 'POS and inventory management' },
    ],
  },
  {
    title: 'Inventory reporting and low-stock monitoring',
    body: 'Reports should answer operational questions: stock value, warehouse balances, adjustments, transfers and low-stock items — without rebuilding spreadsheets each week.',
    links: [
      { to: '/platform/dashboard', label: 'Business dashboard and inventory reports' },
      { to: '/blog/benefits-of-inventory-management-software', label: 'Benefits of inventory software' },
    ],
  },
  {
    title: 'Spreadsheets vs inventory software',
    body: 'Spreadsheets can work briefly. They break when multiple people update stock, warehouses diverge, or sales and purchasing use different versions of the same list.',
    links: [
      {
        to: '/resources/inventory-software-vs-spreadsheets',
        label: 'Inventory software vs spreadsheets',
      },
      {
        to: '/blog/inventory-management-for-small-businesses',
        label: 'Inventory software for small businesses',
      },
    ],
  },
]

export default function InventoryManagementGuide() {
  return (
    <>
      <PageHero
        eyebrow="Topic hub"
        title="Inventory Management Guide for Food Distributors"
        text="A semantic hub connecting definitions, stock control, purchasing, sales, POS and Cloud Billing Manager inventory capabilities."
      />

      <article className="py-12 sm:py-16">
        <div className="container-page max-w-3xl space-y-8">
          <p className="text-[15px] leading-7 text-slate-600">{productPositioning}</p>
          <p className="text-[15px] leading-7 text-slate-600">
            Use this guide to move from concepts to practical workflows, then into the product modules and
            checklists that support day-to-day stock control.
          </p>

          <InventoryWorkflowGraphic />

          {sections.map((section) => (
            <section key={section.title} className="ui-card p-5 sm:p-7">
              <h2 className="text-xl font-bold text-brand-ink">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{section.body}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="inline-flex rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <div className="ui-card border-brand-soft bg-brand-soft/40 p-6">
            <h2 className="text-xl font-bold text-brand-ink">Explore the product</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Cloud Billing Manager inventory management includes product masters, multi-warehouse support,
              transfers, adjustments, returns and inventory reports connected to purchasing, sales and POS.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button to="/platform/inventory" className="w-full sm:w-auto">Inventory management software</Button>
              <Button to="/demo" variant="outline" className="w-full sm:w-auto">
                Book a client demo
              </Button>
            </div>
          </div>

          <FaqSection faqs={staticPageSeo['/resources/inventory-management-guide']?.faqs ?? []} />

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
