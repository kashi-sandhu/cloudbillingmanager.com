import { Building2, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { company, companyPhones } from '../../data/content.ts'

export default function TrustBar() {
  return (
    <section className="border-b border-line bg-white py-4 sm:py-5" aria-label="Company contact and trust details">
      <div className="container-page">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="ui-card-static flex items-start gap-3 bg-surface px-3 py-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <Building2 className="size-4" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                Presented by
              </span>
              <span className="mt-0.5 block text-sm font-semibold break-words text-brand-ink">
                {company.presenter}
              </span>
            </span>
          </div>

          <a
            href={company.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="ui-card-soft flex items-start gap-3 px-3 py-3"
          >
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <MapPin className="size-4" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                Head Office
              </span>
              <span className="mt-0.5 block text-sm font-semibold break-words text-brand-ink">
                {company.office}
              </span>
            </span>
          </a>

          <div className="ui-card-soft trust-phone-card flex items-start gap-3 px-3 py-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <Phone className="size-4" strokeWidth={2} />
            </span>
            <span className="trust-phones">
              {companyPhones.map((line) => (
                <a key={line.label} href={line.href} className="trust-phone-row">
                  <span className="trust-phone-kind">{line.label}</span>
                  <span className="trust-phone-num">{line.display}</span>
                </a>
              ))}
            </span>
          </div>

          <a href={`mailto:${company.email}`} className="ui-card-soft flex items-start gap-3 px-3 py-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <Mail className="size-4" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                Email
              </span>
              <span className="mt-0.5 block text-sm font-semibold break-words text-brand-ink">
                {company.email}
              </span>
            </span>
          </a>

          <Link to="/demo" className="ui-card-soft flex items-start gap-3 px-3 py-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <ShieldCheck className="size-4" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                Next step
              </span>
              <span className="mt-0.5 block text-sm font-semibold break-words text-brand-ink">
                Book a client demo
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
