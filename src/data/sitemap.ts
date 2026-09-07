import { industries, modules } from './content.ts'
import { blogArticles, blogCategories } from './blog.ts'
import { indexableImages } from './media.ts'
import { siteUrl } from './seo.ts'

export const staticPublicPaths = [
  '/',
  '/about',
  '/platform',
  '/industries',
  '/why',
  '/contact',
  '/demo',
  '/blog',
  '/resources',
  '/resources/inventory-management-checklist',
  '/resources/inventory-management-guide',
  '/resources/inventory-software-vs-spreadsheets',
  '/resources/glossary',
  '/press',
  '/privacy',
  '/terms',
] as const

export function getAllPublicPaths(): string[] {
  return [
    ...staticPublicPaths,
    ...modules.map((item) => `/platform/${item.slug}`),
    ...industries.map((item) => `/industries/${item.slug}`),
    ...blogCategories.map((item) => `/blog/category/${item.slug}`),
    ...blogArticles.map((item) => `/blog/${item.slug}`),
  ]
}

type SitemapEntry = {
  path: string
  changefreq: 'weekly' | 'monthly'
  priority: string
}

const priorityByPath: Record<string, { changefreq: SitemapEntry['changefreq']; priority: string }> = {
  '/': { changefreq: 'weekly', priority: '1.0' },
  '/about': { changefreq: 'monthly', priority: '0.9' },
  '/platform': { changefreq: 'weekly', priority: '0.9' },
  '/industries': { changefreq: 'monthly', priority: '0.8' },
  '/why': { changefreq: 'monthly', priority: '0.8' },
  '/contact': { changefreq: 'monthly', priority: '0.8' },
  '/demo': { changefreq: 'monthly', priority: '0.9' },
  '/blog': { changefreq: 'weekly', priority: '0.8' },
  '/resources': { changefreq: 'monthly', priority: '0.8' },
  '/resources/inventory-management-checklist': { changefreq: 'monthly', priority: '0.85' },
  '/resources/inventory-management-guide': { changefreq: 'monthly', priority: '0.85' },
  '/resources/inventory-software-vs-spreadsheets': { changefreq: 'monthly', priority: '0.8' },
  '/resources/glossary': { changefreq: 'monthly', priority: '0.7' },
  '/press': { changefreq: 'monthly', priority: '0.5' },
  '/privacy': { changefreq: 'monthly', priority: '0.3' },
  '/terms': { changefreq: 'monthly', priority: '0.3' },
}

export function getSitemapEntries(): SitemapEntry[] {
  return getAllPublicPaths().map((path) => {
    const exact = priorityByPath[path]
    if (exact) {
      return { path, changefreq: exact.changefreq, priority: exact.priority }
    }

    if (path.startsWith('/platform/')) {
      return { path, changefreq: 'monthly', priority: '0.8' }
    }

    if (path.startsWith('/blog/')) {
      return { path, changefreq: 'monthly', priority: '0.7' }
    }

    return { path, changefreq: 'monthly', priority: '0.7' }
  })
}

export function buildSitemapPlainXml(lastmod = new Date().toISOString().slice(0, 10)): string {
  return buildUrlsetXml(getSitemapEntries(), lastmod)
}

