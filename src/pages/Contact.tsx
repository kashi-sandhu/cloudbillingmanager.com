import { Building2, Mail, MapPin, Globe, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.tsx'
import IconBadge from '../components/ui/IconBadge.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import EnquiryForm from '../components/forms/EnquiryForm.tsx'
import { company, companyPhones } from '../data/content.ts'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Contact Cloud Billing Manager"
        text="Speak with AVANTCORE Technologies about inventory, billing, invoicing, POS and a client demonstration for your UK food distribution business."
      />

      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <EnquiryForm
              subject="Cloud Billing Manager contact enquiry"
              submitLabel="Send message"
              sendingLabel="Sending message..."
            />
            <p className="mt-4 text-sm leading-6 text-muted">
              Prefer a guided walkthrough?{' '}
              <Link to="/demo" className="font-semibold text-brand">
                Schedule a client demonstration
              </Link>
              {' · '}
              <Link to="/resources" className="font-semibold text-brand">
                Browse resources
              </Link>
              .
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className="ui-card border-brand-soft bg-brand-soft/40 p-5 sm:p-6">
              <p className="text-sm font-semibold text-brand-ink">How we can help</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Send a message for product questions, or book a live walkthrough of Cloud Billing Manager.
                We respond using the contact details you provide.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button to="/demo" className="w-full sm:w-auto">
                  Book a client demo
                </Button>
                <Button href={`mailto:${company.email}`} variant="outline" className="w-full sm:w-auto">
                  Email the team
                </Button>
              </div>
            </div>

            <div className="ui-card flex items-start gap-4 p-5 sm:p-6">
              <IconBadge icon={Building2} />
              <div>
                <p className="text-sm font-semibold text-brand-ink">{company.product}</p>
                <p className="mt-1 text-sm text-slate-600">{company.presentedBy}</p>
              </div>
            </div>
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="ui-card flex min-w-0 items-start gap-4 p-5 sm:p-6"
            >
              <IconBadge icon={Globe} tone="accent" />
              <div>
                <p className="text-sm font-semibold text-brand-ink">Website</p>
                <p className="mt-1 break-words text-slate-600">{company.websiteLabel}</p>
              </div>
            </a>
            <a
              href={`mailto:${company.email}`}
              className="ui-card flex min-w-0 items-start gap-4 p-5 sm:p-6"
            >
              <IconBadge icon={Mail} tone="accent" />
              <div>
                <p className="text-sm font-semibold text-brand-ink">Email</p>
                <p className="mt-1 break-all text-slate-600">{company.email}</p>
              </div>
            </a>
            <a
              href={company.groupSite}
              target="_blank"
              rel="noreferrer"
              className="ui-card flex min-w-0 items-start gap-4 p-5 sm:p-6"
            >
              <IconBadge icon={Globe} tone="accent" />
              <div>
                <p className="text-sm font-semibold text-brand-ink">Group website</p>
                <p className="mt-1 break-words text-slate-600">{company.groupSiteLabel}</p>
              </div>
            </a>
            <div className="ui-card flex min-w-0 items-start gap-4 p-5 sm:p-6">
              <IconBadge icon={Phone} tone="accent" />
              <ul className="contact-phones min-w-0">
                {companyPhones.map((line) => (
                  <li key={line.label}>
                    <span className="contact-phone-kind">{line.label}</span>
                    <a href={line.href} className="contact-phone-num">
                      {line.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="ui-card flex min-w-0 items-start gap-4 p-5 sm:p-6"
            >
              <IconBadge icon={MapPin} tone="accent" />
              <div>
                <p className="text-sm font-semibold text-brand-ink">Head Office</p>
                <p className="mt-1 text-slate-600">{company.office}</p>
                <p className="mt-1 text-sm leading-6 break-words text-slate-600">{company.address}</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
