import { Link, useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import Button from '../components/ui/Button.tsx'
import FaqSection from '../components/ui/FaqSection.tsx'
import IconBadge from '../components/ui/IconBadge.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import { modules } from '../data/content.ts'
import { getModulePageSeo } from '../data/pageSeo.ts'
import { getLearningLinks } from '../data/semantic.ts'
import { moduleIcons } from '../data/icons.ts'
import ModuleWorkVisual, { hasModuleWorkVisual } from '../components/features/ModuleWorkVisual.tsx'

export default function ModulePage() {
  const { slug } = useParams()
  const module = modules.find((item) => item.slug === slug)
  const pageSeo = slug ? getModulePageSeo(slug) : undefined
  const learningLinks = getLearningLinks(slug)

  if (!module) {
    return (
      <section className="container-page py-24 text-center">
        <h1 className="text-3xl font-bold text-brand-ink">Page not found</h1>
        <Button to="/platform" className="mt-6 w-full sm:w-auto">
          One Complete Cloud Platform
        </Button>
      </section>
    )
  }

  const total = module.groups.reduce((sum, group) => sum + group.items.length, 0)

  return (
    <>
      <PageHero
        eyebrow={module.nav}
        title={pageSeo?.h1 ?? module.name}
        text={pageSeo?.heroText ?? module.description}
      />

      <section className="py-12 sm:py-16">
        <div className="container-page space-y-10">
          {pageSeo?.intro ? (
            <p className="max-w-3xl text-base leading-7 text-slate-600">{pageSeo.intro}</p>
          ) : null}

          {hasModuleWorkVisual(module.slug) ? (
            <figure className="module-work-stage">
              <ModuleWorkVisual slug={module.slug} />
              {module.slug === 'pos' ? (
                <figcaption className="mt-4 text-center text-sm leading-6 text-slate-600 sm:px-4">
                  Touch-friendly POS billing with product categories, barcode scanning and printed
                  invoice — designed for cash &amp; carry and retail counters.
                </figcaption>
              ) : null}
              {module.slug === 'sales' ? (
                <figcaption className="mt-4 text-center text-sm leading-6 text-slate-600 sm:px-4">
                  Cloud Billing Manager sales invoice view used for customer billing and order
                  documentation.
                </figcaption>
              ) : null}
            </figure>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            <IconBadge icon={moduleIcons[module.slug]} />
            <span className="rounded-full bg-brand-soft px-4 py-2 text-sm font-semibold text-brand">
              {module.groups.length} sections
            </span>
            <span className="rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-accent">
              {total} details
            </span>
          </div>

          {pageSeo?.relatedLinks.length ? (
            <nav aria-label="Related modules" className="flex flex-wrap gap-2">
              {pageSeo.relatedLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand-soft/40"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ) : null}

          {learningLinks.length ? (
            <nav
              aria-label="Related learning resources"
              className="ui-card-soft p-5"
            >
              <h2 className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">
                Related learning
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {learningLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="inline-flex rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-brand-navy hover:border-brand hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          {module.groups.map((group) => (
            <article key={group.title} className="ui-card p-5 sm:p-8">
              <h2 className="text-xl font-bold text-brand-ink sm:text-2xl">{group.title}</h2>
              {group.intro ? <p className="mt-3 text-sm leading-6 text-muted">{group.intro}</p> : null}
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {group.items.map((item, index) => (
                  <li
                    key={`${group.title}-${index}`}
                    className="ui-card-soft flex items-start gap-2 p-4 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {pageSeo?.faqs.length ? (
            <FaqSection faqs={pageSeo.faqs} headingId="module-faq-heading" />
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button to="/demo" className="w-full sm:w-auto" analytics="cta_click_demo">
              Book a client demo
            </Button>
            <Button to="/contact" variant="outline" className="w-full sm:w-auto" analytics="cta_click_contact">
              Contact Us
            </Button>
            <Button to="/platform" variant="ghost" className="w-full sm:w-auto">
              One Complete Cloud Platform
            </Button>
          </div>

          <div>
            <h3 className="text-lg font-bold text-brand-ink">More from Cloud Billing Manager</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {modules
                .filter((item) => item.slug !== module.slug)
                .map((item) => (
                  <Link
                    key={item.slug}
                    to={`/platform/${item.slug}`}
                    className="ui-card inline-flex min-w-0 items-center gap-3 px-4 py-3 text-sm font-semibold break-words text-brand-navy"
                  >
                    <IconBadge icon={moduleIcons[item.slug]} size="sm" />
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
