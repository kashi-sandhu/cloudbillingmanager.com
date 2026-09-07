import PageHero from '../components/ui/PageHero.tsx'
import Button from '../components/ui/Button.tsx'
import { company, telHref } from '../data/content.ts'

export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        text="How Cloud Billing Manager handles enquiry and demo request information submitted through this website."
      />

      <section className="py-12 sm:py-16">
        <div className="container-page prose-legal max-w-3xl space-y-6 text-[15px] leading-7 text-slate-600">
          <p>
            This page explains how {company.presenter} handles personal information submitted through the
            public Cloud Billing Manager website at {company.websiteLabel}.
          </p>

          <h2 className="text-xl font-bold text-brand-ink">Information we collect</h2>
          <p>
            When you use the contact form or schedule a demo form, you may provide your name, email address,
            company name, phone number, industry, preferred demo date and time, and message details.
          </p>

          <h2 className="text-xl font-bold text-brand-ink">How we use this information</h2>
          <p>
            We use submitted details to respond to enquiries, arrange client demonstrations, and communicate
            about Cloud Billing Manager. Form submissions are delivered to {company.email}.
          </p>

          <h2 className="text-xl font-bold text-brand-ink">Who receives the information</h2>
          <p>
            Enquiry and demo requests are processed through FormSubmit and sent to{' '}
            {company.formSubmitEmail}. They are handled by {company.presenter} for sales and demonstration
            purposes.
          </p>

          <h2 className="text-xl font-bold text-brand-ink">Analytics</h2>
          <p>
            If Google Analytics 4 is enabled on this website through a configured measurement ID, it is used to
            understand aggregated page views and conversion events such as demo or contact form submissions.
            Analytics configuration does not intentionally send message contents, passwords, or payment details.
          </p>

          <h2 className="text-xl font-bold text-brand-ink">Security checks on forms</h2>
          <p>
            Contact and demonstration forms include a short human verification question and hidden anti-bot
            fields. These checks help reduce automated spam. Answers are verified in the browser before the
            request is sent to our form delivery provider.
          </p>

          <h2 className="text-xl font-bold text-brand-ink">Contact</h2>
          <p>
            For privacy questions about this website, contact{' '}
            <a className="font-semibold text-brand" href={`mailto:${company.email}`}>
              {company.email}
            </a>{' '}
            or call{' '}
            <a className="font-semibold text-brand" href={telHref(company.phone)}>
              {company.phone}
            </a>{' '}
            / landline{' '}
            <a className="font-semibold text-brand" href={telHref(company.landline)}>
              {company.landline}
            </a>
            .
          </p>

          <p className="text-sm text-muted">
            Head Office: {company.address}. This page is an informational summary for the marketing website
            and may be updated as processes change.
          </p>

          <div className="mt-6">
            <Button to="/contact" variant="outline" className="w-full sm:w-auto">
              Contact us
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