function buildUrlsetXml(entries: SitemapEntry[], lastmod: string): string {
  const body = entries
    .map(({ path, changefreq, priority }) => {
      const loc = path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

function entriesMatching(predicate: (path: string) => boolean): SitemapEntry[] {
  return getSitemapEntries().filter((entry) => predicate(entry.path))
}

/** Section sitemap: core marketing + legal pages. */
export function buildSitemapCoreXml(lastmod = new Date().toISOString().slice(0, 10)): string {
  return buildUrlsetXml(
    entriesMatching(
      (path) =>
        path === '/' ||
        path === '/about' ||
        path === '/platform' ||
        path === '/industries' ||
        path === '/why' ||
        path === '/contact' ||
        path === '/demo' ||
        path === '/blog' ||
        path === '/resources' ||
        path === '/press' ||
        path === '/privacy' ||
        path === '/terms',
    ),
    lastmod,
  )
}

/** Section sitemap: all platform module pages. */
export function buildSitemapPlatformXml(lastmod = new Date().toISOString().slice(0, 10)): string {
  return buildUrlsetXml(
    entriesMatching((path) => path.startsWith('/platform/')),
    lastmod,
  )
}

/** Section sitemap: all industry pages. */
export function buildSitemapIndustriesXml(lastmod = new Date().toISOString().slice(0, 10)): string {
  return buildUrlsetXml(
    entriesMatching((path) => path.startsWith('/industries/')),
    lastmod,
  )
}

/** Section sitemap: blog hub categories + articles. */
export function buildSitemapBlogXml(lastmod = new Date().toISOString().slice(0, 10)): string {
  return buildUrlsetXml(
    entriesMatching((path) => path === '/blog' || path.startsWith('/blog/')),
    lastmod,
  )
}

/** Section sitemap: resources guides + glossary. */
export function buildSitemapResourcesXml(lastmod = new Date().toISOString().slice(0, 10)): string {
  return buildUrlsetXml(
    entriesMatching((path) => path === '/resources' || path.startsWith('/resources/')),
    lastmod,
  )
}

/** All child sitemap files written at build time (for vite + pack). */
export function getSectionSitemapFiles(lastmod = new Date().toISOString().slice(0, 10)): {
  filename: string
  xml: string
}[] {
  return [
    { filename: 'sitemap-pages.xml', xml: buildSitemapPlainXml(lastmod) },
    { filename: 'sitemap-core.xml', xml: buildSitemapCoreXml(lastmod) },
    { filename: 'sitemap-platform.xml', xml: buildSitemapPlatformXml(lastmod) },
    { filename: 'sitemap-industries.xml', xml: buildSitemapIndustriesXml(lastmod) },
    { filename: 'sitemap-blog.xml', xml: buildSitemapBlogXml(lastmod) },
    { filename: 'sitemap-resources.xml', xml: buildSitemapResourcesXml(lastmod) },
  ]
}

/** Plain URL list — backup if XML sitemaps fail on host (one URL per line). */
export function buildUrllistTxt(): string {
  return getSitemapEntries()
    .map(({ path }) => (path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`))
    .join('\n')
    .concat('\n')
}

/**
 * Professional sitemap index for Google Search Console.
 * Lists every XML sitemap Google should crawl (pages + sections + images + host-safe mirror).
 * Note: a sitemap index may only contain other sitemaps — not individual page URLs.
 */
export function buildSitemapIndexXml(lastmod = new Date().toISOString().slice(0, 10)): string {
  const entries = [
    `${siteUrl}/sitemap-pages.xml`,
    `${siteUrl}/sitemap-core.xml`,
    `${siteUrl}/sitemap-platform.xml`,
    `${siteUrl}/sitemap-industries.xml`,
    `${siteUrl}/sitemap-blog.xml`,
    `${siteUrl}/sitemap-resources.xml`,
    `${siteUrl}/sitemap.xml`,
    `${siteUrl}/sitemap/sitemap-pages.xml`,
  ]
    .map(
      (loc) =>
        `  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Cloud Billing Manager - Google sitemap index | Submit this file in Search Console -->\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>\n`
}

export function buildSitemapXml(lastmod = new Date().toISOString().slice(0, 10)): string {
  const imageByPath: Record<string, { loc: string; title: string }[]> = {
    '/': indexableImages
      .filter((item) => item.purpose === 'brand' || item.purpose === 'og' || item.purpose === 'product')
      .map((item) => ({ loc: `${siteUrl}${item.src}`, title: item.alt })),
    '/about': [
      {
        loc: `${siteUrl}/images/brand/cloudbillingmanager-logo.webp`,
        title: 'Cloud Billing Manager',
      },
    ],
    '/demo': [
      {
        loc: `${siteUrl}/images/og/cloudbillingmanager-og.jpg`,
        title: 'Cloud Billing Manager demo',
      },
    ],
    '/contact': [
      {
        loc: `${siteUrl}/images/og/cloudbillingmanager-og.jpg`,
        title: 'Contact Cloud Billing Manager',
      },
    ],
    '/platform': [
      {
        loc: `${siteUrl}/images/og/cloudbillingmanager-og.jpg`,
        title: 'Cloud Billing Manager platform',
      },
    ],
    '/blog': [
      {
        loc: `${siteUrl}/images/og/cloudbillingmanager-og.jpg`,
        title: 'Cloud Billing Manager blog',
      },
    ],
  }

  for (const item of modules) {
    const banner = `/banners/${item.slug}.webp`
    imageByPath[`/platform/${item.slug}`] = [
      {
        loc: `${siteUrl}${banner}`,
        title: `${item.name} — Cloud Billing Manager`,
      },
    ]
  }

  for (const item of industries) {
    imageByPath[`/industries/${item.slug}`] = [
      {
        loc: `${siteUrl}/images/og/cloudbillingmanager-og.jpg`,
        title: `${item.name} — Cloud Billing Manager`,
      },
    ]
  }

  for (const item of blogArticles) {
    const image = item.image.endsWith('.webp')
      ? item.image.replace(/\.webp$/, '.jpg')
      : item.image
    imageByPath[`/blog/${item.slug}`] = [
      {
        loc: `${siteUrl}${image}`,
        title: item.imageAlt,
      },
    ]
  }

  for (const item of blogCategories) {
    imageByPath[`/blog/category/${item.slug}`] = [
      {
        loc: `${siteUrl}/images/og/cloudbillingmanager-og.jpg`,
        title: `${item.name} — Cloud Billing Manager blog`,
      },
    ]
  }

  imageByPath['/platform/sales'] = [
    {
      loc: `${siteUrl}/images/products/cloudbillingmanager-sales-invoice.webp`,
      title: 'Cloud Billing Manager sales invoice screen',
    },
  ]
  imageByPath['/platform/inventory'] = [
    {
      loc: `${siteUrl}/banners/inventory.webp`,
      title: 'Inventory operations for food distribution stock control',
    },
  ]
  imageByPath['/resources/inventory-management-guide'] = [
    {
      loc: `${siteUrl}/banners/inventory.webp`,
      title: 'Inventory management guide visual',
    },
  ]

  const entries = getSitemapEntries()
    .map(({ path, changefreq, priority }) => {
      const loc = path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`
      const images = imageByPath[path] ?? []
      const imageXml = images
        .map(
          (image) =>
            `    <image:image><image:loc>${image.loc}</image:loc><image:title>${escapeXml(image.title)}</image:title></image:image>`,
        )
        .join('\n')
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>${imageXml ? `\n${imageXml}` : ''}\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries}\n</urlset>\n`
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}
