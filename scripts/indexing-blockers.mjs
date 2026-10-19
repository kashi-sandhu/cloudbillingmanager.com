/**
 * Deep live indexing blocker check for cloudbillingmanager.com
 */
const site = 'https://cloudbillingmanager.com'

async function headOrGet(path, opts = {}) {
  const res = await fetch(site + path, { redirect: 'manual', ...opts })
  return res
}

async function final(path) {
  const res = await fetch(site + path, { redirect: 'follow' })
  const html = await res.text()
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || ''
  const robots = (html.match(/name="robots" content="([^"]*)"/i) || [])[1] || ''
  const canonical = (html.match(/rel="canonical" href="([^"]*)"/i) || [])[1] || ''
  const noindex = /noindex/i.test(robots)
  const page404 = /page not found/i.test(title) || /404 Not Found/i.test(html.slice(0, 800))
  return { status: res.status, url: res.url, title: title.slice(0, 60), robots, canonical, noindex, page404, len: html.length }
}

console.log('\n=== INDEXING BLOCKER CHECK ===\n')

// Redirect chain
for (const p of ['/about', '/pricing', '/demo', '/resources', '/platform/inventory']) {
  const r = await headOrGet(p)
  console.log(`REDIR  ${p.padEnd(22)} ${r.status} -> ${r.headers.get('location') || '(none)'}`)
}

console.log('')

// Final page quality
for (const p of ['/', '/about/', '/pricing/', '/demo/', '/resources/', '/platform/inventory/', '/sitemap-index.xml', '/robots.txt']) {
  try {
    const info = await final(p)
    const flag = info.page404 || info.noindex || info.status >= 400 ? 'BAD' : 'OK '
    console.log(`${flag}   ${p.padEnd(28)} status=${info.status} noindex=${info.noindex} 404=${info.page404} canon=${info.canonical.slice(0, 50)}`)
  } catch (e) {
    console.log(`ERR   ${p} ${e.message}`)
  }
}

// Sitemap contents vs live
console.log('\n--- sitemap-index ---')
const idx = await (await fetch(site + '/sitemap-index.xml')).text()
console.log(idx.includes('<sitemapindex') ? 'Valid sitemapindex' : 'INVALID')
console.log('Children:', [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))

console.log('\n--- sitemap-pages count ---')
const pages = await (await fetch(site + '/sitemap-pages.xml')).text()
const locs = [...pages.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
console.log('URL count:', locs.length)
console.log('Has /pricing?', locs.some((u) => u.includes('/pricing')))
console.log('Has /resources hub?', locs.some((u) => /\/resources\/?$/.test(u)))

// Sample crawl of sitemap URLs (first 8 + pricing)
console.log('\n--- sample sitemap URL live status ---')
const sample = [
  site + '/',
  site + '/pricing',
  site + '/demo',
  site + '/platform',
  site + '/about',
  ...locs.filter((u) => u.includes('/blog/')).slice(0, 2),
]
for (const u of sample) {
  const r = await fetch(u, { redirect: 'follow' })
  const t = await r.text()
  const title = (t.match(/<title>([^<]*)<\/title>/i) || [])[1] || ''
  const bad = r.status !== 200 || /page not found/i.test(title) || /name="robots" content="[^"]*noindex/i.test(t)
  console.log(`${bad ? 'BAD' : 'OK '} ${u.replace(site, '') || '/'} | ${r.status} | ${title.slice(0, 45)}`)
}

// Cloudflare / bot signals
console.log('\n--- headers homepage ---')
const home = await fetch(site + '/')
console.log('cf-ray:', home.headers.get('cf-ray'))
console.log('server:', home.headers.get('server'))
console.log('cache-control:', home.headers.get('cache-control'))
console.log('x-robots-tag:', home.headers.get('x-robots-tag'))

// Google site: can't scrape easily; check brand.txt / GSC guide presence
console.log('\n--- discovery files ---')
for (const p of ['/google-index-pages.txt', '/urllist.txt', '/llms.txt', '/google-search-console-indexing.txt']) {
  const r = await fetch(site + p)
  console.log(r.status, p, 'bytes', (await r.text()).length)
}
