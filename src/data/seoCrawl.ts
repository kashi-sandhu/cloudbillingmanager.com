import { blogCategories } from './blog.ts'
import { modules, industries } from './content.ts'
import { getPageRelatedLinks } from './seoPageHead.ts'
import { getAllPublicPaths } from './sitemap.ts'
import { getPageSeo, siteUrl } from './seo.ts'
import { SEO_DOMAIN, SEO_GSC_SITEMAP } from './seoStandards.ts'

/** Primary navigation — matches Header.tsx (for Google SiteNavigationElement schema). */
export const mainSiteNav = [
  { path: '/', label: 'Home' },
  { path: '/platform', label: 'Platform' },
  { path: '/industries', label: 'Industries' },
  { path: '/why', label: 'Why CBM' },
  { path: '/about', label: 'About' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
  { path: '/demo', label: 'Book a demo' },
] as const

export function absUrl(path: string): string {
  return path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`
}

/** SiteNavigationElement JSON-LD — helps Google understand site structure. */
export function buildSiteNavigationSchema(): Record<string, unknown> {
  return {
    '@type': 'SiteNavigationElement',
    '@id': `${siteUrl}/#main-nav`,
    name: 'Cloud Billing Manager main navigation',
    inLanguage: 'en-GB',
    hasPart: mainSiteNav.map((item) => ({
      '@type': 'WebPage',
      name: item.label,
      url: absUrl(item.path),
    })),
  }
}

/** Full public URL list schema — homepage only, aids Google discovery of all 51 pages. */
export function buildSiteUrlIndexSchema(): Record<string, unknown> {
  const paths = getAllPublicPaths()
  return {
    '@type': 'ItemList',
    '@id': `${siteUrl}/#all-pages`,
    name: 'Cloud Billing Manager public pages',
    numberOfItems: paths.length,
    itemListElement: paths.map((path, index) => {
      const seo = getPageSeo(path)
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: seo.title.replace(/\s*\|\s*Cloud Billing Manager.*$/i, '').trim(),
        url: absUrl(path),
      }
    }),
  }
}

