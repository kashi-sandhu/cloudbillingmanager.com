import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.tsx'
// Home is eager so reload / first paint does not flash "Loading…"
import Home from './pages/Home.tsx'

const Platform = lazy(() => import('./pages/Platform.tsx'))
const ModulePage = lazy(() => import('./pages/ModulePage.tsx'))
const Industries = lazy(() => import('./pages/Industries.tsx'))
const Why = lazy(() => import('./pages/Why.tsx'))
const Contact = lazy(() => import('./pages/Contact.tsx'))
const Demo = lazy(() => import('./pages/Demo.tsx'))
const Blog = lazy(() => import('./pages/Blog.tsx'))
const BlogCategory = lazy(() => import('./pages/BlogCategory.tsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.tsx'))
const Privacy = lazy(() => import('./pages/Privacy.tsx'))
const Terms = lazy(() => import('./pages/Terms.tsx'))
const Pricing = lazy(() => import('./pages/Pricing.tsx'))
const InventoryChecklist = lazy(() => import('./pages/InventoryChecklist.tsx'))
const Press = lazy(() => import('./pages/Press.tsx'))
const InventoryManagementGuide = lazy(() => import('./pages/InventoryManagementGuide.tsx'))
const Glossary = lazy(() => import('./pages/Glossary.tsx'))
const InventoryVsSpreadsheets = lazy(() => import('./pages/InventoryVsSpreadsheets.tsx'))
const IndustryPage = lazy(() => import('./pages/IndustryPage.tsx'))
const About = lazy(() => import('./pages/About.tsx'))
const AiWhatsappOrdering = lazy(() => import('./pages/AiWhatsappOrdering.tsx'))
const FleetLogistics = lazy(() => import('./pages/FleetLogistics.tsx'))
const NotFound = lazy(() => import('./pages/NotFound.tsx'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/platform/:slug" element={<ModulePage />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/industries/:slug" element={<IndustryPage />} />
        <Route path="/why" element={<Why />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/category/:slug" element={<BlogCategory />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/features/ai-whatsapp-ordering" element={<AiWhatsappOrdering />} />
        <Route path="/features/fleet-logistics" element={<FleetLogistics />} />
        <Route path="/resources" element={<Navigate to="/pricing" replace />} />
        <Route path="/resources/inventory-management-checklist" element={<InventoryChecklist />} />
        <Route path="/resources/inventory-management-guide" element={<InventoryManagementGuide />} />
        <Route path="/resources/inventory-software-vs-spreadsheets" element={<InventoryVsSpreadsheets />} />
        <Route path="/resources/glossary" element={<Glossary />} />
        <Route path="/press" element={<Press />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        {/* Legacy WordPress URLs (client-side backup; Apache 301 is primary) */}
        <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
        <Route path="/about-us" element={<Navigate to="/about" replace />} />
        <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
        <Route path="/create-ticket" element={<Navigate to="/contact" replace />} />
        <Route path="/terms-of-service" element={<Navigate to="/terms" replace />} />
        <Route path="/terms-and-conditions" element={<Navigate to="/terms" replace />} />
        <Route path="/features" element={<Navigate to="/platform" replace />} />
        <Route path="/features/purchase-receipts" element={<Navigate to="/platform/purchasing" replace />} />
        <Route
          path="/10-top-tips-for-making-your-saas-product-sticky"
          element={<Navigate to="/blog" replace />}
        />
        <Route
          path="/blog/category/business-managemen"
          element={<Navigate to="/blog/category/business-management" replace />}
        />
        <Route
          path="/blog/category/sales-purchase"
          element={<Navigate to="/blog/category/sales-purchases" replace />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
