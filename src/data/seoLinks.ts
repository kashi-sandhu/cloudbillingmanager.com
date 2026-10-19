import { company } from './content.ts'
import { siteUrl } from './seo.ts'

export type SeoLinkTag = {
  rel: string
  href: string
  type?: string
  title?: string
  hreflang?: string
  crossOrigin?: '' | 'anonymous' | 'use-credentials'
}

/** Performance — GA4 / analytics (when enabled). */
export const seoPreconnectLinks: readonly SeoLinkTag[] = [
  { rel: 'preconnect', href: 'https://www.googletagmanager.com', crossOrigin: 'anonymous' },
  { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
  { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
]

/** Favicon, manifest — Cloud Billing Manager logo (square PNGs for Google Search). */
export const seoAssetLinks: readonly SeoLinkTag[] = [
  { rel: 'icon', href: `${siteUrl}/favicon-48.png`, type: 'image/png', title: '48x48' },
  { rel: 'icon', href: `${siteUrl}/favicon-192.png`, type: 'image/png', title: '192x192' },
  {
    rel: 'apple-touch-icon',
    href: `${siteUrl}/apple-touch-icon.png`,
    title: 'Cloud Billing Manager',
  },
  { rel: 'manifest', href: `${siteUrl}/manifest.webmanifest`, title: 'Web app manifest' },
]

/** Entity / legal / help link tags for crawlers. */
export const seoEntityLinks: readonly SeoLinkTag[] = [
  { rel: 'author', href: company.groupSite, title: company.presenter },
  { rel: 'publisher', href: company.groupSite, title: company.presenter },
  { rel: 'contact', href: `${siteUrl}/contact`, title: 'Contact Cloud Billing Manager' },
  {
    rel: 'help',
    href: `${siteUrl}/google-search-console-indexing.txt`,
    type: 'text/plain',
    title: 'Indexing guide',
  },
  { rel: 'license', href: `${siteUrl}/terms`, title: 'Terms of use' },
  { rel: 'terms-of-service', href: `${siteUrl}/terms`, title: 'Terms of use' },
  { rel: 'privacy-policy', href: `${siteUrl}/privacy`, title: 'Privacy policy' },
  {
    rel: 'me',
    href: 'https://www.linkedin.com/company/avantcore/',
    title: 'AVANTCORE on LinkedIn',
  },
  {
    rel: 'me',
    href: 'https://www.facebook.com/cloudbillingmanager',
    title: 'Cloud Billing Manager on Facebook',
  },
  {
    rel: 'me',
    href: 'https://www.instagram.com/cloudbillingmanager/',
    title: 'Cloud Billing Manager on Instagram',
  },
  {
    rel: 'alternate',
    href: 'https://www.linkedin.com/company/avantcore/',
    title: 'AVANTCORE on LinkedIn',
  },
  {
    rel: 'alternate',
    href: 'https://www.facebook.com/cloudbillingmanager',
    title: 'Cloud Billing Manager on Facebook',
  },
  {
    rel: 'alternate',
    href: 'https://www.instagram.com/cloudbillingmanager/',
    title: 'Cloud Billing Manager on Instagram',
  },
]

/** OpenSearch descriptor for browsers and crawlers. */
export const seoOpenSearchLink: SeoLinkTag = {
  rel: 'search',
  href: `${siteUrl}/opensearch.xml`,
  type: 'application/opensearchdescription+xml',
  title: 'Cloud Billing Manager',
}

/** All sitemap formats (robots.txt mirrors these). */
export const seoSitemapLinks: readonly SeoLinkTag[] = [
  {
    rel: 'sitemap',
    href: `${siteUrl}/sitemap-index.xml`,
    type: 'application/xml',
    title: 'Sitemap index',
  },
  {
    rel: 'sitemap',
    href: `${siteUrl}/sitemap-pages.xml`,
    type: 'application/xml',
    title: 'All pages sitemap',
  },
  {
    rel: 'sitemap',
    href: `${siteUrl}/sitemap-core.xml`,
    type: 'application/xml',
    title: 'Core pages sitemap',
  },
  {
    rel: 'sitemap',
    href: `${siteUrl}/sitemap-platform.xml`,
    type: 'application/xml',
    title: 'Platform sitemap',
  },
  {
    rel: 'sitemap',
    href: `${siteUrl}/sitemap-industries.xml`,
    type: 'application/xml',
    title: 'Industries sitemap',
  },
  {
    rel: 'sitemap',
    href: `${siteUrl}/sitemap-blog.xml`,
    type: 'application/xml',
    title: 'Blog sitemap',
  },
  {
    rel: 'sitemap',
    href: `${siteUrl}/sitemap-resources.xml`,
    type: 'application/xml',
    title: 'Resources sitemap',
  },
  {
    rel: 'sitemap',
    href: `${siteUrl}/sitemap.xml`,
    type: 'application/xml',
    title: 'Sitemap with images',
  },
  {
    rel: 'sitemap',
    href: `${siteUrl}/sitemap-pages.txt`,
    type: 'text/plain',
    title: 'Sitemap (plain text backup)',
  },
]

/** Plain-text discovery files for AI crawlers. */
export const seoDiscoveryLinks: readonly SeoLinkTag[] = [
  { rel: 'alternate', href: `${siteUrl}/llms.txt`, type: 'text/plain', title: 'LLM facts' },
  { rel: 'alternate', href: `${siteUrl}/brand.txt`, type: 'text/plain', title: 'Brand facts' },
  { rel: 'alternate', href: `${siteUrl}/urllist.txt`, type: 'text/plain', title: 'URL list' },
  {
    rel: 'index',
    href: `${siteUrl}/urllist.txt`,
    type: 'text/plain',
    title: 'All public pages for indexing',
  },
  { rel: 'alternate', href: `${siteUrl}/google-index-pages.txt`, type: 'text/plain', title: 'Google indexing URL list' },
  { rel: 'alternate', href: `${siteUrl}/seo-manifest.json`, type: 'application/json', title: 'SEO manifest' },
]

/** Static links injected on every indexable page (excludes canonical/hreflang — set per URL). */
export function getStaticSeoLinks(): SeoLinkTag[] {
  return [
    ...seoPreconnectLinks,
    ...seoAssetLinks,
    seoOpenSearchLink,
    ...seoEntityLinks,
    ...seoSitemapLinks,
    ...seoDiscoveryLinks,
  ]
}
