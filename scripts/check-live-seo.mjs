/**
 * Check live cloudbillingmanager.com SEO files after deploy.
 * Run: npm run seo:check-live
 */

const site = 'https://cloudbillingmanager.com'

const checks = [
  {
    path: '/robots.txt',
    expect: (t) => t.includes('sitemap-pages.txt') && t.includes('sitemap-pages.xml'),
  },
  { path: '/sitemap-index.xml', expect: (t) => t.includes('<sitemapindex') && t.includes('sitemap-core.xml') && t.includes('sitemap-pages.xml') },
  {
    path: '/sitemap-pages.txt',
    expect: (t) => t.includes('<?xml') && t.includes('<urlset'),
    label: 'txt sitemap (recommended if .xml 500)',
  },
  { path: '/sitemap-core.xml', expect: (t) => t.includes('<urlset') && t.includes('cloudbillingmanager.com') },
  { path: '/sitemap-platform.xml', expect: (t) => t.includes('/platform/') },
  { path: '/sitemap-blog.xml', expect: (t) => t.includes('/blog/') },
  {
    path: '/sitemap/sitemap-pages.xml',
    expect: (t) => t.includes('<?xml') && t.includes('<urlset'),
  },
  { path: '/sitemap-pages.php', expect: (t) => t.includes('<?xml') && t.includes('<urlset') },
  { path: '/sitemap-pages.xml', expect: (t) => t.includes('<?xml') && t.includes('<urlset') },
  { path: '/brand.txt', expect: (t) => t.includes('Cloud Billing Manager') },
  { path: '/urllist.txt', expect: (t) => t.includes('cloudbillingmanager.com') },
  { path: '/llms.txt', expect: (t) => t.includes('cloudbillingmanager.com') },
  { path: '/google-index-pages.txt', expect: (t) => t.includes('PRIORITY') && t.includes('cloudbillingmanager.com') },
  { path: '/seo-manifest.json', expect: (t) => t.includes('"pageCount": 51') || t.includes('"pageCount":51') },
  { path: '/', expect: (t) => t.includes('Cloud Billing Manager') && !t.includes('Page not found') },
  { path: '/platform/inventory', expect: (t) => t.includes('rel="canonical"') && t.includes('Inventory Management') && t.includes('application/ld+json') },
]

console.log(`\n=== LIVE SEO CHECK — ${site} ===\n`)

let failed = 0

for (const { path, expect } of checks) {
  const url = `${site}${path}`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'CloudBillingManager-SEO-Check/1.0' },
      redirect: 'follow',
    })
    const text = await res.text()
    const ok = res.ok && expect(text)
    if (ok) {
      const extra = path.includes('sitemap') ? ` (${(text.match(/<loc>/g) || []).length} URLs)` : ''
      console.log(`OK       ${path} [${res.status}]${extra}`)
    } else {
      console.log(`FAIL     ${path} [${res.status}] — expected content missing or wrong`)
      if (text.includes('Performing security verification') || text.includes('cf-challenge')) {
        console.log('         → Cloudflare bot challenge — use sitemap/sitemap-pages.xml instead of .php')
      }
      if (text.includes('Page not found') && path.endsWith('.php')) {
        console.log('         → Upload sitemap-pages.php from dist/seo-upload/ to public_html')
      }
      if (path === '/robots.txt' && res.ok && !text.includes('sitemap-pages.php')) {
        console.log('         → Upload robots.txt from dist/seo-upload/ (old file on server)')
      }
      failed += 1
    }
  } catch (err) {
    console.log(`ERROR    ${path} — ${err.message}`)
    failed += 1
  }
}

console.log('')
if (failed > 0) {
  console.log(`Live check FAILED (${failed} problem(s)). Upload dist/ to cPanel public_html, then re-run.`)
  process.exitCode = 1
} else {
  console.log('Live check PASSED — submit sitemap-index.xml in Google Search Console.')
}
