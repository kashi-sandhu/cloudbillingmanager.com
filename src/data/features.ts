import type { FaqItem } from './pageSeo.ts'

export const featurePaths = {
  whatsappOrdering: '/features/ai-whatsapp-ordering',
  fleetLogistics: '/features/fleet-logistics',
} as const

export const connectedWorkflowSteps = [
  'WhatsApp Customer Order',
  'AI Order Recognition',
  'Customer & Product Matching',
  'Editable Sales Draft',
  'Staff Review & Invoice Posting',
  'Delivery Planning',
  'Vehicle & Driver Assignment',
  'Dispatch & Delivery Management',
  'Delivery History',
] as const

export const connectedWorkflowCopy = {
  headline: 'From WhatsApp Orders to Invoices to Delivery — All in One Connected Platform.',
  text: 'Cloud Billing Manager connects AI-assisted ordering, sales invoicing, inventory workflows and fleet operations in one business management platform.',
} as const

export const whatsappOrderingFeature = {
  path: featurePaths.whatsappOrdering,
  nav: 'AI WhatsApp Ordering',
  eyebrow: 'AI-Powered Sales Automation',
  heroTitle: 'AI-Powered WhatsApp Ordering for Modern Business Operations',
  heroText:
    'Convert incoming WhatsApp customer orders into structured sales invoice drafts with intelligent recognition, product matching and staff-controlled approval.',
  homeHeading: 'Receive Orders on WhatsApp. Process Them Smarter with AI.',
  homeText:
    'Turn incoming WhatsApp messages into structured, review-ready sales invoice drafts. Recognize customers, extract order items, match products and keep your team in full control before posting.',
  homeCta: 'Explore AI Order Assistant',
  overviewTitle: 'Turn WhatsApp Messages into Sales Orders with AI',
  overviewText:
    'Let AI understand incoming WhatsApp orders, identify requested products and quantities, and prepare structured sales drafts for your team to review.',
  highlights: [
    'WhatsApp order reception',
    'AI order understanding',
    'Customer and product matching',
    'Editable invoice drafts',
    'Staff review and approval',
    'Connected invoice workflow',
  ],
  sections: [
    {
      id: 'reception',
      title: 'WhatsApp Order Reception',
      text: 'Receive incoming WhatsApp order messages tied to existing customer records. Review message contents, customer WhatsApp numbers, timestamps and processing status in one place.',
      points: [
        'Incoming WhatsApp order messages',
        'Customer WhatsApp numbers',
        'Message date and time',
        'Order-related message identification',
        'Processing and review status',
      ],
    },
    {
      id: 'understanding',
      title: 'AI Order Understanding',
      text: 'The AI assistant analyses incoming messages to detect order intent, extract product names and quantities, and surface confidence scores for staff review.',
      points: [
        'Order intent detection',
        'Product name extraction',
        'Quantity identification',
        'AI confidence scores',
        'Structured order information',
      ],
    },
    {
      id: 'customer-matching',
      title: 'Smart Customer Recognition',
      text: 'Match WhatsApp numbers against saved customer records. When more than one customer could match the same number, staff review resolves the ambiguity.',
      points: [
        'Customer identification via stored WhatsApp numbers',
        'Customer record matching',
        'Ambiguous match detection',
        'Staff review for multiple matches',
      ],
    },
    {
      id: 'product-matching',
      title: 'Intelligent Product & Quantity Recognition',
      text: 'Connect recognised order items to existing products using codes and descriptions, with editable lines plus price and VAT information.',
      points: [
        'Product code matching',
        'Product description matching',
        'Quantity extraction',
        'Editable product lines',
        'Price and VAT information',
      ],
    },
    {
      id: 'invoice-drafts',
      title: 'From WhatsApp Order to Invoice Draft',
      text: 'Prepare editable sales invoice drafts with product, quantity, pricing and totals ready for staff review before posting.',
      points: [
        'Product code and description',
        'Quantity, price and VAT',
        'Net amount and line totals',
        'Subtotal, total VAT and grand total',
      ],
    },
    {
      id: 'human-control',
      title: 'AI Automation with Human Control',
      text: 'Staff remain in control throughout the workflow. Review, edit, save, approve or reject drafts before an unposted invoice is posted.',
      points: [
        'Review and edit drafts',
        'Save, approve or reject',
        'WhatsApp message → AI draft → staff review → unposted invoice → staff posting',
        'Stock processing after invoice posting',
      ],
    },
    {
      id: 'delivery-prep',
      title: 'Order and Delivery Preparation',
      text: 'Prepare delivery context while reviewing the order — customer, driver, vehicle, delivery instructions, delivery date and internal notes.',
      points: [
        'Customer selection',
        'Driver and vehicle fields',
        'Delivery instructions',
        'Delivery date',
        'Internal review notes',
      ],
    },
    {
      id: 'whatsapp-comms',
      title: 'Connected WhatsApp Communication',
      text: 'Connect WhatsApp order handling with your sales workflow and support customer communication after invoice posting.',
      points: [
        'WhatsApp sending integrated with invoice posting',
        'Sales workflow connection',
        'Post-posting customer communication support',
      ],
    },
  ],
  processSteps: [
    { label: 'WhatsApp Message', detail: 'Incoming customer order' },
    { label: 'AI Order Draft', detail: 'Structured recognition' },
    { label: 'Staff Review', detail: 'Edit and approve' },
    { label: 'Unposted Invoice', detail: 'Ready for posting' },
    { label: 'Staff Posting', detail: 'Stock and WhatsApp follow-up' },
  ],
  faqs: [
    {
      question: 'Does AI WhatsApp ordering work with any WhatsApp number?',
      answer:
        'The system processes messages from WhatsApp numbers associated with existing customer records. Staff review ambiguous matches when more than one customer could share a number.',
    },
    {
      question: 'Does AI automatically post every invoice?',
      answer:
        'No. AI prepares editable sales invoice drafts. Staff review, edit, approve or reject before posting. Stock processing and applicable WhatsApp sending occur after invoice posting.',
    },
    {
      question: 'What information appears on an AI-generated invoice draft?',
      answer:
        'Drafts can include product code, description, quantity, price, VAT, net amount, line totals, subtotal, total VAT and grand total — all editable before posting.',
    },
    {
      question: 'Is this a standalone WhatsApp chatbot?',
      answer:
        'No. It is an order assistant inside Cloud Billing Manager Sales that turns WhatsApp order messages into review-ready invoice drafts connected to your existing sales and delivery workflows.',
    },
  ] satisfies FaqItem[],
} as const

