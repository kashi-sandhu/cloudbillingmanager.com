export type ResourceItem = {
  slug: string
  title: string
  excerpt: string
  type: 'checklist' | 'guide' | 'hub'
  path: string
  audience: string
  linkPotential: 'High' | 'Medium'
  relatedProduct: { to: string; label: string }
}

export type ChecklistGroup = {
  title: string
  intro: string
  items: string[]
}

export const resourceHubItems: ResourceItem[] = [
  {
    slug: 'inventory-management-guide',
    title: 'Inventory Management Guide for Food Distributors',
    excerpt:
      'A topic hub connecting inventory definitions, stock control, purchasing, sales, POS and Cloud Billing Manager product pages.',
    type: 'hub',
    path: '/resources/inventory-management-guide',
    audience: 'Operations managers, distributors, consultants',
    linkPotential: 'High',
    relatedProduct: { to: '/platform/inventory', label: 'Inventory management software' },
  },
  {
    slug: 'inventory-management-checklist',
    title: 'Inventory Management Checklist for Food Distributors',
    excerpt:
      'A practical operational checklist covering product masters, warehouses, purchasing, sales, POS, returns, adjustments and reporting.',
    type: 'checklist',
    path: '/resources/inventory-management-checklist',
    audience: 'Distributors, wholesalers, cash & carry operators, operations managers',
    linkPotential: 'High',
    relatedProduct: { to: '/platform/inventory', label: 'Inventory management software' },
  },
  {
    slug: 'inventory-software-vs-spreadsheets',
    title: 'Inventory Management Software vs Spreadsheets',
    excerpt:
      'A comparison of spreadsheets and inventory software for multi-user stock control, warehouses, POS and reporting.',
    type: 'guide',
    path: '/resources/inventory-software-vs-spreadsheets',
    audience: 'Growing distributors evaluating stock systems',
    linkPotential: 'High',
    relatedProduct: { to: '/platform/inventory', label: 'Inventory management software' },
  },
  {
    slug: 'glossary',
    title: 'Inventory, billing and POS glossary',
    excerpt:
      'Definitions for SKU, inventory, purchase orders, invoices, credit notes, POS, warehouse transfers and invoice aging.',
    type: 'guide',
    path: '/resources/glossary',
    audience: 'New users, staff training, publishers citing terms',
    linkPotential: 'Medium',
    relatedProduct: { to: '/platform', label: 'Cloud platform modules' },
  },
]

