/**
 * SEO monitoring frameworks for Cloud Billing Manager.
 * Search Console / Analytics numbers must be filled from real exports — never invent rankings.
 */

export const seoKpis = {
  visibility: ['impressions', 'indexed_pages', 'ranking_keywords', 'average_position'],
  traffic: ['organic_sessions', 'organic_users', 'organic_landing_pages', 'referral_sessions'],
  engagement: ['engagement_rate', 'average_engagement_time', 'key_page_interactions'],
  conversion: [
    'demo_request_submit',
    'contact_form_submit',
    'cta_click_demo',
    'cta_click_contact',
  ],
  authority: ['referring_domains', 'relevant_backlinks', 'brand_mentions'],
} as const

export const keywordGroups = {
  A: { label: 'Page 1', positions: '1–10', goal: 'Maintain and improve CTR/content freshness' },
  B: { label: 'Near page 1', positions: '11–20', goal: 'Highest optimization priority' },
  C: { label: 'Developing', positions: '21–50', goal: 'Content, internal links, topical coverage' },
  D: { label: 'Low visibility', positions: '51+', goal: 'Reassess targeting or consolidate' },
} as const

export const conversionEvents = [
  { name: 'cta_click', description: 'Primary CTA clicked (demo/contact/platform)' },
  { name: 'contact_form_start', description: 'User focuses first field on contact form' },
  { name: 'contact_form_submit', description: 'Contact enquiry successfully submitted' },
  { name: 'demo_form_start', description: 'User focuses first field on demo form' },
  { name: 'demo_form_submit', description: 'Demo request successfully submitted' },
  { name: 'resource_view', description: 'Resources or checklist page viewed' },
] as const

export const deploymentSeoChecklist = [
  'robots.txt still allows public pages and references sitemap',
  'sitemap.xml builds and lists only public canonical URLs',
  'Homepage and key marketing pages are index,follow (not noindex)',
  '404 / unknown routes remain noindex',
  'Canonical URLs use https://cloudbillingmanager.com',
  'Unique titles and meta descriptions still present',
  'H1 present on key templates',
  'Structured data JSON-LD still injects without syntax errors',
  'Internal CTAs to /demo and /contact still work',
  'Production build succeeds',
] as const

export const monthlyReportSections = [
  'Executive summary (improved / declined / attention)',
  'Organic traffic vs previous period',
  'Search visibility (impressions, average position)',
  'Top keywords',
  'Top landing pages',
  'Near-page-1 opportunities (positions 11–20)',
  'High-impression / low-CTR pages',
  'Technical issues from seo:audit',
  'Content decay candidates',
  'Backlinks / brand mentions (if data available)',
  'Organic conversions (demo + contact)',
] as const

export const gscVerificationInstructions = [
  'Create a Domain property for cloudbillingmanager.com in Google Search Console.',
  'Prefer DNS verification (TXT record) at the domain registrar.',
  'After verification, submit https://cloudbillingmanager.com/sitemap.xml',
  'Confirm robots.txt is fetchable and does not block important paths.',
  'Use URL Inspection on homepage, /platform/inventory, /demo, and /resources.',
  'Optional HTML-tag verification: set VITE_GSC_VERIFICATION in the deployment environment.',
] as const

export const analyticsSetupInstructions = [
  'Create a GA4 property for Cloud Billing Manager.',
  'Copy the Measurement ID (G-XXXXXXXX).',
  'Set VITE_GA_MEASUREMENT_ID in the hosting environment (never commit secrets unnecessarily).',
  'Redeploy. Analytics loads only when the env var is present.',
  'Verify page_view and conversion events in GA4 DebugView.',
  'Do not send emails, phones, messages, or passwords as event parameters.',
] as const
