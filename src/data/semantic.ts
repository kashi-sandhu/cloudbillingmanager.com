import { company } from './content.ts'

/** Single source of truth — mirrors company.positioning for semantic pages. */
export const productPositioning = company.positioning

export type SemanticLink = { to: string; label: string }

export type GlossaryTerm = {
  term: string
  definition: string
  related?: SemanticLink[]
}

export const entityMap = [
  {
    entity: 'Cloud Billing Manager',
    relationship: 'Primary product brand',
    page: '/',
    optimization: 'Keep positioning consistent across titles, schema and hero copy',
  },
  {
    entity: 'AVANTCORE Technologies',
    relationship: 'Provider / publisher',
    page: '/contact',
    optimization: 'Already consistent in NAP and Organization schema',
  },
  {
    entity: 'Inventory Management',
    relationship: 'Core feature module',
    page: '/platform/inventory',
    optimization: 'Link to guide, checklist, glossary and blog cluster',
  },
  {
    entity: 'Billing',
    relationship: 'Core feature module',
    page: '/platform/billing',
    optimization: 'Connect to sales/invoicing and unpaid-invoice content',
  },
  {
    entity: 'Sales & Invoicing',
    relationship: 'Core feature module',
    page: '/platform/sales',
    optimization: 'Clarify invoicing lives here (no separate thin page)',
  },
  {
    entity: 'POS',
    relationship: 'Core feature module',
    page: '/platform/pos',
    optimization: 'Link POS ↔ inventory educational content',
  },
  {
    entity: 'Purchasing',
    relationship: 'Core feature module',
    page: '/platform/purchasing',
    optimization: 'Connect to inventory receipt workflow',
  },
  {
    entity: 'Customers / Suppliers',
    relationship: 'Supporting entities',
    page: '/platform/customers',
    optimization: 'Keep as onboarding/account modules, not CRM overclaim',
  },
  {
    entity: 'Reports & Dashboard',
    relationship: 'Visibility layer',
    page: '/platform/dashboard',
    optimization: 'Support inventory/sales/purchase reporting queries',
  },
] as const

export const topicClusters: Record<
  string,
  {
    primary: string
    concepts: string[]
    problems: string[]
    learningLinks: SemanticLink[]
  }
