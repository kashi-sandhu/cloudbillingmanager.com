import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import BlogCard from '../components/blog/BlogCard.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'
import { blogArticles, blogCategories } from '../data/blog.ts'

export default function Blog() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Cloud Billing Manager Blog"
        text="Practical guides on inventory management, billing, invoicing, POS and stock control for UK food distribution businesses."
      />

      <section className="bg-surface py-12 sm:py-16">
        <div className="container-page">
          <SectionHeading
            title="Topic clusters"
            text="Browse articles by the operational areas that matter most to distributors."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blogCategories.map((category) => (
              <Link
                key={category.slug}
                to={`/blog/category/${category.slug}`}
                className="ui-card flex h-full flex-col p-5 sm:p-6"
              >
                <h2 className="text-lg font-bold text-brand-ink">{category.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{category.description}</p>
                <span className="cap-arrow mt-5">
                  Browse articles
                  <span className="cap-arrow-line" />
                  <ArrowRight className="size-4 shrink-0" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-14">
            <SectionHeading title="Latest articles" />
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogArticles.map((article) => (
                <BlogCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
