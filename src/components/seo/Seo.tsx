import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { buildPrerenderJsonLdGraph } from '../../data/seoSchema.ts'
import { getPageHeadBundle, type SeoMetaTag } from '../../data/seoPageHead.ts'
import { type SeoLinkTag } from '../../data/seoLinks.ts'

const JSON_LD_IDS = ['ld-prerender', 'ld-graph', 'ld-org', 'ld-brand', 'ld-app', 'ld-site', 'ld-crumbs', 'ld-faq', 'ld-article', 'ld-glossary']

function metaKey(tag: SeoMetaTag) {
  return tag.uid ?? `${tag.attr}|${tag.key}`
}

function upsertMeta(tag: SeoMetaTag) {
  const selector = tag.uid
    ? `meta[data-seo-uid="${tag.uid}"]`
    : tag.attr === 'itemprop'
      ? `meta[itemprop="${tag.key}"]`
      : tag.attr === 'http-equiv'
        ? `meta[http-equiv="${tag.key}"]`
        : tag.attr === 'property'
          ? `meta[property="${tag.key}"]`
          : `meta[name="${tag.key}"]`
  let element = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  element.removeAttribute('name')
  element.removeAttribute('property')
  element.removeAttribute('http-equiv')
  element.removeAttribute('itemprop')
  if (tag.attr === 'http-equiv') {
    element.setAttribute('http-equiv', tag.key)
  } else if (tag.attr === 'itemprop') {
    element.setAttribute('itemprop', tag.key)
  } else {
    element.setAttribute(tag.attr, tag.key)
  }
  element.content = tag.content
  element.setAttribute('data-seo-managed', 'true')
  element.setAttribute('data-seo-key', metaKey(tag))
  if (tag.uid) element.setAttribute('data-seo-uid', tag.uid)
  else element.removeAttribute('data-seo-uid')
}

function syncMetaTags(tags: SeoMetaTag[]) {
  const keys = new Set(tags.map(metaKey))
  document.head.querySelectorAll('meta[data-seo-managed="true"]').forEach((node) => {
    const key = node.getAttribute('data-seo-key')
    if (key && !keys.has(key)) node.remove()
  })
}

function linkKey(link: SeoLinkTag) {
  return `${link.rel}|${link.href}|${link.hreflang ?? ''}|${link.title ?? ''}`
}

function upsertLinkTag(link: SeoLinkTag) {
  const managed = [...document.head.querySelectorAll('link[data-seo-managed="true"]')] as HTMLLinkElement[]
  const existing = managed.find(
    (el) =>
      el.rel === link.rel &&
      el.href === link.href &&
      (el.hreflang || '') === (link.hreflang || '') &&
      (el.title || '') === (link.title || ''),
  )
  const element = existing ?? document.createElement('link')
  if (!existing) document.head.appendChild(element)
  element.rel = link.rel
  element.href = link.href
  if (link.type) element.type = link.type
  else element.removeAttribute('type')
  if (link.title) element.title = link.title
  else element.removeAttribute('title')
  if (link.hreflang) element.hreflang = link.hreflang
  else element.removeAttribute('hreflang')
  if (link.crossOrigin) element.crossOrigin = link.crossOrigin
  else element.removeAttribute('crossorigin')
  element.setAttribute('data-seo-managed', 'true')
}

function removeStaleHeadLinks() {
  document
    .querySelectorAll('link[rel="canonical"]:not([data-seo-managed="true"])')
    .forEach((node) => node.remove())
  document
    .querySelectorAll('link[rel="alternate"][hreflang]:not([data-seo-managed="true"])')
    .forEach((node) => node.remove())
}

function syncHeadLinks(links: SeoLinkTag[]) {
  const keys = new Set(links.map(linkKey))
  document.head.querySelectorAll('link[data-seo-managed="true"]').forEach((node) => {
    const el = node as HTMLLinkElement
    const key = linkKey({
      rel: el.rel,
      href: el.href,
      hreflang: el.hreflang || undefined,
      title: el.title || undefined,
    })
    if (!keys.has(key)) el.remove()
  })
  for (const link of links) upsertLinkTag(link)
}

function removeAllJsonLd() {
  for (const id of JSON_LD_IDS) {
    document.getElementById(id)?.remove()
  }
}

function setJsonLdGraph(pathname: string, title: string, description: string, url: string, image: string) {
  document.getElementById('ld-prerender')?.remove()
  const graph = buildPrerenderJsonLdGraph(pathname, title, description, url, image)
  let script = document.getElementById('ld-graph') as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.id = 'ld-graph'
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}

export default function Seo() {
  const { pathname } = useLocation()
  const head = getPageHeadBundle(pathname)
  const isNotFound = head.seo.robots?.includes('noindex') ?? false

  useEffect(() => {
    document.title = head.seo.title
    document.documentElement.lang = 'en-GB'

    syncMetaTags(head.metaTags)
    for (const tag of head.metaTags) upsertMeta(tag)
    removeStaleHeadLinks()
    syncHeadLinks(head.linkTags)

    if (isNotFound) {
      removeAllJsonLd()
    } else {
      setJsonLdGraph(pathname, head.seo.title, head.seo.description, head.url, head.image)
    }
  }, [head, isNotFound, pathname])

  return null
}
