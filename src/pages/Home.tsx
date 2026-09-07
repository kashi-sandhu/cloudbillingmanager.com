import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Globe, Mail, MapPin, Phone, XCircle } from 'lucide-react'
import Button from '../components/ui/Button.tsx'
import CapabilityCard from '../components/ui/CapabilityCard.tsx'
import HeroBanner from '../components/ui/HeroBanner.tsx'
import EntityFacts from '../components/ui/EntityFacts.tsx'
import TrustBar from '../components/ui/TrustBar.tsx'
import ConversionBand from '../components/ui/ConversionBand.tsx'
import IconBadge from '../components/ui/IconBadge.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import ShowMoreGrid from '../components/ui/ShowMoreGrid.tsx'
import {
  benefits,
  capabilities,
  challenges,
  company,
  companyPhones,
  industries,
  modules,
  pricingEngineFeatures,
  replacedSystems,
  whyUs,
} from '../data/content.ts'
import { capabilityIcons, industryIcons, moduleIcons, replacedSystemIcons } from '../data/icons.ts'

const capabilityLinks = [
  '/platform/dashboard',
  '/platform/sales',
  '/platform/dashboard',
  '/platform/inventory',
  '/platform/inventory',
  '/platform/sales',
  '/platform/accounting',
  '/platform/hr',
  '/platform/customizable',
]

const homeModuleLinks = [
  { to: '/platform/inventory', label: 'Inventory management software' },
  { to: '/platform/billing', label: 'Billing software' },
  { to: '/platform/sales', label: 'Sales and invoicing software' },
  { to: '/platform/purchasing', label: 'Purchase management software' },
  { to: '/platform/pos', label: 'POS software' },
  { to: '/platform/dashboard', label: 'Business dashboard and reports' },
]

