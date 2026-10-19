/** Page hero banners from /public/webp (home keeps separate hero slides). */

const W = '/webp'

const banners: Record<string, string> = {
  // Home uses HeroBanner slides — not these page banners
  '/': '/banners/home-overview.webp',

  '/about': `${W}/about.webp`,
  '/platform': `${W}/platform.webp`,
  '/platform/dashboard': `${W}/platform--dashboard.webp`,
  '/platform/sales': `${W}/platform--sales.webp`,
  '/platform/pricing-engine': `${W}/platform--pricing-engine.webp`,
  '/platform/billing': `${W}/platform--billing.webp`,
  '/platform/purchasing': `${W}/platform--purchasing.webp`,
  '/platform/supplier-payments': `${W}/platform--supplier-payments.webp`,
  '/platform/inventory': `${W}/platform--inventory.webp`,
  '/platform/accounting': `${W}/platform--accounting.webp`,
  '/platform/hr': `${W}/platform--hr.webp`,
  '/platform/customers': `${W}/platform--customers.webp`,
  '/platform/suppliers': `${W}/platform--suppliers.webp`,
  '/platform/customizable': `${W}/platform--customizable.webp`,
  '/platform/pos': `${W}/platform--pos.webp`,

  '/industries': `${W}/industries.webp`,
  '/industries/frozen-foods': `${W}/industries--frozen-foods.webp`,
  '/industries/fresh-foods': `${W}/industries--fresh-foods.webp`,
  '/industries/meat-suppliers': `${W}/industries--meat-suppliers.webp`,
  '/industries/beverage-distribution': `${W}/industries--beverage-distribution.webp`,
  '/industries/grocery-distribution': `${W}/industries--grocery-distribution.webp`,
  '/industries/fmcg': `${W}/industries--fmcg.webp`,
  '/industries/restaurant-suppliers': `${W}/industries--restaurant-suppliers.webp`,
  '/industries/wholesale-businesses': `${W}/industries--wholesale-businesses.webp`,
  '/industries/import-distribution': `${W}/industries--import-distribution.webp`,

  '/why': `${W}/why.webp`,
  '/pricing': `${W}/pricing.webp`,
  '/features/ai-whatsapp-ordering': `${W}/features--ai-whatsapp-ordering.webp`,
  '/features/fleet-logistics': `${W}/features--fleet-logistics.webp`,
  '/contact': `${W}/contact.webp`,
  '/demo': `${W}/demo.webp`,
  '/blog': `${W}/blog.webp`,
  '/press': `${W}/press.webp`,
  '/privacy': `${W}/privacy.webp`,
  '/terms': `${W}/terms.webp`,

  '/resources/inventory-management-checklist': `${W}/resources--inventory-management-checklist.webp`,
  '/resources/inventory-management-guide': `${W}/resources--inventory-management-guide.webp`,
  '/resources/inventory-software-vs-spreadsheets': `${W}/resources--inventory-software-vs-spreadsheets.webp`,
  '/resources/glossary': `${W}/resources--glossary.webp`,

  '/blog/what-is-inventory-management': `${W}/blog--what-is-inventory-management.webp`,
  '/blog/how-to-manage-stock-effectively': `${W}/blog--how-to-manage-stock-effectively.webp`,
  '/blog/inventory-management-for-small-businesses': `${W}/blog--inventory-management-for-small-businesses.webp`,
  '/blog/benefits-of-inventory-management-software': `${W}/blog--benefits-of-inventory-management-software.webp`,
  '/blog/what-is-billing-software': `${W}/blog--what-is-billing-software.webp`,
  '/blog/how-to-track-unpaid-invoices': `${W}/blog--how-to-track-unpaid-invoices.webp`,
  '/blog/what-is-pos-software': `${W}/blog--what-is-pos-software.webp`,
  '/blog/pos-and-inventory-management': `${W}/blog--pos-and-inventory-management.webp`,

  '/blog/category/inventory-management': `${W}/blog--category--inventory-management.webp`,
  '/blog/category/billing-invoicing': `${W}/blog--category--billing-invoicing.webp`,
  '/blog/category/pos': `${W}/blog--category--pos.webp`,
  '/blog/category/sales-purchases': `${W}/blog--category--sales-purchases.webp`,
  '/blog/category/business-management': `${W}/blog--category--business-management.webp`,
}

/** Home page carousel only — do not replace with /webp page banners. */
export const homeSlideBanners = {
  overview: '/banners/hero-overview.webp',
  dashboard: '/banners/hero-dashboard.webp',
  pricing: '/banners/hero-pricing.webp',
  pos: '/banners/hero-pos.webp',
  platform: '/banners/hero-platform.webp',
  orders: '/banners/hero-orders.webp',
  fleet: '/banners/hero-fleet.webp',
} as const

/** Responsive srcSet for home hero slides (WebP). */
export function homeSlideSrcSet(slug: keyof typeof homeSlideBanners) {
  return homeSlideBanners[slug]
}

function pathToWebpKey(pathname: string) {
  return pathname.replace(/^\//, '').replace(/\//g, '--')
}

export function bannerForPath(pathname: string) {
  if (pathname === '/' || pathname === '') return banners['/']
  if (banners[pathname]) return banners[pathname]

  // Dynamic blog/category fallbacks from /webp naming
  if (pathname.startsWith('/blog/')) {
    const candidate = `${W}/${pathToWebpKey(pathname)}.webp`
    if (Object.values(banners).includes(candidate)) return candidate
    return `${W}/blog.webp`
  }

  return `${W}/platform.webp`
}

export function bannerJpgFallback(webpPath: string) {
  return webpPath.replace(/\.webp$/i, '.jpg')
}

export function findDuplicateBannerAssignments() {
  const seen = new Map<string, string[]>()
  for (const [route, file] of Object.entries(banners)) {
    const list = seen.get(file) ?? []
    list.push(route)
    seen.set(file, list)
  }
  return [...seen.entries()].filter(([, routes]) => routes.length > 1)
}

export { banners }
