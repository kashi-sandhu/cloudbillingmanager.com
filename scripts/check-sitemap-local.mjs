/**
 * Open every page + image URL from public/sitemap.xml against a local base.
 * Usage: node scripts/check-sitemap-local.mjs [baseUrl]
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const base = (process.argv[2] || 'http://127.0.0.1:5173').replace(/\/$/, '')
const xml = readFileSync(join(root, 'public/sitemap.xml'), 'utf8')

const pageLocs = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/gs)].map((m) => m[1])
const imageLocs = [...new Set([...xml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((m) => m[1]))]

function toLocal(url) {
  return url.replace('https://cloudbillingmanager.com', base)
}

async function check(url, kind) {
  const local = toLocal(url)
  try {
    const res = await fetch(local, { redirect: 'follow' })
    const ct = res.headers.get('content-type') || ''
    if (kind === 'image') {
      const ok = res.ok && (/image\//i.test(ct) || /octet-stream/i.test(ct))
      return { kind, url, local, status: res.status, ct, title: '', ok }
    }
    const body = await res.text()
    const title = (body.match(/<title>([^<]*)<\/title>/i) || [])[1] || ''
    const isDirIndex = /Index of \//i.test(body) || /^Index of \//i.test(title)
    const isNotFound = /Page not found/i.test(title) || /404 Page not found/i.test(body)
    const ok = res.ok && /text\/html/i.test(ct) && !isDirIndex && !isNotFound
    return { kind, url, local, status: res.status, ct, title: title.slice(0, 90), ok }
  } catch (e) {
    return { kind, url, local, status: 0, ct: '', title: '', ok: false, error: e.message }
  }
}

const results = []
for (const u of pageLocs) results.push(await check(u, 'page'))
for (const u of imageLocs) results.push(await check(u, 'image'))

const fail = results.filter((r) => !r.ok)
const pass = results.filter((r) => r.ok)

console.log(`Base: ${base}`)
console.log(`Pages: ${pageLocs.length} | Unique images: ${imageLocs.length} | Total checks: ${results.length}`)
console.log(`PASS: ${pass.length}`)
console.log(`FAIL: ${fail.length}`)

if (fail.length) {
  console.log('\n--- FAILURES ---')
  for (const f of fail) {
    console.log(
      `[${f.kind}] ${f.status} ${f.local}${f.title ? ' | ' + f.title : ''}${f.error ? ' | ' + f.error : ''} | ${f.ct}`,
    )
  }
  process.exitCode = 1
} else {
  console.log('\nAll sitemap page + image links OPEN OK on local. No mistakes found.')
}
