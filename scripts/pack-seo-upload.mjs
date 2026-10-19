/**
 * Copy critical SEO files into dist/seo-upload/ for quick cPanel upload.
 * Run: npm run seo:pack  (also runs at end of build:seo)
 */
import { copyFileSync, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const out = resolve(dist, 'seo-upload')

const files = [
  'robots.txt',
  '.htaccess',
  'sitemap-index.xml',
  'sitemap-pages.php',
  'sitemap-pages.txt',
  'sitemap-pages.xml',
  'sitemap-core.xml',
  'sitemap-platform.xml',
  'sitemap-industries.xml',
  'sitemap-blog.xml',
  'sitemap-resources.xml',
  'sitemap.php',
  'sitemap.xml',
  'brand.txt',
  'urllist.txt',
  'google-index-pages.txt',
  'seo-manifest.json',
  'llms.txt',
  'google-search-console-indexing.txt',
  'UPLOAD-FOR-GOOGLE.txt',
  'seo-sources.txt',
  'sitemap/sitemap-pages.xml',
  'resources/index.html',
  'resources/.htaccess',
]

const readme = `CLOUD BILLING MANAGER — SEO UPLOAD (IMPORTANT)
==============================================

ENGLISH:
Upload ALL files in this folder to cPanel → public_html
(overwrite / replace existing files)

After upload, test in browser:
  https://cloudbillingmanager.com/sitemap-index.xml   → sitemap index (submit in GSC)
  https://cloudbillingmanager.com/sitemap-pages.xml   → 51 URLs
  https://cloudbillingmanager.com/robots.txt          → 6 Sitemap: lines

Then run on PC:  npm run seo:check-live

Google Search Console → submit sitemap: sitemap-index.xml

---

URDU / Hindi:
Yeh saari files cPanel → public_html mein upload karein (purani files replace karein).

Upload ke baad browser mein check karein:
  https://cloudbillingmanager.com/sitemap-pages.txt  → XML aana chahiye
  https://cloudbillingmanager.com/robots.txt         → 5 Sitemap lines honi chahiye

Phir PC par:  npm run seo:check-live

Google Search Console mein sitemap submit: sitemap-index.xml

Bina upload ke Google par site nahi aayegi.

---

FILE SIZES (verify in cPanel File Manager after upload):
${files.map((f) => {
  try {
    const size = statSync(resolve(dist, f)).size
    return `  ${f}  →  ${size} bytes`
  } catch {
    return `  ${f}  →  (run npm run build first)`
  }
}).join('\n')}

Generated: ${new Date().toISOString()}
`

if (!existsSync(dist)) {
  console.error('dist/ missing — run: npm run build')
  process.exitCode = 1
  process.exit(1)
}

mkdirSync(out, { recursive: true })

let ok = 0
let missing = 0

for (const name of files) {
  const src = resolve(dist, name)
  const dest = resolve(out, name)
  if (!existsSync(src)) {
    console.log(`MISSING  ${name}`)
    missing += 1
    continue
  }
  mkdirSync(dirname(dest), { recursive: true })
  copyFileSync(src, dest)
  const size = statSync(dest).size
  console.log(`COPIED   ${name} (${size} B)`)
  ok += 1
}

writeFileSync(resolve(out, 'UPLOAD-README.txt'), readme, 'utf8')
console.log(`\nPack ready: dist/seo-upload/ (${ok} files)`)
if (missing > 0) {
  console.log(`${missing} file(s) missing — run npm run build first`)
  process.exitCode = 1
}
