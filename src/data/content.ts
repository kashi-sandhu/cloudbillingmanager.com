const FORM_EMAIL = 'sophia@cloudbillingmanager.com' as const

export const company = {
  product: 'Cloud Billing Manager',
  headline: 'Smart Cloud ERP for UK Food Distribution Businesses',
  clientDemonstration: 'Client Demonstration',
  presentedBy: 'Presented by AVANTCORE Technologies',
  presenter: 'AVANTCORE Technologies',
  modernLine: 'Modern Cloud ERP designed specifically for',
  thankYou: 'Thank You for Your Time',
  tagline: 'Cloud Billing Manager One Platform. Complete Business Control.',
  positioning:
    'Cloud Billing Manager is a cloud ERP for UK food distribution businesses that combines inventory management, billing, invoicing, sales, purchasing, accounting and POS in one platform.',
  email: FORM_EMAIL,
  demoEmail: FORM_EMAIL,
  formSubmitEmail: FORM_EMAIL,
  liveDemo: 'https://demo.cloudbillingmanager.com/',
  website: 'https://cloudbillingmanager.com',
  websiteLabel: 'www.cloudbillingmanager.com',
  groupSite: 'https://www.avantcoretech.com',
  groupSiteLabel: 'www.avantcoretech.com',
  phone: '0 7429 682461',
  landline: '020 8080 5153',
  office: 'London, United Kingdom',
  address: 'Orega 4 Longwalk, Stockley Park, Uxbridge UB11 1FE, London',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Orega+4+Longwalk,+Stockley+Park,+Uxbridge+UB11+1FE,+London',
} as const

/** UK-friendly tel: href from a display number (opens dialler on click). */
export function telHref(display: string): string {
  const digits = display.replace(/[^\d+]/g, '')
  if (digits.startsWith('+')) return `tel:${digits}`
  if (digits.startsWith('0')) return `tel:+44${digits.slice(1)}`
  return `tel:${digits}`
}

export const companyPhones = [
  { label: 'Phone', display: company.phone, href: telHref(company.phone) },
  { label: 'Landline', display: company.landline, href: telHref(company.landline) },
] as const

export const audiences = [
  'Food Distributors',
  'Wholesalers',
  'Cash & Carry',
  'Retail Chains',
  'Importers',
  'FMCG Businesses',
] as const

export const industries = [
  { slug: 'frozen-foods', name: 'Frozen Foods' },
  { slug: 'fresh-foods', name: 'Fresh Foods' },
  { slug: 'meat-suppliers', name: 'Meat Suppliers' },
  { slug: 'beverage-distribution', name: 'Beverage Distribution' },
  { slug: 'grocery-distribution', name: 'Grocery Distribution' },
  { slug: 'fmcg', name: 'FMCG' },
  { slug: 'restaurant-suppliers', name: 'Restaurant Suppliers' },
  { slug: 'wholesale-businesses', name: 'Wholesale Businesses' },
  { slug: 'import-distribution', name: 'Import & Distribution' },
] as const

export const challenges = [
  'Slow invoicing',
  'No real-time Sales & Inventory stats',
  'Multiple disconnected systems',
  'Manual accounting',
  'Poor stock visibility',
  'Duplicate entries',
  'Delayed reporting',
  'Limited remote access',
  'No Logistic tracking',
  'Poor tracking payment collection',
  'Customers Balances Tracking',
  'High Sage licensing costs',
] as const

export const replacedSystems = [
  'Sage',
  'Excel',
  'Desktop System',
  'Separate POS',
  'Inventory Software',
  'Accounting Software',
  'Logistic Software',
] as const