export default function Home() {
  return (
    <>
      <HeroBanner />
      <TrustBar />

      <section className="border-b border-line bg-white py-10 sm:py-14">
        <div className="container-page">
          <EntityFacts compact />
        </div>
      </section>

      <section className="border-b border-line bg-surface py-8 sm:py-10">
        <div className="container-page">
          <h2 className="text-xl font-bold text-brand-ink sm:text-2xl">
            Cloud inventory, billing and business management in one platform
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{company.positioning}</p>
          <nav aria-label="Core product modules" className="mt-5 flex flex-wrap gap-2">
            {homeModuleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand-soft/40"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/resources/inventory-management-guide"
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand-soft/40"
            >
              Inventory management guide
            </Link>
          </nav>
        </div>
      </section>

      <section className="border-b border-line bg-white py-10 sm:py-14">
        <div className="container-page">
          <p className="text-center text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            Industry Focus
          </p>
          <p className="mt-2 text-center text-sm text-muted">Designed specifically for</p>
          <ShowMoreGrid
            initialCount={4}
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            moreLabel="View more industries"
          >
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                to={`/industries/${industry.slug}`}
                className="ui-card-soft group flex min-h-[88px] items-center gap-4 px-4 py-3 sm:px-5"
              >
                <IconBadge icon={industryIcons[industry.slug]} />
                <span className="text-sm font-semibold text-brand-ink">{industry.name}</span>
              </Link>
            ))}
          </ShowMoreGrid>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading eyebrow="Business Challenges" title="Most distributors face:" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {challenges.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-xl border border-transparent p-2 text-sm text-slate-600 transition hover:border-line hover:bg-surface"
                >
                  <XCircle className="mt-0.5 size-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="ui-card-soft p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">Our Solution</p>
            <h3 className="mt-2 text-2xl font-bold text-brand-ink">One Complete Cloud Platform</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Instead of using:</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {replacedSystems.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-line"
                >
                  <IconBadge icon={replacedSystemIcons[item]} size="sm" />
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm font-semibold text-brand-navy">
              Everything is managed inside one system.
            </p>
            <Button to="/platform" className="mt-6 w-full sm:w-auto">
              One Complete Cloud Platform
            </Button>
          </div>
        </div>
      </section>

      <section className="cap-section border-y border-line py-12 sm:py-16 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Cloud Billing Manager"
            title="Manage inventory, billing, sales and purchases"
            text="Designed for businesses that require:"
          />
          <ShowMoreGrid
            initialCount={3}
            className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            moreLabel="View more"
          >
            {capabilities.map((item, index) => (
              <CapabilityCard
                key={item.title}
                to={capabilityLinks[index]}
                index={index}
                title={item.title}
                text={item.text}
                icon={capabilityIcons[item.title]}
              />
            ))}
          </ShowMoreGrid>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Sales Management"
            title="Intelligent Customer Pricing Engine"
            text="unique selling point (USP)"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {pricingEngineFeatures.map((item) => (
              <Link
                key={item}
                to="/platform/pricing-engine"
                className="ui-card p-5"
              >
                <CheckCircle2 className="size-5 text-accent" />
                <p className="mt-3 text-sm leading-6 text-brand-ink">{item}</p>
              </Link>
            ))}
          </div>
          <Button to="/platform/pricing-engine" variant="brand" className="mt-8 w-full sm:w-auto">
            Intelligent Customer Pricing Engine
          </Button>
        </div>
      </section>

      <section className="dash-section py-12 text-white sm:py-16 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Cloud Billing Manager"
            title="One Dashboard. Complete Business Visibility."
            text="Powerful Dashboard Features"
            light
          />
          <ShowMoreGrid
            initialCount={3}
            onDark
            className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            moreLabel="View more modules"
          >
            {modules.map((module, index) => {
              const Icon = moduleIcons[module.slug]
              return (
                <Link key={module.slug} to={`/platform/${module.slug}`} className="mod-card">
                  <div className="flex items-start justify-between gap-4">
                    <span className="mod-icon">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="text-[11px] font-semibold tracking-[0.18em] text-white/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[17px] leading-snug font-semibold tracking-tight">
                    {module.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-white/65">{module.tagline}</p>
                  <span className="cap-arrow mt-6">
                    {module.nav}
                    <span className="cap-arrow-line" />
                    <ArrowRight className="size-4 shrink-0" />
                  </span>
                </Link>
              )
            })}
          </ShowMoreGrid>
        </div>
      </section>

      <section className="bg-surface py-12 sm:py-16 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Why Cloud Billing Manager?" title="Business Benefits" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-xl p-2 text-sm text-slate-700 transition hover:bg-white"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <Button to="/why" variant="outline" className="mt-6 w-full sm:w-auto">
              Why Cloud Billing Manager?
            </Button>
          </div>
          <div className="rounded-2xl bg-brand-navy p-6 text-white transition duration-300 hover:-translate-y-1 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              Why Cloud Billing Manager?
            </p>
            <ul className="mt-6 space-y-3">
              {whyUs.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <span className="size-1.5 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <Button to="/contact" variant="white" className="mt-8 w-full sm:w-auto">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <ConversionBand
        title="See Cloud Billing Manager in a live walkthrough"
        text="Book a client demonstration covering inventory, billing, invoicing, customer pricing, stock and POS for UK food distribution."
      />

      <section className="py-6 sm:py-14 lg:py-20">
        <div className="container-page min-w-0">
          <div className="close-band grid min-w-0 items-stretch overflow-hidden rounded-2xl px-4 py-7 text-white sm:rounded-[28px] sm:px-8 sm:py-12 md:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-14">
            <div className="flex min-w-0 flex-col justify-center">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase sm:text-xs sm:tracking-[0.18em]">
                {company.thankYou}
              </p>
              <h2 className="mt-3 max-w-xl text-balance text-[1.35rem] leading-snug font-semibold tracking-tight break-words sm:mt-5 sm:text-3xl md:text-[40px] md:leading-[1.15]">
                {company.tagline}
              </h2>
              <p className="mt-4 text-sm text-white/70 sm:mt-5">Contact Us</p>
              <p className="mt-1 text-sm font-medium break-words text-white">{company.presenter}</p>
              <div className="close-actions">
                <Button to="/contact" variant="white" size="lg" className="w-full sm:w-auto">
                  Contact Us
                </Button>
                <Button to="/demo" size="lg" className="w-full sm:w-auto">
                  Book a client demo
                </Button>
              </div>
            </div>

            <div className="close-panel min-w-0">
              <p className="close-panel-title">Contact Us</p>
              <ShowMoreGrid
                initialCount={2}
                onDark
                className="flex flex-col gap-2.5"
                moreLabel="View more"
                lessLabel="View less"
              >
                <a href={`mailto:${company.email}`} className="close-row">
                  <span className="close-ico">
                    <Mail className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="close-kicker">Email</span>
                    <span className="close-value">{company.email}</span>
                  </span>
                  <ArrowRight className="close-arrow" />
                </a>
                <a href={company.website} target="_blank" rel="noreferrer" className="close-row">
                  <span className="close-ico">
                    <Globe className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="close-kicker">Website</span>
                    <span className="close-value">{company.websiteLabel}</span>
                  </span>
                  <ArrowRight className="close-arrow" />
                </a>
                {companyPhones.map((line) => (
                  <a key={line.label} href={line.href} className="close-row">
                    <span className="close-ico">
                      <Phone className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="close-kicker">{line.label}</span>
                      <span className="close-value">{line.display}</span>
                    </span>
                    <ArrowRight className="close-arrow" />
                  </a>
                ))}
                <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="close-row">
                  <span className="close-ico">
                    <MapPin className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="close-kicker">Head Office</span>
                    <span className="close-value">{company.office}</span>
                    <span className="close-address">{company.address}</span>
                  </span>
                  <ArrowRight className="close-arrow" />
                </a>
              </ShowMoreGrid>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
