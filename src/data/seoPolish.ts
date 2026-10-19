import { getBlogArticle, getBlogCategory } from './blog.ts'
import { getIndustryPageSeo } from './industrySeo.ts'
import { getModulePageSeo, staticPageSeo } from './pageSeo.ts'
import { SEO_BRAND, seoDescription, seoPageTitle, seoPremiumDescription } from './seoStandards.ts'

type PageKind = 'home' | 'commercial' | 'product' | 'industry' | 'blog' | 'resource' | 'legal' | 'utility'

function pageKind(pathname: string): PageKind {
  if (pathname === '/') return 'home'
  if (pathname.startsWith('/platform/')) return 'product'
  if (pathname.startsWith('/industries/')) return 'industry'
  if (pathname.startsWith('/blog')) return 'blog'
  if (pathname.startsWith('/resources')) return 'resource'
  if (pathname === '/pricing') return 'product'
  if (pathname === '/privacy' || pathname === '/terms') return 'legal'
  if (pathname === '/demo' || pathname === '/contact' || pathname === '/why') return 'commercial'
  return 'utility'
}

/** Apply premium description rules consistently across all routes. */
export function polishPageDescription(pathname: string, description: string): string {
  const kind = pageKind(pathname)

  if (kind === 'product' || kind === 'industry') {
    return seoPremiumDescription(description)
  }

  if (kind === 'commercial' && pathname === '/demo') {
    return seoDescription(
      'Schedule a personalised Cloud Billing Manager demo. See inventory, invoicing, POS and VAT workflows live — built for UK food distributors.',
    )
  }

  if (kind === 'commercial' && pathname === '/contact') {
    return seoDescription(
      'Contact Cloud Billing Manager — email sophia@cloudbillingmanager.com or call 020 8080 5153. AVANTCORE Technologies, London. Book a demo at cloudbillingmanager.com.',
    )
  }

  if (kind === 'commercial' && pathname === '/why') {
    return seoPremiumDescription(
      'Replace Sage, Excel and disconnected systems. Cloud Billing Manager unifies inventory, billing, sales, POS and accounting for UK food distributors.',
    )
  }

  if (kind === 'blog' || kind === 'resource') {
    return seoPremiumDescription(description, 'Official guides from cloudbillingmanager.com.')
  }

  if (kind === 'home') {
    return seoDescription(
      'Official Cloud Billing Manager website. Cloud ERP for UK food distributors — inventory, billing, invoicing, sales, purchasing, accounting and POS in one platform.',
    )
  }

  if (kind === 'utility') {
    if (pathname === '/about') {
      return seoDescription(
        'About Cloud Billing Manager — official cloud ERP for UK food distributors by AVANTCORE Technologies. Inventory, billing, invoicing and POS at cloudbillingmanager.com.',
      )
    }
    if (pathname === '/press') {
      return seoDescription(
        'Official Cloud Billing Manager press kit. Brand facts, boilerplate and media resources for cloudbillingmanager.com — AVANTCORE Technologies.',
      )
    }
    if (pathname === '/platform') {
      return seoPremiumDescription(
        'Explore 13 integrated Cloud Billing Manager modules for UK food distribution — inventory, billing, sales, POS, purchasing and accounting.',
      )
    }
  }

  return seoDescription(description)
}

/** Ensure titles follow one professional pattern site-wide. */
export function polishPageTitle(pathname: string, title: string): string {
  if (pathname === '/') return title
  if (title.includes(SEO_BRAND)) return title

  const moduleMatch = pathname.match(/^\/platform\/([^/]+)$/)
  if (moduleMatch) {
    const moduleSeo = getModulePageSeo(moduleMatch[1])
    if (moduleSeo) return moduleSeo.title
  }

  const industryMatch = pathname.match(/^\/industries\/([^/]+)$/)
  if (industryMatch) {
    const industrySeo = getIndustryPageSeo(industryMatch[1])
    if (industrySeo) return industrySeo.seoTitle
  }

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/)
  if (blogMatch && blogMatch[1] !== 'category') {
    const article = getBlogArticle(blogMatch[1])
    if (article) return article.seoTitle
  }

  const categoryMatch = pathname.match(/^\/blog\/category\/([^/]+)$/)
  if (categoryMatch) {
    const category = getBlogCategory(categoryMatch[1])
    if (category) return category.seoTitle
  }

  const staticPage = staticPageSeo[pathname]
  if (staticPage) return staticPage.title

  return seoPageTitle(title.replace(/\s*\|\s*.*$/, '').trim())
}
