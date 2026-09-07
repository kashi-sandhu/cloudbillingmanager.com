import { useEffect, useState, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  ClipboardList,
  FileText,
  LayoutDashboard,
  MonitorSmartphone,
  Package,
  Percent,
  Receipt,
  ShoppingCart,
  Warehouse,
} from 'lucide-react'

type ViewId =
  | 'dashboard'
  | 'invoice'
  | 'sales'
  | 'pricing'
  | 'pos'
  | 'inventory'
  | 'purchasing'
  | 'billing'
  | 'accounting'

const nav: { id: ViewId; icon: LucideIcon; label: string }[] = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'purchasing', icon: ClipboardList, label: 'Purchasing' },
  { id: 'pricing', icon: Percent, label: 'Pricing' },
  { id: 'sales', icon: ShoppingCart, label: 'Sales' },
  { id: 'inventory', icon: Warehouse, label: 'Inventory' },
  { id: 'accounting', icon: BookOpen, label: 'Accounts' },
  { id: 'invoice', icon: FileText, label: 'Invoice' },
  { id: 'billing', icon: Receipt, label: 'Billing' },
  { id: 'pos', icon: MonitorSmartphone, label: 'POS' },
]

const dueDays = [
  { day: 'Mon', count: 4 },
  { day: 'Tue', count: 7 },
  { day: 'Wed', count: 2 },
  { day: 'Thu', count: 9 },
  { day: 'Fri', count: 5 },
  { day: 'Sat', count: 1 },
  { day: 'Sun', count: 0 },
]

const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const baseBars = [38, 52, 44, 78, 64, 86, 71]

type Kpi = { label: string; value: string; note: string; accent?: boolean }
type Tile = { icon: LucideIcon; title: string; text: string; accent?: boolean }
type Row = { left: string; mid: string; right: string; status: string; statusLabel?: string }

type Screen = {
  kicker: string
  title: string
  kpis: Kpi[]
  chart: string
  badge: string
  tiles: Tile[]
  panelTitle: string
  panelNote: ReactNode
  rows: Row[]
}

function formatPounds(value: number) {
  return `£${value.toLocaleString('en-GB')}`
}

