/**
 * Media registry for Phase 8 image/video SEO.
 * Prefer WebP where available; keep descriptive filenames for new assets.
 */

export type MediaAsset = {
  src: string
  fallback?: string
  alt: string
  width?: number
  height?: number
  purpose: 'brand' | 'hero' | 'product' | 'og' | 'blog' | 'decorative'
  indexable?: boolean
  caption?: string
}

export const brandLogo: MediaAsset = {
  src: '/images/brand/cloudbillingmanager-logo.webp',
  fallback: '/images/brand/cloudbillingmanager-logo.png',
  alt: 'Cloud Billing Manager logo — official cloudbillingmanager.com brand',
  width: 1600,
  height: 914,
  purpose: 'brand',
  indexable: true,
}

/** Square mark for Google Search favicon / Organization schema. */
export const brandIcon: MediaAsset = {
  src: '/images/brand/cloudbillingmanager-icon.png',
  alt: 'Cloud Billing Manager icon',
  width: 512,
  height: 512,
  purpose: 'brand',
  indexable: true,
}

export const defaultSocialImage = '/images/og/cloudbillingmanager-og.jpg'

export const salesInvoiceScreenshot: MediaAsset = {
  src: '/images/products/cloudbillingmanager-sales-invoice.webp',
  fallback: '/invoiceg.webp',
  alt: 'Cloud Billing Manager sales invoice screen showing invoice header, line items and totals',
  width: 1122,
  height: 1402,
  purpose: 'product',
  indexable: true,
  caption: 'Cloud Billing Manager sales invoice view used for customer billing and order documentation.',
}

export const posWorkstationScreenshot: MediaAsset = {
  src: '/images/products/cloudbillingmanager-pos-workstation.webp',
  fallback: '/images/products/cloudbillingmanager-pos-workstation.png',
  alt: 'Cloud Billing Manager POS workstation with laptop billing screen, barcode scanner and receipt printer',
  width: 1462,
  height: 1076,
  purpose: 'product',
  indexable: true,
  caption:
    'Touch-friendly POS billing with product categories, barcode scanning and printed invoice — designed for cash & carry and retail counters.',
}

/** Meaningful images eligible for image sitemap entries (public product/brand assets only). */
export const indexableImages: MediaAsset[] = [
  brandLogo,
  brandIcon,
  salesInvoiceScreenshot,
  posWorkstationScreenshot,
  {
    src: '/images/og/cloudbillingmanager-og.jpg',
    alt: 'Cloud Billing Manager — inventory, billing and POS for UK food distributors',
    width: 1200,
    height: 630,
    purpose: 'og',
    indexable: true,
  },
  {
    src: '/banners/inventory.webp',
    fallback: '/banners/inventory.jpg',
    alt: 'Food distribution warehouse shelving with grocery cartons and crates',
    purpose: 'hero',
    indexable: true,
  },
  {
    src: '/banners/billing.webp',
    fallback: '/banners/billing.jpg',
    alt: 'Billing and customer account operations for distributors',
    purpose: 'hero',
    indexable: true,
  },
  {
    src: '/banners/pos.webp',
    fallback: '/banners/pos.jpg',
    alt: 'Point of sale counter billing environment',
    purpose: 'hero',
    indexable: true,
  },
  {
    src: '/banners/dashboard.webp',
    fallback: '/banners/dashboard.jpg',
    alt: 'Business operations dashboard context for sales and inventory visibility',
    purpose: 'hero',
    indexable: true,
  },
]

export const videoStrategy = {
  existingVideos: [] as const,
  hasYouTubeChannel: false,
  recommendedVideos: [
    {
      title: 'Cloud Billing Manager overview for UK food distributors',
      topic: 'Product overview',
      relatedPage: '/platform',
    },
    {
      title: 'How to manage inventory in Cloud Billing Manager',
      topic: 'Inventory',
      relatedPage: '/platform/inventory',
    },
    {
      title: 'How to create a sales invoice in Cloud Billing Manager',
      topic: 'Sales / invoicing',
      relatedPage: '/platform/sales',
    },
    {
      title: 'How POS updates inventory in Cloud Billing Manager',
      topic: 'POS',
      relatedPage: '/platform/pos',
    },
    {
      title: 'Purchase-to-stock workflow in Cloud Billing Manager',
      topic: 'Purchasing',
      relatedPage: '/platform/purchasing',
    },
    {
      title: 'Tracking unpaid invoices in Cloud Billing Manager',
      topic: 'Billing',
      relatedPage: '/platform/billing',
    },
  ],
  notes:
    'Do not publish VideoObject schema until real videos exist with accurate titles, thumbnails, durations and upload dates.',
} as const

export const multimediaCalendar = [
  { week: 1, item: 'Record inventory dashboard walkthrough (screen capture only)' },
  { week: 2, item: 'Publish inventory workflow graphic (HTML + SVG already on guide)' },
  { week: 3, item: 'Record how-to-track-stock video; add transcript on inventory page' },
  { week: 4, item: 'Capture billing / collections screens with anonymised demo data' },
  { week: 5, item: 'Invoice creation tutorial with captions' },
  { week: 6, item: 'POS + inventory relationship short video' },
  { week: 7, item: 'Sales-to-inventory workflow graphic refresh' },
  { week: 8, item: 'Purchase-to-stock receipt walkthrough' },
  { week: 9, item: 'Dashboard reports walkthrough' },
  { week: 10, item: 'Promote inventory checklist with supporting screenshots' },
  { week: 11, item: 'End-to-end client demo recording for /demo page' },
  { week: 12, item: 'Full product overview video + dedicated supporting page' },
] as const

/** Map a path (with or without extension) to preferred WebP + raster fallback. */
export function withWebpFallback(path: string): { webp: string; fallback: string } {
  if (path.endsWith('.webp')) {
    const fallback = path.replace(/\.webp$/, '.jpg')
    return { webp: path, fallback }
  }
  if (/\.jpe?g$/i.test(path)) {
    return { webp: path.replace(/\.jpe?g$/i, '.webp'), fallback: path }
  }
  if (/\.png$/i.test(path)) {
    return { webp: path.replace(/\.png$/i, '.webp'), fallback: path }
  }
  return { webp: `${path}.webp`, fallback: path }
}
