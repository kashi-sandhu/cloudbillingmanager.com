import { getBlogArticle, getBlogCategory } from './blog.ts'
import { modules } from './content.ts'
import { getIndustryPageSeo } from './industrySeo.ts'
import { getModulePageSeo } from './pageSeo.ts'

/** Canonical brand suffix — every indexable page title ends with this (Google title best practice). */
export const SEO_BRAND = 'Cloud Billing Manager'

export const SEO_DOMAIN = 'cloudbillingmanager.com'

/** Site-wide content review date (ISO) — used when no page-specific date exists. */
export const SEO_SITE_LAST_REVIEW = '2026-09-02'

/** Google Search Console — recommended sitemap to submit. */
export const SEO_GSC_SITEMAP = 'https://cloudbillingmanager.com/sitemap-index.xml'

/** Google recommended title length (warning threshold). */
export const SEO_TITLE_MAX = 60

/** Google snippet description target. */
export const SEO_DESCRIPTION_MAX = 160

/**
 * Professional page title: "{Topic} | Cloud Billing Manager"
 * Skips re-appending when the brand is already present.
 */
export function seoPageTitle(topic: string): string {
  const trimmed = topic.trim()
  if (trimmed.includes(SEO_BRAND)) return trimmed
  return `${trimmed} | ${SEO_BRAND}`
}

/** Homepage, press and demo official-title pattern. */
export function seoOfficialTitle(suffix = 'Official Site'): string {
  return `${SEO_BRAND} | ${suffix} — ${SEO_DOMAIN}`
}

/** Trim meta descriptions to Google-friendly length without cutting mid-word. */
export function seoDescription(text: string, max = SEO_DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  const base = lastSpace > 80 ? cut.slice(0, lastSpace) : cut
  return `${base.trim()}…`
}

/** Append a commercial CTA when there is room in the snippet budget. */
export function seoPremiumDescription(base: string, cta = 'Book a demo at cloudbillingmanager.com.'): string {
  const clean = base.replace(/\s+/g, ' ').trim()
  const separator = clean.endsWith('.') ? ' ' : '. '
  const combined = `${clean}${separator}${cta}`
  return seoDescription(combined)
}

/** ISO 8601 datetime for Open Graph and schema (date-only input gets UTC midnight). */
export function formatLastModifiedIso(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}T/.test(value)) return value
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return `${value}T00:00:00+00:00`
  return SEO_SITE_LAST_REVIEW
}

/** Last-modified date for structured data and og:updated_time. */
export function getPageLastModified(pathname: string): string {
  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/)
  if (blogMatch && blogMatch[1] !== 'category') {
    const article = getBlogArticle(blogMatch[1])
    if (article) return article.updatedAt
  }
  return SEO_SITE_LAST_REVIEW
}

export function getPageLastModifiedIso(pathname: string): string {
  return formatLastModifiedIso(getPageLastModified(pathname))
}

/** Page-specific Open Graph / Twitter image alt text (premium, unique per route). */
export function getPageOgImageAlt(pathname: string, pageTitle: string): string {
  const moduleMatch = pathname.match(/^\/platform\/([^/]+)$/)
  if (moduleMatch) {
    const moduleSeo = getModulePageSeo(moduleMatch[1])
    const module = modules.find((item) => item.slug === moduleMatch[1])
    if (moduleSeo && module) {
      return `${moduleSeo.h1} — ${SEO_BRAND} ${module.nav.toLowerCase()} module for UK food distributors`
    }
  }

  const industryMatch = pathname.match(/^\/industries\/([^/]+)$/)
  if (industryMatch) {
    const industrySeo = getIndustryPageSeo(industryMatch[1])
    if (industrySeo) {
      return `${industrySeo.name} ERP — ${SEO_BRAND} for UK food distribution (${SEO_DOMAIN})`
    }
  }

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/)
  if (blogMatch && blogMatch[1] !== 'category') {
    const article = getBlogArticle(blogMatch[1])
    if (article) return article.imageAlt
  }

  const categoryMatch = pathname.match(/^\/blog\/category\/([^/]+)$/)
  if (categoryMatch) {
    const category = getBlogCategory(categoryMatch[1])
    if (category) return `${category.name} guides — ${SEO_BRAND} blog`
  }

  if (pathname === '/') {
    return `${SEO_BRAND} — official cloud ERP for UK food distributors (${SEO_DOMAIN})`
  }

  if (pathname === '/demo') {
    return `Book a ${SEO_BRAND} client demo — inventory, billing and POS for UK distributors`
  }

  const shortTitle = pageTitle.replace(/\s*\|\s*Cloud Billing Manager.*$/i, '').trim()
  return `${shortTitle || SEO_BRAND} — ${SEO_DOMAIN}`
}

/** Twitter card label2 value by page type — premium contextual metadata. */
export function getPageTwitterContext(pathname: string): { label: string; value: string } {
  if (pathname === '/') return { label: 'Official site', value: SEO_DOMAIN }
  if (pathname === '/demo') return { label: 'Action', value: 'Book a demo' }
  if (pathname.startsWith('/platform/')) return { label: 'Module', value: 'Cloud ERP' }
  if (pathname.startsWith('/industries/')) return { label: 'Industry', value: 'Food distribution UK' }
  if (pathname.startsWith('/blog/')) return { label: 'Content', value: 'Expert guides' }
  if (pathname.startsWith('/resources')) return { label: 'Resource', value: 'Free guides' }
  if (pathname === '/pricing') return { label: 'Pricing', value: 'Monthly GBP plans' }
  return { label: 'Website', value: SEO_DOMAIN }
}
