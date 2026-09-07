import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { BlogArticle } from '../../data/blog.ts'
import { getBlogCategory } from '../../data/blog.ts'
import SeoImage from '../ui/SeoImage.tsx'

type Props = {
  article: BlogArticle
}

export default function BlogCard({ article }: Props) {
  const category = getBlogCategory(article.category)
  const href = `/blog/${article.slug}`

  return (
    <Link to={href} className="blog-card group" title={article.title}>
      <div className="blog-card-media">
        <SeoImage
          src={article.image}
          fallbackSrc={article.image.replace(/\.webp$/i, '.jpg')}
          alt={article.imageAlt}
          width={1200}
          height={630}
          className="blog-card-img"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="blog-card-body">
        {category ? (
          <span className="blog-card-cat">{category.name}</span>
        ) : null}

        <h2 className="blog-card-title">{article.title}</h2>
        <p className="blog-card-excerpt">{article.excerpt}</p>

        <span className="cap-arrow mt-auto pt-5">
          Read article
          <span className="cap-arrow-line" />
          <ArrowRight className="size-4 shrink-0" />
        </span>
      </div>
    </Link>
  )
}
