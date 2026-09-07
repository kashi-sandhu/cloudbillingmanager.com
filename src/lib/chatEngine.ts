import {
  audiences,
  benefits,
  capabilities,
  challenges,
  company,
  industries,
  modules,
  replacedSystems,
  whyUs,
} from '../data/content.ts'

export type ChatReply = {
  text: string
  path?: string
  href?: string
  suggestions: string[]
}

type Entry = {
  title: string
  path?: string
  href?: string
  keys: string[]
  phrases: string[]
  answer: string
}

const STOP = new Set([
  'a',
  'an',
  'the',
  'is',
  'are',
  'was',
  'were',
  'do',
  'does',
  'did',
  'can',
  'could',
  'will',
  'would',
  'i',
  'me',
  'my',
  'we',
  'you',
  'your',
  'it',
  'its',
  'of',
  'in',
  'on',
  'for',
  'to',
  'and',
  'or',
  'with',
  'about',
  'what',
  'which',
  'how',
  'who',
  'where',
  'when',
  'why',
  'this',
  'that',
  'have',
  'has',
  'tell',
  'please',
  'need',
  'want',
  'show',
  'give',
  'from',
  'into',
  'include',
  'includes',
  'work',
  'works',
  'using',
  'inside',
  'handle',
  'handles',
  'also',
  'any',
  'some',
  'just',
  'only',
  'like',
  'there',
])

const logistics = capabilities.find((item) => item.title.startsWith('Logistics'))
const access = capabilities.find((item) => item.title.startsWith('Smart Device'))

function soften(text: string) {
  return text
    .replace(/\b(kya|kia|kiya|yeh|ye|wo|woh|hai|hain|ho|hoo|tha|thi|haan|han|nahi|nahin)\b/gi, ' ')
    .replace(/\b(ka|ki|ke|kay|ko|se|say|mein|mai|mujhe|muje|batao|btaye|samjhao|kaise|kese|kahan|kidhar)\b/gi, ' ')
    .replace(/\b(aur|phir|usme|isme|uska|iska|wala|wali)\b/gi, ' ')
    .replace(/\bbill(s|ing)?\b/gi, ' invoice ')
    .replace(/\bmal\b/gi, ' stock ')
    .replace(/\b(qeemat|qimat)\b/gi, ' price ')
    .replace(/\bgahak\b/gi, ' customer ')
    .replace(/\bgodown\b/gi, ' warehouse ')
}

