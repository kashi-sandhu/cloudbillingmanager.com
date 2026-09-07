/**
 * Extra quality checks beyond verify-all-pages-seo.mjs
 */
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const site = 'https://cloudbillingmanager.com'

function pathToHtmlFile(pathname) {
  if (pathname === '/') return join(dist, 'index.html')
  return join(dist, ...pathname.slice(1).split('/'), 'index.html')
}

function urlToPath(url) {
  const trimmed = url.trim().replace(/\/$/, '')
  if (trimmed === site) return '/'
  return trimmed.replace(site, '')
}

const urllist = readFileSync(join(dist, 'urllist.txt'), 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l.startsWith('http'))
  .map(urlToPath)

const manifest = JSON.parse(readFileSync(join(dist, 'seo-manifest.json'), 'utf8'))
const sitemap = readFileSync(join(dist, 'sitemap-pages.xml'), 'utf8')
const sitemapCount = (sitemap.match(/<loc>/g) || []).length

const issues = []
const titles = new Set()

for (const pathname of urllist) {
  const html = readFileSync(pathToHtmlFile(pathname), 'utf8')
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  const desc = (html.match(/name="description" content="([^"]*)"/) || [])[1] || ''
  const canon = (html.match(/rel="canonical" href="([^"]*)"/) || [])[1]
  const expected = pathname === '/' ? `${site}/` : `${site}${pathname}`

  if (title.length > 70) issues.push(`${pathname} — title too long (${title.length} chars)`)
  if (desc.length > 165) issues.push(`${pathname} — description too long (${desc.length} chars)`)
  if (desc.length < 70) issues.push(`${pathname} — description too short (${desc.length} chars)`)
  if (!title.includes('Cloud Billing Manager') && !title.includes('| CBM')) {
    issues.push(`${pathname} — title missing brand`)
  }
  if (canon !== expected) issues.push(`${pathname} — canonical: ${canon} (expected ${expected})`)
  if (titles.has(title)) issues.push(`${pathname} — duplicate title: ${title}`)
  titles.add(title)

  const ldCount = (html.match(/application\/ld\+json/g) || []).length
  if (ldCount < 1) issues.push(`${pathname} — no JSON-LD blocks`)

  if (!html.includes('og:image')) issues.push(`${pathname} — missing og:image`)
  if (!html.includes('twitter:card')) issues.push(`${pathname} — missing twitter:card`)
}

const html404 = readFileSync(join(dist, '404.html'), 'utf8')
const checks = [
  ['URL list count', urllist.length === 51, urllist.length],
  ['Sitemap URL count', sitemapCount === 51, sitemapCount],
  ['Manifest page count', manifest.pageCount === 51, manifest.pageCount],
  ['All counts match', urllist.length === sitemapCount && sitemapCount === manifest.pageCount, 'yes'],
  ['404 has noindex', html404.includes('noindex'), html404.includes('noindex') ? 'yes' : 'no'],
  ['Homepage has 51-page schema', readFileSync(join(dist, 'index.html'), 'utf8').includes('#all-pages'), 'yes'],
  ['Unique titles', issues.filter((i) => i.includes('duplicate')).length === 0, titles.size],
  ['Quality issues', issues.length === 0, issues.length],
]

console.log('\n=== DEEP SEO QUALITY CHECK ===\n')
for (const [label, ok, detail] of checks) {
  console.log(`${ok ? 'OK' : 'FAIL'}     ${label}: ${detail}`)
}

if (issues.length) {
  console.log('\nIssues:')
  for (const item of issues) console.log(` - ${item}`)
  process.exitCode = 1
} else {
  console.log('\nAll deep checks passed.')
}
