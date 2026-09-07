import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Globe } from 'lucide-react'
import Button from '../ui/Button.tsx'
import Logo from '../ui/Logo.tsx'
import { brandOfficialLine } from '../../data/brand.ts'
import { company, companyPhones } from '../../data/content.ts'

type FooterLink = { label: string; to: string }

const pageLinks: FooterLink[] = [
  { to: '/', label: 'Home' },
  { to: '/platform', label: 'Platform' },
  { to: '/industries', label: 'Industries' },
  { to: '/why', label: 'Why CBM' },
  { to: '/about', label: 'About' },
  { to: '/resources', label: 'Resources' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

const productLinks: FooterLink[] = [
  { to: '/platform/inventory', label: 'Inventory management' },
  { to: '/platform/billing', label: 'Billing' },
  { to: '/platform/sales', label: 'Sales & invoicing' },
  { to: '/platform/pos', label: 'POS' },
  { to: '/platform/purchasing', label: 'Purchasing' },
  { to: '/platform', label: 'Full platform' },
]

const legalLinks: FooterLink[] = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Use' },
]

function NavColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="footer-heading">{title}</h3>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={`${title}-${link.to}-${link.label}`}>
            <Link to={link.to} className="footer-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-accent" aria-hidden>
        <span />
        <span />
      </div>

      <div className="container-page py-12 sm:py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-8 xl:gap-12">
          <div>
            <Link to="/" className="inline-flex items-center" aria-label={company.product}>
              <Logo className="brand-logo--footer" />
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-7 text-white/70">{company.headline}</p>
            <p className="mt-2 text-sm text-white/45">{company.presentedBy}</p>
            <p className="sr-only">{brandOfficialLine}</p>
            <Button to="/demo" className="mt-6 w-full sm:w-auto">
              Book a client demo
            </Button>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:contents">
            <NavColumn title="Pages" links={pageLinks} />
            <NavColumn title="Product" links={productLinks} />

            <div>
              <h3 className="footer-heading">Contact</h3>
              <ul className="mt-4 space-y-3.5">
                <li>
                  <a href={`mailto:${company.email}`} className="footer-contact-item">
                    <Mail className="size-3.5 shrink-0 text-accent" strokeWidth={2} />
                    <span>
                      <span className="footer-label">Email</span>
                      <span className="footer-email">{company.email}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <div className="footer-contact-item">
                    <Phone className="size-3.5 shrink-0 text-accent" strokeWidth={2} />
                    <span className="footer-phones">
                      {companyPhones.map((line) => (
                        <a key={line.label} href={line.href} className="footer-phone-row">
                          <span className="footer-phone-kind">{line.label}</span>
                          <span className="footer-phone-num">{line.display}</span>
                        </a>
                      ))}
                    </span>
                  </div>
                </li>
                <li>
                  <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="footer-contact-item">
                    <MapPin className="size-3.5 shrink-0 text-accent" strokeWidth={2} />
                    <span className="footer-address">
                      <span className="footer-label">Head office</span>
                      <span className="footer-address-office">{company.office}</span>
                      <span className="footer-address-detail">{company.address}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={company.groupSite} target="_blank" rel="noreferrer" className="footer-contact-item">
                    <Globe className="size-3.5 shrink-0 text-accent" strokeWidth={2} />
                    <span>
                      <span className="footer-label">Group</span>
                      {company.groupSiteLabel}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container-page flex flex-col gap-4 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="min-w-0">
            © {new Date().getFullYear()} {company.presenter}. {company.product}.
          </p>
          <nav className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2" aria-label="Legal">
            {legalLinks.map((link) => (
              <Link key={link.to} to={link.to} className="footer-bottom-link">
                {link.label}
              </Link>
            ))}
            <span className="hidden text-white/20 sm:inline" aria-hidden>
              |
            </span>
            <span className="text-white/45">
              {company.office} · {company.phone} · {company.landline}
            </span>
          </nav>
        </div>
      </div>
    </footer>
  )
}
