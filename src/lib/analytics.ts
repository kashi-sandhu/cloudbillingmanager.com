type AnalyticsPayload = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function getGaMeasurementId() {
  return (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim() || ''
}

export function isAnalyticsEnabled() {
  return Boolean(getGaMeasurementId())
}

export function trackEvent(name: string, params: AnalyticsPayload = {}) {
  if (!isAnalyticsEnabled() || typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  const safeParams: AnalyticsPayload = {}
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue
    // Never send free-text that may contain PII fields
    if (/email|phone|message|password|name|company/i.test(key)) continue
    safeParams[key] = value
  }

  window.gtag('event', name, safeParams)
}

export function trackPageView(path: string) {
  if (!isAnalyticsEnabled() || typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: document.title,
  })
}
