/**
 * Phase 10 — SEO master audit summary, change control and roadmaps.
 * Scores are auditor judgments from the codebase audit — NOT Google ranking scores.
 * Search Console / Analytics figures are unavailable in-repo; do not invent them.
 */

export const seoHealthScore = {
  technical: 8.5,
  onPage: 8,
  content: 7.5,
  semantic: 8,
  internalLinking: 7.5,
  authority: 4.5,
  performance: 7,
  structuredData: 8.5,
  trustEntity: 8,
  analytics: 5.5,
  /** Weighted overall (see Phase 10 formula). */
  overall: 7.4,
  notes: 'Authority and analytics remain the largest external gaps until GSC/GA and genuine outreach data exist.',
} as const

export const seoChangeControl = [
  'Do not change titles on pages that are ranking or converting without Search Console evidence.',
  'Do not retarget URLs without a 301 plan and updated sitemap/internal links.',
  'Do not create a page for every keyword variation.',
  'Do not delete indexed pages without traffic/indexing review.',
  'Ship large SEO changes in tracked batches; record them in public/seo/seo-changelog.csv.',
  'Never invent rankings, reviews, customer counts, awards or backlink metrics.',
  'Keep company.positioning / About / schema descriptions consistent.',
  'Prefer improving existing pages before adding new URLs.',
] as const

export const monthlySeoChecklist = [
  {
    week: 1,
    focus: 'Search Console & Analytics',
    tasks: [
      'Review queries, pages, countries (UK), and coverage',
      'Export impressions/CTR/position — do not invent',
      'Check GA4 demo/contact conversion events',
    ],
  },
  {
    week: 2,
    focus: 'Content optimization',
    tasks: [
      'Refresh 1–2 pages with impressions but weak CTR',
      'Strengthen CTAs on commercial landing pages',
      'Add internal links from new blog/resources to product hubs',
    ],
  },
  {
    week: 3,
    focus: 'Technical audit',
    tasks: [
      'Run npm run seo:audit and production build',
      'Validate robots.txt + sitemap.xml on the live canonical host',
      'Spot-check structured data and canonicals on key URLs',
    ],
  },
  {
    week: 4,
    focus: 'Authority & conversion',
    tasks: [
      'Log outreach in outreach-tracker-template.csv',
      'Review demo/contact form completion quality',
      'Plan next month’s content from real query gaps',
    ],
  },
] as const

export const roadmap30Days = [
  {
    week: 1,
    tasks: [
      'Deploy Phase 10 industry uniqueness + vercel static-file rewrite safety',
      'Confirm live robots.txt lists sitemap-pages.xml AND sitemap.xml',
      'Verify sitemap-pages.xml returns 200 on production (not 500 / SPA HTML)',
      'Enable Domain property GSC + optional GA4 env vars if not live',
    ],
  },
  {
    week: 2,
    tasks: [
      'Add FAQs to pricing-engine and supplier-payments module pages if demos validate claims',
      'Tighten Home → Inventory/Billing/POS commercial CTAs using real GSC landing pages',
      'Ensure press/about NAP matches schema',
    ],
  },
  {
    week: 3,
    tasks: [
      'Add contextual links from industry pages to inventory guide + checklist',
      'Review blog featured images vs product relevance',
      'Fix any orphan resource pages via footer/hub checks',
    ],
  },
  {
    week: 4,
    tasks: [
      'Instrument and verify demo/contact conversion events in GA4 DebugView',
      'Baseline Core Web Vitals after deploy (field data when available)',
      'Log changelog entries for Phase 10',
    ],
  },
] as const

export const roadmap90Days = [
  {
    month: 1,
    theme: 'Technical + on-page',
    outcomes: ['Stable crawl/index signals', 'Unique industry pages indexed', 'Measurement live'],
  },
  {
    month: 2,
    theme: 'Content + authority',
    outcomes: [
      '1 comparison or workflow guide refreshed from real queries',
      'Manual outreach started (no automated link schemes)',
      'Hub-and-spoke links reinforced',
    ],
  },
  {
    month: 3,
    theme: 'Optimization + conversion',
    outcomes: [
      'CTR improvements on pages with impressions',
      'Demo conversion path reviewed',
      'Next content backlog driven by GSC only',
    ],
  },
] as const

export const roadmap180Days = [
  { month: 1, theme: 'Foundation — crawl, index, measurement, industry uniqueness' },
  { month: 2, theme: 'Content — deepen inventory/billing/POS clusters from queries' },
  { month: 3, theme: 'Authority — ethical mentions, press, partner resources' },
  { month: 4, theme: 'Content expansion — only high-value guides (no doorway pages)' },
  { month: 5, theme: 'Conversion — demo UX, trust, pricing clarity if publishable' },
  { month: 6, theme: 'Scale — double-down on winning pages; prune losers with data' },
] as const

export const competitorNotes = [
  {
    name: 'Larder (larderhq.com)',
    relevance: 'UK food wholesale ERP positioning (stock → invoice)',
    strengths: 'Strong food-wholesale messaging, workflow narrative, industry focus',
    weaknesses: 'Different product/stack; not a generic inventory SaaS page farm',
    opportunity: 'CBM can emphasize combined inventory + billing + POS for UK food distribution with clear entity facts',
  },
  {
    name: 'FoodERP / Vallestra (fooderp.co.uk)',
    relevance: 'UK food & beverage ERP on Sage X3 for distributors',
    strengths: 'Compliance/traceability depth, distributor industry pages',
    weaknesses: 'Enterprise/Sage-oriented; heavier positioning',
    opportunity: 'CBM can contrast cloud simplicity and demo-led evaluation without fake competitor claims',
  },
  {
    name: 'Orderwise (orderwise.co.uk)',
    relevance: 'UK wholesale/distribution ERP with stock-centric messaging',
    strengths: 'Broad wholesale authority, stock-heavy buyer education',
    weaknesses: 'Broader than food-only; larger brand footprint',
    opportunity: 'CBM should own food-distribution + billing/POS specificity rather than generic wholesale keywords alone',
  },
] as const

export const keywordGapCandidates = [
  {
    keyword: 'food distribution ERP UK',
    intent: 'commercial',
    targetPage: '/industries or /',
    status: 'Partial — homepage/industry coverage; deepen with unique industry pages',
    priority: 'High',
    searchVolume: 'Search volume unavailable',
  },
  {
    keyword: 'frozen food distributor software',
    intent: 'commercial',
    targetPage: '/industries/frozen-foods',
    status: 'Improved in Phase 10 with unique copy',
    priority: 'High',
    searchVolume: 'Search volume unavailable',
  },
  {
    keyword: 'wholesale inventory and billing software',
    intent: 'commercial',
    targetPage: '/platform + /industries/wholesale-businesses',
    status: 'Covered across modules; strengthen wholesale industry page CTAs',
    priority: 'High',
    searchVolume: 'Search volume unavailable',
  },
  {
    keyword: 'cash and carry POS inventory software',
    intent: 'commercial',
    targetPage: '/platform/pos',
    status: 'POS + inventory cluster exists; keep POS↔inventory linking',
    priority: 'Medium',
    searchVolume: 'Search volume unavailable',
  },
  {
    keyword: 'replace Sage food distribution software',
    intent: 'commercial investigation',
    targetPage: '/why',
    status: 'Why page mentions Sage replacement; avoid unsupported claims',
    priority: 'Medium',
    searchVolume: 'Search volume unavailable',
  },
] as const