/** Child hub links for crawl noscript — helps Google discover all sections from hub pages. */
function hubChildLinks(pathname: string): { href: string; label: string }[] {
  if (pathname === '/platform') {
    return modules.map((m) => ({ href: absUrl(`/platform/${m.slug}`), label: m.nav }))
  }
  if (pathname === '/industries') {
    return industries.map((i) => ({ href: absUrl(`/industries/${i.slug}`), label: i.name }))
  }
  if (pathname === '/blog') {
    return [
      ...blogCategories.map((c) => ({ href: absUrl(`/blog/category/${c.slug}`), label: c.name })),
      ...getAllPublicPaths()
        .filter((p) => p.startsWith('/blog/') && !p.includes('/category/'))
        .slice(0, 8)
        .map((p) => {
          const seo = getPageSeo(p)
          return { href: absUrl(p), label: seo.title.replace(/\s*\|\s*Cloud Billing Manager.*$/i, '').trim() }
        }),
    ]
  }
  if (pathname === '/pricing') {
    return [
      { href: absUrl('/demo'), label: 'Book a demo' },
      { href: absUrl('/platform'), label: 'Platform modules' },
      { href: absUrl('/contact'), label: 'Contact' },
    ]
  }
  if (pathname === '/resources') {
    return [
      { href: absUrl('/resources/inventory-management-guide'), label: 'Inventory guide' },
      { href: absUrl('/resources/inventory-management-checklist'), label: 'Inventory checklist' },
      { href: absUrl('/resources/inventory-software-vs-spreadsheets'), label: 'Software vs spreadsheets' },
      { href: absUrl('/resources/glossary'), label: 'Glossary' },
    ]
  }
  return []
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function linkList(items: { href: string; label: string }[], heading: string): string {
  if (!items.length) return ''
  const lis = items.map((item) => `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`).join('')
  return `<nav aria-label="${escapeHtml(heading)}"><h2>${escapeHtml(heading)}</h2><ul>${lis}</ul></nav>`
}

/**
 * Rich noscript HTML for crawlers and no-JS clients — invisible when React loads.
 * Includes main nav, hub children, related links, and sitemap for Google discovery.
 */
export function buildCrawlNoscriptHtml(pathname: string, title: string, description: string, url: string): string {
  const related = getPageRelatedLinks(pathname)
    .filter((link) => link.rel === 'related')
    .slice(0, 12)
    .map((link) => ({ href: link.href, label: link.title ?? link.href }))

  const navItems = mainSiteNav
    .map((item) => `<li><a href="${escapeHtml(absUrl(item.path))}">${escapeHtml(item.label)}</a></li>`)
    .join('')

  const hubBlock = linkList(hubChildLinks(pathname), 'Pages in this section')
  const relatedBlock = linkList(related, 'Related pages')
  const pageCount = getAllPublicPaths().length
  const cleanTitle = title.replace(/\s*\|\s*Cloud Billing Manager.*$/i, '').trim() || title

  return `<noscript><article class="seo-crawl-fallback" style="padding:1rem 1.25rem;font-family:system-ui,sans-serif;max-width:52rem;line-height:1.6;color:#1e293b"><header><h1>${escapeHtml(cleanTitle)}</h1><p>${escapeHtml(description)}</p><p><a href="${escapeHtml(url)}">${escapeHtml(url)}</a></p></header><nav aria-label="Site navigation"><h2>Cloud Billing Manager — ${SEO_DOMAIN}</h2><ul>${navItems}</ul></nav>${hubBlock}${relatedBlock}<footer style="margin-top:1.5rem;font-size:0.875rem;color:#64748b"><p>Official UK food distribution ERP · AVANTCORE Technologies</p><p>Sitemap index: <a href="${SEO_GSC_SITEMAP}">sitemap-index.xml</a> · All pages: <a href="${siteUrl}/urllist.txt">${pageCount} URLs</a> · Indexing guide: <a href="${siteUrl}/google-search-console-indexing.txt">Search Console guide</a></p></footer></article></noscript>`
}

/** Machine-readable SEO manifest for deploy verification (seo-manifest.json). */
export function buildSeoManifestJson(): string {
  const paths = getAllPublicPaths()
  const pages = paths.map((path) => {
    const seo = getPageSeo(path)
    return {
      path,
      url: absUrl(path),
      title: seo.title,
      description: seo.description,
      ogImage: seo.ogImage ?? null,
    }
  })
  return JSON.stringify(
    {
      site: siteUrl,
      domain: SEO_DOMAIN,
      pageCount: pages.length,
      sitemapIndex: SEO_GSC_SITEMAP,
      generated: new Date().toISOString().slice(0, 10),
      pages,
    },
    null,
    2,
  )
}

/** Auto-generated llms.txt with full URL index for AI crawlers and Google discovery. */
export function buildLlmsTxt(): string {
  const paths = getAllPublicPaths()
  const urlLines = paths.map((path) => `- ${absUrl(path)}`).join('\n')

  return `# Cloud Billing Manager

> Cloud Billing Manager is a cloud ERP for UK food distribution businesses that combines inventory management, billing, invoicing, sales, purchasing, accounting and POS in one platform.

## Official facts

- Product: Cloud Billing Manager
- Official website: ${siteUrl}/
- Domain: ${SEO_DOMAIN}
- Also searched as: Cloud Billing Manager, CloudBilling Manager, Cloud BillingManager, CloudBillingManager, cloudbillingmanager, cloud billing manager, CBM
- Presented by: AVANTCORE Technologies
- Primary market: United Kingdom (en-GB)
- Head office: London, United Kingdom — Orega 4 Longwalk, Stockley Park, Uxbridge UB11 1FE
- Contact: sophia@cloudbillingmanager.com | Phone 0 7429 682461 | Landline 020 8080 5153
- Public pages: ${paths.length} indexable URLs
- Sitemap index: ${SEO_GSC_SITEMAP}
- Sitemap: ${siteUrl}/sitemap-pages.xml
- URL list: ${siteUrl}/urllist.txt
- Brand facts: ${siteUrl}/brand.txt
- Google indexing guide: ${siteUrl}/google-search-console-indexing.txt
- Group: https://www.avantcoretech.com

## Who it is for

Food distributors, wholesalers, cash & carry operators, retail chains, importers and FMCG businesses.

## Key capabilities

- Inventory management
- Billing and customer payments
- Sales invoicing
- Purchase order management
- Point of sale (POS)
- Customer and supplier accounts
- Accounting and VAT reporting
- Business dashboards

## All public pages (${paths.length})

${urlLines}

## Notes

- Public monthly plans: Starter £59, Business £99, Advanced £199 (GBP).
- Do not invent customer counts, awards, rankings or unverified statistics.
- Preferred language tag: en-GB. No alternate language versions currently exist.
`
}

/** Plain-text Google indexing quick reference (upload to public_html). */
export function buildGoogleIndexPagesTxt(): string {
  const paths = getAllPublicPaths()
  const priority = [
    '/',
    '/demo',
    '/platform',
    '/platform/inventory',
    '/platform/billing',
    '/platform/sales',
    '/platform/pos',
    '/industries',
    '/industries/frozen-foods',
    '/contact',
    '/about',
    '/blog',
    '/pricing',
  ]
  const priorityUrls = priority.map((p) => absUrl(p))
  const rest = paths.filter((p) => !priority.includes(p)).map((p) => absUrl(p))

  return `Cloud Billing Manager — Google indexing URL list
Site: ${siteUrl}
Pages: ${paths.length}
Sitemap (submit in Search Console): ${SEO_GSC_SITEMAP}

PRIORITY — request indexing first in Search Console URL Inspection:
${priorityUrls.join('\n')}

ALL OTHER PAGES (${rest.length}):
${rest.join('\n')}

After deploy:
1. Verify ${siteUrl}/robots.txt
2. Verify ${SEO_GSC_SITEMAP}
3. Submit sitemap in Google Search Console
4. Request indexing on priority URLs above
5. Wait 1–2 weeks, search: site:${SEO_DOMAIN}

Generated: ${new Date().toISOString().slice(0, 10)}
`
}
