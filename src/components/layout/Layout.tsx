import { Outlet, useLocation } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import ScrollToTop from './ScrollToTop.tsx'
import Seo from '../seo/Seo.tsx'
import Analytics from '../seo/Analytics.tsx'
import Chatbot from '../chat/Chatbot.tsx'
import { trackEvent } from '../../lib/analytics.ts'

function PageFallback() {
  // Quiet placeholder — keeps header/footer visible, no "Loading…" flash
  return <div className="min-h-[50vh]" aria-busy="true" aria-hidden />
}

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = (event.target as HTMLElement | null)?.closest('[data-analytics]')
      if (!target) return
      const name = target.getAttribute('data-analytics')
      if (!name) return
      trackEvent(name, { page_path: pathname })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [pathname])

  return (
    <div className="flex min-h-svh flex-col">
      <Seo />
      <Analytics />
      <ScrollToTop />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
