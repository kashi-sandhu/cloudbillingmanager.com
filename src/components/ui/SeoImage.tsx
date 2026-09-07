import type { ImgHTMLAttributes } from 'react'

type Props = {
  src: string
  alt: string
  fallbackSrc?: string
  width?: number
  height?: number
  className?: string
  /** Prefer eager for LCP / above-the-fold images. */
  priority?: boolean
  sizes?: string
  srcSet?: string
  caption?: string
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height' | 'loading'>

function webpCandidate(src: string) {
  if (src.endsWith('.webp')) return src
  if (/\.jpe?g$/i.test(src)) return src.replace(/\.jpe?g$/i, '.webp')
  if (/\.png$/i.test(src)) return src.replace(/\.png$/i, '.webp')
  return undefined
}

/**
 * Accessible image with optional WebP source, dimensions and lazy-loading defaults.
 */
export default function SeoImage({
  src,
  alt,
  fallbackSrc,
  width,
  height,
  className,
  priority = false,
  sizes,
  srcSet,
  caption,
  decoding = 'async',
  ...rest
}: Props) {
  const webp = webpCandidate(src)
  const raster = fallbackSrc ?? src
  const loading = priority ? 'eager' : 'lazy'
  const fetchPriority = priority ? 'high' : undefined

  const img = (
    <img
      src={raster}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      sizes={sizes}
      srcSet={srcSet}
      {...rest}
    />
  )

  const picture =
    webp && webp !== raster ? (
      <picture>
        <source srcSet={srcSet ?? webp} type="image/webp" sizes={sizes} />
        {img}
      </picture>
    ) : (
      img
    )

  if (!caption) return picture

  return (
    <figure className="space-y-2">
      {picture}
      <figcaption className="text-sm leading-6 text-muted">{caption}</figcaption>
    </figure>
  )
}
