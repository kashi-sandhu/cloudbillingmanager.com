import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const siteUrl = 'https://cloudbillingmanager.com'

function read(rel) {
  return readFileSync(resolve(root, rel), 'utf8')
}

function section(title) {
  console.log(`\n=== ${title} ===`)
}

const issues = {
  missingTitles: [],
  duplicateTitles: [],
  missingDescriptions: [],
  duplicateDescriptions: [],
  shortDescriptions: [],
  noindexImportant: [],
  sitemapGaps: [],
  robotsProblems: [],
  warnings: [],
}

// Collect public paths from App routes + content data (lightweight parse)
const appSrc = read('src/App.tsx')
const staticRoutes = [...appSrc.matchAll(/path="([^":*]+)"/g)].map((m) => m[1]).filter((p) => p !== '*')

const contentSrc = read('src/data/content.ts')
const moduleSlugs = [...contentSrc.matchAll(/slug:\s*'([^']+)'/g)]
  .map((m) => m[1])
  .filter((slug, index, arr) => arr.indexOf(slug) === index)
  .filter((slug) =>
    [
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
      'frozen-foods',
      'fresh-foods',
      'meat-suppliers',
      'beverage-distribution',
      'grocery-distribution',
      'fmcg',
      'restaurant-suppliers',
      'wholesale-businesses',
      'import-distribution',
    ].includes(slug),
  )

const industrySlugs = [
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
const platformSlugs = moduleSlugs.filter((s) => !industrySlugs.includes(s))

let blogSlugs = []
try {
  const blogSrc = read('src/data/blog.ts')
  blogSlugs = [...blogSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]).filter((s) => !s.includes('/'))
  // blogCategories also have slugs - filter article-like by checking blogArticles usage
  blogSlugs = [...new Set(blogSlugs)]
} catch {
  issues.warnings.push('Could not parse blog.ts')
}

const blogCategories = [
  'inventory-management',
  'billing-invoicing',
  'pos',
  'sales-purchases',
  'business-management',
]

const paths = new Set([
  '/',
  ...staticRoutes,
  ...platformSlugs.map((s) => `/platform/${s}`),
  ...industrySlugs.map((s) => `/industries/${s}`),
  ...blogCategories.map((s) => `/blog/category/${s}`),
  ...blogSlugs
    .filter((s) => !blogCategories.includes(s))
    .map((s) => `/blog/${s}`),
])

// Parse staticPageSeo + module titles from pageSeo.ts
const pageSeoSrc = read('src/data/pageSeo.ts')
const seoEntries = new Map()