> = {
  inventory: {
    primary: 'Inventory management',
    concepts: [
      'stock control',
      'stock levels',
      'warehouse allocation',
      'stock adjustments',
      'product masters',
      'inventory reports',
      'low-stock monitoring',
    ],
    problems: ['overselling', 'spreadsheet drift', 'unclear warehouse balances', 'late replenishment'],
    learningLinks: [
      { to: '/resources/inventory-management-guide', label: 'Inventory management guide' },
      { to: '/resources/inventory-management-checklist', label: 'Inventory checklist' },
      { to: '/resources/inventory-software-vs-spreadsheets', label: 'Inventory software vs spreadsheets' },
      { to: '/blog/what-is-inventory-management', label: 'What is inventory management?' },
      { to: '/blog/how-to-manage-stock-effectively', label: 'How to manage stock effectively' },
    ],
  },
  billing: {
    primary: 'Billing software',
    concepts: ['customer payments', 'credit notes', 'invoice aging', 'account statements', 'VAT'],
    problems: ['unpaid invoices', 'partial payments', 'disconnected ledgers'],
    learningLinks: [
      { to: '/blog/what-is-billing-software', label: 'What is billing software?' },
      { to: '/blog/how-to-track-unpaid-invoices', label: 'How to track unpaid invoices' },
      { to: '/platform/sales', label: 'Sales and invoicing software' },
      { to: '/resources/glossary', label: 'Invoice and billing terms' },
    ],
  },
  sales: {
    primary: 'Sales management and invoicing',
    concepts: ['quotations', 'sales invoices', 'loading slips', 'customer pricing', 'order lifecycle'],
    problems: ['slow invoicing', 'pricing errors', 'warehouse handoff gaps'],
    learningLinks: [
      { to: '/platform/billing', label: 'Billing software' },
      { to: '/platform/pricing-engine', label: 'Customer pricing engine' },
      { to: '/blog/what-is-billing-software', label: 'Billing software guide' },
      { to: '/resources/glossary', label: 'Invoice glossary' },
    ],
  },
  purchasing: {
    primary: 'Purchase management',
    concepts: ['purchase orders', 'goods receipt', 'supplier pricing', 'stock updates', 'batch tracking'],
    problems: ['unverified receipts', 'cost drift', 'stock not updated after delivery'],
    learningLinks: [
      { to: '/platform/inventory', label: 'Inventory management software' },
      { to: '/resources/inventory-management-checklist', label: 'Purchasing checklist section' },
      { to: '/resources/glossary', label: 'Purchase order definition' },
    ],
  },
  pos: {
    primary: 'POS software',
    concepts: ['counter billing', 'barcode scanning', 'receipts', 'split payments', 'live stock updates'],
    problems: ['POS disconnected from warehouse', 'end-of-day reconciliation'],
    learningLinks: [
      { to: '/blog/what-is-pos-software', label: 'What is POS software?' },
      { to: '/blog/pos-and-inventory-management', label: 'POS and inventory management' },
      { to: '/platform/inventory', label: 'Inventory management software' },
      { to: '/resources/glossary', label: 'POS definition' },
    ],
  },
  dashboard: {
    primary: 'Business dashboard and inventory reports',
    concepts: ['sales overview', 'purchase overview', 'stock value', 'collections', 'operational alerts'],
    problems: ['delayed reporting', 'multiple spreadsheets for KPIs'],
    learningLinks: [
      { to: '/platform/inventory', label: 'Inventory reports context' },
      { to: '/platform/accounting', label: 'Financial reports' },
      { to: '/resources/inventory-management-guide', label: 'Inventory management guide' },
    ],
  },
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'SKU',
    definition:
      'A stock keeping unit is a distinct product identity used to track inventory, pricing and sales history. Clean SKU records reduce duplicate products and false stock shortages.',
    related: [{ to: '/platform/inventory', label: 'Inventory management' }],
  },
  {
    term: 'Inventory',
    definition:
      'Inventory is the products a business holds for sale or fulfilment, including available, reserved and incoming quantities across warehouses.',
    related: [
      { to: '/platform/inventory', label: 'Inventory management software' },
      { to: '/blog/what-is-inventory-management', label: 'What is inventory management?' },
    ],
  },
  {
    term: 'Stock adjustment',
    definition:
      'A stock adjustment corrects inventory quantities after physical counts, damage, write-offs or reconciliation differences. Adjustments should leave an audit trail.',
    related: [{ to: '/platform/inventory', label: 'Inventory control' }],
  },
  {
    term: 'Purchase order',
    definition:
      'A purchase order is a formal request to a supplier for products at agreed quantities and prices. Verified goods receipt should update inventory and costs.',
    related: [{ to: '/platform/purchasing', label: 'Purchase management software' }],
  },
  {
    term: 'Invoice',
    definition:
      'An invoice is a commercial document requesting payment for goods or services supplied. In distribution it often connects sales, stock, delivery and customer accounts.',
    related: [
      { to: '/platform/sales', label: 'Sales and invoicing' },
      { to: '/platform/billing', label: 'Billing software' },
    ],
  },
  {
    term: 'Credit note',
    definition:
      'A credit note reduces what a customer owes, often after returns or invoice corrections. It should update both billing balances and inventory where stock is returned.',
    related: [{ to: '/platform/billing', label: 'Customer billing' }],
  },
  {
    term: 'POS',
    definition:
      'Point of sale software records counter transactions quickly, accepts payments and should update inventory and sales history in the same business system.',
    related: [
      { to: '/platform/pos', label: 'POS software' },
      { to: '/blog/what-is-pos-software', label: 'What is POS software?' },
    ],
  },
  {
    term: 'Warehouse transfer',
    definition:
      'A warehouse transfer moves stock between locations without treating it as a sale. Transfers keep location balances accurate for picking and replenishment.',
    related: [{ to: '/platform/inventory', label: 'Warehouse management' }],
  },
  {
    term: 'Invoice aging',
    definition:
      'Invoice aging groups unpaid invoices by how long they have been outstanding so collections teams can prioritise overdue balances.',
    related: [
      { to: '/platform/billing', label: 'Billing software' },
      { to: '/blog/how-to-track-unpaid-invoices', label: 'Track unpaid invoices' },
    ],
  },
  {
    term: 'Customer-specific pricing',
    definition:
      'Customer-specific pricing applies negotiated or historical prices for each customer and product, reducing manual price selection errors during invoicing.',
    related: [{ to: '/platform/pricing-engine', label: 'Pricing engine' }],
  },
]

export function getLearningLinks(slug?: string): SemanticLink[] {
  if (!slug) return []
  return topicClusters[slug]?.learningLinks ?? []
}

export const softwareFeatureNames = [
  'Inventory management',
  'Billing and customer payments',
  'Sales invoicing',
  'Purchase order management',
  'Point of sale (POS)',
  'Customer and supplier accounts',
  'Accounting and VAT reporting',
  'Business dashboards',
] as const
