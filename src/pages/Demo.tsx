import { CalendarDays, Clock3, FileText, MonitorSmartphone, Receipt, Truck, Warehouse } from 'lucide-react'
import ScheduleDemoForm from '../components/forms/ScheduleDemoForm.tsx'
import IconBadge from '../components/ui/IconBadge.tsx'
import PageHero from '../components/ui/PageHero.tsx'
import { company } from '../data/content.ts'

export default function Demo() {
  return (
    <>
      <PageHero
        eyebrow="Schedule Demo"
        title="Book a live walkthrough of Cloud Billing Manager"
        text="Choose a preferred UK date and time. We will confirm your client demonstration by email."
      />

      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <ScheduleDemoForm />

          <aside className="space-y-5">
            <div className="ui-card bg-white p-5 sm:p-8">
              <h2 className="text-xl font-bold text-brand-ink">Booking details</h2>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <IconBadge icon={CalendarDays} size="sm" />
                  <span>Select your preferred day and month. Available for the next 90 days.</span>
                </li>
                <li className="flex items-start gap-3">
                  <IconBadge icon={Clock3} size="sm" tone="accent" />
                  <span>Pick a UK business-hour slot. Times are shown in United Kingdom time (GMT/BST).</span>
                </li>
                <li className="flex items-start gap-3">
                  <IconBadge icon={Receipt} size="sm" />
                  <span>
                    Confirmation goes to <strong>{company.formSubmitEmail}</strong> after you submit.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-surface p-5 sm:p-8">
              <h2 className="text-xl font-bold text-brand-ink">What you will see</h2>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <IconBadge icon={FileText} size="sm" />
                  <span>Create a sales invoice with customer-specific pricing and margin.</span>
                </li>
                <li className="flex items-start gap-3">
                  <IconBadge icon={Truck} size="sm" />
                  <span>Assign vehicle, driver, load, and generate a loading slip.</span>
                </li>
                <li className="flex items-start gap-3">
                  <IconBadge icon={Warehouse} size="sm" />
                  <span>Review live stock, low-stock alerts, and warehouse balances.</span>
                </li>
                <li className="flex items-start gap-3">
                  <IconBadge icon={MonitorSmartphone} size="sm" />
                  <span>Walk through POS, purchase orders, VAT, and role-based access.</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
