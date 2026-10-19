import type { ReactNode } from 'react'

/** Conceptual product illustrations for platform module pages — not live data. */

type ShellProps = {
  title: string
  status: string
  statusHint: string
  children: ReactNode
}

function Shell({ title, status, statusHint, children }: ShellProps) {
  return (
    <div className="nf-live nf-mod" aria-hidden="true">
      <div className="nf-live-top">
        <div className="nf-live-brand">
          <span className="nf-live-dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <strong>{title}</strong>
        </div>
        <div className="nf-live-status">
          <span className="nf-live-pulse" />
          {status}
          <em>{statusHint}</em>
        </div>
      </div>
      <div className="nf-live-body nf-mod-body">{children}</div>
    </div>
  )
}

function InventoryVisual() {
  return (
    <Shell title="Warehouse Inventory" status="Stock synced" statusHint="Live levels">
      <div className="nf-mod-main">
        <div className="nf-mod-table is-cols-5">
          <div className="nf-mod-row is-head">
            <span>SKU</span>
            <span>Product</span>
            <span>Location</span>
            <span>Qty</span>
            <span>Status</span>
          </div>
          <div className="nf-mod-row is-active">
            <span>FP-100</span>
            <span>Frozen Peas 1kg</span>
            <span>A-12</span>
            <span>248</span>
            <span className="nf-mod-tag is-ok">In stock</span>
          </div>
          <div className="nf-mod-row">
            <span>CB-220</span>
            <span>Chicken Breast</span>
            <span>C-04</span>
            <span>36</span>
            <span className="nf-mod-tag is-warn">Low</span>
          </div>
          <div className="nf-mod-row">
            <span>MS-014</span>
            <span>Mixed Salad</span>
            <span>B-08</span>
            <span>112</span>
            <span className="nf-mod-tag is-ok">In stock</span>
          </div>
          <div className="nf-mod-row">
            <span>OL-090</span>
            <span>Olive Oil 5L</span>
            <span>D-02</span>
            <span>18</span>
            <span className="nf-mod-tag is-warn">Reorder</span>
          </div>
        </div>
      </div>
      <aside className="nf-live-panel">
        <div className="nf-live-card">
          <div className="nf-live-card-head">
            <p>Today’s movements</p>
            <span className="nf-live-pill is-ready">Tracked</span>
          </div>
          <div className="nf-mod-list">
            <div>
              <span>In</span>
              <strong>+420</strong>
            </div>
            <div>
              <span>Out</span>
              <strong>−286</strong>
            </div>
            <div>
              <span>Adjust</span>
              <strong>4</strong>
            </div>
          </div>
        </div>
        <div className="nf-live-card">
          <div className="nf-live-card-head">
            <p>Reorder watch</p>
            <span className="nf-live-pill is-trip">2 SKUs</span>
          </div>
          <small>Chicken Breast · Olive Oil below min</small>
          <div className="nf-fleet-bar">
            <i className="nf-mod-bar-warn" style={{ width: '28%' }} />
          </div>
          <div className="nf-live-card-foot">
            <small>Capacity used</small>
            <strong>28%</strong>
          </div>
        </div>
        <div className="nf-live-stats">
          <div>
            <strong>1.2k</strong>
            <span>SKUs</span>
          </div>
          <div>
            <strong>6</strong>
            <span>Zones</span>
          </div>
          <div>
            <strong>98%</strong>
            <span>Accuracy</span>
          </div>
        </div>
      </aside>
    </Shell>
  )
}

function DashboardVisual() {
  return (
    <Shell title="Operations Dashboard" status="Live view" statusHint="Updated now">
      <div className="nf-mod-main">
        <div className="nf-mod-kpis">
          <div>
            <span>Today’s sales</span>
            <strong>£18.4k</strong>
            <em className="is-up">+12%</em>
          </div>
          <div>
            <span>Collections</span>
            <strong>£9.2k</strong>
            <em className="is-up">+6%</em>
          </div>
          <div>
            <span>Open invoices</span>
            <strong>64</strong>
            <em>Due</em>
          </div>
          <div>
            <span>Low stock</span>
            <strong>11</strong>
            <em className="is-warn">Alert</em>
          </div>
        </div>
        <div className="nf-mod-chart" aria-hidden>
          <i style={{ height: '42%' }} />
          <i style={{ height: '58%' }} />
          <i style={{ height: '36%' }} />
          <i style={{ height: '72%' }} />
          <i style={{ height: '54%' }} />
          <i className="is-accent" style={{ height: '88%' }} />
          <i style={{ height: '64%' }} />
        </div>
        <p className="nf-mod-caption">Sales · Purchases · Collections · Warehouse in one operating view</p>
      </div>
      <aside className="nf-live-panel">
        <div className="nf-live-card">
          <div className="nf-live-card-head">
            <p>Priority queue</p>
            <span className="nf-live-pill is-trip">3 items</span>
          </div>
          <div className="nf-mod-list is-stack">
            <div>
              <span>Unpaid over 14 days</span>
              <strong>8</strong>
            </div>
            <div>
              <span>PO awaiting verify</span>
              <strong>5</strong>
            </div>
            <div>
              <span>Routes to dispatch</span>
              <strong>2</strong>
            </div>
          </div>
        </div>
        <div className="nf-live-stats">
          <div>
            <strong>214</strong>
            <span>Orders</span>
          </div>
          <div>
            <strong>39</strong>
            <span>Purchases</span>
          </div>
          <div>
            <strong>17</strong>
            <span>Vans</span>
          </div>
        </div>
      </aside>
    </Shell>
  )
}

