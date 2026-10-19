import { connectedWorkflowCopy, connectedWorkflowSteps } from '../../data/features.ts'

type Props = {
  compact?: boolean
}

export default function ConnectedWorkflow({ compact = false }: Props) {
  return (
    <section className={`nf-workflow${compact ? ' is-compact' : ''}`} aria-labelledby="nf-workflow-heading">
      <div className="container-page">
        <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">Connected Platform</p>
        <h2 id="nf-workflow-heading" className="mt-2 max-w-3xl text-[1.35rem] leading-snug font-semibold tracking-tight text-white sm:text-2xl md:text-[32px]">
          {connectedWorkflowCopy.headline}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/75">{connectedWorkflowCopy.text}</p>
        <ol className="nf-workflow-steps">
          {connectedWorkflowSteps.map((step, index) => (
            <li key={step} className="nf-workflow-step">
              <span className="nf-workflow-index" aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="nf-workflow-label">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
