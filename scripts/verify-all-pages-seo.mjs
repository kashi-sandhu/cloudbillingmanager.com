/**
 * Verify SEO HTML for every public page in dist/ (51 routes).
 * Run after: npm run build
 * Run: npm run seo:verify-all-pages
 */
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const siteUrl = 'https://cloudbillingmanager.com'

function pathToHtmlFile(pathname) {
  if (pathname === '/') return join(dist, 'index.html')
  return join(dist, ...pathname.slice(1).split('/'), 'index.html')
}

function urlToPath(url) {
  const trimmed = url.trim().replace(/\/$/, '')
  if (trimmed === siteUrl) return '/'
  return trimmed.replace(siteUrl, '')
}

function loadPaths() {
  const urllist = resolve(dist, 'urllist.txt')
  if (!existsSync(urllist)) {
    console.error('MISSING dist/urllist.txt — run npm run build first')
    process.exitCode = 1
    return []
  }
  return readFileSync(urllist, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('http'))
    .map(urlToPath)
}

const requiredSignals = [
  {
    id: 'canonical',
    test: (html, path) =>
      html.includes('rel="canonical"') &&
      html.includes(path === '/' ? `${siteUrl}/"` : `${siteUrl}${path}"`),
  },
  {
    id: 'title',
    test: (html) =>
      /<title>[^<]+Cloud Billing Manager/i.test(html) ||
      /<title>[^<]+cloudbillingmanager/i.test(html) ||
      /<title>[^<]+\| CBM<\/title>/i.test(html),
  },
  { id: 'description', test: (html) => html.includes('name="description"') },
  {
    id: 'robots-index',
    test: (html) => html.includes('index, follow') && !html.includes('noindex, nofollow'),
  },
  { id: 'json-ld', test: (html) => html.includes('application/ld+json') },
  { id: 'site-nav-schema', test: (html) => html.includes('SiteNavigationElement') },
  { id: 'crawl-noscript', test: (html) => html.includes('seo-crawl-fallback') },
  {
    id: 'og-tags',
    test: (html) => html.includes('property="og:title"') && html.includes('property="og:url"'),
  },
  {
    id: 'hreflang',
    test: (html, path) => {
      const url = path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`
      return html.includes('hreflang="en-GB"') && html.includes(url)
    },
  },
]

console.log('\n=== ALL-PAGES SEO VERIFY — 51 public routes ===\n')

const paths = loadPaths()
if (!paths.length) process.exit(1)

let failed = 0
const failures = []

for (const pathname of paths) {
  const file = pathToHtmlFile(pathname)
  const label = pathname || '/'

  if (!existsSync(file)) {
    failed += 1
    failures.push(`${label} — MISSING ${file.replace(dist, 'dist')}`)
    continue
  }

  const html = readFileSync(file, 'utf8')
  const missing = requiredSignals.filter((signal) => !signal.test(html, pathname)).map((s) => s.id)

  if (missing.length) {
    failed += 1
    failures.push(`${label} — missing: ${missing.join(', ')}`)
  } else {
    console.log(`OK       ${label}`)
  }
}

console.log('')
console.log(`Pages checked: ${paths.length}`)
console.log(`Passed: ${paths.length - failed}`)
console.log(`Failed: ${failed}`)

if (failures.length) {
  console.log('\nFailures:')
  for (const item of failures) console.log(` - ${item}`)
  process.exitCode = 1
} else {
  console.log('\nAll pages ready for Google indexing.')
  console.log('Submit in Search Console: sitemap-index.xml')
}
