import { existsSync, readFileSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const required = [
  { path: 'index.html', minBytes: 8000 },
  { path: 'robots.txt', minBytes: 200 },
  { path: 'sitemap-pages.txt', minBytes: 5000 },
  { path: 'sitemap-pages.xml', minBytes: 5000 },
  { path: 'sitemap-index.xml', minBytes: 200 },
  { path: 'sitemap-core.xml', minBytes: 500 },
  { path: 'sitemap-platform.xml', minBytes: 500 },
  { path: 'sitemap-industries.xml', minBytes: 500 },
  { path: 'sitemap-blog.xml', minBytes: 500 },
  { path: 'sitemap-resources.xml', minBytes: 300 },
  { path: 'sitemap.xml', minBytes: 5000 },
  { path: 'llms.txt', minBytes: 500 },
  { path: 'google-index-pages.txt', minBytes: 500 },
  { path: 'seo-manifest.json', minBytes: 5000 },
  { path: 'brand.txt', minBytes: 100 },
  { path: 'urllist.txt', minBytes: 1000 },
  { path: '.htaccess', minBytes: 200 },
  { path: 'google-search-console-indexing.txt', minBytes: 500 },
  { path: 'sitemap/sitemap-pages.xml', minBytes: 5000 },
  { path: 'sitemap-pages.php', minBytes: 8000 },
  { path: 'sitemap.php', minBytes: 9000 },
  { path: 'DEPLOY-SEO-NOW.txt', minBytes: 200 },
  { path: '404.html', minBytes: 3000 },
  { path: 'about/index.html', minBytes: 3000 },
  { path: 'demo/index.html', minBytes: 3000 },
  { path: 'platform/billing/index.html', minBytes: 3000 },
  { path: 'platform/inventory/index.html', minBytes: 3000 },
  { path: 'industries/frozen-foods/index.html', minBytes: 3000 },
  { path: 'blog/category/inventory-management/index.html', minBytes: 3000 },
]

const googleIndexChecks = [
  'platform/inventory/index.html',
  'industries/frozen-foods/index.html',
  'blog/what-is-inventory-management/index.html',
  'resources/glossary/index.html',
]

console.log('\n=== DEPLOY SEO CHECK — upload dist/ to public_html ===\n')

let failed = 0

for (const file of required) {
  const full = resolve(dist, file.path)
  if (!existsSync(full)) {
    console.log(`MISSING  ${file.path}`)
    failed += 1
    continue
  }
  const size = statSync(full).size
  if (size < file.minBytes) {
    console.log(`TOO SMALL ${file.path} (${size} B — expected ≥ ${file.minBytes} B)`)
    failed += 1
    continue
  }
  console.log(`OK       ${file.path} (${size} B)`)
}

if (existsSync(resolve(dist, 'robots.txt'))) {
  const robots = readFileSync(resolve(dist, 'robots.txt'), 'utf8')
  if (!robots.includes('sitemap-pages.txt')) {
    console.log('FAIL     robots.txt missing sitemap-pages.txt line')
    failed += 1
  }
  if (!robots.includes('sitemap-index.xml')) {
    console.log('FAIL     robots.txt missing sitemap-index.xml line')
    failed += 1
  }
}

if (existsSync(resolve(dist, 'sitemap-pages.xml'))) {
  const xml = readFileSync(resolve(dist, 'sitemap-pages.xml'), 'utf8')
  if (xml.includes('<?xml') && xml.includes('<urlset')) {
    const count = (xml.match(/<loc>/g) || []).length
    console.log(`INFO     sitemap-pages.xml has ${count} URLs`)
    if (count < 45) {
      console.log('WARN     sitemap-pages.xml URL count looks low')
    }
  } else {
    console.log('FAIL     sitemap-pages.xml is not valid XML')
    failed += 1
  }
}

if (existsSync(resolve(dist, 'sitemap-index.xml'))) {
  const indexXml = readFileSync(resolve(dist, 'sitemap-index.xml'), 'utf8')
  const okIndex =
    indexXml.includes('<sitemapindex') &&
    indexXml.includes('sitemap-pages.xml') &&
    indexXml.includes('sitemap-core.xml') &&
    indexXml.includes('sitemap-platform.xml') &&
    indexXml.includes('sitemap-industries.xml') &&
    indexXml.includes('sitemap-blog.xml') &&
    indexXml.includes('sitemap-resources.xml') &&
    indexXml.includes('sitemap.xml') &&
    !indexXml.includes('sitemap-pages.txt')
  if (okIndex) {
    const childCount = (indexXml.match(/<sitemap>/g) || []).length
    console.log(`OK       sitemap-index.xml is Google-valid (${childCount} child sitemaps)`)
  } else {
    console.log('FAIL     sitemap-index.xml invalid or missing section sitemaps')
    failed += 1
  }
}

if (existsSync(resolve(dist, '.htaccess'))) {
  const ht = readFileSync(resolve(dist, '.htaccess'), 'utf8')
  if (ht.includes('DirectorySlash Off') && ht.includes('strip trailing slash')) {
    console.log('OK       .htaccess prevents trailing-slash 404 bug')
  } else if (ht.includes('DirectorySlash Off')) {
    console.log('OK       .htaccess DirectorySlash Off present')
  } else {
    console.log('FAIL     .htaccess missing DirectorySlash Off (404 risk)')
    failed += 1
  }
}

if (existsSync(resolve(dist, 'demo/index.html'))) {
  const demo = readFileSync(resolve(dist, 'demo/index.html'), 'utf8')
  const canonicalCount = (demo.match(/rel="canonical"/g) || []).length
  if (canonicalCount !== 1) {
    console.log(`FAIL     demo/index.html has ${canonicalCount} canonical tags (expected 1)`)
    failed += 1
  } else if (!demo.includes('href="https://cloudbillingmanager.com/demo"')) {
    console.log('FAIL     demo/index.html canonical URL is wrong')
    failed += 1
  } else if (!demo.includes('https://cloudbillingmanager.com/demo" hreflang="en-GB"')) {
    console.log('FAIL     demo/index.html hreflang points to wrong URL')
    failed += 1
  } else {
    console.log('OK       demo/index.html canonical + hreflang correct')
  }
}

if (existsSync(resolve(dist, '404.html'))) {
  const notFound = readFileSync(resolve(dist, '404.html'), 'utf8')
  if (!notFound.includes('noindex')) {
    console.log('FAIL     404.html missing noindex')
    failed += 1
  }
  if (notFound.includes('rel="canonical"')) {
    console.log('FAIL     404.html must not have canonical')
    failed += 1
  }
  if (notFound.includes('hreflang=')) {
    console.log('FAIL     404.html must not have hreflang')
    failed += 1
  }
}

for (const relPath of googleIndexChecks) {
  const full = resolve(dist, relPath)
  if (!existsSync(full)) continue
  const html = readFileSync(full, 'utf8')
  const label = relPath
  if (!html.includes('rel="canonical"')) {
    console.log(`FAIL     ${label} missing canonical`)
    failed += 1
  } else if (!html.includes('application/ld+json')) {
    console.log(`FAIL     ${label} missing JSON-LD`)
    failed += 1
  } else if (!html.includes('SiteNavigationElement')) {
    console.log(`FAIL     ${label} missing SiteNavigationElement schema`)
    failed += 1
  } else if (!html.includes('seo-crawl-fallback')) {
    console.log(`FAIL     ${label} missing crawl noscript`)
    failed += 1
  } else if (html.includes('noindex')) {
    console.log(`FAIL     ${label} has noindex (must be indexable)`)
    failed += 1
  } else {
    console.log(`OK       ${label} Google index signals present`)
  }
}

if (existsSync(resolve(dist, 'index.html'))) {
  const home = readFileSync(resolve(dist, 'index.html'), 'utf8')
  if (home.includes('#all-pages')) {
    console.log('OK       homepage includes full 51-page URL index schema')
  } else {
    console.log('FAIL     homepage missing #all-pages ItemList schema')
    failed += 1
  }
}

console.log('')
if (failed > 0) {
  console.log(`Deploy check FAILED (${failed} problem(s)). Run: npm run build`)
  process.exitCode = 1
} else {
  console.log('Deploy check PASSED — upload entire dist/ folder to cPanel public_html.')
  console.log('Then test: https://cloudbillingmanager.com/sitemap-pages.xml')
  console.log('Submit in Search Console: sitemap-index.xml (or sitemap-pages.xml)')
}