export const fleetLogisticsFeature = {
  path: featurePaths.fleetLogistics,
  nav: 'Fleet & Logistics',
  eyebrow: 'Smart Delivery Operations',
  heroTitle: 'Smarter Fleet Management. More Organized Deliveries.',
  heroText:
    'Manage vehicles, drivers, delivery routes and dispatch workflows from one connected business platform — with automatic delivery assignment and capacity-aware planning.',
  homeHeading: 'Plan Routes, Manage Vehicles and Simplify Deliveries.',
  homeText:
    'Manage drivers, vehicles and delivery operations from one connected platform. Organize delivery routes automatically, monitor capacity and maintain visibility across dispatch and delivery history.',
  homeCta: 'Explore Fleet Management',
  overviewTitle: 'Smarter Delivery Planning with Automatic Assignment',
  overviewText:
    'Automatically organize nearby deliveries into local routes, arrange stops efficiently and allocate loads according to vehicle capacity — all within your existing sales and logistics workflow.',
  highlights: [
    'Driver and vehicle management',
    'Delivery route planning',
    'Automatic delivery assignment',
    'Capacity-aware allocation',
    'Fleet monitoring dashboard',
    'Delivery history',
  ],
  sections: [
    {
      id: 'drivers',
      title: 'Complete Driver Management',
      text: 'Maintain organized driver profiles, monitor availability, and manage driver-to-vehicle assignments from one connected system.',
      points: [
        'Personal, contact, license and address details',
        'Driver code / employee ID',
        'Assigned vehicle and operational status',
        'Availability states: Available, Available for Delivery, On Trip, Off Duty, Not Available',
      ],
    },
    {
      id: 'vehicles',
      title: 'Smart Vehicle & Fleet Management',
      text: 'Organize your vehicles, manage operational status, maintain driver assignments, and plan deliveries with vehicle capacity awareness.',
      points: [
        'Registration, type, make, model and year',
        'Load capacity in kilograms',
        'Documents and assignment tabs',
        'Statuses: Available, Available for Delivery, Deliveries Assigned, On Trip, Maintenance, Not Available',
      ],
    },
    {
      id: 'live-tracking',
      title: 'Live Fleet Monitoring Dashboard',
      text: 'View fleet visibility, vehicle status, tracking information and signal availability through a centralized monitoring dashboard.',
      points: [
        'Total fleet and online / moving / idle counts',
        'Vehicles with no signal',
        'Vehicle and driver search',
        'Map interface, status filters and refresh controls',
      ],
      note: 'Marketed as an available tracking dashboard. Vehicles may show without a GPS signal depending on device configuration.',
    },
    {
      id: 'routes',
      title: 'Plan and Manage Delivery Routes',
      text: 'Create routes, auto-assign deliveries and review delivery history with clear operational statuses.',
      points: [
        'Delivery Routes and Create Route',
        'Auto Assign Deliveries',
        'Delivery History',
        'Statuses: Draft, Assigned, Out for Delivery, Completed, Cancelled',
      ],
    },
    {
      id: 'manual-routes',
      title: 'Flexible Manual Route Planning',
      text: 'Build routes manually with depot postcode, vehicle and driver selection, capacity visibility, invoice filters and map-based stop planning. Manual and automated routing share the same delivery invoice pool to help prevent duplicate active assignments.',
      points: [
        'Route name, delivery date and depot / start postcode',
        'Vehicle and driver selection with load capacity',
        'Unassigned deliveries with invoice, date and postcode filters',
        'Map-based stops, driver notes and save route',
      ],
    },
    {
      id: 'capacity',
      title: 'Capacity-Aware Delivery Planning',
      text: 'Plan deliveries with clear vehicle load visibility and remaining capacity information.',
      points: [
        'Vehicle load and maximum capacity',
        'Remaining capacity and percentage used',
        'Total available fleet capacity',
        'Delivery count and leftover deliveries',
      ],
    },
    {
      id: 'assignment',
      title: 'Connected Driver & Vehicle Assignment',
      text: 'Delivery routes stay connected with their assigned drivers and vehicles. Vehicles are linked with drivers, deliveries are allocated to suitable vehicle routes, and operational states update during dispatch.',
      points: [
        'Vehicles linked with drivers',
        'Route shows associated driver',
        'Operational state updates on dispatch',
      ],
    },
    {
      id: 'leftovers',
      title: 'Never Lose Visibility of Pending Deliveries',
      text: 'Review leftover and undelivered invoices with reasons, postcode issues and options for manual reassignment to available vans.',
      points: [
        "Today's leftover deliveries",
        'Invoices that could not be placed on a route',
        'Unmatched delivery reasons and postcode issues',
        'Past undelivered invoices and manual reassignment',
      ],
    },
    {
      id: 'history',
      title: 'Organized Delivery Records & History',
      text: 'Access searchable delivery records to review route assignments, drivers, vehicles and delivery statuses.',
      points: [
        'Invoice, customer and postcode',
        'Route, date, van and driver',
        'Weight in kilograms, status and timestamp',
      ],
    },
  ],
  autoAssignSteps: [
    {
      step: 1,
      title: 'Group Nearby Customers',
      text: 'Group customer deliveries within nearby geographic areas or neighbouring postcodes.',
    },
    {
      step: 2,
      title: 'Shortest Path',
      text: 'Arrange delivery stops to reduce unnecessary backtracking and improve route sequence.',
    },
    {
      step: 3,
      title: 'Fit Deliveries to Vehicle Capacity',
      text: 'Use vehicle load capacity in kilograms when placing deliveries onto vans, with a default 20-stop local round limit.',
    },
    {
      step: 4,
      title: 'Dispatch and On Trip',
      text: 'Dispatch a route and update the associated driver and vehicle to an On Trip operational state.',
    },
    {
      step: 5,
      title: 'Proof of Delivery',
      text: 'Support delivery completion and proof-of-delivery handling. Once completion is recorded, driver and vehicle can return to available-for-delivery.',
    },
  ],
  faqs: [
    {
      question: 'Does Cloud Billing Manager include fleet and logistics management?',
      answer:
        'Yes. The Fleet / Logistics module covers driver and vehicle management, delivery routes, automatic delivery assignment, capacity-aware planning, a live monitoring dashboard and delivery history.',
    },
    {
      question: 'How does automatic delivery assignment work?',
      answer:
        'Auto Assign Deliveries groups nearby customers, arranges a shorter stop sequence, fits deliveries to vehicle capacity (including a default 20-stop local round limit), supports dispatch to On Trip status, and supports proof-of-delivery completion.',
    },
    {
      question: 'Does live tracking mean every vehicle is always online?',
      answer:
        'No. The live monitoring dashboard shows fleet visibility, status filters and signal availability. Vehicles may appear without a GPS signal depending on device and map configuration.',
    },
    {
      question: 'How does logistics connect to sales invoices?',
      answer:
        'Delivery planning uses the same pool of delivery invoices as sales workflows. Manual and automatic routing help keep assignments organised from invoice posting through dispatch and delivery history.',
    },
  ] satisfies FaqItem[],
} as const
