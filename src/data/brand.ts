import { company } from './content.ts'

/** Canonical brand entity — used in JSON-LD, meta, press kit and llms.txt. */
export const brand = {
  name: company.product,
  domain: 'cloudbillingmanager.com',
  url: company.website.replace(/\/$/, ''),
  /** Common spellings people type in Google (brand — not generic industry terms). */
  alternateNames: [
    'Cloud Billing Manager',
    'CloudBilling Manager',
    'Cloud BillingManager',
    'CloudBillingManager',
    'cloudbillingmanager',
    'cloudbillingmanager.com',
    'cloud billing manager',
    'cloud billingmanager',
    'cloudbilling manager',
    'CBM',
  ] as const,
} as const

/** Visible on homepage / about — one line, no keyword stuffing. */
export const brandOfficialLine =
  'Official website: cloudbillingmanager.com — presented by AVANTCORE Technologies.'

/** Human-readable list for press kit and entity pages. */
export const brandAlsoKnownAs =
  'Cloud Billing Manager, CloudBilling Manager, Cloud BillingManager, CloudBillingManager, cloudbillingmanager, cloudbillingmanager.com, cloud billing manager, cloud billingmanager, cloudbilling manager, CBM'

export const brandPressBoilerplate = `${company.positioning} The official product website is ${brand.url}. ${brand.name} is presented by ${company.presenter}, based in ${company.office}.`

/** Queries to monitor in Search Console after deploy (realistic expectations). */
export const brandSearchQueries = {
  strong: ['cloudbillingmanager', 'cloudbillingmanager.com', '"Cloud Billing Manager"', 'Cloud Billing Manager AVANTCORE'],
  developing: ['cloud billing manager', 'cloud billingmanager', 'cloudbilling manager'],
  competitive: ['cloud billing manager software', 'cloud billing software UK'],
} as const
