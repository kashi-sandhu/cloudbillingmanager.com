import { getBlogArticle, getBlogCategory } from './blog.ts'
import { getIndustryPageSeo } from './industrySeo.ts'

export type FaqItem = {
  question: string
  answer: string
}

export type RelatedLink = {
  to: string
  label: string
}

export type ModulePageSeo = {
  title: string
  description: string
  h1: string
  heroText: string
  intro: string
  primaryKeyword: string
  relatedLinks: RelatedLink[]
  faqs: FaqItem[]
}

export type StaticPageSeo = {
  title: string
  description: string
  h1?: string
  faqs?: FaqItem[]
}

export const homePageSeo: StaticPageSeo = {
  title: 'Cloud Billing Manager | Official Site — cloudbillingmanager.com',
  description:
    'Official Cloud Billing Manager website (cloudbillingmanager.com). Cloud ERP for UK food distributors: inventory, billing, invoicing, sales, purchasing, accounting and POS. Presented by AVANTCORE Technologies.',
  h1: 'Cloud Billing Manager — Cloud Billing Software for UK Food Distribution',
  faqs: [
    {
      question: 'What is Cloud Billing Manager?',
      answer:
        'Cloud Billing Manager is a cloud ERP for UK food distribution businesses. It combines inventory management, billing, invoicing, sales, purchasing, accounting and POS in one platform, presented by AVANTCORE Technologies.',
    },
    {
      question: 'Is cloudbillingmanager.com the official Cloud Billing Manager website?',
      answer:
        'Yes. The official product website is https://cloudbillingmanager.com. Search Cloud Billing Manager, CloudBilling Manager, Cloud BillingManager, CloudBillingManager, cloudbillingmanager, cloud billing manager, cloud billingmanager, cloudbilling manager, or CBM.',
    },
    {
      question: 'How do I find Cloud Billing Manager on Google?',
      answer:
        'Search cloudbillingmanager, cloudbillingmanager.com, Cloud Billing Manager, CloudBilling Manager, Cloud BillingManager, CloudBillingManager, cloud billing manager, cloud billingmanager, cloudbilling manager, or CBM. The official website is https://cloudbillingmanager.com.',
    },
  ],
}

