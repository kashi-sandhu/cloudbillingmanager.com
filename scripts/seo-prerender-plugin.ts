import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import type { Plugin } from 'vite'
import { getPageHeadBundle, type SeoMetaTag } from '../src/data/seoPageHead.ts'
import { buildCrawlNoscriptHtml } from '../src/data/seoCrawl.ts'
import type { SeoLinkTag } from '../src/data/seoLinks.ts'
import { buildPrerenderJsonLdGraph } from '../src/data/seoSchema.ts'
import { getAllPublicPaths } from '../src/data/sitemap.ts'

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function metaTag(tag: SeoMetaTag) {
  const uid = tag.uid ? ` data-seo-uid="${escapeHtml(tag.uid)}"` : ''
  if (tag.attr === 'http-equiv') {
    return `<meta http-equiv="${escapeHtml(tag.key)}" content="${escapeHtml(tag.content)}"${uid} />`
  }
  if (tag.attr === 'itemprop') {
    return `<meta itemprop="${escapeHtml(tag.key)}" content="${escapeHtml(tag.content)}"${uid} />`
  }
  return `<meta ${tag.attr}="${escapeHtml(tag.key)}" content="${escapeHtml(tag.content)}"${uid} />`
}

function replaceMetaTag(html: string, tag: SeoMetaTag) {
  if (tag.uid) {
    return html.replace('</head>', `    ${metaTag(tag)}\n  </head>`)
  }
  const re =
    tag.attr === 'http-equiv'
      ? new RegExp(`<meta\\s+http-equiv="${tag.key}"\\s+content="[^"]*"\\s*/?>`, 'i')
      : new RegExp(
          `<meta\\s+${tag.attr}="${tag.key}"\\s+content="[^"]*"\\s*/?>|<meta\\s+content="[^"]*"\\s+${tag.attr}="${tag.key}"\\s*/?>`,
          'i',
        )
  const next = metaTag(tag)
  if (re.test(html)) return html.replace(re, next)
  return html.replace('</head>', `    ${next}\n  </head>`)
}

function linkTag(link: SeoLinkTag) {
  const attrs = [
    `rel="${link.rel}"`,
    `href="${escapeHtml(link.href)}"`,
    link.type ? `type="${escapeHtml(link.type)}"` : '',
    link.title ? `title="${escapeHtml(link.title)}"` : '',
    link.hreflang ? `hreflang="${escapeHtml(link.hreflang)}"` : '',
    link.crossOrigin ? `crossorigin="${escapeHtml(link.crossOrigin)}"` : '',
  ]
    .filter(Boolean)
    .join(' ')
  return `<link ${attrs} />`
}

function ensureLinkTag(html: string, link: SeoLinkTag) {
  if (link.hreflang && html.includes(`hreflang="${link.hreflang}"`) && html.includes(`href="${link.href}"`)) {
    return html
  }
  if (link.title && html.includes(`title="${link.title}"`) && html.includes(`rel="${link.rel}"`)) {
    return html
  }
  if (!link.hreflang && !link.title && html.includes(`href="${link.href}"`) && html.includes(`rel="${link.rel}"`)) {
    return html
  }
  return html.replace('</head>', `    ${linkTag(link)}\n  </head>`)
}

function replaceTitle(html: string, title: string) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
}

function stripStaticJsonLd(html: string) {
  return html
    .replace(/<script type="application\/ld\+json" id="seo-[^"]+">[\s\S]*?<\/script>\s*/gi, '')
    .replace(/<script type="application\/ld\+json" id="ld-prerender">[\s\S]*?<\/script>\s*/gi, '')
}

function injectJsonLd(html: string, pathname: string, title: string, description: string, url: string, image: string) {
  const graph = buildPrerenderJsonLdGraph(pathname, title, description, url, image)
  const data = { '@context': 'https://schema.org', '@graph': graph }
  const script = `<script type="application/ld+json" id="ld-prerender">${JSON.stringify(data)}</script>`
  const cleaned = stripStaticJsonLd(html)
  return cleaned.replace('</head>', `    ${script}\n  </head>`)
}

function injectNoscript(html: string, pathname: string, title: string, description: string, url: string) {
  const block = buildCrawlNoscriptHtml(pathname, title, description, url)
  const cleaned = html.replace(/<noscript>[\s\S]*?<\/noscript>\s*/gi, '')
  return cleaned.replace('<div id="root"></div>', `${block}\n    <div id="root"></div>`)
}

function injectSearchConsoleVerification(html: string) {
  let out = html
  const gscToken = process.env.VITE_GSC_VERIFICATION?.trim()
  if (gscToken) {
    out = replaceMetaTag(out, { attr: 'name', key: 'google-site-verification', content: gscToken })
  }
  const bingToken = process.env.VITE_BING_VERIFICATION?.trim()
  if (bingToken) {
    out = replaceMetaTag(out, { attr: 'name', key: 'msvalidate.01', content: bingToken })
  }
  return out
}

function removeHreflang(html: string) {
  return html
    .replace(/<link\s+rel="alternate"\s+hreflang="en-GB"[^>]*\/?>\s*/gi, '')
    .replace(/<link\s+rel="alternate"\s+hreflang="x-default"[^>]*\/?>\s*/gi, '')
}

function removeCanonical(html: string) {
  return html.replace(/<link\s+rel="canonical"[^>]*\/?>\s*/gi, '')
}

function applyPageSeo(baseHtml: string, pathname: string) {
  const head = getPageHeadBundle(pathname)

  let html = injectSearchConsoleVerification(baseHtml)
  html = html.replace(/<html\s+lang="[^"]*"/i, '<html lang="en-GB"')
  html = replaceTitle(html, head.seo.title)

  for (const tag of head.metaTags) {
    html = replaceMetaTag(html, tag)
  }

  // Remove template homepage canonical/hreflang before injecting page-specific URLs
  html = removeCanonical(html)
  html = removeHreflang(html)

  for (const link of head.linkTags) {
    if (head.is404 && (link.rel === 'canonical' || link.hreflang)) continue
    html = ensureLinkTag(html, link)
  }

  if (!head.is404) {
    html = injectJsonLd(html, pathname, head.seo.title, head.seo.description, head.url, head.image)
  } else {
    html = stripStaticJsonLd(html)
  }

  html = injectNoscript(html, pathname, head.seo.title, head.seo.description, head.url)
  return html
}

export function seoPrerenderPlugin(rootDir: string): Plugin {
  return {
    name: 'seo-prerender-html',
    apply: 'build',
    closeBundle() {
      const distDir = resolve(rootDir, 'dist')
      const builtIndex = join(distDir, 'index.html')
      let baseHtml: string
      try {
        baseHtml = readFileSync(builtIndex, 'utf8')
      } catch {
        console.warn('[seo-prerender] dist/index.html missing — skip')
        return
      }

      const paths = getAllPublicPaths()
      let count = 0

      for (const pathname of paths) {
        const html = applyPageSeo(baseHtml, pathname)
        if (pathname === '/') {
          writeFileSync(builtIndex, html, 'utf8')
          count += 1
          continue
        }

        const outDir = join(distDir, ...pathname.slice(1).split('/'))
        mkdirSync(outDir, { recursive: true })
        writeFileSync(join(outDir, 'index.html'), html, 'utf8')
        count += 1
      }

      const notFoundHtml = applyPageSeo(baseHtml, '/__404__')
      writeFileSync(join(distDir, '404.html'), notFoundHtml, 'utf8')

      console.log(`[seo-prerender] Wrote SEO HTML shells for ${count} routes + 404.html`)
    },
  }
}