for (const match of pageSeoSrc.matchAll(/'(\/[^']*)':\s*\{([\s\S]*?)\n  \},/g)) {
  const path = match[1]
  const body = match[2]
  const title = body.match(/title:\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'")
  const description = body.match(/description:\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'")
    || body.match(/description:\s*`([^`]*)`/)?.[1]
  seoEntries.set(path, { title, description })
}

// homePageSeo
const homeTitle = pageSeoSrc.match(/export const homePageSeo[\s\S]*?title:\s*'((?:\\'|[^'])*)'/)?.[1]
const homeDesc =
  pageSeoSrc.match(/export const homePageSeo[\s\S]*?description:\s*'((?:\\'|[^'])*)'/)?.[1] ||
  pageSeoSrc.match(/export const homePageSeo[\s\S]*?description:\s*\n\s*'((?:\\'|[^'])*)'/)?.[1]
if (homeTitle) seoEntries.set('/', { title: homeTitle, description: homeDesc || seoEntries.get('/')?.description })

// modulePageSeo titles (quoted or unquoted keys)
for (const match of pageSeoSrc.matchAll(/^\s{2}(?:'([a-z0-9-]+)'|([a-z0-9-]+)):\s*\{([\s\S]*?)^\s{2}\},/gm)) {
  const slug = match[1] || match[2]
  const body = match[3]
  if (!slug || !platformSlugs.includes(slug)) continue
  const title = body.match(/title:\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'")
  const description = body.match(/description:\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'")
  if (title) seoEntries.set(`/platform/${slug}`, { title, description })
}

// industry page SEO
try {
  const industrySrc = read('src/data/industrySeo.ts')
  for (const match of industrySrc.matchAll(/'([a-z0-9-]+)':\s*\{([\s\S]*?)\n  \},/g)) {
    const slug = match[1]
    const body = match[2]
    const title = body.match(/seoTitle:\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'")
    const description = body.match(/seoDescription:\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'")
    if (title) seoEntries.set(`/industries/${slug}`, { title, description })
  }
} catch {
  issues.warnings.push('Could not parse industrySeo.ts')
}

// blog article seo from blog.ts
try {
  const blogSrc = read('src/data/blog.ts')
  const articles = blogSrc.split(/\{\s*slug:/).slice(1)
  for (const chunk of articles) {
    const slug = chunk.match(/^\s*'([^']+)'/)?.[1]
    const seoTitle = chunk.match(/seoTitle:\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'")
    const seoDescription = chunk.match(/seoDescription:\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'")
    if (slug && seoTitle && !blogCategories.includes(slug)) {
      seoEntries.set(`/blog/${slug}`, { title: seoTitle, description: seoDescription })
    }
  }
} catch {
  /* already warned */
}

const titles = new Map()
const descriptions = new Map()

for (const path of paths) {
  const seo = seoEntries.get(path)
  if (!seo?.title) {
    // dynamic industry pages get generated titles — check pattern not required exact
    if (path.startsWith('/industries/') && path !== '/industries') {
      // acceptable fallback in getPageSeo
    } else if (path.startsWith('/blog/category/')) {
      // acceptable fallback
    } else if (path.startsWith('/platform/') && !seo?.title) {
      issues.warnings.push(`No explicit pageSeo title for ${path} (falls back to module name)`)
    } else if (!path.startsWith('/industries/') && !path.startsWith('/blog/category/')) {
      issues.missingTitles.push(path)
    }
  }
  if (seo?.title) {
    const key = seo.title.toLowerCase()
    titles.set(key, [...(titles.get(key) || []), path])
  }
  if (seo && !seo.description) issues.missingDescriptions.push(path)
  if (seo?.description && seo.description.length < 50) issues.shortDescriptions.push(path)
  if (seo?.description) {
    const key = seo.description.toLowerCase()
    descriptions.set(key, [...(descriptions.get(key) || []), path])
  }
}

for (const [title, list] of titles) {
  if (list.length > 1) issues.duplicateTitles.push(`${title} => ${list.join(', ')}`)
}
for (const [, list] of descriptions) {
  if (list.length > 1) issues.duplicateDescriptions.push(list.join(', '))
}

section('SEO AUDIT — Cloud Billing Manager')
console.log(`Pages checked: ${paths.size}`)
console.log(`Canonical site: ${siteUrl}`)
console.log(`Explicit SEO entries parsed: ${seoEntries.size}`)

const robotsPath = resolve(root, 'public/robots.txt')
if (!existsSync(robotsPath)) {
  issues.robotsProblems.push('public/robots.txt missing')
} else {
  const robots = read('public/robots.txt')
  if (!/Sitemap:\s*https:\/\/cloudbillingmanager\.com\/sitemap-pages\.php/i.test(robots)) {
    issues.warnings.push('robots.txt missing sitemap-pages.php fallback (recommended for cPanel)')
  }
  if (!/Sitemap:\s*https:\/\/cloudbillingmanager\.com\/sitemap-pages\.xml/i.test(robots)) {
    issues.robotsProblems.push('robots.txt missing sitemap-pages.xml URL')
  }
  if (!/Sitemap:\s*https:\/\/cloudbillingmanager\.com\/sitemap\.xml/i.test(robots)) {
    issues.robotsProblems.push('robots.txt missing sitemap.xml URL')
  }
  if (/Disallow:\s*\/\s*$/m.test(robots)) {
    issues.robotsProblems.push('robots.txt disallows root')
  }
}

const sitemapPath = resolve(root, 'public/sitemap.xml')
const sitemapPagesPath = resolve(root, 'public/sitemap-pages.xml')
if (!existsSync(sitemapPath)) {
  issues.sitemapGaps.push('public/sitemap.xml missing — run npm run build')
} else {
  const sitemap = read('public/sitemap.xml')
  for (const path of paths) {
    const loc = path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`
    if (!sitemap.includes(`<loc>${loc}</loc>`)) {
      issues.sitemapGaps.push(`${path} missing from sitemap.xml`)
    }
  }
}
if (!existsSync(sitemapPagesPath)) {
  issues.sitemapGaps.push('public/sitemap-pages.xml missing — run npm run build')
} else {
  const plain = read('public/sitemap-pages.xml')
  for (const path of paths) {
    const loc = path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`
    if (!plain.includes(`<loc>${loc}</loc>`)) {
      issues.sitemapGaps.push(`${path} missing from sitemap-pages.xml`)
    }
  }
}

if (!existsSync(resolve(root, 'public/llms.txt'))) {
  issues.warnings.push('public/llms.txt missing')
}
if (!existsSync(resolve(root, 'public/google-search-console-indexing.txt'))) {
  issues.warnings.push('google-search-console-indexing.txt missing')
}

const html = read('index.html')
if (!html.includes('rel="canonical"')) issues.warnings.push('index.html missing canonical')
if (!html.includes('name="description"')) issues.warnings.push('index.html missing description')
if (!/<title>/.test(html)) issues.warnings.push('index.html missing title')
if (!html.includes('name="viewport"')) issues.warnings.push('index.html missing viewport')
if (!html.includes('application/ld+json')) issues.warnings.push('index.html missing JSON-LD')
if (!html.includes('alternateName')) issues.warnings.push('index.html missing brand alternateName in schema')
if (!html.includes('sitemap-pages.xml')) issues.warnings.push('index.html sitemap link should use sitemap-pages.xml')
if (!existsSync(resolve(root, 'public/manifest.webmanifest'))) {
  issues.warnings.push('manifest.webmanifest missing')
}

section('Results')
console.log(`Missing titles: ${issues.missingTitles.length}`)
console.log(`Duplicate titles: ${issues.duplicateTitles.length}`)
console.log(`Missing descriptions: ${issues.missingDescriptions.length}`)
console.log(`Duplicate descriptions: ${issues.duplicateDescriptions.length}`)
console.log(`Short descriptions (<50): ${issues.shortDescriptions.length}`)
console.log(`Sitemap gaps: ${issues.sitemapGaps.length}`)
console.log(`Robots problems: ${issues.robotsProblems.length}`)
console.log(`Warnings: ${issues.warnings.length}`)

function dump(label, list) {
  if (!list.length) return
  console.log(`\n${label}:`)
  for (const item of list.slice(0, 50)) console.log(` - ${item}`)
  if (list.length > 50) console.log(` - … ${list.length - 50} more`)
}

dump('Missing titles', issues.missingTitles)
dump('Duplicate titles', issues.duplicateTitles)
dump('Missing descriptions', issues.missingDescriptions)
dump('Duplicate descriptions', issues.duplicateDescriptions)
dump('Short descriptions', issues.shortDescriptions)
dump('Sitemap gaps', issues.sitemapGaps)
dump('Robots problems', issues.robotsProblems)
dump('Warnings', issues.warnings)

section('Monitoring data status')
console.log('Search Console data is not currently available.')
console.log('Do not invent rankings, CTR, or impressions.')
console.log('Configure VITE_GA_MEASUREMENT_ID for GA4 event tracking after deploy.')

const hardFail =
  issues.missingTitles.length +
  issues.robotsProblems.length +
  issues.sitemapGaps.filter((g) => g.includes('missing — run npm run build')).length

if (hardFail > 0) {
  console.log('\nSEO audit finished with hard failures.')
  process.exitCode = 1
} else {
  console.log('\nSEO audit passed (no hard failures). Review warnings if any.')
}