export const capabilities = [
  {
    title: 'Dashboard',
    text: 'Cloud Billing Manager One Dashboard Complete Business Visibility.',
  },
  {
    title: 'Fast & Intelligent Invoicing',
    text: 'Create quotations, invoices, credit notes, and delivery documents quickly and accurately.',
  },
  {
    title: 'Real-Time Sales & Purchase Analytics',
    text: 'Monitor daily, weekly, monthly, and yearly sales through live dashboards.',
  },
  {
    title: 'Real-Time Inventory Intelligence',
    text: 'View current stock levels, inventory value, low-stock alerts, warehouse balances, and product availability instantly.',
  },
  {
    title: 'Inventory & Warehouse Control',
    text: 'Real-time stock management, multi-warehouse, stock transfers and inventory valuation.',
  },
  {
    title: 'Logistics & Distribution Management',
    text: 'Manage vehicles, drivers, invoices Load, loading slips, and customer deliveries.',
  },
  {
    title: 'Integrated Accounting & Financial Management',
    text: 'Manage receivables, payables, VAT, ledgers, payments, expenses, and financial reporting within the same platform.',
  },
  {
    title: 'Employee & Role-Based User Management',
    text: 'Secure role-based access control with configurable permissions for administrators, sales teams, warehouse staff, finance, and management.',
  },
  {
    title: 'Smart Device Accessibility',
    text: 'Secure cloud access from desktops, laptops, tablets, and mobile devices, enabling business operations anytime, anywhere.',
  },
] as const

export type ModuleGroup = {
  title: string
  intro?: string
  items: string[]
}

export type Module = {
  slug: string
  name: string
  nav: string
  tagline: string
  description: string
  groups: ModuleGroup[]
}

