const banners: Record<string, string> = {
  '/': '/banners/home-overview.webp',
  '/about': '/banners/about.webp',
  '/platform': '/banners/platform.webp',
  '/platform/dashboard': '/banners/dashboard.webp',
  '/platform/sales': '/banners/sales.webp',
  '/platform/pricing-engine': '/banners/pricing-engine.webp',
  '/platform/billing': '/banners/billing.webp',
  '/platform/purchasing': '/banners/purchasing.webp',
  '/platform/supplier-payments': '/banners/supplier-payments.webp',
  '/platform/inventory': '/banners/inventory.webp',
  '/platform/accounting': '/banners/accounting.webp',
  '/platform/hr': '/banners/hr.webp',
  '/platform/customers': '/banners/customers.webp',
  '/platform/suppliers': '/banners/suppliers.webp',
  '/platform/customizable': '/banners/customizable.webp',
  '/platform/pos': '/banners/pos.webp',
  '/industries': '/banners/industries.webp',
  '/industries/frozen-foods': '/banners/frozen-foods.webp',
  '/industries/fresh-foods': '/banners/fresh-foods.webp',
  '/industries/meat-suppliers': '/banners/meat-suppliers.webp',
  '/industries/beverage-distribution': '/banners/beverage-distribution.webp',
  '/industries/grocery-distribution': '/banners/grocery-distribution.webp',
  '/industries/fmcg': '/banners/fmcg.webp',
  '/industries/restaurant-suppliers': '/banners/restaurant-suppliers.webp',
  '/industries/wholesale-businesses': '/banners/wholesale-businesses.webp',
  '/industries/import-distribution': '/banners/import-distribution.webp',
  '/why': '/banners/why.webp',
  '/contact': '/banners/contact.webp',
  '/demo': '/banners/demo.webp',
  '/blog': '/banners/blog.webp',
  '/resources': '/banners/resources.webp',
  '/resources/inventory-management-checklist': '/banners/resources-checklist.webp',
  '/resources/inventory-management-guide': '/banners/resources-guide.webp',
  '/resources/inventory-software-vs-spreadsheets': '/banners/resources-compare.webp',
  '/resources/glossary': '/banners/glossary.webp',
  '/press': '/banners/press.webp',
  '/privacy': '/banners/privacy.webp',
  '/terms': '/banners/terms.webp',
}

export const homeSlideBanners = {
  overview: '/banners/home-overview.webp',
  dashboard: '/banners/home-dashboard.webp',
  pricing: '/banners/home-pricing.webp',
  pos: '/banners/home-pos.webp',
  platform: '/banners/home-platform.webp',
} as const

/** Responsive srcSet for home hero slides (WebP). */
export function homeSlideSrcSet(slug: keyof typeof homeSlideBanners) {
  const base = homeSlideBanners[slug].replace(/\.webp$/, '')
  return `${base}-640w.webp 640w, ${base}-960w.webp 960w, ${base}-1280w.webp 1280w, ${base}.webp 1600w`
}

export function bannerForPath(pathname: string) {
  if (banners[pathname]) return banners[pathname]
  if (pathname.startsWith('/blog/')) return '/banners/blog.webp'
  return '/banners/platform.webp'
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
