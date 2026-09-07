import { bannerForPath } from './banners.ts'
import { getBlogArticle, getBlogCategory } from './blog.ts'
import { company, industries, modules } from './content.ts'
import { getIndustryPageSeo } from './industrySeo.ts'
import { brandSeoKeywords, defaultSeoKeywords } from './seoHead.ts'
import { defaultSocialImage } from './media.ts'
import { getModulePageSeo, homePageSeo, staticPageSeo } from './pageSeo.ts'
import { polishPageDescription, polishPageTitle } from './seoPolish.ts'
import { seoPageTitle } from './seoStandards.ts'

export type PageSeo = {
  title: string
  description: string
  path: string
  robots?: string
  ogImage?: string
}

export const siteUrl = company.website.replace(/\/$/, '')
export const defaultOgImage = `${siteUrl}${defaultSocialImage}`

const fallbackDescription = `${company.headline}. ${company.tagline} Quotations, invoices, inventory, warehouse, logistics, accounting, VAT, and POS in one cloud system.`

function ogForPath(pathname: string) {
  const banner = bannerForPath(pathname)
  return `${siteUrl}${banner.endsWith('.webp') ? banner.replace(/\.webp$/, '.jpg') : banner}`
}

function finalize(pathname: string, title: string, description: string): Pick<PageSeo, 'title' | 'description'> {
  return {
    title: polishPageTitle(pathname, title),
    description: polishPageDescription(pathname, description),
  }
}

export function getPageSeo(pathname: string): PageSeo {
  const staticPage = staticPageSeo[pathname]
  if (staticPage) {
    const polished = finalize(pathname, staticPage.title, staticPage.description)
    return {
      ...polished,
      path: pathname,
      ogImage: ogForPath(pathname),
    }
  }

  const blogCategoryMatch = pathname.match(/^\/blog\/category\/([^/]+)$/)
  if (blogCategoryMatch) {
    const category = getBlogCategory(blogCategoryMatch[1])
    if (category) {
      const polished = finalize(pathname, category.seoTitle, category.seoDescription)
      return {
        ...polished,
        path: pathname,
        ogImage: ogForPath(pathname),
      }
    }
  }

  const blogPostMatch = pathname.match(/^\/blog\/([^/]+)$/)
  if (blogPostMatch && blogPostMatch[1] !== 'category') {
    const article = getBlogArticle(blogPostMatch[1])
    if (article) {
      const image = article.image.endsWith('.webp')
        ? article.image.replace(/\.webp$/, '.jpg')
        : article.image
      const polished = finalize(pathname, article.seoTitle, article.seoDescription)
      return {
        ...polished,
        path: pathname,
        ogImage: `${siteUrl}${image}`,
      }
    }
  }

  const moduleMatch = pathname.match(/^\/platform\/([^/]+)$/)
  if (moduleMatch) {
    const module = modules.find((item) => item.slug === moduleMatch[1])
    const moduleSeo = getModulePageSeo(moduleMatch[1])
    if (module && moduleSeo) {
      const polished = finalize(pathname, moduleSeo.title, moduleSeo.description)
      return {
        ...polished,
        path: pathname,
        ogImage: ogForPath(pathname),
      }
    }
    if (module) {
      const polished = finalize(pathname, seoPageTitle(module.name), `${module.tagline} ${module.description}`)
      return {
        ...polished,
        path: pathname,
        ogImage: ogForPath(pathname),
      }
    }
  }

  const industryMatch = pathname.match(/^\/industries\/([^/]+)$/)
  if (industryMatch) {
    const industrySeo = getIndustryPageSeo(industryMatch[1])
    if (industrySeo) {
      const polished = finalize(pathname, industrySeo.seoTitle, industrySeo.seoDescription)
      return {
        ...polished,
        path: pathname,
        ogImage: ogForPath(pathname),
      }
    }
    const industry = industries.find((item) => item.slug === industryMatch[1])
    if (industry) {
      const polished = finalize(
        pathname,
        seoPageTitle(`${industry.name} ERP Software`),
        `Cloud Billing Manager supports ${industry.name} businesses with inventory management, billing, sales, purchasing and reporting in one cloud ERP platform.`,
      )
      return {
        ...polished,
        path: pathname,
        ogImage: ogForPath(pathname),
      }
    }
  }

  return {
    title: 'Page not found | Cloud Billing Manager',
    description: polishPageDescription(pathname, fallbackDescription),
    path: pathname,
    robots: 'noindex, nofollow',
  }
}

export type BreadcrumbItem = { name: string; item: string }

export function buildBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const seo = getPageSeo(pathname)
  const crumbs: BreadcrumbItem[] = [{ name: 'Home', item: `${siteUrl}/` }]
  const parts = seo.path.split('/').filter(Boolean)
  let trail = ''

  parts.forEach((part) => {
    trail += `/${part}`
    const module = modules.find((item) => item.slug === part)
    const industry = industries.find((item) => item.slug === part)
    const industrySeo = getIndustryPageSeo(part)
    const blogCategory = getBlogCategory(part)
    const blogArticle = getBlogArticle(part)
    const labels: Record<string, string> = {
      platform: 'Platform',
      industries: 'Industries',
      why: 'Why CBM',
      about: 'About',
      contact: 'Contact',
      demo: 'Book a demo',
      blog: 'Blog',
      category: 'Category',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      resources: 'Resources',
      press: 'Press',
      'inventory-management-checklist': 'Inventory checklist',
      'inventory-management-guide': 'Inventory guide',
      'inventory-software-vs-spreadsheets': 'Software vs spreadsheets',
      glossary: 'Glossary',
    }
    crumbs.push({
      name:
        labels[part] ??
        module?.nav ??
        industrySeo?.name ??
        industry?.name ??
        blogCategory?.name ??
        blogArticle?.title ??
        part,
      item: `${siteUrl}${trail}`,
    })
  })

  return crumbs
}

/** Route-specific keywords for prerender and meta (brand + page topic). */
export function getKeywordsForPath(pathname: string): string {
  const moduleMatch = pathname.match(/^\/platform\/([^/]+)$/)
  if (moduleMatch) {
    const moduleSeo = getModulePageSeo(moduleMatch[1])
    if (moduleSeo?.primaryKeyword) {
      return `${brandSeoKeywords}, ${moduleSeo.primaryKeyword}`
    }
  }

  const industryMatch = pathname.match(/^\/industries\/([^/]+)$/)
  if (industryMatch) {
    const industrySeo = getIndustryPageSeo(industryMatch[1])
    if (industrySeo) {
      return `${brandSeoKeywords}, ${industrySeo.name} ERP, food distribution ERP UK`
    }
  }

  const blogPostMatch = pathname.match(/^\/blog\/([^/]+)$/)
  if (blogPostMatch && blogPostMatch[1] !== 'category') {
    const article = getBlogArticle(blogPostMatch[1])
    if (article) {
      const secondary = article.secondaryKeywords.slice(0, 4).join(', ')
      return `${brandSeoKeywords}, ${article.primaryKeyword}${secondary ? `, ${secondary}` : ''}`
    }
  }

  const blogCategoryMatch = pathname.match(/^\/blog\/category\/([^/]+)$/)
  if (blogCategoryMatch) {
    const category = getBlogCategory(blogCategoryMatch[1])
    if (category) {
      return `${brandSeoKeywords}, ${category.name}, Cloud Billing Manager blog`
    }
  }

  return defaultSeoKeywords
}

export { homePageSeo }