export const staticPageSeo: Record<string, StaticPageSeo> = {
  '/': homePageSeo,
  '/about': {
    title: 'About Cloud Billing Manager | cloudbillingmanager.com',
    description:
      'About Cloud Billing Manager — the official cloudbillingmanager.com product by AVANTCORE Technologies. UK food distribution ERP with inventory, billing, invoicing and POS.',
    h1: 'About Cloud Billing Manager',
    faqs: [
      {
        question: 'What is the official Cloud Billing Manager website?',
        answer:
          'The official website is https://cloudbillingmanager.com. Cloud Billing Manager, CloudBilling Manager, Cloud BillingManager, CloudBillingManager, cloudbillingmanager, cloud billing manager, cloud billingmanager, cloudbilling manager and CBM are common search spellings for the same brand.',
      },
      {
        question: 'Who presents Cloud Billing Manager?',
        answer:
          'Cloud Billing Manager is presented by AVANTCORE Technologies. The official product domain is cloudbillingmanager.com.',
      },
    ],
  },
  '/platform': {
    title: 'ERP Platform | Inventory, Billing & POS | Cloud Billing Manager',
    description:
      'Explore 13 integrated Cloud Billing Manager modules — inventory, billing, sales, POS, purchasing and accounting — in one cloud ERP built for UK food distribution.',
    h1: 'One Complete Cloud Platform',
    faqs: [
      {
        question: 'What modules are included in Cloud Billing Manager?',
        answer:
          'Cloud Billing Manager (cloudbillingmanager.com) includes inventory, sales, billing, purchasing, POS, accounting, dashboards, customer and supplier management in one cloud ERP for UK food distribution.',
      },
    ],
  },
  '/industries': {
    title: 'Food Distribution ERP by Industry | Cloud Billing Manager',
    description:
      'Industry-specific cloud ERP for frozen foods, fresh foods, meat, beverage, grocery, FMCG, restaurant supply, wholesale and import distribution in the UK.',
    h1: 'Designed specifically for',
    faqs: [
      {
        question: 'Which industries does Cloud Billing Manager support?',
        answer:
          'Cloud Billing Manager supports UK food distributors, wholesalers, cash & carry, retail chains, importers and FMCG businesses. Official site: https://cloudbillingmanager.com.',
      },
    ],
  },
  '/why': {
    title: 'Why Cloud Billing Manager | One Platform. Complete Control.',
    description:
      'Replace Sage, Excel and disconnected tools. Cloud Billing Manager unifies inventory, billing, sales, POS and accounting for UK food distributors in one cloud ERP.',
    h1: 'Why Cloud Billing Manager?',
    faqs: [
      {
        question: 'Why choose Cloud Billing Manager over separate tools?',
        answer:
          'Cloud Billing Manager combines inventory, billing, sales, purchasing, POS and accounting in one cloud platform so UK food distributors avoid disconnected spreadsheets and desktop systems.',
      },
    ],
  },
  '/contact': {
    title: 'Contact Cloud Billing Manager | AVANTCORE Technologies',
    description:
      'Contact AVANTCORE Technologies about Cloud Billing Manager. Email sophia@cloudbillingmanager.com or call 0 7429 682461 / landline 020 8080 5153. Head Office in London, United Kingdom.',
    faqs: [
      {
        question: 'How do I contact Cloud Billing Manager?',
        answer:
          'Email sophia@cloudbillingmanager.com, call 0 7429 682461 or landline 020 8080 5153, or book a demo at https://cloudbillingmanager.com/demo. Official site: cloudbillingmanager.com.',
      },
    ],
  },
  '/demo': {
    title: 'Book a Client Demo | Cloud Billing Manager — cloudbillingmanager.com',
    description:
      'Book a live Cloud Billing Manager demo at the official cloudbillingmanager.com site. Inventory, invoicing, pricing, stock, POS and VAT for UK food distribution.',
    faqs: [
      {
        question: 'How do I book a Cloud Billing Manager demo?',
        answer:
          'Book a client demo at https://cloudbillingmanager.com/demo. Cloud Billing Manager is the official cloud ERP at cloudbillingmanager.com, presented by AVANTCORE Technologies.',
      },
    ],
  },
  '/blog': {
    title: 'Blog | Inventory, Billing & POS Guides | Cloud Billing Manager',
    description:
      'Read practical guides on inventory management, billing software, invoicing, POS systems and stock control for UK food distribution businesses.',
    faqs: [
      {
        question: 'What topics does the Cloud Billing Manager blog cover?',
        answer:
          'Guides on inventory management, billing software, invoicing, POS, sales, purchasing and business management for UK food distributors. Official site: cloudbillingmanager.com.',
      },
    ],
  },
  '/pricing': {
    title: 'Pricing | Cloud Billing Manager Plans from £59',
    description:
      'Cloud Billing Manager pricing for UK food distributors — Starter £59, Business £99 and Advanced £199 per month. Choose users, invoices and ERP features that fit your business.',
    h1: 'Cloud Billing Manager Pricing',
    faqs: [
      {
        question: 'How much does Cloud Billing Manager cost?',
        answer:
          'Cloud Billing Manager plans start at £59 per month for Starter, £99 for Business and £199 for Advanced. All plans are cloud-based and billed monthly in GBP.',
      },
      {
        question: 'Which plan is right for my distribution business?',
        answer:
          'Starter suits small teams with one user and lighter invoice volume. Business is the most popular choice for growing distributors needing logistics and advanced controls. Advanced adds unlimited users, HR, attendance, leave and payroll.',
      },
      {
        question: 'Can I upgrade later?',
        answer:
          'Yes. Start on the plan that matches your current users and daily invoices, then move up as your warehouse, logistics or HR needs grow. Book a demo at cloudbillingmanager.com/demo to confirm the best fit.',
      },
    ],
  },
  '/features/ai-whatsapp-ordering': {
    title: 'AI WhatsApp Ordering | Turn Messages into Invoice Drafts',
    description:
      'AI-powered WhatsApp order management for Cloud Billing Manager. Convert customer WhatsApp orders into review-ready sales invoice drafts with customer matching, product recognition and staff approval.',
    h1: 'AI-Powered WhatsApp Ordering for Modern Business Operations',
    faqs: [
      {
        question: 'Does AI WhatsApp ordering work with any WhatsApp number?',
        answer:
          'The system processes messages from WhatsApp numbers associated with existing customer records. Staff review ambiguous matches when more than one customer could share a number.',
      },
      {
        question: 'Does AI automatically post every invoice?',
        answer:
          'No. AI prepares editable sales invoice drafts. Staff review, edit, approve or reject before posting. Stock processing and applicable WhatsApp sending occur after invoice posting.',
      },
      {
        question: 'What information appears on an AI-generated invoice draft?',
        answer:
          'Drafts can include product code, description, quantity, price, VAT, net amount, line totals, subtotal, total VAT and grand total — all editable before posting.',
      },
      {
        question: 'Is this a standalone WhatsApp chatbot?',
        answer:
          'No. It is an order assistant inside Cloud Billing Manager Sales that turns WhatsApp order messages into review-ready invoice drafts connected to your existing sales and delivery workflows.',
      },
    ],
  },
  '/features/fleet-logistics': {
    title: 'Fleet & Logistics | Route Planning & Auto Assignment',
    description:
      'Smart fleet management in Cloud Billing Manager — drivers, vehicles, delivery routes, automatic delivery assignment, capacity-aware planning, live monitoring dashboard and delivery history.',
    h1: 'Smarter Fleet Management. More Organized Deliveries.',
    faqs: [
      {
        question: 'Does Cloud Billing Manager include fleet and logistics management?',
        answer:
          'Yes. The Fleet / Logistics module covers driver and vehicle management, delivery routes, automatic delivery assignment, capacity-aware planning, a live monitoring dashboard and delivery history.',
      },
      {
        question: 'How does automatic delivery assignment work?',
        answer:
          'Auto Assign Deliveries groups nearby customers, arranges a shorter stop sequence, fits deliveries to vehicle capacity (including a default 20-stop local round limit), supports dispatch to On Trip status, and supports proof-of-delivery completion.',
      },
      {
        question: 'Does live tracking mean every vehicle is always online?',
        answer:
          'No. The live monitoring dashboard shows fleet visibility, status filters and signal availability. Vehicles may appear without a GPS signal depending on device and map configuration.',
      },
      {
        question: 'How does logistics connect to sales invoices?',
        answer:
          'Delivery planning uses the same pool of delivery invoices as sales workflows. Manual and automatic routing help keep assignments organised from invoice posting through dispatch and delivery history.',
      },
    ],
  },
  '/resources': {
    title: 'Resources | Inventory Checklists & Guides | Cloud Billing Manager',
    description:
      'Free linkable resources for distributors and publishers: inventory guide, checklist, glossary and spreadsheet comparison for food distribution businesses.',
    faqs: [
      {
        question: 'What free resources does Cloud Billing Manager publish?',
        answer:
          'Inventory management guide, operational checklist, glossary and spreadsheet comparison for food distribution businesses at cloudbillingmanager.com/resources.',
      },
    ],
  },
  '/resources/inventory-management-checklist': {
    title: 'Inventory Checklist for Food Distributors | Cloud Billing Manager',
    description:
      'Free operational checklist covering product masters, warehouses, purchasing, sales, POS, returns, low stock and inventory reporting for UK food distributors.',
    faqs: [
      {
        question: 'Is this inventory checklist from Cloud Billing Manager?',
        answer:
          'Yes. This free checklist is published by Cloud Billing Manager (cloudbillingmanager.com) for UK food distributors evaluating stock control and warehouse processes.',
      },
    ],
  },
  '/resources/inventory-management-guide': {
    title: 'Inventory Guide for Food Distributors | Cloud Billing Manager',
    description:
      'A practical inventory management hub covering stock control, warehouses, purchasing, sales, POS connections and Cloud Billing Manager inventory capabilities.',
    faqs: [
      {
        question: 'What does inventory management include for food distributors?',
        answer:
          'It typically includes product masters, stock levels by warehouse, purchases, sales and POS updates, transfers, adjustments, returns and inventory reporting.',
      },
      {
        question: 'How does this guide relate to Cloud Billing Manager?',
        answer:
          'The guide explains inventory concepts and workflows, then links to Cloud Billing Manager inventory, purchasing, sales and POS modules so readers can connect ideas to product capabilities.',
      },
      {
        question: 'Where should I start if I am evaluating inventory software?',
        answer:
          'Start with the inventory management product page, use the operational checklist to audit current processes, then book a client demo to see live stock and warehouse workflows.',
      },
    ],
  },
  '/resources/inventory-software-vs-spreadsheets': {
    title: 'Inventory Management Software vs Spreadsheets | Cloud Billing Manager',
    description:
      'Compare spreadsheets and inventory management software for multi-user stock control, warehouses, POS updates, audit trails and reporting.',
    faqs: [
      {
        question: 'When are spreadsheets enough for inventory?',
        answer:
          'Spreadsheets can work for a small product list updated by one person. They become unreliable when multiple users edit stock, warehouses diverge, or sales and POS run separately.',
      },
      {
        question: 'What problems appear when stock lives in spreadsheets?',
        answer:
          'Common issues include overwritten rows, delayed sales deductions, missing purchase receipts, weak audit trails and reports that must be rebuilt every week.',
      },
      {
        question: 'Does Cloud Billing Manager replace inventory spreadsheets?',
        answer:
          'Yes for day-to-day stock control. Product masters, warehouse balances, purchases, sales, POS and inventory reports share one live record instead of separate files.',
      },
    ],
  },
  '/resources/glossary': {
    title: 'Inventory, Billing & POS Glossary | Cloud Billing Manager',
    description:
      'Definitions for SKU, inventory, purchase orders, invoices, credit notes, POS, warehouse transfers and invoice aging used in food distribution operations.',
    faqs: [
      {
        question: 'Who is this glossary for?',
        answer:
          'It is for distributors, new staff and publishers who need clear definitions of inventory, billing and POS terms used in food distribution operations.',
      },
      {
        question: 'Are these legal definitions?',
        answer:
          'No. Definitions are practical operational explanations. For legal, tax or accounting advice, consult a qualified professional.',
      },
    ],
  },
  '/press': {
    title: 'Press Kit | Cloud Billing Manager — cloudbillingmanager.com',
    description:
      'Official Cloud Billing Manager press kit at cloudbillingmanager.com. Brand facts, boilerplate and resources for media covering Cloud Billing Manager, CloudBillingManager, cloudbillingmanager and CBM.',
    faqs: [
      {
        question: 'What is the official Cloud Billing Manager domain?',
        answer:
          'The official website is https://cloudbillingmanager.com. Use cloudbillingmanager.com in media coverage and link to this domain as the canonical product site.',
      },
      {
        question: 'What alternate names does Cloud Billing Manager use?',
        answer:
          'Common names include Cloud Billing Manager, CloudBilling Manager, Cloud BillingManager, CloudBillingManager, cloudbillingmanager, cloud billing manager, cloud billingmanager, cloudbilling manager and CBM.',
      },
    ],
  },
  '/privacy': {
    title: 'Privacy Policy | Cloud Billing Manager',
    description:
      'How AVANTCORE Technologies handles enquiry and demo request information submitted through the Cloud Billing Manager website at cloudbillingmanager.com.',
    faqs: [
      {
        question: 'Who operates the Cloud Billing Manager website?',
        answer:
          'The Cloud Billing Manager website at cloudbillingmanager.com is operated by AVANTCORE Technologies for product enquiries and demo requests.',
      },
    ],
  },
  '/terms': {
    title: 'Terms of Use | Cloud Billing Manager',
    description:
      'Terms for using the Cloud Billing Manager public website at cloudbillingmanager.com, operated by AVANTCORE Technologies.',
    faqs: [
      {
        question: 'What website do these terms apply to?',
        answer:
          'These terms apply to the official Cloud Billing Manager website at https://cloudbillingmanager.com, operated by AVANTCORE Technologies.',
      },
    ],
  },
}

