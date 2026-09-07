import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { CheckCircle2, ChevronDown, Clock3 } from 'lucide-react'
import Button from '../ui/Button.tsx'
import FormCaptcha, { type FormCaptchaHandle } from './FormCaptcha.tsx'
import { company, industries } from '../../data/content.ts'
import { trackEvent } from '../../lib/analytics.ts'
import { isHoneypotTripped } from '../../lib/formSecurity.ts'

const ukSlots = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
] as const

function IndustrySelect() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>(industries[0].name)
  const wrapRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    function onDoc(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    if (!open) return
    menuRef.current?.focus()
  }, [open])

  return (
    <div className="industry-select" ref={wrapRef}>
      <input type="hidden" name="industry" value={value} />
      <button
        type="button"
        className="industry-trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
      >
        <span>{value}</span>
        <ChevronDown className={`size-4 shrink-0 text-brand ${open ? 'rotate-180' : ''}`} />
      </button>
      {open ? (
        <ul
          ref={menuRef}
          className="industry-menu"
          role="listbox"
          tabIndex={-1}
          aria-label="Industry"
          onWheel={(event) => event.stopPropagation()}
        >
          {industries.map((industry) => (
            <li key={industry.slug}>
              <button
                type="button"
                role="option"
                aria-selected={value === industry.name}
                className={`industry-option${value === industry.name ? ' is-active' : ''}`}
                onClick={() => {
                  setValue(industry.name)
                  setOpen(false)
                }}
              >
                {industry.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function formatUkDate(value: string) {
  if (!value) return ''
  const date = new Date(`${value}T12:00:00`)
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/London',
  }).format(date)
}

function ukTimezoneLabel() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    timeZoneName: 'short',
  }).formatToParts(new Date())
  const zone = parts.find((part) => part.type === 'timeZoneName')?.value ?? 'GMT'
  return `United Kingdom (${zone})`
}

export default function ScheduleDemoForm() {
  const [sent, setSent] = useState(false)
  const [needsActivation, setNeedsActivation] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [timeValue, setTimeValue] = useState<string>(ukSlots[2])
  const captchaRef = useRef<FormCaptchaHandle>(null)
  const zoneLabel = useMemo(() => ukTimezoneLabel(), [])

  const minDate = useMemo(() => {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/London',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date())
  }, [])

  const maxDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 90)
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/London',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date)
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    if (isHoneypotTripped(data)) return

    const firstName = String(data.get('firstName') ?? '').trim()
    const lastName = String(data.get('lastName') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const companyName = String(data.get('company') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const industry = String(data.get('industry') ?? '').trim()
    const preferredDate = String(data.get('preferredDate') ?? '').trim()
    const preferredTime = String(data.get('preferredTime') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (
      !firstName ||
      !lastName ||
      !email ||
      !companyName ||
      !phone ||
      !industry ||
      !preferredDate ||
      !preferredTime ||
      !message
    ) {
      setError('All fields are required. Please complete the full schedule demo form.')
      return
    }

    if (message.length < 8) {
      setError('Please add a short description of at least 8 characters.')
      return
    }

    if (!captchaRef.current?.verify()) {
      setError('Please complete the security check correctly.')
      return
    }

    setSending(true)
    setError('')
    setSent(false)
    setNeedsActivation(false)

    const dateLabel = formatUkDate(preferredDate)

    const payload = {
      _subject: 'Cloud Billing Manager schedule demo request',
      _template: 'table',
      _captcha: 'false',
      _url: `${company.website}/demo`,
      _replyto: email,
      name: `${firstName} ${lastName}`.trim(),
      email,
      company: companyName,
      phone,
      industry,
      preferred_date: dateLabel,
      preferred_date_iso: preferredDate,
      preferred_time_uk: `${preferredTime} ${zoneLabel}`,
      notes: message,
      website: company.websiteLabel,
      security_check: 'Passed client security check',
      message: `Schedule demo request\nDate: ${dateLabel}\nTime: ${preferredTime} (${zoneLabel})\nNotes: ${message}`,
    }

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${company.formSubmitEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const result = (await response.json()) as { success?: boolean | string; message?: string }
      const resultMessage = String(result.message ?? '')
      const ok = result.success === true || result.success === 'true'

      if (/activat/i.test(resultMessage)) {
        setNeedsActivation(true)
        return
      }

      if (!response.ok || !ok) {
        throw new Error(resultMessage || 'The request could not be sent.')
      }

      trackEvent('demo_form_submit', { form_name: 'schedule_demo' })
      form.reset()
      captchaRef.current?.reset()
      setDateValue('')
      setTimeValue(ukSlots[2])
      setSent(true)
    } catch (caught) {
      const fallback =
        caught instanceof Error && caught.message
          ? caught.message
          : `The request could not be sent. Please try again or email ${company.formSubmitEmail}.`
      setError(fallback)
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-secure ui-card-static grid gap-4 p-5 sm:p-8" noValidate>
      <div className="form-hp" aria-hidden="true">
        <label>
          Leave blank
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
        </label>
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="rounded-xl border border-brand-soft bg-brand-soft/40 px-4 py-3">
        <p className="text-sm font-semibold text-brand-ink">Schedule a client demonstration</p>
        <p className="mt-1 text-xs leading-5 text-muted">
          Choose a preferred day, month, and time in {zoneLabel}. We will confirm by email.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-brand-ink">
          First name <span className="text-accent">*</span>
          <input
            required
            name="firstName"
            className="mt-1.5 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
          />
        </label>
        <label className="text-sm font-medium text-brand-ink">
          Last name <span className="text-accent">*</span>
          <input
            required
            name="lastName"
            className="mt-1.5 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
          />
        </label>
      </div>

      <label className="text-sm font-medium text-brand-ink">
        Work email <span className="text-accent">*</span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          className="mt-1.5 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-brand-ink">
          Company <span className="text-accent">*</span>
          <input
            required
            name="company"
            className="mt-1.5 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
          />
        </label>
        <label className="text-sm font-medium text-brand-ink">
          Phone <span className="text-accent">*</span>
          <input
            required
            type="tel"
            name="phone"
            autoComplete="tel"
            className="mt-1.5 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
          />
        </label>
      </div>

      <div className="text-sm font-medium text-brand-ink">
        Industry <span className="text-accent">*</span>
        <IndustrySelect />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-brand-ink">
          Preferred date <span className="text-accent">*</span>
          <input
            required
            type="date"
            name="preferredDate"
            min={minDate}
            max={maxDate}
            value={dateValue}
            onChange={(event) => setDateValue(event.target.value)}
            className="mt-1.5 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
          />
          {dateValue ? (
            <span className="mt-1.5 block text-xs font-medium text-muted">{formatUkDate(dateValue)}</span>
          ) : (
            <span className="mt-1.5 block text-xs text-muted">Day and month in UK calendar format</span>
          )}
        </label>

        <label className="text-sm font-medium text-brand-ink">
          Preferred time <span className="text-accent">*</span>
          <span className="mt-1.5 flex h-11 items-center gap-2 rounded-lg border border-line px-3">
            <Clock3 className="size-4 shrink-0 text-accent" />
            <select
              required
              name="preferredTime"
              value={timeValue}
              onChange={(event) => setTimeValue(event.target.value)}
              className="h-full w-full border-0 bg-transparent text-sm outline-none"
            >
              {ukSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </span>
          <span className="mt-1.5 block text-xs text-muted">{zoneLabel}</span>
        </label>
      </div>

      <label className="text-sm font-medium text-brand-ink">
        What should we cover? <span className="text-accent">*</span>
        <textarea
          required
          name="message"
          rows={4}
          minLength={8}
          className="mt-1.5 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand"
          placeholder="Invoicing, stock, routes, Sage migration, POS..."
        />
      </label>

      <FormCaptcha ref={captchaRef} id="demo-captcha" />

      {error ? <p className="text-sm text-accent">{error}</p> : null}

      <Button type="submit" size="lg" disabled={sending} arrow={!sending} className="w-full sm:w-auto">
        {sending ? 'Scheduling demonstration...' : 'Schedule demonstration'}
      </Button>

      {sent ? (
        <p className="flex items-center gap-2 text-sm font-medium text-brand">
          <CheckCircle2 className="size-4 shrink-0" />
          The form has been submitted.
        </p>
      ) : null}

      {needsActivation ? (
        <p className="text-sm leading-6 text-slate-600">
          Open <strong>{company.formSubmitEmail}</strong>, click <strong>Activate Form</strong> in the
          email, then submit this form again.
        </p>
      ) : null}
    </form>
  )
}
