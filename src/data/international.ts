/**
 * Phase 9 — International / GEO strategy (decision record).
 * Do not invent traffic figures. GSC/GA data is not in this repository.
 */

export const internationalStrategy = {
  approach: 'single-market' as const,
  primaryMarket: {
    country: 'United Kingdom',
    countryCode: 'GB',
    language: 'English',
    languageTag: 'en-GB',
    currencyContext: 'GBP (£) used in product UI demos where amounts appear',
    pricingPublic: false,
    notes:
      'Head office is in London. Product copy, forms, demos and NAP target UK food distribution businesses.',
  },
  /** Markets considered but NOT given separate URL trees or hreflang. */
  deferredMarkets: [
    {
      market: 'English-speaking international (IE, AU, etc.)',
      productRelevance: 'Possible later if product is sold there',
      businessRelevance: 'No confirmed localized operations or content yet',
      priority: 'Low',
      action: 'Do not create country folders until genuine localization exists',
    },
    {
      market: 'Pakistan / Urdu',
      productRelevance: 'Not the current public market positioning',
      businessRelevance: 'Prior phases explicitly avoided PK doorway pages',
      priority: 'Do not target',
      action: 'No /pk/, /ur/, or translated doorways',
    },
  ],
  urlArchitecture: 'Single host https://cloudbillingmanager.com with English (en-GB) content only',
  hreflang: 'Not implemented — no alternate language or regional page versions exist',
  searchConsoleRecommendation: [
    'Use a Domain property for cloudbillingmanager.com (covers www and non-www after redirects)',
    'Monitor Countries filter for United Kingdom first',
    'Monitor Queries and Pages for inventory/billing/POS intents',
    'Do not invent impressions, CTR or rankings in reports',
  ],
  analyticsRecommendation: [
    'GA4 (optional via VITE_GA_MEASUREMENT_ID) already supports country and landing-page dimensions',
    'Review Consent Mode / cookie requirements before enabling advertising features',
    'Do not collect unnecessary personal data in events',
  ],
} as const

export const marketAuditRows = [
  {
    market: 'United Kingdom',
    existingTraffic: 'Not available in repo — check Search Console/GA after deploy',
    productRelevance: 'High — food distribution ERP positioning',
    businessRelevance: 'High — London office, UK phone, GBP demo context',
    priority: 'Primary',
  },
  {
    market: 'Other English-speaking countries',
    existingTraffic: 'Unknown without analytics export',
    productRelevance: 'Medium — similar language, unconfirmed go-to-market',
    businessRelevance: 'Low until sales coverage is confirmed',
    priority: 'Watch only',
  },
  {
    market: 'Non-English locales',
    existingTraffic: 'Unknown',
    productRelevance: 'Unconfirmed',
    businessRelevance: 'No reviewed translations',
    priority: 'Do not build yet',
  },
] as const

export const contentGapsByMarket = [
  {
    market: 'United Kingdom',
    topic: 'Official About / entity page',
    existingContent: 'Homepage FAQs, Press boilerplate, Why CBM',
    gap: 'Dedicated About with company + product facts in HTML',
    priority: 'High — implemented in Phase 9',
  },
  {
    market: 'United Kingdom',
    topic: 'Public pricing by currency',
    existingContent: 'Demo CTA only',
    gap: 'No public price list — do not invent Offer prices',
    priority: 'Deferred until pricing is publishable',
  },
  {
    market: 'United Kingdom',
    topic: 'Stock control terminology (UK English)',
    existingContent: 'Inventory/stock guides and glossary',
    gap: 'Maintain stock/inventory synonym usage naturally',
    priority: 'Ongoing',
  },
] as const