function tokens(text: string) {
  return soften(text)
    .toLowerCase()
    .replace(/[^a-z0-9&+\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP.has(word))
}

function headline(item: string) {
  return item.split(/\s+[–—]\s+/)[0]?.trim() ?? item
}

function overlap(query: string[], hay: string[]) {
  if (!hay.length || !query.length) return 0
  let hits = 0
  for (const word of query) {
    if (hay.includes(word)) hits += 2
    else if (word.length > 3 && hay.some((item) => item.startsWith(word) || word.startsWith(item))) hits += 1
  }
  return hits / query.length
}

function rank(query: string[], entry: Entry) {
  const titleScore = overlap(query, tokens(entry.title))
  const keyScore = overlap(query, entry.keys)
  const phraseScore = entry.phrases.some((phrase) => query.join(' ').includes(phrase)) ? 1.8 : 0
  return titleScore * 3.2 + keyScore * 2.6 + phraseScore
}

function moduleAnswer(slug: string) {
  const module = modules.find((item) => item.slug === slug)
  if (!module) return ''
  const groups = module.groups
    .map((group) => {
      const intro = group.intro ? `\n${group.intro}` : ''
      const items = group.items.map((item) => `• ${item}`).join('\n')
      return `${group.title}${intro}\n${items}`
    })
    .join('\n\n')
  return `${module.name}\n${module.tagline}\n\n${groups}`
}

function groupAnswer(slug: string, groupTitle: string) {
  const module = modules.find((item) => item.slug === slug)
  const group = module?.groups.find((item) => item.title === groupTitle)
  if (!module || !group) return ''
  const intro = group.intro ? `\n${group.intro}` : ''
  const items = group.items.map((item) => `• ${item}`).join('\n')
  return `${module.name}\n${group.title}${intro}\n${items}`
}

function replyFrom(entry: Entry | undefined): ChatReply | null {
  if (!entry) return null
  return finish({ text: entry.answer, path: entry.path, href: entry.href })
}

export const chatStarters = [
  'Give me details of your company',
  'What is Cloud Billing Manager?',
  'Who is it for?',
  'How does the pricing engine work?',
  'Does it include POS?',
  'How do I book a demo?',
] as const

function suggestionsFor(path?: string, href?: string) {
  if (href) {
    return ['Give me details of your company', 'Does it include POS?', 'How do I contact you?']
  }
  if (path === '/') {
    return ['Who is it for?', 'What modules are included?', 'How do I book a demo?']
  }
  if (path === '/contact') {
    return ['Give me details of your company', 'How do I book a demo?', 'Does it include POS?']
  }
  if (path === '/industries' || path?.startsWith('/industries/')) {
    return ['Give me details of your company', 'What modules are included?', 'How do I book a demo?']
  }
  if (path === '/why') {
    return ['Give me details of your company', 'Does it replace Sage?', 'How do I book a demo?']
  }
  if (path === '/platform/pos') {
    return ['How does the pricing engine work?', 'Does it handle VAT?', 'What about inventory?']
  }
  if (path === '/platform/pricing-engine') {
    return ['Does it include POS?', 'How does invoicing work?', 'How do I book a demo?']
  }
  if (path === '/platform/inventory') {
    return ['Does it include POS?', 'How do purchase orders work?', 'Does it handle VAT?']
  }
  if (path === '/platform' || path?.startsWith('/platform/')) {
    return ['Give me details of your company', 'Does it include POS?', 'How do I book a demo?']
  }
  return [...chatStarters]
}

function finish(reply: Omit<ChatReply, 'suggestions'> & { suggestions?: string[] }): ChatReply {
  return {
    ...reply,
    suggestions: reply.suggestions?.length ? reply.suggestions : suggestionsFor(reply.path, reply.href),
  }
}

function fromModule(slug: string) {
  const module = modules.find((item) => item.slug === slug)
  return replyFrom(knowledge.find((entry) => entry.title === module?.name))
}

const extraKeys: Record<string, string[]> = {
  dashboard: ['dashboard', 'overview', 'kpi', 'metrics', 'visibility', 'calendar', 'alerts', 'revenue'],
  sales: ['sales', 'invoice', 'invoicing', 'quotation', 'loading', 'delivery', 'duplication', 'pdf'],
  'pricing-engine': ['pricing', 'engine', 'usp', 'margin', 'discount', 'selling', 'negotiated', 'promotional'],
  billing: ['billing', 'credit', 'returns', 'aging', 'receivable', 'statement', 'overdue', 'deposit'],
  purchasing: ['purchase', 'procurement', 'po', 'goods', 'batch', 'lot', 'expiry', 'received'],
  'supplier-payments': ['payables', 'payable', 'bulk', 'cheque', 'settlement'],
  inventory: ['inventory', 'stock', 'warehouse', 'transfer', 'barcode', 'labels', 'reconciliation'],
  accounting: ['accounting', 'ledger', 'balance', 'profit', 'expense', 'cashflow', 'petty', 'receivables'],
  hr: ['hr', 'payroll', 'attendance', 'employee', 'permission', 'role', 'leave', 'holiday'],
  customers: ['onboarding', 'registration', 'profile', 'credit', 'aging', 'groups'],
  suppliers: ['supplier', 'onboarding', 'registration', 'performance'],
  customizable: [
    'customizable',
    'customise',
    'customize',
    'template',
    'backup',
    'ssl',
    'hosted',
    'import',
    'export',
    'csv',
    'excel',
    'currency',
  ],
  pos: ['pos', 'till', 'touch', 'walk', 'daypass', 'scanner', 'split', 'closing'],
}

const knowledge: Entry[] = [
  {
    title: 'About Cloud Billing Manager',
    path: '/about',
    keys: ['cloud', 'billing', 'manager', 'erp', 'product', 'software', 'cbm', 'avantcore', 'company', 'detail', 'details', 'about', 'business'],
    phrases: ['cloud billing manager', 'smart cloud erp', 'what is cbm', 'our company', 'company details', 'about us', 'about the company'],
    answer: `${company.positioning}\nIt is presented by ${company.presenter}. ${company.modernLine} ${audiences.join(', ')}.\n\nIndustry Focus:\n${industries.map((item) => `• ${item.name}`).join('\n')}\n\nContact ${company.presenter}:\n• Email: ${company.email}\n• Phone: ${company.phone}
• Landline: ${company.landline}\n• Head Office: ${company.office}\n• ${company.address}\n• Website: ${company.websiteLabel}\n• Group: ${company.groupSiteLabel}\n• About page: ${company.website}/about\n• Book a demo: ${company.website}/demo`,
  },
  {
    title: 'Who it is for',
    path: '/industries',
    keys: [
      'industry',
      'industries',
      'food',
      'distributor',
      'wholesale',
      'wholesaler',
      'fmcg',
      'importer',
      'restaurant',
      'frozen',
      'fresh',
      'meat',
      'grocery',
      'beverage',
      'carry',
      'retail',
    ],
    phrases: ['who is it for', 'industry focus', 'cash & carry', 'cash and carry'],
    answer: `Cloud Billing Manager is designed specifically for ${audiences.join(', ')}.\n\nIndustry Focus:\n${industries.map((item) => `• ${item.name}`).join('\n')}`,
  },
  {
    title: 'One Complete Cloud Platform',
    path: '/platform',
    keys: ['platform', 'modules', 'complete', 'features', 'module'],
    phrases: ['one complete cloud platform', 'all modules', 'what modules'],
    answer: `One Complete Cloud Platform. Instead of using ${replacedSystems.join(', ')}, everything is managed inside one system.\n\nModules:\n${modules.map((item) => `• ${item.nav}`).join('\n')}`,
  },
  {
    title: 'Business challenges',
    path: '/why',
    keys: ['challenge', 'problem', 'pain', 'slow', 'manual', 'disconnected'],
    phrases: ['business challenges', 'most distributors face'],
    answer: `Most distributors face:\n${challenges.map((item) => `• ${item}`).join('\n')}`,
  },
  {
    title: 'Why Cloud Billing Manager',
    path: '/why',
    keys: ['benefit', 'choose', 'advantage', 'better', 'partnership', 'support', 'updates'],
    phrases: ['business benefits', 'why cloud billing manager', 'why cbm'],
    answer: `Business Benefits:\n${benefits.map((item) => `• ${item}`).join('\n')}\n\nWhy Cloud Billing Manager?:\n${whyUs.map((item) => `• ${item}`).join('\n')}`,
  },
  {
    title: 'Replace Sage and Excel',
    path: '/why',
    keys: ['sage', 'excel', 'desktop', 'replace', 'migration'],
    phrases: ['instead of using', 'desktop system', 'separate pos'],
    answer: `Our Solution is One Complete Cloud Platform. Instead of using ${replacedSystems.join(', ')}, everything is managed inside one system. This also addresses High Sage licensing costs.`,
  },
  {
    title: 'Contact',
    path: '/contact',
    keys: ['contact', 'email', 'phone', 'office', 'address', 'london', 'call', 'support', 'sophia', 'uxbridge', 'stockley'],
    phrases: ['head office', 'contact us', company.email, company.phone],
    answer: `Contact ${company.presenter}.\n• Email: ${company.email}\n• Phone: ${company.phone}
• Landline: ${company.landline}\n• Head Office: ${company.office}\n• ${company.address}\n• Website: ${company.websiteLabel}\n• Group: ${company.groupSiteLabel}`,
  },
  {
    title: 'Book a demo',
    path: '/demo',
    keys: ['demo', 'demonstration', 'walkthrough', 'trial', 'book'],
    phrases: ['live demo', 'client demo', 'client demonstration', 'book a demo'],
    answer: `Book a live walkthrough of Cloud Billing Manager. We will show invoicing, customer-specific pricing, stock, loading slips, collections, and VAT using a UK food distribution workflow.\n• Schedule a demo: ${company.website}/demo\n• Email: ${company.email}\n• Phone: ${company.phone}
• Landline: ${company.landline}`,
  },
  {
    title: 'VAT and UK tax',
    path: '/platform/accounting',
    keys: ['vat', 'hmrc', 'tax'],
    phrases: ['uk tax', 'vat reports', 'vat setting', 'vat invoice', 'vat calculation'],
    answer:
      'Cloud Billing Manager includes VAT in the same platform.\n• Accounting covers VAT Reports.\n• Customer Billing includes Customer VAT – Calculate VAT automatically based on UK tax rules or from system settings.\n• POS includes VAT Calculation.\n• Settings include VAT Setting and VAT Invoice.',
  },
  {
    title: 'Logistics & Distribution Management',
    path: '/platform/sales',
    keys: ['logistic', 'logistics', 'vehicle', 'driver', 'delivery', 'load'],
    phrases: ['loading slips', 'loading slip', 'invoices load'],
    answer: logistics ? `${logistics.title}: ${logistics.text}` : '',
  },
  {
    title: 'Smart Device Accessibility',
    path: '/platform',
    keys: ['mobile', 'tablet', 'laptop', 'desktop', 'remote', 'anywhere', 'device', 'access', 'phone'],
    phrases: ['smart device accessibility', 'anytime anywhere', 'no local installation'],
    answer: access
      ? `${access.title}: ${access.text}\nThe Fully Customizable System also includes Cloud Hosted, SSL Encryption, Daily Backup, Secure Login, No Local Installation, and Accessible Anywhere.`
      : '',
  },
  {
    title: 'Capabilities',
    path: '/platform',
    keys: ['capability', 'require', 'designed'],
    phrases: ['designed for businesses that require'],
    answer: capabilities.map((item) => `• ${item.title}: ${item.text}`).join('\n'),
  },
  ...capabilities.map((item) => ({
    title: item.title,
    path: '/platform',
    keys: tokens(item.title),
    phrases: [item.title.toLowerCase()],
    answer: `${item.title}: ${item.text}`,
  })),
  ...modules.map((module) => ({
    title: module.name,
    path: `/platform/${module.slug}`,
    keys: [
      ...tokens(`${module.name} ${module.nav} ${module.tagline} ${module.groups.map((group) => group.title).join(' ')}`),
      ...(extraKeys[module.slug] ?? []),
    ],
    phrases: [module.name.toLowerCase(), module.nav.toLowerCase(), module.slug.replaceAll('-', ' ')],
    answer: moduleAnswer(module.slug),
  })),
  ...modules.flatMap((module) =>
    module.groups.map((group) => ({
      title: `${module.nav}: ${group.title}`,
      path: `/platform/${module.slug}`,
      keys: tokens(`${group.title} ${group.items.map((item) => headline(item)).join(' ')}`),
      phrases: [group.title.toLowerCase(), ...group.items.map((item) => headline(item).toLowerCase())].filter(
        (phrase) => phrase.length > 3,
      ),
      answer: groupAnswer(module.slug, group.title),
    })),
  ),
]

function greeting(query: string) {
  return /^(hi|hello|hey|salam|salaam|aoa|good\s+(morning|afternoon|evening)|assalam)[\s!.]*$/i.test(query.trim())
}

function thanks(query: string) {
  return /^(thanks|thank you|cheers|ok|okay|great|shukriya|shukria)[\s!.]*$/i.test(query.trim())
}

function unknown(): ChatReply {
  return finish({
    text: `${company.product} is ${company.headline}, presented by ${company.presenter}.\nAsk a question below, or about invoicing, POS, stock, VAT, or a demo.\n• Email: ${company.email}\n• Phone: ${company.phone}
• Landline: ${company.landline}\n• Book a demo: ${company.website}/demo`,
    path: '/',
    suggestions: [...chatStarters],
  })
}

const moduleIntents: { slug: string; test: RegExp }[] = [
  { slug: 'pos', test: /\b(pos|point of sale|\btill\b|touch-friendly|daypass|walk-?in|barcode scanner|cash closing|split payment)\b/i },
  { slug: 'pricing-engine', test: /\b(pricing engine|customer.?specific pric|unique selling|\busp\b|smart price|price learning|margin protection|last selling price)\b/i },
  { slug: 'dashboard', test: /\b(dashboard|business visibility|invoice due calendar|low-?stock alert)\b/i },
  { slug: 'inventory', test: /\b(inventory|warehouse|stock|multi-warehouse|barcode print|stock transfer|stock adjustment)\b/i },
  { slug: 'purchasing', test: /\b(purchase order|\bpo\b|procurement|goods received|batch|lot tracking|expiry)\b/i },
  { slug: 'supplier-payments', test: /\b(supplier payments?|bulk supplier|outstanding payable)\b/i },
  { slug: 'suppliers', test: /\b(supplier onboard|supplier registration|supplier management|supplier profile)\b/i },
  { slug: 'billing', test: /\b(credit note|sales return|customer billing|credit limit|invoice aging|advance payment|payments?|collections?)\b/i },
  { slug: 'accounting', test: /\b(accounting|balance sheet|profit\s*(&|and)\s*loss|cash flow|general ledger|petty cash)\b/i },
  { slug: 'hr', test: /\b(\bhr\b|payroll|attendance|employee|role-?based|user management|leave|holiday)\b/i },
  { slug: 'customers', test: /\b(customer onboard|customer registration|customer profile|customer groups)\b/i },
  { slug: 'customizable', test: /\b(customi[sz]e|template|daily backup|ssl|cloud hosted|import|export|csv|currency setting|no local installation)\b/i },
  { slug: 'sales', test: /\b(sales management|invoices?|invoicing|quotation|loading slip|sales order|assign vehicle|invoice duplication|pdf)\b/i },
]

function phraseMatch(query: string) {
  const q = query.toLowerCase()
  let best: { phrase: string; entry: Entry } | null = null
  for (const entry of knowledge) {
    for (const phrase of entry.phrases) {
      if (phrase.length < 8 && !phrase.includes(' ')) continue
      if (q.includes(phrase) && (!best || phrase.length > best.phrase.length)) {
        best = { phrase, entry }
      }
    }
  }
  return best && best.phrase.length >= 5 ? best.entry : null
}

function intent(query: string): ChatReply | null {
  const q = query.toLowerCase()

  if (
    /\b(cost|price list|pricing plan|licence fee|license fee|how much|subscription|monthly fee|annual fee|kitna paisa|kitni fee)\b/i.test(
      q,
    ) &&
    !/\b(customer.?specific|pricing engine|usp|selling price|margin|stock|invoice)\b/i.test(q)
  ) {
    return finish({
      text: `This website does not list Cloud Billing Manager licence or subscription prices. I will not estimate a figure.\n• Email ${company.email}\n• Call ${company.phone}\n• Landline ${company.landline}\n• Book a demo at ${company.website}/demo`,
      path: '/contact',
    })
  }

  for (const item of moduleIntents) {
    if (item.test.test(q)) return fromModule(item.slug)
  }

  const phrase = phraseMatch(q)
  if (phrase) return replyFrom(phrase)

  if (/\bvat\b|\bhmrc\b/.test(q)) {
    return replyFrom(knowledge.find((entry) => entry.title === 'VAT and UK tax'))
  }

  if (/\b(logistics?|vehicles?|drivers?|loading)\b/.test(q)) {
    return replyFrom(knowledge.find((entry) => entry.title === 'Logistics & Distribution Management'))
  }

  if (/\b(mobile|tablet|laptop|remote access|anywhere|smart device|phone se|phone par)\b/.test(q)) {
    return replyFrom(knowledge.find((entry) => entry.title === 'Smart Device Accessibility'))
  }

  const industry = industries.find(
    (item) => q.includes(item.name.toLowerCase()) || q.includes(item.slug.replaceAll('-', ' ')),
  )
  if (industry) {
    return finish({
      text: `Industry Focus includes ${industry.name}. Cloud Billing Manager is designed specifically for ${audiences.join(', ')}.`,
      path: `/industries/${industry.slug}`,
    })
  }

  if (
    /\b(about us|our company|your company|company details?|who are you|company info)\b/.test(q) ||
    /\b(details? of .{0,24}company|tell me about .{0,18}(company|business))\b/.test(q) ||
    (/\bdetails?\b/.test(q) && /\b(company|business|cbm|avantcore)\b/.test(q))
  ) {
    return replyFrom(knowledge.find((entry) => entry.title === 'About Cloud Billing Manager'))
  }

  if (/\b(who (made|built|developed|created|presents?)|presented by|avantcore)\b/.test(q)) {
    return replyFrom(knowledge.find((entry) => entry.title === 'About Cloud Billing Manager'))
  }

  if (/\b(who.{0,18}for|which industr|food distributor|cash\s*(&|and)\s*carry)\b/.test(q)) {
    return replyFrom(knowledge.find((entry) => entry.title === 'Who it is for'))
  }

  if (
    /\b(contact us|contact you|phone number|head office|sophia@|avantcore)\b/.test(q) ||
    /^(email|phone|address|contact)\b/.test(q.trim())
  ) {
    return replyFrom(knowledge.find((entry) => entry.title === 'Contact'))
  }

  if (
    /\b(book.{0,24}(demo|walkthrough)|live demo|client demo|client demonstration)\b/.test(q) ||
    /^(demo|walkthrough)\??$/.test(q.trim())
  ) {
    return replyFrom(knowledge.find((entry) => entry.title === 'Book a demo'))
  }

  if (/\b(sage|excel|desktop system)\b/.test(q)) {
    return replyFrom(knowledge.find((entry) => entry.title === 'Replace Sage and Excel'))
  }

  if (/\b(what modules?|all modules|platform modules)\b/.test(q)) {
    return replyFrom(knowledge.find((entry) => entry.title === 'One Complete Cloud Platform'))
  }

  if (
    /^(what (is|does)|what'?s|tell me about)?\s*(the )?(cloud billing manager|cbm|this (system|software|product)|it)\??$/i.test(
      q.trim(),
    )
  ) {
    return replyFrom(knowledge.find((entry) => entry.title === 'About Cloud Billing Manager'))
  }

  return null
}

function rankedAnswer(query: string): ChatReply | null {
  const words = tokens(query)
  if (!words.length) return null

  const ranked = knowledge
    .map((entry) => ({ entry, value: rank(words, entry) }))
    .sort((a, b) => b.value - a.value)

  const best = ranked[0]
  if (!best || best.value < 1.05) return null
  if (overlap(words, best.entry.keys) < 0.4 && overlap(words, tokens(best.entry.title)) < 0.55) return null

  const close = ranked[1]
  if (
    close &&
    best.value - close.value < 0.28 &&
    close.entry.path?.startsWith('/platform/') &&
    best.entry.path === '/platform'
  ) {
    return replyFrom(close.entry)
  }

  return finish({
    text: best.entry.answer,
    path: best.entry.path,
    href: best.entry.href,
  })
}

const followOn = /^(aur|or|and|also|usme|isme|phir|more)\b/i

export function answerChat(raw: string, previous = ''): ChatReply {
  const query = raw.trim()
  if (!query) return unknown()
  if (greeting(query)) {
    return finish({
      text: `Hello. I am the Cloud Billing Manager assistant from ${company.presenter}. Ask about the company, any module, or pick a suggested question below.`,
      path: '/',
      suggestions: [...chatStarters],
    })
  }
  if (thanks(query)) {
    return finish({
      text: `You are welcome. Ask another Cloud Billing Manager question, or pick a suggestion below.`,
      suggestions: [...chatStarters],
    })
  }

  const matched = intent(query) ?? rankedAnswer(query)
  if (matched) return finish(matched)

  if (previous && followOn.test(query)) {
    const follow = intent(`${previous} ${query}`) ?? rankedAnswer(`${previous} ${query}`)
    if (follow) return finish(follow)
  }

  return unknown()
}
