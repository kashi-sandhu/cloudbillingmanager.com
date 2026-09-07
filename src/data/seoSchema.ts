import { getBlogArticle, blogArticles, blogCategories } from './blog.ts'
import { brand } from './brand.ts'
import { company, industries, modules, telHref } from './content.ts'
import { getIndustryPageSeo } from './industrySeo.ts'
import { getPageRelatedLinks } from './seoPageHead.ts'
import { entitySameAs } from './seoHead.ts'
import { getModulePageSeo, getFaqsForPath } from './pageSeo.ts'
import { buildBreadcrumbItems, getPageSeo, siteUrl } from './seo.ts'
import { getPageLastModifiedIso } from './seoStandards.ts'
import { buildSiteNavigationSchema, buildSiteUrlIndexSchema } from './seoCrawl.ts'
import { glossaryTerms, softwareFeatureNames } from './semantic.ts'

/** Verified entity URLs — re-export for schema consumers. */
export { entitySameAs } from './seoHead.ts'

function webPageType(pathname: string): string {
  if (pathname === '/about') return 'AboutPage'
  if (pathname === '/contact') return 'ContactPage'
  return 'WebPage'
}

function pageAbout(pathname: string, pageImage: string): Record<string, unknown> | undefined {
  const moduleMatch = pathname.match(/^\/platform\/([^/]+)$/)
  if (moduleMatch) {
    const moduleSeo = getModulePageSeo(moduleMatch[1])
    const module = modules.find((item) => item.slug === moduleMatch[1])
    if (moduleSeo && module) {
      return {
        '@type': 'SoftwareApplication',
        name: `${module.nav} — ${company.product}`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: moduleSeo.description,
        url: `${siteUrl}${pathname}`,
        screenshot: pageImage,
        provider: { '@id': `${siteUrl}/#organization` },
        isPartOf: { '@id': `${siteUrl}/#software` },
      }
    }
  }

  const industryMatch = pathname.match(/^\/industries\/([^/]+)$/)
  if (industryMatch) {
    const industrySeo = getIndustryPageSeo(industryMatch[1])
    if (industrySeo) {
      return {
        '@type': 'Service',
        name: `${industrySeo.name} cloud ERP`,
        description: industrySeo.seoDescription,
        provider: { '@id': `${siteUrl}/#organization` },
        areaServed: { '@type': 'Country', name: 'United Kingdom' },
        serviceType: 'Food distribution ERP software',
        url: `${siteUrl}${pathname}`,
      }
    }
  }

  return { '@id': `${siteUrl}/#software` }
}

