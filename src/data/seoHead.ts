import { brand } from './brand.ts'
import { company } from './content.ts'

/** Verified entity URLs for Organization schema (no layout impact). */
export const entitySameAs = [
  company.website.replace(/\/$/, ''),
  company.groupSite,
  'https://www.linkedin.com/company/avantcore/',
  'https://www.facebook.com/share/1D8UoyVNHh/',
] as const

/** Shared head/meta constants (AVANTCORE-style indexing signals — no layout impact). */
export const seoRobotsIndex =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

export const seoRobotsNoindex = 'noindex, nofollow'

export const seoGooglebotIndex = 'index, follow'

export const seoBingbotIndex = 'index, follow'

export const seoGooglebotNoindex = 'noindex, nofollow'

export const seoBingbotNoindex = 'noindex, nofollow'

/** Brand-focused keywords — all common search spellings (not generic industry spam). */
export const brandSeoKeywords = [...new Set([brand.name, ...brand.alternateNames])].join(', ')

export const defaultSeoKeywords = `${brandSeoKeywords}, food distribution ERP, inventory billing software UK, billing software UK, AVANTCORE Technologies`

/** Stockley Park, Uxbridge — head office coordinates for geo meta. */
export const seoGeoIcbm = '51.5031, -0.4477'

export const defaultOgImagePath = '/images/og/cloudbillingmanager-og.jpg'

export const defaultOgImageType = 'image/jpeg'

export const defaultOgImageAlt =
  'Cloud Billing Manager — cloud ERP for UK food distributors (cloudbillingmanager.com)'

/** Static Organization + WebSite JSON-LD for index.html (before React hydrates). */
export function buildStaticHeadJsonLd(siteUrl: string) {
  return {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: company.presenter,
      url: company.groupSite,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/brand/cloudbillingmanager-logo.png`,
      },
      email: company.email,
      brand: {
        '@type': 'Brand',
        name: brand.name,
        alternateName: [...brand.alternateNames],
        url: siteUrl,
      },
      sameAs: [...entitySameAs],
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: brand.name,
      alternateName: [...brand.alternateNames],
      url: siteUrl,
      inLanguage: 'en-GB',
      publisher: { '@id': `${siteUrl}/#organization` },
    },
  }
}

export function isNoindexRobots(robots?: string) {
  return robots?.includes('noindex') ?? false
}
