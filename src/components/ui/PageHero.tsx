import { useLocation } from 'react-router-dom'
import Breadcrumb from './Breadcrumb.tsx'
import BannerMedia from './BannerMedia.tsx'
import { bannerForPath } from '../../data/banners.ts'

type Props = {
  eyebrow: string
  title: string
  text?: string
}

export default function PageHero({ eyebrow, title, text }: Props) {
  const { pathname } = useLocation()
  const banner = bannerForPath(pathname)

  return (
    <section className="page-hero relative py-10 text-white sm:py-12 md:py-14" aria-label={title}>
      <BannerMedia src={banner} sizes="100vw" priority />
      <div className="container-page relative">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-[1.65rem] leading-tight font-semibold tracking-tight sm:text-3xl md:text-4xl">
          {title}
        </h1>
        {text ? <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/75">{text}</p> : null}
        <Breadcrumb />
      </div>
    </section>
  )
}
