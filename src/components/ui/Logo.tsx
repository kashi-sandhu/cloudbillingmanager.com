import SeoImage from './SeoImage.tsx'
import { brandLogo } from '../../data/media.ts'

type Props = {
  className?: string
}

export default function Logo({ className = '' }: Props) {
  return (
    <SeoImage
      src={brandLogo.src}
      fallbackSrc={brandLogo.fallback}
      alt={brandLogo.alt}
      width={brandLogo.width}
      height={brandLogo.height}
      className={`brand-logo block object-contain object-left ${className}`.trim()}
      priority
    />
  )
}
