export type PricingFeatureValue = boolean | string

export type PricingPlanId = 'starter' | 'business' | 'advanced'

export type PricingPlan = {
  id: PricingPlanId
  name: string
  price: string
  period: string
  summary: string
  popular?: boolean
  cta: { label: string; to: string }
  highlights: string[]
}

export type PricingComparisonRow = {
  feature: string
  starter: PricingFeatureValue
  business: PricingFeatureValue
  advanced: PricingFeatureValue
}

export const pricingPageCopy = {
  eyebrow: 'Pricing',
  title: 'Cloud Billing Manager Pricing',
  subtitle: 'Choose the plan that fits your business',
  intro:
    'Simple, flexible cloud billing and distribution management — with no complicated setup.',
  tableTitle: 'Compare plans in detail',
  tableText: 'Every plan includes core billing, inventory and cloud access. Higher plans unlock logistics, accounting depth and full HR/payroll.',
  note: 'All prices are in GBP and billed monthly. Need a tailored rollout? Book a demo and we will recommend the right plan for your operation.',
} as const

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '£59',
    period: '/ month',
    summary: 'For small distributors and businesses getting started',
    cta: { label: 'Get Started', to: '/demo' },
    highlights: [
      '1 user',
      'Up to 20 invoices per day',
      'Sales invoicing',
      'Customer & supplier management',
      'Purchase orders',
      'Inventory & warehouse management',
      'Customer payments',
      'VAT & basic reports',
      'POS',
      'Cloud-based access',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    price: '£99',
    period: '/ month',
    summary: 'For growing distribution businesses',
    popular: true,
    cta: { label: 'Start Business Plan', to: '/demo' },
    highlights: [
      'Everything in Starter, plus:',
      'Up to 4 users',
      'Up to 100 invoices per day',
      'Logistics management',
      'Loading slips',
      'Vehicle & driver assignment',
      'Advanced customer controls',
      'Customer-specific pricing',
      'Credit limits & sales restrictions',
      'Advanced Payments & reports',
      'Multiple invoice templates',
      'Advanced user permissions',
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    price: '£199',
    period: '/ month',
    summary: 'Complete cloud ERP for growing distribution businesses',
    cta: { label: 'Choose Advanced', to: '/demo' },
    highlights: [
      'Everything in Business, plus:',
      'Unlimited users',
      'Unlimited daily invoices',
      'Complete employee management',
      'Departments',
      'Attendance',
      'Leave management',
      'Payroll',
      'Holiday calendar',
      'Advanced roles & permissions',
      'Advanced financial management',
      'Fully customisable invoice templates',
      'Complete sales, purchase, inventory & logistics control',
    ],
  },
]

export const pricingComparisonRows: PricingComparisonRow[] = [
  { feature: 'Price', starter: '£59 / month', business: '£99 / month', advanced: '£199 / month' },
  { feature: 'Users', starter: '1 User', business: 'Up to 4 Users', advanced: 'Unlimited Users' },
  { feature: 'Daily Invoices', starter: '20 / day', business: '100 / day', advanced: 'Unlimited' },
  { feature: 'Customer Management', starter: true, business: true, advanced: true },
  { feature: 'Supplier Management', starter: true, business: true, advanced: true },
  { feature: 'Sales Invoicing', starter: true, business: true, advanced: true },
  { feature: 'Quotations', starter: true, business: true, advanced: true },
  { feature: 'Credit Notes', starter: true, business: true, advanced: true },
  { feature: 'Customer Payments', starter: true, business: true, advanced: true },
  { feature: 'Purchase Orders', starter: true, business: true, advanced: true },
  { feature: 'Inventory Management', starter: true, business: true, advanced: true },
  { feature: 'Warehouse Management', starter: true, business: true, advanced: true },
  { feature: 'Stock Transfers & Adjustments', starter: true, business: true, advanced: true },
  { feature: 'Sales & Purchase Reports', starter: true, business: true, advanced: true },
  { feature: 'Product Price Control', starter: true, business: true, advanced: true },
  { feature: 'Customer Statements & Aging', starter: true, business: true, advanced: true },
  { feature: 'VAT Management & Reports', starter: true, business: true, advanced: true },
  { feature: 'POS', starter: true, business: true, advanced: true },
  { feature: 'Logistics / Loading Slips', starter: false, business: true, advanced: true },
  { feature: 'Vehicle & Driver Management', starter: false, business: true, advanced: true },
  { feature: 'Advanced Payment', starter: false, business: true, advanced: true },
  { feature: 'Employee Management', starter: false, business: false, advanced: true },
  { feature: 'Attendance', starter: false, business: false, advanced: true },
  { feature: 'Leave Management', starter: false, business: false, advanced: true },
  { feature: 'Payroll', starter: false, business: false, advanced: true },
  { feature: 'Roles & Permissions', starter: 'Basic', business: 'Advanced', advanced: 'Advanced' },
  { feature: 'Invoice Templates', starter: 'Standard', business: 'Multiple', advanced: 'Fully Customisable' },
  { feature: 'Cloud Access', starter: true, business: true, advanced: true },
]
