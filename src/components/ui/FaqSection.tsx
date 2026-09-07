import type { FaqItem } from '../../data/pageSeo.ts'

type Props = {
  faqs: FaqItem[]
  headingId?: string
  title?: string
}

export default function FaqSection({
  faqs,
  headingId = 'page-faq-heading',
  title = 'Frequently Asked Questions',
}: Props) {
  if (!faqs.length) return null

  return (
    <section aria-labelledby={headingId} className="ui-card p-5 sm:p-8">
      <h2 id={headingId} className="text-xl font-bold text-brand-ink sm:text-2xl">
        {title}
      </h2>
      <div className="mt-6 space-y-4">
        {faqs.map((faq) => (
          <article key={faq.question} className="ui-card-soft p-4 sm:p-5">
            <h3 className="text-base font-semibold text-brand-ink">{faq.question}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
