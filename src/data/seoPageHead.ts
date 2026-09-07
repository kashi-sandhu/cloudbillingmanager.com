import { getArticlesByCategory, getBlogArticle, getBlogCategory } from './blog.ts'
import { brand } from './brand.ts'
import { company } from './content.ts'
import { getIndustryPageSeo } from './industrySeo.ts'
import { getModulePageSeo } from './pageSeo.ts'
import { resourceHubItems } from './resources.ts'
import {
  defaultOgImageType,
  isNoindexRobots,
  seoBingbotIndex,
  seoBingbotNoindex,
  seoGeoIcbm,
  seoGooglebotIndex,
  seoGooglebotNoindex,
  seoRobotsIndex,
} from './seoHead.ts'
import { getStaticSeoLinks, type SeoLinkTag } from './seoLinks.ts'
import { buildBreadcrumbItems, getKeywordsForPath, getPageSeo, siteUrl, type PageSeo } from './seo.ts'
import {
  getPageLastModifiedIso,
  getPageOgImageAlt,
  getPageTwitterContext,
} from './seoStandards.ts'

export type SeoMetaTag = {
  attr: 'name' | 'property' | 'http-equiv' | 'itemprop'
  key: string
  content: string
  /** Unique id when multiple tags share the same key (e.g. article:tag). */
  uid?: string
}

const THEME_COLOR = '#3F68A8'

