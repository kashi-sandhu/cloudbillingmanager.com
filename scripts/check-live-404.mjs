const paths = ['/', '/about', '/about/', '/demo', '/demo/', '/platform', '/platform/', '/platform/inventory', '/platform/inventory/']

for (const p of paths) {
  const res = await fetch(`https://cloudbillingmanager.com${p}`, { redirect: 'follow' })
  const html = await res.text()
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || ''
  const is404 = /page not found/i.test(title) || /page not found/i.test(html.slice(0, 3000))
  console.log(`${res.status} ${p.padEnd(28)} -> ${res.url.replace('https://cloudbillingmanager.com', '')} | ${title.slice(0, 55)} | html404=${is404}`)
}
