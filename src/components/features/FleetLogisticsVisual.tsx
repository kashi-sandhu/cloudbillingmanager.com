/** Conceptual product illustration — illustrative only, not live fleet data. */
export default function FleetLogisticsVisual() {
  return (
    <div className="nf-live" aria-hidden="true">
      <div className="nf-live-top">
        <div className="nf-live-brand">
          <span className="nf-live-dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <strong>Live Fleet Routes</strong>
        </div>
        <div className="nf-live-status">
          <span className="nf-live-pulse" />
          Live monitoring
          <em>Updated now</em>
        </div>
      </div>

      <div className="nf-live-body">
        <div className="nf-live-map">
          <svg className="nf-live-svg" viewBox="0 0 440 320" role="img" aria-label="Illustrative live delivery route map">
            <defs>
              <linearGradient id="nfRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2f5ea8" />
                <stop offset="48%" stopColor="#f07031" />
                <stop offset="100%" stopColor="#2f5ea8" />
              </linearGradient>
              <linearGradient id="nfMapWash" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5f7fb" />
                <stop offset="55%" stopColor="#e9eef6" />
                <stop offset="100%" stopColor="#e3eaf3" />
              </linearGradient>
              <linearGradient id="nfParkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dcefd8" />
                <stop offset="100%" stopColor="#c5dfbf" />
              </linearGradient>
              <linearGradient id="nfWaterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c8ddf2" />
                <stop offset="100%" stopColor="#a9c7e6" />
              </linearGradient>
              <linearGradient id="nfBridge" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#dbe3ee" />
              </linearGradient>
              <filter id="nfSoftGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="nfPinShadow" x="-45%" y="-45%" width="190%" height="190%">
                <feDropShadow dx="0" dy="1.8" stdDeviation="1.6" floodColor="#163054" floodOpacity="0.3" />
              </filter>
            </defs>

            <rect width="440" height="320" fill="url(#nfMapWash)" />

            {/* Soft districts */}
            <ellipse cx="78" cy="58" rx="100" ry="54" fill="#eef5ea" opacity="0.75" />
            <ellipse cx="360" cy="250" rx="120" ry="70" fill="#edf4ea" opacity="0.6" />

            {/* Parks */}
            <rect x="16" y="16" width="108" height="70" rx="12" fill="url(#nfParkGrad)" />
            <circle cx="48" cy="42" r="10" fill="#b7d4b1" opacity="0.7" />
            <circle cx="74" cy="52" r="14" fill="#aecfa8" opacity="0.55" />
            <circle cx="96" cy="36" r="8" fill="#b7d4b1" opacity="0.65" />
            <rect x="318" y="198" width="106" height="78" rx="12" fill="url(#nfParkGrad)" />
            <circle cx="348" cy="228" r="12" fill="#b7d4b1" opacity="0.55" />
            <circle cx="382" cy="246" r="16" fill="#aecfa8" opacity="0.5" />
            <circle cx="372" cy="44" r="30" fill="#cfe3cb" />
            <circle cx="392" cy="58" r="16" fill="#bdd8b8" opacity="0.7" />

            {/* Water / canal with banks */}
            <path
              d="M0 268 C 60 246, 118 286, 180 266 S 286 242, 348 262 S 404 294, 440 276 V 320 H 0 Z"
              fill="url(#nfWaterGrad)"
            />
            <path
              d="M0 274 C 60 254, 118 290, 180 272 S 286 250, 348 268"
              fill="none"
              stroke="#95b8db"
              strokeWidth="2.2"
              opacity="0.55"
            />
            <path
              d="M20 286 C 70 274, 120 298, 170 284"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.2"
              opacity="0.35"
            />

            {/* Bridge over canal */}
            <rect x="246" y="250" width="18" height="42" rx="3" fill="url(#nfBridge)" />
            <rect x="248" y="252" width="14" height="38" rx="2" fill="#fff" opacity="0.55" />

            {/* Industrial / retail blocks near bottom-right */}
            <g fill="#d2dce8">
              <rect x="268" y="214" width="40" height="28" rx="4" />
              <rect x="276" y="250" width="34" height="18" rx="3" />
              <rect x="188" y="250" width="48" height="20" rx="3" />
              <rect x="148" y="250" width="32" height="20" rx="3" />
            </g>

            {/* Main city blocks */}
            <g fill="#d5dee9">
              <rect x="24" y="100" width="56" height="36" rx="4" />
              <rect x="88" y="100" width="48" height="36" rx="4" />
              <rect x="24" y="146" width="112" height="40" rx="4" />
              <rect x="156" y="24" width="62" height="48" rx="4" />
              <rect x="228" y="24" width="54" height="48" rx="4" />
              <rect x="156" y="88" width="66" height="42" rx="4" />
              <rect x="232" y="88" width="58" height="42" rx="4" />
              <rect x="156" y="144" width="134" height="36" rx="4" />
              <rect x="304" y="24" width="56" height="60" rx="4" />
              <rect x="370" y="92" width="52" height="36" rx="4" />
              <rect x="304" y="100" width="118" height="32" rx="4" />
              <rect x="304" y="144" width="60" height="30" rx="4" />
              <rect x="374" y="144" width="48" height="30" rx="4" />
              <rect x="24" y="206" width="72" height="42" rx="4" />
              <rect x="108" y="206" width="60" height="42" rx="4" />
              <rect x="184" y="206" width="90" height="34" rx="4" />
            </g>

            {/* Rooftop / courtyard detail */}
            <g fill="#c2cedc" opacity="0.62">
              <rect x="30" y="106" width="20" height="11" rx="1.5" />
              <rect x="54" y="106" width="20" height="11" rx="1.5" />
              <rect x="30" y="122" width="44" height="8" rx="1.5" />
              <rect x="164" y="32" width="22" height="12" rx="1.5" />
              <rect x="190" y="32" width="20" height="12" rx="1.5" />
              <rect x="164" y="50" width="46" height="12" rx="1.5" />
              <rect x="312" y="34" width="18" height="12" rx="1.5" />
              <rect x="334" y="34" width="18" height="12" rx="1.5" />
              <rect x="312" y="52" width="40" height="20" rx="1.5" />
              <rect x="192" y="214" width="28" height="10" rx="1.5" />
              <rect x="226" y="214" width="36" height="16" rx="1.5" />
              <rect x="274" y="220" width="28" height="10" rx="1.5" />
            </g>

            {/* Local streets */}
            <g stroke="#fbfcfe" strokeWidth="6.5" strokeLinecap="round" fill="none">
              <path d="M0 74 H440" />
              <path d="M0 136 H440" />
              <path d="M0 188 H440" />
              <path d="M0 240 H440" />
              <path d="M68 0 V320" />
              <path d="M140 0 V320" />
              <path d="M216 0 V320" />
              <path d="M290 0 V320" />
              <path d="M358 0 V320" />
            </g>

            {/* Arterials */}
            <g stroke="#ffffff" strokeWidth="12" strokeLinecap="round" fill="none">
              <path d="M0 112 H440" />
              <path d="M0 220 H440" />
              <path d="M118 0 V320" />
              <path d="M258 0 V320" />
            </g>
            <g stroke="#d2dce8" strokeWidth="1.2" strokeDasharray="5 8" fill="none">
              <path d="M0 112 H440" />
              <path d="M0 220 H440" />
              <path d="M118 0 V320" />
              <path d="M258 0 V320" />
            </g>

            {/* Road edges */}
            <g stroke="#b4c2d3" strokeWidth="0.85" fill="none" opacity="0.42">
              <path d="M0 106 H440 M0 118 H440" />
              <path d="M0 214 H440 M0 226 H440" />
            </g>

            {/* Roundabout near bottom-right */}
            <circle cx="316" y="268" r="14" fill="#e9eef6" stroke="#fff" strokeWidth="5" />
            <circle cx="316" cy="268" r="4" fill="#c5d0de" />

            {/* Labels */}
            <g fill="#75879c" fontSize="8.2" fontWeight="700" letterSpacing="0.55">
              <text x="38" y="52">GREEN PARK</text>
              <text x="164" y="108">PARK ROAD</text>
              <text x="328" y="244">UXBRIDGE WAY</text>
              <text x="24" y="292" fill="#6789ae">
                GRAND UNION CANAL
              </text>
              <text x="108" y="168" transform="rotate(-90 108 168)">
                DEPOT LANE
              </text>
              <text x="280" y="288" fontSize="7" fill="#8091a6">
                RIVERSIDE
              </text>
            </g>

            {/* Depot */}
            <g filter="url(#nfPinShadow)">
              <rect x="36" y="208" width="56" height="38" rx="10" fill="#1e3a63" />
              <text x="64" y="231" textAnchor="middle" fill="#fff" fontSize="10.5" fontWeight="700">
                DEPOT
              </text>
            </g>

            {/* Route */}
            <path
              d="M64 208 C 112 146, 148 104, 188 116 S 264 178, 300 156 S 364 92, 390 108"
              fill="none"
              stroke="url(#nfRouteGrad)"
              strokeWidth="11"
              strokeLinecap="round"
              opacity="0.2"
            />
            <path
              className="nf-live-path"
              d="M64 208 C 112 146, 148 104, 188 116 S 264 178, 300 156 S 364 92, 390 108"
              fill="none"
              stroke="url(#nfRouteGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="10 7"
              filter="url(#nfSoftGlow)"
            />

            {/* Stops */}
            <g filter="url(#nfPinShadow)">
              <circle cx="188" cy="116" r="14" fill="#fff" stroke="#3f68a8" strokeWidth="3.1" />
              <text x="188" y="120.5" textAnchor="middle" fill="#163054" fontSize="11.5" fontWeight="700">
                1
              </text>
              <circle cx="300" cy="156" r="14" fill="#fff" stroke="#f07031" strokeWidth="3.1" />
              <text x="300" y="160.5" textAnchor="middle" fill="#163054" fontSize="11.5" fontWeight="700">
                2
              </text>
              <circle cx="390" cy="108" r="14" fill="#fff" stroke="#3f68a8" strokeWidth="3.1" />
              <text x="390" y="112.5" textAnchor="middle" fill="#163054" fontSize="11.5" fontWeight="700">
                3
              </text>
            </g>

            {/* Vehicle */}
            <g className="nf-live-van" filter="url(#nfPinShadow)">
              <circle cx="252" cy="164" r="17" fill="#f07031" opacity="0.16" />
              <circle cx="252" cy="164" r="10" fill="#f07031" />
              <text x="252" y="167.5" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">
                VN
              </text>
            </g>

            {/* North indicator */}
            <g transform="translate(402 28)">
              <circle r="14" fill="#fff" stroke="#c5d0de" strokeWidth="1" />
              <path d="M0 -7 L3 4 H-3 Z" fill="#1e3a63" />
              <text y="11" textAnchor="middle" fill="#5b6b80" fontSize="6.5" fontWeight="700">
                N
              </text>
            </g>
          </svg>

          <div className="nf-live-map-tools">
            <span>+</span>
            <span>−</span>
          </div>

          <div className="nf-live-map-meta">
            <div className="nf-live-map-meta-main">
              <strong>Route R-214</strong>
              <span className="nf-live-map-badge">Out for Delivery</span>
            </div>
            <div className="nf-live-map-meta-sub">
              <span>3 stops</span>
              <span>SW / UB corridor</span>
              <span>ETA 12 min</span>
            </div>
          </div>
        </div>

        <aside className="nf-live-panel">
          <div className="nf-live-card">
            <div className="nf-live-card-head">
              <p>Van · VN-14</p>
              <span className="nf-live-pill is-ready">Available for Delivery</span>
            </div>
            <div className="nf-fleet-bar">
              <i style={{ width: '68%' }} />
            </div>
            <div className="nf-live-card-foot">
              <small>Load 680 / 1000 kg</small>
              <strong>68%</strong>
            </div>
          </div>

          <div className="nf-live-card">
            <div className="nf-live-card-head">
              <p>Driver · D-08</p>
              <span className="nf-live-pill is-trip">On Trip</span>
            </div>
            <small>Linked to VN-14 · stop 2 of 3</small>
            <div className="nf-live-eta">
              <span>Next stop</span>
              <strong>UB8 · 12 min</strong>
            </div>
          </div>

          <div className="nf-live-stats">
            <div>
              <strong>12</strong>
              <span>Deliveries</span>
            </div>
            <div>
              <strong>3</strong>
              <span>Leftover</span>
            </div>
            <div>
              <strong>20</strong>
              <span>Stop limit</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
