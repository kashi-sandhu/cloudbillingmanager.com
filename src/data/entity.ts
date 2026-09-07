import { brandAlsoKnownAs } from './brand.ts'
import { audiences, company, industries, modules } from './content.ts'
import { softwareFeatureNames } from './semantic.ts'

/** Official first-party facts for entity clarity and AI-readable HTML. */
export const officialProductFacts = {
  name: company.product,
  alsoKnownAs: brandAlsoKnownAs,
  shortDefinition: company.positioning,
  whoFor: `Food distributors, wholesalers, cash & carry operators, retail chains, importers and FMCG businesses (${audiences.join(', ')}).`,
  problemsSolved: [
    'Disconnected stock, sales and billing systems',
    'Slow invoicing and unclear customer balances',
    'Limited warehouse and inventory visibility',
    'Manual reporting across spreadsheets',
  ],
  keyCapabilities: [...softwareFeatureNames],
  workflows: [
    'Purchase orders to goods receipt and stock updates',
    'Sales invoices and POS transactions reducing available stock',
    'Customer billing, payments and credit notes',
    'Warehouse transfers, adjustments and inventory reports',
  ],
  geographicAvailability:
    'Presented for UK food distribution businesses. Head office: London, United Kingdom. Contact AVANTCORE Technologies for availability outside the primary market.',
  company: {
    presenter: company.presenter,
    email: company.email,
    phone: company.phone,
    landline: company.landline,
    office: company.office,
    address: company.address,
    website: company.website,
    groupSite: company.groupSite,
  },
  industries: industries.map((item) => item.name),
  modules: modules.map((item) => ({ name: item.name, slug: item.slug })),
  pricingNote:
    'Public list pricing is not published on this website. Availability and commercial terms are discussed during a client demo or sales enquiry.',
} as const
