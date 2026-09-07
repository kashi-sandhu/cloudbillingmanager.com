import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.tsx'
import Home from './pages/Home.tsx'
import Platform from './pages/Platform.tsx'
import ModulePage from './pages/ModulePage.tsx'
import Industries from './pages/Industries.tsx'
import Why from './pages/Why.tsx'
import Contact from './pages/Contact.tsx'
import Demo from './pages/Demo.tsx'
import Blog from './pages/Blog.tsx'
import BlogCategory from './pages/BlogCategory.tsx'
import BlogPost from './pages/BlogPost.tsx'
import Privacy from './pages/Privacy.tsx'
import Terms from './pages/Terms.tsx'
import Resources from './pages/Resources.tsx'
import InventoryChecklist from './pages/InventoryChecklist.tsx'
import Press from './pages/Press.tsx'
import InventoryManagementGuide from './pages/InventoryManagementGuide.tsx'
import Glossary from './pages/Glossary.tsx'
import InventoryVsSpreadsheets from './pages/InventoryVsSpreadsheets.tsx'
import IndustryPage from './pages/IndustryPage.tsx'
import About from './pages/About.tsx'
import NotFound from './pages/NotFound.tsx'

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
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/inventory-management-checklist" element={<InventoryChecklist />} />
        <Route path="/resources/inventory-management-guide" element={<InventoryManagementGuide />} />
        <Route path="/resources/inventory-software-vs-spreadsheets" element={<InventoryVsSpreadsheets />} />
        <Route path="/resources/glossary" element={<Glossary />} />
        <Route path="/press" element={<Press />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