export default function DashboardPreview() {
  const [view, setView] = useState<ViewId>('dashboard')
  const [sales, setSales] = useState(18420)
  const [monthly, setMonthly] = useState(246890)
  const [outstanding, setOutstanding] = useState(41275)
  const [stock, setStock] = useState(312640)
  const [qtyHand, setQtyHand] = useState(18420)
  const [bars, setBars] = useState(baseBars)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setView((current) => {
        const order = nav.map((item) => item.id)
        return order[(order.indexOf(current) + 1) % order.length]
      })
    }, 6500)
    return () => window.clearInterval(timer)
  }, [view])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSales((value) => value + Math.round(Math.random() * 40 - 8))
      setMonthly((value) => value + Math.round(Math.random() * 90 - 10))
      setOutstanding((value) => Math.max(20000, value + Math.round(Math.random() * 30 - 18)))
      setStock((value) => value + Math.round(Math.random() * 25 - 12))
      setQtyHand((value) => Math.max(15000, value + Math.round(Math.random() * 20 - 8)))
      setBars((current) =>
        current.map((bar) => Math.min(94, Math.max(30, bar + Math.round(Math.random() * 8 - 4)))),
      )
    }, 2200)
    return () => window.clearInterval(timer)
  }, [])

  const screens: Record<Exclude<ViewId, 'invoice'>, Screen> = {
    dashboard: {
      kicker: 'One Dashboard. Complete Business Visibility.',
      title: 'Powerful Dashboard Features',
      kpis: [
        { label: "Today's Sales", value: formatPounds(sales), note: 'Sales Overview' },
        { label: 'Monthly Sales', value: formatPounds(monthly), note: 'Total Sales Invoices' },
        { label: 'Outstanding Customer Payments', value: formatPounds(outstanding), note: 'Payment Collection Overview', accent: true },
        { label: 'Current Stock Value', value: formatPounds(stock), note: 'Inventory & Warehouse Overview' },
      ],
      chart: 'Orders Sales Growth Trends',
      badge: 'Sales Overview',
      tiles: [
        { icon: ShoppingCart, title: 'Sales Overview', text: "Today's Sales" },
        { icon: ClipboardList, title: 'Purchase Overview', text: 'Purchase Orders' },
        { icon: Receipt, title: 'Payment Collection Overview', text: 'Cash Collections', accent: true },
        { icon: Warehouse, title: 'Inventory & Warehouse Overview', text: 'Low Stock Alerts', accent: true },
      ],
      panelTitle: 'Recent Sales Invoices',
      panelNote: (
        <div className="flex gap-1">
          {dueDays.map((item) => (
            <span
              key={item.day}
              className={`w-6 rounded text-center text-[8px] font-bold ${
                item.count >= 7 ? 'bg-accent-soft text-accent' : 'text-slate-400'
              }`}
            >
              {item.day[0]}
              {item.count}
            </span>
          ))}
        </div>
      ),
      rows: [
        { left: 'INV-1842', mid: 'Northern Frozen Foods Ltd', right: '£2,480.00', status: 'Due' },
        { left: 'INV-1841', mid: 'City Meats Wholesale', right: '£1,965.40', status: 'Paid' },
        { left: 'INV-1840', mid: 'Green Grocer Cash & Carry', right: '£3,120.00', status: 'Due' },
        { left: 'INV-1839', mid: 'Harbour Beverage Supply', right: '£890.25', status: 'Paid' },
      ],
    },
    sales: {
      kicker: 'Sales Management',
      title: 'complete visibility into every customer transaction',
      kpis: [
        { label: 'Quick Sales Invoice Creation', value: '48', note: 'professional sales invoices' },
        { label: 'Cash Sales Invoices', value: '19', note: 'walk-in or cash customers' },
        { label: 'Auto Invoice Generation', value: '12', note: 'daily, weekly, monthly' },
        { label: 'Quotations & Price Offers', value: '7', note: 'convert into sales invoices', accent: true },
      ],
      chart: 'Sales Order Management',
      badge: 'Sales Management',
      tiles: [
        { icon: FileText, title: 'One-Click Invoice Duplication', text: 'customers with recurring orders' },
        { icon: Percent, title: 'Profit Margin Analysis', text: 'estimated profit and margin', accent: true },
        { icon: Package, title: 'Load & Weight', text: 'product quantities, and loading information' },
        { icon: ClipboardList, title: 'Draft & Unposted Invoice Workflow', text: 'review, edit, and approve invoices', accent: true },
      ],
      panelTitle: 'Invoice Printing & PDF Generation',
      panelNote: 'Multiple Invoice Templates',
      rows: [
        { left: 'INV-1842', mid: 'Assign Vehicle & Driver', right: 'Posted', status: 'Paid' },
        { left: 'INV-1841', mid: 'Cash Sales Invoices', right: 'Paid', status: 'Paid' },
        { left: 'QUO-2208', mid: 'Quotations & Price Offers', right: 'Draft', status: 'Due' },
        { left: 'INV-1839', mid: 'Generate Loading Slips', right: 'Unposted', status: 'Due' },
      ],
    },
    pricing: {
      kicker: 'unique selling point (USP)',
      title: 'Intelligent Customer Pricing Engine',
      kpis: [
        { label: 'Automatic Customer-Specific Pricing', value: '1,284', note: 'pricing history' },
        { label: 'Smart Price Learning', value: '862', note: 'personalized pricing profiles' },
        { label: 'Order History Price Recall', value: '100%', note: 'last selling price' },
        { label: 'Margin Protection', value: '18.4%', note: 'estimated profit', accent: true },
      ],
      chart: 'Complete Pricing History',
      badge: 'Intelligent Customer Pricing Engine',
      tiles: [
        { icon: Percent, title: 'Automatic Customer-Specific Pricing', text: 'previous orders, pricing history', accent: true },
        { icon: FileText, title: 'Smart Price Learning', text: 'personalized pricing profiles for each customer' },
        { icon: Receipt, title: 'Customer-Wise Product Pricing', text: 'contract pricing, negotiated rates' },
        { icon: ShoppingCart, title: 'Intelligent Price Suggestions', text: 'reducing pricing errors', accent: true },
      ],
      panelTitle: 'Complete Pricing History',
      panelNote: 'Customer-Wise Product Pricing',
      rows: [
        { left: 'PRC-184', mid: 'contract pricing', right: '£18.40', status: 'Paid', statusLabel: 'contract pricing' },
        { left: 'PRC-183', mid: 'negotiated rates', right: '£24.90', status: 'Paid', statusLabel: 'negotiated rates' },
        { left: 'PRC-182', mid: 'promotional pricing', right: '£31.00', status: 'Due', statusLabel: 'promotional pricing' },
        { left: 'PRC-181', mid: 'special discounts', right: '£16.25', status: 'Paid', statusLabel: 'special discounts' },
      ],
    },
    pos: {
      kicker: 'Point of Sale (POS)',
      title: 'Fast, Smart & Touch-Friendly Retail Billing',
      kpis: [
        { label: 'Walk-In (Cash) Customer Billing', value: '28', note: 'Fast Billing' },
        { label: 'DayPass Customer Sales', value: '12', note: 'Fast Billing' },
        { label: 'Credit Customer Billing', value: '9', note: 'Fast Billing' },
        { label: 'Daily Cash Closing', value: formatPounds(sales), note: 'POS Sales Reports', accent: true },
      ],
      chart: 'POS Sales Reports',
      badge: 'Payment Processing',
      tiles: [
        { icon: MonitorSmartphone, title: 'Touch-Friendly POS Interface', text: 'Category-Based Product Display' },
        { icon: Package, title: 'Barcode Scanner Support', text: 'Product Search by Name, Code & Barcode' },
        { icon: Receipt, title: 'Cash Payments', text: 'Card Payments, Bank Transfer Payments', accent: true },
        { icon: FileText, title: 'Instant Payment Receipts', text: 'Split & Partial Payments', accent: true },
      ],
      panelTitle: 'Sales History',
      panelNote: 'Daily Cash Closing',
      rows: [
        { left: 'POS-441', mid: 'Walk-In (Cash) Customer Billing', right: '£64.80', status: 'Paid' },
        { left: 'POS-440', mid: 'DayPass Customer Sales', right: '£112.00', status: 'Paid' },
        { left: 'POS-439', mid: 'Credit Customer Billing', right: '£248.50', status: 'Due' },
        { left: 'POS-438', mid: 'Customer Advance Adjustments', right: '£40.00', status: 'Paid' },
      ],
    },
    inventory: {
      kicker: 'Stock & Inventory Management',
      title: 'comprehensive inventory management solution',
      kpis: [
        { label: 'Product Master Management', value: String(qtyHand), note: 'Item Management' },
        { label: 'Real-Time Stock Availability', value: '246', note: 'Inventory Control' },
        { label: 'Multi-Warehouse Support', value: '4', note: 'Warehouse Management' },
        { label: 'Automatic Stock Updates', value: 'Live', note: 'Inventory Control', accent: true },
      ],
      chart: 'Stock Movement History',
      badge: 'Stock History & Traceability',
      tiles: [
        { icon: Package, title: 'Product Categories', text: 'Measurement Units' },
        { icon: Warehouse, title: 'Warehouse Allocation', text: 'Warehouse-to-Warehouse Stock Transfers' },
        { icon: ClipboardList, title: 'Stock Adjustments & Physical Reconciliation', text: 'Customer & Supplier Stock Returns' },
        { icon: FileText, title: 'Product Labels & Barcode Printing', text: 'Complete Product Activity History', accent: true },
      ],
      panelTitle: 'Warehouse Inventory Reports',
      panelNote: 'Stock History Reports',
      rows: [
        { left: 'WH-A', mid: 'Product History', right: '18', status: 'Due', statusLabel: 'Stock Adjustment Reports' },
        { left: 'WH-B', mid: 'Stock Transfer Reports', right: '64', status: 'Paid', statusLabel: 'Warehouse Inventory Reports' },
        { left: 'WH-C', mid: 'Product History Reports', right: '246', status: 'Paid', statusLabel: 'Stock History Reports' },
        { left: 'WH-D', mid: 'Complete Product Activity History', right: '91', status: 'Paid', statusLabel: 'Product History' },
      ],
    },
    purchasing: {
      kicker: 'Purchase Order Management',
      title: 'complete control over the entire procurement lifecycle',
      kpis: [
        { label: 'Quick Purchase Order Creation', value: '22', note: 'supplier-specific product pricing' },
        { label: 'Purchase Payment Tracking', value: '14', note: 'Paid, Partially Paid, or Due' },
        { label: 'Recurring Purchase Orders', value: '6', note: 'frequently ordered products' },
        { label: 'Inventory Cost Update', value: 'Live', note: 'latest purchase costs', accent: true },
      ],
      chart: 'Purchase Order Summary',
      badge: 'Purchase Order Management',
      tiles: [
        { icon: ClipboardList, title: 'Purchase Order Verification', text: 'quantities, pricing, discounts, VAT' },
        { icon: FileText, title: 'Email Purchase Orders', text: 'PDF format', accent: true },
        { icon: Package, title: 'Automatic Inventory Update', text: 'once goods are received and verified' },
        { icon: Warehouse, title: 'Stock Verification', text: 'Batch & Lot Tracking', accent: true },
      ],
      panelTitle: 'Purchase Order Summary',
      panelNote: 'Purchase Payment Tracking',
      rows: [
        { left: 'PO-1182', mid: 'Paid', right: '£4,280.00', status: 'Paid' },
        { left: 'PO-1181', mid: 'Partially Paid', right: '£1,650.00', status: 'Due', statusLabel: 'Partially Paid' },
        { left: 'PO-1180', mid: 'Due', right: '£3,940.00', status: 'Due' },
        { left: 'PO-1179', mid: 'Purchase Order Verification', right: '£890.00', status: 'Paid' },
      ],
    },
    billing: {
      kicker: 'Customer Billing & Financial Management',
      title: 'Customer Billing & Financial Management',
      kpis: [
        { label: 'Outstanding Balance Monitoring', value: formatPounds(outstanding), note: 'overdue invoices' },
        { label: 'Credit Notes', value: '6', note: 'Sales Returns & Credit Management' },
        { label: 'Invoice Aging Analysis', value: '14', note: 'payment delays' },
        { label: 'Customer VAT', value: '20%', note: 'UK tax rules', accent: true },
      ],
      chart: 'Invoice Aging Analysis',
      badge: 'Payment Management',
      tiles: [
        { icon: FileText, title: 'Credit Notes', text: 'full or partial credit notes', accent: true },
        { icon: Receipt, title: 'Multiple Payment Methods', text: 'Cash, Card, Bank Transfer, Cheque' },
        { icon: ClipboardList, title: 'Payment Allocation', text: 'Settle multiple invoices in one transaction' },
        { icon: BookOpen, title: 'Credit Limit Management', text: 'Customer Account Statements', accent: true },
      ],
      panelTitle: 'Customer Invoice History',
      panelNote: 'Customer Payment History',
      rows: [
        { left: 'INV-1842', mid: 'Outstanding Balance Monitoring', right: '£2,480.00', status: 'Due' },
        { left: 'CRN-204', mid: 'Credit Notes', right: '£120.00', status: 'Paid' },
        { left: 'INV-1840', mid: 'Invoice Aging Analysis', right: '£3,120.00', status: 'Due' },
        { left: 'PMT-881', mid: 'Payment Allocation', right: '£890.25', status: 'Paid' },
      ],
    },
    accounting: {
      kicker: 'Accounting & Financial Management',
      title: 'Complete Financial Control with Integrated Accounting',
      kpis: [
        { label: 'Balance Sheet', value: formatPounds(stock + monthly), note: 'Financial Accounting' },
        { label: 'Profit & Loss Statement', value: formatPounds(Math.round(sales * 0.58)), note: 'Financial Accounting' },
        { label: 'Customer Outstanding Balances', value: formatPounds(outstanding), note: 'Receivables Management' },
        { label: 'Supplier Outstanding Balances', value: formatPounds(Math.round(outstanding * 0.62)), note: 'Payables Management', accent: true },
      ],
      chart: 'Financial Dashboard',
      badge: 'Financial Reports',
      tiles: [
        { icon: BookOpen, title: 'Cash Flow Statement', text: 'Financial Accounting' },
        { icon: Receipt, title: 'Customer Ledger', text: 'Payment Receipts', accent: true },
        { icon: ClipboardList, title: 'VAT Reports', text: 'Cash & Bank Reports' },
        { icon: FileText, title: 'Income Recording', text: 'Expense Management', accent: true },
      ],
      panelTitle: 'Financial Transaction History',
      panelNote: 'General Ledger Reports',
      rows: [
        { left: 'GL-118', mid: 'Income Recording', right: formatPounds(sales), status: 'Paid' },
        { left: 'GL-074', mid: 'Expense Management', right: '£640.00', status: 'Due' },
        { left: 'VAT-20', mid: 'VAT Reports', right: '£412.00', status: 'Paid' },
        { left: 'PAY-331', mid: 'Bulk Supplier Payments', right: '£1,180.00', status: 'Due' },
      ],
    },
  }

  const screen = view === 'invoice' || view === 'pos' ? null : screens[view]

  return (
    <div className="dash-shell flex h-full min-h-0 flex-col overflow-hidden bg-white text-left">
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-slate-200 bg-[#f4f6f9] px-3">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <p className="ml-2 text-[11px] font-medium text-slate-500">Cloud Billing Manager</p>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700">
          <span className="live-dot" />
          Real-time
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[64px_1fr] md:grid-cols-[76px_1fr]">
        <aside className="flex h-full flex-col items-center justify-evenly bg-[#17345c] py-1">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={`flex w-[52px] flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 transition-all duration-500 ease-out ${
                view === item.id ? 'bg-white/15 text-white' : 'text-white/40 hover:bg-white/8 hover:text-white'
              }`}
            >
              <item.icon className="size-3.5" />
              <span className="text-center text-[7px] leading-tight font-medium">{item.label}</span>
            </button>
          ))}
        </aside>

        <div className="flex min-h-0 flex-col bg-[#eef2f7] p-3 md:p-4">
          {view === 'invoice' ? (
            <div key={view} className="dash-view flex min-h-0 flex-1 flex-col">
              <div className="mb-2 flex h-10 shrink-0 items-end justify-between gap-2">
                <div className="dash-title min-w-0">
                  <p className="truncate text-[9px] font-semibold tracking-[0.14em] text-brand uppercase">
                    Invoice Printing & PDF Generation
                  </p>
                  <p className="truncate text-sm font-semibold text-brand-ink">INV-2024-00156</p>
                </div>
                <div className="dash-invoice-actions shrink-0">
                  <span>PDF</span>
                  <span>Print</span>
                  <span className="is-accent">Posted</span>
                </div>
              </div>
              <div className="dash-invoice">
                <div className="dash-invoice-sheet">
                  <img
                    src="/images/products/cloudbillingmanager-sales-invoice.webp"
                    alt="Cloud Billing Manager sales invoice screen showing invoice header, line items and totals"
                    className="dash-invoice-img"
                    width={1122}
                    height={1402}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          ) : view === 'pos' ? (
            <div key={view} className="dash-view flex min-h-0 flex-1 flex-col">
              <div className="mb-2 flex h-10 shrink-0 items-end justify-between gap-2">
                <div className="dash-title min-w-0">
                  <p className="truncate text-[9px] font-semibold tracking-[0.14em] text-brand uppercase">
                    Point of Sale (POS)
                  </p>
                  <p className="truncate text-sm font-semibold text-brand-ink">
                    Fast, Smart & Touch-Friendly Retail Billing
                  </p>
                </div>
                <div className="dash-invoice-actions shrink-0">
                  <span>Scanner</span>
                  <span>Receipt</span>
                  <span className="is-accent">Live</span>
                </div>
              </div>
              <div className="dash-pos">
                <img
                  src="/images/products/cloudbillingmanager-pos-workstation.webp"
                  alt="Cloud Billing Manager POS workstation with laptop billing screen, barcode scanner and receipt printer"
                  className="dash-pos-img"
                  width={1462}
                  height={1076}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ) : screen ? (
            <>
              <div className="mb-3 h-10 shrink-0">
                <div key={view} className="dash-title">
                  <p className="truncate text-[9px] font-semibold tracking-[0.14em] text-brand uppercase">{screen.kicker}</p>
                  <p className="truncate text-sm font-semibold text-brand-ink">{screen.title}</p>
                </div>
              </div>
              <div key={view} className="dash-view flex min-h-0 flex-1 flex-col">
                <ModuleScreen screen={screen} bars={bars} />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function ModuleScreen({ screen, bars }: { screen: Screen; bars: number[] }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <KpiRow items={screen.kpis} />
      <div className="mt-3 grid min-h-[210px] flex-1 grid-cols-1 gap-2 lg:grid-cols-[1.15fr_0.85fr]">
        <ChartCard title={screen.chart} badge={screen.badge} bars={bars} />
        <div className="grid h-full grid-cols-2 grid-rows-2 gap-2">
          {screen.tiles.map((tile) => (
            <AlertTile key={tile.title} icon={tile.icon} title={tile.title} text={tile.text} accent={tile.accent} />
          ))}
        </div>
      </div>
      <Panel title={screen.panelTitle} note={screen.panelNote}>
        <RowList rows={screen.rows} />
      </Panel>
    </div>
  )
}

function KpiRow({ items }: { items: Kpi[] }) {
  return (
    <div className="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map((kpi) => (
        <div
          key={kpi.label}
          className={`dash-kpi h-[62px] rounded-lg border border-white bg-white px-2.5 py-2 shadow-[0_8px_18px_-16px_rgb(23,52,92,0.45)] ${
            kpi.accent ? 'border-l-[3px] border-l-accent' : 'border-l-[3px] border-l-brand'
          }`}
        >
          <p className="truncate text-[9px] font-medium text-slate-500">{kpi.label}</p>
          <p className="mt-0.5 text-[15px] font-bold tracking-tight text-brand-ink">{kpi.value}</p>
          <p className="truncate text-[9px] text-slate-400">{kpi.note}</p>
        </div>
      ))}
    </div>
  )
}

