const urls = [
  'https://cloudbillingmanager.com/',
  'https://cloudbillingmanager.com/about',
  'https://cloudbillingmanager.com/pricing',
  'https://cloudbillingmanager.com/resources',
  'https://cloudbillingmanager.com/.htaccess',
]

for (const url of urls) {
  const res = await fetch(url, { redirect: 'manual' })
  const loc = res.headers.get('location')
  console.log(res.status, url.replace('https://cloudbillingmanager.com', '') || '/', 'loc=', loc, 'server=', res.headers.get('server'), 'cf=', !!res.headers.get('cf-ray'))
}

const home = await (await fetch('https://cloudbillingmanager.com/')).text()
console.log('home bytes', home.length)
console.log('js', [...home.matchAll(/src="(\/assets\/[^"]+\.js)"/g)].map((m) => m[1]))
console.log('css', [...home.matchAll(/href="(\/assets\/[^"]+\.css)"/g)].map((m) => m[1]))
console.log('img count', (home.match(/<img /g) || []).length)
console.log('preload', (home.match(/rel="preload"/g) || []).length)
console.log('has DirectorySlash mention in body?', /DirectorySlash/.test(home))
