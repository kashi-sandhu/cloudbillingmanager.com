import { useParams } from 'react-router-dom'
import BlogCard from '../components/blog/BlogCard.tsx'
import Button from '../components/ui/Button.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import { getArticlesByCategory, getBlogCategory } from '../data/blog.ts'

export default function BlogCategory() {
  const { slug } = useParams()
  const category = slug ? getBlogCategory(slug) : undefined
  const articles = slug ? getArticlesByCategory(slug) : []

  if (!category) {
    return (
      <section className="container-page py-24 text-center">
        <h1 className="text-3xl font-bold text-brand-ink">Category not found</h1>
        <Button to="/blog" className="mt-6">
          Back to blog
        </Button>
      </section>
    )
  }

  return (
    <>
      <PageHero eyebrow="Blog category" title={category.name} text={category.description} />

      <section className="bg-surface py-12 sm:py-16">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">{articles.length} article{articles.length === 1 ? '' : 's'}</p>
            <Button to="/blog" variant="outline" className="w-full sm:w-auto">
              All articles
            </Button>
          </div>

          {articles.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <BlogCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="ui-card-soft p-8 text-center">
              <p className="text-slate-600">Articles for this category are coming soon.</p>
              <Button to="/blog" className="mt-6">
                Browse all articles
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