function PricingVisual() {
  return (
    <Shell title="Customer Pricing" status="Rules active" statusHint="Margin protected">
      <div className="nf-mod-main">
        <div className="nf-mod-price-card">
          <div className="nf-mod-price-head">
            <div>
              <p>Customer · Green Valley Foods</p>
              <small>Last price recall · contract rates</small>
            </div>
            <span className="nf-mod-tag is-ok">Applied</span>
          </div>
          <div className="nf-mod-table">
            <div className="nf-mod-row is-head">
              <span>Product</span>
              <span>List</span>
              <span>Customer</span>
              <span>Margin</span>
            </div>
            <div className="nf-mod-row is-active">
              <span>Frozen Peas 1kg</span>
              <span>£4.80</span>
              <span>£4.35</span>
              <span>18%</span>
            </div>
            <div className="nf-mod-row">
              <span>Chicken Breast</span>
              <span>£12.50</span>
              <span>£11.90</span>
              <span>14%</span>
            </div>
            <div className="nf-mod-row">
              <span>Mixed Salad</span>
              <span>£3.20</span>
              <span>£3.05</span>
              <span>16%</span>
            </div>
          </div>
        </div>
      </div>
      <aside className="nf-live-panel">
        <div className="nf-live-card">
          <div className="nf-live-card-head">
            <p>Price rule</p>
            <span className="nf-live-pill is-ready">Contract</span>
          </div>
          <small>Customer-specific · last-sold recall · min margin floor</small>
          <div className="nf-live-eta">
            <span>Floor</span>
            <strong>12% min</strong>
          </div>
        </div>
        <div className="nf-live-stats">
          <div>
            <strong>86</strong>
            <span>Rules</span>
          </div>
          <div>
            <strong>0</strong>
            <span>Breaches</span>
          </div>
          <div>
            <strong>OK</strong>
            <span>Guard</span>
          </div>
        </div>
      </aside>
    </Shell>
  )
}