function ChartCard({ title, badge, bars }: { title: string; badge: string; bars: number[] }) {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-lg border border-white bg-white p-3 shadow-[0_8px_18px_-16px_rgb(23,52,92,0.45)]">
      <div className="mb-2 flex shrink-0 items-center justify-between">
        <p className="truncate pr-2 text-[11px] font-semibold text-brand-ink">{title}</p>
        <span className="shrink-0 rounded bg-accent-soft px-1.5 py-0.5 text-[9px] font-semibold text-accent">{badge}</span>
      </div>
      <div className="dash-chart flex min-h-0 flex-1 items-end gap-2 px-1">
        {bars.map((height, index) => (
          <div key={week[index]} className="flex h-full min-h-0 flex-1 flex-col justify-end gap-1.5">
            <div className="dash-bar w-full rounded-t-[4px]" style={{ height: `${height}%` }} />
            <span className="text-center text-[8px] font-medium text-slate-400">{week[index]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Panel({ title, note, children }: { title: string; note: ReactNode; children: ReactNode }) {
  return (
    <div className="mt-3 h-[148px] shrink-0 overflow-hidden rounded-lg border border-white bg-white p-3 shadow-[0_8px_18px_-16px_rgb(23,52,92,0.45)]">
      <div className="mb-2 flex h-5 items-center justify-between gap-2">
        <p className="truncate text-[11px] font-semibold text-brand-ink">{title}</p>
        <div className="shrink-0 text-[10px] font-medium text-slate-400">{note}</div>
      </div>
      {children}
    </div>
  )
}

function RowList({ rows }: { rows: Row[] }) {
  return (
    <div className="space-y-1">
      {rows.map((row) => (
        <div key={row.left + row.mid} className="flex items-center gap-2 rounded-md px-1.5 py-1.5 text-[10px]">
          <span className="w-[72px] shrink-0 truncate font-semibold text-brand">{row.left}</span>
          <span className="min-w-0 flex-1 truncate text-slate-600">{row.mid}</span>
          <span className="shrink-0 font-semibold text-brand-ink">{row.right}</span>
          <span
            className={
              row.status === 'Paid'
                ? 'max-w-[92px] truncate rounded bg-emerald-50 px-1.5 py-0.5 text-center text-[8px] font-semibold text-emerald-700'
                : 'max-w-[92px] truncate rounded bg-accent-soft px-1.5 py-0.5 text-center text-[8px] font-semibold text-accent'
            }
          >
            {row.statusLabel ?? row.status}
          </span>
        </div>
      ))}
    </div>
  )
}

function AlertTile({
  icon: Icon,
  title,
  text,
  accent = false,
}: {
  icon: LucideIcon
  title: string
  text: string
  accent?: boolean
}) {
  return (
    <div className="flex h-full min-h-[92px] flex-col rounded-lg border border-white bg-white p-2 shadow-[0_8px_18px_-16px_rgb(23,52,92,0.45)]">
      <span
        className={`mb-1 inline-flex size-6 shrink-0 items-center justify-center rounded-md ${
          accent ? 'bg-accent-soft text-accent' : 'bg-brand-soft text-brand'
        }`}
      >
        <Icon className="size-3.5" />
      </span>
      <p className="text-[10px] leading-tight font-semibold break-words text-brand-ink">{title}</p>
      <p className="mt-0.5 text-[8px] leading-snug text-slate-500">{text}</p>
    </div>
  )
}
