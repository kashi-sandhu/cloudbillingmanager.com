/** Conceptual product illustration — not live operational data. */
export default function WhatsAppOrderVisual() {
  return (
    <div className="nf-ai" aria-hidden="true">
      <div className="nf-ai-top">
        <div className="nf-ai-brand">
          <span className="nf-live-dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <strong>AI Order Assistant</strong>
        </div>
        <div className="nf-ai-status">
          <span className="nf-live-pulse" />
          <span>Processing</span>
          <em>92%</em>
        </div>
      </div>

      <div className="nf-ai-body">
        <div className="nf-ai-chat">
          <div className="nf-ai-chat-head">
            <span className="nf-ai-wa-icon">WA</span>
            <div>
              <p>WhatsApp · Customer</p>
              <small>+44 7xxx · matched customer</small>
            </div>
            <span className="nf-ai-pill is-ok">Matched</span>
          </div>

          <div className="nf-ai-thread">
            <div className="nf-ai-time">Today · 09:14</div>
            <div className="nf-ai-bubble">
              Morning — please send <mark>10 cases Frozen Peas</mark>,{' '}
              <mark>6 Chicken Breast trays</mark> and <mark>4 boxes Mixed Salad</mark> for tomorrow
              delivery.
            </div>
            <div className="nf-ai-detect">
              <span>AI detected</span>
              <strong>3 products · quantities extracted</strong>
            </div>
          </div>
        </div>

        <div className="nf-ai-flow" aria-hidden>
          <span>AI</span>
        </div>

        <div className="nf-ai-draft">
          <div className="nf-ai-draft-head">
            <div>
              <p>Invoice draft · Review</p>
              <small>Editable before posting</small>
            </div>
            <span className="nf-ai-pill is-review">Staff review</span>
          </div>

          <div className="nf-ai-table">
            <div className="nf-ai-row is-head">
              <span>Code</span>
              <span>Product</span>
              <span>Qty</span>
              <span>Net</span>
            </div>
            <div className="nf-ai-row">
              <span>FP-100</span>
              <span>Frozen Peas</span>
              <span>10</span>
              <span>£48.00</span>
            </div>
            <div className="nf-ai-row">
              <span>CB-220</span>
              <span>Chicken Breast</span>
              <span>6</span>
              <span>£72.00</span>
            </div>
            <div className="nf-ai-row">
              <span>MS-014</span>
              <span>Mixed Salad</span>
              <span>4</span>
              <span>£22.00</span>
            </div>
          </div>

          <div className="nf-ai-totals">
            <div>
              <span>Subtotal</span>
              <strong>£142.00</strong>
            </div>
            <div>
              <span>VAT</span>
              <strong>£28.40</strong>
            </div>
            <div className="is-grand">
              <span>Grand total</span>
              <strong>£170.40</strong>
            </div>
          </div>

          <div className="nf-ai-actions">
            <span>Edit</span>
            <span>Approve</span>
            <span className="is-warn">Reject</span>
          </div>
        </div>
      </div>
    </div>
  )
}
