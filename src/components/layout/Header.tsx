import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, BookOpen, ChevronDown, Factory, HelpCircle, Home, LayoutGrid, Mail, Menu, MessageSquare, Phone, PoundSterling, Truck, X } from 'lucide-react'
import { company, modules, telHref } from '../../data/content.ts'
import { featurePaths } from '../../data/features.ts'
import { moduleIcons } from '../../data/icons.ts'
import Button from '../ui/Button.tsx'
import Logo from '../ui/Logo.tsx'
import IconBadge from '../ui/IconBadge.tsx'

const links = [
  { to: '/platform', label: 'Inventory' },
  { to: '/industries', label: 'Industries' },
  { to: '/why', label: 'Why CBM' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

const platformColumns = [
  ['dashboard', 'sales', 'pos', 'inventory'],
  ['pricing-engine', 'billing', 'supplier-payments', 'accounting'],
  ['hr', 'customers', 'suppliers', 'customizable', 'purchasing'],
] as const

const platformFeatureLinks = [
  {
    to: featurePaths.whatsappOrdering,
    label: 'AI WhatsApp Ordering',
    icon: MessageSquare,
  },
  {
    to: featurePaths.fleetLogistics,
    label: 'Fleet & Logistics',
    icon: Truck,
  },
] as const

export default function Header() {
  const [open, setOpen] = useState(false)
  const [modulesOpen, setModulesOpen] = useState(false)
  const [mobileModules, setMobileModules] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    setModulesOpen(false)
    setMobileModules(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return

    const scrollY = window.scrollY
    const header = document.querySelector('.site-header')
    const headerHeight =
      header instanceof HTMLElement ? Math.round(header.getBoundingClientRect().height) : 80

    document.documentElement.style.setProperty('--site-header-height', `${headerHeight}px`)
    document.documentElement.classList.add('is-mobile-menu-open')

    // Keep layout height when header becomes fixed (stops content jump)
    const spacer = document.createElement('div')
    spacer.setAttribute('data-header-menu-spacer', '')
    spacer.style.height = `${headerHeight}px`
    spacer.style.width = '100%'
    spacer.setAttribute('aria-hidden', 'true')
    header?.parentElement?.insertBefore(spacer, header.nextSibling)

    const { style } = document.body
    const previous = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
    }

    style.overflow = 'hidden'
    style.position = 'fixed'
    style.top = `-${scrollY}px`
    style.left = '0'
    style.right = '0'
    style.width = '100%'

    return () => {
      style.overflow = previous.overflow
      style.position = previous.position
      style.top = previous.top
      style.left = previous.left
      style.right = previous.right
      style.width = previous.width
      document.documentElement.classList.remove('is-mobile-menu-open')
      spacer.remove()
      window.scrollTo(0, scrollY)
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    function blockBackgroundScroll(event: TouchEvent) {
      const target = event.target as Node | null
      const overlay = document.querySelector('.burger-overlay')
      const toggle = document.querySelector('.burger-toggle')
      if (overlay?.contains(target) || toggle?.contains(target)) return
      event.preventDefault()
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('touchmove', blockBackgroundScroll, { passive: false })
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('touchmove', blockBackgroundScroll)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1280) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className={`site-header sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur${open ? ' is-menu-open' : ''}`}>
      <div className="flex h-1">
        <div className="w-[78%] bg-brand" />
        <div className="w-[22%] bg-accent" />
      </div>
      <div className="container-page flex h-[76px] flex-nowrap items-center justify-between gap-3 sm:h-[92px] sm:gap-6">
        <Link
          to="/"
          className="tip tip-down flex shrink-0 items-center"
          aria-label={company.product}
          data-tip="Cloud Billing Manager home"
        >
          <Logo className="brand-logo--header" />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `tip tip-down rounded-lg px-2.5 py-2 text-sm font-medium transition ${
                isActive ? 'bg-brand-soft text-brand' : 'text-slate-600 hover:bg-surface hover:text-brand'
              }`
            }
            data-tip="Cloud Billing Manager home"
          >
            Home
          </NavLink>
          <div
            className="relative"
            onMouseEnter={() => setModulesOpen(true)}
            onMouseLeave={() => setModulesOpen(false)}
          >
            <NavLink
              to="/platform"
              className={({ isActive }) =>
                `inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium transition ${
                  isActive ||
                  location.pathname.startsWith('/platform/') ||
                  location.pathname.startsWith('/features/') ||
                  modulesOpen
                    ? 'bg-brand-soft text-brand'
                    : 'text-slate-600 hover:bg-surface hover:text-brand'
                }`
              }
              aria-expanded={modulesOpen}
              aria-haspopup="true"
            >
              Inventory
              <ChevronDown
                className={`size-4 transition-transform duration-200 ${modulesOpen ? 'rotate-180' : ''}`}
              />
            </NavLink>
            {modulesOpen ? (
              <div className="nav-platform-panel">
                <div className="menu-pop" role="menu" aria-label="Inventory modules">
                <div className="menu-pop-grid">
                  {platformColumns.map((column, columnIndex) => (
                    <div key={column[0]} className="min-w-0 space-y-0.5">
                      {columnIndex < platformFeatureLinks.length ? (
                        <Link
                          to={platformFeatureLinks[columnIndex].to}
                          className="menu-pop-link"
                          role="menuitem"
                        >
                          <IconBadge icon={platformFeatureLinks[columnIndex].icon} size="sm" />
                          <span>{platformFeatureLinks[columnIndex].label}</span>
                        </Link>
                      ) : null}
                      {column.map((slug) => {
                        const module = modules.find((item) => item.slug === slug)
                        if (!module) return null
                        return (
                          <Link
                            key={module.slug}
                            to={`/platform/${module.slug}`}
                            className="menu-pop-link"
                            role="menuitem"
                          >
                            <IconBadge icon={moduleIcons[module.slug]} size="sm" />
                            <span>{module.nav}</span>
                          </Link>
                        )
                      })}
                    </div>
                  ))}
                </div>
                <div className="menu-pop-foot">
                  <Link to="/platform">
                    One Complete Cloud Platform
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
                </div>
              </div>
            ) : null}
          </div>

          {links.slice(1).map((link) => {
            const tips: Record<string, string> = {
              '/industries': 'Industry Focus',
              '/why': 'Why Cloud Billing Manager?',
              '/about': 'About Cloud Billing Manager',
              '/pricing': 'Plans from £59 / month',
              '/blog': 'Inventory, billing and POS guides',
              '/contact': 'Contact Us',
            }
            return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `tip tip-down rounded-lg px-2.5 py-2 text-sm font-medium transition ${
                  isActive ||
                  (link.to === '/blog' && location.pathname.startsWith('/blog/'))
                    ? 'bg-brand-soft text-brand'
                    : 'text-slate-600 hover:bg-surface hover:text-brand'
                }`
              }
              data-tip={tips[link.to]}
            >
              {link.label}
            </NavLink>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={telHref(company.landline)}
            className="header-landline tip tip-down"
            data-tip="Call Cloud Billing Manager"
          >
            <span className="header-landline-ico" aria-hidden>
              <Phone className="size-3.5" strokeWidth={2.25} />
            </span>
            <span className="header-landline-num">{company.landline}</span>
          </a>
          <Button to="/demo" tip="Book a client demonstration" tipDown analytics="cta_click_demo">
            Schedule Demo
          </Button>
        </div>

        <button
          type="button"
          className={`burger-toggle ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" strokeWidth={2.25} /> : <Menu className="size-5" strokeWidth={2.25} />}
        </button>
      </div>

      {open
        ? createPortal(
            <div className="burger-overlay">
              <div className="burger-sheet">
                <nav className="burger-nav" aria-label="Mobile">
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `burger-link${isActive ? ' is-active' : ''}`}
                  >
                    <span className="burger-ico">
                      <Home className="size-4" />
                    </span>
                    Home
                  </NavLink>

                  <div className={`burger-group${mobileModules ? ' is-open' : ''}`}>
                    <div className="flex items-center gap-1">
                      <NavLink
                        to="/platform"
                        className={({ isActive }) =>
                          `burger-link min-w-0 flex-1${
                            isActive ||
                            location.pathname.startsWith('/platform/') ||
                            location.pathname.startsWith('/features/')
                              ? ' is-active'
                              : ''
                          }`
                        }
                      >
                        <span className="burger-ico">
                          <LayoutGrid className="size-4" />
                        </span>
                        Inventory
                      </NavLink>
                      <button
                        type="button"
                        className="burger-chevron"
                        aria-label="Toggle inventory modules"
                        aria-expanded={mobileModules}
                        onClick={() => setMobileModules((value) => !value)}
                      >
                        <ChevronDown className="size-4" />
                      </button>
                    </div>
                    {mobileModules ? (
                      <div className="burger-mods">
                        <Link to={featurePaths.whatsappOrdering} className="burger-mod">
                          <IconBadge icon={MessageSquare} size="sm" />
                          AI WhatsApp Ordering
                        </Link>
                        <Link to={featurePaths.fleetLogistics} className="burger-mod">
                          <IconBadge icon={Truck} size="sm" />
                          Fleet & Logistics
                        </Link>
                        {modules.map((module) => (
                          <Link key={module.slug} to={`/platform/${module.slug}`} className="burger-mod">
                            <IconBadge icon={moduleIcons[module.slug]} size="sm" />
                            {module.nav}
                          </Link>
                        ))}
                        <Link to="/platform" className="burger-mod-all">
                          One Complete Cloud Platform
                          <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    ) : null}
                  </div>

                  <NavLink
                    to="/industries"
                    className={({ isActive }) => `burger-link${isActive ? ' is-active' : ''}`}
                  >
                    <span className="burger-ico">
                      <Factory className="size-4" />
                    </span>
                    Industries
                  </NavLink>
                  <NavLink
                    to="/why"
                    className={({ isActive }) => `burger-link${isActive ? ' is-active' : ''}`}
                  >
                    <span className="burger-ico">
                      <HelpCircle className="size-4" />
                    </span>
                    Why CBM
                  </NavLink>
                  <NavLink
                    to="/about"
                    className={({ isActive }) => `burger-link${isActive ? ' is-active' : ''}`}
                  >
                    <span className="burger-ico">
                      <HelpCircle className="size-4" />
                    </span>
                    About
                  </NavLink>
                  <NavLink
                    to="/pricing"
                    className={({ isActive }) => `burger-link${isActive ? ' is-active' : ''}`}
                  >
                    <span className="burger-ico">
                      <PoundSterling className="size-4" />
                    </span>
                    Pricing
                  </NavLink>
                  <NavLink
                    to="/blog"
                    className={({ isActive }) =>
                      `burger-link${isActive || location.pathname.startsWith('/blog/') ? ' is-active' : ''}`
                    }
                  >
                    <span className="burger-ico">
                      <BookOpen className="size-4" />
                    </span>
                    Blog
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) => `burger-link${isActive ? ' is-active' : ''}`}
                  >
                    <span className="burger-ico">
                      <Mail className="size-4" />
                    </span>
                    Contact
                  </NavLink>
                </nav>

                <div className="burger-cta">
                  <a
                    href={telHref(company.landline)}
                    className="header-landline header-landline--mobile"
                  >
                    <span className="header-landline-ico" aria-hidden>
                      <Phone className="size-3.5" strokeWidth={2.25} />
                    </span>
                    <span className="header-landline-num">{company.landline}</span>
                  </a>
                  <Button to="/demo" className="w-full">
                    Book a demo
                  </Button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  )
}
