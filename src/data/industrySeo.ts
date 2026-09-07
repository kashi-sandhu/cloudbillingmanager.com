import { industries as industryList } from './content.ts'

export type IndustrySeo = {
  slug: (typeof industryList)[number]['slug']
  name: string
  h1: string
  heroText: string
  intro: string
  focusAreas: string[]
  relatedModules: string[]
  seoTitle: string
  seoDescription: string
  faqs: { question: string; answer: string }[]
}

/**
 * Unique industry page copy — avoids thin duplicate industry doorways.
 * Only describes workflows the product actually supports.
 */
export const industryPageSeo: Record<string, IndustrySeo> = {
  'frozen-foods': {
    slug: 'frozen-foods',
    name: 'Frozen Foods',
    h1: 'ERP Software for Frozen Foods Distribution',
    heroText:
      'Manage frozen inventory, multi-warehouse stock, sales invoicing and customer billing in one cloud platform.',
    intro:
      'Frozen foods distributors need accurate warehouse quantities, fast invoicing and clear customer balances. Cloud Billing Manager connects inventory, purchasing, sales, POS and billing so stock and accounts stay aligned across cold-chain operations.',
    focusAreas: [
      'Multi-warehouse stock visibility for frozen lines',
      'Purchase receipts updating inventory after delivery',
      'Sales invoices and customer-specific pricing',
      'POS for cash & carry and counter sales',
      'Billing, payments and outstanding balances',
    ],
    relatedModules: ['inventory', 'purchasing', 'sales', 'billing', 'pos', 'dashboard'],
    seoTitle: 'Frozen Foods Distribution ERP | Cloud Billing Manager',
    seoDescription:
      'Cloud Billing Manager helps UK frozen foods distributors manage inventory, warehouses, sales invoicing, purchasing, POS and billing in one cloud ERP.',
    faqs: [
      {
        question: 'Does Cloud Billing Manager support frozen foods distributors?',
        answer:
          'Yes. Cloud Billing Manager (cloudbillingmanager.com) helps UK frozen foods distributors with multi-warehouse inventory, purchasing, sales invoicing, POS and billing in one cloud ERP presented by AVANTCORE Technologies.',
      },
      {
        question: 'Can frozen foods stock be tracked across warehouses?',
        answer:
          'Yes. Inventory supports product masters, multi-warehouse balances, purchase receipts, sales deductions and warehouse reports so cold-chain stock stays visible.',
      },
    ],
  },
  'fresh-foods': {
    slug: 'fresh-foods',
    name: 'Fresh Foods',
    h1: 'ERP Software for Fresh Foods Distribution',
    heroText:
      'Track fresh product stock, purchasing and sales billing with live inventory and customer accounts.',
    intro:
      'Fresh foods businesses move stock quickly. Cloud Billing Manager supports product masters, warehouse balances, purchase orders, sales invoices and billing so teams can see availability and customer activity without juggling spreadsheets.',
    focusAreas: [
      'Product and category masters for fresh ranges',
      'Purchase-to-stock receiving workflow',
      'Sales order and invoice lifecycle',
      'Customer billing and payment tracking',
      'Operational dashboards for sales and stock',
    ],
    relatedModules: ['inventory', 'purchasing', 'sales', 'billing', 'dashboard'],
    seoTitle: 'Fresh Foods Distribution ERP | Cloud Billing Manager',
    seoDescription:
      'Cloud ERP for UK fresh foods distributors: inventory management, purchasing, sales invoicing, billing and reporting in one platform.',
    faqs: [
      {
        question: 'Does Cloud Billing Manager support fresh foods distributors?',
        answer:
          'Yes. Cloud Billing Manager helps UK fresh foods distributors track stock, purchasing, sales invoicing and billing in one cloud ERP at cloudbillingmanager.com.',
      },
    ],
  },
  'meat-suppliers': {
    slug: 'meat-suppliers',
    name: 'Meat Suppliers',
    h1: 'ERP Software for Meat Suppliers & Distributors',
    heroText:
      'Control stock, supplier purchases, customer invoicing and payments for meat distribution businesses.',
    intro:
      'Meat suppliers need reliable stock control and fast customer billing. Cloud Billing Manager brings inventory, purchasing, sales, POS and accounting together for UK meat distribution operations.',
    focusAreas: [
      'Inventory and warehouse stock control',
      'Supplier purchasing and payables',
      'Customer invoicing and credit notes',
      'POS for walk-in and counter sales',
      'Accounting and VAT reporting',
    ],
    relatedModules: ['inventory', 'purchasing', 'sales', 'pos', 'billing', 'accounting'],
    seoTitle: 'Meat Supplier Distribution ERP | Cloud Billing Manager',
    seoDescription:
      'Inventory, purchasing, sales invoicing, POS and billing software for UK meat suppliers and distributors.',
    faqs: [
      {
        question: 'Does Cloud Billing Manager support meat suppliers?',
        answer:
          'Yes. Meat suppliers can manage inventory, purchasing, sales invoicing, POS and billing in one cloud ERP from Cloud Billing Manager (cloudbillingmanager.com).',
      },
    ],
  },
  'beverage-distribution': {
    slug: 'beverage-distribution',
    name: 'Beverage Distribution',
    h1: 'ERP Software for Beverage Distribution',
    heroText:
      'Manage beverage SKUs, warehouse stock, wholesale invoices and customer payments in one system.',
    intro:
      'Beverage distributors often handle large SKU counts and mixed wholesale and counter sales. Cloud Billing Manager supports inventory, purchasing, sales, POS and billing for UK beverage distribution businesses.',
    focusAreas: [
      'SKU and warehouse inventory control',
      'Wholesale sales invoicing',
      'POS for cash & carry beverage sales',
      'Customer pricing and billing',
      'Purchase orders and supplier payments',
    ],
    relatedModules: ['inventory', 'sales', 'pos', 'billing', 'purchasing', 'pricing-engine'],
    seoTitle: 'Beverage Distribution ERP | Cloud Billing Manager',
    seoDescription:
      'Cloud Billing Manager for UK beverage distributors: stock control, wholesale invoicing, POS, purchasing and customer billing.',
    faqs: [
      {
        question: 'Does Cloud Billing Manager support beverage distributors?',
        answer:
          'Yes. UK beverage distributors can manage SKU inventory, wholesale invoicing, POS, purchasing and customer billing in Cloud Billing Manager.',
      },
    ],
  },
  'grocery-distribution': {
    slug: 'grocery-distribution',
    name: 'Grocery Distribution',
    h1: 'ERP Software for Grocery Distribution',
    heroText:
      'Run grocery inventory, purchasing, customer invoicing and collections from one cloud ERP.',
    intro:
      'Grocery distributors need coordinated stock, orders and billing. Cloud Billing Manager connects inventory, sales, purchasing, POS and customer accounts for UK grocery distribution teams.',
    focusAreas: [
      'Multi-category grocery inventory',
      'Purchase receiving into stock',
      'Customer invoices and statements',
      'POS and counter billing',
      'Sales and inventory reporting',
    ],
    relatedModules: ['inventory', 'purchasing', 'sales', 'billing', 'pos', 'dashboard'],
    seoTitle: 'Grocery Distribution ERP | Cloud Billing Manager',
    seoDescription:
      'Inventory management, sales invoicing, purchasing, POS and billing for UK grocery distribution businesses.',
    faqs: [
      {
        question: 'Does Cloud Billing Manager support grocery distributors?',
        answer:
          'Yes. Grocery distributors can run inventory, purchasing, sales invoicing, POS and billing in one cloud ERP from cloudbillingmanager.com.',
      },
    ],
  },
  fmcg: {
    slug: 'fmcg',
    name: 'FMCG',
    h1: 'ERP Software for FMCG Distribution',
    heroText:
      'Support fast-moving product ranges with inventory, pricing, invoicing and payment tracking.',
    intro:
      'FMCG distributors need speed across stock and sales. Cloud Billing Manager provides inventory, customer pricing, sales invoicing, POS and billing in one cloud platform for UK FMCG businesses.',
    focusAreas: [
      'High-volume SKU inventory tracking',
      'Customer-specific pricing',
      'Fast sales invoicing',
      'POS for retail and cash & carry',
      'Collections and outstanding balances',
    ],
    relatedModules: ['inventory', 'pricing-engine', 'sales', 'pos', 'billing', 'dashboard'],
    seoTitle: 'FMCG Distribution ERP | Cloud Billing Manager',
    seoDescription:
      'Cloud ERP for UK FMCG distributors covering inventory, pricing, sales invoicing, POS and billing.',
    faqs: [
      {
        question: 'Does Cloud Billing Manager support FMCG distributors?',
        answer:
          'Yes. FMCG distributors can manage high-volume inventory, customer pricing, sales invoicing, POS and billing in Cloud Billing Manager.',
      },
    ],
  },
  'restaurant-suppliers': {
    slug: 'restaurant-suppliers',
    name: 'Restaurant Suppliers',
    h1: 'ERP Software for Restaurant Suppliers',
    heroText:
      'Manage catering and restaurant supply stock, orders, invoices and customer accounts in one place.',
    intro:
      'Restaurant suppliers need clear stock availability and reliable customer invoicing. Cloud Billing Manager connects inventory, sales, purchasing and billing for UK restaurant supply businesses.',
    focusAreas: [
      'Stock availability for foodservice lines',
      'Sales invoices and delivery-linked billing',
      'Customer accounts and credit control',
      'Purchase orders for replenishment',
      'Operational sales and stock dashboards',
    ],
    relatedModules: ['inventory', 'sales', 'billing', 'purchasing', 'customers', 'dashboard'],
    seoTitle: 'Restaurant Supplier ERP | Cloud Billing Manager',
    seoDescription:
      'Inventory, sales invoicing, purchasing and billing software for UK restaurant suppliers and foodservice distributors.',
    faqs: [
      {
        question: 'Does Cloud Billing Manager support restaurant suppliers?',
        answer:
          'Yes. Restaurant suppliers can manage stock, sales invoicing, purchasing and customer billing in one cloud ERP from Cloud Billing Manager.',
      },
    ],
  },
  'wholesale-businesses': {
    slug: 'wholesale-businesses',
    name: 'Wholesale Businesses',
    h1: 'ERP Software for Wholesale Businesses',
    heroText:
      'Replace disconnected wholesale tools with inventory, invoicing, POS and accounting in one cloud system.',
    intro:
      'Wholesale businesses often run sales, stock and billing in separate systems. Cloud Billing Manager brings inventory, purchasing, sales, POS, billing and accounting together for UK wholesalers.',
    focusAreas: [
      'Wholesale inventory and warehouses',
      'Trade sales invoicing',
      'Cash & carry POS',
      'Customer and supplier accounts',
      'Accounting and VAT reporting',
    ],
    relatedModules: ['inventory', 'sales', 'pos', 'billing', 'purchasing', 'accounting'],
    seoTitle: 'Wholesale Business ERP | Cloud Billing Manager',
    seoDescription:
      'Cloud Billing Manager for UK wholesalers: inventory management, sales invoicing, POS, purchasing, billing and accounting.',
    faqs: [
      {
        question: 'Does Cloud Billing Manager support wholesale businesses?',
        answer:
          'Yes. UK wholesalers can replace disconnected tools with inventory, sales invoicing, POS, purchasing, billing and accounting in Cloud Billing Manager.',
      },
    ],
  },
  'import-distribution': {
    slug: 'import-distribution',
    name: 'Import & Distribution',
    h1: 'ERP Software for Import & Distribution',
    heroText:
      'Track imported stock, supplier purchases, warehouse allocation and customer billing in one platform.',
    intro:
      'Import and distribution businesses need purchase control, warehouse stock and customer invoicing that stay connected. Cloud Billing Manager supports purchasing, inventory, sales and billing for UK import distribution operations.',
    focusAreas: [
      'Supplier purchasing and goods receipt',
      'Warehouse stock allocation',
      'Customer sales invoicing',
      'Supplier payments and payables',
      'Inventory and purchase reporting',
    ],
    relatedModules: ['purchasing', 'inventory', 'sales', 'supplier-payments', 'billing', 'dashboard'],
    seoTitle: 'Import & Distribution ERP | Cloud Billing Manager',
    seoDescription:
      'Purchasing, inventory, sales invoicing and billing software for UK import and distribution businesses.',
    faqs: [
      {
        question: 'Does Cloud Billing Manager support import and distribution businesses?',
        answer:
          'Yes. Import and distribution businesses can manage supplier purchasing, warehouse stock, sales invoicing and billing in Cloud Billing Manager at cloudbillingmanager.com.',
      },
    ],
  },
}

export function getIndustryPageSeo(slug: string): IndustrySeo | undefined {
  return industryPageSeo[slug]
}
