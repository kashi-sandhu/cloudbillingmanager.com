import { CheckSquare, FileText, Newspaper } from 'lucide-react'
import Button from '../components/ui/Button.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import { resourceHubItems } from '../data/resources.ts'
import { blogArticles } from '../data/blog.ts'

const typeIcons = {
  checklist: CheckSquare,
  guide: FileText,
  hub: Newspaper,
} as const

const typeCta = {
  checklist: 'Open checklist',
  guide: 'Open guide',
  hub: 'Open resource',
} as const

export default function Resources() {
  const featuredBlog = blogArticles.slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Linkable resources for inventory, billing and operations"
        text="Practical checklists, guides and educational content that distributors, consultants and publishers can reference when discussing inventory and business systems."
      />

      <section className="py-12 sm:py-16">
        <div className="container-page">
          <SectionHeading
            title="Featured linkable assets"
            text="These pages are designed to be useful on their own and naturally referenceable by industry articles, partner sites and educational resources."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {resourceHubItems.map((item) => {
              const Icon = typeIcons[item.type]
              return (
                <article key={item.slug} className="ui-card flex h-full flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                      {item.type}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-brand-ink">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.excerpt}</p>
                  <p className="mt-3 text-xs text-muted">Audience: {item.audience}</p>
                  <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:flex-wrap">
                    <Button to={item.path} className="w-full sm:w-auto">
                      {typeCta[item.type]}
                    </Button>
                    <Button to={item.relatedProduct.to} variant="outline" className="w-full sm:w-auto">
                      {item.relatedProduct.label}
                    </Button>
                  </div>
                </article>
              )
            })}

            <article className="ui-card-soft border-dashed p-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">Coming later</p>
              <h2 className="mt-3 text-xl font-bold text-brand-ink">More downloadable toolkits</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Future assets may include an invoice lifecycle guide, purchase-to-stock workflow sheet and
                POS inventory readiness checklist — only when they add genuine operational value.
              </p>
              <Button to="/contact" variant="outline" className="mt-5 w-full sm:w-auto">
                Suggest a resource topic
              </Button>
            </article>
          </div>

          <div className="mt-14">
            <SectionHeading
              title="From the blog"
              text="Supporting articles that explain inventory, billing and POS topics in more depth."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {featuredBlog.map((article) => (
                <article key={article.slug} className="ui-card flex h-full flex-col p-5">
                  <h3 className="text-base font-bold text-brand-ink">{article.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{article.excerpt}</p>
                  <Button to={`/blog/${article.slug}`} className="mt-5 w-full sm:w-auto">
                    Read article
                  </Button>
                </article>
              ))}
            </div>
            <Button to="/blog" variant="outline" className="mt-8 w-full sm:w-auto">
              Browse all articles
            </Button>
          </div>

          <div className="mt-14 ui-card border-brand-soft bg-brand-soft/40 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-brand-ink">For journalists, partners and publishers</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Looking for brand facts, product descriptions or resource citations for Cloud Billing Manager?
              Visit the press page or contact AVANTCORE Technologies.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button to="/press" className="w-full sm:w-auto">Open press kit</Button>
              <Button to="/contact" variant="outline" className="w-full sm:w-auto">
                Contact the team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