function PosVisual() {
  const categories = [
    { label: 'Hot Food', tone: 'is-orange' },
    { label: 'Beverages', tone: 'is-red' },
    { label: 'Dessert', tone: 'is-blue' },
    { label: 'Grocery', tone: 'is-teal' },
    { label: 'Frozen', tone: 'is-navy' },
    { label: 'Dairy', tone: 'is-amber' },
  ] as const

  return (
    <Shell title="Point of Sale" status="Till ready" statusHint="Touch workflow">
      <div className="nf-mod-main nf-mod-pos-stage">
        <div className="nf-mod-pos-layout">
          <div className="nf-mod-pos-ticket">
            <div className="nf-mod-price-head">
              <div>
                <p>Sale · Walk-in</p>
                <small>Barcode · categories · print invoice</small>
              </div>
              <span className="nf-mod-tag is-ok">Open</span>
            </div>
            <div className="nf-mod-table is-cols-3">
              <div className="nf-mod-row is-head">
                <span>Item</span>
                <span>Qty</span>
                <span>Price</span>
              </div>
              <div className="nf-mod-row is-active">
                <span>Green Box Fresh</span>
                <span>2</span>
                <span>£6.40</span>
              </div>
              <div className="nf-mod-row">
                <span>Khalid Pure White Eggs</span>
                <span>1</span>
                <span>£3.20</span>
              </div>
              <div className="nf-mod-row">
                <span>Frozen Peas 1kg</span>
                <span>4</span>
                <span>£19.20</span>
              </div>
            </div>
            <div className="nf-mod-pos-pay">
              {['Cash', 'Card', 'Credit', 'Hold'].map((label, i) => (
                <span key={label} className={`nf-mod-pos-key${i === 1 ? ' is-on' : ''}`}>
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="nf-mod-pos-cats">
            {categories.map((item, i) => (
              <span key={item.label} className={`nf-mod-pos-cat ${item.tone}${i === 0 ? ' is-on' : ''}`}>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <aside className="nf-live-panel">
        <div className="nf-live-card">
          <div className="nf-live-card-head">
            <p>Basket total</p>
            <span className="nf-live-pill is-ready">Ready</span>
          </div>
          <div className="nf-mod-total">
            <span>Net</span>
            <strong>£28.80</strong>
          </div>
          <div className="nf-mod-total is-grand">
            <span>To pay</span>
            <strong>£28.80</strong>
          </div>
        </div>
        <div className="nf-live-card">
          <div className="nf-live-card-head">
            <p>Hardware</p>
            <span className="nf-live-pill is-trip">Linked</span>
          </div>
          <small>Scanner · receipt printer · touch till</small>
          <div className="nf-live-eta">
            <span>Print</span>
            <strong>Invoice ready</strong>
          </div>
        </div>
        <div className="nf-live-stats">
          <div>
            <strong>3</strong>
            <span>Lines</span>
          </div>
          <div>
            <strong>Fast</strong>
            <span>Serve</span>
          </div>
          <div>
            <strong>OK</strong>
            <span>Stock</span>
          </div>
        </div>
      </aside>
    </Shell>
  )
}

function SalesVisual() {
  return (
    <Shell title="Sales Invoicing" status="Draft ready" statusHint="Staff control">
      <div className="nf-mod-main nf-mod-sales">
        <div className="nf-mod-invoice is-pro">
          <div className="nf-mod-invoice-banner">
            <div>
              <p className="nf-mod-invoice-brand">Cloud Billing Manager</p>
              <small>Tax invoice · UK food distribution</small>
            </div>
            <div className="nf-mod-invoice-meta">
              <span className="nf-mod-tag is-review">Draft</span>
              <strong>INV-10482</strong>
              <span>Issued 19 Oct 2026 · Due 26 Oct 2026</span>
            </div>
          </div>

          <div className="nf-mod-invoice-parties is-cards">
            <div>
              <span>Bill to</span>
              <strong>Green Valley Foods</strong>
              <small>London · Account GV-204</small>
            </div>
            <div>
              <span>Deliver to</span>
              <strong>Warehouse B</strong>
              <small>Tomorrow · morning slot</small>
            </div>
            <div>
              <span>Dispatch</span>
              <strong>Van VN-14</strong>
              <small>Driver D-08 · Route R-214</small>
            </div>
          </div>

          <div className="nf-mod-table is-invoice">
            <div className="nf-mod-row is-head">
              <span>Code</span>
              <span>Product</span>
              <span>Qty</span>
              <span>Net</span>
            </div>
            <div className="nf-mod-row is-active">
              <span>FP-100</span>
              <span>Frozen Peas 1kg</span>
              <span>10</span>
              <span>£48.00</span>
            </div>
            <div className="nf-mod-row">
              <span>CB-220</span>
              <span>Chicken Breast</span>
              <span>6</span>
              <span>£72.00</span>
            </div>
            <div className="nf-mod-row">
              <span>MS-014</span>
              <span>Mixed Salad</span>
              <span>4</span>
              <span>£12.80</span>
            </div>
          </div>

          <div className="nf-mod-invoice-bottom">
            <div className="nf-mod-invoice-actions">
              <span>Edit draft</span>
              <span className="is-primary">Post invoice</span>
            </div>
            <div className="nf-mod-invoice-foot">
              <div className="nf-mod-total">
                <span>Net</span>
                <strong>£132.80</strong>
              </div>
              <div className="nf-mod-total">
                <span>VAT (20%)</span>
                <strong>£26.56</strong>
              </div>
              <div className="nf-mod-total is-grand">
                <span>Gross</span>
                <strong>£159.36</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <aside className="nf-live-panel">
        <div className="nf-live-card">
          <div className="nf-live-card-head">
            <p>Invoice workflow</p>
            <span className="nf-live-pill is-trip">In review</span>
          </div>
          <ol className="nf-mod-steps">
            <li className="is-done">
              <i>1</i>
              <div>
                <strong>Draft built</strong>
                <span>Lines matched · prices applied</span>
              </div>
            </li>
            <li className="is-current">
              <i>2</i>
              <div>
                <strong>Staff edit</strong>
                <span>Adjust qty · notes · delivery</span>
              </div>
            </li>
            <li>
              <i>3</i>
              <div>
                <strong>Post invoice</strong>
                <span>Stock · loading slip · route</span>
              </div>
            </li>
          </ol>
        </div>
        <div className="nf-live-stats">
          <div>
            <strong>3</strong>
            <span>Lines</span>
          </div>
          <div>
            <strong>VAT</strong>
            <span>On</span>
          </div>
          <div>
            <strong>Post</strong>
            <span>Ready</span>
          </div>
        </div>
      </aside>
    </Shell>
  )
}

function BillingVisual() {
  return (
    <Shell title="Billing & Collections" status="Payments in" statusHint="Cash · Card · Bank">
      <div className="nf-mod-main">
        <div className="nf-mod-kpis">
          <div>
            <span>Collected today</span>
            <strong>£6.8k</strong>
            <em className="is-up">Live</em>
          </div>
          <div>
            <span>Outstanding</span>
            <strong>£22.1k</strong>
            <em className="is-warn">Due</em>
          </div>
          <div>
            <span>Overdue</span>
            <strong>£4.3k</strong>
            <em className="is-warn">Chase</em>
          </div>
          <div>
            <span>Receipts</span>
            <strong>41</strong>
            <em>Today</em>
          </div>
        </div>
        <div className="nf-mod-table">
          <div className="nf-mod-row is-head">
            <span>Customer</span>
            <span>Method</span>
            <span>Amount</span>
            <span>Status</span>
          </div>
          <div className="nf-mod-row is-active">
            <span>Green Valley</span>
            <span>Bank</span>
            <span>£1,240</span>
            <span className="nf-mod-tag is-ok">Posted</span>
          </div>
          <div className="nf-mod-row">
            <span>City Catering</span>
            <span>Card</span>
            <span>£380</span>
            <span className="nf-mod-tag is-ok">Posted</span>
          </div>
          <div className="nf-mod-row">
            <span>Oak Stores</span>
            <span>Cash</span>
            <span>£95</span>
            <span className="nf-mod-tag is-review">Pending</span>
          </div>
        </div>
      </div>
      <aside className="nf-live-panel">
        <div className="nf-live-card">
          <div className="nf-live-card-head">
            <p>Collection mix</p>
            <span className="nf-live-pill is-ready">Today</span>
          </div>
          <div className="nf-fleet-bar">
            <i style={{ width: '62%' }} />
          </div>
          <div className="nf-live-card-foot">
            <small>Bank + card share</small>
            <strong>62%</strong>
          </div>
        </div>
        <div className="nf-live-stats">
          <div>
            <strong>Bank</strong>
            <span>Primary</span>
          </div>
          <div>
            <strong>Card</strong>
            <span>Fast</span>
          </div>
          <div>
            <strong>Cash</strong>
            <span>Till</span>
          </div>
        </div>
      </aside>
    </Shell>
  )
}

function PurchasingVisual() {
  return (
    <Shell title="Purchasing & Suppliers" status="PO flow" statusHint="Verify · Receive">
      <div className="nf-mod-main">
        <div className="nf-mod-table">
          <div className="nf-mod-row is-head">
            <span>PO</span>
            <span>Supplier</span>
            <span>Lines</span>
            <span>Status</span>
          </div>
          <div className="nf-mod-row is-active">
            <span>PO-8821</span>
            <span>Northcold Ltd</span>
            <span>14</span>
            <span className="nf-mod-tag is-review">Verify</span>
          </div>
          <div className="nf-mod-row">
            <span>PO-8819</span>
            <span>FreshSpan</span>
            <span>9</span>
            <span className="nf-mod-tag is-ok">Received</span>
          </div>
          <div className="nf-mod-row">
            <span>PO-8814</span>
            <span>Metro Oils</span>
            <span>5</span>
            <span className="nf-mod-tag is-warn">Partial</span>
          </div>
        </div>
      </div>
      <aside className="nf-live-panel">
        <div className="nf-live-card">
          <div className="nf-live-card-head">
            <p>Goods in</p>
            <span className="nf-live-pill is-trip">Today</span>
          </div>
          <small>Match PO → receive → stock update</small>
          <div className="nf-live-eta">
            <span>Pending verify</span>
            <strong>5 POs</strong>
          </div>
        </div>
        <div className="nf-live-stats">
          <div>
            <strong>39</strong>
            <span>Open</span>
          </div>
          <div>
            <strong>12</strong>
            <span>Due</span>
          </div>
          <div>
            <strong>OK</strong>
            <span>Match</span>
          </div>
        </div>
      </aside>
    </Shell>
  )
}

const visuals: Record<string, () => ReactNode> = {
  dashboard: DashboardVisual,
  inventory: InventoryVisual,
  'pricing-engine': PricingVisual,
  pos: PosVisual,
  sales: SalesVisual,
  billing: BillingVisual,
  purchasing: PurchasingVisual,
}

export default function ModuleWorkVisual({ slug }: { slug: string }) {
  const Visual = visuals[slug]
  if (!Visual) return null
  return <Visual />
}

export function hasModuleWorkVisual(slug: string) {
  return Boolean(visuals[slug])
}