export const modulePageSeo: Record<string, ModulePageSeo> = {
  inventory: {
    primaryKeyword: 'inventory management software',
    title: 'Inventory Management Software | Cloud Billing Manager',
    description:
      'Manage products, stock levels, warehouses, adjustments and inventory reports with Cloud Billing Manager inventory management software for UK food distribution.',
    h1: 'Inventory Management Software',
    heroText:
      'Track product quantities, stock movements, purchases and sales from a centralized inventory dashboard.',
    intro:
      'Cloud Billing Manager gives distributors real-time stock visibility across products, warehouses and transactions. Manage product masters, multi-warehouse allocation, stock adjustments, returns and inventory reports while sales and purchasing keep stock levels accurate.',
    relatedLinks: [
      { to: '/platform/purchasing', label: 'Purchase management software' },
      { to: '/platform/sales', label: 'Sales management software' },
      { to: '/platform/billing', label: 'Billing software' },
      { to: '/platform/pos', label: 'POS software' },
      { to: '/platform/dashboard', label: 'Inventory reports and dashboards' },
      { to: '/resources/inventory-management-guide', label: 'Inventory management guide' },
    ],
    faqs: [
      {
        question: 'What is inventory management software?',
        answer:
          'Inventory management software helps businesses track products, stock levels, warehouse movements, adjustments and stock history in one place instead of using spreadsheets or disconnected tools.',
      },
      {
        question: 'How does Cloud Billing Manager track inventory?',
        answer:
          'Stock updates automatically from sales invoices, purchase orders, returns and adjustments. You can view real-time availability, warehouse balances, low-stock alerts and complete product activity history.',
      },
      {
        question: 'Can I manage products and stock levels across warehouses?',
        answer:
          'Yes. Cloud Billing Manager supports product master management, categories, multi-warehouse allocation, warehouse-to-warehouse transfers and warehouse inventory reports.',
      },
      {
        question: 'Can inventory be connected with sales and purchases?',
        answer:
          'Yes. Sales, purchase orders, POS transactions and returns are integrated with inventory so stock levels and valuation stay aligned with daily operations.',
      },
    ],
  },
  billing: {
    primaryKeyword: 'billing software',
    title: 'Billing Software for Businesses | Cloud Billing Manager',
    description:
      'Manage customer billing, payments, credit notes, account statements and VAT with Cloud Billing Manager billing software built for UK food distribution businesses.',
    h1: 'Billing Software for Businesses',
    heroText:
      'Control customer billing, payments, credit notes and outstanding balances from one financial workspace.',
    intro:
      'Cloud Billing Manager connects billing with sales and customer accounts. Issue credit notes, process returns, monitor outstanding balances, allocate payments and review invoice aging while VAT and customer ledgers stay up to date.',
    relatedLinks: [
      { to: '/platform/sales', label: 'Invoicing and sales management' },
      { to: '/platform/customers', label: 'Customer account management' },
      { to: '/platform/inventory', label: 'Inventory management software' },
      { to: '/platform/accounting', label: 'Accounting and financial reports' },
    ],
    faqs: [
      {
        question: 'What is billing software?',
        answer:
          'Billing software helps businesses manage customer invoices, payments, credit notes, balances and account statements in one system.',
      },
      {
        question: 'Can Cloud Billing Manager create and manage customer invoices?',
        answer:
          'Sales invoices are created in the sales module and flow into customer billing, payment tracking, statements and ledger records within the same platform.',
      },
      {
        question: 'Can I track customer payments and overdue invoices?',
        answer:
          'Yes. You can record multiple payment methods, allocate payments across invoices, monitor outstanding balances and review invoice aging analysis.',
      },
    ],
  },
  sales: {
    primaryKeyword: 'sales management software',
    title: 'Sales Management & Invoicing Software | Cloud Billing Manager',
    description:
      'Create sales invoices, quotations, loading slips and customer-specific pricing with Cloud Billing Manager sales management and invoicing software for distributors.',
    h1: 'Sales Management & Invoicing Software',
    heroText:
      'Create quotations and sales invoices, apply customer pricing and manage the full sales order lifecycle.',
    intro:
      'Cloud Billing Manager streamlines distributor sales workflows from quotation to delivery. Build invoices quickly, duplicate recurring orders, assign vehicles and drivers, generate loading slips and convert approved quotations into posted sales invoices.',
    relatedLinks: [
      { to: '/platform/billing', label: 'Billing software' },
      { to: '/platform/inventory', label: 'Inventory management software' },
      { to: '/platform/pricing-engine', label: 'Customer pricing engine' },
      { to: '/platform/purchasing', label: 'Purchase management software' },
    ],
    faqs: [
      {
        question: 'Does Cloud Billing Manager include invoicing software?',
        answer:
          'Yes. You can create sales invoices, cash invoices, quotations, credit notes, PDF invoices and multiple invoice templates within the sales module.',
      },
      {
        question: 'Can I use customer-specific pricing on sales invoices?',
        answer:
          'Yes. Customer-wise pricing, contract rates, promotions and the Intelligent Customer Pricing Engine help apply the correct price during invoice creation.',
      },
      {
        question: 'Can sales invoices connect to inventory and logistics?',
        answer:
          'Yes. Sales invoices can update stock, generate loading slips, assign vehicles and drivers, and feed billing and accounting records.',
      },
    ],
  },
  purchasing: {
    primaryKeyword: 'purchase management software',
    title: 'Purchase Management Software | Cloud Billing Manager',
    description:
      'Manage purchase orders, supplier pricing, goods receipt and stock updates with Cloud Billing Manager purchase management software for UK distributors.',
    h1: 'Purchase Management Software',
    heroText:
      'Control the full procurement cycle from purchase order creation to stock receipt and supplier payment tracking.',
    intro:
      'Cloud Billing Manager supports quick purchase order creation, supplier-specific pricing, order verification, recurring orders and automatic inventory updates when goods are received and verified.',
    relatedLinks: [
      { to: '/platform/inventory', label: 'Inventory management software' },
      { to: '/platform/suppliers', label: 'Supplier onboarding' },
      { to: '/platform/supplier-payments', label: 'Supplier payments' },
      { to: '/platform/sales', label: 'Sales management software' },
    ],
    faqs: [
      {
        question: 'What is purchase management software?',
        answer:
          'Purchase management software helps businesses create purchase orders, track supplier orders, verify receipts and update stock and payables accurately.',
      },
      {
        question: 'Does Cloud Billing Manager update inventory from purchase orders?',
        answer:
          'Yes. Stock levels and inventory valuation update automatically once goods are received, verified and confirmed against purchase orders.',
      },
    ],
  },
  pos: {
    primaryKeyword: 'POS software',
    title: 'POS Software & Inventory Management | Cloud Billing Manager',
    description:
      'Run fast retail billing with barcode support, customer pricing and automatic inventory updates using Cloud Billing Manager POS software.',
    h1: 'POS Software & Inventory Management',
    heroText:
      'Process walk-in, cash and credit sales on a touch-friendly POS interface with real-time stock updates.',
    intro:
      'Cloud Billing Manager POS supports quick billing, barcode scanning, category-based product selection, split payments and instant receipts while inventory, customer ledgers and accounting stay synchronized.',
    relatedLinks: [
      { to: '/platform/inventory', label: 'Inventory management software' },
      { to: '/platform/sales', label: 'Sales and invoicing software' },
      { to: '/platform/billing', label: 'Billing software' },
      { to: '/platform/customers', label: 'Customer management' },
    ],
    faqs: [
      {
        question: 'What is POS software?',
        answer:
          'POS software is used at the point of sale to bill customers quickly, accept payments and record transactions in the business system.',
      },
      {
        question: 'Can POS sales update inventory automatically?',
        answer:
          'Yes. POS transactions update inventory, customer ledgers, sales history and accounting records in real time.',
      },
    ],
  },
  dashboard: {
    primaryKeyword: 'inventory reports software',
    title: 'Business Dashboard & Inventory Reports | Cloud Billing Manager',
    description:
      'View sales, purchases, collections, inventory value, stock alerts and financial KPIs on the Cloud Billing Manager business dashboard.',
    h1: 'Business Dashboard & Inventory Reports',
    heroText:
      'Monitor sales, purchases, stock value, collections and financial performance from one dashboard.',
    intro:
      'The Cloud Billing Manager dashboard brings together sales overview, purchase overview, payment collections, inventory and warehouse visibility, customer and supplier analytics, invoice due planning and live operational updates.',
    relatedLinks: [
      { to: '/platform/inventory', label: 'Inventory management software' },
      { to: '/platform/sales', label: 'Sales management software' },
      { to: '/platform/purchasing', label: 'Purchase management software' },
      { to: '/platform/accounting', label: 'Financial reports' },
    ],
    faqs: [
      {
        question: 'What business metrics can I see on the dashboard?',
        answer:
          'The dashboard covers sales, purchases, collections, inventory value, stock alerts, customer and supplier analytics, invoice due schedules and financial overview metrics.',
      },
    ],
  },
  accounting: {
    primaryKeyword: 'business management software',
    title: 'Accounting & Financial Management Software | Cloud Billing Manager',
    description:
      'Manage receivables, payables, VAT, ledgers, expenses and financial reports with Cloud Billing Manager accounting software integrated with sales and inventory.',
    h1: 'Accounting & Financial Management Software',
    heroText:
      'Manage receivables, payables, VAT, income, expenses and financial reporting in the same platform as sales and stock.',
    intro:
      'Cloud Billing Manager accounting connects customer and supplier ledgers with daily operations. Review balance sheet, profit and loss, cash flow, aging analysis, VAT reports and financial dashboards without exporting to separate tools.',
    relatedLinks: [
      { to: '/platform/billing', label: 'Billing software' },
      { to: '/platform/dashboard', label: 'Business dashboard and reports' },
      { to: '/platform/inventory', label: 'Inventory management software' },
    ],
    faqs: [
      {
        question: 'Does Cloud Billing Manager include accounting software?',
        answer:
          'Yes. Cloud Billing Manager includes receivables, payables, VAT, ledgers, expenses and financial reports integrated with sales, inventory and billing.',
      },
      {
        question: 'Can accounting connect to sales and inventory in Cloud Billing Manager?',
        answer:
          'Yes. Customer and supplier ledgers, VAT reports and financial dashboards use the same operational data as sales invoices, stock and payments.',
      },
    ],
  },
  'pricing-engine': {
    primaryKeyword: 'customer pricing software',
    title: 'Customer Pricing Engine | Cloud Billing Manager',
    description:
      'Apply customer-specific pricing, price learning and margin protection with the Intelligent Customer Pricing Engine in Cloud Billing Manager.',
    h1: 'Intelligent Customer Pricing Engine',
    heroText:
      'Apply customer-specific pricing automatically based on history, agreements and pricing rules.',
    intro:
      'The Intelligent Customer Pricing Engine helps distributors apply the right price for each customer and product, recall historical prices, protect margins and maintain a complete pricing audit trail.',
    relatedLinks: [
      { to: '/platform/sales', label: 'Sales and invoicing software' },
      { to: '/platform/customers', label: 'Customer management' },
      { to: '/platform/billing', label: 'Billing software' },
    ],
    faqs: [
      {
        question: 'What is the Cloud Billing Manager pricing engine?',
        answer:
          'The Intelligent Customer Pricing Engine applies customer-specific pricing, recalls historical prices and helps protect margins with a complete pricing audit trail.',
      },
      {
        question: 'Can customer pricing apply automatically on invoices?',
        answer:
          'Yes. Pricing rules, agreements and customer history can apply automatically during sales invoice and POS billing in Cloud Billing Manager.',
      },
    ],
  },
  'supplier-payments': {
    primaryKeyword: 'supplier payment software',
    title: 'Supplier Payments Software | Cloud Billing Manager',
    description:
      'Record supplier invoice payments, bulk settlements and payables with Cloud Billing Manager supplier payments and financial management.',
    h1: 'Supplier Payments & Financial Management',
    heroText:
      'Record supplier payments, monitor payables and maintain complete supplier financial records.',
    intro:
      'Cloud Billing Manager helps finance teams settle supplier invoices, process bulk payments, track outstanding payables and maintain supplier statements and ledgers.',
    relatedLinks: [
      { to: '/platform/purchasing', label: 'Purchase management software' },
      { to: '/platform/suppliers', label: 'Supplier onboarding' },
      { to: '/platform/accounting', label: 'Accounting software' },
    ],
    faqs: [
      {
        question: 'Can I record supplier payments in Cloud Billing Manager?',
        answer:
          'Yes. Finance teams can settle supplier invoices, process bulk payments and track outstanding payables with complete supplier statements.',
      },
      {
        question: 'Do supplier payments connect to purchasing and accounting?',
        answer:
          'Yes. Supplier payments update payables, supplier ledgers and financial records linked to purchase orders and goods received.',
      },
    ],
  },
  customers: {
    primaryKeyword: 'customer management software',
    title: 'Customer Management Software | Cloud Billing Manager',
    description:
      'Onboard customers, manage profiles, pricing, credit limits, statements and sales history with Cloud Billing Manager customer management.',
    h1: 'Customer Management Software',
    heroText:
      'Onboard customers, manage accounts, pricing, credit control and customer reports in one module.',
    intro:
      'Cloud Billing Manager customer management covers registration, account history, customer-specific pricing, credit limits, outstanding balances, receipts and customer VAT reporting.',
    relatedLinks: [
      { to: '/platform/sales', label: 'Sales management software' },
      { to: '/platform/billing', label: 'Billing software' },
      { to: '/platform/pricing-engine', label: 'Customer pricing engine' },
    ],
    faqs: [
      {
        question: 'What customer management features does Cloud Billing Manager include?',
        answer:
          'Customer onboarding, profiles, pricing, credit limits, statements, receipts, sales history and customer VAT reporting in one module.',
      },
      {
        question: 'Can I set credit limits per customer in Cloud Billing Manager?',
        answer:
          'Yes. Customer accounts support credit limits, outstanding balances and pricing rules linked to sales, billing and POS.',
      },
    ],
  },
  suppliers: {
    primaryKeyword: 'supplier management software',
    title: 'Supplier Management Software | Cloud Billing Manager',
    description:
      'Register suppliers, track purchase history, statements, payables and performance with Cloud Billing Manager supplier management.',
    h1: 'Supplier Management Software',
    heroText:
      'Manage supplier profiles, purchase history, payables and supplier reports from one workspace.',
    intro:
      'Cloud Billing Manager supplier management supports supplier onboarding, purchase and payment history, outstanding balances, aging analysis and supplier performance reporting.',
    relatedLinks: [
      { to: '/platform/purchasing', label: 'Purchase management software' },
      { to: '/platform/supplier-payments', label: 'Supplier payments' },
    ],
    faqs: [
      {
        question: 'Does Cloud Billing Manager include supplier management?',
        answer:
          'Yes. Register suppliers, track purchase history, payables, statements and supplier performance from one workspace.',
      },
      {
        question: 'Can supplier records link to purchase orders and payments?',
        answer:
          'Yes. Supplier profiles connect to purchasing, goods receipt, supplier payments and accounting ledgers.',
      },
    ],
  },
  customizable: {
    primaryKeyword: 'customizable ERP software',
    title: 'Customizable Cloud ERP | Cloud Billing Manager',
    description:
      'Customize invoice templates, imports, exports, VAT settings and secure cloud access with the fully customizable Cloud Billing Manager system.',
    h1: 'Fully Customizable Cloud ERP',
    heroText:
      'Adapt invoice templates, data import, VAT settings and secure cloud access to your business workflow.',
    intro:
      'Cloud Billing Manager can be configured with multiple invoice templates, Excel and CSV import/export, VAT and system settings, role permissions and secure cloud hosting.',
    relatedLinks: [
      { to: '/platform/sales', label: 'Invoicing software' },
      { to: '/platform/billing', label: 'Billing software' },
    ],
    faqs: [
      {
        question: 'Is Cloud Billing Manager customizable for my business?',
        answer:
          'Yes. Configure invoice templates, Excel and CSV import/export, VAT settings, role permissions and secure cloud access to match your workflow.',
      },
      {
        question: 'Can I control user permissions in Cloud Billing Manager?',
        answer:
          'Yes. Role-based permissions help control access across sales, inventory, billing, POS and reporting modules.',
      },
    ],
  },
  hr: {
    primaryKeyword: 'user management software',
    title: 'User & HR Management | Cloud Billing Manager',
    description:
      'Manage employees, attendance, payroll, leave and role-based access control with Cloud Billing Manager user and HR management.',
    h1: 'User & HR Management',
    heroText:
      'Manage employees, departments, attendance, payroll and secure role-based access across the platform.',
    intro:
      'Cloud Billing Manager includes employee records, department structure, attendance, payroll, leave management and configurable role-based permissions for secure operations.',
    relatedLinks: [
      { to: '/platform/customizable', label: 'System customization and security' },
    ],
    faqs: [
      {
        question: 'Does Cloud Billing Manager include HR or user management?',
        answer:
          'Yes. Employee records, departments, attendance, payroll, leave management and role-based access control are included.',
      },
      {
        question: 'Can I restrict module access by user role?',
        answer:
          'Yes. Configurable role-based permissions control which users can access sales, stock, billing, POS and financial areas.',
      },
    ],
  },
}

