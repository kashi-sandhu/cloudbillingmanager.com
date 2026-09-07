import { SearchX } from 'lucide-react'
import Button from '../components/ui/Button.tsx'
import IconBadge from '../components/ui/IconBadge.tsx'

export default function NotFound() {
  return (
    <section className="container-page py-16 text-center sm:py-24">
      <div className="flex justify-center">
        <IconBadge icon={SearchX} />
      </div>
      <p className="mt-4 text-xs font-semibold tracking-[0.18em] text-brand uppercase">404</p>
      <h1 className="mt-3 text-3xl font-extrabold text-brand-ink sm:text-4xl">Page not found</h1>
      <p className="mt-3 text-slate-600">The page you requested is not part of this site.</p>
      <Button to="/" className="mt-8">
        Back to home
      </Button>
    </section>
  )
}
