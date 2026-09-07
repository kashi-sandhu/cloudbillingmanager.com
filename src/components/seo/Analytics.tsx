import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getGaMeasurementId, isAnalyticsEnabled, trackPageView } from '../../lib/analytics.ts'

function ensureGtag(measurementId: string) {
  if (typeof window === 'undefined') return
  if (document.getElementById('cbm-ga4')) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    anonymize_ip: true,
    send_page_view: false,
  })

  const script = document.createElement('script')
  script.id = 'cbm-ga4'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.appendChild(script)
}

export default function Analytics() {
  const { pathname } = useLocation()
  const measurementId = getGaMeasurementId()
  const gscVerification = (import.meta.env.VITE_GSC_VERIFICATION as string | undefined)?.trim()
  const bingVerification = (import.meta.env.VITE_BING_VERIFICATION as string | undefined)?.trim()

  useEffect(() => {
    if (gscVerification) {
      let meta = document.querySelector('meta[name="google-site-verification"]') as HTMLMetaElement | null
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'google-site-verification'
        document.head.appendChild(meta)
      }
      meta.content = gscVerification
    }
  }, [gscVerification])

  useEffect(() => {
    if (bingVerification) {
      let meta = document.querySelector('meta[name="msvalidate.01"]') as HTMLMetaElement | null
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'msvalidate.01'
        document.head.appendChild(meta)
      }
      meta.content = bingVerification
    }
  }, [bingVerification])

  useEffect(() => {
    if (!measurementId) return
    ensureGtag(measurementId)
  }, [measurementId])

  useEffect(() => {
    if (!isAnalyticsEnabled()) return
    trackPageView(pathname)
  }, [pathname])

  return null
}
