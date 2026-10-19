type Props = {
  src: string
  srcSet?: string
  sizes?: string
  priority?: boolean
  className?: string
}

/**
 * Decorative full-bleed background image with WebP + JPEG fallback.
 * /webp/* assets are WebP-only (no .jpg twin) — use WebP as img src there.
 */
export default function BannerMedia({
  src,
  srcSet,
  sizes = '100vw',
  priority = false,
  className = '',
}: Props) {
  const fromWebpFolder = src.includes('/webp/')
  const jpg = src.replace(/\.webp$/i, '.jpg')
  const webpSrcSet = srcSet ?? src
  const imgSrc = fromWebpFolder || priority ? src : jpg

  const contain = className.includes('banner-fit-contain')
  const coverRight = className.includes('banner-cover-right')

  return (
    <picture
      className={`banner-media pointer-events-none absolute inset-0 z-0 block overflow-hidden ${className}`.trim()}
    >
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={imgSrc}
        alt=""
        className={`banner-media-img h-full w-full ${
          contain ? 'object-contain is-contain' : coverRight ? 'object-cover is-cover-right' : 'object-cover'
        }`}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        aria-hidden="true"
      />
    </picture>
  )
}
