import Button from './Button.tsx'

type Props = {
  title: string
  text: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}

export default function ConversionBand({
  title,
  text,
  primaryLabel = 'Book a client demo',
  primaryTo = '/demo',
  secondaryLabel = 'Contact us',
  secondaryTo = '/contact',
}: Props) {
  return (
    <section className="border-y border-line bg-surface py-10 sm:py-12">
      <div className="container-page flex flex-col gap-5 ui-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="max-w-2xl">
          <h2 className="text-xl font-bold text-brand-ink sm:text-2xl">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button to={primaryTo} className="w-full sm:w-auto" analytics="cta_click_demo">
            {primaryLabel}
          </Button>
          <Button to={secondaryTo} variant="outline" className="w-full sm:w-auto" analytics="cta_click_contact">
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
