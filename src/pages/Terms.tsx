import PageHero from '../components/ui/PageHero.tsx'
import Button from '../components/ui/Button.tsx'
import { company } from '../data/content.ts'

export default function Terms() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        text="Basic terms for using the Cloud Billing Manager public website."
      />

      <section className="py-12 sm:py-16">
        <div className="container-page max-w-3xl space-y-6 text-[15px] leading-7 text-slate-600">
          <p>
            By using the Cloud Billing Manager website at {company.websiteLabel}, you agree to these basic
            terms of use. The website is operated by {company.presenter}.
          </p>

          <h2 className="text-xl font-bold text-brand-ink">Website purpose</h2>
          <p>
            This website provides product information, industry guidance, blog resources, and ways to contact
            the team or book a client demonstration. It does not automatically create a software subscription
            or licence agreement.
          </p>

          <h2 className="text-xl font-bold text-brand-ink">Product demonstrations</h2>
          <p>
            Demo requests submitted through this website are enquiries. Scheduling confirmation, access to any
            live demonstration environment, and commercial terms are handled separately by{' '}
            {company.presenter}.
          </p>

          <h2 className="text-xl font-bold text-brand-ink">Accuracy of information</h2>
          <p>
            We aim to keep product descriptions accurate. Features and workflows may evolve. For the latest
            details, contact the team or request a live walkthrough.
          </p>

          <h2 className="text-xl font-bold text-brand-ink">Contact</h2>
          <p>
            Questions about these terms can be sent to{' '}
            <a className="font-semibold text-brand" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            .
          </p>

          <p className="text-sm text-muted">
            Head Office: {company.address}. These terms apply to the public marketing website and may be
            updated from time to time.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button to="/privacy" variant="outline" className="w-full sm:w-auto">
              Privacy Policy
            </Button>
            <Button to="/contact" variant="outline" className="w-full sm:w-auto">
              Contact
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
