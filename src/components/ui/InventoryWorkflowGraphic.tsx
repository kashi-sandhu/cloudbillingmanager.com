import { Link } from 'react-router-dom'

const steps = [
  { label: 'Purchase order', detail: 'Order stock from suppliers', to: '/platform/purchasing' },
  { label: 'Goods receipt', detail: 'Verify delivery and update inventory', to: '/platform/inventory' },
  { label: 'Warehouse stock', detail: 'Allocate and transfer by location', to: '/platform/inventory' },
  { label: 'Sales / POS', detail: 'Fulfil orders and reduce available stock', to: '/platform/pos' },
  { label: 'Reports', detail: 'Review value, low stock and movements', to: '/platform/dashboard' },
]

/**
 * Accessible inventory workflow graphic — information also exists as HTML text.
 */
export default function InventoryWorkflowGraphic() {
  return (
    <figure className="ui-card p-5 sm:p-7">
      <figcaption className="text-lg font-bold text-brand-ink">Inventory management workflow</figcaption>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Stock accuracy depends on purchases, warehouse movements, sales and POS updating the same inventory
        record — then reporting on what changed.
      </p>

      <svg
        className="mt-6 hidden w-full text-brand sm:block"
        viewBox="0 0 920 120"
        role="img"
        aria-label="Flow from purchase order through goods receipt, warehouse stock, sales or POS, to reports"
      >
        {steps.map((step, index) => {
          const x = 20 + index * 180
          return (
            <g key={step.label}>
              <rect x={x} y={24} width={150} height={72} rx={12} fill="#EEF3FA" stroke="#3F68A8" />
              <text x={x + 75} y={54} textAnchor="middle" fontSize="13" fontWeight="700" fill="#163054">
                {step.label}
              </text>
              <text x={x + 75} y={76} textAnchor="middle" fontSize="10" fill="#475569">
                {index + 1}
              </text>
              {index < steps.length - 1 ? (
                <path
                  d={`M ${x + 150} 60 L ${x + 180} 60`}
                  stroke="#F07031"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                />
              ) : null}
            </g>
          )
        })}
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#F07031" />
          </marker>
        </defs>
      </svg>

      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => (
          <li key={step.label} className="ui-card-soft p-3">
            <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Step {index + 1}</p>
            <p className="mt-1 text-sm font-bold text-brand-ink">{step.label}</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">{step.detail}</p>
            <Link to={step.to} className="mt-2 inline-block text-xs font-semibold text-brand">
              Related module
            </Link>
          </li>
        ))}
      </ol>
    </figure>
  )
}