export function getModulePageSeo(slug: string): ModulePageSeo | undefined {
  return modulePageSeo[slug]
}

export function getFaqsForPath(pathname: string): FaqItem[] {
  const staticPage = staticPageSeo[pathname]
  if (staticPage?.faqs?.length) return staticPage.faqs

  const moduleMatch = pathname.match(/^\/platform\/([^/]+)$/)
  if (moduleMatch) {
    return modulePageSeo[moduleMatch[1]]?.faqs ?? []
  }

  const industryMatch = pathname.match(/^\/industries\/([^/]+)$/)
  if (industryMatch) {
    const industrySeo = getIndustryPageSeo(industryMatch[1])
    if (industrySeo?.faqs?.length) return industrySeo.faqs
    if (industrySeo) {
      return [
        {
          question: `Does Cloud Billing Manager support ${industrySeo.name} businesses?`,
          answer: `Yes. Cloud Billing Manager (cloudbillingmanager.com) helps ${industrySeo.name.toLowerCase()} distributors with inventory, billing, sales, purchasing and POS in one cloud ERP platform presented by AVANTCORE Technologies.`,
        },
      ]
    }
  }

  const blogCategoryMatch = pathname.match(/^\/blog\/category\/([^/]+)$/)
  if (blogCategoryMatch) {
    const category = getBlogCategory(blogCategoryMatch[1])
    if (category) {
      return [
        {
          question: `What ${category.name} articles does Cloud Billing Manager publish?`,
          answer: `${category.seoDescription} Read articles at cloudbillingmanager.com/blog and book a demo at cloudbillingmanager.com/demo.`,
        },
      ]
    }
  }

  const blogPostMatch = pathname.match(/^\/blog\/([^/]+)$/)
  if (blogPostMatch && blogPostMatch[1] !== 'category') {
    return getBlogArticle(blogPostMatch[1])?.faqs ?? []
  }

  return []
}
