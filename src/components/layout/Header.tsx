import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, BookOpen, ChevronDown, Factory, HelpCircle, Home, LayoutGrid, Mail, Menu, Phone, X } from 'lucide-react'
import { company, modules, telHref } from '../../data/content.ts'
import { moduleIcons } from '../../data/icons.ts'
import Button from '../ui/Button.tsx'
import Logo from '../ui/Logo.tsx'
import IconBadge from '../ui/IconBadge.tsx'

const links = [
  { to: '/platform', label: 'Platform' },
  { to: '/industries', label: 'Industries' },
  { to: '/why', label: 'Why CBM' },
  { to: '/about', label: 'About' },
  { to: '/resources', label: 'Resources' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

const platformColumns = [
  ['dashboard', 'sales', 'pos', 'inventory', 'purchasing'],
  ['pricing-engine', 'billing', 'supplier-payments', 'accounting'],
  ['hr', 'customers', 'suppliers', 'customizable'],
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
    const { style } = document.body
    const previous = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      width: style.width,
    }

    style.overflow = 'hidden'
    style.position = 'fixed'
    style.top = `-${scrollY}px`
    style.width = '100%'
    document.documentElement.classList.add('is-mobile-menu-open')

    return () => {
      style.overflow = previous.overflow
      style.position = previous.position
      style.top = previous.top
      style.width = previous.width
      document.documentElement.classList.remove('is-mobile-menu-open')
      window.scrollTo(0, scrollY)
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    function blockBackgroundScroll(event: TouchEvent) {
      const nav = document.querySelector('.burger-nav')
      if (nav?.contains(event.target as Node)) return
      event.preventDefault()
    }

    document.addEventListener('touchmove', blockBackgroundScroll, { passive: false })
    return () => document.removeEventListener('touchmove', blockBackgroundScroll)
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
                  isActive || location.pathname.startsWith('/platform/') || modulesOpen
                    ? 'bg-brand-soft text-brand'
                    : 'text-slate-600 hover:bg-surface hover:text-brand'
                }`
              }
              aria-expanded={modulesOpen}
              aria-haspopup="true"
            >
              Platform
              <ChevronDown
                className={`size-4 transition-transform duration-200 ${modulesOpen ? 'rotate-180' : ''}`}
              />
            </NavLink>
            {modulesOpen ? (
              <div className="nav-platform-panel">
                <div className="menu-pop" role="menu" aria-label="Platform modules">
                <div className="menu-pop-grid">
                  {platformColumns.map((column) => (
                    <div key={column[0]} className="min-w-0 space-y-0.5">
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
              '/resources': 'Guides, checklist and glossary',
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
                  (link.to === '/blog' && location.pathname.startsWith('/blog/')) ||
                  (link.to === '/resources' && location.pathname.startsWith('/resources'))
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
                          `burger-link min-w-0 flex-1${isActive || location.pathname.startsWith('/platform/') ? ' is-active' : ''}`
                        }
                      >
                        <span className="burger-ico">
                          <LayoutGrid className="size-4" />
                        </span>
                        Platform
                      </NavLink>
                      <button
                        type="button"
                        className="burger-chevron"
                        aria-label="Toggle platform modules"
                        aria-expanded={mobileModules}
                        onClick={() => setMobileModules((value) => !value)}
                      >
                        <ChevronDown className="size-4" />
                      </button>
                    </div>
                    {mobileModules ? (
                      <div className="burger-mods">
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
                    to="/resources"
                    className={({ isActive }) =>
                      `burger-link${isActive || location.pathname.startsWith('/resources') ? ' is-active' : ''}`
                    }
                  >
                    <span className="burger-ico">
                      <BookOpen className="size-4" />
                    </span>
                    Resources
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