export const modules: Module[] = [
  {
    slug: 'dashboard',
    name: 'Powerful Dashboard Features',
    nav: 'Dashboard',
    tagline: 'One Dashboard. Complete Business Visibility.',
    description: 'One Dashboard. Complete Business Visibility.',
    groups: [
      {
        title: 'Sales Overview',
        items: [
          'Total Sales',
          "Today's Sales",
          'Weekly Sales',
          'Monthly Sales',
          'Yearly Sales',
          'Total Sales Invoices',
          'Total Sales Invoices',
          "Today's Invoices",
          'Weekly Invoices',
          'Monthly Invoices',
          'Orders Sales Growth Trends',
        ],
      },
      {
        title: 'Purchase Overview',
        items: [
          'Total Purchases',
          "Today's Purchases",
          'Weekly Purchases',
          'Monthly Purchases',
          'Yearly Purchases',
          'Purchase Orders',
          'Pending Purchase Orders',
          'Verified Purchase Orders',
          'Top trending Suppliers',
        ],
      },
      {
        title: 'Payment Collection Overview',
        items: [
          'Cash Collections',
          'Card Payments',
          'Bank Transfers',
          'Online Payments',
          'Other Payment Methods',
          'Daily Collections',
          'Weekly Collections',
          'Monthly Collections',
          'Outstanding Customer Payments',
        ],
      },
      {
        title: 'Inventory & Warehouse Overview',
        items: [
          'Current Stock Value',
          'Quantity in Hand',
          'Incoming Stock',
          'Reserved Stock',
          'Available Stock',
          'Low Stock Alerts',
          'Out-of-Stock Products',
          'Product Categories',
          'Warehouse Summary',
          'Stock Valuation',
          'Inventory Movement',
          'Warehouse Transfers',
        ],
      },
      {
        title: 'Customer Analytics',
        items: [
          'Total Customers',
          'Top Customers Outstanding Balances',
          'Top Trending Customers',
          'Top Customers Credit Limits',
          'Recent Customers',
          'Recent Customer Payment',
        ],
      },
      {
        title: 'Supplier Analytics',
        items: [
          'Total Suppliers',
          'Top Supplier Outstanding Balances',
          'Top Purchase History',
          'Recent Supplier Payments',
        ],
      },
      {
        title: 'Invoice Due Calendar',
        intro: 'A powerful planning tool for finance and collections teams.',
        items: [
          'Invoice Due Calendar',
          'Daily Invoice Schedule',
          'Weekly Due Invoices',
          'Monthly Due Invoices',
          'Upcoming Customer Payments',
          'Payment Reminder Planning',
          'Outstanding Invoice Tracking',
        ],
      },
      {
        title: 'Live Operational Updates',
        intro: 'Stay informed with live operational updates.',
        items: [
          'Recent Sales Invoices',
          'Recent Transactions',
          'Recent Customers',
          'Recent Payments',
          'Recent Purchase Orders',
          'Recent Stock Movements',
          'Recent Activities',
        ],
      },
      {
        title: 'AI-Powered Business Metrics',
        items: [
          'Estimated Gross Profit',
          'Estimated Net Profit',
          'Daily Revenue',
          'Monthly Revenue',
          'Sales Growth Analysis',
          'Profit Margin Trends',
          'Inventory Value',
          'Business Performance Indicators',
          'Stock Value Analysis',
        ],
      },
      {
        title: 'Financial Overview',
        items: [
          "Today's Income",
          "Today's Expenses",
          'Gross Profit',
          'Net Profit',
          'Receivables',
          'Payables',
          'VAT Summary',
          'Account Balances',
          'Daily Financial Summary',
        ],
      },
    ],
  },
  {
    slug: 'sales',
    name: 'Sales Management',
    nav: 'Sales Management',
    tagline:
      'Cloud Billing Manager simplifies sales operations, improves invoicing efficiency, and provides complete visibility into every customer transaction.',
    description:
      'Cloud Billing Manager simplifies sales operations, improves invoicing efficiency, and provides complete visibility into every customer transaction.',
    groups: [
      {
        title: 'Sales Management',
        items: [
          'Quick Sales Invoice Creation – Create professional sales invoices within seconds using an intuitive and streamlined interface.',
          'Cash Sales Invoices – Instantly generate invoices for walk-in or cash customers.',
          'One-Click Invoice Duplication – Copy previous invoices to save time for customers with recurring orders.',
          'Profit Margin Analysis – View estimated profit and margin while preparing sales invoices to support better pricing decisions.',
          'Load & Weight – Record product quantities, and loading information directly within the invoice.',
          'Customer-Specific Pricing – Configure customer-wise pricing, discounts, promotions, and contract rates.',
          'Assign Vehicle & Driver – Allocate delivery vehicles and drivers directly from the sales invoice',
          'Generate Loading Slips – Automatically prepare loading slips for warehouse staff to ensure accurate order picking and vehicle loading.',
          'Auto Invoice Generation – Automatically generate recurring invoices based on daily, weekly, monthly, or custom schedules.',
          'Draft & Unposted Invoice Workflow – Prepare, review, edit, and approve invoices before posting them to customer accounts.',
          'Invoice Printing & PDF Generation – Print or email professionally branded invoices in PDF format.',
          'Multiple Invoice Templates – Support multiple invoice layouts tailored to individual customer requirements.',
          'Quotations & Price Offers – Create quotations and instantly convert approved quotations into sales invoices.',
          'Sales Order Management – Manage the complete sales order lifecycle from quotation to final delivery.',
        ],
      },
    ],
  },
  {
    slug: 'pricing-engine',
    name: 'Intelligent Customer Pricing Engine',
    nav: 'Pricing Engine',
    tagline: 'unique selling point (USP)',
    description: 'Intelligent Customer Pricing Engine',
    groups: [
      {
        title: 'Intelligent Customer Pricing Engine',
        intro: 'unique selling point (USP)',
        items: [
          'Automatic Customer-Specific Pricing – The system intelligently applies customer-specific product prices based on previous orders, pricing history, or predefined pricing agreements, eliminating manual price selection.',
          "Smart Price Learning – When processing a customer's first order, the selected product prices can be automatically saved and reused for future orders, creating personalized pricing profiles for each customer.",
          'Order History Price Recall – During invoice creation, the system automatically retrieves the last selling price or historical pricing for each product supplied to that customer.',
          'Customer-Wise Product Pricing – Configure individual selling prices for each product against each customer, supporting contract pricing, negotiated rates, promotional pricing, and special discounts.',
          'Intelligent Price Suggestions – The system suggests the most appropriate selling price based on customer history, previous transactions, and existing pricing rules, ensuring consistency and reducing pricing errors.',
          'Margin Protection – Displays estimated profit and profit margin in real time before the invoice is finalized, helping sales teams maintain target profitability.',
          'Complete Pricing History – Maintain a full audit trail of pricing changes and customer-specific product pricing for future reference and reporting.',
        ],
      },
    ],
  },
  {
    slug: 'billing',
    name: 'Customer Billing & Financial Management',
    nav: 'Customer Billing',
    tagline: 'Customer Billing & Financial Management',
    description: 'Customer Billing & Financial Management',
    groups: [
      {
        title: 'Sales Returns & Credit Management',
        items: [
          'Credit Notes – Issue full or partial credit notes against customer invoices.',
          'Sales Returns Management – Process returned products, automatically update inventory, and adjust customer accounts.',
          'Invoice Amendments – Reverse, cancel, delete or correct invoices',
        ],
      },
      {
        title: 'Customer Account Management',
        items: [
          'Customer Account Statements – Generate detailed customer statements for any selected period.',
          'Outstanding Balance Monitoring – View customer balances and overdue invoices in real time.',
          'Credit Limit Management – Define customer credit limits and receive alerts before processing invoices that exceed approved limits.',
          'Customer Payment History – Access a complete record of customer payments and transactions.',
          'Customer Invoice History – View and search all previous invoices, quotations, credit notes, and sales history',
          'Customer Advance Payments – Collect advance payments or deposits from customers before invoices are generated.',
        ],
      },
      {
        title: 'Payment Management',
        items: [
          'Multiple Payment Methods – Accept Cash, Card, Bank Transfer, Cheque, and Other Payments.',
          'Payment Reversal – Reverse incorrect or cancelled customer payments',
          'Invoice Aging Analysis – Identify overdue invoices, payment delays, and outstanding amounts at a glance.',
          'Payment Allocation – Settle multiple invoices in one transaction.',
          'Customer Ledger Integration – Every payment is automatically reflected in the customer ledger',
          'Customer VAT – Calculate VAT automatically based on UK tax rules or from system settings.',
        ],
      },
    ],
  },
  {
    slug: 'purchasing',
    name: 'Purchase Order Management',
    nav: 'Purchase Orders',
    tagline: 'Cloud Billing Manager provides complete control over the entire procurement lifecycle',
    description:
      'Cloud Billing Manager provides complete control over the entire procurement lifecycle',
    groups: [
      {
        title: 'Purchase Order Management',
        items: [
          'Quick Purchase Order Creation – Generate purchase orders in seconds using supplier-specific product pricing and purchasing history.',
          'Purchase Payment Tracking – Record purchases as Paid, Partially Paid, or Due, with complete outstanding balance monitoring.',
          'Email Purchase Orders – Send purchase orders directly to suppliers via email in PDF format, eliminating manual paperwork.',
          'Purchase Order Summary – View complete order details, payment status, delivery status, and supplier information from a single screen.',
          'Purchase Order Verification – Verify quantities, pricing, discounts, VAT, and supplier information before confirming the order.',
          'Recurring Purchase Orders – Automatically generate purchase orders for regularly stocked or frequently ordered products.',
          'Automatic Inventory Update – Stock levels are updated instantly once goods are received and verified.',
          'Stock Verification – Compare received quantities against purchase orders and supplier invoices to ensure accuracy.',
          'Batch & Lot Tracking – Record batch numbers, expiry dates, and manufacturing details',
          'Inventory Cost Update – Automatically update inventory valuation based on the latest purchase costs.',
          'Fully integrated – with Inventory, Warehouse, Supplier Management and Accounting',
        ],
      },
    ],
  },
  {
    slug: 'supplier-payments',
    name: 'Supplier Payments & Financial Management',
    nav: 'Supplier Payments',
    tagline: 'Supplier Payments & Financial Management',
    description: 'Supplier Payments & Financial Management',
    groups: [
      {
        title: 'Supplier Payments & Financial Management',
        items: [
          'Supplier Invoice Payments – Record and manage payments against supplier invoices.',
          'Bulk Supplier Payments – Process payments for multiple supplier invoices in a single transaction, saving time and reducing manual work.',
          'Full & Partial Payments – Support complete or partial settlement of supplier invoices.',
          'Outstanding Payables – Monitor supplier balances, overdue invoices, and pending payments in real time.',
          'Multiple Payment Methods – Support Cash, Bank Transfer, Cheque, Card, and other payment methods.',
          'Payment Allocation – Allocate one payment across multiple invoices or settle multiple invoices simultaneously.',
          'Supplier Credit Notes – Process supplier credit notes and automatically adjust outstanding balances.',
        ],
      },
      {
        title: 'Supplier Financial Management',
        items: [
          'Supplier Account Statements – Generate detailed supplier statements for any selected period.',
          'Supplier Ledger – Maintain a complete ledger of purchases, payments, credit notes, and outstanding balances.',
          'Supplier Transaction History – View complete purchase and payment history for every supplier.',
        ],
      },
    ],
  },
  {
    slug: 'inventory',
    name: 'Stock & Inventory Management',
    nav: 'Inventory',
    tagline: 'Cloud Billing Manager provides a comprehensive inventory management solution',
    description: 'Cloud Billing Manager provides a comprehensive inventory management solution',
    groups: [
      {
        title: 'Item Management',
        items: [
          'Product Master Management',
          'Product Categories',
          'Measurement Units',
          'Product Labels & Barcode Printing',
        ],
      },
      {
        title: 'Warehouse Management',
        items: [
          'Multi-Warehouse Support',
          'Warehouse Allocation',
          'Warehouse-to-Warehouse Stock Transfers',
        ],
      },
      {
        title: 'Inventory Control',
        items: [
          'Real-Time Stock Availability',
          'Automatic Stock Updates',
          'Stock Adjustments & Physical Reconciliation',
          'Customer & Supplier Stock Returns',
        ],
      },
      {
        title: 'Stock History & Traceability',
        items: ['Stock Movement History', 'Product History', 'Complete Product Activity History'],
      },
      {
        title: 'Inventory Reports',
        items: [
          'Stock History Reports',
          'Product History Reports',
          'Warehouse Inventory Reports',
          'Stock Transfer Reports',
          'Stock Adjustment Reports',
        ],
      },
    ],
  },
  {
    slug: 'accounting',
    name: 'Accounting & Financial Management',
    nav: 'Accounting',
    tagline: 'Complete Financial Control with Integrated Accounting',
    description: 'Complete Financial Control with Integrated Accounting',
    groups: [
      {
        title: 'Financial Accounting',
        items: ['Balance Sheet', 'Profit & Loss Statement', 'Cash Flow Statement'],
      },
      {
        title: 'Receivables Management',
        items: [
          'Customer Ledger',
          'Customer Outstanding Balances',
          'Customer Aging Analysis',
          'Customer Account Statements',
          'Payment Receipts',
          'Advance Customer Payments',
          'Credit Notes & Sales Returns',
        ],
      },
      {
        title: 'Payables Management',
        items: [
          'Supplier Ledger',
          'Supplier Outstanding Balances',
          'Supplier Aging Analysis',
          'Supplier Statements',
          'Bulk Supplier Payments',
        ],
      },
      {
        title: 'Income & Expense Management',
        items: [
          'Income Recording',
          'Expense Management',
          'Expense Categories',
          'Petty Cash Management',
          'Financial Transaction History',
        ],
      },
      {
        title: 'Financial Reports',
        items: [
          'General Ledger Reports',
          'Customer & Supplier Ledgers',
          'Income & Expense Reports',
          'Outstanding Receivable & Payable Reports',
          'Cash & Bank Reports',
          'VAT Reports',
          'Profitability Analysis',
          'Financial Dashboard',
        ],
      },
    ],
  },
  {
    slug: 'hr',
    name: 'User & HR Management',
    nav: 'User & HR',
    tagline: 'Empower Your Workforce with Secure Access & Efficient HR Operations',
    description: 'Empower Your Workforce with Secure Access & Efficient HR Operations',
    groups: [
      {
        title: 'Employee Management',
        items: ['Employee Profiles & Records', 'Employee Status & Departments'],
      },
      {
        title: 'Department Management',
        items: [
          'Create & Manage Departments',
          'Team & Organizational Structure',
          'Department-wise Employee Assignment',
        ],
      },
      {
        title: 'Attendance Management',
        items: ['Daily Attendance', 'Attendance History'],
      },
      {
        title: 'Payroll Management',
        items: ['Payroll Processing', 'Payroll History', 'Employee Payments'],
      },
      {
        title: 'Leave & Holiday Management',
        items: ['Holiday Calendar', 'Leave Requests & Approvals'],
      },
      {
        title: 'Role-Based Access Control',
        items: [
          'User Roles & Permissions',
          'Department-wise Access Control',
          'Menu & Module Permissions',
          'User Activity Monitoring',
          'Secure Login & Authentication',
        ],
      },
    ],
  },
  {
    slug: 'customers',
    name: 'Customer Onboarding',
    nav: 'Customer Onboarding',
    tagline: 'Build Strong Business Relationships with Efficient Customer Management',
    description: 'Build Strong Business Relationships with Efficient Customer Management',
    groups: [
      {
        title: 'Customer Onboarding',
        items: [
          'Quick Customer Registration',
          'Customer Categories & Groups',
          'Credit & Cash Customer Setup',
        ],
      },
      {
        title: 'Customer Account Management',
        items: [
          'Manage Customer Profiles',
          'Customer Activities',
          'Customer Account Statements',
          'Customer Account History',
          'Customer Payment History',
          'Customer VAT History & Reports',
        ],
      },
      {
        title: 'Customer Pricing & Credit Control',
        items: [
          'Intelligent Customer-Specific Product Pricing',
          'Contract & Promotional Pricing',
          'Customer Credit Limits',
          'Outstanding Balance Monitoring',
          'Customer Aging Analysis',
          'Customer Receipts & Payment Allocation',
        ],
      },
      {
        title: 'Customer Reports',
        items: [
          'Customer Statements',
          'Aging Reports',
          'Outstanding Balance Reports',
          'Sales History',
          'Customer VAT Reports',
          'Customer Purchase Analysis',
        ],
      },
    ],
  },
  {
    slug: 'suppliers',
    name: 'Supplier Onboarding',
    nav: 'Supplier Onboarding',
    tagline: 'Build Strong Business Relationships with Efficient Supplier Management',
    description: 'Build Strong Business Relationships with Efficient Supplier Management',
    groups: [
      {
        title: 'Supplier Onboarding',
        items: ['Quick Supplier Registration', 'Supplier Categories', 'Supplier Account Setup'],
      },
      {
        title: 'Supplier Account Management',
        items: [
          'Manage Supplier Profiles',
          'Supplier Purchase History',
          'Supplier Statements',
          'Supplier Payment History',
          'Supplier VAT Reports',
          'Supplier Account History',
        ],
      },
      {
        title: 'Supplier Financial Management',
        items: [
          'Supplier Outstanding Balances',
          'Supplier Aging Analysis',
          'Advance Supplier Payments',
          'Bulk Supplier Payments',
          'Supplier Credit Notes',
          'Payment Receipts',
        ],
      },
      {
        title: 'Supplier Reports',
        items: [
          'Purchase History Reports',
          'Supplier Statements',
          'Aging Reports',
          'Outstanding Payable Reports',
          'Supplier VAT Reports',
          'Supplier Performance Analysis',
        ],
      },
    ],
  },
  {
    slug: 'customizable',
    name: 'Fully Customizable System',
    nav: 'Fully Customizable',
    tagline: 'Every business operates differently. Cloud Billing Manager can be customized to suit',
    description:
      'Every business operates differently. Cloud Billing Manager can be customized to suit',
    groups: [
      {
        title: 'Multi-Invoice Templates',
        items: [
          'On Demand Invoice format',
          'Custom Templates',
          'Retail Invoice',
          'Cash Invoice',
          'VAT Invoice',
          'Delivery Note',
        ],
      },
      {
        title: 'Data Import & Export (Excel, CSV, PDF)',
        items: ['Import Products', 'Customers', 'Suppliers', 'Stock', 'Prices', 'Business Reports'],
      },
      {
        title: 'Secure Cloud Platform',
        items: [
          'Cloud Hosted',
          'SSL Encryption',
          'Daily Backup',
          'Role Permissions',
          'Secure Login',
          'No Local Installation',
          'Accessible Anywhere',
        ],
      },
      {
        title: 'System Setting Operate Business',
        items: [
          'Setup Auto Invoice',
          'Invoice Posting/Drafting and verification Step',
          'Currency Setting',
          'VAT Setting',
          'Decimal Point Setting',
          'Invoice creating Setting',
        ],
      },
    ],
  },
  {
    slug: 'pos',
    name: 'Point of Sale (POS)',
    nav: 'Point of Sale (POS)',
    tagline: 'Fast, Smart & Touch-Friendly Retail Billing',
    description: 'Fast, Smart & Touch-Friendly Retail Billing',
    groups: [
      {
        title: 'Fast Billing',
        items: [
          'Quick Sales Invoice Creation',
          'Walk-In (Cash) Customer Billing',
          'DayPass Customer Sales',
          'Credit Customer Billing',
          'Barcode Scanner Support',
          'Product Search by Name, Code & Barcode',
        ],
      },
      {
        title: 'Smart Product Selection',
        items: [
          'Category-Based Product Display',
          'Touch-Friendly POS Interface',
          'Customer-Specific Pricing',
          'Automatic Discounts & Promotions',
          'Real-Time Product Availability',
          'VAT Calculation',
        ],
      },
      {
        title: 'Payment Processing',
        items: [
          'Cash Payments',
          'Card Payments',
          'Bank Transfer Payments',
          'Split & Partial Payments',
          'Customer Advance Adjustments',
          'Instant Payment Receipts',
        ],
      },
      {
        title: 'Real-Time Integration',
        items: [
          'Automatic Inventory Updates',
          'Customer Ledger Updates',
          'Accounting Integration',
          'Sales History',
          'Daily Cash Closing',
          'POS Sales Reports',
        ],
      },
    ],
  },
]

export const pricingEngineFeatures = modules.find((module) => module.slug === 'pricing-engine')
  ?.groups[0].items ?? []

export const benefits = [
  'Reduce invoicing time',
  'Improve stock accuracy',
  'Real-time reporting',
  'Lower operating costs',
  'Better customer service',
  'Improved cash flow',
  'Centralized business management',
  'Remote working',
  'Scalable platform',
] as const

export const whyUs = [
  'Industry Expertise',
  'Dedicated Support',
  'Regular Updates',
  'Cloud Infrastructure',
  'Custom Development',
  'UK Distribution Experience',
  'Long-Term Partnership',
] as const
