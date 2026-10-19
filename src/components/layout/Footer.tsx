import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Globe } from 'lucide-react'
import Button from '../ui/Button.tsx'
import Logo from '../ui/Logo.tsx'
import { brandOfficialLine } from '../../data/brand.ts'
import { company, companyPhones, companySocial } from '../../data/content.ts'

type FooterLink = { label: string; to: string }

const pageLinks: FooterLink[] = [
  { to: '/', label: 'Home' },
  { to: '/platform', label: 'Platform' },
  { to: '/industries', label: 'Industries' },
  { to: '/why', label: 'Why CBM' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

const productLinks: FooterLink[] = [
  { to: '/platform/inventory', label: 'Inventory management' },
  { to: '/platform/billing', label: 'Billing' },
  { to: '/platform/sales', label: 'Sales & invoicing' },
  { to: '/platform/pos', label: 'POS' },
  { to: '/platform/purchasing', label: 'Purchasing' },
  { to: '/features/ai-whatsapp-ordering', label: 'AI WhatsApp Ordering' },
  { to: '/features/fleet-logistics', label: 'Fleet & Logistics' },
  { to: '/platform', label: 'Full platform' },
]

const legalLinks: FooterLink[] = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Use' },
]

function SocialIcon({ id }: { id: (typeof companySocial)[number]['id'] }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true as const,
    className: 'footer-social-icon',
  }

  if (id === 'facebook') {
    return (
      <svg {...common}>
        <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.4V9.84c0-2.37 1.4-3.69 3.56-3.69 1.03 0 2.11.19 2.11.19v2.33h-1.19c-1.17 0-1.54.73-1.54 1.48v1.78h2.62l-.42 2.91h-2.2V22c4.78-.75 8.44-4.91 8.44-9.93z" />
      </svg>
    )
  }

  if (id === 'instagram') {
    return (
      <svg {...common}>
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.15 0-3.52.01-4.76.07-2.23.1-3.27 1.14-3.37 3.37-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.1 2.22 1.14 3.27 3.37 3.37 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c2.23-.1 3.27-1.15 3.37-3.37.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.1-2.23-1.14-3.27-3.37-3.37-1.24-.06-1.61-.07-4.76-.07zm0 3.07a5.13 5.13 0 1 1 0 10.26 5.13 5.13 0 0 1 0-10.26zm0 8.46a3.33 3.33 0 1 0 0-6.66 3.33 3.33 0 0 0 0 6.66zm6.54-8.68a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
      </svg>
    )
  }

  if (id === 'linkedin') {
    return (
      <svg {...common}>
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M12.04 2.04A9.91 9.91 0 0 0 2.13 11.95c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.21h.01a9.91 9.91 0 0 0 9.91-9.91 9.86 9.86 0 0 0-2.91-7.04 9.86 9.86 0 0 0-7.01-2.84zm5.78 14.24c-.24.68-1.39 1.24-1.92 1.32-.5.07-1.14.1-1.84-.12-.42-.13-.96-.3-1.65-.6-2.91-1.26-4.8-4.21-4.95-4.41-.14-.2-1.17-1.55-1.17-2.96 0-1.4.74-2.1 1-2.38.25-.27.55-.34.74-.34h.53c.17 0 .4-.07.62.48.24.56.81 1.98.88 2.12.07.14.12.31.02.49-.1.19-.15.31-.29.48l-.42.5c-.14.17-.29.35-.12.69.17.33.78 1.29 1.67 2.09 1.15 1.03 2.12 1.35 2.42 1.5.3.15.47.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.7.8 2 .95.29.14.48.21.55.33.07.11.07.66-.17 1.34z" />
    </svg>
  )
}

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
            <nav className="footer-social" aria-label="Social media">
              {companySocial.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={item.label}
                  title={item.label}
                >
                  <SocialIcon id={item.id} />
                </a>
              ))}
            </nav>
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