function abs(path: string) {
  return path.startsWith('http') ? path : `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

function pageKind(pathname: string) {
  if (pathname === '/') return 'Homepage'
  if (pathname === '/__404__') return 'Error'
  if (pathname.startsWith('/platform/')) return 'Product'
  if (pathname.startsWith('/industries/')) return 'Industry'
  if (pathname.match(/^\/blog\/category\//)) return 'Category'
  if (pathname.match(/^\/blog\/[^/]+$/)) return 'Article'
  if (pathname === '/blog') return 'Blog'
  if (pathname.startsWith('/resources/')) return 'Resource'
  if (pathname === '/resources') return 'ResourceHub'
  if (pathname === '/demo') return 'Demo'
  if (pathname === '/contact') return 'Contact'
  if (pathname === '/about') return 'About'
  if (pathname === '/press') return 'Press'
  if (pathname === '/privacy' || pathname === '/terms') return 'Legal'
  return 'WebPage'
}

function hubForPath(pathname: string): { path: string; title: string } | undefined {
  if (pathname.startsWith('/platform/') && pathname !== '/platform') {
    return { path: '/platform', title: 'Platform overview' }
  }
  if (pathname.startsWith('/industries/') && pathname !== '/industries') {
    return { path: '/industries', title: 'Industries overview' }
  }
  if (pathname.startsWith('/resources/') && pathname !== '/resources') {
    return { path: '/resources', title: 'Resources hub' }
  }
  if (pathname.startsWith('/blog/category/')) {
    return { path: '/blog', title: 'Blog index' }
  }
  if (pathname.match(/^\/blog\/[^/]+$/) && pathname !== '/blog') {
    return { path: '/blog', title: 'Blog index' }
  }
  return undefined
}

function navigationLinks(pathname: string, url: string): SeoLinkTag[] {
  if (pathname === '/__404__') return []

  const links: SeoLinkTag[] = []

  if (pathname !== '/') {
    links.push(
      { rel: 'start', href: `${siteUrl}/`, title: 'Site start' },
      { rel: 'index', href: `${siteUrl}/`, title: 'Cloud Billing Manager home' },
      { rel: 'first', href: `${siteUrl}/`, title: 'Homepage' },
    )
  }

  const crumbs = buildBreadcrumbItems(pathname)
  if (crumbs.length >= 2) {
    const parent = crumbs[crumbs.length - 2]
    links.push({ rel: 'up', href: parent.item, title: parent.name })
  }

  const hub = hubForPath(pathname)
  if (hub) {
    links.push(
      { rel: 'contents', href: abs(hub.path), title: hub.title },
      { rel: 'chapter', href: abs(hub.path), title: hub.title },
      { rel: 'subsection', href: url, title: getPageSeo(pathname).title },
    )
  }

  if (pathname === '/blog') {
    links.push({ rel: 'archives', href: abs('/blog'), title: 'Blog archive' })
  }

  if (pathname.startsWith('/resources')) {
    links.push({ rel: 'guide', href: abs('/resources/inventory-management-guide'), title: 'Inventory guide' })
    links.push({ rel: 'glossary', href: abs('/resources/glossary'), title: 'Glossary' })
  }

  if (pathname !== '/') {
    links.push({ rel: 'bookmark', href: url, title: getPageSeo(pathname).title })
  }

  return links
}

/** Internal related pages as link rel="related" — visible in page source for crawlers. */
export function getPageRelatedLinks(pathname: string): SeoLinkTag[] {
  const links: SeoLinkTag[] = []

  const moduleMatch = pathname.match(/^\/platform\/([^/]+)$/)
  if (moduleMatch) {
    const moduleSeo = getModulePageSeo(moduleMatch[1])
    moduleSeo?.relatedLinks.forEach((item) => {
      links.push({ rel: 'related', href: abs(item.to), title: item.label })
    })
    links.push(
      { rel: 'related', href: abs('/demo'), title: 'Schedule a demo' },
      { rel: 'related', href: abs('/industries'), title: 'Industries' },
    )
    return links
  }

  const industryMatch = pathname.match(/^\/industries\/([^/]+)$/)
  if (industryMatch) {
    const industrySeo = getIndustryPageSeo(industryMatch[1])
    industrySeo?.relatedModules.slice(0, 6).forEach((slug) => {
      links.push({
        rel: 'related',
        href: abs(`/platform/${slug}`),
        title: `Cloud Billing Manager ${slug}`,
      })
    })
    links.push(
      { rel: 'related', href: abs('/demo'), title: 'Book a demo' },
      { rel: 'related', href: abs('/platform'), title: 'Platform modules' },
    )
    return links
  }

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/)
  if (blogMatch && blogMatch[1] !== 'category') {
    const article = getBlogArticle(blogMatch[1])
    if (article) {
      article.relatedProductLinks.forEach((item) => {
        links.push({ rel: 'related', href: abs(item.to), title: item.label })
      })
      article.relatedArticles.slice(0, 5).forEach((slug) => {
        const related = getBlogArticle(slug)
        links.push({
          rel: 'related',
          href: abs(`/blog/${slug}`),
          title: related?.title ?? slug,
        })
      })
      links.push({
        rel: 'related',
        href: abs(`/blog/category/${article.category}`),
        title: `Category: ${article.category}`,
      })
    }
    return links
  }

  const categoryMatch = pathname.match(/^\/blog\/category\/([^/]+)$/)
  if (categoryMatch) {
    links.push({ rel: 'related', href: abs('/blog'), title: 'Cloud Billing Manager blog' })
    getArticlesByCategory(categoryMatch[1])
      .slice(0, 6)
      .forEach((article) => {
        links.push({
          rel: 'related',
          href: abs(`/blog/${article.slug}`),
          title: article.title,
        })
      })
    return links
  }

  const resourceMatch = pathname.match(/^\/resources\/([^/]+)$/)
  if (resourceMatch) {
    const item = resourceHubItems.find((entry) => entry.slug === resourceMatch[1])
    if (item) {
      links.push({ rel: 'related', href: abs(item.relatedProduct.to), title: item.relatedProduct.label })
    }
    resourceHubItems
      .filter((entry) => entry.slug !== resourceMatch[1])
      .slice(0, 4)
      .forEach((entry) => {
        links.push({ rel: 'related', href: abs(entry.path), title: entry.title })
      })
    links.push({ rel: 'related', href: abs('/resources'), title: 'All resources' })
    return links
  }

  const staticRelated: Record<string, SeoLinkTag[]> = {
    '/': [
      { rel: 'related', href: abs('/platform'), title: 'Platform modules' },
      { rel: 'related', href: abs('/demo'), title: 'Book a demo' },
      { rel: 'related', href: abs('/about'), title: 'About Cloud Billing Manager' },
      { rel: 'related', href: abs('/blog'), title: 'Blog' },
      { rel: 'related', href: abs('/resources'), title: 'Resources' },
    ],
    '/about': [
      { rel: 'related', href: abs('/platform'), title: 'Platform' },
      { rel: 'related', href: abs('/contact'), title: 'Contact' },
      { rel: 'related', href: abs('/press'), title: 'Press kit' },
      { rel: 'related', href: abs('/demo'), title: 'Book a demo' },
    ],
    '/platform': [
      { rel: 'related', href: abs('/industries'), title: 'Industries' },
      { rel: 'related', href: abs('/demo'), title: 'Book a demo' },
      { rel: 'related', href: abs('/why'), title: 'Why Cloud Billing Manager' },
    ],
    '/industries': [
      { rel: 'related', href: abs('/platform'), title: 'Platform modules' },
      { rel: 'related', href: abs('/demo'), title: 'Book a demo' },
      { rel: 'related', href: abs('/why'), title: 'Why Cloud Billing Manager' },
    ],
    '/why': [
      { rel: 'related', href: abs('/platform'), title: 'Platform' },
      { rel: 'related', href: abs('/demo'), title: 'Book a demo' },
      { rel: 'related', href: abs('/about'), title: 'About' },
    ],
    '/contact': [
      { rel: 'related', href: abs('/demo'), title: 'Book a demo' },
      { rel: 'related', href: abs('/about'), title: 'About' },
      { rel: 'related', href: abs('/platform'), title: 'Platform' },
    ],
    '/demo': [
      { rel: 'related', href: abs('/platform'), title: 'Platform' },
      { rel: 'related', href: abs('/contact'), title: 'Contact' },
      { rel: 'related', href: abs('/why'), title: 'Why Cloud Billing Manager' },
    ],
    '/resources': [
      { rel: 'related', href: abs('/blog'), title: 'Blog' },
      { rel: 'related', href: abs('/platform/inventory'), title: 'Inventory module' },
      { rel: 'related', href: abs('/resources/glossary'), title: 'Glossary' },
    ],
    '/blog': [
      { rel: 'related', href: abs('/resources'), title: 'Resources' },
      { rel: 'related', href: abs('/platform'), title: 'Platform' },
      { rel: 'related', href: abs('/demo'), title: 'Book a demo' },
    ],
    '/press': [
      { rel: 'related', href: abs('/about'), title: 'About' },
      { rel: 'related', href: abs('/contact'), title: 'Contact' },
      { rel: 'related', href: abs('/brand.txt'), title: 'Brand facts file' },
    ],
    '/privacy': [
      { rel: 'related', href: abs('/terms'), title: 'Terms of use' },
      { rel: 'related', href: abs('/contact'), title: 'Contact' },
    ],
    '/terms': [
      { rel: 'related', href: abs('/privacy'), title: 'Privacy policy' },
      { rel: 'related', href: abs('/contact'), title: 'Contact' },
    ],
  }

  return staticRelated[pathname] ?? []
}

/** Topic / keyword tag links — all major page types. */
export function getPageTagLinks(pathname: string): SeoLinkTag[] {
  const tags: SeoLinkTag[] = []

  for (const name of brand.alternateNames) {
    tags.push({ rel: 'tag', href: abs('/'), title: name })
  }

  const moduleMatch = pathname.match(/^\/platform\/([^/]+)$/)
  if (moduleMatch) {
    const moduleSeo = getModulePageSeo(moduleMatch[1])
    if (moduleSeo?.primaryKeyword) {
      tags.push({ rel: 'tag', href: abs(pathname), title: moduleSeo.primaryKeyword })
    }
    tags.push({ rel: 'tag', href: abs(pathname), title: 'Cloud ERP UK' })
    tags.push({ rel: 'tag', href: abs(pathname), title: 'food distribution software' })
    return tags
  }

  const industryMatch = pathname.match(/^\/industries\/([^/]+)$/)
  if (industryMatch) {
    const industrySeo = getIndustryPageSeo(industryMatch[1])
    if (industrySeo) {
      tags.push({ rel: 'tag', href: abs(pathname), title: industrySeo.name })
      tags.push({ rel: 'tag', href: abs(pathname), title: `${industrySeo.name} ERP UK` })
      tags.push({ rel: 'tag', href: abs(pathname), title: 'food distribution ERP' })
    }
    return tags
  }

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/)
  if (blogMatch && blogMatch[1] !== 'category') {
    const article = getBlogArticle(blogMatch[1])
    if (article) {
      tags.push({ rel: 'tag', href: abs(pathname), title: article.primaryKeyword })
      article.secondaryKeywords.slice(0, 6).forEach((keyword) => {
        tags.push({ rel: 'tag', href: abs(pathname), title: keyword })
      })
      tags.push({
        rel: 'tag',
        href: abs(`/blog/category/${article.category}`),
        title: article.category,
      })
    }
    return tags
  }

  const categoryMatch = pathname.match(/^\/blog\/category\/([^/]+)$/)
  if (categoryMatch) {
    const category = getBlogCategory(categoryMatch[1])
    if (category) {
      tags.push({ rel: 'tag', href: abs(pathname), title: category.name })
      tags.push({ rel: 'tag', href: abs(pathname), title: `${category.name} guides` })
    }
    return tags
  }

  const resourceMatch = pathname.match(/^\/resources\/([^/]+)$/)
  if (resourceMatch) {
    const item = resourceHubItems.find((entry) => entry.slug === resourceMatch[1])
    if (item) {
      tags.push({ rel: 'tag', href: abs(pathname), title: item.title })
      tags.push({ rel: 'tag', href: abs(pathname), title: item.audience })
    }
    return tags
  }

  if (pathname === '/demo') {
    tags.push({ rel: 'tag', href: abs('/demo'), title: 'Cloud Billing Manager demo' })
  }

  return tags
}

export function getFullPageHeadLinks(pathname: string, url: string, is404: boolean): SeoLinkTag[] {
  if (is404) return [...getStaticSeoLinks()]

  const image = getPageSeo(pathname).ogImage ?? `${siteUrl}/images/og/cloudbillingmanager-og.jpg`

  return [
    ...getStaticSeoLinks(),
    { rel: 'canonical', href: url },
    { rel: 'shortlink', href: url, title: 'Short URL' },
    { rel: 'home', href: `${siteUrl}/` },
    { rel: 'sitemap', href: `${siteUrl}/sitemap-index.xml`, type: 'application/xml', title: 'Sitemap index' },
    { rel: 'image_src', href: image, title: getPageOgImageAlt(pathname, getPageSeo(pathname).title) },
    { rel: 'alternate', href: url, hreflang: 'en-GB' },
    { rel: 'alternate', href: url, hreflang: 'x-default' },
    ...navigationLinks(pathname, url),
    ...getPageRelatedLinks(pathname),
    ...getPageTagLinks(pathname),
  ]
}

function dublinCoreMeta(pathname: string, seo: PageSeo, url: string, article?: ReturnType<typeof getBlogArticle>): SeoMetaTag[] {
  const dcType = pathname.startsWith('/blog/') && !pathname.includes('/category') ? 'Text.Article' : 'Text.Web Page'
  const tags: SeoMetaTag[] = [
    { attr: 'name', key: 'DC.title', content: seo.title },
    { attr: 'name', key: 'DC.creator', content: company.presenter },
    { attr: 'name', key: 'DC.subject', content: brand.name },
    { attr: 'name', key: 'DC.description', content: seo.description },
    { attr: 'name', key: 'DC.publisher', content: company.presenter },
    { attr: 'name', key: 'DC.contributor', content: company.presenter },
    { attr: 'name', key: 'DC.type', content: dcType },
    { attr: 'name', key: 'DC.format', content: 'text/html' },
    { attr: 'name', key: 'DC.identifier', content: url },
    { attr: 'name', key: 'DC.language', content: 'en-GB' },
    { attr: 'name', key: 'DC.coverage', content: 'United Kingdom' },
    { attr: 'name', key: 'DC.rights', content: `Copyright ${company.presenter}` },
    { attr: 'name', key: 'DC.source', content: siteUrl },
  ]

  if (article) {
    tags.push(
      { attr: 'name', key: 'DC.date', content: article.publishedAt },
      { attr: 'name', key: 'DC.date.modified', content: article.updatedAt },
      { attr: 'name', key: 'DC.date.issued', content: article.publishedAt },
    )
  }

  return tags
}

function microdataMeta(seo: PageSeo, url: string, image: string): SeoMetaTag[] {
  return [
    { attr: 'itemprop', key: 'name', content: seo.title },
    { attr: 'itemprop', key: 'description', content: seo.description },
    { attr: 'itemprop', key: 'url', content: url },
    { attr: 'itemprop', key: 'image', content: image },
    { attr: 'itemprop', key: 'inLanguage', content: 'en-GB' },
    { attr: 'itemprop', key: 'publisher', content: company.presenter },
  ]
}

function seeAlsoMeta(related: SeoLinkTag[]): SeoMetaTag[] {
  return related.slice(0, 8).map((link, index) => ({
    attr: 'property' as const,
    key: 'og:see_also',
    content: link.href,
    uid: `og-see-also-${index}`,
  }))
}

export function buildPageMetaTags(pathname: string, seo: PageSeo, image: string): SeoMetaTag[] {
  const noindex = isNoindexRobots(seo.robots)
  const robots = seo.robots ?? seoRobotsIndex
  const pageUrl = `${siteUrl}${seo.path === '/' ? '/' : seo.path}`
  const kind = pageKind(pathname)
  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/)
  const article =
    blogMatch && blogMatch[1] !== 'category' ? getBlogArticle(blogMatch[1]) : undefined
  const related = getPageRelatedLinks(pathname)
  const lastModified = getPageLastModifiedIso(pathname)
  const ogImageAlt = getPageOgImageAlt(pathname, seo.title)
  const twitterContext = getPageTwitterContext(pathname)

  const tags: SeoMetaTag[] = [
    { attr: 'http-equiv', key: 'content-language', content: 'en-GB' },
    { attr: 'http-equiv', key: 'X-UA-Compatible', content: 'IE=edge' },
    { attr: 'name', key: 'description', content: seo.description },
    { attr: 'name', key: 'abstract', content: seo.description },
    { attr: 'name', key: 'summary', content: seo.description },
    { attr: 'name', key: 'keywords', content: getKeywordsForPath(pathname) },
    { attr: 'name', key: 'subject', content: brand.name },
    { attr: 'name', key: 'topic', content: brand.name },
    { attr: 'name', key: 'pagetype', content: kind },
    { attr: 'name', key: 'page-topic', content: kind },
    { attr: 'name', key: 'classification', content: 'Business Software, ERP, Food Distribution' },
    { attr: 'name', key: 'audience', content: 'Business professionals, food distributors, UK wholesalers' },
    { attr: 'name', key: 'copyright', content: company.presenter },
    { attr: 'name', key: 'owner', content: company.presenter },
    { attr: 'name', key: 'designer', content: company.presenter },
    { attr: 'name', key: 'publisher', content: company.presenter },
    { attr: 'name', key: 'reply-to', content: company.email },
    { attr: 'name', key: 'contact', content: company.email },
    { attr: 'name', key: 'url', content: pageUrl },
    { attr: 'name', key: 'identifier-URL', content: pageUrl },
    { attr: 'name', key: 'pagename', content: seo.title },
    { attr: 'name', key: 'category', content: 'Business Software' },
    { attr: 'name', key: 'coverage', content: 'United Kingdom' },
    { attr: 'name', key: 'distribution', content: 'global' },
    { attr: 'name', key: 'rating', content: 'general' },
    { attr: 'name', key: 'language', content: 'en-GB' },
    { attr: 'name', key: 'revised', content: lastModified.slice(0, 10) },
    { attr: 'name', key: 'google', content: 'notranslate' },
    { attr: 'name', key: 'robots', content: robots },
    { attr: 'name', key: 'googlebot', content: noindex ? seoGooglebotNoindex : seoGooglebotIndex },
    { attr: 'name', key: 'bingbot', content: noindex ? seoBingbotNoindex : seoBingbotIndex },
    { attr: 'name', key: 'slurp', content: noindex ? 'noindex, nofollow' : 'index, follow' },
    { attr: 'name', key: 'author', content: company.presenter },
    { attr: 'name', key: 'web_author', content: company.presenter },
    { attr: 'name', key: 'application-name', content: brand.name },
    { attr: 'name', key: 'apple-mobile-web-app-title', content: 'CBM' },
    { attr: 'name', key: 'apple-mobile-web-app-capable', content: 'yes' },
    { attr: 'name', key: 'mobile-web-app-capable', content: 'yes' },
    { attr: 'name', key: 'HandheldFriendly', content: 'True' },
    { attr: 'name', key: 'MobileOptimized', content: 'width' },
    { attr: 'name', key: 'theme-color', content: THEME_COLOR },
    { attr: 'name', key: 'color-scheme', content: 'light' },
    { attr: 'name', key: 'format-detection', content: 'telephone=no' },
    { attr: 'name', key: 'referrer', content: 'strict-origin-when-cross-origin' },
    { attr: 'name', key: 'image', content: image },
    { attr: 'name', key: 'thumbnail', content: image },
    { attr: 'name', key: 'geo.region', content: 'GB' },
    { attr: 'name', key: 'geo.placename', content: company.office },
    { attr: 'name', key: 'ICBM', content: seoGeoIcbm },
    { attr: 'name', key: 'twitter:card', content: 'summary_large_image' },
    { attr: 'name', key: 'twitter:domain', content: brand.domain },
    { attr: 'name', key: 'twitter:url', content: pageUrl },
    { attr: 'name', key: 'twitter:title', content: seo.title },
    { attr: 'name', key: 'twitter:description', content: seo.description },
    { attr: 'name', key: 'twitter:image', content: image },
    { attr: 'name', key: 'twitter:image:alt', content: ogImageAlt },
    { attr: 'name', key: 'twitter:label1', content: 'Brand' },
    { attr: 'name', key: 'twitter:data1', content: brand.name },
    { attr: 'name', key: 'twitter:label2', content: twitterContext.label },
    { attr: 'name', key: 'twitter:data2', content: twitterContext.value },
    { attr: 'property', key: 'og:site_name', content: company.product },
    { attr: 'property', key: 'og:locale', content: 'en_GB' },
    { attr: 'property', key: 'og:updated_time', content: lastModified },
    { attr: 'property', key: 'og:determiner', content: 'the' },
    { attr: 'property', key: 'og:type', content: article ? 'article' : 'website' },
    { attr: 'property', key: 'og:title', content: seo.title },
    { attr: 'property', key: 'og:description', content: seo.description },
    { attr: 'property', key: 'og:url', content: pageUrl },
    { attr: 'property', key: 'og:image', content: image },
    { attr: 'property', key: 'og:image:secure_url', content: image },
    { attr: 'property', key: 'og:image:type', content: defaultOgImageType },
    { attr: 'property', key: 'og:image:width', content: '1200' },
    { attr: 'property', key: 'og:image:height', content: '630' },
    { attr: 'property', key: 'og:image:alt', content: ogImageAlt },
    ...dublinCoreMeta(pathname, seo, pageUrl, article),
    ...microdataMeta(seo, pageUrl, image),
    ...seeAlsoMeta(related),
  ]

  brand.alternateNames.forEach((name, index) => {
    tags.push({ attr: 'name', key: 'alternate', content: name, uid: `brand-alt-${index}` })
  })

  if (article) {
    tags.push(
      { attr: 'property', key: 'article:published_time', content: article.publishedAt },
      { attr: 'property', key: 'article:modified_time', content: article.updatedAt },
      { attr: 'property', key: 'og:updated_time', content: article.updatedAt },
      { attr: 'property', key: 'article:author', content: company.presenter },
      { attr: 'property', key: 'article:publisher', content: siteUrl },
      { attr: 'property', key: 'article:section', content: article.category },
      { attr: 'property', key: 'article:tag', content: article.primaryKeyword, uid: 'article-tag-0' },
      { attr: 'name', key: 'news_keywords', content: article.primaryKeyword, uid: 'news-kw-0' },
    )
    article.secondaryKeywords.slice(0, 6).forEach((keyword, index) => {
      tags.push(
        { attr: 'property', key: 'article:tag', content: keyword, uid: `article-tag-${index + 1}` },
        { attr: 'name', key: 'news_keywords', content: keyword, uid: `news-kw-${index + 1}` },
      )
    })
  }

  const moduleMatch = pathname.match(/^\/platform\/([^/]+)$/)
  if (moduleMatch) {
    const moduleSeo = getModulePageSeo(moduleMatch[1])
    if (moduleSeo?.primaryKeyword) {
      tags.push({ attr: 'name', key: 'product:category', content: moduleSeo.primaryKeyword })
    }
  }

  return tags
}

export function getPageHeadBundle(pathname: string) {
  const seo = getPageSeo(pathname)
  const is404 = pathname === '/__404__'
  const url = is404 ? `${siteUrl}/404` : seo.path === '/' ? `${siteUrl}/` : `${siteUrl}${seo.path}`
  const image = seo.ogImage ?? `${siteUrl}/images/og/cloudbillingmanager-og.jpg`

  return {
    seo,
    url,
    image,
    is404,
    metaTags: buildPageMetaTags(pathname, seo, image),
    linkTags: getFullPageHeadLinks(pathname, url, is404),
  }
}