export const inventoryChecklistGroups: ChecklistGroup[] = [
  {
    title: '1. Product master readiness',
    intro: 'Clean product data is the foundation of accurate stock. Incomplete masters create false shortages and valuation errors.',
    items: [
      'Every active SKU has a unique product code or barcode where used',
      'Product names follow a consistent naming convention',
      'Categories are assigned and reviewed for reporting usefulness',
      'Units of measure are standardised (case, kg, unit, pack)',
      'Inactive or discontinued products are clearly marked, not deleted without history',
      'Labels and barcode printing are available for warehouse and counter use',
    ],
  },
  {
    title: '2. Warehouse and location control',
    intro: 'Total quantity alone is not enough when stock sits across warehouses, holding areas or transfer movements.',
    items: [
      'Each warehouse location used in fulfilment is defined in the system',
      'Stock can be allocated by warehouse, not only as a company total',
      'Warehouse-to-warehouse transfer process is documented and used',
      'Reserved stock for open orders is visible separately from available stock',
      'Incoming stock from open purchase orders is visible to buyers',
      'Pickers know which location should fulfil each order',
    ],
  },
  {
    title: '3. Purchasing and goods receipt',
    intro: 'Inventory accuracy depends on how purchases enter stock after verification.',
    items: [
      'Purchase orders are created with supplier-specific pricing where available',
      'Received quantities are checked against the purchase order before confirmation',
      'Pricing, discounts and VAT are verified before the order is closed',
      'Stock updates only after goods are received and verified',
      'Batch or lot details and expiry dates are recorded when required for food lines',
      'Inventory cost updates from latest purchase costs are reviewed',
      'Partial receipts are handled without losing the outstanding PO balance',
    ],
  },
  {
    title: '4. Sales, invoicing and fulfilment',
    intro: 'Sales should reduce available stock and leave a clear trail for warehouse and finance teams.',
    items: [
      'Sales invoices and quotations use the same product master as inventory',
      'Customer-specific pricing is applied without manual guesswork',
      'Draft and posted invoice workflow is understood by sales and finance',
      'Loading slips can be generated for warehouse picking',
      'Vehicle and driver assignment is recorded when deliveries are managed in-system',
      'Recurring orders are converted from history rather than retyped from scratch',
      'Overselling risk is reduced by checking available stock before posting',
    ],
  },
  {
    title: '5. POS and counter sales',
    intro: 'Counter sales change stock immediately. Disconnected POS creates warehouse blind spots.',
    items: [
      'POS can find products by barcode, code or name',
      'Walk-in, cash, DayPass and credit customer flows are defined',
      'POS prices respect customer-specific pricing where required',
      'Payments (cash, card, bank transfer, split) are recorded at the counter',
      'POS sales update inventory automatically',
      'Daily cash closing process is documented',
      'Sales history from POS is available for later review',
    ],
  },
  {
    title: '6. Returns, adjustments and counts',
    intro: 'Exceptions must update both inventory and accounts, or stock and balances drift apart.',
    items: [
      'Customer returns update inventory and customer accounts together',
      'Supplier returns or credit notes adjust stock and payables correctly',
      'Stock adjustments require a reason and an accountable user',
      'Physical reconciliation is scheduled for high-velocity or high-value products',
      'Repeated variance items are investigated, not only corrected',
      'Stock movement history is available when numbers do not match expectations',
    ],
  },
  {
    title: '7. Low-stock monitoring and replenishment',
    intro: 'Replenishment should start before fulfilment is disrupted.',
    items: [
      'Low-stock and out-of-stock lists are reviewed on a fixed cadence',
      'Fast-moving lines have clearer replenishment ownership',
      'Buyers can see current stock, reserved stock and incoming stock together',
      'Promotional or seasonal items have temporary monitoring rules',
      'Purchase planning uses recent sales and purchase history, not only gut feel',
    ],
  },
  {
    title: '8. Reporting and management visibility',
    intro: 'Reports should answer operational questions without rebuilding spreadsheets each week.',
    items: [
      'Stock valuation can be reviewed by management',
      'Warehouse inventory reports are available by location',
      'Stock transfer and adjustment reports can be audited',
      'Product and stock history reports support investigations',
      'Dashboard views cover inventory value, low-stock alerts and movement signals',
      'Sales, purchase and inventory reports can be compared in the same platform',
    ],
  },
  {
    title: '9. Access, process ownership and continuity',
    intro: 'Even good software fails when ownership is unclear.',
    items: [
      'Someone owns product master quality',
      'Someone owns goods receipt verification',
      'Someone owns low-stock review',
      'Role-based access limits who can adjust stock or post invoices',
      'Teams can access the system securely from the devices they use day to day',
      'Backup and cloud access reduce dependence on a single local machine',
    ],
  },
]

export const inventoryWorkflowSteps = [
  { step: 'Purchase', detail: 'Create and verify purchase orders with supplier pricing.' },
  { step: 'Receive', detail: 'Check quantities, costs and batch details before stock updates.' },
  { step: 'Store', detail: 'Allocate stock by warehouse and track transfers between locations.' },
  { step: 'Sell', detail: 'Reduce availability through sales invoices or POS transactions.' },
  { step: 'Fulfil', detail: 'Use loading slips, vehicle assignment and delivery records where needed.' },
  { step: 'Adjust', detail: 'Process returns, counts and adjustments with a clear audit trail.' },
  { step: 'Report', detail: 'Review valuation, low stock, movements and warehouse balances.' },
]

export const checklistCitation = {
  title: 'Inventory Management Checklist for Food Distributors',
  publisher: 'Cloud Billing Manager',
  urlPath: '/resources/inventory-management-checklist',
  year: '2026',
}
