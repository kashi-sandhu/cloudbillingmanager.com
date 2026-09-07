import { Link, useParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Button from '../components/ui/Button.tsx'
import IconBadge from '../components/ui/IconBadge.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import { modules } from '../data/content.ts'
import { getIndustryPageSeo } from '../data/industrySeo.ts'
import { industryIcons, moduleIcons } from '../data/icons.ts'

export default function IndustryPage() {
  const { slug } = useParams()
  const page = slug ? getIndustryPageSeo(slug) : undefined

  if (!page) {
    return (
      <section className="container-page py-24 text-center">
        <h1 className="text-3xl font-bold text-brand-ink">Industry not found</h1>
        <Button to="/industries" className="mt-6 w-full sm:w-auto">
          Industry Focus
        </Button>
      </section>
    )
  }

  const related = modules.filter((item) => page.relatedModules.includes(item.slug))

  return (
    <>
      <PageHero eyebrow="Industry Focus" title={page.h1} text={page.heroText} />

      <section className="py-12 sm:py-16">
        <div className="container-page max-w-4xl">
          <IconBadge icon={industryIcons[page.slug]} />
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">{page.intro}</p>

          <h2 className="mt-10 text-2xl font-bold text-brand-ink">
            How Cloud Billing Manager supports {page.name.toLowerCase()}
          </h2>
          <ul className="mt-5 space-y-3">
            {page.focusAreas.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-brand-ink">Relevant platform modules</h2>
          <p className="mt-2 text-sm text-muted">
            Start with the modules most relevant to this industry, then explore the full platform.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {related.map((module) => (
              <Link
                key={module.slug}
                to={`/platform/${module.slug}`}
                className="ui-card flex h-full flex-col p-6"
              >
                <IconBadge icon={moduleIcons[module.slug]} />
                <h3 className="mt-4 text-lg font-bold text-brand-ink">{module.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{module.tagline}</p>
                <span className="cap-arrow mt-auto pt-4">
                  {module.nav}
                  <span className="cap-arrow-line" />
                  <ArrowRight className="size-4 shrink-0" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button to="/demo" className="w-full sm:w-auto" analytics="cta_click_demo">
              Book a client demo
            </Button>
            <Button to="/platform" variant="outline" className="w-full sm:w-auto">
              One Complete Cloud Platform
            </Button>
            <Button to="/industries" variant="ghost" className="w-full sm:w-auto">
              All industries
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
