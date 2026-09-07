type Props = {
  src: string
  srcSet?: string
  sizes?: string
  priority?: boolean
  className?: string
}

/**
 * Decorative full-bleed background image with WebP + JPEG fallback.
 * Uses empty alt (decorative); page content provides the meaning.
 */
export default function BannerMedia({
  src,
  srcSet,
  sizes = '100vw',
  priority = false,
  className = '',
}: Props) {
  const jpg = src.replace(/\.webp$/i, '.jpg')
  const webpSrcSet = srcSet ?? src

  return (
    <picture className={`banner-media pointer-events-none absolute inset-0 z-0 block overflow-hidden ${className}`}>
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={jpg}
        alt=""
        className="h-full w-full object-cover"
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        aria-hidden="true"
      />
    </picture>
  )
}
