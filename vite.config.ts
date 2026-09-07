import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { buildSitemapPlainXml, buildSitemapXml, buildSitemapIndexXml, buildUrllistTxt, getSectionSitemapFiles } from './src/data/sitemap.ts'
import { buildGoogleIndexPagesTxt, buildLlmsTxt, buildSeoManifestJson } from './src/data/seoCrawl.ts'
import { seoPrerenderPlugin } from './scripts/seo-prerender-plugin.ts'

const rootDir = dirname(fileURLToPath(import.meta.url))

/** PHP fallback: serves .xml file if present, else embedded XML (fixes missing/broken XML on cPanel). */
function buildPhpSitemapWrapper(xmlFilename: string, xml: string): string {
  return `<?php
declare(strict_types=1);
header('Content-Type: application/xml; charset=UTF-8');
header('Cache-Control: public, max-age=3600');
$file = __DIR__ . DIRECTORY_SEPARATOR . '${xmlFilename}';
if (is_readable($file)) {
    readfile($file);
    exit;
}
echo <<<'SITEMAP'
${xml}
SITEMAP;
`
}

function writeSitemaps() {
  const xml = buildSitemapXml()
  const plain = buildSitemapPlainXml()
  const urllist = buildUrllistTxt()
  const sitemapIndex = buildSitemapIndexXml()
  const sectionFiles = getSectionSitemapFiles()
  const phpPages = buildPhpSitemapWrapper('sitemap-pages.xml', plain)
  const phpFull = buildPhpSitemapWrapper('sitemap.xml', xml)

  writeFileSync(resolve(rootDir, 'public', 'sitemap.xml'), xml, 'utf8')
  writeFileSync(resolve(rootDir, 'public', 'sitemap-pages.txt'), plain, 'utf8')
  writeFileSync(resolve(rootDir, 'public', 'sitemap-index.xml'), sitemapIndex, 'utf8')
  for (const file of sectionFiles) {
    writeFileSync(resolve(rootDir, 'public', file.filename), file.xml, 'utf8')
  }
  writeFileSync(resolve(rootDir, 'public', 'urllist.txt'), urllist, 'utf8')
  writeFileSync(resolve(rootDir, 'public', 'llms.txt'), buildLlmsTxt(), 'utf8')
  writeFileSync(resolve(rootDir, 'public', 'google-index-pages.txt'), buildGoogleIndexPagesTxt(), 'utf8')
  writeFileSync(resolve(rootDir, 'public', 'seo-manifest.json'), buildSeoManifestJson(), 'utf8')
  writeFileSync(resolve(rootDir, 'public', 'sitemap-pages.php'), phpPages, 'utf8')
  writeFileSync(resolve(rootDir, 'public', 'sitemap.php'), phpFull, 'utf8')
  // Folder sitemap — avoids Cloudflare blocking .php and some hosts breaking root .xml
  const folderSitemap = resolve(rootDir, 'public', 'sitemap', 'sitemap-pages.xml')
  mkdirSync(resolve(rootDir, 'public', 'sitemap'), { recursive: true })
  writeFileSync(folderSitemap, plain, 'utf8')
  for (const dir of ['dist']) {
    try {
      writeFileSync(resolve(rootDir, dir, 'sitemap.xml'), xml, 'utf8')
      writeFileSync(resolve(rootDir, dir, 'sitemap-pages.txt'), plain, 'utf8')
      writeFileSync(resolve(rootDir, dir, 'sitemap-index.xml'), sitemapIndex, 'utf8')
      for (const file of sectionFiles) {
        writeFileSync(resolve(rootDir, dir, file.filename), file.xml, 'utf8')
      }
      writeFileSync(resolve(rootDir, dir, 'urllist.txt'), urllist, 'utf8')
      writeFileSync(resolve(rootDir, dir, 'llms.txt'), buildLlmsTxt(), 'utf8')
      writeFileSync(resolve(rootDir, dir, 'google-index-pages.txt'), buildGoogleIndexPagesTxt(), 'utf8')
      writeFileSync(resolve(rootDir, dir, 'seo-manifest.json'), buildSeoManifestJson(), 'utf8')
      writeFileSync(resolve(rootDir, dir, 'sitemap-pages.php'), phpPages, 'utf8')
      writeFileSync(resolve(rootDir, dir, 'sitemap.php'), phpFull, 'utf8')
      mkdirSync(resolve(rootDir, dir, 'sitemap'), { recursive: true })
      writeFileSync(resolve(rootDir, dir, 'sitemap', 'sitemap-pages.xml'), plain, 'utf8')
      writeFileSync(
        resolve(rootDir, dir, 'DEPLOY-SEO-NOW.txt'),
        `CLOUD BILLING MANAGER — FINAL UPLOAD + GOOGLE INDEXING
=====================================================

1) Upload ENTIRE dist/ folder → cPanel public_html (replace all)

2) MUST replace these (404 fix + SEO):
   - .htaccess
   - assets/  (new JavaScript)
   - sitemap-index.xml
   - sitemap-pages.xml, sitemap-core.xml, sitemap-platform.xml
   - sitemap-industries.xml, sitemap-blog.xml, sitemap-resources.xml
   - sitemap.xml, robots.txt
   - all page folders (about/, demo/, platform/, …)

3) Browser test (must NOT say Page not found):
   https://cloudbillingmanager.com/about
   https://cloudbillingmanager.com/demo
   https://cloudbillingmanager.com/platform
   https://cloudbillingmanager.com/sitemap-index.xml

4) Google Search Console → Sitemaps → add:
   sitemap-index.xml
   (full URL: https://cloudbillingmanager.com/sitemap-index.xml)

5) URL Inspection → Request indexing for:
   /  /demo  /platform  /about  /contact

6) Wait 3–14 days, then search: site:cloudbillingmanager.com

Generated: ${new Date().toISOString()}
`,
        'utf8',
      )
    } catch {
      // dist may not exist yet
    }
  }
}

function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    buildStart() {
      writeSitemaps()
    },
    closeBundle() {
      writeSitemaps()
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), sitemapPlugin(), seoPrerenderPlugin(rootDir)],
})