function pagePotentialAction(pathname: string): Record<string, unknown> | undefined {
  if (pathname === '/demo') {
    return {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/demo`,
        actionPlatform: ['https://schema.org/DesktopWebPlatform', 'https://schema.org/MobileWebPlatform'],
      },
      name: 'Book a Cloud Billing Manager demo',
    }
  }
  if (pathname === '/contact') {
    return {
      '@type': 'CommunicateAction',
      target: `${siteUrl}/contact`,
      name: 'Contact Cloud Billing Manager',
    }
  }
  return undefined
}

export function buildPrerenderJsonLdGraph(
  pathname: string,
  title: string,
  description: string,
  url: string,
  image?: string,
): Record<string, unknown>[] {
  const is404 = pathname === '/__404__'
  const pageImage = image ?? getPageSeo(pathname).ogImage ?? `${siteUrl}/images/og/cloudbillingmanager-og.jpg`
  const about = pageAbout(pathname, pageImage)
  const action = pagePotentialAction(pathname)
  const lastModifiedIso = getPageLastModifiedIso(pathname)
  const faqs = is404 ? [] : getFaqsForPath(pathname)
  const relatedLinks = is404
    ? []
    : getPageRelatedLinks(pathname)
        .filter((link) => link.rel === 'related')
        .slice(0, 8)
        .map((link) => link.href)

  const graph: Record<string, unknown>[] = [
    {
      '@type': webPageType(pathname),
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: 'en-GB',
      dateModified: lastModifiedIso,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about,
      publisher: { '@id': `${siteUrl}/#organization` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: pageImage,
        caption: title,
      },
      breadcrumb: { '@id': `${url}#breadcrumb` },
      ...(relatedLinks.length ? { relatedLink: relatedLinks } : {}),
      ...(faqs.length ? { hasPart: { '@id': `${url}#faq` } } : {}),
      ...(action ? { potentialAction: action } : {}),
      ...(pathname === '/'
        ? {
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['h1', '.entity-facts', 'meta[name="description"]'],
            },
          }
        : {}),
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: company.product,
      alternateName: [...brand.alternateNames],
      inLanguage: 'en-GB',
      description: company.positioning,
      publisher: { '@id': `${siteUrl}/#product` },
      copyrightHolder: { '@id': `${siteUrl}/#organization` },
      potentialAction: [
        { '@type': 'ViewAction', target: `${siteUrl}/`, name: 'Visit Cloud Billing Manager' },
        { '@type': 'ReserveAction', target: `${siteUrl}/demo`, name: 'Book a client demo' },
        { '@type': 'CommunicateAction', target: `${siteUrl}/contact`, name: 'Contact sales' },
      ],
      hasPart: [
        { '@type': 'WebPage', name: 'Platform', url: `${siteUrl}/platform` },
        { '@type': 'WebPage', name: 'Industries', url: `${siteUrl}/industries` },
        { '@type': 'WebPage', name: 'Book a demo', url: `${siteUrl}/demo` },
        { '@type': 'WebPage', name: 'Resources', url: `${siteUrl}/resources` },
        { '@type': 'WebPage', name: 'Blog', url: `${siteUrl}/blog` },
      ],
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: company.presenter,
      legalName: company.presenter,
      url: company.groupSite,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/brand/cloudbillingmanager-logo.png`,
      },
      description: company.positioning,
      email: company.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Orega 4 Longwalk, Stockley Park',
        addressLocality: 'London',
        addressRegion: 'England',
        postalCode: 'UB11 1FE',
        addressCountry: 'GB',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: company.email,
        telephone: [telHref(company.phone).replace(/^tel:/, ''), telHref(company.landline).replace(/^tel:/, '')],
        areaServed: 'GB',
        availableLanguage: ['English'],
      },
      brand: {
        '@type': 'Brand',
        name: brand.name,
        alternateName: [...brand.alternateNames],
        url: siteUrl,
      },
      sameAs: [...entitySameAs],
      knowsAbout: [
        'Food distribution ERP',
        'Inventory management software',
        'Billing and invoicing software',
        'Point of sale systems',
        'UK wholesale software',
      ],
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#product`,
      name: brand.name,
      alternateName: [...brand.alternateNames],
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/brand/cloudbillingmanager-logo.png`,
      },
      description: company.positioning,
      parentOrganization: { '@id': `${siteUrl}/#organization` },
      sameAs: [...entitySameAs],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}/#software`,
      name: company.product,
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'domain',
        value: brand.domain,
      },
      alternateName: [...brand.alternateNames],
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: 'en-GB',
      url: siteUrl,
      description: company.positioning,
      featureList: [...softwareFeatureNames],
      provider: { '@id': `${siteUrl}/#organization` },
      areaServed: { '@type': 'Country', name: 'United Kingdom' },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/OnlineOnly',
        url: `${siteUrl}/demo`,
      },
    },
  ]

  if (!is404) {
    const crumbs = buildBreadcrumbItems(pathname)
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.item,
      })),
    })
  }

  if (faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    })
  }

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/)
  if (blogMatch && blogMatch[1] !== 'category') {
    const article = getBlogArticle(blogMatch[1])
    if (article) {
      const articleImage = article.image.endsWith('.webp')
        ? `${siteUrl}${article.image.replace(/\.webp$/, '.jpg')}`
        : `${siteUrl}${article.image}`
      graph.push({
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: article.title,
        description: article.seoDescription,
        image: articleImage,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: 'en-GB',
        isAccessibleForFree: true,
        articleSection: article.category,
        keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(', '),
        author: {
          '@type': 'Organization',
          name: company.presenter,
          url: company.groupSite,
        },
        publisher: {
          '@type': 'Organization',
          name: company.presenter,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/images/brand/cloudbillingmanager-logo.png`,
          },
        },
        mainEntityOfPage: { '@id': `${url}#webpage` },
        isPartOf: { '@id': `${siteUrl}/blog#collection` },
      })
    }
  }

  const categoryMatch = pathname.match(/^\/blog\/category\/([^/]+)$/)
  if (categoryMatch) {
    const articles = blogArticles.filter((item) => item.category === categoryMatch[1])
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${url}#collection`,
      name: title,
      description,
      url,
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: articles.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.title,
          url: `${siteUrl}/blog/${item.slug}`,
        })),
      },
    })
  }

  if (pathname === '/resources/glossary') {
    graph.push({
      '@type': 'DefinedTermSet',
      '@id': `${url}#glossary`,
      name: 'Inventory, billing and POS glossary',
      description,
      url: `${siteUrl}/resources/glossary`,
      inLanguage: 'en-GB',
      hasDefinedTerm: glossaryTerms.map((item) => ({
        '@type': 'DefinedTerm',
        name: item.term,
        description: item.definition,
        inDefinedTermSet: `${siteUrl}/resources/glossary`,
      })),
    })
  }

  if (pathname === '/platform') {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${url}#collection`,
      name: title,
      description,
      url,
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: modules.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: `${siteUrl}/platform/${item.slug}`,
        })),
      },
    })
  }

  if (pathname === '/industries') {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${url}#collection`,
      name: title,
      description,
      url,
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: industries.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: `${siteUrl}/industries/${item.slug}`,
        })),
      },
    })
  }

  if (pathname === '/blog') {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${url}#collection`,
      name: title,
      description,
      url,
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
          ...blogCategories.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            url: `${siteUrl}/blog/category/${item.slug}`,
          })),
          ...blogArticles.map((item, index) => ({
            '@type': 'ListItem',
            position: blogCategories.length + index + 1,
            name: item.title,
            url: `${siteUrl}/blog/${item.slug}`,
          })),
        ],
      },
    })
  }

  if (pathname === '/resources') {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${url}#collection`,
      name: title,
      description,
      url,
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inventory management checklist',
            url: `${siteUrl}/resources/inventory-management-checklist`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Inventory management guide',
            url: `${siteUrl}/resources/inventory-management-guide`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Inventory software vs spreadsheets',
            url: `${siteUrl}/resources/inventory-software-vs-spreadsheets`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Glossary',
            url: `${siteUrl}/resources/glossary`,
          },
        ],
      },
    })
  }

  if (!is404) {
    graph.push(buildSiteNavigationSchema())
  }

  if (pathname === '/') {
    graph.push(buildSiteUrlIndexSchema())
  }

  return graph
}
