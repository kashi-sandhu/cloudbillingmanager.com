import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const xml = readFileSync(join(root, 'public/sitemap.xml'), 'utf8')
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const imageLocs = [...xml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((m) => m[1])
const lastmods = [...new Set([...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]))]

const modules = [
  'dashboard',
  'sales',
  'pricing-engine',
  'billing',
  'purchasing',
  'supplier-payments',
  'inventory',
  'accounting',
  'hr',
  'customers',
  'suppliers',
  'customizable',
  'pos',
]
const industries = [
  'frozen-foods',
  'fresh-foods',
  'meat-suppliers',
  'beverage-distribution',
  'grocery-distribution',
  'fmcg',
  'restaurant-suppliers',
  'wholesale-businesses',
  'import-distribution',
]
const blogCats = [
  'inventory-management',
  'billing-invoicing',
  'pos',
  'sales-purchases',
  'business-management',
]
const blog = [
  'what-is-inventory-management',
  'benefits-of-inventory-management-software',
  'how-to-manage-stock-effectively',
  'inventory-management-for-small-businesses',
  'what-is-billing-software',
  'how-to-track-unpaid-invoices',
  'what-is-pos-software',
  'pos-and-inventory-management',
]
const staticPaths = [
  '/',
  '/about',
  '/platform',
  '/industries',
  '/why',
  '/contact',
  '/demo',
  '/blog',
  '/pricing',
  '/resources/inventory-management-checklist',
  '/resources/inventory-management-guide',
  '/resources/inventory-software-vs-spreadsheets',
  '/resources/glossary',
  '/press',
  '/privacy',
  '/terms',
]

const expected = [
  ...staticPaths,
  ...modules.map((s) => `/platform/${s}`),
  ...industries.map((s) => `/industries/${s}`),
  ...blogCats.map((s) => `/blog/category/${s}`),
  ...blog.map((s) => `/blog/${s}`),
]

const sitemapPaths = locs.map((u) => {
  const p = u.replace('https://cloudbillingmanager.com', '')
  return p === '' ? '/' : p
})

const missing = expected.filter((p) => !sitemapPaths.includes(p))
const extra = sitemapPaths.filter((p) => !expected.includes(p))
const missingImg = []
for (const url of imageLocs) {
  const path = url.replace('https://cloudbillingmanager.com', '')
  const file = join(root, 'public', path.replace(/^\//, ''))
  if (!existsSync(file)) missingImg.push(path)
}

console.log(
  JSON.stringify(
    {
      urls: sitemapPaths.length,
      expected: expected.length,
      images: imageLocs.length,
      lastmods,
      missing,
      extra,
      missingImg,
    },
    null,
    2,
  ),
)
