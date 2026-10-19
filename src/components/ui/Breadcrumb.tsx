import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { industries, modules } from '../../data/content.ts'
import { getBlogArticle, getBlogCategory } from '../../data/blog.ts'

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
  pricing: 'Pricing',
  press: 'Press',
  features: 'Features',
  'ai-whatsapp-ordering': 'AI WhatsApp Ordering',
  'fleet-logistics': 'Fleet & Logistics',
  'inventory-management-checklist': 'Inventory checklist',
  'inventory-management-guide': 'Inventory guide',
  'inventory-software-vs-spreadsheets': 'Software vs spreadsheets',
  glossary: 'Glossary',
}

export default function Breadcrumb() {
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length === 0) return null

  const crumbs: { label: string; to?: string }[] = [{ label: 'Home', to: '/' }]
  let path = ''

  parts.forEach((part, index) => {
    path += `/${part}`
    const module = modules.find((item) => item.slug === part)
    const industry = industries.find((item) => item.slug === part)
    const blogCategory = getBlogCategory(part)
    const blogArticle = getBlogArticle(part)
    const label =
      labels[part] ?? module?.nav ?? industry?.name ?? blogCategory?.name ?? blogArticle?.title ?? part
    crumbs.push({
      label,
      to: index === parts.length - 1 ? undefined : path,
    })
  })

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
      <ol className="breadcrumb-list">
        {crumbs.map((crumb, index) => {
          return (
            <li
              key={`${crumb.label}-${index}`}
              className="breadcrumb-item"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 ? (
                <ChevronRight className="breadcrumb-sep" aria-hidden strokeWidth={2.25} />
              ) : null}

              {crumb.to ? (
                <Link
                  to={crumb.to}
                  className={`breadcrumb-link${index === 0 ? ' is-home' : ''}`}
                  itemProp="item"
                >
                  {index === 0 ? <Home className="breadcrumb-home-icon" aria-hidden strokeWidth={2.25} /> : null}
                  <span itemProp="name" className={index === 0 ? 'breadcrumb-home-label' : undefined}>
                    {crumb.label}
                  </span>
                </Link>
              ) : (
                <span className="breadcrumb-current" itemProp="name" aria-current="page" title={crumb.label}>
                  {crumb.label}
                </span>
              )}

              <meta itemProp="position" content={String(index + 1)} />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
