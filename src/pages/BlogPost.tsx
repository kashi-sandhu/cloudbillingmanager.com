import { Link, useParams } from 'react-router-dom'
import BlogCard from '../components/blog/BlogCard.tsx'
import BlogContent from '../components/blog/BlogContent.tsx'
import Button from '../components/ui/Button.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import SeoImage from '../components/ui/SeoImage.tsx'
import {
  blogAuthor,
  formatBlogDate,
  getBlogArticle,
  getBlogCategory,
  getRelatedArticles,
} from '../data/blog.ts'

export default function BlogPost() {
  const { slug } = useParams()
  const article = slug ? getBlogArticle(slug) : undefined

  if (!article) {
    return (
      <section className="container-page py-24 text-center">
        <h1 className="text-3xl font-bold text-brand-ink">Article not found</h1>
        <Button to="/blog" className="mt-6 w-full sm:w-auto">
          Back to blog
        </Button>
      </section>
    )
  }

  const category = getBlogCategory(article.category)
  const related = getRelatedArticles(article)

  return (
    <>
      <PageHero eyebrow={category?.name ?? 'Blog'} title={article.title} text={article.excerpt} />

      <article className="py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
              <span>
                By {blogAuthor.name}
              </span>
              <span>{blogAuthor.role}</span>
              <span>Published {formatBlogDate(article.publishedAt)}</span>
              {article.updatedAt !== article.publishedAt ? (
                <span>Updated {formatBlogDate(article.updatedAt)}</span>
              ) : null}
            </div>

              <aside className="mt-4 ui-card-soft p-4 text-sm leading-6 text-slate-600">
              <p>
                <span className="font-semibold text-brand-ink">{blogAuthor.name}</span>
                {' · '}
                {blogAuthor.organization}
              </p>
              <p className="mt-2">{blogAuthor.bio}</p>
              <Button to={blogAuthor.aboutPath} variant="outline" className="mt-3 w-full sm:w-auto">
                About Cloud Billing Manager
              </Button>
            </aside>

            <SeoImage
              src={article.image}
              fallbackSrc={article.image.replace(/\.webp$/i, '.jpg')}
              alt={article.imageAlt}
              width={1200}
              height={630}
              className="mt-6 h-56 w-full rounded-2xl border border-line object-cover sm:h-72"
              priority
              sizes="(max-width: 1024px) 100vw, 720px"
            />

            <div className="mt-8">
              <BlogContent blocks={article.blocks} />
            </div>

            {article.faqs.length ? (
              <section className="mt-10 ui-card p-5 sm:p-8" aria-labelledby="blog-faq">
                <h2 id="blog-faq" className="text-xl font-bold text-brand-ink sm:text-2xl">
                  Frequently Asked Questions
                </h2>
                <div className="mt-6 space-y-4">
                  {article.faqs.map((faq) => (
                    <div key={faq.question} className="ui-card-soft p-4 sm:p-5">
                      <h3 className="text-base font-semibold text-brand-ink">{faq.question}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <div className="mt-10 ui-card border-brand-soft bg-brand-soft/40 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-brand-ink">Next step</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                See how Cloud Billing Manager supports this workflow inside one cloud platform for UK food
                distribution businesses.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button to={article.cta.to} className="w-full sm:w-auto">{article.cta.label}</Button>
                <Button to="/demo" variant="outline" className="w-full sm:w-auto">
                  Book a client demo
                </Button>
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="ui-card p-5">
              <h2 className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">
                Related product pages
              </h2>
              <ul className="mt-4 space-y-2">
                {article.relatedProductLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm font-semibold text-brand-navy hover:text-brand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {category ? (
              <div className="ui-card p-5">
                <h2 className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">Category</h2>
                <Link
                  to={`/blog/category/${category.slug}`}
                  className="mt-3 inline-block text-sm font-semibold text-brand-navy hover:text-brand"
                >
                  {category.name}
                </Link>
              </div>
            ) : null}

            <div className="ui-card p-5">
              <h2 className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">Browse</h2>
              <Button to="/blog" variant="outline" className="mt-3 w-full">
                All blog articles
              </Button>
            </div>
          </aside>
        </div>

        {related.length ? (
          <div className="container-page mt-14">
            <h2 className="text-2xl font-bold text-brand-ink">Related articles</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.slug} article={item} />
              ))}
            </div>
          </div>
        ) : null}
      </article>
    </>
  )
}
